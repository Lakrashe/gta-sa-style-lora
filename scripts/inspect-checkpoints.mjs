import { readSync, openSync, closeSync, fstatSync } from 'node:fs';
import { TextDecoder } from 'node:util';

const maxHeaderBytes = 100_000_000n;
const decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });

function readExactly(fd, size, position) {
  const buffer = Buffer.alloc(size);
  let bytesRead = 0;
  while (bytesRead < size) {
    const count = readSync(fd, buffer, bytesRead, size - bytesRead, position + bytesRead);
    if (count === 0) throw new Error('Unexpected end of file');
    bytesRead += count;
  }
  return buffer;
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function inspect(file) {
  const fd = openSync(file, 'r');
  try {
    const stat = fstatSync(fd, { bigint: true });
    if (!stat.isFile()) throw new Error('Expected a regular file');
    const headerBytes = readExactly(fd, 8, 0).readBigUInt64LE();
    if (headerBytes < 2n || headerBytes > maxHeaderBytes || headerBytes + 8n > stat.size) {
      throw new Error('Invalid SafeTensors header length (is this a Git LFS pointer?)');
    }
    const headerText = decoder.decode(readExactly(fd, Number(headerBytes), 8));
    if (!headerText.startsWith('{')) throw new Error('Expected a JSON object header');
    const { __metadata__: metadata = {}, ...entries } = JSON.parse(headerText);
    if (!isObject(metadata) || Object.values(metadata).some(value => typeof value !== 'string')) {
      throw new Error('Expected metadata to map strings to strings');
    }

    const dataBytes = stat.size - 8n - headerBytes;
    const tensors = Object.entries(entries).map(([name, entry]) => {
      if (!isObject(entry)) throw new Error(`Invalid descriptor for ${name}`);
      const { dtype, shape, data_offsets: offsets } = entry;
      if (typeof dtype !== 'string' || !Array.isArray(shape)
          || shape.some(dim => !Number.isSafeInteger(dim) || dim < 0)
          || !Array.isArray(offsets) || offsets.length !== 2
          || offsets.some(offset => !Number.isSafeInteger(offset) || offset < 0)
          || offsets[0] > offsets[1] || BigInt(offsets[1]) > dataBytes) {
        throw new Error(`Invalid descriptor for ${name}`);
      }
      return { name, dtype, shape, dataOffsets: offsets };
    });

    const prefixCounts = Object.create(null);
    for (const { name } of tensors) {
      const prefix = name.split('.')[0];
      prefixCounts[prefix] = (prefixCounts[prefix] ?? 0) + 1;
    }
    return {
      file, fileBytes: stat.size.toString(), headerBytes: Number(headerBytes),
      metadata, tensorCount: tensors.length, prefixCounts, tensors,
    };
  } finally {
    closeSync(fd);
  }
}

const files = process.argv.slice(2);
if (files.length === 0 || files.includes('--help')) {
  console.log('Usage: node scripts/inspect-checkpoints.mjs FILE [FILE ...]');
  process.exitCode = files.length === 0 ? 2 : 0;
} else {
  const results = files.map(file => {
    try {
      return inspect(file);
    } catch (error) {
      process.exitCode = 1;
      return { file, error: error.message };
    }
  });
  console.log(JSON.stringify(results, null, 2));
}

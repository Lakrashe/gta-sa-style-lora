# GTA San Andreas Style LoRA

An initial image-generation experiment to see whether a LoRA adapter trained on a small set of reference images could produce images with a Grand Theft Auto: San Andreas-inspired visual style.

## Project status

This initial Colab run fine-tuned Stable Diffusion XL Base 1.0 on 32 training examples using DreamBooth and rank-12 LoRA. Training reached 1,000 optimizer steps and saved the weights before final validation ran out of GPU memory. The author found the initial results unsatisfactory. See the [experiment record](docs/current-state.md) and [model card](MODEL_CARD.md).

| Included checkpoint | Size | Exported tensors |
| --- | ---: | ---: |
| `pytorch_lora_weights_500.safetensors` | 69,840,896 bytes | 1,120 |
| `pytorch_lora_weights_1000.safetensors` | 69,840,896 bytes | 1,120 |

The notebook logs saves at steps 500 and 1,000. The uploaded filenames match those milestones, though the notebook provides no hashes to establish the identity of each renamed file.

## Example output

![Snowy mountain village generated with the final adapter loaded](examples/adapter-snowy-village.jpg)

The Colab generated this image with the final adapter using the prompt `SA_STYLE, a snowy mountain village with wooden cabins`. It looks largely photographic. The notebook also includes a separate base-model image generated with a different prompt. See [sample prompts and settings](examples/README.md).

## Inspect the checkpoints

From the repository root, run the following with Node.js. The script uses built-in modules and reads the two original files in [checkpoints/](checkpoints/README.md).

```sh
node scripts/inspect-checkpoints.mjs checkpoints/pytorch_lora_weights_500.safetensors checkpoints/pytorch_lora_weights_1000.safetensors
```

The command prints JSON with metadata, tensor names, shapes, dtypes, offsets, and counts by top-level name prefix. It reads the header only and returns a nonzero exit code if any input fails inspection. See the [SafeTensors format specification](https://github.com/safetensors/safetensors#format).

## Repository layout

| Path | Contents |
| --- | --- |
| [`checkpoints/`](checkpoints/README.md) | Expected filenames and weight storage instructions |
| [`scripts/inspect-checkpoints.mjs`](scripts/inspect-checkpoints.mjs) | Dependency-free SafeTensors header reader |
| [`docs/current-state.md`](docs/current-state.md) | Colab training configuration, outcomes, and checkpoint evidence |
| [`docs/dataset.md`](docs/dataset.md) | Training image inventory, Colab filename match, and provenance |
| [`examples/`](examples/README.md) | Two generated images from the original notebook |
| [`MODEL_CARD.md`](MODEL_CARD.md) | Intended use, model details, and known limitations |

## Weight storage

The repository is configured for Git LFS. See the [checkpoint instructions](checkpoints/README.md) for staging weights after confirming redistribution terms.

# GTA San Andreas Style LoRA

I wanted to see if I could get Stable Diffusion XL to capture the look of GTA San Andreas with a small training set.

## Project status

I fine-tuned SDXL Base 1.0 in Google Colab using DreamBooth and a rank-12 LoRA on 32 images. The run reached 1,000 optimizer steps and saved the weights before final validation ran out of GPU memory. I wasn’t happy with how well the first outputs captured the San Andreas look. See the [training notes](docs/current-state.md) and [model card](MODEL_CARD.md).

| Checkpoint | Size | Exported tensors |
| --- | ---: | ---: |
| `pytorch_lora_weights_500.safetensors` | 69,840,896 bytes | 1,120 |
| `pytorch_lora_weights_1000.safetensors` | 69,840,896 bytes | 1,120 |

The notebook logs saves at steps 500 and 1,000. The uploaded filenames match those milestones, though the notebook provides no hashes to establish the identity of each renamed file.

## Example output

![BMX rider on a city street under a pink sunset](examples/test_lora1.png)

This is one of my LoRA outputs. I don’t have the exact prompt, seed, or checkpoint recorded for this image. See the [example notes](examples/README.md).

## Inspect the checkpoints

Download either SDXL Base 1.0 LoRA adapter from [checkpoints/](checkpoints/). If you cloned the repository and still need the weights, run `git lfs pull`.

To inspect both files, run this from the repository root with Node.js. You can also pass just one checkpoint path.

```sh
node scripts/inspect-checkpoints.mjs checkpoints/pytorch_lora_weights_500.safetensors checkpoints/pytorch_lora_weights_1000.safetensors
```

The command prints JSON with metadata, tensor names, shapes, dtypes, offsets, and counts by top-level name prefix. It reads the header only and returns a nonzero exit code if any input fails inspection. See the [SafeTensors format specification](https://github.com/safetensors/safetensors#format).

## Repository layout

| Path | Contents |
| --- | --- |
| [`checkpoints/`](checkpoints/README.md) | LoRA weights and checksums |
| [`scripts/inspect-checkpoints.mjs`](scripts/inspect-checkpoints.mjs) | Dependency-free SafeTensors header reader |
| [`docs/current-state.md`](docs/current-state.md) | Colab training configuration, outcomes, and checkpoint evidence |
| [`docs/dataset.md`](docs/dataset.md) | Training image inventory, Colab filename match, and provenance |
| [`examples/`](examples/README.md) | My featured LoRA output and a separate base-model sample |
| [`MODEL_CARD.md`](MODEL_CARD.md) | Intended use, model details, and known limitations |


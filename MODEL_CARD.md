# Model card

## Model details

| Field | Record |
| --- | --- |
| Name | GTA San Andreas Style LoRA |
| Artifact | Image-generation LoRA adapter checkpoints |
| Stage | Initial portfolio experiment |
| Architecture | SDXL U-Net |
| Base model | `stabilityai/stable-diffusion-xl-base-1.0` in the Colab launch, revision unpinned |
| Training VAE | `madebyollin/sdxl-vae-fp16-fix` |
| Export | SafeTensors with `format: pt` metadata and rank-12 U-Net attention adapters |

## Intended use

Document an initial style-adaptation experiment and enable inspection of the two original exports. The notebook demonstrates Diffusers inference with the unnumbered final export.

## Training data and procedure

The supplied dataset contains 32 JPEGs whose filenames match the Colab listings. The run used DreamBooth LoRA at 768 pixels and reached 1,000 optimizer steps. Image sources, redistribution permissions, and preparation before Colab are undocumented. See the [dataset inventory](docs/dataset.md) and [training record](docs/current-state.md).

## Evaluation and limitations

I wasn’t happy with how well the early outputs captured the style I was aiming for. Final validation ran out of GPU memory after the run saved the weights. I’ve included [two example outputs](examples/README.md). I haven’t measured how the checkpoints compare.

## Attribution and distribution

The project is a personal experiment inspired by Grand Theft Auto: San Andreas. Confirm base-model terms and the provenance and usage terms of the training images before redistributing the adapters or example images. No license has been assigned in this repository.

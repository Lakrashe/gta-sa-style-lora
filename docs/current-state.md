# Experiment record

## What I tried

I used LoRA to fine-tune an SDXL model from Hugging Face on a small set of San Andreas images.

## Colab training record

The original notebook uses the Diffusers `train_dreambooth_lora_sdxl.py` example with Accelerate. The setup shows a source installation of Diffusers `0.40.0.dev0`. Cell references below count from 1 and include empty cells.

| Setting | Value in the launch that reached 1,000 steps (cell 32) |
| --- | --- |
| Base model | `stabilityai/stable-diffusion-xl-base-1.0` |
| VAE | `madebyollin/sdxl-vae-fp16-fix` |
| Dataset | 32 examples reported by the trainer, consistent with the [supplied archive and Colab listings](dataset.md) |
| Instance prompt | `a photo in SA_STYLE, PS2 era open world game aesthetic` |
| Resolution and LoRA rank | 768 pixels, rank 12 |
| Batch and accumulation | 1 per device, 4 accumulation steps, effective batch size 4 in the log |
| Learning rate | 0.0001, constant scheduler, zero warmup steps |
| Optimizer and precision | 8-bit Adam, fp16 mixed precision, gradient checkpointing |
| Run length and save interval | 1,000 optimizer steps, checkpoint every 500 steps |
| Validation settings | `a character standing in a street, SA_STYLE`, every 50 epochs |
| Seed and logging | 42, Weights & Biases |

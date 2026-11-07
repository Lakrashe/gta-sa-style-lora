# Experiment record

## Reported by the project author

- The project used LoRA to fine-tune a model obtained from Hugging Face.
- The training images came from a small collection chosen for a GTA San Andreas-inspired look.
- The author found the initial generated results unsatisfactory and recorded few details from the run.

## Colab training record

The original notebook uses the Diffusers `train_dreambooth_lora_sdxl.py` example with Accelerate. The setup shows a source installation of Diffusers `0.40.0.dev0`. The Git commit and base-model revision were unpinned. Cell references below count from 1 and include empty cells.

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

An earlier launch at 1,024 pixels targeted 2,000 steps and stopped around step 29 (cell 29). The later launch logged adapter saves in `checkpoint-500` and `checkpoint-1000`, followed by a final export. Final validation then failed with a CUDA out-of-memory error. The error reports 14.56 GiB of total GPU memory. The precise GPU model is unknown.

The numbered uploads are consistent with the two logged save milestones. The notebook has no hashes for those original save paths, so the file-to-step mapping is inferred. The notebook's later inference cell loaded the unnumbered final export. See the [saved inference outputs](../examples/README.md).

## Checkpoint findings

Both originals have 167,928-byte headers with `{"format":"pt"}` as their only metadata. Their tensor descriptors match, including names, shapes, dtypes, and offsets. Their SHA-256 hashes differ, so they are distinct files. See the [hash manifest](../checkpoints/SHA256SUMS).

- Each file has 1,120 float32 tensors under `unet`, covering 560 down/up LoRA pairs. Every down projection has rank 12. The exports contain no text-encoder tensors.
- Keys cover the attention query, key, value, and output projections. For example, `unet.down_blocks.1.attentions.0.transformer_blocks.0.attn2.to_k.lora.down.weight` has shape `[12, 2048]`, and its paired up tensor has shape `[640, 12]`.
- The 2,048-wide cross-attention inputs and 640- and 1,280-wide attention blocks are consistent with the SDXL Base 1.0 model named in the notebook. See the [published SDXL base U-Net configuration](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/blob/main/unet/config.json).

## Evidence still to recover

| Area | Open questions |
| --- | --- |
| Base model and runtime | Exact model revision, Diffusers Git commit, and GPU model |
| Dataset | Source, usage terms, and preparation before the images were added to Colab |
| Checkpoints | Hashes from the original Colab checkpoint paths |
| Evaluation | Controlled comparison across the base model and the two adapters |


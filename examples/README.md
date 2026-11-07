# Original Colab inference outputs

These images were extracted from the notebook's saved JPEG outputs. The two cells used different prompts and pipeline settings, so the images cannot establish the effect of the LoRA.

## Final adapter loaded

[View the snowy village sample](adapter-snowy-village.jpg)

- Prompt `SA_STYLE, a snowy mountain village with wooden cabins`
- SDXL Base 1.0 with the fp16-fix VAE and the unnumbered final adapter export
- 30 inference steps, guidance scale 7.5, CUDA generator seed 42

## Base model only

[View the BMX street sample](base-model-bmx.jpg)

- Prompt `GTA san andreas style, in-game screenshot,a man with an afro and sunglasses riding a BMX bicycle down a city street at dusk, wearing a black vest over a white shirt, green shorts, red sneakers, gold chain, purple twilight sky, colorful low-rise storefronts on both sides, a boxy sedan car driving behind, overhead power lines, street lamps glowing, PS2 era graphics, low poly, flat lighting, desaturated textures`
- SDXL Base 1.0, with inference steps, guidance scale, and seed unspecified in the cell

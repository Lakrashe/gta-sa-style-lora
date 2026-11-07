# Training dataset

My training dataset ZIP contains 32 readable JPEGs under `gta_sa_dataset/`. All 32 filenames match my saved Colab directory listings, and the training log also reports 32 examples. The listings let me match the archive to the notebook by filename.

| Filename pattern | Images |
| --- | ---: |
| `GTA_SanAndreas_DefinitiveEdition_*.jpg` | 14 |
| `gta-sanandreas-*.jpg` | 15 |
| `gtasanandreas-pc-*.jpg` | 3 |

The filename groups suggest a mix of Definitive Edition and other San Andreas imagery. The exact editions, source URLs, and redistribution permissions are undocumented.

| Original dimensions (width × height) | Images |
| --- | ---: |
| 960 × 576 | 1 |
| 960 × 600 | 1 |
| 1080 × 1080 | 1 |
| 1280 × 960 | 2 |
| 1600 × 960 | 1 |
| 1728 × 1080 | 13 |
| 1920 × 600 | 1 |
| 1920 × 1055 | 1 |
| 1920 × 1080 | 11 |

Each JPEG has a distinct SHA-256 hash. This check detects byte-identical copies. Similar images or alternate encodings were not assessed. The ZIP contains no caption files or split manifest. The logged DreamBooth run used a shared instance prompt and a training resolution of 768 pixels. See the [training record](current-state.md).

The training images are kept outside the repository. The SHA-256 of the supplied dataset ZIP is `6a35d3f14e8d84eed16869749b0ac0eb4ecfe4cb0bc8b5421d89e5b080f8a154`.

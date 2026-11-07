# Checkpoints

The downloadable archive includes both original exports in this directory.

- `pytorch_lora_weights_500.safetensors`
- `pytorch_lora_weights_1000.safetensors`

See [SHA256SUMS](SHA256SUMS) for the file digests.

## Git LFS

The repository's `.gitattributes` routes SafeTensors files through Git LFS. To publish the documentation and code, initialize Git and stage those files from the repository root.

```sh
git init -b main
git add README.md MODEL_CARD.md docs scripts examples checkpoints/README.md checkpoints/SHA256SUMS .gitignore .gitattributes
git commit -m "Document initial style LoRA experiment"
```

To add the original weights later, after confirming redistribution terms, install Git LFS and run the following from the repository root.

```sh
git lfs install --local
git add checkpoints/pytorch_lora_weights_500.safetensors checkpoints/pytorch_lora_weights_1000.safetensors
git lfs ls-files
git commit -m "Add original LoRA checkpoints via Git LFS"
```

Confirm both paths appear in `git lfs ls-files` before committing them. After cloning an LFS-backed copy, use `git lfs pull` to fetch weights if the working tree contains pointer files. See [GitHub's Git LFS setup guide](https://docs.github.com/en/repositories/working-with-files/managing-large-files/configuring-git-large-file-storage).

To push to an empty GitHub repository, replace the example URL with your repository URL.

```sh
git remote add origin https://github.com/OWNER/REPOSITORY.git
git push -u origin main
```

---
title: Setting up Remote Server Development Environment
description: A comprehensive guide to setting up a remote development environment on Ubuntu LTS that enables development from any device. This setup eliminates dependencies on local operating systems and hardware limitations while providing a consistent development experience
pubDate: 2024-10-13
lastModDate: 2025-01-14
toc: true
share: true
ogImage: true
---

This is a guide to setup remote server development enviroment (Ubuntu LTS) use the following:

```
1. zsh
2. Tmux
3. Neovim
4. Docker
```

The goal of this setup is to get rid of all dependencies that are caused by the end operating system, and hardware limitation. As long as you have a Linux-based machine, you can basically use any device to get access everything on that machine and start developing. This way, you can even use ipad to develop without any overheads of workflows such as IDEs, keymappings, environments, etc. At the same time, your code is able to run anywhere that supports docker.

## Install Zsh

First, update your system's package repository to ensure you have the latest information:

```bash
sudo apt update
sudo apt install zsh -y
```

If you want to set Zsh as your default shell, use the following command:

```bash
chsh -s $(which zsh)
```

## Enable SSH on your server

```bash
sudo apt update
sudo apt install openssh-server
```

Check if it is running

```bash
sudo service ssh status
```

## Install Tmux

```bash
 sudo apt install tmux
```

## Install Neovim

### via appimage

In `Downloads` folder

```bash
wget https://github.com/neovim/neovim/releases/download/stable/nvim.appimage

mv nvim.appimage ~/Softwares/
chmod u+x nvim.appimage
```

If no FUSE, run via:

```bash
./nvim.appimage --appimage-extract
```

and you can execute with `./squashfs-root/usr/bin/nvim`

To add it to `.profile`, add the following in `.profile`

```
PATH=$PATH:/$HOME/Softwares/squashfs-root/usr/bin
```

## Apply configuration

Install `starship`:

```bash
curl -sS https://starship.rs/install.sh | sh
```

Install `stow` to sync all the dot files

```bash
sudo apt install stow
```

Get the dotfiles

```bash
git clone https://github.com/tiankaixie/dotfiles.git
```

and then `stow` what ever you need

```bash
cd dotfiles
stow tmux
stow nvim
```

Or, apply all configurations

```bash
stow */
```

## Install Docker

Uninstall old versions

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

Install using the apt repository

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
```

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

```bash
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Install

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

If get permission problem, try the following to avoid `sudo` every time:

```bash
sudo usermod -aG docker $USER
```

---
title: LxRunOffline
date: 2021-09-07
categories: 
- WSL
publish: false
---

[DDoSolitary/LxRunOffice](https://github.com/DDoSolitary/LxRunOffline) 是 Github 上面一款功能明显强于 wsl 的 WSL 管理应用。它能够在你使用 wsl 进行 WSL 安装出现问题时，帮助你换一种方式安装 WSL。

## 安装 WSL

LxRunOffline 能够帮助你把 WSL 安装到任意位置，从而避免占用 C 盘空间过大，或者当正常安装 WSL 出现无法解决的问题时帮助你在一个全新位置安装 WSL。

1. [下载 WSL 的离线安装包](https://docs.microsoft.com/en-us/windows/wsl/install-manual)，将下载下来文件的 .APPX 后缀改为 .zip，解压，得到名为 install.tar.gz 的文件。
2. 输入以下命令进行安装
```cmd
lxrunoffline i -n <WSL 名称> -d <安装路径> -f <安装包路径>
```
其中 lxrunoffline 可能需要根据当前路径以及下载的文件名进行更改，<WSL 名称> 可以是任意你自己希望的名称，<安装路径> 是你希望安装 WSL 的文件夹路径，安装包路径为 install.tar.gz 文件所在的位置。

## 更改默认用户

使用 LxRunOffline 安装的 WSL 默认用户为 root（wsl 安装的为你自己设定的用户）。虽然 root 用户也可以在一定程度上满足日常的使用要求，但是不建议直接使用 root 用户。想要更改 WSL 的默认用户，我们需要先在 WSL 里面创建一个新的用户：
```bash
useradd -m -s /bin/bash <用户名> # -m：自动创建用户目录 -s：设置 shell
```
设置这个新用户的密码：
```bash
passwd <用户名>
```
为了方便，我们赋予该用户 sudo 权限，通过将其加入 sudo 组：
```bash
usermod -aG sudo <用户名> # -a：append，附加 -G 添加组
```
查看用户的 UID（一般都为 1000）:
```bash
id -u <用户名>
```
之后就可以退出 WSL，打开 powershell，在 powershell 中输入命令：
```bash
lxrunoffline su -n <WSL 名称> -v <UID>
```

接着再打开 WSL，就可以看到我们的默认用户已经切换成我们新创建的普通用户了。

## 参考文献

- [LxRunOffline 使用教程 - WSL 自定义安装、备份，P3TERX](https://p3terx.com/archives/manage-wsl-with-lxrunoffline.html)
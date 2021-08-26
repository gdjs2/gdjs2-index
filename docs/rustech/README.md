---
title: Rustech 开发解析
date: 2021-08-25
categories: 
- 后端开发
tags: 
- 后端
- rustech
- rust
- 开发
publish: true
---

## 简介

[Rustech](https://github.com/gdjs2/rustech) 是一个用 [Rust](https://www.rust-lang.org) 语言以及后端框架 [Rocket](https://rocket.rs) 编写的 Web 转发后端，并且封装了对应后端的部分接口。其转发对象为 [https://tis.sustech.edu.cn](https://tis.sustech.edu.cn)。这是南方科技大学的教务系统的网站，因为各种原因，包括但不限于标签命名、返回数据冗杂，其提供的接口不太便于使用，于是便诞生了将其包装的想法。另一方面，因为自己想要学习 Rust 的基本使用，单纯看教程不管是兴趣还是学习效率都没有那么高，从这个项目开始入手，也是一个不错的选择。

## 目录结构
```
.
├── Cargo.lock
├── Cargo.toml
├── Dockerfile
├── LICENSE
├── README.md
├── Rocket.toml
├── index
│   └── index.html
├── pic
│   ├── course_grades.png
│   ├── rustech.png
│   └── semester_gpa.png
└── src
    ├── apis.rs
    ├── encrypt.rs
    ├── lib.rs
    ├── login.rs
    ├── main.rs
    ├── structures.rs
    └── urls.rs
```

- ./src/apis.rs 是主要暴露给 Web 应用的接口，对应 Springboot Web 里面的 Controller。
- ./src/encrypt.rs 是一个加盐哈希的哈希以及验证接口。
- ./src/lib.rs lib 库。
- ./src/login.rs 登录学校 CAS 的主要接口。
- ./src/main.rs Rocket 的主方法入口。
- ./src/structures.rs 主要用到的结构体，包括返回的数据结构。
- ./src/urls.rs 访问学校教务系统的主要 url，都是常量。

## 模块介绍

### main

主模块只有一个任务，将我们写好的接口路由到我们的 Rocket 框架上面，在 Rocket 框架里，除去将我们需要作为 web 接口的方法实现对应的 trait 之外，还需要将他们路由上去。

### apis

该模块包含了所有我们希望作为 Web 接口的方法，所有的接口都是实现的 Rocket 给我们提供的 rocket::get trait，意味着我们 rustech 所有的 web 接口都需要使用 GET 方法去访问。

### encrypt

该模块实现了一个简单的加盐哈希功能，我们的“盐”值以及之后的哈希值的长度都是 512 位。我们会对用户输入的密码进行 831 次迭代之后存在 Rocket 提供的一个可持续数据结构当中，以供我们验证用户的身份，并且复用我们从教务系统登录获取的 Cookie。

当我们的后端在第一次通过用户提供的账号和密码成功登录的时候，我们的后端保存用户的 Cookie，如果我们不对之后的请求验证用户密码，那么一个非法的密码输入可能就能通过复用 Cookie 从而达成非法的访问。我们选择了在后端记录第一次成功登录的密码，并且在适当的时候进行更新，并且对之后的每次访问都进行密码的验证，从而保证是正确的用户访问了他的账号。

但由于我们不能将用户的密码明文保存在我们的后端，所以我们使用了目前来看最安全的单向加密算法——加盐哈希。

### login

这个模块包含了所有的登录方法，包括 CAS 登录以及 TIS 的登录。如果想了解学校 CAS 登录系统和各个系统之间是如何通信的，可以研究一下这个模块的实现。

### structures

包含了所有在程序当中使用到的结构体，并且大多数都是后端范围给前端的数据结构。

### urls

包含了所有被后端包装的学校教务系统的接口以及 CAS 登录的接口。

## 注意

- 虽然 Rust 的所有权机制可以在很大程度上避免多线程时的冲突问题，但是也同时带来了很多的不方便。但好在 Rust 当中的 trait 机制可以帮我们很方便的使用 Mutex 锁，从而根据我们的需求完成不同进程当中的数据共享。Rocket 给我们提供了一个状态保留机制，我们可以在每个请求的参数里面提供一个固定类型的参数，Rocket 会帮我们维护并传入该类型的一个数据结构进入我们的方法，从而让我们在每个请求当中的状态得以保留。
- 我们解决用户验权的方式并不是最好的，根据当前的主流方案，我们应该使用 Senssion 或者 Cookie 进行状态的保持，而不应该是每次验权。但是考虑到该后端对应的第一前端应该是一个微信小程序，并且小程序的开发之前并没有前端的开发经验，所以就使用了最简单的一种。
- 我们对应的后端搭建在 [https://rustech.gdjs2.cn](https://rustech.gdjs2.cn) 上面
- 我们也有一个对应的小程序 SUSTecHelper，欢迎南科大的同学进行使用。  
![SUSTecHelper](../.vuepress/public/rustech/sustechelper.jpg)


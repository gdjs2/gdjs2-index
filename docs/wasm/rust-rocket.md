---
title: Web Assembly
date: 2021-09-09
categories: 
- WASM
tags: 
- 前端
- WASM
publish: false
---

## 分析

[crate::socket2](https://github.com/rust-lang/socket2) 是 rust 最底层的套接字（socket）实现，在其支持平台上明确写有
- Tier 1: Linux, macOS, Windows
- Tier 2: Android, FreeBSD, Fuchsia, iOS, illumos, NetBSD, Redox, Solaris
- Tier 3 (Not supported yet, while in best effort):  Haiku, Hermit, OpenBSD, VxWorks, DragonFly BSD

可以看到 wasm-wasi 还没有加入（可能）支持的列表，所以如果想要编译基于套接字编程的 rust 程序，可能都会存在一样的困难。可能之后需要进一步的研究。

## 错误

```shell
   Compiling socket2 v0.4.1
   Compiling standback v0.2.17
   Compiling indexmap v1.7.0
   Compiling time v0.2.27
   Compiling uncased v0.9.6
error[E0432]: unresolved import `crate::sys`
 --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/sockaddr.rs:5:12
  |
5 | use crate::sys::{
  |            ^^^ could not find `sys` in the crate root

error[E0432]: unresolved imports `crate::sys`, `crate::sys`
  --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/socket.rs:21:12
   |
21 | use crate::sys::{self, c_int, getsockopt, setsockopt, Bool};
   |            ^^^   ^^^^ no `sys` in the root
   |            |
   |            could not find `sys` in the crate root

error[E0432]: unresolved import `sys`
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:129:5
    |
129 | use sys::c_int;
    |     ^^^ use of undeclared crate or module `sys`

error[E0433]: failed to resolve: could not find `sys` in the crate root
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/sockaddr.rs:169:29
    |
169 |             let ip = crate::sys::from_in_addr(addr.sin_addr);
    |                             ^^^ could not find `sys` in the crate root

error[E0433]: failed to resolve: could not find `sys` in the crate root
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/sockaddr.rs:176:29
    |
176 |             let ip = crate::sys::from_in6_addr(addr.sin6_addr);
    |                             ^^^ could not find `sys` in the crate root

error[E0433]: failed to resolve: could not find `sys` in the crate root
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/sockaddr.rs:227:30
    |
227 |             sin_addr: crate::sys::to_in_addr(&addr.ip()),
    |                              ^^^ could not find `sys` in the crate root

error[E0433]: failed to resolve: could not find `sys` in the crate root
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/sockaddr.rs:262:31
    |
262 |             sin6_addr: crate::sys::to_in6_addr(addr.ip()),
    |                               ^^^ could not find `sys` in the crate root

error[E0433]: failed to resolve: use of undeclared crate or module `sys`
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:149:37
    |
149 |     pub const IPV4: Domain = Domain(sys::AF_INET);
    |                                     ^^^ use of undeclared crate or module `sys`

error[E0433]: failed to resolve: use of undeclared crate or module `sys`
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:152:37
    |
152 |     pub const IPV6: Domain = Domain(sys::AF_INET6);
    |                                     ^^^ use of undeclared crate or module `sys`

error[E0433]: failed to resolve: use of undeclared crate or module `sys`
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:191:35
    |
191 |     pub const STREAM: Type = Type(sys::SOCK_STREAM);
    |                                   ^^^ use of undeclared crate or module `sys`

error[E0433]: failed to resolve: use of undeclared crate or module `sys`
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:196:34
    |
196 |     pub const DGRAM: Type = Type(sys::SOCK_DGRAM);
    |                                  ^^^ use of undeclared crate or module `sys`

error[E0433]: failed to resolve: use of undeclared crate or module `sys`
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:233:43
    |
233 |     pub const ICMPV4: Protocol = Protocol(sys::IPPROTO_ICMP);
    |                                           ^^^ use of undeclared crate or module `sys`

error[E0433]: failed to resolve: use of undeclared crate or module `sys`
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:236:43
    |
236 |     pub const ICMPV6: Protocol = Protocol(sys::IPPROTO_ICMPV6);
    |                                           ^^^ use of undeclared crate or module `sys`

error[E0433]: failed to resolve: use of undeclared crate or module `sys`
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:239:40
    |
239 |     pub const TCP: Protocol = Protocol(sys::IPPROTO_TCP);
    |                                        ^^^ use of undeclared crate or module `sys`

error[E0433]: failed to resolve: use of undeclared crate or module `sys`
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:242:40
    |
242 |     pub const UDP: Protocol = Protocol(sys::IPPROTO_UDP);
    |                                        ^^^ use of undeclared crate or module `sys`

error[E0433]: failed to resolve: use of undeclared crate or module `sys`
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:275:18
    |
275 |         self.0 & sys::MSG_TRUNC != 0
    |                  ^^^ use of undeclared crate or module `sys`

error[E0433]: failed to resolve: use of undeclared crate or module `sys`
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:283:33
    |
283 | pub struct MaybeUninitSlice<'a>(sys::MaybeUninitSlice<'a>);
    |                                 ^^^ use of undeclared crate or module `sys`

error[E0433]: failed to resolve: use of undeclared crate or module `sys`
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:302:31
    |
302 |         MaybeUninitSlice(sys::MaybeUninitSlice::new(buf))
    |                               ^^^^^^^^^^^^^^^^ not found in `sys`
    |
help: consider importing this struct
    |
62  | use crate::socket::MaybeUninitSlice;
    |

   Compiling cookie v0.15.1
error[E0308]: mismatched types
    --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/socket.rs:1648:23
     |
1648 | from!(net::TcpStream, Socket);
     |                       ^^^^^^ expected struct `Socket`, found `()`
     | 
    ::: /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:104:16
     |
104  |             fn from(socket: $from) -> $for {
     |                ---- implicitly returns `()` as its body has no tail or `return` expression

error[E0308]: mismatched types
    --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/socket.rs:1649:25
     |
1649 | from!(net::TcpListener, Socket);
     |                         ^^^^^^ expected struct `Socket`, found `()`
     | 
    ::: /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:104:16
     |
104  |             fn from(socket: $from) -> $for {
     |                ---- implicitly returns `()` as its body has no tail or `return` expression

error[E0308]: mismatched types
    --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/socket.rs:1650:23
     |
1650 | from!(net::UdpSocket, Socket);
     |                       ^^^^^^ expected struct `Socket`, found `()`
     | 
    ::: /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:104:16
     |
104  |             fn from(socket: $from) -> $for {
     |                ---- implicitly returns `()` as its body has no tail or `return` expression

error[E0308]: mismatched types
    --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/socket.rs:1651:15
     |
1651 | from!(Socket, net::TcpStream);
     |               ^^^^^^^^^^^^^^ expected struct `TcpStream`, found `()`
     | 
    ::: /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:104:16
     |
104  |             fn from(socket: $from) -> $for {
     |                ---- implicitly returns `()` as its body has no tail or `return` expression

error[E0308]: mismatched types
    --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/socket.rs:1652:15
     |
1652 | from!(Socket, net::TcpListener);
     |               ^^^^^^^^^^^^^^^^ expected struct `TcpListener`, found `()`
     | 
    ::: /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:104:16
     |
104  |             fn from(socket: $from) -> $for {
     |                ---- implicitly returns `()` as its body has no tail or `return` expression

error[E0308]: mismatched types
    --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/socket.rs:1653:15
     |
1653 | from!(Socket, net::UdpSocket);
     |               ^^^^^^^^^^^^^^ expected struct `UdpSocket`, found `()`
     | 
    ::: /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/lib.rs:104:16
     |
104  |             fn from(socket: $from) -> $for {
     |                ---- implicitly returns `()` as its body has no tail or `return` expression

error[E0061]: this function takes 4 arguments but 3 arguments were supplied
   --> /Users/gdjs2/.cargo/registry/src/github.com-1ecc6299db9ec823/socket2-0.4.1/src/sockaddr.rs:178:33
    |
178 |             Some(SocketAddr::V6(SocketAddrV6::new(
    |                                 ^^^^^^^^^^^^^^^^^ expected 4 arguments
179 |                 ip,
    |                 --
180 |                 port,
    |                 ----
181 |                 addr.sin6_flowinfo,
    |                 ------------------ supplied 3 arguments
    |
note: associated function defined here
   --> /Users/gdjs2/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/std/src/net/addr.rs:371:12
    |
371 |     pub fn new(ip: Ipv6Addr, port: u16, flowinfo: u32, scope_id: u32) -> SocketAddrV6 {
    |            ^^^

   Compiling atomic v0.5.0
   Compiling figment v0.10.6
   Compiling multer v2.0.1
error: aborting due to 25 previous errors

Some errors have detailed explanations: E0061, E0308, E0432, E0433.
For more information about an error, try `rustc --explain E0061`.
error: could not compile `socket2`

To learn more, run the command again with --verbose.
warning: build failed, waiting for other jobs to finish...
error: build failed
```
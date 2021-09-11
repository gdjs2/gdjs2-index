---
title: "RCTF 2021: Checkin"
date: 2021-09-12
categories: 
- CTF
tags: 
- CTF-MISC
publish: false
---

## 思路

题目地址：[https://github.com/CheckInChallenge/CheckIn](https://github.com/CheckInChallenge/CheckIn)  

算是签到难度的题目了，但及时如此这道题桦桦还是花了很久时间才发现。起因是发现许多人都在提交 50000～60000 这个范围内的数字。所以出于好奇我们也提交了一下，在 Action 的运行记录当中会发现有一个数字被替代成了 ***，联想到下面 Flag 的打码，于是猜测 Github Action 会将所有与 Secret 内容相同的内容全部替换。找到替换的数字，即是 flag。

## 结果

![结果](/RCTF-2021/checkin.png)

::: tip
flag: RCTF{52079}
:::
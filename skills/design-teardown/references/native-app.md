# 进阶:拆本地原生 app(最高深度)

网页拆解靠线上抽取;**本地安装的原生 app** 能拆得更深——直接拿到源文件与真实运行帧,不受线上混淆、登录墙限制。
典型对象:Chromium 系桌面应用(浏览器、Electron)内建的 `chrome://` 页面、打包进 app 的字体、视频、Lottie。

前提:app 已安装在本机,且允许对其做研究性逆向(内部研究、复刻参考)。产出仍**务必私有**(含受版权素材与商业字体)。

## 1、解包 resources.pak(拿源文件)

Chromium 把 WebUI 资源打进 `resources.pak`(GRIT v5 容器,含 gzip/brotli 段)。解开即得内建页的
HTML、CSS、JS、Lottie JSON、内嵌字体等**源文件级实锤**。

- 定位:`<App>.app/Contents/Frameworks/<...>Framework.framework/Versions/<ver>/Resources/resources.pak`。
- 解析:读 pak 头(版本 + 条目数 + 编码),按条目偏移切分,逐条按需 gunzip、brotli 解压,dump 成文件。
- 从解出的 CSS 里挖真实 token(色值、缓动、时长、圆角、CSS 变量),从 JSON 认 Lottie,从 ttf/woff 认字体。
- 参考实现:本 skill 起源仓库 `Design-Teardown/tools/unpack_pak.py`(GRIT v5 解包)、`extract_media.py`(切媒体)、`analyze_lottie.py`(读 Lottie 渐变停靠点)。按需移植。

## 2、CDP 抓真实帧(录真运行,不碰用户会话)

后台程序在 macOS 无法录制用户桌面、也不应代点用户的安装流程(屏幕录制权限 + 无桌面 GUI 自动化的安全边界)。
正路是走 Chromium 自带的**远程调试协议(CDP)**:

- 用 app 自带的 Chromium,以 `--remote-debugging-port` + 独立 `--user-data-dir` 起一个**隔离的一次性实例**;
- 在这个实例里打开目标内建页(如 `chrome://<app>-onboarding`),经 CDP `Page.startScreencast` 从渲染器**直抓真实帧**,拼成录屏;
- 全程**不触碰用户真实浏览器会话与数据**,且是「真实运行的像素,不是拼接合成」。
- 参考实现:`Design-Teardown/tools/cdp_capture.py`。

## 3、拆解产出

与网页版同构:真实 token 表 + 真实资产(字体、视频、音频、Lottie、源码)+ 真实录屏关键帧 → 针对该 app 视觉语言的
交互拆解页 + 三份文档 + 两份审查。区分**实锤**(源文件、源码级)与**推断**(营销层、公开资料)。

## 边界

- 只做研究性逆向与复刻参考,产出私有;不分发受版权素材、商业字体。
- 版本相关:数值以「当前解包的那个版本」为准,注明版本号(app 更新后需重解)。

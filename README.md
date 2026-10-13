# Frost Land 本地运行验证包

这是公开发布的 Unity WebGL 构建的本地加载环境，不是恢复的 Unity 编辑器源工程。原游戏及资源归 UltraGames Entertainment 等原权利方所有。本仓库未授予第三方游戏程序和资源的再分发许可。

## 启动

1. 双击 `start.cmd`，保持窗口开启。需要 Node.js；脚本也能使用当前 Codex 自带的 Node.js。
2. 用 Chrome 或 Edge 打开 http://localhost:8787/ 。后续请保持使用同一地址，以免浏览器存档按不同域名隔离。
3. WASD、方向键或鼠标移动。不要双击 index.html 以 file:// 加载。
4. 结束时在服务器窗口按 Ctrl+C。

服务器仅监听本机回环地址。如果 8787 已在运行，不要启动第二个服务器，直接打开地址。

## 验证状态（2026-10-13）

- 本地 HTTP 服务、Wasm MIME 类型和四个 Build 文件均已检查。
- Wasm 文件头为 `00 61 73 6D 01 00 00 00`，Data 文件头为 `UnityWebData1.0`。
- 内置浏览器加载本地页面后，createUnityInstance Promise 已成功返回，服务器收到 `Unity initialized`。
- 后续排查发现缺少 StreamingAssets/aa/settings.json。现已补齐 settings.json、catalog.bin 和目录列出的 8 个 WebGL bundle。
- 已在内置浏览器验证开场动画、关卡选择、新手对话、雪地角色与喷火画面；任务已从 Collect 5 Wood 推进到 Expand Warm Area。运行截图为 ../analysis/frost-land/local-running.png。
- 未验证完整建造流程、重载存档、联机、支付或长时间运行。
- 无法承诺完全离线：原框架会加载 CrazyGames SDK；广告、账号、云存档、支付和多人服务仍依赖外部平台。保留原接入代码，未模拟购买/广告成功、未修改域名或授权检查。
- 当前目录列出的额外资源包已补齐，后续活动和远程内容仍未全部验证。

## 文件来源

原页面：https://www.crazygames.com/de/game/frost-land

构建目录：https://files.crazygames.com/frost-land/132/Build/

| 本地文件 | 原文件 |
|---|---|
| Build/game.loader.js | 8801cd935c300369e0cc47f26d10e21f.loader.js |
| Build/game.framework.js | 3045cae7652173dc57942840ad0b7dcf.framework.js.br |
| Build/game.wasm | e039cc4c0b6ba275a53f31aa564e0529.wasm.br |
| Build/game.data | 1924508cf72cd7d84c34b5582e67dcb1.data.br |

下载工具已进行 HTTP 解压，因此本地文件没有 `.br` 后缀，服务器不设置 Content-Encoding: br，避免二次解压。

## 还原范围

已保存：约 126 MiB 的原发布构建、本地启动页面和服务器。

未恢复：原始 C# 源码、Unity 项目设置、可编辑场景/Prefab 工程，以及远程后台。Data 包包含 IL2CPP global-metadata.dat；程序集清单中存在 Assembly-CSharp、PhotonUnityNetworking、PhotonRealtime、Unity.Addressables 和 Xsolla，但清单中的 DLL 名称不等于包内存在可直接反编译的托管 DLL。

分析资料位于 `../analysis/frost-land/`：文件表、程序集清单、SHA-256 校验值及 REA 证据。REA 本轮已使用 max_heap_mb=4096，框架脚本语义分析仍耗尽堆内存，结果为 partial。

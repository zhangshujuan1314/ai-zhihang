# AI知航

**在知识的海洋中找到你的航向。**

AI知航是一个以"知识海洋"为世界观的 AI 学习成长平台，将零散信息组织成可探索、可积累、可成长的知识地图。

## 线上地址

[https://ai-zhihang-v2.netlify.app](https://ai-zhihang-v2.netlify.app)

## 世界观

```
海洋（AI信息海洋）→ 岛屿（知识领域）→ 贝壳（零散知识）→ 珍珠（掌握的知识）
```

核心资产：**海图 + 岛屿 + 贝壳 + 珍珠**

## 核心玩法

| 玩法 | 说明 |
|------|------|
| 收集贝壳 | 随手捡起零散知识碎片，自动归档汇聚成知识图鉴 |
| 深潜寻珠 | 每天下潜到不同深度，采珍珠串成知识项链 |
| 启航探险 | 每日藏宝图碎片任务，集齐解锁知识宝藏 |

## 技术栈

- **框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS v4
- **动画**: Framer Motion
- **图标**: Phosphor Icons
- **字体**: Cormorant Garamond + Inter（Claude 风格）
- **部署**: Netlify (静态导出)

## 设计风格

采用 Anthropic Claude 的设计语言：
- 温暖米色画布 (`#faf9f5`)
- 珊瑚色强调 (`#cc785c`)
- 衬线标题 + 无衬线正文
- 极简卡片 + 微弱阴影

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建静态版本
npm run build

# 部署到 Netlify
node scripts/zip.js    # 生成 site-adm.zip
# 然后上传到 Netlify
```

## 页面结构

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | Claude 风格着陆页 |
| `/login` | 登录 | 左右分栏 + Google 登录 |
| `/dashboard` | 控制台 | 数据面板 + 快速入口 |
| `/explore` | 探索 | 收集贝壳 / 深潜寻珠 / 启航探险 |
| `/map` | 知识地图 | 7个知识岛屿网格 |
| `/profile` | 个人中心 | 段位系统 + 成就徽章 |

## 许可

MIT

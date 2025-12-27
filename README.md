---


# ✨ Nova Tech Space

[![Built with React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Powered by Vite 7](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)
[![Styled with Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Deployment - CF Pages](https://img.shields.io/badge/Deployment-CF_Pages-F38020?logo=cloudflare)](https://pages.cloudflare.com/)

**Nova Tech Space** 是一款基于 React 19 和 Vite 7 构建的现代化、高性能个人技术博客与作品集网站。它秉承“静态优先，动态增强”的架构思想，专为追求极致加载速度与 Apple 级视觉审美的极客设计。

[查看 Demo 演示](https://nova.zz.ac) · [报告问题](https://github.com/handsomjack0/Blog/issues)

---

## 🌟 项目亮点 (Key Features)

### 🎨 极致的审美与交互 (Visual & UX)
- **Bento Grid 布局**: 首页采用 Apple 风格的便当盒栅格设计，完美展示核心云资产。
- **Glassmorphism 风格**: 全站深度应用毛玻璃特效，配合细腻的微交互动画 (Framer Motion)。
- **沉浸式暗黑模式**: 丝滑的昼夜切换，自动适配系统偏好。

### ⚙️ 硬核技术架构 (Technical Architecture)
- **No-Database 理念**: 完全放弃传统数据库，采用 Git-based CMS 模式，数据即代码，部署零成本。
- **混合驱动渲染**: 构建时自动扫描 `Markdown` 生成索引，运行时按需获取内容，实现瞬时加载。
- **React 19 尝鲜**: 深度应用 React 19 最新特性，保证代码的长期前瞻性。

### 🛠️ 生产力工具集成 (Productivity)
- **极客指挥中心**: 侧边栏实时监测云服务器（如 Oracle ARM）的在线状态与延迟。
- **高级 MD 渲染**: 原生支持 Katex 数学公式、PrismJS 代码高亮及 Mermaid 流程图。
- **Decap CMS**: 集成可视化后台，让你像使用 WordPress 一样编辑 Markdown。

---

## 🚀 技术栈 (Tech Stack)

| 领域 | 技术选型 |
| :--- | :--- |
| **核心框架** | React 19 + TypeScript + Vite 7 |
| **样式方案** | Tailwind CSS + Framer Motion |
| **内容处理** | React Markdown + Gray-matter + Fuse.js |
| **交互增强** | Lucide React + EmailJS + Giscus |
| **基础设施** | GitHub Actions + Cloudflare Pages |

---

## 🛠️ 快速开始 (Quick Start)

### 1. 克隆项目
```bash
git clone https://github.com/handsomjack0/Blog.git
cd Blog
```

### 2. 安装依赖
```bash
npm install
```

### 3. 本地开发
```bash
npm run dev
```

### 4. 构建索引
如果你新增了博文，运行此脚本更新 `posts.json`：
```bash
npm run gen
```

---

## ⚙️ 配置文件 (Configuration)

本项目设计了极高的可配置性，你几乎只需要修改一个文件即可完成个性化：

- **基础信息**: 修改 `src/constants.ts` 里的 `SITE_CONFIG` 对象。
- **发布文章**: 在 `public/posts/` 目录下添加 `.md` 文件，确保包含 Frontmatter 头部。
- **状态监控**: 在 `constants.ts` 的 `ENDPOINTS` 数组中添加你想监控的服务器 URL。

---

## 📦 部署 (Deployment)

建议部署在 **Cloudflare Pages** 以获得最佳的全球边缘加速体验：

1. 连接你的 GitHub 仓库到 Cloudflare Pages。
2. 构建命令 (Build command): `npm run build`
3. 输出目录 (Output directory): `dist`
4. 环境变量 (Node version): `20` 或更高。

---

## 🗺️ 路线图 (Roadmap)

- [ ] 集成 Cloudflare KV 实现文章阅读量统计
- [ ] 增加 Cmd + K 全局极客命令面板
- [ ] 自动化 AI 文章总结插件
- [ ] 多语言 (i18n) 国际化支持

## 📄 开源协议 (License)

本项目基于 [MIT License](LICENSE) 协议开源。

---

**Designed with ❤️ by [Nova](https://nova.zz.ac)**


---

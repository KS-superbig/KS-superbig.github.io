# XYK的个人博客 🚀

> ⚠️ **注意：本项目正在积极开发中，部分功能尚未完成**

## 🌐 网站地址

**在线访问**: [https://KS-superbig.github.io](https://KS-superbig.github.io)

## 📖 项目简介

这是一个基于 [Hexo](https://hexo.io/) 框架搭建的个人博客，使用 [Shoka](https://shoka.lostyu.me/) 主题，部署在 GitHub Pages 上。

## ✨ 已实现功能

- **博客系统** - 基于 Hexo 的文章发布与管理
- **Algolia 搜索** - 全站内容搜索
- **RSS/Atom 订阅** - 支持多种订阅格式
- **Markdown 增强** - 支持目录、表格、注音等扩展语法
- **代码高亮** - 使用 highlight.js 进行代码渲染
- **KaTeX 数学公式** - 支持数学公式渲染

## 🔨 正在开发的功能

### 📷 相册页面 (`/photo`)
- 基于 GSAP ScrollTrigger 的滚动动画
- 轮播图展示
- 图片模态框预览

### 💻 CS杂记页面 (`/cs`)
- 计算机科学学习笔记索引
- 卡片式课程导航（如 CSAPP）
- 波浪动画背景效果

### 👤 个人主页 (`/profile`)
- 个人介绍页面
- 自定义样式展示

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Hexo 7.3.0 |
| 主题 | hexo-theme-shokax |
| 搜索 | Algolia |
| 动画 | GSAP, theme-shokax-anime |
| 评论 | Waline / Twikoo |
| 部署 | GitHub Pages / Vercel |

## 📁 项目结构

```
├── source/
│   ├── _posts/      # 博客文章
│   ├── cs/          # CS杂记页面
│   ├── photo/       # 相册页面
│   ├── profile/     # 个人主页
│   └── images/      # 图片资源
├── themes/          # 主题文件
├── _config.yml      # Hexo 配置
└── package.json     # 项目依赖
```

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 启动本地服务器
npm run server

# 生成静态文件
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 📝 内容方向

- 计算机科学基础（CSAPP 等经典课程笔记）
- 编程技术分享
- 个人学习记录

---

*持续更新中...*

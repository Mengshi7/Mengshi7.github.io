# 我的技术笔记

基于 VitePress 的中文技术笔记站点，记录 Java、Spring Boot、Redis、MySQL、Linux、Docker 等技术学习与开发实践。

## 本地使用

需要安装 Node.js（建议使用当前 LTS）和 npm。在项目根目录运行：

```bash
npm install
npm run docs:dev
```

构建与本地预览：

```bash
npm run docs:build
npm run docs:preview
```

笔记以 Markdown 文件保存在 `docs/` 下。新增 `.md` 文件即可成为页面；新增分类时，请同时在 `docs/.vitepress/config.mts` 中添加顶部导航和侧边栏配置。

## GitHub Pages 部署

工作流位于 `.github/workflows/deploy.yml`，推送到 `main` 或在 Actions 页面手动运行时会构建并发布到 GitHub Pages。它通过官方 `configure-pages` Action 取得仓库的 Pages base path，因此支持项目站点和 `USERNAME.github.io` 个人站点，无需在代码中填写用户名。

首次部署前：

1. 创建 GitHub 仓库并将本地仓库连接到该 remote。
2. 推送 `main` 分支。
3. 在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。
4. 在 **Actions** 中查看 `Deploy to GitHub Pages` 工作流结果。

当前目录原本没有 Git 仓库和 GitHub remote；部署地址将在仓库创建并推送后由 GitHub 确定。若要做个人主页，请将仓库命名为 `你的用户名.github.io`；若作为项目博客，可使用你选择的仓库名。

## 目录

```text
docs/
├── index.md
├── Java/
├── Spring/
├── Redis/
├── MySQL/
├── Linux/
├── Docker/
└── .vitepress/config.mts
```

import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { basename, extname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsDir = fileURLToPath(new URL('..', import.meta.url))
const categories = [
  { name: 'Java', label: 'Java' },
  { name: 'Spring', label: 'Spring Boot' },
  { name: 'Redis', label: 'Redis' },
  { name: 'MySQL', label: 'MySQL' },
  { name: 'Linux', label: 'Linux' },
  { name: 'Docker', label: 'Docker' },
  { name: 'ACM', label: 'ACM' },
]

function markdownLabel(file: string) {
  const source = readFileSync(file, 'utf8')
  const heading = source.match(/^#\s+(.+)$/m)?.[1]?.trim()
  return heading || basename(file, extname(file))
}

function sidebarItems(directory: string): Array<Record<string, unknown>> {
  const entries = readdirSync(directory)
    .map((name) => ({ name, path: join(directory, name) }))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
  const index = entries.find((entry) => entry.name.toLowerCase() === 'index.md')
  const items: Array<Record<string, unknown>> = []

  if (index) {
    const route = `/${relative(docsDir, index.path).split(sep).join('/').replace(/index\.md$/i, '')}`
    items.push({ text: '分类首页', link: route })
  }

  for (const entry of entries) {
    if (entry === index) continue
    if (statSync(entry.path).isDirectory()) {
      const children = sidebarItems(entry.path)
      if (children.length) items.push({ text: entry.name, items: children })
      continue
    }
    if (extname(entry.name).toLowerCase() !== '.md') continue

    const route = `/${relative(docsDir, entry.path).split(sep).join('/').replace(/\.md$/i, '')}`
    items.push({ text: markdownLabel(entry.path), link: route })
  }

  return items
}

const sidebar = Object.fromEntries(
  categories
    .filter(({ name }) => readdirSync(docsDir).includes(name))
    .map(({ name, label }) => [
      `/${name}/`,
      [{ text: label, items: sidebarItems(join(docsDir, name)) }],
    ]),
)

export default defineConfig({
  lang: 'zh-CN',
  title: '我的技术笔记',
  description: '记录 Java、Spring Boot、Redis、MySQL、Linux、Docker、ACM 等技术学习与开发实践。',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    config(md) {
      md.use(mathjax3)
    },
  },
  themeConfig: {
    siteTitle: '我的技术笔记',
    nav: [
      { text: '首页', link: '/' },
      { text: 'Java', link: '/Java/' },
      { text: 'Spring Boot', link: '/Spring/' },
      { text: 'Redis', link: '/Redis/' },
      { text: 'MySQL', link: '/MySQL/' },
      { text: 'Linux', link: '/Linux/' },
      { text: 'Docker', link: '/Docker/' },
      { text: 'ACM', link: '/ACM/' },
      { text: 'GitHub', link: 'https://github.com/Mengshi7' },
    ],
    sidebar,
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索笔记', buttonAriaLabel: '搜索笔记' },
              modal: {
                noResultsText: '没有找到相关结果',
                resetButtonTitle: '清除搜索条件',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
        },
      },
    },
    editLink: {
      pattern: 'https://github.com/Mengshi7/Mengshi7.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
    outline: { label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新于' },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容',
  },
})

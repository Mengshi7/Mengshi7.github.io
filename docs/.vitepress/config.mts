import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

export default defineConfig({
  lang: 'zh-CN',
  title: '我的技术笔记',
  description: '记录 Java、Spring Boot、Redis、MySQL、Linux、Docker 等技术学习与开发实践。',
  base: '/',
  cleanUrls: true,
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
    ],
    sidebar: {
      '/Java/': [
        { text: 'Java', items: [
          { text: '分类首页', link: '/Java/' },
          { text: 'Java 笔记模板', link: '/Java/Java笔记模板' },
        ] },
      ],
      '/Spring/': [{ text: 'Spring Boot', items: [{ text: '分类首页', link: '/Spring/' }] }],
      '/Redis/': [{ text: 'Redis', items: [
        { text: '分类首页', link: '/Redis/' },
        { text: 'Redis 基础', link: '/Redis/Redis基础' },
      ] }],
      '/MySQL/': [{ text: 'MySQL', items: [{ text: '分类首页', link: '/MySQL/' }] }],
      '/Linux/': [{ text: 'Linux', items: [{ text: '分类首页', link: '/Linux/' }] }],
      '/Docker/': [{ text: 'Docker', items: [{ text: '分类首页', link: '/Docker/' }] }],
    },
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

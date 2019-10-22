module.exports = {
  title: 'bc8.org',
  decription: 'this is a sandbox for internet experiments',
  markdown: {
    lineNumbers: true,
    toc: {
      includeLevel: [1, 2]
    },
    extendMarkdown: md => {
      md.use(require('markdown-it-footnote'));
      md.use(require('markdown-it-task-lists'));
      md.use(require('markdown-it-mathtex'));
      md.use(require('markdown-it-container'));
      md.use(require('markdown-it-emoji'));
    }
  },
  plugins: [
    '@vuepress/last-updated',
    '@vuepress/register-components',
    '@vuepress/search',
    '@vuepress/medium-zoom',
    '@vuepress/nprogress',
    'git-log',
    {
      additionalArgs: '--no-merge',
      onlyFirstAndLastCommit: true
    }
  ],
  theme: 'yuu',
  themeConfig: {
    displayAllheaders: true,
    sidebar: true,
    lastUpdated: 'updated at',
    search: true,
    nav: [
      {
        about: 'about',
        link: '/about/',
      },
      {
        text: 'contact',
        link: '/contact/',
      },
    ],
    sidebar: [
      '/',
      '/ideas/',
      '/code/',
      '/media/',
    ]
  },
}
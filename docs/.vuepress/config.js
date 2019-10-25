module.exports = {
  title: 'bc8.org',
  decription: 'this is a sandbox for internet experiments',
  port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
  head: [
    [
      'link',
      { rel: 'license', href: 'http://creativecommons.org/licenses/by/4.0/' }
    ],
    ['link', { rel: 'shortcut icon', href: '/images/logo.png' }]
  ],
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
  plugins: {
    '@vuepress/last-updated': {},
    '@vuepress/register-components': {},
    '@vuepress/search': {},
    '@vuepress/medium-zoom': {
      options: {
        background: '#222'
      }
    },
    'git-log': {
      additionalArgs: '--no-merge',
      onlyFirstAndLastCommit: true
    },
    'mermaidjs': {},
    'feed': {
      canonical_base: 'https://bc8.org'
    }
  },
  theme: 'yuu',
  themeConfig: {
    displayAllheaders: true,
    sidebar: true,
    lastUpdated: 'updated at',
    search: true,
    nav: [
      {
        text: 'Feed',
        link: 'https://bc8.org/feed.atom'
      },
      {
        text: 'Home',
        link: '/'
      },
      {
        text: "Who's Here?",
        link: '/who/'
      }
    ],
    sidebar: ['/', '/ideas/', '/code/', '/media/'],
    yuu: {
      colorThemes: ['red', 'blue'],
      defaultColorTheme: 'red',
      defaultDarkTheme: true,
      disableThemeIgnore: true
    }
  }
};

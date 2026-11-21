import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// GitHub prism theme with a few token colors darkened to meet WCAG AA (4.5:1) on its #f6f8fa background
const darkened: Record<string, string> = {
  '#999988': '#717165',
  '#e3116c': '#da1068',
  '#36acaa': '#277c7a',
  '#00a4db': '#0079a2',
  '#d73a49': '#ce3846',
};
const githubAccessible: typeof prismThemes.github = {
  ...prismThemes.github,
  styles: prismThemes.github.styles.map((rule) => {
    const color = rule.style.color;
    return color && darkened[color]
      ? {...rule, style: {...rule.style, color: darkened[color]}}
      : rule;
  }),
};

const config: Config = {
  title: 'AI Social Journal',
  tagline: 'Lets make sense of AI — together.',
  favicon: 'img/logo1.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://aisocialjournal.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For custom domain, use root path
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dineshgopal29', // Usually your GitHub org/user name.
  projectName: 'my-journal', // Usually your repo name.
  
  // Deployment branch for GitHub Pages
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    './plugins/latest-posts.js',
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Jev post 1 was renamed from its date-based URL to a keyword slug
          {
            from: '/blog/2026/10/05/is-jev-new-design-paradigm',
            to: '/blog/meet-jev-system-one-model',
          },
        ],
      },
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/',
        blogRouteBasePath: '/blog',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  markdown: {
    mermaid: true,
    // Keep legacy `<!-- ... -->` comments (e.g. `<!-- truncate -->` in docs) compiling.
    mdx1Compat: {comments: true},
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // Serve the docs at the site's root
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.png',
    navbar: {
      title: 'AI Social Journal',
      logo: {
        alt: 'AI Social Journal Logo',
        src: 'img/logo-nav.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Guides',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/about', label: 'About', position: 'left'},
        {href: 'https://aisocialjournal.com/blog/rss.xml', label: 'RSS', position: 'right'},
        {href: 'https://github.com/dineshgopal29', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Guides',
          items: [
            {label: 'RAG to Riches', to: '/rag-to-riches'},
            {label: 'The Agentic Advantage', to: '/the-agentic-advantage'},
          ],
        },
        {
          title: 'Read',
          items: [
            {label: 'Blog', to: '/blog'},
            {label: 'All Topics', to: '/blog/tags'},
            {label: 'About', to: '/about'},
          ],
        },
        {
          title: 'Follow',
          items: [
            {label: 'RSS Feed', href: 'https://aisocialjournal.com/blog/rss.xml'},
            {label: 'LinkedIn', href: 'https://www.linkedin.com/in/dineshgopal1'},
            {label: 'GitHub', href: 'https://github.com/dineshgopal29'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Dinesh Gopal, AI Social Journal.`,
    },
    prism: {
      theme: githubAccessible,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

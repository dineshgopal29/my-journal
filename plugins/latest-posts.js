// Build-time plugin: reads blog frontmatter and exposes the newest posts as
// global data, so the homepage "Latest posts" list never needs manual upkeep.
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = function latestPostsPlugin(context) {
  return {
    name: 'latest-posts',
    async loadContent() {
      const dir = path.join(context.siteDir, 'blog');
      const posts = fs
        .readdirSync(dir)
        .filter((f) => /^\d{4}-\d{2}-\d{2}-.+\.mdx?$/.test(f))
        .map((f) => {
          const {data} = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
          // Queued (draft) and unlisted posts must never be linked from the homepage
          if (data.draft === true || data.unlisted === true) return null;
          const date = new Date(data.date || f.slice(0, 10));
          // Docusaurus default permalink is /blog/YYYY/MM/DD/<name>; an explicit slug replaces the whole path.
          const name = f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, '');
          const permalink = data.slug
            ? `/blog/${String(data.slug).replace(/^\//, '')}`
            : `/blog/${date.toISOString().slice(0, 10).replace(/-/g, '/')}/${name}`;
          return {
            title: data.title,
            description: data.description || '',
            permalink,
            date: date.toISOString(),
          };
        })
        .filter(Boolean)
        .sort((a, b) => b.date.localeCompare(a.date));
      return posts;
    },
    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
};

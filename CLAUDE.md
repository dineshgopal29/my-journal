# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Social Journal - A Docusaurus 3.8.1 documentation and blog site for AI learning content, focusing on RAG systems, AI agents, AWS AI services, and responsible AI practices. Live at https://aisocialjournal.com.

## Common Commands

```bash
npm start          # Start development server at localhost:3000
npm run build      # Build production static files
npm run serve      # Serve built site locally
npm run typecheck  # Run TypeScript type checking
npm run clear      # Clear Docusaurus cache
npm run deploy     # Deploy to GitHub Pages
```

**Node version:** 18.0 or higher required.

## Architecture

### Content Structure

- **`blog/`** - Blog posts in Markdown with frontmatter (date prefix naming: `YYYY-MM-DD-slug.md`)
  - `authors.yml` - Author metadata
  - `tags.yml` - Tag definitions

- **`docs/`** - Tutorial series organized by category
  - `rag-to-riches/` - RAG tutorial series
  - `the-agentic-advantage/` - AI agents series
  - Each category has `_category_.json` for sidebar configuration

- **`sidebars.ts`** - Defines navigation structure for docs

### Source Code

- **`src/pages/`** - Custom pages (MDX/React)
  - `welcome.md` - Homepage (uses MDX components like Tabs, Cards)

- **`src/components/`** - React components
  - `HomepageFeatures/` - Feature cards component (TypeScript + CSS modules)

- **`src/css/custom.css`** - Theme customization using Infima CSS variables (indigo color scheme)

### Static Assets

- **`static/img/`** - Images organized by post (e.g., `post_12/` for specific articles)
- **`static/CNAME`** - Custom domain configuration

### Configuration

- **`docusaurus.config.ts`** - Main site configuration (metadata, plugins, theme)
- **`tsconfig.json`** - TypeScript config (extends Docusaurus preset)

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically deploys to GitHub Pages on push to `main` branch. Build artifacts go to `gh-pages` branch.

## Content Conventions

- Blog posts use date-prefixed filenames for chronological ordering
- Docs use `_category_.json` files to define sidebar labels and positions
- Images for articles stored in `static/img/post_N/` directories
- Syntax highlighting: GitHub light theme (light mode), Dracula (dark mode)

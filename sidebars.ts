import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Create a manual sidebar that includes all documents
  tutorialSidebar: [
    {
      type: 'category',
      label: 'RAG to Riches',
      items: [
        'rag-to-riches/2025-05-21-rag-access-llms',
        'rag-to-riches/2025-05-31-rag-data-setup',
        'rag-to-riches/2025-06-10-rag-aws-knowledgebase',
        'rag-to-riches/2025-06-28-responsible-ai-aws-guardrails',
        'rag-to-riches/2025-07-07-rag-evaluation-framework',
      ],
    },
  ],
};

export default sidebars;

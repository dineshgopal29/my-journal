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
      link: {
        type: 'generated-index',
        slug: '/rag-to-riches',
        title: 'RAG to Riches',
        description:
          'A hands-on series on building production-ready Retrieval-Augmented Generation (RAG) apps with AWS Bedrock: LLM access, data and embeddings, knowledge bases, guardrails, and evaluation.',
      },
      items: [
        'rag-to-riches/2025-05-21-rag-access-llms',
        'rag-to-riches/2025-05-31-rag-data-setup',
        'rag-to-riches/2025-06-10-rag-aws-knowledgebase',
        'rag-to-riches/2025-06-28-responsible-ai-aws-guardrails',
        'rag-to-riches/2025-07-07-rag-evaluation-framework',
      ],
    },
    {
      type: 'category',
      label: 'The Agentic Advantage',
      link: {
        type: 'generated-index',
        slug: '/the-agentic-advantage',
        title: 'The Agentic Advantage',
        description:
          'What comes after RAG: designing, building, and operating AI agents, from agentic design patterns to orchestration, guardrails, and real-world impact.',
      },
      items: [
        'the-agentic-advantage/2026-01-19-understanding-agentic-patterns',
      ],
    },
  ],
};

export default sidebars;

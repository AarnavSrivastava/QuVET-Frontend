import nextMdx from '@next/mdx'

import remarkGfm from 'remark-gfm'
// import rehypeKatex from 'rehype-katex'
// import rehypeStringify from 'rehype-stringify'
// import remarkMath from 'remark-math'
// import remarkParse from 'remark-parse'
// import remarkRehype from 'remark-rehype'
// import remarkMdx from 'remark-mdx'

const withMDX = nextMdx({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

/**
 * rehypeStringify, rehypeKatex
 * , remarkMath, remarkRehype, remarkParse, remarkMdx
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
};

export default withMDX(nextConfig);

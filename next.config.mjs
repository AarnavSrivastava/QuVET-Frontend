import nextMdx from '@next/mdx'

import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'

const withMDX = nextMdx({
  options: {
    remarkPlugins: [remarkGfm, remarkMath, remarkRehype, remarkParse],
    rehypePlugins: [rehypeStringify, rehypeKatex],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  output: 'export',
};

export default withMDX(nextConfig);

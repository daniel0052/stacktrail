import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  // Confirmed remote: github.com/daniel0052/stacktrail (project Pages).
  base: '/stacktrail/',
  plugins: [{ ...mdx({ remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] }), enforce: 'pre' }, react(), tailwind()],
});

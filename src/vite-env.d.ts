/// <reference types="vite/client" />
declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const content: ComponentType<{ components?: Record<string, ComponentType> }>;
  export default content;
}

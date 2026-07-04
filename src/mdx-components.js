import { docsMdxComponents } from "@/components/docs/mdx";

// Required by @next/mdx (App Router). Provides default styling/components for MDX.
export function useMDXComponents(components) {
  return { ...docsMdxComponents, ...components };
}

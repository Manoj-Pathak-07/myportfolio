import { isValidElement, type ReactNode } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import { slugifyHeading } from '@/content/blog';

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return '';
}

const components = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 id={slugifyHeading(textOf(children))}>{children}</h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 id={slugifyHeading(textOf(children))}>{children}</h3>
  ),
  a: ({ href, children }: { href?: string; children?: ReactNode }) => {
    const external = Boolean(href && /^https?:\/\//.test(href));
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {children}
      </a>
    );
  },
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-portfolio">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: 'github-dark-default',
                  keepBackground: false,
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}

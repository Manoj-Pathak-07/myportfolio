import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Locale } from './types';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostFrontmatter {
  title: string;
  titleNe: string;
  description: string;
  descriptionNe: string;
  date: string;
  category: string;
  categoryNe: string;
  tags: string[];
  relatedProjects: string[];
  featured: boolean;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  relatedProjects: string[];
  featured: boolean;
  readingTime: number;
  /** True when a curated Nepali body exists; otherwise the English body is shown. */
  hasNepaliBody: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

function listFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx'));
}

function parseFile(file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const frontmatter = data as unknown as PostFrontmatter;
  const slug = file.replace(/\.mdx$/, '');
  const words = content.trim().split(/\s+/u).filter(Boolean).length;
  const neBodyPath = path.join(BLOG_DIR, `${slug}.ne.mdx`);
  const hasNepaliBody = fs.existsSync(neBodyPath);

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    category: frontmatter.category,
    tags: frontmatter.tags ?? [],
    relatedProjects: frontmatter.relatedProjects ?? [],
    featured: frontmatter.featured ?? false,
    readingTime: Math.max(1, Math.round(words / 220)),
    hasNepaliBody,
    content,
  };
}

export function getAllPosts(): Post[] {
  return listFiles()
    .map(parseFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return listFiles().map((file) => file.replace(/\.mdx$/, ''));
}

/** Frontmatter is bilingual; the body falls back to English until a .ne.mdx exists. */
export function localizePost(post: Post, locale: Locale) {
  const file = path.join(BLOG_DIR, `${post.slug}.ne.mdx`);
  let content = post.content;
  if (locale === 'ne' && post.hasNepaliBody) {
    content = matter(fs.readFileSync(file, 'utf8')).content;
  }

  const raw = fs.readFileSync(path.join(BLOG_DIR, `${post.slug}.mdx`), 'utf8');
  const data = matter(raw).data as unknown as PostFrontmatter;

  return {
    ...post,
    title: locale === 'ne' ? data.titleNe : post.title,
    description: locale === 'ne' ? data.descriptionNe : post.description,
    category: locale === 'ne' ? data.categoryNe : post.category,
    content,
    isFallback: locale === 'ne' && !post.hasNepaliBody,
  };
}

const headingPattern = /^##\s+(.+)$/gm;

export function getTableOfContents(content: string) {
  const headings: { id: string; title: string }[] = [];
  for (const match of content.matchAll(headingPattern)) {
    const title = match[1]?.trim();
    if (!title) continue;
    headings.push({ id: slugifyHeading(title), title });
  }
  return headings;
}

export function slugifyHeading(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

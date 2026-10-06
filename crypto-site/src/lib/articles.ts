import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import { parse as parseYaml } from "yaml";
import type { FAQ } from "@/content/reviews";

/**
 * Loads the Markdown guides in src/content/articles at build time.
 * You don't need to edit this file to add a guide — just add a .md file.
 */

export const articleCategories = {
  basics: "Crypto basics",
  buying: "Buying & exchanges",
  wallets: "Wallets",
  trading: "Trading",
  safety: "Security",
} as const;

export type ArticleCategory = keyof typeof articleCategories;

export type ArticleMeta = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  category: ArticleCategory;
  published: string;
  updated: string;
  featured: boolean;
  related: string[];
  faqs: FAQ[];
  readingMinutes: number;
};

export type ArticleBlock = { type: "html"; html: string } | { type: "platform"; slug: string };

export type Article = ArticleMeta & {
  blocks: ArticleBlock[];
  headings: { id: string; text: string }[];
};

const DIR = path.join(process.cwd(), "src/content/articles");

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function decodeEntities(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function splitFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  return { data: (parseYaml(match[1]) as Record<string, unknown>) ?? {}, body: match[2] };
}

function createRenderer(headings: { id: string; text: string }[]) {
  const md = new Marked({ gfm: true });
  md.use({
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        const text = decodeEntities(inner.replace(/<[^>]+>/g, ""));
        const id = slugify(text);
        if (depth === 2) headings.push({ id, text });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const inner = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        const t = title ? ` title="${title}"` : "";
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener nofollow">${inner}</a>`
          : `<a href="${href}"${t}>${inner}</a>`;
      },
    },
  });
  return md;
}

function toHtml(md: Marked, markdown: string) {
  const html = md.parse(markdown, { async: false }) as string;
  // Make tables scroll sideways on small screens instead of breaking the layout.
  return html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");
}

function readFile(slug: string): Article | null {
  const file = path.join(DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, body } = splitFrontmatter(fs.readFileSync(file, "utf8"));
  const headings: { id: string; text: string }[] = [];
  const md = createRenderer(headings);

  // Split on [[platform:slug]] lines so we can render React cards between Markdown chunks.
  const parts = body.split(/^\[\[platform:([a-z0-9-]+)\]\]\s*$/m);
  const blocks: ArticleBlock[] = [];
  parts.forEach((part, i) => {
    if (i % 2 === 1) blocks.push({ type: "platform", slug: part });
    else if (part.trim()) blocks.push({ type: "html", html: toHtml(md, part) });
  });

  const words = body.split(/\s+/).filter(Boolean).length;
  const category = String(data.category ?? "basics") as ArticleCategory;

  return {
    slug,
    title: String(data.title ?? slug),
    metaTitle: String(data.metaTitle ?? data.title ?? slug),
    description: String(data.description ?? ""),
    category: category in articleCategories ? category : "basics",
    published: String(data.published ?? ""),
    updated: String(data.updated ?? data.published ?? ""),
    featured: Boolean(data.featured),
    related: Array.isArray(data.related) ? (data.related as string[]) : [],
    faqs: Array.isArray(data.faqs) ? (data.faqs as FAQ[]) : [],
    readingMinutes: Math.max(1, Math.ceil(words / 200)),
    blocks,
    headings,
  };
}

let cache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const slugs = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .map((f) => f.replace(/\.md$/, ""));
  cache = slugs
    .map(readFile)
    .filter((a): a is Article => a !== null)
    .sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : a.title.localeCompare(b.title)));
  return cache;
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticleMeta(): ArticleMeta[] {
  return getAllArticles().map(({ blocks: _b, headings: _h, ...meta }) => meta);
}

export function getRelatedArticles(article: ArticleMeta, limit = 3): ArticleMeta[] {
  const all = getArticleMeta().filter((a) => a.slug !== article.slug);
  const picked = article.related.map((s) => all.find((a) => a.slug === s)).filter((a): a is ArticleMeta => !!a);
  const sameCategory = all.filter((a) => a.category === article.category && !picked.includes(a));
  const rest = all.filter((a) => !picked.includes(a) && !sameCategory.includes(a));
  return [...picked, ...sameCategory, ...rest].slice(0, limit);
}

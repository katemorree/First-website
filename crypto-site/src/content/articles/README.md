# How to add a guide

1. Copy any `.md` file in this folder and rename it, e.g. `what-is-ethereum.md`.
   The file name becomes the web address: `/learn/what-is-ethereum`.
2. Edit the settings at the top between the `---` lines (title, description, category, dates).
3. Write the article below in Markdown (`## Heading`, `- bullet`, `**bold**`, `[link](/learn/...)`).
4. To show a platform card inside the article, put this on its own line:
   `[[platform:kraken]]` (use any slug from `src/content/platforms.ts`).
5. Commit. The page, sitemap, search and "Latest articles" update automatically.

Categories: `basics`, `buying`, `wallets`, `trading`, `safety`.

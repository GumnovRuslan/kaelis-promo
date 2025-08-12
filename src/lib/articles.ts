import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "articles");

export function getAllArticles() {
  return fs.readdirSync(articlesDir).map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const content = fs.readFileSync(path.join(articlesDir, file), "utf8");
    const { data } = matter(content);
    return { slug, ...data };
  });
}

export function getArticle(slug: string) {
  const filePath = path.join(articlesDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  return { content, meta: data };
}
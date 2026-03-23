import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  content: string;
}

export function getBlogPosts(): BlogPost[] {
  const postsDir = join(process.cwd(), "src/content/blog");

  try {
    const files = readdirSync(postsDir).filter((file) => file.endsWith(".md"));

    return files.map((file) => {
      const filePath = join(postsDir, file);
      const fileContents = readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: data.slug || file.replace(/\.md$/, ""),
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        author: data.author || "Katie",
        tags: data.tags || [],
        featuredImage: data.featuredImage,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        content,
      };
    });
  } catch {
    return [];
  }
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export function getSortedBlogPosts(): BlogPost[] {
  const posts = getBlogPosts();
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

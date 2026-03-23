import type { MetadataRoute } from "next";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

interface BlogPost {
  slug: string;
  date: string;
}

function getBlogPosts(): BlogPost[] {
  const postsDir = join(process.cwd(), "src/content/blog");

  try {
    const files = readdirSync(postsDir).filter((file) => file.endsWith(".md"));

    return files.map((file) => {
      const filePath = join(postsDir, file);
      const fileContents = readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: data.slug || file.replace(/\.md$/, ""),
        date: data.date || new Date().toISOString(),
      };
    });
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.orlandounpacked.com";
  const blogPosts = getBlogPosts();

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogUrls,
    {
      url: `${baseUrl}/plan`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

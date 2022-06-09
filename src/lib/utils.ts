import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { sync } from "glob";

const POSTS_PATH = path.join(process.cwd(), process.env.articleMarkdownPath ?? "_articles").replace(/\\/g, "/");

export const getSlugs = (): string[] => {
  const paths = sync(`${POSTS_PATH}/*.mdx`);
  return paths.map((path) => {
    const parts = path.split("/");
    const fileName = parts[parts.length - 1];
    const [slug, _ext] = fileName.split(".");
    return slug;
  });
};

export interface PostMeta {
  excerpt: string;
  slug: string;
  title: string;
  tags: string[];
  date: string;
  isPublished: boolean;
}

interface Post {
  content: string;
  meta: PostMeta;
}

export const getPostFromSlug = (slug: string): Post => {
  const postPath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postPath, "utf-8");
  const { content, data } = matter(source);
  return {
    meta: {
      slug,
      excerpt: data.excerpt ?? "",
      title: data.title ?? slug,
      tags: (data.tags ?? []).sort(),
      date: (data.date ?? new Date()).toString(),
      isPublished: data.isPublished ?? false,
    },
    content,
  };
};

export const getAllPosts = (isPublished = true, hideIndex = true) => {
  const posts = getSlugs()
    .filter((e) => hideIndex ? e !== "index" : true)
    .map((slug) => getPostFromSlug(slug))
    .filter((post) => post.meta.isPublished === isPublished)
    .sort((post1, post2) => {
      const postDate1 = new Date(post1.meta.date);
      const postDate2 = new Date(post2.meta.date);

      if (postDate1.getTime() > postDate2.getTime()) return 1;
      if (postDate1.getTime() < postDate2.getTime()) return -1;
      return 0;
    });
  return posts;
};

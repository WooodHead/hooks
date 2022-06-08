import {
  getAllPostsExceptIndex,
  getPostFromSlug,
  getSlugs,
  PostMeta,
} from "src/lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import BaseLayout from "src/layouts/AppShell/baselayout";

export interface MDXPost {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: PostMeta;
}

const Hook = ({ post, posts }: { post: MDXPost; posts: PostMeta[] }) => {
  return <BaseLayout posts={posts} content={post} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getSlugs().map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = getAllPostsExceptIndex().map((post) => post.meta);
  const { slug } = params as { slug: string };
  const { content, meta } = getPostFromSlug(slug);
  const mdxSource = await serialize(content || "", {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeHighlight,
      ],
    },
  });
  return {
    props: {
      post: { source: mdxSource, meta },
      posts,
    },
  };
};

export default Hook;

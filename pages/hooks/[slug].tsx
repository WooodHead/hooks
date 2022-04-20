import { getAllPostsExceptIndex, getPostFromSlug, getSlugs, PostMeta } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import Appshell from "@/components/AppShell/appshell";

export interface MDXPost {
	source: MDXRemoteSerializeResult<Record<string, unknown>>;
	meta: PostMeta;
}

const Hook = ({ post, posts }: { post: MDXPost; posts: PostMeta[] }) => {
	return (
		<>
			<Appshell posts={posts} content={post} />
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getSlugs().map((slug) => ({ params: { slug } }));
	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const posts = getAllPostsExceptIndex().map((post) => post.meta);
	const { slug } = params as { slug: string };
	const { content, meta } = getPostFromSlug(slug);
	const mdxSource = await serialize(content, {
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

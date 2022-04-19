import { getPostFromSlug, getSlugs, PostMeta } from "lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Youtube from "@/components/Youtube/youtube";
import Image from "next/image";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

interface MDXPost {
	source: MDXRemoteSerializeResult<Record<string, unknown>>;
	meta: PostMeta;
}

const Hook = ({ post }: { post: MDXPost }) => {
	return (
		<>
			<p>{post.meta.excerpt}</p>
			<MDXRemote {...post.source} components={{ Youtube, Image }} />
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getSlugs().map((slug) => ({ params: { slug } }));
	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
	return { props: { post: { source: mdxSource, meta } } };
};

export default Hook;

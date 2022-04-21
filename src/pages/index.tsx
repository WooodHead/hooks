import type { GetStaticProps } from "next";
import { getAllPostsExceptIndex, getPostFromSlug, PostMeta } from "src/lib/utils";
import Appshell from "src/components/AppShell/appshell";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { MDXPost } from "./hooks/[slug]";

const Home = ({ post, posts }: { post: MDXPost; posts: PostMeta[] }) => {
	return (
		<Appshell posts={posts} content={post}/>
	);
};


export const getStaticProps: GetStaticProps = async (context) => {
	const posts = getAllPostsExceptIndex().map((post) => post.meta);
	const { content, meta } = getPostFromSlug("index");
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

export default Home;

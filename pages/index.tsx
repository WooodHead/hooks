import type { GetStaticProps } from "next";
import { getAllPosts, PostMeta } from "lib/utils";
import Appshell from "@/components/AppShell/appshell";

const Home = ({ posts }: { posts: PostMeta[] }) => {
	return (
		<Appshell posts={posts} content={"content"}/>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const posts = getAllPosts().map((post) => post.meta);
	console.log(posts);

	return {
		props: {
			posts,
		},
	};
};

export default Home;

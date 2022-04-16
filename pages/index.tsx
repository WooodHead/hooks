import {
	AppShell,
	Burger,
	Header,
	MediaQuery,
	Navbar,
	ScrollArea,
	Text,
	useMantineTheme,
} from "@mantine/core";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import fs from "fs";
import { useState } from "react";
import Lightdarkbutton from "../components/LightDarkButton/lightdarkbutton";
import hookpng from "../public/hook.png";
import matter from "gray-matter";

interface Post {
	slug: string;
}
interface HomeProps {
	posts: Array<Post>;
}

const Home: NextPage<HomeProps> = ({ posts }) => {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	console.log(posts)
	return (
		<AppShell
			styles={{
				main: {
					background:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			fixed
			navbar={
				<Navbar
					p="md"
					hiddenBreakpoint="sm"
					hidden={!opened}
					width={{ sm: 200, lg: 300 }}
				>
					<Navbar.Section>
						<Text>Summary</Text>
					</Navbar.Section>
					<Navbar.Section grow component={ScrollArea} mt="lg">
						<div>
							{posts.map((post) => (
								<div key={post.slug}>
									<Link href={`/hooks/${post.slug}`} passHref>
										<Text component="a">{post.slug}()</Text>
									</Link>
								</div>
							))}
						</div>
					</Navbar.Section>
				</Navbar>
			}
			header={
				<Header height={70} p="md">
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							height: "100%",
						}}
					>
						<MediaQuery largerThan="sm" styles={{ display: "none" }}>
							<Burger
								opened={opened}
								onClick={() => setOpened((o) => !o)}
								size="sm"
								color={theme.colors.gray[6]}
								mr="xl"
							/>
						</MediaQuery>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								height: "100%",
							}}
						>
							<Image src={hookpng} alt="Hook logo" width={40} height={40} />
							<Link href="/" passHref>
								<Text size="xl" weight={600} transform="uppercase">
									Hooks
								</Text>
							</Link>
						</div>
						<Lightdarkbutton />
					</div>
				</Header>
			}
		>
			<Text>Main content</Text>
		</AppShell>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	let files = fs.readdirSync(path.join("posts"))
	files = files.filter(file => file.split(".")[1] === 'mdx')

	const posts = await Promise.all(
		files.map(file => {
			const mdWithData = fs.readFileSync(path.join('posts', file), 'utf-8')
			const { data : frontMatter } = matter(mdWithData)
			return {
				frontMatter,
				slug: file.split(".")[0]
			}
		})
	)
	return {
		props: {
			posts,
		},
	};
};

export default Home;

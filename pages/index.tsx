import type { NextPage } from "next";
import Head from "next/head";
import Appshell from "../components/AppShell/appshell";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Hooks</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<Appshell />
		</>
	);
};

export default Home;

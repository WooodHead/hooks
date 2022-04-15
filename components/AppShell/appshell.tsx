import {
	AppShell,
	Aside,
	Burger,
	Center,
	Footer,
	Header,
	MediaQuery,
	Navbar,
	Text,
	ThemeIcon,
	useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import Lightdarkbutton from "../LightDarkButton/lightdarkbutton";
import hookpng from "../../public/hook.png";

const Appshell = () => {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
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
					<Navbar.Section grow mt="lg">
						<Text>Hook list</Text>
					</Navbar.Section>
				</Navbar>
			}
			header={
				<Header height={70} p="md">
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
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
							<Image src={hookpng} alt="Hook logo" width={40} height={40}/>
							<Text size={'xl'} weight={500}>HOOKS</Text>
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

export default Appshell;

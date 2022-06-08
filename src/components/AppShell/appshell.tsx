import {
  AppShell,
  Burger,
  Container,
  Header,
  MediaQuery,
  Navbar,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { PostMeta } from "src/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Lightdarkbutton from "../LightDarkButton/lightdarkbutton";
import hookpng from "@/public/hook.png";
import { MDXPost } from "src/pages/hooks/[slug]";
import { MDXRemote } from "next-mdx-remote";
import Youtube from "src/components/Youtube/youtube";
import { useRouter } from "next/router";
import useStyles from "./appshell.styles";

const Appshell = ({
  posts,
  content,
}: {
  posts: PostMeta[];
  content: MDXPost;
}) => {
  const { classes, cx } = useStyles();
  const router = useRouter();
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
          <Navbar.Section grow component={ScrollArea} mt="lg">
            {posts.map((post) => (
              <div key={post.slug}>
                <Link href={`/hooks/${post.slug}`} passHref>
                  <a
                    className={cx(classes.link, {
                      [classes.linkActive]:
                        router.asPath === `/hooks/${post.slug}`,
                    })}
                  >
                    {post.title}
                  </a>
                </Link>
              </div>
            ))}
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
            <Link href="/" passHref>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  cursor: "pointer",
                }}
              >
                <Image src={hookpng} alt="Hook logo" width={40} height={40} />
                <Text size="xl" weight={600} transform="uppercase">
                  Hooks
                </Text>
              </div>
            </Link>
            <Lightdarkbutton />
          </div>
        </Header>
      }
    >
      <Container>
        <MDXRemote {...content.source} components={{ Youtube, Image, Link }} />
      </Container>
    </AppShell>
  );
};

export default Appshell;

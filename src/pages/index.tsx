import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { getAllPosts } from "src/lib/utils"
import BaseLayout from "src/layouts/AppShell/baselayout"
import { join } from "path"
import { getParsedFileContentBySlug, renderMarkdown } from "src/lib/markdown"

const POSTS_PATH = join(
  process.cwd(),
  process.env.articleMarkdownPath ?? "_articles"
)

const Home = ({
  frontMatter,
  html,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <BaseLayout content={html} posts={posts} />
}

export const getStaticProps: GetStaticProps = async () => {
  // 1. parse the content of our md file and separate it into frontmatter and content
  const articleMarkdownContent = getParsedFileContentBySlug("index", POSTS_PATH)
  // 2. convert markdown content => HTML
  const renderHTML = await renderMarkdown(articleMarkdownContent.content)
  // 3. read frontmatter of all posts
  const posts = getAllPosts().map((post) => post.meta)

  return {
    props: {
      frontMatter: articleMarkdownContent.frontMatter,
      html: renderHTML,
      posts,
    },
  }
}

export default Home

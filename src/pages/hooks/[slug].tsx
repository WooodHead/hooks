import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import React from "react"
import "highlight.js/styles/atom-one-dark.css"
import { ParsedUrlQuery } from "querystring"
import { join } from "path"
import { readdirSync } from "fs"
import { getParsedFileContentBySlug, renderMarkdown } from "src/lib/markdown"
import BaseLayout from "src/layouts/AppShell/baselayout"
import { getAllPosts } from "src/lib/utils"

const POSTS_PATH = join(process.cwd(), process.env.articleMarkdownPath ?? "_articles")

export interface ArticleProps extends ParsedUrlQuery {
  slug: string
}

const Hook = ({ frontMatter, html, posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <BaseLayout content={html} posts={posts} />
}

export const getStaticProps = async ({
  params,
}: {
  params: ArticleProps
}) => {
  // 1. parse the content of our md file and separate it into frontmatter and content
  const articleMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  )
  // 2. convert markdown content => HTML
  const renderHTML = await renderMarkdown(articleMarkdownContent.content)
  // 3. read frontmatter of all posts
  const posts = getAllPosts().map((post) => post.meta)

  return {
    props: {
      // frontMatter: articleMarkdownContent.frontMatter,
      html: renderHTML,
      posts,
    },
  }
}

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }))
  return {
    paths,
    fallback: false,
  }
}

export default Hook

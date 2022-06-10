import { readFileSync } from "fs"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import { join } from "path"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/atom-one-dark.css";
import remarkGfm from 'remark-gfm'



export const getParsedFileContentBySlug = (
  fileName: string,
  postsPath: string
) => {
  console.log(postsPath)
  const postFilePath = join(postsPath, `${fileName}.mdx`)
  const fileContent = readFileSync(postFilePath)
  const { data, content } = matter(fileContent)
  return {
    frontMatter: data,
    content,
  }
}

export const renderMarkdown = (markdownContent: string) => {
  return serialize(markdownContent || '', {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm
      ],
      rehypePlugins: [
        rehypeHighlight
      ]
    }
  })
}



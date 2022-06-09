import { readFileSync } from "fs"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import { join } from "path"

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
  return serialize(markdownContent || '')
}



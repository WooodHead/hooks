import Link, { LinkProps } from "next/link"
import { PropsWithChildren } from "react"

const CustomLink = ({ href, children }: PropsWithChildren<LinkProps>) => {
  return (
    <Link href={href} passHref>
        <a>{children}</a>
    </Link>
  )
}

export default CustomLink

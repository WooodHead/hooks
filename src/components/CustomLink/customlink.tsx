import Link from "next/link"
import React from "react"

export interface CustomLinkProps {
  href: string
}

const CustomLink = ({ href, ...otherProps }: CustomLinkProps) => {
  return (
    <Link href={href}>
      <a {...otherProps} />
    </Link>
  )
}

export default CustomLink

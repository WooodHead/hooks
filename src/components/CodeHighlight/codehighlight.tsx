import { Prism } from "@mantine/prism"

interface CodeHighlightProps {
  children: React.ReactElement
}

const CodeHighlight = ({ children }: CodeHighlightProps) => {
  const language = children.props.className.replace("language-", "")
  return <Prism withLineNumbers language={language}>{children.props.children}</Prism>
}

export default CodeHighlight

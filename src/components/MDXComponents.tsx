import DocsHeading from 'components/atoms/DocsHeading'
import Quote from 'components/atoms/Quote'
import H1 from 'components/atoms/H1'

const Table = (props: JSX.IntrinsicAttributes) => (
  <table className="text-left mt-6 w-max" {...props} />
)

const THead = (props: JSX.IntrinsicAttributes) => {
  return <th className="bg-gray-50 font-semibold p-2 text-sm" {...props} />
}

const TData = (props: JSX.IntrinsicAttributes) => (
  <td className="p-2 border-t	border-current text-sm whitespace-normal" {...props} />
)

const CustomLink = (props: { children: string; href: string }) => {
  const { children, href } = props
  const isExternal = !(href && (href.startsWith('/') || href.startsWith('#')))

  const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <a className="underline" {...props} {...externalProps}>
      {children}
    </a>
  )
}

const Hr = () => {
  return <hr className="border-top border-gray-200 my-4 w-full" />
}

const MDXComponents = {
  h1: (props: JSX.IntrinsicAttributes) => <H1 {...props} />,
  h2: (props: JSX.IntrinsicAttributes) => <DocsHeading as="h2" size="3xl" {...props} />,
  h3: (props: JSX.IntrinsicAttributes) => <DocsHeading as="h3" size="xl" {...props} />,
  h4: (props: JSX.IntrinsicAttributes) => <DocsHeading as="h4" size="base" {...props} />,
  h5: (props: JSX.IntrinsicAttributes) => <DocsHeading as="h5" size="sm" {...props} />,
  h6: (props: JSX.IntrinsicAttributes) => <DocsHeading as="h6" size="sm" {...props} />,
  inlineCode: (props: JSX.IntrinsicAttributes) => (
    <code
      className="whitespace-normal bg-yellow-100 text-yellow-900 mdx-inline-code text-xs px-1 py-0.5"
      {...props}
    />
  ),
  br: (props: JSX.IntrinsicAttributes) => <div className="h-6" {...props} />,
  hr: Hr,
  table: Table,
  th: THead,
  td: TData,
  a: CustomLink,
  p: (props: JSX.IntrinsicAttributes) => <p className="mt-4 mb-2 leading-6" {...props} />,
  ul: (props: JSX.IntrinsicAttributes) => <ul className="pt-2 pl-4 ml-2 max-w-full" {...props} />,
  ol: (props: JSX.IntrinsicAttributes) => <ol className="pt-2 pl-4 ml-2 max-w-full" {...props} />,
  li: (props: JSX.IntrinsicAttributes) => <li className="pb-1 max-w-full list-disc" {...props} />,
  blockquote: Quote
}

export default MDXComponents

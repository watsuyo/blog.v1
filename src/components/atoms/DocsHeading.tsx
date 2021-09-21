import { createElement, memo, ReactNode } from 'react'

type DocsHeadingProps = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size: 'sm' | 'base' | 'xl' | '3xl'
  children?: ReactNode
}

const DocsHeading = ({ as, children, size }: DocsHeadingProps) => {
  const Heading = createElement(
    as,
    {
      className: `mb-4 lg:mb-4 mt-2 lg:mt-6 font-bold text-${size} max-w-full`
    },

    <div className="pointer-events-auto">{children}</div>
  )

  return Heading
}

export default memo(DocsHeading)

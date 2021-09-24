import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export default function H1({ children }: Props) {
  return <h1 className="mt-4 mb-10 max-w-full text-3xl font-bold">{children}</h1>
}

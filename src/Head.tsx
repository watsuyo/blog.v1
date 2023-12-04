import Head from 'next/head'

import { SITE_NAME, ICON, PAGE_TYPE, DOMAIN } from 'global'

interface Props {
  title: string
  description: string
  keyword: string
  url: string
}

// eslint-disable-next-line react/display-name
export default ({ title, description, keyword, url }: Props): JSX.Element => {
  const TITLE = SITE_NAME === title ? SITE_NAME : `${SITE_NAME} | ${title}`
  const IMAGE = `${DOMAIN}/api/og?title=${TITLE}`
  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="keywords" content={keyword} />
      <meta name="description" content={description} />
      <meta property="og:image" content={IMAGE} />
      <meta property="og:type" content={PAGE_TYPE} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@watsuyo_2" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={IMAGE} />
      <link rel="icon" href={ICON} />
      <link rel="canonical" href={url} />
      <link rel="shortcut icon" href={ICON} />
      <link rel="apple-touch-icon" href={ICON} />
    </Head>
  )
}

import { NextApiResponse } from 'next'
import React from 'react'

const getRobots = () => `User-agent: *
Disallow: /_next/static/
`

class Sitemap extends React.Component {
  public static getInitialProps({ res }: { res: NextApiResponse }) {
    res.setHeader('Content-Type', 'text/plain')
    res.write(getRobots())
    res.end()
  }
}

export default Sitemap

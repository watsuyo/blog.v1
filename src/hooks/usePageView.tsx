import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from 'utils/analytics/gtag'

export default function usePageView() {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageView(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}

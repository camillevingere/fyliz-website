'use client'
import { env } from '@/lib/env'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

const CTA_HOST = 'cdyp.fr'

// Suit tous les liens vers cdyp.fr (composants comme contenus en base) et y ajoute
// des UTM, que cdyp.fr transmet à cal.com : la réservation garde sa page d'origine.
// La page va dans utm_campaign, seul champ (avec source et medium) ventilé par analink.
function trackCtaClick(event: MouseEvent) {
  const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
  if (!link || link.hostname !== CTA_HOST) return

  const page = window.location.pathname
  const url = new URL(link.href)
  if (!url.searchParams.has('utm_source')) {
    url.searchParams.set('utm_source', 'fyliz.com')
    url.searchParams.set('utm_medium', 'site')
    url.searchParams.set('utm_campaign', page)
    link.href = url.toString()
  }

  posthog.capture('cta_clicked', {
    cta_name: link.dataset.cta || link.textContent?.trim() || url.pathname,
    page,
    destination: `${CTA_HOST}${url.pathname}`,
  })
}

export default function PHProvider({ children, bootstrapData }: { children: React.ReactNode, bootstrapData: any }) {
  if (typeof window !== 'undefined' && !posthog.__loaded) {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "https://eu.i.posthog.com",
      bootstrap: bootstrapData
    })
  }

  useEffect(() => {
    document.addEventListener('click', trackCtaClick, true)
    return () => document.removeEventListener('click', trackCtaClick, true)
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

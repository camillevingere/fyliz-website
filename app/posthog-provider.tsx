'use client'
import { env } from '@/lib/env'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

export default function PHProvider({ children, bootstrapData }: { children: React.ReactNode, bootstrapData: any }) {
  if (typeof window !== 'undefined') {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "https://eu.i.posthog.com",
      bootstrap: bootstrapData
    })
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          title: string
          description: string | null
          content: string
          image: string | null
          keywords: string[]
          tags: string[]
          status: string
          published_at: string | null
          author: string | null
          author_image: string | null
          author_username: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          content: string
          image?: string | null
          keywords?: string[]
          tags?: string[]
          status?: string
          published_at?: string | null
          author?: string | null
          author_image?: string | null
          author_username?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          content?: string
          image?: string | null
          keywords?: string[]
          tags?: string[]
          status?: string
          published_at?: string | null
          author?: string | null
          author_image?: string | null
          author_username?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
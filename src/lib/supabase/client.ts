// Supabase 客户端配置
// 使用方法：
// 1. 在 .env.local 添加:
//    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
//    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
// 2. 运行: npx supabase init

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 服务器端客户端（用于 API 路由）
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component 中调用可能会失败
          }
        },
      },
    }
  )
}

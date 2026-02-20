import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // 检查环境变量
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: '服务器暂未配置登录功能，请稍后再试' },
      { status: 503 }
    )
  }

  try {
    const { createClient } = require('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: '邮箱和密码不能为空' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: data.user,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '登录失败' },
      { status: 500 }
    )
  }
}

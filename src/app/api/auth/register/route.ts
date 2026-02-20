import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // 检查环境变量
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: '服务器暂未配置注册功能，请稍后再试' },
      { status: 503 }
    )
  }

  try {
    const { createClient } = require('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: '昵称、邮箱和密码不能为空' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码至少需要 6 位' },
        { status: 400 }
      )
    }

    // 注册用户
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    // 创建用户资料
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email,
          full_name: name,
          created_at: new Date().toISOString(),
        })

      if (profileError) {
        console.error('创建资料失败:', profileError)
      }
    }

    return NextResponse.json({
      success: true,
      message: '注册成功，请登录',
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '注册失败' },
      { status: 500 }
    )
  }
}

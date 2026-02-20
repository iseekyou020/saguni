# 用户系统与支付系统实现

## 技术选型

| 组件 | 选择 | 理由 |
|------|------|------|
| 用户认证 | Supabase Auth | 免费、简单、支持多种登录方式 |
| 数据库 | Supabase | 免费 500MB、实时 |
| 支付 | Stripe | 国际标准、支持订阅 |
| UI | Tailwind + shadcn/ui | 现代化、好用 |

---

## 目录结构

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts
│   │   ├── stripe/
│   │   │   ├── checkout/route.ts
│   │   │   ├── webhook/route.ts
│   │   │   └── portal/route.ts
│   │   └── user/
│   │       └── route.ts
│   └── ...
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── AuthProvider.tsx
│   ├── billing/
│   │   ├── PricingCard.tsx
│   │   ├── SubscriptionStatus.tsx
│   │   └── PaymentButton.tsx
│   └── ui/ (shadcn components)
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── stripe/
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils.ts
└── hooks/
    └── useAuth.ts
```

---

## 实现步骤

### 1. 安装依赖

```bash
npm install @supabase/supabase-js @supabase/ssr @stripe/stripe-js stripe
npm install next-auth @auth/core
npm install lucide-react clsx tailwind-merge
npx shadcn-ui@latest init
```

### 2. 配置环境变量

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. 创建 Supabase 表

```sql
-- users 表 (由 Supabase Auth 自动创建 profiles 表)

-- 用户资料表
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  subscription_status text default 'free',
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 启用 RLS
alter table public.profiles enable row level security;

-- 创建策略
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
```

### 4. 订阅计划

| 计划 | 价格 | 功能 |
|------|------|------|
| Free | ¥0 | 46 免费模板 |
| Pro 月付 | ¥30/月 | 150+ 模板 + 高级功能 |
| Pro 年付 | ¥300/年 | 相当于 ¥25/月 |

### 5. 支付流程

```
用户点击订阅
    ↓
创建 Stripe Checkout Session
    ↓
用户支付 (Stripe)
    ↓
Stripe Webhook 回调
    ↓
更新用户订阅状态
    ↓
用户获得高级权限
```

---

## 等待先才哥哥提供

1. **Supabase** 账号信息
   - Project URL
   - anon key
   - service role key

2. **Stripe** 账号信息
   - Publishable key
   - Secret key
   - Webhook secret

提供后我立即实现！

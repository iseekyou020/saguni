// Stripe 配置
// 使用方法：
// 1. 在 .env.local 添加:
//    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
//    STRIPE_SECRET_KEY=sk_test_xxx

import Stripe from 'stripe'

// 服务端 Stripe 实例
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

// 价格 ID（需要先在 Stripe Dashboard 创建）
export const PRICE_IDS = {
  PRO_MONTHLY: 'price_pro_monthly', // ¥29/月
  PRO_YEARLY: 'price_pro_yearly',  // ¥290/年
} as const

// 订阅计划
export const PLANS = {
  free: {
    name: '免费版',
    price: 0,
    features: [
      '46 个基础模板',
      '基础分类浏览',
      '收藏功能',
      '浏览历史',
    ],
  },
  pro: {
    name: 'Pro 版',
    price: 29,
    priceYearly: 290,
    features: [
      '52 个模板（含 6 个企业级）',
      '全部分类访问',
      '高级模板下载',
      '收藏同步',
      '优先更新',
      '专属客服支持',
    ],
  },
} as const

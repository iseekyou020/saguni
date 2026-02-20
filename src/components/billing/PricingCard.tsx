"use client"

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { stripe, PRICE_IDS } from '@/lib/stripe/client'

interface SubscriptionButtonProps {
  priceId: string
  buttonText: string
}

export function SubscriptionButton({ priceId, buttonText }: SubscriptionButtonProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!user) {
      alert('请先登录！')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, userId: user.id }),
      })

      const { url, error } = await response.json()
      if (error) throw new Error(error)

      // 跳转到 Stripe Checkout
      window.location.href = url
    } catch (error) {
      console.error('订阅失败:', error)
      alert('订阅失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="w-full bg-gradient-to-r from-orange-400 to-amber-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      {loading ? '处理中...' : buttonText}
    </button>
  )
}

export function PricingCard({ plan, priceId }: { plan: typeof import('@/lib/stripe/client').PLANS.free | typeof import('@/lib/stripe/client').PLANS.pro, priceId?: string }) {
  const isFree = plan.name === '免费版'

  return (
    <div className={`border-2 rounded-2xl p-6 ${isFree ? 'border-orange-200' : 'border-orange-400 shadow-lg'}`}>
      <h3 className="text-xl font-bold">{plan.name}</h3>
      <div className="mt-4">
        <span className="text-4xl font-bold">¥{plan.price}</span>
        {plan.price > 0 && <span className="text-gray-500">/月</span>}
      </div>
      <ul className="mt-6 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {priceId && (
        <div className="mt-6">
          <SubscriptionButton priceId={priceId} buttonText={isFree ? '当前计划' : '立即订阅'} />
        </div>
      )}
    </div>
  )
}

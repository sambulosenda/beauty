'use client'

import { useState, useEffect } from 'react'
import { Calendar, Users, Star } from 'lucide-react'
import React from 'react'
interface StatCardProps {
  number: string
  label: string
  icon: 'Calendar' | 'Users' | 'Star'
}

const iconMap = {
  Calendar,
  Users,
  Star,
}

export function StatCard({ number, label, icon }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [count, setCount] = useState(0)

  const Icon = iconMap[icon]

  useEffect(() => {
    if (isVisible) {
      const targetNumber = parseInt(number.replace(/\D/g, ''), 10)
      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = targetNumber / steps
      let currentCount = 0

      const timer = setInterval(() => {
        currentCount += increment
        if (currentCount >= targetNumber) {
          clearInterval(timer)
          setCount(targetNumber)
        } else {
          setCount(Math.floor(currentCount))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isVisible, number])

  return (
    <div
      className="group text-center p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#8AB861]/50 transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsVisible(true)}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-8 w-8 bg-gradient-to-r from-[#8AB861] to-[#E87C3E] bg-clip-text text-transparent" />
      </div>
      <div className="text-4xl font-bold text-gray-900 mb-2">
        {isVisible ? (
          <>
            {count}
            {number.includes('+') && '+'}
            {number.includes('/') && '/5'}
          </>
        ) : (
          '0'
        )}
      </div>
      <div className="text-lg text-gray-600">{label}</div>
    </div>
  )
}

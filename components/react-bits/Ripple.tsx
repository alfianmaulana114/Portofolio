'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RippleProps {
  children: React.ReactNode
  className?: string
  color?: string
  duration?: number
  maxScale?: number
  disabledOnMobile?: boolean
}

interface RippleEvent {
  x: number
  y: number
  id: number
}

export function Ripple({ 
  children, 
  className = '', 
  color = 'rgba(97, 218, 251, 0.3)',
  duration = 0.6,
  maxScale = 4,
  disabledOnMobile = true
}: RippleProps) {
  const [ripples, setRipples] = useState<RippleEvent[]>([])
  const elementRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabledOnMobile && isMobile) return

    const rect = elementRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples(prev => [...prev, { x, y, id }])

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id))
    }, duration * 1000)
  }

  if (disabledOnMobile && isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={elementRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: color,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: maxScale, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: duration,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
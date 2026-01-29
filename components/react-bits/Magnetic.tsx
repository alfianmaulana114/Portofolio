'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
  disabledOnMobile?: boolean
}

export function Magnetic({ 
  children, 
  className = '', 
  strength = 0.5,
  disabledOnMobile = true 
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (disabledOnMobile && isMobile) return

    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return

      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      x.set(deltaX)
      y.set(deltaY)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      x.set(0)
      y.set(0)
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovered, strength, disabledOnMobile, isMobile, x, y])

  if (disabledOnMobile && isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
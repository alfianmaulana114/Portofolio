'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  offset?: number[]
  className?: string
  disabledOnMobile?: boolean
}

export function Parallax({ 
  children, 
  speed = 0.5, 
  offset = [0, 1], 
  className = '', 
  disabledOnMobile = true 
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as [number, number],
  })

  const yRange = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed])
  
  const y = useSpring(yRange, { 
    stiffness: 400, 
    damping: 40 
  })

  if (disabledOnMobile && isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
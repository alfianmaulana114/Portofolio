'use client'

import React, { useState, useEffect } from 'react'
import { motion, easeInOut } from 'framer-motion'

interface FloatingProps {
  children: React.ReactNode
  className?: string
  amplitude?: number
  duration?: number
  delay?: number
  direction?: 'vertical' | 'horizontal' | 'both'
  disabledOnMobile?: boolean
}

export function Floating({ 
  children, 
  className = '', 
  amplitude = 20,
  duration = 4,
  delay = 0,
  direction = 'vertical',
  disabledOnMobile = true
}: FloatingProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (disabledOnMobile && isMobile) {
    return <div className={className}>{children}</div>
  }

  const getVariants = () => {
    switch (direction) {
      case 'horizontal':
        return {
          float: {
            x: [0, amplitude, 0, -amplitude, 0],
            transition: {
              duration: duration,
              repeat: Infinity,
              ease: easeInOut,
              delay: delay,
            },
          },
        }
      case 'both':
        return {
          float: {
            x: [0, amplitude, 0, -amplitude, 0],
            y: [0, amplitude / 2, 0, -amplitude / 2, 0],
            transition: {
              duration: duration,
              repeat: Infinity,
              ease: easeInOut,
              delay: delay,
            },
          },
        }
      case 'vertical':
      default:
        return {
          float: {
            y: [0, amplitude, 0, -amplitude, 0],
            transition: {
              duration: duration,
              repeat: Infinity,
              ease: easeInOut,
              delay: delay,
            },
          },
        }
    }
  }

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      animate="float"
    >
      {children}
    </motion.div>
  )
}
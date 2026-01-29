'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, easeOut, easeInOut } from 'framer-motion'

interface WaveTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  amplitude?: number
  frequency?: number
  splitBy?: 'character' | 'word'
}

export function WaveText({ 
  text, 
  className = '', 
  delay = 0, 
  duration = 1,
  amplitude = 15,
  frequency = 0.1,
  splitBy = 'character'
}: WaveTextProps) {
  const [isVisible, setIsVisible] = useState(false)
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

  useEffect(() => {
    if (isMobile) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [isMobile])

  const splitText = splitBy === 'character' ? text.split('') : text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: amplitude,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: Math.sin(i * frequency) * amplitude,
      transition: {
        duration: duration,
        ease: easeOut,
        y: {
          duration: duration * 2,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: easeInOut,
        },
      },
    }),
  }

  return (
    <div ref={elementRef} className={className}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {splitText.map((char, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            custom={index}
            className="inline-block"
          >
            {splitBy === 'word' && index < splitText.length - 1 ? char + ' ' : char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
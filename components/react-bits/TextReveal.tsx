'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, easeInOut } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  direction?: 'left' | 'right' | 'top' | 'bottom'
  distance?: number
  stagger?: number
  splitBy?: 'character' | 'word'
}

export function TextReveal({ 
  text, 
  className = '', 
  delay = 0, 
  duration = 0.8,
  direction = 'bottom',
  distance = 30,
  stagger = 0.05,
  splitBy = 'character'
}: TextRevealProps) {
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

  const getDirectionValues = () => {
    switch (direction) {
      case 'left':
        return { x: -distance, y: 0 }
      case 'right':
        return { x: distance, y: 0 }
      case 'top':
        return { x: 0, y: -distance }
      case 'bottom':
      default:
        return { x: 0, y: distance }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...getDirectionValues(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration,
        ease: easeInOut,
      },
    },
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
            className="inline-block"
          >
            {splitBy === 'word' && index < splitText.length - 1 ? char + ' ' : char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
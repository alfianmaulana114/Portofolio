'use client'

import { useEffect, useState, useRef } from 'react'

/**
 * DecryptedText Component
 * 
 * A text animation component that reveals text with a "decryption" effect.
 * Source: React Bits (https://reactbits.dev)
 */

interface DecryptedTextProps {
    text: string
    speed?: number
    maxIterations?: number
    sequential?: boolean
    revealDirection?: 'start' | 'end' | 'center'
    useOriginalCharsOnly?: boolean
    characters?: string
    className?: string
    parentClassName?: string
    animateOnHover?: boolean
    animate?: boolean
    onAnimationComplete?: () => void
    [key: string]: any
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    sequential = false,
    revealDirection = 'start',
    useOriginalCharsOnly = false,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+',
    className = '',
    parentClassName = '',
    animateOnHover = false,
    animate = true,
    onAnimationComplete,
    ...props
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState<string>(text)
    const [isHovering, setIsHovering] = useState<boolean>(false)
    const [isAnimating, setIsAnimating] = useState<boolean>(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const decryptText = () => {
        if (isAnimating) return
        setIsAnimating(true)

        let iteration = 0
        const textArray = text.split('')
        const revealedIndices = new Set<number>()

        if (intervalRef.current) clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
            const newText = textArray
                .map((char, index) => {
                    if (char === ' ') return ' '
                    if (revealedIndices.has(index)) return textArray[index]

                    if (useOriginalCharsOnly) {
                        const availableChars = text.replace(/\s/g, '')
                        return availableChars[Math.floor(Math.random() * availableChars.length)]
                    }

                    return characters[Math.floor(Math.random() * characters.length)]
                })
                .join('')

            setDisplayText(newText)

            if (sequential) {
                let revealIndex = -1
                if (revealDirection === 'start') {
                    revealIndex = Math.floor(iteration / maxIterations)
                } else if (revealDirection === 'end') {
                    revealIndex = textArray.length - 1 - Math.floor(iteration / maxIterations)
                } else {
                    // Center logic
                    const center = Math.floor(textArray.length / 2)
                    const offset = Math.floor(iteration / maxIterations)
                    if (offset === 0) {
                        revealIndex = center
                    } else {
                        // simplified alternate
                        revealIndex = iteration % 2 === 0 ? center + offset : center - offset
                    }
                }

                if (revealIndex >= 0 && revealIndex < textArray.length) {
                    revealedIndices.add(revealIndex)
                }
            } else {
                if (iteration % maxIterations === 0 && iteration > 0) {
                    const unrevealed = textArray
                        .map((_, i) => i)
                        .filter((i) => !revealedIndices.has(i) && textArray[i] !== ' ')
                    if (unrevealed.length > 0) {
                        revealedIndices.add(unrevealed[Math.floor(Math.random() * unrevealed.length)])
                    }
                }
            }

            iteration++

            if (revealedIndices.size >= textArray.filter(c => c !== ' ').length) {
                if (intervalRef.current) clearInterval(intervalRef.current)
                setDisplayText(text)
                setIsAnimating(false)
                if (onAnimationComplete) onAnimationComplete()
            }
        }, speed)
    }

    useEffect(() => {
        if (!animateOnHover && animate) {
            decryptText()
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, animate])

    const handleMouseEnter = () => {
        setIsHovering(true)
        if (animateOnHover) decryptText()
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
    }

    return (
        <span
            className={`inline-block ${parentClassName}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <span className={className}>{displayText}</span>
        </span>
    )
}

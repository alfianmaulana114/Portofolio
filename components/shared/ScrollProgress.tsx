'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const windowTop = window.scrollY
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrolled = (windowTop / height) * 100
            setWidth(scrolled)
        }

        window.addEventListener('scroll', handleScroll)
        // Initial calculation
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div
            className="fixed top-0 left-0 h-1 bg-yellow-400 z-[100] transition-all duration-300 pointer-events-none"
            style={{ width: `${width}%` }}
        />
    )
}

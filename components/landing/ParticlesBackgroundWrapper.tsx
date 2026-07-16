'use client'

import { useEffect, useState } from 'react'
import ParticlesBackground from './ParticlesBackground'

export default function ParticlesBackgroundWrapper() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])
    if (!mounted) return null
    return <ParticlesBackground />
}

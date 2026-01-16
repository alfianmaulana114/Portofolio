'use client'

import { useEffect, useRef } from 'react'

export default function ParticlesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []
        const techLabels = [
            '0', '1', 'PHP', 'SQL', 'NODE', 'API', 'GCP', 'ROOT', 'FETCH',
            'SELECT', 'POST', 'HTTP/2', 'LARAVEL', 'REACT', 'DB', 'GIT',
            'NEXT', 'PY', 'TS', 'JS', 'VITE', 'FLUTTER', 'SUPA'
        ]

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', resizeCanvas)
        resizeCanvas()

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            opacity: number
            type: 'dot' | 'text'
            label: string
            isSpecial: boolean

            constructor() {
                this.x = Math.random() * canvas!.width
                this.y = Math.random() * canvas!.height
                this.size = Math.random() * 2 + 0.1
                this.speedX = Math.random() * 0.4 - 0.2
                this.speedY = Math.random() * 0.4 - 0.2
                this.opacity = Math.random() * 0.2 + 0.05
                this.type = Math.random() > 0.85 ? 'text' : 'dot'
                this.label = techLabels[Math.floor(Math.random() * techLabels.length)]
                this.isSpecial = Math.random() > 0.95
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.x > canvas!.width) this.x = 0
                if (this.x < 0) this.x = canvas!.width
                if (this.y > canvas!.height) this.y = 0
                if (this.y < 0) this.y = canvas!.height
            }

            draw() {
                if (!ctx) return
                const currentOpacity = this.isSpecial ? this.opacity * 2 : this.opacity
                ctx.fillStyle = `rgba(0, 0, 0, ${currentOpacity})`

                if (this.type === 'dot') {
                    ctx.beginPath()
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                    ctx.fill()
                } else {
                    ctx.font = `${this.isSpecial ? '900' : 'bold'} ${this.isSpecial ? '10px' : '7px'} JetBrains Mono, Courier New, monospace`
                    ctx.fillText(this.label, this.x, this.y)
                }
            }
        }

        const init = () => {
            particles = []
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 8000)
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle())
            }
        }

        const animate = () => {
            if (!ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach((particle) => {
                particle.update()
                particle.draw()
            })

            // Draw connections
            particles.forEach((a, index) => {
                if (a.type !== 'dot') return

                for (let j = index + 1; j < particles.length; j++) {
                    const b = particles[j]
                    if (b.type !== 'dot') continue

                    const dx = a.x - b.x
                    const dy = a.y - b.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 120) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(0, 0, 0, ${0.06 - distance / 2000})`
                        ctx.lineWidth = 0.3
                        ctx.moveTo(a.x, a.y)
                        ctx.lineTo(b.x, b.y)
                        ctx.stroke()
                    }
                }
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        init()
        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
    )
}

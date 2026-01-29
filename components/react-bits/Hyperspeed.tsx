'use client';

import React, { useRef, useEffect } from 'react';

interface HyperspeedProps {
  className?: string;
  speed?: number;
  color?: string;
  particleCount?: number;
  particleSize?: number;
  speedLines?: boolean;
  speedLinesCount?: number;
  fadeIn?: boolean;
  fadeInDuration?: number;
  backgroundColor?: string;
}

export const Hyperspeed: React.FC<HyperspeedProps> = ({
  className = '',
  speed = 1,
  color = '#61dafb',
  particleCount = 200,
  particleSize = 2,
  speedLines = true,
  speedLinesCount = 10,
  fadeIn = true,
  fadeInDuration = 1.5,
  backgroundColor = 'transparent',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
  }>>([]);
  const speedLinesRef = useRef<Array<{
    x: number;
    y: number;
    length: number;
    speed: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed * 2,
      vy: (Math.random() - 0.5) * speed * 2,
      size: Math.random() * particleSize + 1,
      opacity: Math.random() * 0.8 + 0.2,
    }));

    // Initialize speed lines
    if (speedLines) {
      speedLinesRef.current = Array.from({ length: speedLinesCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 100 + 50,
        speed: Math.random() * speed * 5 + 2,
        opacity: Math.random() * 0.3 + 0.1,
      }));
    }

    let fadeInOpacity = fadeIn ? 0 : 1;
    const startTime = Date.now();

    const animate = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Fade in effect
      if (fadeIn && fadeInOpacity < 1) {
        const elapsed = (Date.now() - startTime) / 1000;
        fadeInOpacity = Math.min(1, elapsed / fadeInDuration);
      }

      ctx.globalAlpha = fadeInOpacity;

      // Draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = particle.opacity * fadeInOpacity;
        ctx.fill();

        // Draw connections to nearby particles
        particlesRef.current.forEach((otherParticle) => {
          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = color;
            ctx.globalAlpha = (1 - distance / 100) * 0.2 * fadeInOpacity;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      // Draw speed lines
      if (speedLines) {
        speedLinesRef.current.forEach((line) => {
          // Update position
          line.x += line.speed;
          
          // Reset when off screen
          if (line.x > canvas.width + line.length) {
            line.x = -line.length;
            line.y = Math.random() * canvas.height;
            line.speed = Math.random() * speed * 5 + 2;
          }

          // Draw line
          ctx.beginPath();
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(line.x + line.length, line.y);
          ctx.strokeStyle = color;
          ctx.globalAlpha = line.opacity * fadeInOpacity;
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, color, particleCount, particleSize, speedLines, speedLinesCount, fadeIn, fadeInDuration, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ backgroundColor }}
    />
  );
};
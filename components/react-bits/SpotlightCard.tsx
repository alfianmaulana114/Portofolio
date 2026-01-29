'use client';

import React, { useRef, useState, useEffect } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  particleCount?: number;
  spotlightRadius?: number;
  autoHide?: boolean;
  disableAnimations?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = '61, 188, 255',
  borderColor = '61, 188, 255',
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  particleCount = 12,
  spotlightRadius = 300,
  autoHide = true,
  disableAnimations = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [clickRipples, setClickRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const shouldDisableAnimations = disableAnimations || isMobile;

  useEffect(() => {
    const card = cardRef.current;
    if (!card || shouldDisableAnimations) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });

      if (enableTilt) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        setTilt({ x: rotateX, y: rotateY });
      }

      if (enableMagnetism) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const translateX = (x - centerX) / 20;
        const translateY = (y - centerY) / 20;
        card.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;
      } else if (enableTilt) {
        card.style.transform = `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;
      }
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
      card.style.transform = 'translate(0px, 0px) rotateX(0deg) rotateY(0deg)';
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = { id: Date.now(), x, y };
      setClickRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setClickRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 1000);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('click', handleClick);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('click', handleClick);
    };
  }, [enableTilt, enableMagnetism, clickEffect, shouldDisableAnimations]);

  const generateStars = () => {
    return Array.from({ length: particleCount }, (_, i) => {
      const size = Math.random() * 2 + 1;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = Math.random() * 3 + 2;
      
      return (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animation: `twinkle ${duration}s ${delay}s infinite`,
            opacity: isHovered ? 0.8 : 0.4,
          }}
        />
      );
    });
  };

  return (
    <div className="relative">
      <div
        ref={cardRef}
        className={`relative overflow-hidden rounded-lg bg-card/90 backdrop-blur-sm border border-border/50 transition-all duration-300 ${className}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: shouldDisableAnimations ? 'none' : undefined,
        }}
      >
        {/* Spotlight Effect */}
        {enableSpotlight && !shouldDisableAnimations && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(${spotlightRadius}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${spotlightColor}, 0.15), transparent 80%)`,
            }}
          />
        )}

        {/* Border Glow Effect */}
        {enableBorderGlow && !shouldDisableAnimations && (
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${borderColor}, 0.3), transparent 40%)`,
            }}
          />
        )}

        {/* Stars Effect */}
        {enableStars && !shouldDisableAnimations && (
          <div className="absolute inset-0 pointer-events-none">
            {generateStars()}
          </div>
        )}

        {/* Click Ripple Effects */}
        {clickRipples.map(ripple => (
          <div
            key={ripple.id}
            className="absolute rounded-full border-2 border-primary pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: '20px',
              height: '20px',
              transform: 'translate(-50%, -50%)',
              animation: 'ripple 1s ease-out',
            }}
          />
        ))}

        {/* Content */}
        <div className={`relative z-10 ${autoHide && !isHovered ? 'opacity-90' : ''}`}>
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
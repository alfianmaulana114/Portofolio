'use client';

import React, { useRef, useState, useEffect } from 'react';

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glare?: boolean;
  glareColor?: string;
  glarePosition?: 'top' | 'bottom' | 'left' | 'right';
  scale?: number;
  transitionDuration?: number;
  disabled?: boolean;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  className = '',
  maxTilt = 15,
  perspective = 1000,
  glare = true,
  glareColor = 'rgba(97, 218, 251, 0.3)',
  glarePosition = 'top',
  scale = 1.05,
  transitionDuration = 0.3,
  disabled = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glareStyle, setGlareStyle] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    if (disabled || isMobile) return;

    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = e.clientX - rect.left - centerX;
      const y = e.clientY - rect.top - centerY;

      // Calculate tilt
      const tiltX = (y / centerY) * maxTilt;
      const tiltY = -(x / centerX) * maxTilt;

      setTilt({ x: tiltX, y: tiltY });

      // Calculate glare
      if (glare) {
        const glareX = (e.clientX - rect.left) / rect.width;
        const glareY = (e.clientY - rect.top) / rect.height;
        
        setGlareStyle({
          background: `radial-gradient(circle at ${glareX * 100}% ${glareY * 100}%, ${glareColor}, transparent 40%)`,
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
      setGlareStyle({});
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled, isMobile, maxTilt, glare, glareColor]);

  const cardStyle = {
    transform: disabled || isMobile 
      ? 'none' 
      : `perspective(${perspective}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? scale : 1})`,
    transition: `transform ${transitionDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    transformStyle: 'preserve-3d' as const,
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={cardStyle}
    >
      {glare && !disabled && !isMobile && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={glareStyle}
        />
      )}
      {children}
    </div>
  );
};
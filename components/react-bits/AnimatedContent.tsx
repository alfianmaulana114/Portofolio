'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedContentProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  initialOpacity?: number;
  initialScale?: number;
  animateOpacity?: boolean;
  onComplete?: () => void;
}

export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  className = '',
  direction = 'bottom',
  distance = 50,
  duration = 0.8,
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  initialOpacity = 0,
  initialScale = 1,
  animateOpacity = true,
  onComplete,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!hasTriggered || !triggerOnce)) {
          setTimeout(() => {
            setIsVisible(true);
            setHasTriggered(true);
            
            if (onComplete) {
              setTimeout(onComplete, (duration + delay) * 1000);
            }
          }, delay * 1000);
        }
      },
      { threshold, rootMargin }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, duration, threshold, rootMargin, triggerOnce, hasTriggered, onComplete]);

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0) scale(1)';
    
    switch (direction) {
      case 'top':
        return `translate(0, -${distance}px) scale(${initialScale})`;
      case 'bottom':
        return `translate(0, ${distance}px) scale(${initialScale})`;
      case 'left':
        return `translate(-${distance}px, 0) scale(${initialScale})`;
      case 'right':
        return `translate(${distance}px, 0) scale(${initialScale})`;
      default:
        return `translate(0, ${distance}px) scale(${initialScale})`;
    }
  };

  const style = {
    transform: getTransform(),
    opacity: animateOpacity ? (isVisible ? 1 : initialOpacity) : undefined,
    transition: `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    willChange: 'transform, opacity',
  };

  return (
    <div
      ref={elementRef}
      className={`${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
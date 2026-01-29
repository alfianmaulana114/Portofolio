'use client';

import React, { useEffect, useState } from 'react';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  animateBy?: 'words' | 'characters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  onAnimationComplete?: () => void;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.4,
  animateBy = 'words',
  direction = 'bottom',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  onAnimationComplete,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<string[]>([]);

  useEffect(() => {
    const items = animateBy === 'words' ? text.split(' ') : text.split('');
    setAnimatedItems(items);
  }, [text, animateBy]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!hasTriggered || !triggerOnce)) {
          setTimeout(() => {
            setIsVisible(true);
            setHasTriggered(true);
            
            if (onAnimationComplete) {
              const totalDuration = delay + (duration * animatedItems.length);
              setTimeout(onAnimationComplete, totalDuration * 1000);
            }
          }, delay * 1000);
        }
      },
      { threshold, rootMargin }
    );

    const element = document.getElementById(`blur-text-${text.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [delay, duration, animatedItems.length, threshold, rootMargin, triggerOnce, hasTriggered, onAnimationComplete, text]);

  const getTransform = (index: number) => {
    if (!isVisible) {
      switch (direction) {
        case 'top':
          return 'translateY(-20px)';
        case 'bottom':
          return 'translateY(20px)';
        case 'left':
          return 'translateX(-20px)';
        case 'right':
          return 'translateX(20px)';
        default:
          return 'translateY(20px)';
      }
    }
    return 'translate(0)';
  };

  const getItemStyle = (index: number) => {
    const itemDelay = index * 0.1;
    const totalDelay = delay + itemDelay;
    
    return {
      display: 'inline-block',
      transform: getTransform(index),
      opacity: isVisible ? 1 : 0,
      filter: isVisible ? 'blur(0)' : 'blur(4px)',
      transition: `all ${duration}s ease-out ${totalDelay}s`,
    };
  };

  return (
    <span
      id={`blur-text-${text.replace(/\s+/g, '-').toLowerCase()}`}
      className={`inline-block ${className}`}
    >
      {animatedItems.map((item, index) => (
        <span
          key={index}
          style={getItemStyle(index)}
          className={animateBy === 'words' ? 'mr-1' : ''}
        >
          {item}
          {animateBy === 'words' && index < animatedItems.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
};
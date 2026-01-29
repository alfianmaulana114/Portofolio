'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  endValue: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delay?: number;
  onComplete?: () => void;
  startValue?: number;
  easing?: 'linear' | 'easeInOut' | 'easeOut' | 'easeIn';
  separator?: boolean;
  separatorChar?: string;
}

const easingFunctions = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 2),
  easeInOut: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
};

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  endValue,
  duration = 2,
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0,
  delay = 0,
  onComplete,
  startValue = 0,
  easing = 'easeOut',
  separator = true,
  separatorChar = ',',
}) => {
  const [currentValue, setCurrentValue] = useState(startValue);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
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
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const easingFunction = easingFunctions[easing];

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / (duration * 1000), 1);
      const easedProgress = easingFunction(progress);
      
      const currentValue = startValue + (endValue - startValue) * easedProgress;
      setCurrentValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(endValue);
        if (onComplete) {
          onComplete();
        }
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, startValue, endValue, duration, easing, onComplete]);

  const formatNumber = (num: number) => {
    const rounded = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    let formatted = rounded.toFixed(decimals);
    
    if (separator) {
      const parts = formatted.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separatorChar);
      formatted = parts.join('.');
    }
    
    return formatted;
  };

  return (
    <span ref={elementRef} className={className}>
      {prefix}{formatNumber(currentValue)}{suffix}
    </span>
  );
};
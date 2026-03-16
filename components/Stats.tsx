"use client";

import React, { useState, useEffect, useRef } from 'react';

const StatItem = ({ endValue, label, suffix = "" }: { endValue: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = endValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, endValue]);

  return (
    <div ref={elementRef} className="text-center px-4">
      <div className="text-5xl md:text-6xl font-black text-point-blue mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-lg text-secondary-text font-medium">{label}</div>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <StatItem endValue={150} label="성공적인 프로젝트" suffix="+" />
          <StatItem endValue={1200} label="누적 사용자 수" suffix="K" />
          <StatItem endValue={98} label="고객 만족도" suffix="%" />
        </div>
      </div>
    </section>
  );
};

export default Stats;

import React, { useEffect, useRef, useState } from 'react';
import siteConfig from '../../data/siteConfig';

function CounterItem({ value, suffix, label, description }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 1800; // ms
    const stepTime = 25;
    const totalSteps = duration / stepTime;
    const increment = value / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, value]);

  return (
    <div ref={elementRef} className="text-center p-6 sm:p-8 max-md:p-4 rounded-2xl max-md:rounded-xl bg-royal/70 border border-white/20 backdrop-blur-md text-white shadow-xl">
      <div className="text-4xl sm:text-5xl md:text-6xl max-md:text-[34px] font-serif font-bold text-teal tracking-tight mb-2">
        <span>{count.toLocaleString()}</span>
        <span>{suffix}</span>
      </div>
      <h3 className="text-base sm:text-lg max-md:text-[14px] font-semibold text-white mb-1">
        {label}
      </h3>
      <p className="text-xs max-md:text-[12px] text-blue-100/70 font-light">
        {description}
      </p>
    </div>
  );
}

/**
 * StatsSection
 * Royal Blue glass cards with vibrant Teal counters
 */
export default function StatsSection() {
  return (
    <section className="py-20 max-md:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 max-md:px-4">
        <div className="text-center max-w-2xl mx-auto mb-14 max-md:mb-8 text-white">
          <span className="text-xs max-md:text-[12px] font-semibold text-teal uppercase tracking-[0.25em] block mb-2">
            A Legacy of Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl max-md:text-[26px] font-serif font-bold text-white tracking-tight">
            Built on Uncompromising Trust
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-md:grid-cols-2 max-[359px]:grid-cols-1 gap-6 sm:gap-8 max-md:gap-3">
          {siteConfig.stats.map((stat, index) => (
            <CounterItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

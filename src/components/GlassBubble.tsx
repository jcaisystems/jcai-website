// src/components/GlassBubble.tsx
"use client";
import { useId } from 'react';
import './GlassBubble.css';

const GlassBubble = () => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;

  return (
    <div className="glass-bubble-container">
      <svg className="glass-bubble-filter" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default GlassBubble;
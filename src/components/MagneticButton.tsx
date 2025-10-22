"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Define the types for the component's props
interface MagneticButtonProps {
  children: React.ReactNode;
  [key: string]: any; // Allows for any other standard button props like 'type', 'onClick', etc.
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null); // Ref for the wrapping div to get dimensions
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      style={{ position: 'relative' }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 350, damping: 5, mass: 0.5 }}
    >
      <button
        {...props}
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-transform duration-300 ease-in-out bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full shadow-lg hover:shadow-cyan-400/50"
      >
        <span className="relative z-10">{children}</span>
      </button>
    </motion.div>
  );
};

export default MagneticButton;
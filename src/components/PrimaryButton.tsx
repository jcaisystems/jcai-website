// src/components/PrimaryButton.tsx

"use client";
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  [key: string]: any; 
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, href, className = "", ...props }) => {
  const buttonClasses = cn(
    "relative px-8 py-4 font-bold rounded-full transition-all duration-300 flex items-center justify-center",
    "bg-[#9bcf3d] text-slate-900", // Accent color
    "hover:bg-[#8cc030]",
    "shadow-lg hover:shadow-2xl hover:shadow-green-500/25",
    className
  );

  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  const Component = href ? motion(Link) : motion.button;
  
  const componentProps = {
      className: buttonClasses,
      ...motionProps,
      ...props
  };

  if (href) {
      return (
          <Component href={href} {...componentProps}>
              {children}
          </Component>
      );
  }

  return (
      <Component {...componentProps}>
          {children}
      </Component>
  );
};

export default PrimaryButton;
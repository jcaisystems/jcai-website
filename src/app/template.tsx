// src/app/template.tsx

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import "./transition.css";

// This object maps URL paths to the friendly names you want to display during the transition.
const routes = {
  "/": "Home",
  "/about": "About Us",
  "/practice": "For Clinics",
  "/case-studies": "Case Studies",
  "/faq": "FAQ",
  "/contact": "Contact",
  "/booking-page": "Book a Call",
  "/braga": "Thommy Braga",
  "/jonathan": "Jonathan Talaska",
  "/christian": "Christian Scheidt",
  "/blueprint": "Blueprint" // Added for completeness
};

const anim = (variants: any) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
  };
};

const SVG = ({ width, height }: { width: number, height: number }) => {
    const initialPath = `M0 300 Q${width / 2} 0 ${width} 300 L${width} ${height + 300} Q${width / 2} ${height + 600} 0 ${height + 300} L0 0`;
    const targetPath = `M0 300 Q${width / 2} 300 ${width} 300 L${width} ${height + 300} Q${width / 2} ${height + 300} 0 ${height + 300} L0 0`;

    const slide = {
        initial: { top: "-300px" },
        enter: { top: "-100vh", transition: { duration: 0.75, delay: 0.3, ease: [0.76, 0, 0.24, 1] }, transitionEnd: { top: "100vh" } },
        exit: { top: "-300px", transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } },
    };

    const curve = {
        initial: { d: initialPath },
        enter: { d: targetPath, transition: { duration: 0.75, delay: 0.3, ease: [0.76, 0, 0.24, 1] } },
        exit: { d: initialPath, transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } },
    };

    return (
        <motion.svg {...anim(slide)} className="svg-curve">
            <motion.path {...anim(curve)}></motion.path>
        </motion.svg>
    )
}

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // --- UPDATED OPTIMIZATION HERE ---
  // If we are on the homepage OR the blueprint page, render the children directly.
  if (pathname === '/' || pathname === '/blueprint') {
    return <>{children}</>;
  }
  // --- END OF UPDATE ---

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const text = {
    initial: { opacity: 1 },
    enter: { opacity: 0, top: -100, transition: { duration: 0.75, delay: 0.3, ease: [0.76, 0, 0.24, 1] }, transitionEnd: { top: "47.5%" } },
    exit: { opacity: 1, top: "40%", transition: { duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] } },
  };

  return (
    <div className="page-curve">
        <div style={{opacity: dimensions.width > 0 ? 0 : 1}} className="background"/>
        <AnimatePresence mode="wait">
            <motion.p {...anim(text)} key={pathname} className="route">
                {routes[pathname as keyof typeof routes]}
            </motion.p>
        </AnimatePresence>
        
        {dimensions.width > 0 && <SVG {...dimensions} />}
        
        {children}
    </div>
  );
}
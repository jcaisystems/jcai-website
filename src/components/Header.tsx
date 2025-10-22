// src/components/Header.tsx

"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Import Heroicons
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  BriefcaseIcon,
  ChartPieIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/solid';

// Import the new GlassBubble component
import GlassBubble from './GlassBubble';

// --- Services Menu (Mega Menu) ---
// UPDATED: Removed the "Coming Soon" items
const serviceItems = [{
  title: "Clinics & Practices",
  description: "Specialized systems to reclaim time and enhance patient care.",
  icon: BriefcaseIcon,
  href: "/practice"
}];

const ServicesMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative pt-2 -mt-2" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center gap-1 px-4 py-2 hover:text-cyan-400 transition-colors">
        Services
        <ChevronDownIcon strokeWidth={2.5}
          className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-full w-[calc(100vw-2rem)] max-w-md -translate-x-1/2">
            <div className="overflow-hidden rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-600 shadow-xl">
              <div className="p-4">
                {serviceItems.map(({ title, description, icon: Icon, href }) => (
                  <Link key={title}
                    href={href}
                    className="block p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Icon className="h-8 w-8 text-cyan-400" />
                      <div>
                        <p className="font-semibold text-white">{title}</p>
                        <p className="text-sm text-slate-400">{description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Header Component ---
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const [hoveredLink, setHoveredLink] = useState(pathname);

  useEffect(() => {
    setHoveredLink(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'FAQ', href: '/faq' },
  ];
  const homeLink = { name: 'Home', href: '/' };

  return (
    <>
      <motion.header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMobileMenuOpen ? 'bg-slate-800/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center text-2xl font-bold text-white tracking-wider relative z-10">
            <img 
              src="/jcaifavicon-white.png" 
              alt="JCAI Logo" 
              className="w-10 h-auto mr-2" // adjust size if needed
            />
            JCAI
          </Link>

          {/* Desktop Navigation -- UPDATED FROM md:flex to lg:flex */}
          <nav className="hidden lg:flex items-center space-x-2 text-white bg-slate-700/50 border border-slate-600/50 rounded-full p-1"
            onMouseLeave={() => setHoveredLink(pathname)}
          >
            <Link
              key={homeLink.name}
              href={homeLink.href}
              className="px-4 py-2 rounded-full relative transition-colors"
              onMouseEnter={() => setHoveredLink(homeLink.href)}>
              {hoveredLink === homeLink.href && (
                <motion.div layoutId="bubble"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}>
                  <GlassBubble />
                </motion.div>
              )}
              <span className="relative z-10">{homeLink.name}</span>
            </Link>

            <ServicesMenu />

            {navLinks.map((item) => (
              <Link key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-full relative transition-colors"
                onMouseEnter={() => setHoveredLink(item.href)}>
                {hoveredLink === item.href && (
                  <motion.div layoutId="bubble"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}>
                    <GlassBubble />
                  </motion.div>
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* UPDATED FROM md:flex to lg:flex */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact" className="px-5 py-2 text-white border border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-colors duration-300">
              Contact
            </Link>
            <Link href="/booking-page" className="px-5 py-2 text-slate-900 bg-[#9bcf3d] border border-[#9bcf3d] rounded-full hover:bg-[#8abb33] transition-colors duration-300">
              Book a Call
            </Link>
          </div>

          {/* Mobile Menu Button -- UPDATED FROM md:hidden to lg:hidden */}
          <div className="lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white relative z-20">
              {isMobileMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu -- UPDATED FROM md:hidden to lg:hidden */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-0 w-full bg-slate-800/95">
              <div className="container mx-auto px-6 py-8 flex flex-col items-center text-center space-y-4">
                <Link
                  key={homeLink.name}
                  href={homeLink.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full py-3 text-lg rounded-full transition-colors ${pathname === homeLink.href ? 'text-cyan-400 font-bold' : 'text-white'}`}>
                  {homeLink.name}
                </Link>

                {/* Simplified Services for mobile */}
                <div className="w-full py-3 text-lg text-white">
                  <p className="font-semibold">Services</p>
                  <div className="flex flex-col items-center mt-2 space-y-2">
                    {serviceItems.map(item => (
                      <Link key={item.title}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-slate-300 hover:text-cyan-400 text-base">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {navLinks.map(item => (
                  <Link key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full py-3 text-lg rounded-full transition-colors ${pathname === item.href ? 'text-cyan-400 font-bold' : 'text-white'}`}>
                    {item.name}
                  </Link>
                ))}

                <Link href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full max-w-xs mt-4 px-5 py-3 text-white border border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-colors duration-300">
                  Contact
                </Link>
                <Link href="/booking-page"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full max-w-xs px-5 py-3 text-slate-900 bg-[#9bcf3d] border border-[#9bcf3d] rounded-full hover:bg-[#8abb33] transition-colors duration-300">
                  Book a Call
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
     
    </>
  );
};


export default Header;
"use client";
import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import './MagicCard.css';

// --- Helper Functions & Constants ---
const MOBILE_BREAKPOINT = 768;
const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_GLOW_COLOR = '6, 182, 212';

const createParticleElement = (x: number, y: number, color: string) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

// --- Main MagicCard Component ---
interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  enableParticles?: boolean;
  enableBorderGlow?: boolean;
}

const MagicCard: React.FC<MagicCardProps> = ({
  children,
  className = '',
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
  enableParticles = true,
  enableBorderGlow = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isHoveredRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldDisableAnimations = isMobile;

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current || !enableParticles) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    const particles = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );

    particles.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        cardRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.fromTo(particle, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          duration: 2 + Math.random() * 3,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(particle, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });

      }, index * 100);
      timeoutsRef.current.push(timeoutId);
    });
  }, [enableParticles, particleCount, glowColor]);

  useEffect(() => {
    const element = cardRef.current;
    if (shouldDisableAnimations || !element) return;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt) {
        gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
      }
      if (enableMagnetism) {
        gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Glow effect
      if (enableBorderGlow) {
        element.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
        element.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
      }

      // Tilt effect
      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        gsap.to(element, { rotateX, rotateY, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
      }

      // Magnetism effect
      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.1;
        const magnetY = (y - centerY) * 0.1;
        gsap.to(element, { x: magnetX, y: magnetY, duration: 0.3, ease: 'power2.out' });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));
      
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      element.appendChild(ripple);

      gsap.fromTo(ripple, 
        { 
          left: x, 
          top: y, 
          scale: 0, 
          opacity: 1,
          width: 0,
          height: 0,
        }, 
        { 
          duration: 0.8, 
          ease: 'power2.out',
          scale: 1,
          opacity: 0,
          width: maxDistance * 2,
          height: maxDistance * 2,
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [shouldDisableAnimations, animateParticles, clearAllParticles, enableTilt, enableMagnetism, clickEffect, enableBorderGlow]);

  const combinedClassName = `
    magic-card 
    ${className} 
    ${enableBorderGlow ? 'card--border-glow' : ''}
    ${shouldDisableAnimations ? 'animations-disabled' : ''}
  `;

  return (
    <div
      ref={cardRef}
      className={combinedClassName}
      style={{
        ...style,
        '--glow-color': glowColor,
      } as React.CSSProperties}
    >
      <div className="magic-card-content">
        {children}
      </div>
    </div>
  );
};

export default MagicCard;
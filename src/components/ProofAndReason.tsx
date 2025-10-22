"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useSpring, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Quote, TrendingUp, Clock, DollarSign, CheckCircle } from "lucide-react";
import MagicCard from '@/components/MagicCard';

// AnimatedNumber Component for count-up effect
function AnimatedNumber({ value, isDollars = false }: { value: number; isDollars?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  // Slower animation: reduced stiffness, increased damping
  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20 });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [spring, isInView, value]);

  const display = useTransform(spring, (current) => {
    const rounded = Math.round(current);
    const formatted = rounded.toLocaleString();
    if (isDollars) {
      return `$${formatted}+`;
    }
    if (value === 30) {
        return `${formatted}%`;
    }
    return `${formatted}+ hrs`;
  });

  // Scale animation synced with count-up
  const scale = useTransform(spring, [0, value], [1, 1.05]);

  return (
    <motion.div style={{ scale }}>
      <motion.span ref={ref}>{display}</motion.span>
    </motion.div>
  );
}

export const ProofAndReason = () => {
  const testimonials = [
    {
      quote: "Working with JCAI wasn't just an improvement—it was a transformation. We reclaimed 15+ hours weekly of administrative time. Our lead conversion increased 30% in just two months.",
      author: "Anna M.",
      role: "Freelance Consultant",
      meta: ["15+ hours saved", "30% conversion lift", "Operational transformation"]
    },
    {
      quote: "I can finally take a vacation without my phone glued to my hand. The AI handles client inquiries, schedules meetings, and keeps operations running. It's like having a COO that never sleeps.",
      author: "Marcus T.",
      role: "Agency Owner",
      meta: ["24/7 client support", "Automated scheduling", "Operational reliability"]
    },
    {
      quote: "We were spending $8K monthly on contractors for tasks our AI now handles automatically. Within six weeks the investment paid for itself, and our operations became faster and more reliable.",
      author: "Sarah K.",
      role: "E-commerce Director",
      meta: ["$8K monthly savings", "6-week ROI", "Enhanced reliability"]
    }
  ];

  const stats = [
    { icon: TrendingUp, value: 30, label: "Average conversion increase" },
    { icon: Clock, value: 15, label: "Saved per week" },
    { icon: DollarSign, value: 250000, label: "Annual cost savings", isDollars: true }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Function to start the timer
    const startTimer = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 8000);
    };

    // Function to stop the timer
    const stopTimer = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    
    if (!isHovered) {
      startTimer();
    } else {
      stopTimer();
    }
    
    // Cleanup on component unmount or when isHovered changes
    return () => stopTimer();

  }, [isHovered, testimonials.length]);

  return (
    <div className="bg-slate-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* Title and Subtitle */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-slate-200 to-cyan-400 text-transparent bg-clip-text">
            <span className="text-foreground">Real Businesses.</span> <span className="gradient-text">Real Results.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            <span className="font-bold text-cyan-400">Why is this free?</span> Simple: We let our results speak for themselves. Once you see what's possible, many of our clients ask us to build it for them.
          </p>
          <p className="text-lg text-slate-400 mt-4">
            You keep the entire blueprint regardless — no strings, no obligations.
          </p>
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="bg-slate-900/50 border-slate-700 p-8 text-center hover:border-cyan-400 transition-colors duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-2">
                <AnimatedNumber value={stat.value} isDollars={stat.isDollars} />
              </h3>
              <p className="text-slate-400">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Testimonials Section */}
        <section className="py-24">
          <div className="text-center mb-16">
             <Quote className="h-10 w-10 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">What Our Clients Are Saying</h3>
          </div>
          
          <div 
            className="relative h-96 md:h-80 w-full max-w-3xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <MagicCard
                  className="h-full bg-slate-900/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-slate-700 flex flex-col justify-center"
                  glowColor="6, 182, 212" // Cyan glow
                >
                  {/* Quote */}
                  <motion.p
                    className="text-lg md:text-xl italic text-slate-300 mb-6 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    "{testimonials[currentIndex].quote}"
                  </motion.p>

                  {/* Author and Role */}
                  <motion.div
                    className="text-center mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <p className="font-bold text-cyan-400 text-lg">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="text-slate-400 font-normal">
                      {testimonials[currentIndex].role}
                    </p>
                  </motion.div>

                  {/* Meta Details */}
                  <motion.div
                    className="flex flex-wrap justify-center items-center gap-3 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {testimonials[currentIndex].meta.map((item, index) => (
                      <span key={index} className="flex items-center bg-slate-800/60 text-cyan-300 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-700">
                        <CheckCircle className="w-3 h-3 mr-1.5 text-cyan-400" />
                        {item}
                      </span>
                    ))}
                  </motion.div>
                </MagicCard>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center space-x-3 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-cyan-400 w-8' : 'bg-slate-500 hover:bg-slate-400'
                  }`}
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};
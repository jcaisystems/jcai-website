"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Puzzle, Target, Users, Bot, Layers, CheckCircle, BrainCircuit, Eye, Workflow, Cpu, PlayCircle, Rocket, Code, Search } from 'lucide-react';
import Link from 'next/link';
import MagicCard from '@/components/MagicCard';
import OutlineButton from '@/components/OutlineButton';
import PrimaryButton from '@/components/PrimaryButton';
import Spline from '@splinetool/react-spline';
import Image from 'next/image';

// This is the Client Component that contains all the interactive logic
// It receives the isMobile prop from the server and does not need its own detection hook.
const EnhancedHomepageClient = ({ isMobile }: { isMobile: boolean }) => {

  // Revolutionary Hero Section
  const RevolutionaryHero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
    const textY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

    const titleWords = "Invisible Systems That Deliver".split(' ');
    const subtitleText = "8";

    return (
      <section ref={containerRef} className="relative h-[100vh] flex flex-col justify-center text-white bg-slate-900 overflow-hidden">
        <div className="absolute bottom-3 right-3 w-37 h-11 bg-black rounded-xl z-11 flex items-center justify-center text-white font-semibold">
          JCAI
        </div>

        <div className="absolute top-0 left-0 w-full h-full z-10">
          <Spline scene="https://prod.spline.design/OgTvuYs9hp1XyYaD/scene.splinecode" />
        </div>

        <motion.div
          className="relative z-30 text-center container mx-auto px-6 -mt-20 pointer-events-none"
          style={{
            opacity: isMobile ? 1 : heroOpacity,
            scale: isMobile ? 1 : heroScale,
            y: isMobile ? 0 : textY
          }}
        >
          <div className="mb-6">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block text-5xl md:text-8xl font-extrabold mr-4 mb-2
                                     text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-300 pointer-events-auto"
                style={{ lineHeight: '1.2' }} // Fix for cutoff text
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mb-10">
            <div className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              {subtitleText}
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
          >
            <OutlineButton href="#video-section">
              <PlayCircle className="mr-2" /> Watch Me Explain It
            </OutlineButton>
            <PrimaryButton href="/blueprint">
              Get Your Free Blueprint
            </PrimaryButton>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ opacity: isMobile ? 1 : heroOpacity }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>
    );
  };

  // Problem Section
  const ImmersiveProblemSection = () => {
    const problems = [
      { icon: <Puzzle className="h-8 w-8 text-cyan-400" />, title: "Copy-Paste Drudgery", description: "Every time someone copy-pastes between tools, you lose minutes." },
      { icon: <BrainCircuit className="h-8 w-8 text-cyan-400" />, title: "Process Bottlenecks", description: "When your only process document lives in someone’s head, chaos grows." },
      { icon: <Target className="h-8 w-8 text-cyan-400" />, title: "Founder Dependency", description: "When you, not your systems, become the single point of failure." },
      { icon: <Users className="h-8 w-8 text-cyan-400" />, title: "Wasted Talent", description: "When capable people wind up doing manual grunt work instead of creative work." },
    ];

    return (
      <section id="problems" className="py-32 bg-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Your Hidden Time & Money Leak
            </h2>
            <div
              className="text-slate-400 max-w-3xl mx-auto text-lg space-y-4"
            >
              <p>There’s invisible friction dragging your team down. You may not fully feel it, but it’s there.</p>
              <p className="pt-4">It doesn't have to be this way. You deserve systems that anticipate, act, and relieve pressure.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
              >
                <MagicCard className="h-full bg-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
                  <div
                    className="mb-6 w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center"
                  >
                    {problem.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{problem.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{problem.description}</p>
                </MagicCard>
              </div>
            ))}
          </div>

          <div
            id="video-section"
            className="pt-24 -mt-24" // Added padding-top and negative margin-top to fix scroll anchor
          >
            <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-2xl shadow-cyan-500/10 aspect-video mt-24">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/7AX57K86g1Y"
                title="Why 90% of AI Tools Fail"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div
              className="text-center mt-8"
            >
              <p className="text-slate-400 text-lg">Watch for 2 minutes—I'll show you what this looks like in a real business.</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Services Section
  const DynamicServicesSection = () => {
    const services = [
      { icon: <Workflow className="h-8 w-8 text-cyan-400" />, title: "Workflow Tools", description: "Automate steps across your tools (e.g., invoicing → notification → report) to stop wasting hours on glue work." },
      { icon: <Bot className="h-8 w-8 text-cyan-400" />, title: "Smart Assistants", description: "Digital helpers that make decisions and take actions, so you have less manual oversight and more trust in your systems." },
      { icon: <Layers className="h-8 w-8 text-cyan-400" />, title: "Private Intelligence", description: "Models built and run in your own servers, ensuring no data leaves your control. Safe and private." },
      { icon: <Cpu className="h-8 w-8 text-cyan-400" />, title: "Made-for-You Builds", description: "We start from scratch for your workflows. No boxed 'solutions' that force you to adapt." },
    ];

    return (
      <section className="py-32 bg-slate-900 text-white overflow-hidden">
        {/* --- CHANGE IS ON THIS LINE --- */}
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div
              className="md:pr-8"
            >
              <h2
                className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
              >
                What We Build,
                <span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                >
                  Plain and Simple
                </span>
              </h2>

              <div className="space-y-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-6 group cursor-pointer"
                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      className="flex-shrink-0 w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div
              className="h-[500px] w-full"
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src="/block.png"
                  alt="What we build"
                  fill
                  className="object-cover" // makes image fill container
                  quality={85}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Process Section
  const TimelineProcessSection = () => {
    // ---- START: FIX ----
    const timelineRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: timelineRef,
      offset: ["start center", "end 85%"]
    });

    const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
    // ---- END: FIX ----

    const steps = [
      { icon: <Search className="h-8 w-8 text-cyan-400" />, title: "1. Explore & Map", description: "We dig into how you work now, find gaps, and sketch a small version to test." },
      { icon: <Rocket className="h-8 w-8 text-cyan-400" />, title: "2. Pilot Launch", description: "Test in real life, gather feedback, and fix early issues before building big." },
      { icon: <Code className="h-8 w-8 text-cyan-400" />, title: "3. Full Build & Link", description: "We build out, connect all necessary tools, harden quality, and launch." },
      { icon: <CheckCircle className="h-8 w-8 text-cyan-400" />, title: "4. Watch, Refine, Expand", description: "We monitor usage, tweak logic, and add new features as required." },
    ];


    return (
      <section className="py-32 bg-slate-800 text-white"> {/* Ref removed from section */}
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              How We Work
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Together
              </span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
              This way, you avoid costly "all or nothing" build mistakes.
            </p>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative max-w-4xl mx-auto"> {/* Ref added to timeline container */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-0 w-1 bg-slate-700 h-full">
              <motion.div
                className="w-full bg-gradient-to-b from-cyan-400 to-blue-500"
                style={{ height: lineHeight }}
              />
            </div>
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex flex-col md:grid md:grid-cols-2 md:gap-12 items-center"
                >
                  <motion.div
                    className="md:hidden mb-8 w-16 h-16 bg-slate-900 border-4 border-cyan-400 rounded-full flex items-center justify-center relative z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="text-cyan-400 font-bold text-xl">{index + 1}</span>
                  </motion.div>
                  <div className={`w-full ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <MagicCard className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
                      <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <motion.div
                          className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {step.icon}
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{step.description}</p>
                      </div>
                    </MagicCard>
                  </div>
                  <div className={`hidden md:flex justify-center items-center relative ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <motion.div
                      className="w-16 h-16 bg-slate-900 border-4 border-cyan-400 rounded-full flex items-center justify-center relative z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <span className="text-cyan-400 font-bold text-xl">{index + 1}</span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integrated Image Section */}
          <div className="mt-24 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative h-96 md:h-[550px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10"
            >
              <Image
                src="/picture.png"
                alt="Diverse team collaborating around a holographic data interface"
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  // Final CTA
  const FinalCTA = () => {
    const [dots, setDots] = useState<any[]>([]);

    useEffect(() => {
      const newDots = [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 4,
      }));
      setDots(newDots);
    }, []);

    return (
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          {dots.map((dot, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
              style={{
                left: dot.left,
                top: dot.top,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: dot.duration,
                repeat: Infinity,
                delay: dot.delay,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div>
            <h2
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Your Next Move
            </h2>

            <p
              className="text-slate-400 max-w-3xl mx-auto mb-12 text-lg leading-relaxed"
            >
              Let's map your business's top 3 improvement zones—no commitment, just a clear plan.
            </p>

            <div
              className="flex justify-center"
            >
              <PrimaryButton href="/blueprint" className="text-lg px-12 py-6">
                Get Your Free Blueprint
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    );
  };


  // Floating Testimonials
  const FloatingTestimonials = () => {
    const testimonials = [
      { name: "Office Systems Reworked", quote: "A client cut internal approval time from 48 hours to 1 hour by automating paperwork flows." },
      { name: "Support Helper", quote: "Their helper screens messages, replies to common ones, and asks a human only when needed." },
      { name: "Private Insight Engine", quote: "A medical group ran predictive models inside their own servers—no data exposure." },
      { name: "Cross-Tool Choreography", quote: "Booking, payments, emails, and delivery all connected in one seamless flow, triggered by events." }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
      <section className="py-32 bg-slate-800 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Stories from
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                Businesses Like Yours
              </span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto mb-16 text-lg">
              Each story starts from their pain and shows the result—not just "we built this AI."
            </p>
          </div>

          <div className="relative h-80 md:h-64 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <MagicCard className="h-full bg-slate-900/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-slate-700 flex flex-col justify-center">
                  <p
                    className="text-lg md:text-xl italic text-slate-300 mb-6 leading-relaxed"
                  >
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <p
                    className="font-bold text-cyan-400 text-lg"
                  >
                    - {testimonials[currentIndex].name}
                  </p>
                </MagicCard>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center space-x-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-cyan-400 w-8' : 'bg-slate-500 hover:bg-slate-400'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="bg-slate-900 min-h-screen">
      <RevolutionaryHero />
      <ImmersiveProblemSection />
      <DynamicServicesSection />
      <TimelineProcessSection />
      <FloatingTestimonials />
      <FinalCTA />
    </div>
  );
};

export default EnhancedHomepageClient;
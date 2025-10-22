// src/app/practice/page.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ArrowRight, CheckCircle, Download, Microscope, Wallet, UserCheck, Target, Puzzle, Users, BrainCircuit } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import MagicCard from '@/components/MagicCard';
import Image from 'next/image';
import '@/components/MagicCard.css';
import Link from 'next/link';

// --- Hero Section (Practice Page) ---
// We now pass the page's pathname as a key to force re-animation on navigation
const PracticeHeroSection = ({ pageKey }: { pageKey: string }) => (
    <section key={pageKey} className="relative pt-48 pb-32 flex items-center justify-center text-white bg-slate-700 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900 to-slate-800"></div>
        <div className="relative z-10 text-center container mx-auto px-6">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200"
            >
                Stop Managing Your Practice. <br/> Start Being a Practitioner Again.
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300 mb-8"
            >
                We build custom operating systems that run your business for you, freeing your team from repetitive tasks to focus on what truly matters: patient care and growth.
            </motion.p>
        </div>
    </section>
);


const FamiliarProblemsSection = () => {
    const problems = [
        { icon: <Target className="h-8 w-8 text-cyan-400" />, title: "The Founder's Prison", description: "Your practice needs you for everything. Every problem lands on your desk. The business you built for freedom is now your cage." },
        { icon: <Puzzle className="h-8 w-8 text-cyan-400" />, title: "The \"Boring Question\" Bottleneck", description: "You spend the first 10 minutes of every new patient visit asking the same questions, robbing you of time to solve their real problem." },
        { icon: <Wallet className="h-8 w-8 text-cyan-400" />, title: "Lost Revenue", description: "Patient no-shows leave empty spots on your calendar. Each empty spot is lost money, and manual follow-ups take too much time." },
        { icon: <Users className="h-8 w-8 text-cyan-400" />, title: "Wasted Talent", description: "Your best nurse wastes hours on the phone confirming appointments and chasing insurance. You pay a nurse's salary for admin work." },
    ];

    return (
        <section id="problems" className="py-20 bg-slate-800 text-white">
            <div className="container mx-auto px-6">
                {/* Section Title */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}   // 👈 always animate on page load
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Does This Feel Familiar?</h2>
                </motion.div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Problems List */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6"
                    >
                        {problems.map((problem, index) => (
                            <motion.div
                              key={problem.title}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                            >
                              <MagicCard className="h-full bg-slate-700/50 p-6 rounded-lg border border-slate-600 hover:border-cyan-400">
                                  <div className="flex items-start space-x-4">
                                      <div className="flex-shrink-0 mt-1">{problem.icon}</div>
                                      <div>
                                          <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                                          <p className="text-slate-400">{problem.description}</p>
                                      </div>
                                  </div>
                              </MagicCard>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                        className="relative min-h-[400px] md:min-h-[550px] w-full rounded-lg overflow-hidden shadow-2xl order-first lg:order-last"
                    >
                         <Image
                            src="https://storage.googleapis.com/msgsndr/PEiBgZCgO3UwS99FigqO/media/68c9400c8c0cbd4e67e957f1.jpeg"
                            alt="A stressed medical practitioner overwhelmed by paperwork"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


// --- Solution Section ---
const SolutionSection = () => {
    const imaginePoints = [
        "Your staff are freed from busywork to focus on high-value patient care.",
        "Your patient no-show rate is cut in half within 30 days.",
        "Your inventory is managed automatically, preventing stockouts.",
        "Every patient gets a perfect, consistent experience, all on autopilot."
    ];

    return (
        <section id="solution" className="py-20 bg-slate-700 text-white">
            <div className="container mx-auto px-6">
                 <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">We Build You More Than a System. <br/> <span className="text-cyan-400">We Build You Freedom.</span></h2>
                        <p className="text-slate-300 mb-6 text-lg">
                            You don't need another piece of software you have to force your process into. You need an operating system built around you. The Autonomous Practice is a complete, 'white glove' solution where we architect and install a single, unified engine to run your entire clinic.
                        </p>
                         <div className="bg-slate-800 p-8 rounded-xl border border-slate-600">
                            <h3 className="text-2xl font-bold mb-4 text-white">Imagine:</h3>
                            <ul className="space-y-4">
                                {imaginePoints.map((point, index) => (
                                    <motion.li 
                                      key={index} 
                                      className="flex items-start"
                                      initial={{ opacity: 0, x: -20 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    >
                                        <CheckCircle className="h-6 w-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-slate-300">{point}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                     <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        className="relative h-96 md:h-[550px] w-full rounded-lg overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="https://storage.googleapis.com/msgsndr/PEiBgZCgO3UwS99FigqO/media/68c935b2d01d865f1495673a.jpeg"
                            alt="A clean, modern, and efficient clinic reception area"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </motion.div>
                 </div>
            </div>
        </section>
    );
};

// --- Blueprint CTA Section ---
const BlueprintCtaSection = () => {
    const blueprintFeatures = [
        { icon: <Microscope className="h-8 w-8 text-cyan-400"/>, text: "A 5-minute diagnostic to instantly identify your single biggest time-wasting activity." },
        { icon: <UserCheck className="h-8 w-8 text-cyan-400"/>, text: "A simple, copy-and-paste script to automate appointment reminders and cut no-shows." },
        { icon: <BrainCircuit className="h-8 w-8 text-cyan-400"/>, text: "The 5 critical pre-visit questions that will save you 10 minutes on every new patient consultation." },
    ];

    return (
        <section id="blueprint" className="py-20 bg-slate-800">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 md:p-12 text-white border border-slate-600"
                >
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your First Step to an Autonomous Practice, Absolutely Free.</h2>
                            <p className="text-slate-300 mb-6">Before you ever consider working with us, we want to give you a fast, tangible win. Our free blueprint reveals the biggest profit leaks in most clinics and gives you an actionable fix for each one.</p>
                             <a href="/The Clinic Efficiency Blueprint.pdf" download>
                                <MagneticButton>
                                    Download My Free Blueprint <Download className="ml-2" />
                                </MagneticButton>
                             </a>
                        </div>
                         <div>
                             <h3 className="text-xl font-bold mb-4">What You'll Get:</h3>
                             <motion.ul 
                                className="space-y-4"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                variants={{
                                    visible: { transition: { staggerChildren: 0.2, delay: 0.3 } }
                                }}
                             >
                                {blueprintFeatures.map((feature, index) => (
                                     <motion.li 
                                        key={index} 
                                        className="flex items-start space-x-4"
                                        variants={{
                                            hidden: { opacity: 0, x: 20 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                    >
                                        <div className="flex-shrink-0">{feature.icon}</div>
                                        <p className="text-slate-300">{feature.text}</p>
                                    </motion.li>
                                ))}
                             </motion.ul>
                         </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- Final CTA Section ---
const FinalCtaSection = () => (
    <section id="final-cta" className="py-24 bg-slate-700 text-white">
        <div className="container mx-auto px-6 text-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Eliminate Operational Drag Forever?</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-10">
                    If you already know that disconnected systems are strangling your growth and you're ready to build a practice that can scale, then let's talk. Book a free, no-obligation Automation Blueprint Call.
                </p>
                 <Link href="/booking-page">
                    <MagneticButton>
                        Book My Free Blueprint Call <ArrowRight className="ml-2" />
                    </MagneticButton>
                </Link>
            </motion.div>
        </div>
    </section>
);

// --- Main App Component for Practice Page ---
export default function PracticePage() {
  const pathname = usePathname();
  return (
    // We removed the wrapping motion.div to prevent conflicts with the page transition
    <div>
        <PracticeHeroSection pageKey={pathname} />
        <FamiliarProblemsSection />
        <SolutionSection />
        <BlueprintCtaSection />
        <FinalCtaSection />
    </div>
  );
}
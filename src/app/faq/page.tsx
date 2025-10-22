// src/app/faq/page.tsx
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion'; // Import Variants
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

// --- Accordion Item Component ---
const AccordionItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-700 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-6 px-2 hover:bg-slate-700/50 transition-colors duration-300"
            >
                <span className="text-lg font-medium text-white">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className={`h-6 w-6 text-slate-400 transition-colors ${isOpen ? 'text-cyan-400' : ''}`} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 px-2 text-slate-300 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


// --- Hero Section (FAQ Page) ---
const FaqHeroSection = ({ pageKey }: { pageKey: string }) => (
    <section key={pageKey} className="relative pt-48 pb-32 flex items-center justify-center text-white bg-slate-700 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900 to-slate-800"></div>
        <div className="relative z-10 text-center container mx-auto px-6">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200"
            >
                Frequently Asked Questions
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300"
            >
                Your questions, answered clearly. Find the information you need about our process, services, and how we deliver value.
            </motion.p>
        </div>
    </section>
);

// --- FAQ List Section ---
const FaqListSection = () => {
    const faqs = [
        {
            question: "Is this just another piece of software I have to learn?",
            answer: <p>No. The JCAI Autonomous Engine is a 'white glove' service, not just software. We handle the entire build and integration. You don't need to learn a complex new platform; you simply use the streamlined system we create for you. We provide easy-to-understand training on how your new, simplified workflows operate.</p>
        },
        {
            question: "How is this different from hiring a virtual assistant?",
            answer: <p>A virtual assistant performs tasks. Our Autonomous Engine IS the task. It's a permanent, scalable solution that operates 24/7 without errors, sick days, or limitations. While a VA can handle 50 tasks a day, our systems can handle 50,000, ensuring perfect consistency and scalability that a human assistant cannot match.</p>
        },
        {
            question: "My business process is unique. Can you really build a system for it?",
            answer: <p>Absolutely. In fact, unique processes are where we excel. We don't use generic, off-the-shelf software because we know it forces you into a box. We build from the ground up, tailoring every step of the automation to your specific workflows, data, and objectives. 'Bespoke' is at the core of what we do.</p>
        },
        {
            question: "What is the investment?",
            answer: <p>Our solutions are custom-built, so the investment varies based on the complexity of your project. We focus on delivering a significant return on investment by eliminating inefficiency and unlocking growth. We begin every engagement with a free, no-obligation Operations Audit to provide a clear blueprint and a detailed proposal before any commitment is made.</p>
        }
    ];

    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delay: 0.2,
        },
      },
    };

    const itemVariants: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { ease: 'easeOut' } },
    };

    return (
        <section className="py-20 bg-slate-800 text-white">
            <motion.div 
                className="container mx-auto px-6 max-w-3xl"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {faqs.map((faq, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <AccordionItem question={faq.question} answer={faq.answer} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};


// --- Main App Component for FAQ Page ---
export default function FaqPage() {
  const pathname = usePathname();

  return (
    <div>
      <FaqHeroSection pageKey={pathname} />
      <FaqListSection />
    </div>
  );
}
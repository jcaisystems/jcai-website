// src/app/case-studies/page.tsx
"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Bot, Layers, BarChart } from 'lucide-react';
import MagicCard from '@/components/MagicCard';
import Image from 'next/image';
import '@/components/MagicCard.css';

// --- Hero Section (Case Studies Page) ---
const CaseStudiesHeroSection = ({ pageKey }: { pageKey: string }) => (
    <section key={pageKey} className="relative pt-48 pb-32 flex items-center justify-center text-white bg-slate-700 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900 to-slate-800"></div>
        <div className="relative z-10 text-center container mx-auto px-6">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-200"
            >
                Real Results, Real Transformations
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300"
            >
                Explore how we've helped businesses like yours automate processes, eliminate bottlenecks, and achieve scalable growth.
            </motion.p>
        </div>
    </section>
);

// --- Case Studies Grid ---
const CaseStudiesGrid = () => {
    const caseStudies = [
        {
            client: "Global Logistics Inc.",
            title: "Automated Onboarding Cuts Manual Data Entry by 30%",
            description: "We partnered with the operations director to build a custom solution that automated their entire client onboarding process. The new system eliminated errors and integrated seamlessly with their existing CRM.",
            tags: ["Onboarding", "Data Entry", "Integration"],
            icon: <Layers className="h-8 w-8 text-cyan-400"/>,
            quote: "A strategic investment that paid for itself in months.",
            imageUrl: "https://storage.googleapis.com/msgsndr/PEiBgZCgO3UwS99FigqO/media/68c935c4c8b5b435184275ca.jpeg"
        },
        {
            client: "Anna's Consulting Firm",
            title: "AI-Powered Lead Management Reclaims 15+ Hours a Week",
            description: "For this freelance consultant, we developed an AI system to manage and qualify incoming leads. This freed up the sales team to focus on high-value conversations, boosting lead conversion by 30% in two months.",
            tags: ["Lead Conversion", "AI Agent", "Sales Automation"],
            icon: <Bot className="h-8 w-8 text-cyan-400"/>,
            quote: "Working with JCAI wasn't just an improvement, it was a transformation.",
            imageUrl: "https://storage.googleapis.com/msgsndr/PEiBgZCgO3UwS99FigqO/media/68c935c4c8b5b435184275cf.jpeg"
        },
        {
            client: "Prestige Real Estate",
            title: "Autonomous Reporting System Reduces Broker's Daily Stress",
            description: "The owner wore too many hats. We built an AI assistant that automatically generates daily reports, manages calendars, and sends client follow-ups, allowing the owner to focus on growing the business.",
            tags: ["Reporting", "AI Assistant", "Productivity"],
            icon: <BarChart className="h-8 w-8 text-cyan-400"/>,
            quote: "The best employee I've ever hired.",
            imageUrl: "https://storage.googleapis.com/msgsndr/PEiBgZCgO3UwS99FigqO/media/68c935c4c8b5b435184275c9.jpeg"
        }
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delay: 0.2
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="py-20 bg-slate-800 text-white">
            <div className="container mx-auto px-6">
                <motion.div 
                    className="grid lg:grid-cols-3 gap-8"
                    initial="hidden"
                    animate="visible" // Animate on page load
                    variants={containerVariants}
                >
                    {caseStudies.map((study) => (
                        <motion.div
                            key={study.client}
                            variants={itemVariants}
                        >
                            <MagicCard
                                className="h-full bg-slate-700 rounded-lg border border-slate-600 flex flex-col hover:border-cyan-400/50 overflow-hidden"
                            >
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={study.imageUrl}
                                        alt={`Case study image for ${study.client}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="mb-4">{study.icon}</div>
                                    <p className="font-semibold text-cyan-400 mb-2">{study.client}</p>
                                    <h3 className="text-2xl font-bold text-white mb-4 flex-grow">{study.title}</h3>
                                    <p className="text-slate-400 mb-6">{study.description}</p>
                                    <blockquote className="border-l-4 border-slate-600 pl-4 text-slate-300 italic mb-6">
                                        "{study.quote}"
                                    </blockquote>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {study.tags.map(tag => (
                                            <span key={tag} className="bg-slate-800 text-xs font-medium text-slate-300 px-3 py-1 rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </MagicCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};


// --- Main App Component for Case Studies Page ---
export default function CaseStudiesPage() {
  const pathname = usePathname();
  return (
    <div>
        <CaseStudiesHeroSection pageKey={pathname} />
        <CaseStudiesGrid />
    </div>
  );
}
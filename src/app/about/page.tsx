// src/app/about/page.tsx
"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Target, Lightbulb, Handshake, ShieldCheck } from 'lucide-react';
import TiltedCard from '@/components/TiltedCard';
import MagicCard from '@/components/MagicCard';
import Image from 'next/image';
import '@/components/MagicCard.css';
import Link from 'next/link';
import MagneticButton from '@/components/MagneticButton';
import { Download } from 'lucide-react';
import RetroGrid from '@/components/ui/retro-grid';

// --- Hero Section (About Page) ---
const AboutHeroSection = ({ pageKey }: { pageKey: string }) => (
    <section key={pageKey} className="relative pt-48 pb-32 flex items-center justify-center text-white bg-slate-900 overflow-hidden">
        {/* --- BACKGROUND CHANGE START --- */}
        <RetroGrid />
        {/* --- BACKGROUND CHANGE END --- */}
        <div className="relative z-10 text-center container mx-auto px-6">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-white"
            >
                Building Your Streamlined Future
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300"
            >
                We are a specialized firm dedicated to empowering businesses by designing and implementing bespoke AI and automation solutions.
            </motion.p>
        </div>
    </section>
);

// --- Redesigned Mission Section with Download Button ---
const MissionSection = () => (
    <section className="py-20 bg-slate-800 text-white overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Our Mission</h2>
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                        To eliminate the tedious and repetitive tasks that hinder business growth and employee satisfaction. We strive to streamline operations through intelligent automation, allowing our clients to redirect their focus and resources towards what truly matters for their strategic success.
                    </p>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8">
                        We are dedicated to architecting intelligent systems that absorb operational burdens, enabling our clients to achieve peak efficiency and unlock new opportunities for growth and market leadership.
                    </p>
                    {/* --- BUTTON ADDED HERE --- */}
                    <a href="/JCAI Company Profile.pdf" download>
                        <MagneticButton>
                            Download Company Profile <Download className="ml-2" />
                        </MagneticButton>
                    </a>
                    {/* --- END OF ADDITION --- */}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative h-96 md:h-[550px] w-full rounded-lg overflow-hidden shadow-2xl"
                >
                     <Image
                        src="https://storage.googleapis.com/msgsndr/PEiBgZCgO3UwS99FigqO/media/68ef851c63346307bc4f72c2.jpeg"
                        alt="Diverse team collaborating around a holographic data interface"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 hover:scale-105"
                    />
                </motion.div>
            </div>
        </div>
    </section>
);


// --- Core Values Section ---
const CoreValuesSection = () => {
    const values = [
        { icon: <Lightbulb className="h-8 w-8 text-cyan-400" />, title: "Innovation", description: "Constantly exploring and applying cutting-edge AI and automation technologies." },
        { icon: <Handshake className="h-8 w-8 text-cyan-400" />, title: "Partnership", description: "Working collaboratively and transparently with our clients to achieve shared goals." },
        { icon: <Target className="h-8 w-8 text-cyan-400" />, title: "Result-Driven", description: "Focusing on delivering measurable outcomes and tangible value that impacts your bottom line." },
        { icon: <ShieldCheck className="h-8 w-8 text-cyan-400" />, title: "Client Success", description: "Aligning our efforts directly with your growth and strategic objectives." },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-20 bg-slate-700 text-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">The Values That Guide Us</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">Our principles are the foundation of every project and partnership.</p>
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {values.map((value) => (
                         <motion.div
                            key={value.title}
                            variants={itemVariants}
                        >
                            <MagicCard className="h-full bg-slate-800/50 p-6 rounded-lg border border-slate-600 text-center">
                                <div className="inline-block bg-slate-700 p-4 rounded-full mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                <p className="text-slate-400">{value.description}</p>
                            </MagicCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// --- Team Section with Tilted Cards ---
const TeamSection = () => {
    const team = [
        { name: "Jonathan Talaska", role: "Chief Executive Officer & Founder", image: "https://storage.googleapis.com/msgsndr/PEiBgZCgO3UwS99FigqO/media/68ef97a64fd19d1c50a08860.jpeg" },
        { name: "Christian Scheidt", role: "AI Automation Specialist & Director of Dev Experts", image: "https://storage.googleapis.com/msgsndr/PEiBgZCgO3UwS99FigqO/media/68ef97a64fd19d5ebba0885f.jpeg" },
        { name: "Thommy Braga", role: "Chief Operating Officer", image: "https://storage.googleapis.com/msgsndr/PEiBgZCgO3UwS99FigqO/media/68ef9a0a629b056f17047164.jpeg" },
    ];

    // --- NEW TEAM MEMBER ADDED HERE ---
    const marco = {
        name: "Marco Scheidt",
        role: "Social Media Manager",
        image: "https://storage.googleapis.com/msgsndr/PEiBgZCgO3UwS99FigqO/media/68f8e89d02a7ea3d08fb4fd7.jpeg"
    };
    // --- END OF ADDITION ---

    return (
        <section className="py-20 bg-slate-800 text-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Leadership & Expertise</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">Business acumen meets deep technical capabilities to build solutions that deliver real-world impact.</p>
                </motion.div>
                
                {/* --- MODIFICATION START: Wrapped grid and new centered row --- */}
                
                {/* First row for the main team */}
                <div className="grid md:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <TiltedCard>
                                <div className="bg-slate-700 rounded-lg p-6 text-center border border-slate-600 h-full">
                                    <div className="mb-4 mx-auto w-40 h-40 rounded-full overflow-hidden border-4 border-slate-600">
                                        <Image
                                            src={member.image}
                                            alt={`Photo of ${member.name}`}
                                            width={160}
                                            height={160}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mt-6">{member.name}</h3>
                                    <p className="text-cyan-400">{member.role}</p>
                                </div>
                            </TiltedCard>
                        </motion.div>
                    ))}
                </div>

                {/* Second, centered row for Marco */}
                <div className="flex justify-center mt-8">
                    <motion.div
                        key={marco.name}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.3 }} // Slight delay after the first row
                        className="w-full md:w-1/3" // Matches the width of the grid columns on medium+ screens
                    >
                        <TiltedCard>
                            <div className="bg-slate-700 rounded-lg p-6 text-center border border-slate-600 h-full">
                                <div className="mb-4 mx-auto w-40 h-40 rounded-full overflow-hidden border-4 border-slate-600">
                                    <Image
                                        src={marco.image}
                                        alt={`Photo of ${marco.name}`}
                                        width={160}
                                        height={160}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mt-6">{marco.name}</h3>
                                <p className="text-cyan-400">{marco.role}</p>
                            </div>
                        </TiltedCard>
                    </motion.div>
                </div>
                {/* --- MODIFICATION END --- */}

            </div>
        </section>
    );
};


// --- Main App Component for About Page ---
export default function AboutPage() {
    const pathname = usePathname();
    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* CORRECTED: Passed the pathname to the pageKey prop */}
            <AboutHeroSection pageKey={pathname} /> 
            <MissionSection />
            <CoreValuesSection />
            <TeamSection />
        </motion.div>
    );
}
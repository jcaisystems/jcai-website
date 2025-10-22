// src/app/contact/page.tsx
"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ArrowRight, Mail, Phone, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import MagicCard from '@/components/MagicCard';

// --- Hero Section (Contact Page) ---
const ContactHeroSection = ({ pageKey }: { pageKey: string }) => (
    <section key={pageKey} className="relative pt-48 pb-32 flex items-center justify-center text-white bg-slate-700 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900 to-slate-800"></div>
        <div className="relative z-10 text-center container mx-auto px-6">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200"
            >
                Let's Build Your Solution
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300"
            >
                Have a project in mind or just want to learn more? We'd love to hear from you.
            </motion.p>
        </div>
    </section>
);


// --- Contact Form & Details Section ---
const ContactFormSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('https://services.leadconnectorhq.com/hooks/PEiBgZCgO3UwS99FigqO/webhook-trigger/3e0ab0f7-520b-494b-a03c-47847adbb745', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' }); // Clear form on success
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    const contactDetails = [
        { icon: <Mail className="h-6 w-6 text-cyan-400"/>, title: "Email Us", detail: "info@jcai-consulting.com", href: "mailto:info@jcai-consulting.com" },
        { icon: <Phone className="h-6 w-6 text-cyan-400"/>, title: "Call Us", detail: "+1 833-854-7892", href: "tel:+18338547892" },
        { icon: <MapPin className="h-6 w-6 text-cyan-400"/>, title: "Visit Us", detail: "Namibia, Windhoek", href: "#" },
    ];
    
    return (
        <section className="py-20 bg-slate-800 text-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-slate-700 p-8 rounded-lg border border-slate-600"
                    >
                        <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                                <input type="text" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-3 text-white focus:ring-cyan-500 focus:border-cyan-500 transition" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                                <input type="email" id="email" value={formData.email} onChange={handleChange} required className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-3 text-white focus:ring-cyan-500 focus:border-cyan-500 transition" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                                <textarea id="message" rows={5} value={formData.message} onChange={handleChange} required className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-3 text-white focus:ring-cyan-500 focus:border-cyan-500 transition"></textarea>
                            </div>
                            <div>
                                <MagneticButton type="submit" disabled={status === 'submitting'}>
                                    {status === 'submitting' && 'Sending...'}
                                    {status === 'idle' && <>Send Message <ArrowRight className="ml-2"/></>}
                                    {status === 'success' && <>Message Sent! <CheckCircle className="ml-2"/></>}
                                    {status === 'error' && <>Try Again <AlertTriangle className="ml-2"/></>}
                                </MagneticButton>
                            </div>
                            {status === 'success' && <p className="text-green-400 mt-4">Thank you for your message. We'll be in touch shortly!</p>}
                            {status === 'error' && <p className="text-red-400 mt-4">Something went wrong. Please try again or email us directly.</p>}
                        </form>
                    </motion.div>
                    
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1, delay: 0.2 } }
                        }}
                        className="space-y-8"
                    >
                        <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}>
                            <h2 className="text-3xl font-bold">Contact Information</h2>
                            <p className="text-slate-400 mt-2">
                                Our team is available to answer your questions and help you get started on your automation journey.
                            </p>
                        </motion.div>
                        
                        {contactDetails.map((item, index) => (
                            <motion.div key={index} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
                                <MagicCard className="bg-slate-700/50 p-6 rounded-lg border border-slate-600 hover:border-cyan-400">
                                    <a href={item.href} className="flex items-start space-x-4">
                                        <div className="bg-slate-800 p-3 rounded-full mt-1">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">{item.title}</h3>
                                            <p className="text-slate-400">{item.detail}</p>
                                        </div>
                                    </a>
                                </MagicCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


// --- Main App Component for Contact Page ---
export default function ContactPage() {
  const pathname = usePathname();
  return (
    <div>
        <ContactHeroSection pageKey={pathname} />
        <ContactFormSection />
    </div>
  );
}
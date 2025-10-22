// src/app/booking-page/page.tsx
"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Mail, Phone, Globe, CheckCircle } from 'lucide-react';

// --- Hero Section for Booking Page ---
const BookingHeroSection = ({ pageKey }: { pageKey: string }) => (
    <section key={pageKey} className="relative pt-48 pb-20 flex items-center justify-center text-white bg-slate-700 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900 to-slate-800"></div>
        <div className="relative z-10 text-center container mx-auto px-6">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200"
            >
                Book Your Free Consultation
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300"
            >
                Schedule your complimentary Operations Audit & Automation Blueprint call below. Let's discover how we can streamline your business.
            </motion.p>
        </div>
    </section>
);

// --- GoHighLevel Calendar Embed Component ---
const GoHighLevelCalendar = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://link.msgsndr.com/js/form_embed.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
            if (script.parentNode) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="relative w-full min-h-[800px]">
             <iframe 
                src="https://api.leadconnectorhq.com/widget/booking/czGxpZ8jwLKXRfAEpZkb" 
                style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', top: 0, left: 0 }} 
                scrolling="no" 
                id="czGxpZ8jwLKXRfAEpZkb_1758013887000"
                title="Booking Calendar"
            ></iframe>
        </div>
    );
};


// --- Main Page Component ---
export default function BookingPage() {
    const pathname = usePathname();
    const callBenefits = [
        "A complete audit of your current operational bottlenecks.",
        "A custom-tailored automation blueprint for your business.",
        "Clear, actionable steps to reclaim time and boost efficiency.",
        "A no-obligation proposal outlining your potential ROI."
    ];

    return (
        <div>
            <BookingHeroSection pageKey={pathname} />
            <section className="py-20 bg-slate-800 text-white">
                 <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-4">Select a Date and Time for your Operations Audit.</h2>
                                <p className="text-slate-400 text-lg">
                                    This complimentary 30-minute call is the first step towards building your autonomous enterprise. We'll dive deep into your current processes and map out a clear path to automation.
                                </p>
                            </div>

                             <div>
                                <h3 className="text-xl font-bold text-white mb-4">What to Expect on the Call:</h3>
                                <motion.ul 
                                    className="space-y-3"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: { transition: { staggerChildren: 0.1, delay: 0.4 } }
                                    }}
                                >
                                    {callBenefits.map((benefit, index) => (
                                        <motion.li 
                                            key={index} 
                                            className="flex items-start"
                                            variants={{
                                                hidden: { opacity: 0, x: -20 },
                                                visible: { opacity: 1, x: 0 }
                                            }}
                                        >
                                            <CheckCircle className="h-6 w-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                                            <span className="text-slate-300">{benefit}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </div>
                            
                            <div className="border-t border-slate-700 pt-8 space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Phone className="h-5 w-5 text-cyan-400"/>
                                    <span className="text-slate-300">+1 833-854-7892</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="h-5 w-5 text-cyan-400"/>
                                    <a href="mailto:info@jcai-consulting.com" className="text-slate-300 hover:text-cyan-400">info@jcai-consulting.com</a>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Globe className="h-5 w-5 text-cyan-400"/>
                                     <a href="https://www.jcai-consulting.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-cyan-400">www.jcai-consulting.com</a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Calendar */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="bg-white rounded-lg shadow-2xl overflow-hidden"
                        >
                            <GoHighLevelCalendar />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
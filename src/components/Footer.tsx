// src/components/Footer.tsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
// UPDATED: Imported social media icons from lucide-react
import { ArrowRight, CheckCircle, Loader, Youtube, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // ADDED: Array of social media links for easy management
    const socialLinks = [
        { name: 'YouTube', href: 'https://www.youtube.com/@JCAI-Consulting', icon: Youtube },
        { name: 'Instagram', href: 'https://instagram.com/jcai_systems', icon: Instagram },
        { name: 'X', href: 'https://x.com/JcaiConsulting', icon: Twitter },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('https://services.leadconnectorhq.com/hooks/PEiBgZCgO3UwS99FigqO/webhook-trigger/a42d2ecc-4468-482b-934f-e5f848411dcc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail(''); // Clear input on success
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Newsletter submission error:', error);
            setStatus('error');
        }
    };

    return (
        <footer className="bg-slate-900 text-slate-400">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Column 1: Brand and Contact */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">JCAI<span className="text-cyan-400">.</span></h3>
                        <p className="mb-4">Building your streamlined future with custom AI & Automation.</p>
                        <h4 className="font-bold text-white mb-2">Contact Us</h4>
                        <p>info@jcai-consulting.com</p>
                        <p>+1 833 854 7892 · +264 81 409 0285</p>

                        {/* ADDED: Social Media Icons */}
                        <div className="mt-6 flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow us on ${social.name}`}
                                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                                >
                                    <social.icon className="h-6 w-6" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Links */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-white mb-4">Quick Links</h4>
                            <ul>
                                <li className="mb-2"><Link href="/about" className="hover:text-cyan-400">About</Link></li>
                                <li className="mb-2"><Link href="/#services" className="hover:text-cyan-400">Services</Link></li>
                                <li className="mb-2"><Link href="/case-studies" className="hover:text-cyan-400">Case Studies</Link></li>
                                <li className="mb-2"><Link href="/faq" className="hover:text-cyan-400">FAQ</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Legal</h4>
                            <ul>
                                <li className="mb-2"><Link href="/privacy-policy" className="hover:text-cyan-400">Privacy Policy</Link></li>
                                <li className="mb-2"><Link href="/terms-and-conditions" className="hover:text-cyan-400">Terms & Conditions</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 3: Newsletter Subscription */}
                    <div>
                        <h4 className="font-bold text-white mb-4">Subscribe to our newsletter</h4>
                        <p className="mb-4">Get the latest insights on AI and automation directly to your inbox.</p>
                        <form onSubmit={handleSubmit} className="flex items-center">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                aria-label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-slate-800 border border-slate-700 rounded-l-md px-4 py-3 text-white focus:ring-cyan-500 focus:border-cyan-500 transition flex-grow"
                            />
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="bg-cyan-500 text-white p-3 rounded-r-md hover:bg-cyan-600 transition-colors duration-300 disabled:bg-slate-500"
                                aria-label="Subscribe"
                            >
                                {status === 'submitting' ? <Loader className="h-6 w-6 animate-spin" /> : <ArrowRight className="h-6 w-6" />}
                            </button>
                        </form>
                        {status === 'success' && <p className="text-green-400 mt-2 flex items-center"><CheckCircle className="h-4 w-4 mr-2"/> Subscribed successfully!</p>}
                        {status === 'error' && <p className="text-red-400 mt-2">Submission failed. Please try again.</p>}
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm">
                    <p>© {new Date().getFullYear()} JCAI Consulting. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

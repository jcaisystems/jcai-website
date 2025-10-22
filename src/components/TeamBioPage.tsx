// src/components/TeamBioPage.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Home, ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';

interface TeamBioPageProps {
  name: string;
  title: string;
  imageUrl: string;
  bio: React.ReactNode;
  phone: string | string[];
  email: string;
}

const TeamBioPage: React.FC<TeamBioPageProps> = ({
  name,
  title,
  imageUrl,
  bio,
  phone,
  email,
}) => {
  const phoneNumbers = Array.isArray(phone) ? phone : [phone];

  return (
    <section className="bg-slate-800 text-white min-h-screen flex items-center justify-center py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10"
          >
            <img
              src={imageUrl}
              alt={`Portrait of ${name}`}
              style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
              className="transition-transform duration-500 hover:scale-105"
            />
          </motion.div>

          {/* Details Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col items-start"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2">{name}</h1>
            <p className="text-xl md:text-2xl font-semibold text-cyan-400 mb-6">{title}</p>
            
            <div className="text-slate-300 text-lg space-y-4 mb-8">
                {bio}
            </div>

            <div className="space-y-4 mb-10 w-full">
              {phoneNumbers.map((p, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Phone className="h-5 w-5 text-cyan-400 flex-shrink-0"/>
                  <span className="text-slate-200 text-lg">{p}</span>
                </div>
              ))}
              <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-cyan-400 flex-shrink-0"/>
                  <a href={`mailto:${email}`} className="text-slate-200 text-lg hover:text-cyan-400 transition-colors">{email}</a>
              </div>
        
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamBioPage;


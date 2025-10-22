"use client";
import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

interface ImageSectionProps {
  imageSrc: string;
  altText: string;
  children: React.ReactNode;
  imageOnLeft?: boolean;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  imageSrc,
  altText,
  children,
  imageOnLeft = false,
}) => {
  const imageVariants: Variants = {
    hidden: { opacity: 0, x: imageOnLeft ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: imageOnLeft ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.1, ease: 'easeOut' } },
  };

  return (
    <div className="container mx-auto px-6">
      <div className={`grid md:grid-cols-2 gap-16 items-center ${imageOnLeft ? 'md:grid-flow-col-dense' : ''}`}>
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={imageOnLeft ? 'md:col-start-2' : ''}
        >
          {children}
        </motion.div>
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={`relative h-96 w-full rounded-lg overflow-hidden shadow-2xl ${imageOnLeft ? 'md:col-start-1' : ''}`}
        >
          <Image
            src={imageSrc}
            alt={altText}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 hover:scale-105"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ImageSection;

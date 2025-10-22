// src/app/christian/page.tsx
"use client";
import React from 'react';
import TeamBioPage from '@/components/TeamBioPage';

const ChristianPage = () => {
  return (
    <TeamBioPage
      name="Christian Scheidt"
      title="Chief Technical Officer"
      imageUrl="https://storage.googleapis.com/msgsndr/PEiBgZCgO3UwS99FigqO/media/68ef97a64fd19d5ebba0885f.jpeg"
      phone="+49 176 4148 1052"
      email="info@jcai-consulting.com"
      bio={
        <>
          <p>
            Christian leads the technical team at JCAI, overseeing the architecture and development of our bespoke AI and automation solutions. His expertise in AI, neural networks, and system integration is the driving force behind our innovative products.
          </p>
          <p>
            He is dedicated to building robust, scalable systems that solve complex challenges and deliver tangible results for our clients.
          </p>
        </>
      }
    />
  );
};

export default ChristianPage;


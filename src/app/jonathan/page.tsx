// src/app/jonathan/page.tsx
"use client";
import React from 'react';
import TeamBioPage from '@/components/TeamBioPage';

const JonathanPage = () => {
  return (
    <TeamBioPage
      name="Jonathan Talaska"
      title="Chief Executive Officer & Founder"
      imageUrl="https://storage.googleapis.com/msgsndr/PEiBgZCgO3UwS99FigqO/media/68ef97a64fd19d1c50a08860.jpeg"
      phone="+264 81 409 0285"
      email="info@jcai-consulting.com"
      bio={
        <>
          <p>
            As the founder and CEO, Jonathan provides the vision and strategic direction for JCAI Consulting. With a strong background in business and finance, he excels at bridging the gap between high-level business objectives and powerful technical solutions.
          </p>
          <p>
            He is passionate about helping businesses unlock their true potential by eliminating operational friction and implementing intelligent automation.
          </p>
        </>
      }
    />
  );
};

export default JonathanPage;


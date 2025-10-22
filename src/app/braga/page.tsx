// src/app/braga/page.tsx
"use client";
import React from 'react';
import TeamBioPage from '@/components/TeamBioPage';

const BragaPage = () => {
  return (
    <TeamBioPage
      name="Thommy Braga"
      title="Lead Business Development"
      imageUrl="https://storage.googleapis.com/msgsndr/PEiBgZCgO3UwS99FigqO/media/68ef9a0a629b056f17047164.jpeg"
      phone={["+264 81 205 0504", "+27 63 500 0228"]}
      email="info@jcai-consulting.com"
      bio={
        <>
          <p>
            Thommy is at the forefront of JCAI's growth, leading our business development and client partnership initiatives. He is an expert at identifying operational inefficiencies and showcasing how JCAI's solutions can drive success.
          </p>
          <p>
            His focus is on building strong, collaborative relationships and ensuring every client's needs are met with a perfectly tailored solution.
          </p>
        </>
      }
    />
  );
};

export default BragaPage;


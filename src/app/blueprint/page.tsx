// jcaisystems/jcai-website/src/app/blueprint/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { ValueStack } from "@/components/ValueStack";
import { LeadMagnet } from "@/components/LeadMagnet";
// REMOVE the old SignupForm import
// import { SignupForm } from "@/components/SignupForm";
import { AiSignupFlow } from "@/components/AiSignupFlow"; // IMPORT the new component
import { RoiCalculator } from "@/components/RoiCalculator";
import { ProofAndReason } from "@/components/ProofAndReason";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cities = [
  "New York",
  "London",
  "Berlin",
  "Sydney",
  "Toronto",
  "Chicago",
  "Paris",
];

const BlueprintPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(20);
  const [notification, setNotification] = useState({
    show: false,
    location: "",
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // --- UPDATED useEffect for scroll lock ---
  useEffect(() => {
    if (showForm) {
      // Add the class to both html and body
      document.documentElement.classList.add('no-scroll');
      document.body.classList.add('no-scroll');
    } else {
      // Remove the class from both html and body
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    }

    // Cleanup function: Ensure classes are removed if component unmounts or state changes
    return () => {
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    };
  }, [showForm]); // Re-run this effect whenever showForm changes

  useEffect(() => {
    if (isClient) {
      const spotsKey = "availableSpots";
      const firstVisitKey = "hasVisitedBefore";
      const sessionKey = "isSessionActive";
      const initialSpotsValue = 20;
      const minSpots = 5;

      const showNotification = () => {
        const location = cities[Math.floor(Math.random() * cities.length)];
        setNotification({ show: true, location });
        setTimeout(() => {
          setNotification({ show: false, location: "" });
        }, 4000);
      };

      const decrementSpots = () => {
        let currentSpots = parseInt(
          localStorage.getItem(spotsKey) || initialSpotsValue.toString()
        );
        if (currentSpots > minSpots) {
          currentSpots--;
          localStorage.setItem(spotsKey, String(currentSpots));
          setSpotsLeft(currentSpots);
          showNotification();
        }
      };

      const spotsInStorage = localStorage.getItem(spotsKey);
      const hasVisitedBefore = localStorage.getItem(firstVisitKey);

      if (!hasVisitedBefore) {
        localStorage.setItem(spotsKey, String(initialSpotsValue));
        localStorage.setItem(firstVisitKey, "true");
        setSpotsLeft(initialSpotsValue);
        sessionStorage.setItem(sessionKey, "true");
        setTimeout(decrementSpots, 5000);
      } else {
        setSpotsLeft(parseInt(spotsInStorage || String(initialSpotsValue)));
        const isSessionActive = sessionStorage.getItem(sessionKey);

        if (!isSessionActive) {
          sessionStorage.setItem(sessionKey, "true");
          decrementSpots();
        }
      }
    }
  }, [isClient]);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero onGetStarted={() => setShowForm(true)} spotsLeft={isClient ? spotsLeft : 20} />
      <ValueStack onGetStarted={() => setShowForm(true)} />
      <RoiCalculator />
      <ProofAndReason />
      <LeadMagnet onGetStarted={() => setShowForm(true)} spotsLeft={isClient ? spotsLeft : 20} />

      {/* RENDER the new AI component instead of the old form */}
      {isClient && showForm && <AiSignupFlow onClose={() => setShowForm(false)} />}

      {isClient && (
        <div
          className={`fixed bottom-5 right-5 bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-sm rounded-lg px-4 py-3 z-50 shadow-lg transition-opacity duration-500 ${
            notification.show ? "opacity-100" : "opacity-0"
          }`}
        >
          Someone from <span className="font-bold">{notification.location}</span>{" "}
          just claimed a spot!
        </div>
      )}
      {/* Footer is already handled by the layout, removed from here */}
    </main>
  );
};

export default BlueprintPage;
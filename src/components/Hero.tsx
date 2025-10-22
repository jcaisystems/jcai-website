// src/components/Hero.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LiveUrgency } from "./LiveUrgency";

interface HeroProps {
  onGetStarted: () => void;
  spotsLeft: number;
}

export const Hero = ({ onGetStarted, spotsLeft }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      
      {/* STEP 2: I've commented out the background image to create a cleaner look like the original design. */}
      {/* <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://raw.githubusercontent.com/jcaisystem/automation-pioneers-16872/main/src/assets/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }}
      /> 
      */}

      <div className="absolute inset-0 bg-gradient-hero z-0" />
      
      {/* Grid overlay - STEP 2: Increased the grid line opacity from 0.05 to 0.1 for more vibrancy. */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: 'linear-gradient(rgba(0,191,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Unlock 10+ Hours
            <br />
            <span className="gradient-text">Weekly.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-2xl md:text-3xl text-foreground mb-4 max-w-3xl mx-auto leading-tight font-bold">
            The AI Automation Freedom Blueprint
          </p>

          {/* STEP 1: Wrapped this line in a span with the "gradient-text" class */}
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-semibold">
            <span className="gradient-text">Yours 100% Free (Yes, Free)</span>
          </p>
          
          {/* Urgency Counter */}
          <div className="mb-10 flex justify-center">
             <LiveUrgency spotsLeft={spotsLeft} />
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={onGetStarted}
              className="group text-xl px-16 h-16 rounded-none bg-[#9bcf3d] hover:bg-[#8cc030] text-slate-900 [animation:wave-glow_3s_ease-in-out_infinite]"
            >
              Claim Your Free Blueprint Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-xs text-muted-foreground">
              No contracts • No credit cards • No commitments
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
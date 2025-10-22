import { Button } from "@/components/ui/button";
import { Zap, Clock, ArrowRight, Target } from "lucide-react";
import { LiveUrgency } from "./LiveUrgency";
import MagicCard from '@/components/MagicCard';

interface LeadMagnetProps {
  onGetStarted: () => void;
  spotsLeft: number;
}

export const LeadMagnet = ({ onGetStarted, spotsLeft }: LeadMagnetProps) => {
  const quickWins = [
    { icon: Zap, title: "10+ Hours Saved", description: "Every single week" },
    { icon: Target, title: "Custom Built", description: "For your business" },
    { icon: Clock, title: "48 Hour Delivery", description: "Or it's free" }
  ];

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: 'linear-gradient(rgba(0,191,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Lead Magnet Card */}
        <div
          className="relative max-w-5xl mx-auto border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/30 overflow-hidden rounded-xl md:rounded-2xl"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.6)" }}
        >
          {/* Diagonal overlay for styling */}
          <div className="absolute inset-0 z-0 opacity-20" style={{
            background: 'linear-gradient(135deg, rgba(0,191,255,0.15) 0%, transparent 25%, transparent 75%, rgba(0,191,255,0.15) 100%)',
            backgroundSize: '150% 150%'
          }}></div>

          <div className="relative z-10 py-8 md:p-16">
            <div className="px-8 md:px-0">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  Ready to Get Your
                  <span className="gradient-text"> 10+ Hours Back?</span>
                </h2>

                <p className="text-2xl text-foreground font-semibold mb-4">
                  Claim Your Automation Freedom Blueprint
                </p>
                <p className="text-xl text-muted-foreground mb-8">
                  Custom-built for your business. Delivered in 48 hours or less.
                </p>

                <div className="flex justify-center my-8">
                  <LiveUrgency spotsLeft={spotsLeft} />
                </div>
              </div>
            </div>

            <div className="px-0 md:px-16">
              <Button 
                variant="hero" 
                size="xl"
                onClick={onGetStarted}
                className="group w-full px-16 h-16 rounded-none [animation:wave-glow_3s_ease-in-out_infinite] bg-[#9bcf3d] hover:bg-[#8cc030] text-slate-900"
              >
                Yes! Claim My Free Blueprint Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="px-8 md:px-0">
              <p className="text-sm text-muted-foreground mb-8 text-center">
                No credit card • No sales calls • No commitments
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {quickWins.map((win, index) => (
                  <MagicCard 
                    key={index}
                    className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-6 text-center animate-fade-in hover:border-cyan-400 transition-colors"
                    glowColor="6, 182, 212"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <win.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-2">{win.title}</h3>
                    <p className="text-sm text-muted-foreground">{win.description}</p>
                  </MagicCard>
                ))}
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-6 text-center">
                <p className="text-lg text-foreground mb-2">
                  <span className="font-bold text-cyan-400">Why We Limit This:</span> Each blueprint is custom-engineered by our team.
                </p>
                <p className="text-muted-foreground">
                  We cap it at 20 per month to ensure quality. Once they're gone, you'll wait until next month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
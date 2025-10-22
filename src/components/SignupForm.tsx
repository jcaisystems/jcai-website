// jcaisystems/jcai-website/src/components/SignupForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowRight, Sparkles, X, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SignupFormProps {
  onClose: () => void;
}

export const SignupForm = ({ onClose }: SignupFormProps) => {
  // Use a more descriptive state for form status
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    biggestChallenge: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/PEiBgZCgO3UwS99FigqO/webhook-trigger/d406855f-a67f-4197-9a31-c4fd2c545d44', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        // Wait for 2.5 seconds before closing the form
        setTimeout(() => {
          onClose();
        }, 2500);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderContent = () => {
    switch (formStatus) {
      case 'submitting':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-96">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
            <p className="mt-4 text-lg text-muted-foreground">Submitting...</p>
          </motion.div>
        );
      case 'success':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-96 text-center">
            <CheckCircle className="w-16 h-16 text-green-400" />
            <h3 className="mt-4 text-2xl font-bold text-white">Thank You!</h3>
            <p className="mt-2 text-lg text-muted-foreground">We've received your inquiry. Your blueprint will be delivered within 48 hours.</p>
          </motion.div>
        );
      case 'error':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-96 text-center">
            <AlertTriangle className="w-16 h-16 text-red-400" />
            <h3 className="mt-4 text-2xl font-bold text-white">Submission Failed</h3>
            <p className="mt-2 text-lg text-muted-foreground">Something went wrong. Please try again.</p>
            <Button onClick={() => setFormStatus('idle')} className="mt-6" variant="outline">Try Again</Button>
          </motion.div>
        );
      case 'idle':
      default:
        return (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-slate-800 border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">Step 1 of 1</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Claim Your Free
                <span className="gradient-text"> Automation Freedom Blueprint</span>
              </h2>
              <p className="text-muted-foreground">
                Tell us about your business and we'll create a custom automation roadmap—delivered in 48 hours. No strings attached.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields... */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2"><Label htmlFor="fullName">Full Name *</Label><Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="John Smith" className="bg-slate-800 border-slate-700 focus:border-cyan-500"/></div>
                <div className="space-y-2"><Label htmlFor="email">Email Address *</Label><Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@company.com" className="bg-slate-800 border-slate-700 focus:border-cyan-500"/></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2"><Label htmlFor="company">Company Name *</Label><Input id="company" name="company" value={formData.company} onChange={handleChange} required placeholder="Your Company" className="bg-slate-800 border-slate-700 focus:border-cyan-500"/></div>
                <div className="space-y-2"><Label htmlFor="phone">Phone Number</Label><Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="bg-slate-800 border-slate-700 focus:border-cyan-500"/></div>
              </div>
              <div className="space-y-2"><Label htmlFor="biggestChallenge">What's your biggest operational challenge? *</Label><Textarea id="biggestChallenge" name="biggestChallenge" value={formData.biggestChallenge} onChange={handleChange} required placeholder="e.g., Too many manual tasks, lost leads, can't scale without hiring more people..." rows={4} className="bg-slate-800 border-slate-700 focus:border-cyan-500 resize-none"/></div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4"><p className="text-sm text-muted-foreground">By submitting this form, you'll receive your custom automation blueprint within 48 hours. No sales calls required—just pure value.</p></div>
              <Button
  type="submit"
  variant="hero"
  size="xl"
  className="w-full group hover:bg-[#6a8f28] text-black transition-colors"
>
  Get My Free Blueprint
  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
</Button>

            </form>
          </>
        );
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleOutsideClick}
    >
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-cyan-500/30 shadow-2xl shadow-cyan-500/20 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10"
        >
          <X className="w-5 h-5" />
        </Button>
        <AnimatePresence mode="wait">
          <div className="p-8 md:p-12">
            {renderContent()}
          </div>
        </AnimatePresence>
      </Card>
    </div>
  );
};
// src/components/AiSignupFlow.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, X, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";

// --- Type Definitions ---
interface AiStep {
  question: string;
  questionType: 'multiple-choice' | 'text' | 'final-form';
  options?: string[];
  placeholder?: string;
  progress: number;
  error?: boolean;
}

// HistoryItem now only needs role and content, as it's stored locally
interface HistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

interface AiSignupFlowProps {
  onClose: () => void;
}

// --- Component Implementation ---

export const AiSignupFlow = ({ onClose }: AiSignupFlowProps) => {
  // --- State Variables ---
  const [currentStep, setCurrentStep] = useState<AiStep | null>(null);
  // *** REINTRODUCE HISTORY STATE ***
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [userInput, setUserInput] = useState('');
  const [finalName, setFinalName] = useState('');
  const [finalEmail, setFinalEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState(() => typeof window !== 'undefined' ? crypto.randomUUID() : '');
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for potential future chat-like scroll
  const [isExiting, setIsExiting] = useState(false);

  // --- Constants ---
  const N8N_WEBHOOK_URL = 'https://jcai-blueprint-worker.jcaisystems.workers.dev/';
  // We might not need the LeadConnector URL here anymore if n8n handles the final submission
  // const LEADCONNECTOR_FINAL_URL = '...';


  // --- API Call Function ---
  const fetchNextStep = async (payload: Record<string, any>) => {
    setIsLoading(true);
    setError(null);
    setIsExiting(true); // Start exit animation

    

    // Add sessionId and source to every request
    const fullPayload = {
      ...payload,
      sessionId: sessionId,
      source: 'blueprint'
    };

    try {
       await new Promise(resolve => setTimeout(resolve, 300)); // Wait for exit anim

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("n8n response error:", response.status, errorText);
        throw new Error(`Network response was not ok (${response.status})`);
      }

      const data: AiStep = await response.json();
      

      if (data.error) {
           throw new Error(data.question || "An unknown error occurred in the backend.");
      }
      if (!data.question || !data.questionType || data.progress === undefined) {
          throw new Error("Invalid data structure received from AI.");
      }

      // *** Add AI response to local history ***
      // Only add if it's not the final "Thank You" message triggered by finalStep=true response
      if (data.progress < 100) {
           setHistory(prev => [...prev, { role: 'assistant', content: data.question }]);
      }

      setCurrentStep(data); // Update UI to show the new question/step

    } catch (err: any) {
      console.error("Failed to fetch next step:", err);
      setError(`Sorry, something went wrong (${err.message}). Please try again.`);
      // Restore previous history if fetch fails? Or clear? Depends on desired UX
      // setHistory(prevHistory => prevHistory.slice(0, -1)); // Example: remove last user message
    } finally {
      setIsLoading(false);
      setIsExiting(false); // End exit animation state
    }
  };

  // --- Initial Load Effect ---
  useEffect(() => {
    if (sessionId) {
        // Send initial payload. n8n should respond with the first question.
        fetchNextStep({ isInitial: true });
    }
  }, [sessionId]);


  // --- Submission Handler ---
  const handleAnswerSubmit = async (answer?: string) => {
    const finalAnswer = answer ?? userInput;
    if (!finalAnswer || !currentStep || isLoading || isExiting) return;

    // *** Add user message to local history ***
    const newUserEntry: HistoryItem = { role: 'user', content: finalAnswer };
    const updatedHistory = [...history, newUserEntry];
    setHistory(updatedHistory); // Update local history immediately

    setUserInput(''); // Reset text input

    const payload: Record<string, any> = {};

    // --- Final Form Submission Trigger ---
    if (currentStep.questionType === 'final-form') {
       // *** SEND FULL HISTORY AT THE END ***
       payload.finalStep = true;
       payload.conversation = updatedHistory; // Send the complete history
       payload.finalName = finalName;
       payload.finalEmail = finalEmail;
       fetchNextStep(payload); // Let n8n handle final submission logic
       // n8n should respond with the "Thank You" step data
    } else {
      // --- Fetch Next AI Step ---
      // For intermediate steps, send only the last user message
      payload.message = finalAnswer; // Send just the latest answer
      // payload.previousQuestion = currentStep.question; // Optionally send the question text
      fetchNextStep(payload);
    }
     // Clear final form fields after submission attempt (success or fail)
     setFinalName('');
     setFinalEmail('');
  };


  // --- Input Rendering Logic (Remains largely the same) ---
  const renderInputArea = () => {
    if (currentStep?.progress === 100 && !error) {
        return <p className="text-center text-lg text-green-400 mt-4">Check your email within 48 hours!</p>;
    }
     if (isLoading && !currentStep) return null;
     if (isExiting || (isLoading && currentStep)) {
        return (
             <div className="h-40 flex items-center justify-center">
                 <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
             </div>
        );
     }
    if (!currentStep) return null;

    switch (currentStep.questionType) {
      case 'text':
        return (
          <form onSubmit={(e) => { e.preventDefault(); handleAnswerSubmit(); }} className="space-y-4 mt-4">
            <Textarea
              key={currentStep.question}
              placeholder={currentStep.placeholder || "Your answer..."}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="bg-slate-800 border-slate-700 focus:border-cyan-500 resize-none text-base"
              rows={3}
              disabled={isLoading || isExiting}
              autoFocus
            />
            <Button type="submit" disabled={isLoading || isExiting || !userInput.trim()} className="w-full group !bg-[#9bcf3d] hover:!bg-[#8cc030] text-slate-900 font-semibold">
              Next <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        );
      case 'multiple-choice':
        return (
          <div className="space-y-3 mt-4">
            {currentStep.options?.map((option) => (
              <Button
                key={option}
                variant="outline"
                onClick={() => handleAnswerSubmit(option)}
                disabled={isLoading || isExiting}
                 className={cn(
                  "w-full justify-start text-left h-auto py-3 px-4 text-base",
                  "border-slate-600 hover:bg-slate-700 hover:border-cyan-500 hover:text-cyan-300 transition-all duration-200"
                )}
              >
                {option}
              </Button>
            ))}
          </div>
        );
      case 'final-form':
        if (currentStep.progress === 100) {
             return <p className="text-center text-lg text-green-400 mt-4">Check your email within 48 hours!</p>;
        }
        return (
          // Pass "Final Form Submitted" or similar as the 'answer' for history purposes
          <form onSubmit={(e) => { e.preventDefault(); handleAnswerSubmit("Contact Details Provided"); }} className="space-y-4 mt-4">
             <div>
                <Label htmlFor="finalName" className="text-slate-400 mb-1 block text-sm">Full Name *</Label>
                <Input
                    id="finalName"
                    key={currentStep.question + "-name"}
                    placeholder="Your Full Name"
                    value={finalName}
                    onChange={(e) => setFinalName(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 focus:border-cyan-500 text-base"
                    disabled={isLoading || isExiting}
                    autoFocus
                 />
             </div>
             <div>
                 <Label htmlFor="finalEmail" className="text-slate-400 mb-1 block text-sm">Email Address *</Label>
                 <Input
                    id="finalEmail"
                    key={currentStep.question + "-email"}
                    type="email"
                    placeholder="Your Email Address"
                    value={finalEmail}
                    onChange={(e) => setFinalEmail(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 focus:border-cyan-500 text-base"
                    disabled={isLoading || isExiting}
                 />
            </div>
            <Button type="submit" disabled={isLoading || isExiting || !finalName.trim() || !finalEmail.trim()} className="w-full group !bg-[#9bcf3d] hover:!bg-[#8cc030] text-slate-900 font-semibold">
              Get My Free Blueprint <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        );
      default:
        return null;
    }
  };

  // --- Main Render (Structure remains the same, no chat history display) ---
  return (
    <div
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-slate-900 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 rounded-lg relative overflow-hidden">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-slate-400 hover:text-white"
          aria-label="Close form"
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Header Area with Progress */}
         <div className="p-6 border-b border-slate-700/50 flex-shrink-0">
             <div className="flex justify-center mb-3">
                 <div className="p-2 bg-slate-700 border border-cyan-500/30 rounded-full inline-block">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                 </div>
             </div>
             <h2 className="text-xl font-semibold text-center text-white mb-4">Claim Your Free Blueprint</h2>
             <div className="w-full bg-slate-700 rounded-full h-2.5">
                 <motion.div
                   className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full"
                   initial={{ width: '0%' }}
                   animate={{ width: `${currentStep?.progress ?? 0}%`}}
                   transition={{ duration: 0.5, ease: "easeOut" }}
                 />
             </div>
             <p className="text-right text-xs text-slate-400 mt-1">{currentStep?.progress ?? 0}% Complete</p>
         </div>

        {/* Main Content Area (Question + Input) */}
        <div className="flex-grow overflow-y-auto p-6 md:p-10 relative min-h-[250px]"> {/* Added min-height */}
            {/* Initial Loading State */}
            {isLoading && !currentStep && !error && (
               <div className="absolute inset-0 flex flex-col items-center justify-center h-full">
                  <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
               </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
                 <motion.div
                    key="error-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                 >
                   <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
                   <p className="text-lg text-red-400 mb-6">{error}</p>
                   <Button onClick={() => window.location.reload()} variant="outline">Refresh Page</Button> {/* Simple refresh on error */}
                 </motion.div>
            )}

            {/* Question and Input Area with Animation */}
            {!error && (
                 <AnimatePresence mode="wait">
                    {currentStep && !isExiting && (
                         <motion.div
                            key={currentStep.question} // Animate when the question changes
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="w-full"
                         >
                            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white text-center leading-snug">
                                {currentStep.question}
                            </h3>
                            {renderInputArea()}
                         </motion.div>
                    )}
                 </AnimatePresence>
            )}
             {/* Render Loader during transitions */}
             {(isExiting || (isLoading && currentStep && currentStep.progress < 100)) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                      <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                  </div>
              )}
        </div>
      </Card>
    </div>
  );
};

export default AiSignupFlow;

// jcaisystems/jcai-website/src/components/LiveUrgency.tsx
import React from 'react';

interface LiveUrgencyProps {
  spotsLeft: number;
}

export const LiveUrgency: React.FC<LiveUrgencyProps> = ({ spotsLeft }) => {
  return (
   <div className="max-w-xs mx-auto bg-[#112240]/80 border border-cyan-500/30 rounded-xl p-3 backdrop-blur-md shadow-2xl shadow-cyan-500/10">
  <div className="text-center">
    <div className="flex justify-center items-center space-x-2 text-rose-400 font-bold">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
      </span>
      <span>LIVE:</span>
      <span className="text-white text-xl ml-1" id="spots-left-display">{spotsLeft}</span>
    </div>
    <p className="text-xs text-slate-400 mt-1">FREE BLUEPRINTS REMAINING</p>
  </div>
</div>
  );
};
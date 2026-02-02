import React from 'react';

export const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse translate-x-[2px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-orange-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse -translate-x-[2px]">
        {text}
      </span>
    </div>
  );
};
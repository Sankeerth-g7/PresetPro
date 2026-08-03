'use client';

import { useState, useRef } from 'react';

interface BeforeAfterProps {
  before: string;
  after: string;
  fileName?: string;
}

export default function BeforeAfter({ before, after, fileName }: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  const handleDownload = async () => {
    if (!fileName) return;
    const link = document.createElement('a');
    link.href = `${process.env.NEXT_PUBLIC_API_URL}/uploads/${fileName}`;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Preview</h2>
        {fileName && (
          <button
            onClick={handleDownload}
            className="px-6 py-2 bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-teal-500/50 transition-all"
          >
            ⬇️ Download
          </button>
        )}
      </div>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-video bg-slate-800 rounded-2xl overflow-hidden cursor-col-resize group border-2 border-slate-600"
      >
        <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
        <div style={{ width: `${sliderPosition}%` }} className="absolute inset-0 overflow-hidden">
          <img
            src={after}
            alt="After"
            className="absolute inset-0 w-screen h-full object-cover"
            style={{ right: `-${100 - sliderPosition}%` }}
          />
        </div>

        <div style={{ left: `${sliderPosition}%` }} className="absolute top-0 bottom-0 w-1 bg-gradient-to-r from-teal-400 to-orange-500 transition-transform group-hover:w-2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
            <div className="flex gap-1">
              <div className="w-0.5 h-4 bg-slate-900"></div>
              <div className="w-0.5 h-4 bg-slate-900"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 text-white font-bold text-sm bg-black/40 px-3 py-1 rounded-full">Before</div>
        <div className="absolute top-4 right-4 text-white font-bold text-sm bg-black/40 px-3 py-1 rounded-full">After</div>
      </div>
    </div>
  );
}
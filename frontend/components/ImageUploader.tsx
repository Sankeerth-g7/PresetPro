'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  onUpload: (imagePath: string) => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files[0]) {
      handleFile(files[0]);
    }
  };

  return (
    <div className="mb-12">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-teal-400 bg-teal-400/10'
            : 'border-slate-600 hover:border-orange-500 bg-slate-800'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="text-5xl">📸</div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Upload your photo</h3>
            <p className="text-slate-400">Drag & drop or click to browse</p>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        className="hidden"
      />
    </div>
  );
}
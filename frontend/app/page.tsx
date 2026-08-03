'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import PresetGrid from '@/components/PresetGrid';
import ImageUploader from '@/components/ImageUploader';
import BeforeAfter from '@/components/BeforeAfter';


interface Preset {
  id: number;
  name: string;
  category: string;
  thumbnail_url: string;
}

export default function Home() {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>('All');
  const [editedFileName, setEditedFileName] = useState<string>('');

  useEffect(() => {
    fetchPresets();
  }, []);

  const fetchPresets = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/presets');
      const data = await response.json();
      setPresets(data);
    } catch (error) {
      console.error('Failed to fetch presets:', error);
    }
  };

  const handleImageUpload = (imagePath: string) => {
    setUploadedImage(imagePath);
    setEditedImage(null);
  };

  const handleApplyPreset = async (presetId: number) => {
  if (!uploadedImage) return;

  setLoading(true);
  try {
    const formData = new FormData();
    formData.append('presetId', presetId.toString());
    
    // Fetch the uploaded image and add to form
    const imageResponse = await fetch(uploadedImage);
    const blob = await imageResponse.blob();
    formData.append('image', blob, 'image.jpg');

    const response = await fetch('http://localhost:5000/api/edit/apply-preset', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    setEditedFileName(data.fileName);
    setEditedImage(`http://localhost:5000${data.downloadUrl}`);  // ADD THIS LINE
  } catch (error) {
    console.error('Failed to apply preset:', error);
  } finally {
    setLoading(false);
  }
};

  const categories = ['All', ...new Set(presets.map(p => p.category))];
  const filteredPresets = category === 'All' 
    ? presets 
    : presets.filter(p => p.category === category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="px-6 py-16 text-center border-b border-slate-700">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-teal-400 bg-clip-text text-transparent mb-2">
          PresetPro
        </h1>
        <p className="text-slate-300 text-lg">Transform your photos with professional color presets</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Upload Section */}
        {!uploadedImage ? (
          <ImageUploader onUpload={handleImageUpload} />
        ) : (
          <>
            {/* Before/After Slider */}
            
            {editedImage && (
  <div className="mb-12">
    <BeforeAfter before={uploadedImage} after={editedImage} fileName={editedFileName} />
  </div>
)}

            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex gap-3 overflow-x-auto pb-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                      category === cat
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/50'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Presets Grid */}
            <PresetGrid 
              presets={filteredPresets}
              selectedPreset={selectedPreset}
              onSelect={setSelectedPreset}
              onApply={handleApplyPreset}
              loading={loading}
            />

            {/* Reset Button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => {
                  setUploadedImage(null);
                  setEditedImage(null);
                  setSelectedPreset(null);
                }}
                className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
              >
                Upload Another Image
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
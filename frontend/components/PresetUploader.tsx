'use client';

import { useState } from 'react';

interface PresetUploaderProps {
  onUpload: () => void;
}

export default function PresetUploader({ onUpload }: PresetUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !name || !category) {
      alert('Fill all fields');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('preset', file);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('format', 'cube');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/presets/upload`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Preset uploaded!');
        setFile(null);
        setName('');
        setCategory('');
        onUpload();
      }
    } catch (error) {
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 p-6 bg-slate-800 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-4">Upload Preset</h3>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="ml-2 px-3 py-2 bg-slate-700 text-white rounded"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="ml-2 px-3 py-2 bg-slate-700 text-white rounded"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="ml-2 px-4 py-2 bg-orange-500 text-white rounded"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}
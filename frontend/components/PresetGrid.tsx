'use client';

import Image from 'next/image';

interface Preset {
  id: number;
  name: string;
  category: string;
  thumbnail_url: string;
}

interface PresetGridProps {
  presets: Preset[];
  selectedPreset: Preset | null;
  onSelect: (preset: Preset) => void;
  onApply: (presetId: number) => void;
  loading: boolean;
}

export default function PresetGrid({
  presets,
  selectedPreset,
  onSelect,
  onApply,
  loading
}: PresetGridProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Available Presets</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {presets.map(preset => {
          const isThumbnailUrl = preset.thumbnail_url.startsWith('/uploads/');
          const imgSrc = isThumbnailUrl 
          ? `${process.env.NEXT_PUBLIC_API_URL}${preset.thumbnail_url}`
          : preset.thumbnail_url;

          return (
            <div
              key={preset.id}
              className="group cursor-pointer"
              onClick={() => onSelect(preset)}
            >
              <div
                className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                  selectedPreset?.id === preset.id
                    ? 'border-orange-500 shadow-lg shadow-orange-500/50'
                    : 'border-slate-600 hover:border-orange-500'
                }`}
              >
                {/* Thumbnail or placeholder */}
                {isThumbnailUrl ? (
                  <img
                    src={imgSrc}
                    alt={preset.name}
                    className="w-full aspect-square object-cover"
                    onError={() => console.log('Failed to load:', imgSrc)}
                  />
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🎨</div>
                      <p className="text-xs text-slate-400 px-2">{preset.name}</p>
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {selectedPreset?.id === preset.id ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onApply(preset.id);
                      }}
                      disabled={loading}
                      className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 transition-all"
                    >
                      {loading ? 'Applying...' : 'Apply'}
                    </button>
                  ) : (
                    <span className="text-white text-sm font-medium">Select preset</span>
                  )}
                </div>
              </div>

              <p className="text-sm text-slate-300 mt-3 font-medium">{preset.name}</p>
              <p className="text-xs text-slate-500">{preset.category}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
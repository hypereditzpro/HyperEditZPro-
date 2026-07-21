import React, { useState } from 'react';

export interface FilterPreset {
  id: string;
  name: string;
  badge?: string;
  filterStyle: string;
  previewColor: string;
}

interface FiltersProps {
  onSelectFilter?: (filter: FilterPreset) => void;
}

const CINEMATIC_FILTERS: FilterPreset[] = [
  {
    id: 'none',
    name: '🚫 None',
    filterStyle: 'none',
    previewColor: '#222230'
  },
  {
    id: 'backlight_fix',
    name: 'Backlight Fix',
    badge: 'Pro',
    filterStyle: 'brightness(1.18) contrast(1.08) saturate(1.2) sepia(0.12)',
    previewColor: 'linear-gradient(135deg, #fceabb, #f8b500)'
  },
  {
    id: 'green_orange',
    name: 'Green Orange',
    filterStyle: 'hue-rotate(-18deg) contrast(1.22) saturate(1.35) brightness(1.02)',
    previewColor: 'linear-gradient(135deg, #0b8793, #360033)'
  },
  {
    id: '4k_cinematic',
    name: '4K Ultra',
    badge: '4K',
    filterStyle: 'contrast(1.35) saturate(1.3) brightness(1.05) drop-shadow(0px 0px 2px rgba(0,242,255,0.4))',
    previewColor: 'linear-gradient(135deg, #11998e, #38ef7d)'
  },
  {
    id: 'maldives',
    name: 'Maldives',
    filterStyle: 'hue-rotate(20deg) saturate(1.5) contrast(1.12) brightness(1.1)',
    previewColor: 'linear-gradient(135deg, #00c6ff, #0072ff)'
  },
  {
    id: 'neon_blush',
    name: 'Neon Blush',
    badge: 'VIP',
    filterStyle: 'hue-rotate(280deg) saturate(1.65) contrast(1.25) brightness(1.12)',
    previewColor: 'linear-gradient(135deg, #f80759, #bc4e9c)'
  }
];

export const FiltersManager: React.FC<FiltersProps> = ({ onSelectFilter }) => {
  const [selectedFilterId, setSelectedFilterId] = useState<string>('none');
  const [intensity, setIntensity] = useState<number>(100);

  const handleSelect = (filter: FilterPreset) => {
    setSelectedFilterId(filter.id);
    if (onSelectFilter) {
      onSelectFilter(filter);
    }
  };

  const handleReset = () => {
    const noneFilter = CINEMATIC_FILTERS[0];
    setSelectedFilterId('none');
    setIntensity(100);
    if (onSelectFilter) {
      onSelectFilter(noneFilter);
    }
  };

  const currentFilter = CINEMATIC_FILTERS.find((f) => f.id === selectedFilterId) || CINEMATIC_FILTERS[0];

  return (
    <div style={{ background: '#12121A', border: '1px solid #222', borderRadius: '16px', padding: '16px', color: '#FFF', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* Top Title & Reset Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <h3 style={{ fontSize: '1rem', color: '#00F2FF', margin: 0, fontWeight: 'bold' }}>Cinematic Color Grading</h3>
          <span style={{ fontSize: '0.7rem', color: '#AAA' }}>Active: <b style={{ color: '#FF007F' }}>{currentFilter.name}</b></span>
        </div>

        <button 
          onClick={handleReset}
          style={{ background: '#1A1A26', border: '1px solid #333', color: '#FFF', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', cursor: 'pointer' }}
        >
          🔄 Reset (None)
        </button>
      </div>

      {/* Filter Presets Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {CINEMATIC_FILTERS.map((filter) => {
          const isSelected = selectedFilterId === filter.id;
          return (
            <div
              key={filter.id}
              onClick={() => handleSelect(filter)}
              style={{
                position: 'relative',
                height: '80px',
                borderRadius: '12px',
                background: filter.previewColor,
                border: isSelected ? '2px solid #00F2FF' : '1px solid #333',
                boxShadow: isSelected ? '0 0 12px rgba(0, 242, 255, 0.6)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '6px',
                overflow: 'hidden',
                transition: 'transform 0.2s ease'
              }}
            >
              {/* Badge if present */}
              {filter.badge && (
                <span style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  background: filter.badge === 'Pro' ? '#FF9933' : '#FF007F',
                  color: '#000',
                  fontSize: '0.6rem',
                  fontWeight: 'bold',
                  padding: '2px 6px',
                  borderRadius: '6px'
                }}>
                  {filter.badge}
                </span>
              )}

              {/* Filter Name Tag */}
              <div style={{
                background: 'rgba(10, 10, 16, 0.75)',
                backdropFilter: 'blur(4px)',
                borderRadius: '6px',
                padding: '3px 6px',
                textAlign: 'center',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                color: isSelected ? '#00F2FF' : '#FFF'
              }}>
                {filter.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Intensity Slider (Only when filter is selected) */}
      {selectedFilterId !== 'none' && (
        <div style={{ background: '#181824', padding: '12px', borderRadius: '12px', border: '1px solid #222' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#AAA', marginBottom: '6px' }}>
            <span>Filter Intensity:</span>
            <b style={{ color: '#00F2FF' }}>{intensity}%</b>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={intensity} 
            onChange={(e) => setIntensity(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#00F2FF' }}
          />
        </div>
      )}

    </div>
  );
};

export default FiltersManager;

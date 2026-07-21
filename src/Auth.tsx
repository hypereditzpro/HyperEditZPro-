import React, { useState, useRef } from 'react';

interface Project {
  id: string;
  title: string;
  date: string;
}

interface Template {
  id: string;
  title: string;
  category: string;
  badge: string;
  downloads: string;
}

interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  category: 'phonk' | 'montage' | 'meme';
  audioUrl: string;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'templates' | 'audio'>('audio');
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [audioCategory, setAudioCategory] = useState<'all' | 'phonk' | 'montage' | 'meme'>('all');

  // Trimmer State
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showTrimmer, setShowTrimmer] = useState<boolean>(false);
  const [trimStart, setTrimStart] = useState<number>(20);
  const [trimEnd, setTrimEnd] = useState<number>(50);
  
  // Audio Player State
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [projects] = useState<Project[]>([
    { id: '1', title: 'Montage Killshot #1', date: '21 Jul 2026' },
    { id: '2', title: 'Free Fire Velocity Edit', date: '20 Jul 2026' }
  ]);

  const [templates] = useState<Template[]>([
    { id: 't1', title: '⚡ FF 1-Tap Headshot Velocity', category: 'trending', badge: '🔥 HOT', downloads: '14.2K' },
    { id: 't2', title: '🎵 Optical Beat Sync + Shake', category: 'trending', badge: '🔥 HOT', downloads: '11.8K' },
    { id: 't3', title: '🌈 Cyberpunk Neon Glow Transition', category: 'newest', badge: 'NEW', downloads: '8.5K' },
    { id: 't4', title: '🎯 Quantum Zoom Killshot Snap', category: 'trending', badge: 'TRENDING', downloads: '19.1K' }
  ]);

  // 25+ Trending Phonk, Montage & Funny Meme Audio Tracks
  const [audioTracks] = useState<AudioTrack[]>([
    { id: 'a1', title: 'Murder In My Mind (Drift Phonk)', artist: 'Kordhell', duration: '2:25', category: 'phonk', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 'a2', title: 'Close Eyes (Aggressive Slowed)', artist: 'DVRST', duration: '2:40', category: 'phonk', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 'a3', title: 'Rave - Bass Boosted Phonk', artist: 'Dxrk Schatten', duration: '2:15', category: 'phonk', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 'a4', title: 'Metamorphosis (Global Hit)', artist: 'INTERWORLD', duration: '2:30', category: 'phonk', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: 'a5', title: 'Memory Reboot (Cyber Phonk)', artist: 'VØX & Narvent', duration: '3:10', category: 'phonk', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: 'a6', title: 'Sahara (Speed Drift Phonk)', artist: 'Hensonn', duration: '2:50', category: 'phonk', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    { id: 'a7', title: 'Agnostic Phonk Anthem', artist: 'Ghostface Playa', duration: '2:05', category: 'phonk', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
    { id: 'a8', title: 'Vampire Drifting Beat', artist: 'SXMPRA', duration: '2:18', category: 'phonk', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    { id: 'a9', title: 'GigaChad Theme (Phonk Remix)', artist: 'Sонn', duration: '1:55', category: 'phonk', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
    { id: 'a10', title: 'Neon Blade Speed Run', artist: 'MoonDeity', duration: '2:45', category: 'phonk', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
    
    // Epic Gaming Montage Tracks
    { id: 'a11', title: 'Free Fire World Series Anthem', artist: 'Garena Official', duration: '3:05', category: 'montage', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 'a12', title: 'PUBG Mobile 3rd Anniversary Beat', artist: 'Tencent Audio Lab', duration: '2:55', category: 'montage', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 'a13', title: 'Valo Champions Ignition Drop', artist: 'Riot Games', duration: '3:20', category: 'montage', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 'a14', title: 'CS2 Headshot Montage Anthem', artist: 'Valve Studio', duration: '2:40', category: 'montage', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: 'a15', title: 'Apex Legends Predator Bass Drop', artist: 'Respawn Audio', duration: '2:50', category: 'montage', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: 'a16', title: 'Codm Legend Velocity Drop', artist: 'Activision', duration: '3:00', category: 'montage', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    { id: 'a17', title: 'Fortnite Victory Royale Anthem', artist: 'Epic Games', duration: '2:45', category: 'montage', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
    { id: 'a18', title: 'Cybernetic EDM Drop for Reels', artist: 'HyperEdits Studio', duration: '2:15', category: 'montage', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    { id: 'a19', title: 'Adrenaline Rush Speed Ramp', artist: 'SpeedX', duration: '2:35', category: 'montage', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
    { id: 'a20', title: 'Ultimate Cinematic Trailer Beat', artist: 'Epic Score', duration: '3:12', category: 'montage', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },

    // Funny Memes Sound/Video Clips
    { id: 'm1', title: '🤣 Sad Violin Meme (Fail Moment)', artist: 'Meme Archive', duration: '0:45', category: 'meme', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 'm2', title: '💥 Directed by Robert B. Weide', artist: 'Curb Your Enthusiasm', duration: '0:50', category: 'meme', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 'm3', title: '🎛️ Air Horn + Windows XP Error', artist: 'MLG Sound Effect', duration: '0:30', category: 'meme', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 'm4', title: '🐒 Monkey Laugh & Bruh Sound Effect', artist: 'TikTok Viral Meme', duration: '0:40', category: 'meme', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: 'm5', title: '🐱 Nyan Cat 8-Bit Trap Remix', artist: 'Internet Classic', duration: '1:20', category: 'meme', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
  ]);

  const togglePlayAudio = (track: AudioTrack) => {
    if (playingTrackId === track.id) {
      audioRef.current?.pause();
      setPlayingTrackId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = track.audioUrl;
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      }
      setPlayingTrackId(track.id);
    }
  };

  const handleSelectAudio = (track: AudioTrack) => {
    setToastMessage(`🎵 Added "${track.title}" to your Video Timeline!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setToastMessage(`📂 Local File Added: "${file.name}" successfully!`);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const filteredAudio = audioTracks.filter((track) => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) || track.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = audioCategory === 'all' || track.category === audioCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: '#0A0A10', color: '#FFF', minHeight: '100vh', padding: '20px', fontFamily: 'Segoe UI, sans-serif', paddingBottom: '60px' }}>
      
      <audio ref={audioRef} onEnded={() => setPlayingTrackId(null)} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', color: '#00F2FF', margin: 0, fontWeight: '900' }}>HYPEREDITS PRO</h1>
          <span style={{ fontSize: '0.75rem', color: '#FF9933', fontWeight: 'bold' }}>🇮🇳 MADE IN INDIA 🇮🇳</span>
        </div>
        <button style={{ background: 'linear-gradient(135deg, #7B2CBF, #FF007F)', border: 'none', color: '#FFF', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
          PRO VIP
        </button>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', background: '#12121A', padding: '4px', borderRadius: '12px', border: '1px solid #222' }}>
        <button 
          onClick={() => setActiveTab('projects')}
          style={{ flex: 1, padding: '10px 4px', borderRadius: '8px', border: 'none', background: activeTab === 'projects' ? '#00F2FF' : 'transparent', color: activeTab === 'projects' ? '#000' : '#AAA', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer' }}
        >
          Projects
        </button>
        <button 
          onClick={() => setActiveTab('templates')}
          style={{ flex: 1, padding: '10px 4px', borderRadius: '8px', border: 'none', background: activeTab === 'templates' ? '#00F2FF' : 'transparent', color: activeTab === 'templates' ? '#000' : '#AAA', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer' }}
        >
          Templates 🔥
        </button>
        <button 
          onClick={() => setActiveTab('audio')}
          style={{ flex: 1, padding: '10px 4px', borderRadius: '8px', border: 'none', background: activeTab === 'audio' ? '#00F2FF' : 'transparent', color: activeTab === 'audio' ? '#000' : '#AAA', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer' }}
        >
          Audio & Phonk 🎵
        </button>
      </div>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', background: '#34C759', color: '#000', padding: '12px 20px', borderRadius: '25px', fontWeight: 'bold', fontSize: '0.85rem', boxShadow: '0 0 20px rgba(52, 199, 89, 0.6)', zIndex: 2000, textAlign: 'center', width: '90%', maxWidth: '350px' }}>
          {toastMessage}
        </div>
      )}

      {/* PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {projects.map((proj) => (
            <div key={proj.id} style={{ background: '#12121A', border: '1px solid #222', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '0.95rem', color: '#FFF', margin: 0 }}>{proj.title}</h3>
                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px', margin: 0 }}>{proj.date}</p>
              </div>
              <button style={{ background: '#1A1A26', border: '1px solid #333', color: '#00F2FF', fontSize: '1.2rem', cursor: 'pointer', padding: '6px 12px', borderRadius: '8px' }}>⋮</button>
            </div>
          ))}
        </div>
      )}

      {/* TEMPLATES TAB */}
      {activeTab === 'templates' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            {templates.map((temp) => (
              <div key={temp.id} style={{ background: '#12121A', border: '1px solid #222', borderRadius: '14px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', background: '#1A1A26', color: '#00F2FF', padding: '2px 8px', borderRadius: '10px', border: '1px solid #00F2FF', fontWeight: 'bold' }}>{temp.badge}</span>
                  <h4 style={{ fontSize: '0.9rem', color: '#FFF', margin: '6px 0 0 0' }}>{temp.title}</h4>
                </div>
                <button onClick={() => { setSelectedTemplate(temp); setShowTrimmer(true); }} style={{ background: 'linear-gradient(135deg, #00F2FF, #34C759)', color: '#000', border: 'none', padding: '10px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '900', cursor: 'pointer' }}>Use Template</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AUDIO & PHONK MUSIC HUB TAB */}
      {activeTab === 'audio' && (
        <div>
          {/* LOCAL FILE UPLOAD BANNER */}
          <div style={{ background: 'linear-gradient(135deg, #1A1A26, #12121A)', border: '1px dashed #00F2FF', borderRadius: '16px', padding: '16px', textAlign: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.95rem', color: '#00F2FF', margin: '0 0 6px 0' }}>📂 Upload Custom Audio / Video File</h3>
            <p style={{ fontSize: '0.75rem', color: '#AAA', marginBottom: '12px' }}>Pick custom songs or videos directly from device storage</p>
            <label style={{ background: 'linear-gradient(135deg, #00F2FF, #34C759)', color: '#000', padding: '8px 20px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', display: 'inline-block' }}>
              Browse Device Storage
              <input type="file" accept="audio/*,video/*" onChange={handleLocalFileUpload} style={{ display: 'none' }} />
            </label>
          </div>

          {/* SEARCH BAR */}
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="text"
              placeholder="🔍 Search Phonk, Montage Songs & Memes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: '#12121A', border: '1px solid #00F2FF', color: '#FFF', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* CATEGORY FILTER CHIPS */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '15px' }}>
            <button onClick={() => setAudioCategory('all')} style={{ background: audioCategory === 'all' ? '#00F2FF' : '#1A1A26', color: audioCategory === 'all' ? '#000' : '#AAA', border: '1px solid #333', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap', cursor: 'pointer' }}>All Audio</button>
            <button onClick={() => setAudioCategory('phonk')} style={{ background: audioCategory === 'phonk' ? '#FF007F' : '#1A1A26', color: '#FFF', border: '1px solid #333', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap', cursor: 'pointer' }}>⚡ Phonk (2-3m)</button>
            <button onClick={() => setAudioCategory('montage')} style={{ background: audioCategory === 'montage' ? '#7B2CBF' : '#1A1A26', color: '#FFF', border: '1px solid #333', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap', cursor: 'pointer' }}>🎮 Epic Montage</button>
            <button onClick={() => setAudioCategory('meme')} style={{ background: audioCategory === 'meme' ? '#34C759' : '#1A1A26', color: audioCategory === 'meme' ? '#000' : '#AAA', border: '1px solid #333', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap', cursor: 'pointer' }}>🤣 Funny Memes</button>
          </div>

          {/* AUDIO TRACKS LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredAudio.map((track) => (
              <div key={track.id} style={{ background: '#12121A', border: '1px solid #222', borderRadius: '14px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '60%' }}>
                  <button 
                    onClick={() => togglePlayAudio(track)}
                    style={{ width: '38px', height: '38px', borderRadius: '50%', background: playingTrackId === track.id ? '#FF007F' : '#1A1A26', border: '1px solid #00F2FF', color: '#FFF', fontSize: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}
                  >
                    {playingTrackId === track.id ? '⏸' : '▶'}
                  </button>
                  <div style={{ overflow: 'hidden' }}>
                    <h4 style={{ fontSize: '0.9rem', color: '#FFF', margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</h4>
                    <span style={{ fontSize: '0.7rem', color: '#AAA' }}>{track.artist} • <b style={{ color: '#00F2FF' }}>{track.duration}</b></span>
                  </div>
                </div>

                <button 
                  onClick={() => handleSelectAudio(track)}
                  style={{ background: 'linear-gradient(135deg, #00F2FF, #34C759)', color: '#000', border: 'none', padding: '8px 14px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '900', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  + Add to Video
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TRIMMER MODAL */}
      {showTrimmer && selectedTemplate && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(10, 10, 16, 0.95)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px', boxSizing: 'border-box', zIndex: 1000 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setShowTrimmer(false)} style={{ background: '#1A1A26', border: '1px solid #333', color: '#FFF', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem' }}>✕ Cancel</button>
            <h3 style={{ color: '#00F2FF', fontSize: '0.95rem', margin: 0 }}>Crop Clip for Template</h3>
            <span style={{ fontSize: '0.75rem', color: '#34C759', fontWeight: 'bold' }}>2 Min Video</span>
          </div>

          <div style={{ background: '#12121A', border: '2px solid #00F2FF', borderRadius: '16px', height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>🎬</div>
            <p style={{ color: '#AAA', fontSize: '0.8rem', margin: 0 }}>Selected Duration: <b style={{ color: '#00F2FF' }}>{Math.round(((trimEnd - trimStart) / 100) * 120)}s</b></p>
          </div>

          <div style={{ background: '#181824', padding: '16px', borderRadius: '16px', border: '1px solid #333' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#AAA', marginBottom: '8px' }}>
              <span>Start: {trimStart}%</span>
              <span style={{ color: '#FF007F', fontWeight: 'bold' }}>Drag to Crop Any Segment</span>
              <span>End: {trimEnd}%</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="range" min="0" max={trimEnd - 5} value={trimStart} onChange={(e) => setTrimStart(Number(e.target.value))} style={{ accentColor: '#00F2FF' }} />
              <input type="range" min={trimStart + 5} max="100" value={trimEnd} onChange={(e) => setTrimEnd(Number(e.target.value))} style={{ accentColor: '#34C759' }} />
            </div>
          </div>

          <button onClick={() => { setShowTrimmer(false); setToastMessage('✂️ Clip Applied Successfully!'); setTimeout(() => setToastMessage(null), 3000); }} style={{ width: '100%', background: 'linear-gradient(135deg, #00F2FF, #34C759)', color: '#000', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '900', fontSize: '0.95rem', cursor: 'pointer' }}>
            Apply Trimmed Clip
          </button>
        </div>
      )}

    </div>
  );
};

export default Dashboard;

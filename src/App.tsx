import React, { useState, useEffect } from "react";
import "./App.css";

// Module Imports
import GamerAIFeatures from "./GamerAIFeatures";
import AIBackgroundEraser from "./AIBackgroundEraser";
import AIVoiceChanger from "./AIVoiceChanger";
import EditorFeatures from "./EditorFeatures";
import FiltersManager from "./FiltersManager";
import AudioFadeManager from "./AudioFadeManager";
import PowerPaymentEngine from "./PowerPaymentEngine";
import VIPSubscriptionModal from "./VIPSubscriptionModal";
import UserProfileHistory from "./UserProfileHistory";

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  
  // LOGIN MANDATE STATES (NO SKIP ALLOWED)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginStep, setLoginStep] = useState<'auth' | 'details'>('auth');
  const [userNameInput, setUserNameInput] = useState<string>('');
  const [userDobInput, setUserDobInput] = useState<string>('');

  const [activeTab, setActiveTab] = useState<"dashboard" | "editor" | "vip" | "profile">("dashboard");
  const [isVIP, setIsVIP] = useState<boolean>(false);
  const [showVIPModal, setShowVIPModal] = useState<boolean>(false);

  // Drawers & Modals States
  const [showSettingsDrawer, setShowSettingsDrawer] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showRecycleBinModal, setShowRecycleBinModal] = useState<boolean>(false);

  // App Settings States
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Rajasthani");
  const [cacheSize, setCacheSize] = useState<string>("128 MB");
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  const [savedTemplates, setSavedTemplates] = useState<string[]>([
    "FreeFire_Kill_Montage_Template"
  ]);

  // Projects Library (Auto-Saved with Fixed Creation Date)
  const [projects, setProjects] = useState([
    { id: 'proj_101', name: '0623-01', createdDate: '22/07/2026 14:50', size: '33MB', duration: '00:18', thumb: '🎮', timestamp: 1784712600000 },
    { id: 'proj_102', name: '0614-01', createdDate: '23/06/2026 08:03', size: '105MB', duration: '00:21', thumb: '🎬', timestamp: 1782201780000 }
  ]);

  // Recycle Bin
  const [recycledProjects, setRecycledProjects] = useState<Array<{ id: string; name: string; deletedDaysAgo: number }>>([
    { id: 'trash_1', name: 'Old_Montage_05.mp4', deletedDaysAgo: 12 }
  ]);

  // Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Login Handlers
  const handleGoogleLoginStart = () => {
    setLoginStep('details');
  };

  const handleCompleteRegistration = () => {
    if (!userNameInput.trim() || !userDobInput.trim()) {
      alert("⚠️ Please enter valid Username and Date of Birth!");
      return;
    }
    setIsLoggedIn(true);
    alert("✅ Welcome " + userNameInput + "! Account Created & Auto-Synced with Google Drive.");
  };

  // Smart Project Creation Handler (No Dupes / No Empty Saves)
  const handleCreateNewProject = () => {
    const projName = "Project_" + Math.floor(Math.random() * 9000 + 1000);
    const fixedCreatedDate = new Date().toLocaleString();
    const nowTime = Date.now();
    
    const userMadeEdits = window.confirm("🎬 Opening CapCut Pro Editor Canvas...\nDid you add edits/clips to this project? (OK = Yes, Save Project | Cancel = Discard Empty Project)");
    
    if (userMadeEdits) {
      const newProj = {
        id: "proj_" + nowTime,
        name: projName,
        createdDate: fixedCreatedDate,
        size: '42MB',
        duration: '00:15',
        thumb: '✨',
        timestamp: nowTime
      };
      setProjects([newProj, ...projects]);
      alert("✅ Project " + projName + " saved with fixed creation timestamp!");
    } else {
      alert("⚠️ Empty project discarded automatically to prevent duplicate copies.");
    }
  };

  const handleMoveToRecycleBin = (proj: any) => {
    setProjects(projects.filter(p => p.id !== proj.id));
    setRecycledProjects([...recycledProjects, { id: proj.id, name: proj.name, deletedDaysAgo: 0 }]);
    alert("🗑️ Moved " + proj.name + " to Trash!");
  };

  const handleRestoreProject = (id: string) => {
    const item = recycledProjects.find(p => p.id === id);
    if (item) {
      setRecycledProjects(recycledProjects.filter(p => p.id !== id));
      setProjects([...projects, { id: item.id, name: item.name, createdDate: 'Restored Today', size: '35MB', duration: '00:20', thumb: '🎬', timestamp: Date.now() }]);
      alert("🔄 Restored " + item.name + " back to Active Projects!");
    }
  };

  // Sorted Projects Output
  const sortedProjects = [...projects].sort((a, b) => {
    return sortOrder === 'newest' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
  });

    if (showSplash) {
    return (
      <div style={{ background: '#08080C', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '40px 20px', color: '#FFF', fontFamily: 'Segoe UI, sans-serif', position: 'relative', overflow: 'hidden' }}>
        
        {/* TOP BRANDING - MADE IN INDIA #1 APP */}
        <div style={{ textAlign: 'center', animation: 'fadeInDown 0.6s ease-out' }}>
          <span style={{ background: 'linear-gradient(135deg, #FF9933, #FFFFFF, #138808)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900', color: '#000', letterSpacing: '1px', boxShadow: '0 0 15px rgba(255, 153, 51, 0.4)', display: 'inline-block', marginBottom: '6px' }}>
            🇮🇳 MADE IN INDIA
          </span>
          <h4 style={{ margin: 0, color: '#FFCC00', fontSize: '0.8rem', fontWeight: 'bold', textShadow: '0 0 10px rgba(255,204,0,0.6)', letterSpacing: '0.5px' }}>
            #1 POWERFUL AI VIDEO EDITOR
          </h4>
        </div>

        {/* CENTER 3D BOUNCING LOGO & CIRCLE RING */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #00F2FF, #7209B7, #F72585)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3rem', border: '3px solid #FFF', boxShadow: '0 0 30px #7209B7, 0 0 50px #00F2FF', animation: 'bounce 0.8s infinite alternate' }}>
            🚀
          </div>
          <h1 style={{ color: '#00F2FF', fontSize: '1.8rem', fontWeight: '900', marginTop: '16px', textShadow: '0 0 20px #00F2FF', letterSpacing: '1px' }}>
            HYPER EDITS PRO
          </h1>
          
          {/* WELCOME TO THE APP TEXT */}
          <span style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: '600', marginTop: '4px', background: 'rgba(255,255,255,0.1)', padding: '4px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
            Welcome to the App
          </span>
        </div>

        {/* BOTTOM LOADING ENGINE STATUS */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: '#F72585', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
            ⚡ Loading CapCut Pro Studio Engine...
          </span>
          <div style={{ width: '120px', height: '4px', background: '#1A1A28', borderRadius: '2px', margin: '0 auto', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #00F2FF, #F72585)', animation: 'pulse 1s infinite' }} />
          </div>
        </div>

      </div>
    );
  }

  // MANDATORY NO-SKIP LOGIN GATEWAY
  if (!isLoggedIn) {
    return (
      <div style={{ background: '#0A0A10', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', color: '#FFF', fontFamily: 'Segoe UI, sans-serif' }}>
        <div style={{ background: '#12121C', border: '1px solid #7209B7', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '360px', boxShadow: '0 0 25px rgba(114,9,183,0.4)' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#00F2FF', margin: '0 0 6px 0', fontSize: '1.3rem' }}>🚀 HYPER EDITS PRO</h2>
            <span style={{ fontSize: '0.7rem', color: '#AAA' }}>Mandatory Sign-In Required (No Skip)</span>
          </div>

          {loginStep === 'auth' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onClick={handleGoogleLoginStart}
                style={{ background: '#4285F4', border: 'none', color: '#FFF', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                🔴 Continue with Google Account
              </button>
              <button 
                onClick={handleGoogleLoginStart}
                style={{ background: '#1877F2', border: 'none', color: '#FFF', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}
              >
                Sign in with Facebook / Socials
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#00F2FF', display: 'block', marginBottom: '4px' }}>Choose Username:</label>
                <input 
                  type="text" 
                  placeholder="e.g. Gamer_Hyper" 
                  value={userNameInput} 
                  onChange={(e) => setUserNameInput(e.target.value)}
                  style={{ width: '100%', background: '#0A0A10', border: '1px solid #333', color: '#FFF', padding: '10px', borderRadius: '6px', fontSize: '0.8rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', color: '#00F2FF', display: 'block', marginBottom: '4px' }}>Date of Birth (DOB):</label>
                <input 
                  type="date" 
                  value={userDobInput} 
                  onChange={(e) => setUserDobInput(e.target.value)}
                  style={{ width: '100%', background: '#0A0A10', border: '1px solid #333', color: '#FFF', padding: '10px', borderRadius: '6px', fontSize: '0.8rem' }}
                />
              </div>

              <button 
                onClick={handleCompleteRegistration}
                style={{ background: 'linear-gradient(135deg, #00F2FF, #7209B7)', border: 'none', color: '#FFF', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px', fontSize: '0.85rem' }}
              >
                ✓ Confirm & Access Studio
              </button>
            </div>
          )}

          <div style={{ marginTop: '16px', fontSize: '0.6rem', color: '#666', textAlign: 'center' }}>
            1 Account Limit Policy Enforced | Data Auto-Synced with Gmail Drive
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#08080E", minHeight: "100vh", color: "#FFF", fontFamily: "Segoe UI, sans-serif", position: "relative", overflowX: "hidden" }}>
      
      {/* 1. TOP HEADER */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#12121C", borderBottom: "1px solid #1F1F30" }}>
        
        <button 
          onClick={() => setActiveTab("profile")}
          style={{ background: "linear-gradient(135deg, #7209B7, #F72585)", border: "2px solid #FFF", width: "36px", height: "36px", borderRadius: "50%", color: "#FFF", fontWeight: "bold", cursor: "pointer" }}
        >
          👤
        </button>

        {/* Quick Language Switcher On Top (Rajasthani First) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#161624', padding: '4px 8px', borderRadius: '12px', border: '1px solid #00F2FF' }}>
          <span style={{ fontSize: '0.65rem', color: '#FFCC00', fontWeight: 'bold' }}>🗣️</span>
          <select 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value)}
            style={{ background: 'none', border: 'none', color: '#00F2FF', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            <option value="Rajasthani" style={{ background: '#12121C', color: '#FFCC00' }}>🐫 राजस्थानी (Rajasthani)</option>
            <option value="Hindi" style={{ background: '#12121C', color: '#FFF' }}>🇮🇳 हिंदी (Hindi)</option>
            <option value="English" style={{ background: '#12121C', color: '#FFF' }}>🇬🇧 English</option>
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={() => setShowRecycleBinModal(true)} style={{ background: "none", border: "none", color: "#FF007F", fontSize: "1.1rem", cursor: "pointer" }}>🗑️</button>
          <button onClick={() => setShowHistoryModal(true)} style={{ background: "none", border: "none", color: "#FFCC00", fontSize: "1.1rem", cursor: "pointer" }}>📜</button>
          <button onClick={() => setShowSettingsDrawer(true)} style={{ background: "none", border: "none", color: "#FFF", fontSize: "1.1rem", cursor: "pointer" }}>⚙️</button>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav style={{ display: "flex", gap: "8px", padding: "10px 16px", background: "#101018", overflowX: "auto", borderBottom: "1px solid #1F1F30" }}>
        <button onClick={() => setActiveTab("dashboard")} style={{ background: activeTab === "dashboard" ? "#7209B7" : "#161624", color: "#FFF", border: activeTab === "dashboard" ? "1px solid #F72585" : "1px solid #333", padding: "6px 14px", borderRadius: "8px", fontWeight: "bold", fontSize: "0.75rem", cursor: "pointer" }}>📱 Dashboard</button>
        <button onClick={() => setActiveTab("editor")} style={{ background: activeTab === "editor" ? "#7209B7" : "#161624", color: "#FFF", border: activeTab === "editor" ? "1px solid #F72585" : "1px solid #333", padding: "6px 14px", borderRadius: "8px", fontWeight: "bold", fontSize: "0.75rem", cursor: "pointer" }}>✂️ CapCut Editor</button>
        <button onClick={() => setActiveTab("vip")} style={{ background: activeTab === "vip" ? "#7209B7" : "#161624", color: "#FFF", border: activeTab === "vip" ? "1px solid #F72585" : "1px solid #333", padding: "6px 14px", borderRadius: "8px", fontWeight: "bold", fontSize: "0.75rem", cursor: "pointer" }}>💳 VIP Pass</button>
        <button onClick={() => setActiveTab("profile")} style={{ background: activeTab === "profile" ? "#7209B7" : "#161624", color: "#FFF", border: activeTab === "profile" ? "1px solid #F72585" : "1px solid #333", padding: "6px 14px", borderRadius: "8px", fontWeight: "bold", fontSize: "0.75rem", cursor: "pointer" }}>👤 Profile</button>
      </nav>

      {/* MAIN DASHBOARD */}
      {activeTab === "dashboard" && (
        <main style={{ padding: "16px" }}>
          
          {/* ACTION CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
            <div onClick={handleCreateNewProject} style={{ background: "linear-gradient(135deg, #1A1A2A, #281438)", border: "1px solid #7209B7", borderRadius: "14px", padding: "20px 12px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>➕</div>
              <span style={{ fontSize: "0.85rem", fontWeight: "900", color: "#FFF", display: "block" }}>+ Create New Project</span>
            </div>

            <div onClick={() => alert("Opening Photo Canvas")} style={{ background: "linear-gradient(135deg, #1A1A2A, #142838)", border: "1px solid #00F2FF", borderRadius: "14px", padding: "20px 12px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>🖼️</div>
              <span style={{ fontSize: "0.85rem", fontWeight: "900", color: "#FFF", display: "block" }}>Edit Photo</span>
            </div>
          </div>

          {/* 7 + 1 TOOLS GRID */}
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ fontSize: "0.8rem", color: "#AAA", margin: "0 0 12px 0" }}>✨ SMART CREATIVE TOOLS</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
              {[
                { name: "AutoCut", icon: "⚡", action: () => alert("AutoCut Engine Working!") },
                { name: "Retouch", icon: "💄", action: () => alert("Face Retouch Engine Active!") },
                { name: "Auto Captions", icon: "📝", action: () => alert("Auto Caption Generator Active!") },
                { name: "Desktop Editor", icon: "🖥️", action: () => alert("🌐 Desktop Engine: Web Launch Pending!") },
                { name: "Remove Bg", icon: "👤", action: () => alert("AI Bg Remover Active!") },
                { name: "Auto Enhance", icon: "✨", action: () => alert("Enhancer Active!") },
                { name: "Camera", icon: "📷", action: () => alert("Opening HD Camera!") },
                { name: "All Tools", icon: "🔴", action: () => alert("Opening 50+ Tools!"), highlight: true }
              ].map((tool, idx) => (
                <div key={idx} onClick={tool.action} style={{ background: "#141420", border: tool.highlight ? "1px solid #F72585" : "1px solid #222", borderRadius: "10px", padding: "10px 4px", textAlign: "center", cursor: "pointer" }}>
                  <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>{tool.icon}</div>
                  <span style={{ fontSize: "0.6rem", fontWeight: "bold", color: tool.highlight ? "#F72585" : "#CCC", display: "block" }}>{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECTS LIBRARY WITH EASY TAP FILTER BUTTON (LEFT CORNER) */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h4 style={{ fontSize: "0.85rem", color: "#FFF", margin: 0, fontWeight: "bold" }}>📂 Projects Library</h4>
                
                {/* Easy Tap Large Filter Button on Left Corner */}
                <button 
                  onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                  style={{ background: "#1A1A28", border: "1px solid #7209B7", color: "#00F2FF", padding: "6px 12px", borderRadius: "8px", fontSize: "0.7rem", fontWeight: "bold", cursor: "pointer" }}
                >
                  🔽 Filter: {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
                </button>
              </div>

              <span style={{ fontSize: "0.65rem", color: "#00F2FF", background: "#161624", padding: "2px 8px", borderRadius: "10px" }}>☁️ Drive Synced</span>
            </div>

            {/* Empty State vs Projects List */}
            {sortedProjects.length === 0 ? (
              <div style={{ background: '#12121C', border: '1px dashed #333', padding: '24px', borderRadius: '10px', textAlign: 'center', color: '#888', fontSize: '0.8rem' }}>
                📂 No Projects Available
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {sortedProjects.map((proj) => (
                  <div key={proj.id} style={{ background: "#12121C", border: "1px solid #1F1F30", borderRadius: "10px", padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "40px", height: "40px", background: "#1A1A28", borderRadius: "6px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.2rem" }}>
                        {proj.thumb}
                      </div>
                      <div>
                        <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "#FFF", display: "block" }}>{proj.name}</span>
                        <span style={{ fontSize: "0.6rem", color: "#AAA" }}>Created: {proj.createdDate} | {proj.size}</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "6px" }}>
                      <button onClick={() => alert("Saved Template!")} style={{ background: "#1A1A28", border: "1px solid #7209B7", color: "#00F2FF", padding: "4px 8px", borderRadius: "6px", fontSize: "0.6rem", cursor: "pointer" }}>📁 Template</button>
                      <button onClick={() => handleMoveToRecycleBin(proj)} style={{ background: "#1A1A28", border: "1px solid #FF007F", color: "#FF007F", padding: "4px 8px", borderRadius: "6px", fontSize: "0.6rem", cursor: "pointer" }}>🗑️ Trash</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        
          {/* GAMER AI & VOICE CREATIVE TOOLS */}
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <GamerAIFeatures />
            <AIBackgroundEraser />
            <AIVoiceChanger />
          </div>

        </main>
      )}

      {/* OTHER NAVIGATION TABS */}
      {activeTab === "editor" && <div style={{ padding: "10px" }}><EditorFeatures /><FiltersManager /><AudioFadeManager /></div>}
      {activeTab === "vip" && <div style={{ padding: "16px" }}><PowerPaymentEngine /></div>}
      {activeTab === "profile" && <div style={{ padding: "16px" }}><UserProfileHistory /></div>}

      <VIPSubscriptionModal isOpen={showVIPModal} onClose={() => setShowVIPModal(false)} />

    </div>
  );
};

export default App;

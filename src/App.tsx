import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2-Second Purple Splash Animation Timer (Auto Fallback)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#0f0f17',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontFamily: 'sans-serif'
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #a29bfe, #6c5ce7)',
          boxShadow: '0 0 30px #6c5ce7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse 1.5s infinite alternate'
        }}>
          <span style={{ fontSize: '28px', fontWeight: 'bold' }}>H</span>
        </div>
        <h2 style={{ marginTop: '20px', letterSpacing: '2px', color: '#a29bfe' }}>HyperEdits Pro</h2>
        <style>{`
          @keyframes pulse {
            0% { transform: scale(0.9); box-shadow: 0 0 15px #6c5ce7; }
            100% { transform: scale(1.1); box-shadow: 0 0 35px #a29bfe; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#181825', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      <header style={{ textAlign: 'center', padding: '40px 0' }}>
        <h1 style={{ color: '#a29bfe', fontSize: '2.5rem' }}>HyperEdits Pro Master</h1>
        <p style={{ color: '#b5b5c5', marginTop: '10px' }}>Your Power AI Video Editor & Master Tools</p>
      </header>
    </div>
  );
}

import React from 'react';
import './App.css';

const EditorFeatures: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#09090b', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      
      {/* 🇮🇳 Made in India Badge (Website Top) */}
      <div style={{ marginTop: '20px', marginBottom: '10px' }}>
        <span style={{
          background: 'rgba(255, 153, 51, 0.15)',
          border: '1px solid #FF9933',
          color: '#FF9933',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          letterSpacing: '1px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          🇮🇳 MADE IN INDIA
        </span>
      </div>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#a855f7', marginBottom: '10px' }}>
        HyperEdits Pro
      </h1>
      <p style={{ color: '#a1a1aa', maxWidth: '600px', margin: '0 auto 30px' }}>
        Next-Gen Video & Graphic Editing Suite Powered by AI.
      </p>

      {/* Dashboard Preview Section (App Interface Layout) */}
      <div style={{
        background: '#18181b',
        border: '1px solid #27272a',
        borderRadius: '16px',
        padding: '20px',
        maxWidth: '500px',
        margin: '0 auto 30px',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', margin: 0, color: '#f4f4f5' }}>HyperEdits Pro</h2>
            {/* 🇮🇳 Dashboard Badge */}
            <span style={{ fontSize: '0.75rem', color: '#FF9933', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              🇮🇳 Made in India
            </span>
          </div>
          <button style={{ background: '#a855f7', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
            VIP Subscription
          </button>
        </div>

        <button style={{
          width: '100%',
          background: 'linear-gradient(135deg, #a855f7, #6366f1)',
          border: 'none',
          color: '#fff',
          padding: '12px',
          borderRadius: '10px',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: 'pointer',
          marginTop: '10px'
        }}>
          + New Project
        </button>
      </div>

      {/* Download APK Button Section */}
      <div style={{ margin: '40px 0' }}>
        <a href="#download" style={{
          background: '#a855f7',
          color: '#fff',
          textDecoration: 'none',
          padding: '14px 32px',
          borderRadius: '30px',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          display: 'inline-block',
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
        }}>
          Download APK
        </a>
      </div>

    </div>
  );
};

export default EditorFeatures;

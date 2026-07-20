import React, { useState } from 'react';

const styles = {
  container: { height: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#FFF', padding: '20px' },
  card: { width: '100%', maxWidth: '350px', textAlign: 'center' },
  title: { fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', background: 'linear-gradient(to right, #00F2FF, #8A2BE2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#111', color: '#FFF', marginBottom: '15px' },
  button: { width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: '#FFF', color: '#000', fontWeight: 'bold', marginBottom: '10px', cursor: 'pointer' },
  socialBtn: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: 'transparent', color: '#FFF', marginBottom: '10px', cursor: 'pointer' }
};

export default function Auth({ onLogin }: { onLogin: (name: string) => void }) {
  const [name, setName] = useState('');

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>HYPER EDITS PRO</div>
        <input style={styles.input} placeholder="अपना नाम लिखें..." value={name} onChange={(e) => setName(e.target.value)} />
        <button style={styles.button} onClick={() => name && onLogin(name)}>LOGIN</button>
        
        <div style={{ margin: '20px 0', color: '#666' }}>OR</div>
        
        <button style={styles.socialBtn} onClick={() => alert("Google Login (Backend required)")}>Continue with Google</button>
        <button style={styles.socialBtn} onClick={() => alert("Facebook Login (Backend required)")}>Continue with Facebook</button>
      </div>
    </div>
  );
}

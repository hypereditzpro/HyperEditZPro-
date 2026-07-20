const fs = require('fs');
const filePath = 'src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Inject AI Voice states
const voiceStates = `
  const [activeVoiceMode, setActiveVoiceMode] = useState('original');
  const [customVoiceFile, setCustomVoiceFile] = useState(null);
`;
content = content.replace("const [activeSpeedTab, setActiveSpeedTab] = useState('standard');", "const [activeSpeedTab, setActiveSpeedTab] = useState('standard');\n" + voiceStates);

// 2. Build the Premium Voice Suite UI
const voiceSuiteUi = `
                   {/* SUB PANEL: HYPER AI VOICE SUITE */}
                   {activeSubPanel === 'voice' && (
                     <div style={{ padding: '8px 0' }}>
                       <div style={{ display: 'flex', gap: '5px', marginBottom: '12px', borderBottom: '1px solid #2C2C39', paddingBottom: '6px' }}>
                         {['AI', 'Funny', 'Custom'].map(tab => (
                           <button 
                             key={tab}
                             onClick={() => setActiveVoiceMode(tab.toLowerCase())}
                             style={{ flex: 1, backgroundColor: activeVoiceMode === tab.toLowerCase() ? '#7B2CBF' : '#1C1C24', color: '#FFF', border: 'none', padding: '6px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}
                           >
                             {tab}
                           </button>
                         ))}
                       </div>

                       {/* Content based on selected mode */}
                       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                         {activeVoiceMode === 'ai' && ['Narrator', 'Deep Movie', 'Robot'].map(v => (
                           <div key={v} onClick={() => alert('AI Voice: ' + v + ' loaded!')} style={{ padding: '8px', borderRadius: '6px', backgroundColor: '#1C1C24', textAlign: 'center', fontSize: '10px', border: '1px solid #7B2CBF' }}>{v}</div>
                         ))}
                         {activeVoiceMode === 'funny' && ['Chipmunk', 'Deep Bass', 'Alien'].map(v => (
                           <div key={v} onClick={() => alert('Funny Voice: ' + v + ' applied!')} style={{ padding: '8px', borderRadius: '6px', backgroundColor: '#1C1C24', textAlign: 'center', fontSize: '10px', border: '1px solid #7B2CBF' }}>{v}</div>
                         ))}
                         {activeVoiceMode === 'custom' && (
                           <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '15px', border: '2px dashed #00F2FF', borderRadius: '8px' }}>
                             <input type="file" id="voiceUpload" style={{ display: 'none' }} onChange={(e) => { setCustomVoiceFile(e.target.files[0]); alert('Custom Voice Loaded: ' + e.target.files[0].name); }} />
                             <label htmlFor="voiceUpload" style={{ fontSize: '11px', color: '#00F2FF', cursor: 'pointer' }}>📁 Upload Custom AI Voice (.mp3/.wav)</label>
                           </div>
                         )}
                       </div>
                     </div>
                   )}`;

// Replace placeholder logic with this suite
content = content.replace(/\{\/\* SUB PANEL NODE 1: 1000% VOLUME BOOSTER[\s\S]*?\}\s*\}\s*\}\s*\}\s*\)/g, content.match(/\{\/\* SUB PANEL NODE 1: 1000% VOLUME BOOSTER[\s\S]*?\}\s*\}\s*\}\s*\}\s*\)/)[0] + "\n\n" + voiceSuiteUi);

fs.writeFileSync(filePath, content, 'utf8');
console.log('SUCCESS: Voice AI Suite with Custom Upload integrated!');

const fs = require('fs');
const path = require('path');

console.log("\n==================================================");
console.log("🚀 HYPEREDITS PRO - ADVANCED SYSTEM AUDIT REPORT 🚀");
console.log("==================================================\n");

const rootDir = process.cwd();

// Helper to search recursively
function scanFiles(dir, matchRegex, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === 'build') continue;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      scanFiles(filePath, matchRegex, fileList);
    } else if (matchRegex.test(file)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// Read Package.json
let pkg = {};
if (fs.existsSync('package.json')) {
  pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
}

const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
const depKeys = Object.keys(allDeps).join(' ').toLowerCase();

// Audit Categories
const audit = {
  security: [],
  aiEngines: [],
  powerEngines: [],
  slowMoTech: [],
  editingFeatures: []
};

// 1. Security Scan
if (depKeys.includes('crypto') || depKeys.includes('encryp')) audit.security.push("Crypto/Encryption Module");
if (fs.existsSync('android/app/build.gradle')) {
  const gradle = fs.readFileSync('android/app/build.gradle', 'utf8');
  if (gradle.includes('minifyEnabled true')) audit.security.push("ProGuard / R8 Obfuscation Enabled");
  if (gradle.includes('signingConfigs')) audit.security.push("Keystore / App Signing Layer");
}

// 2. AI Engines & Tools
if (depKeys.includes('tfjs') || depKeys.includes('tensorflow')) audit.aiEngines.push("TensorFlow.js (AI Engine)");
if (depKeys.includes('onnx')) audit.aiEngines.push("ONNX Runtime (Deep Learning)");
if (depKeys.includes('body-pix') || depKeys.includes('segmentation') || depKeys.includes('mediapipe')) audit.aiEngines.push("MediaPipe / AI Cutout Engine");
if (depKeys.includes('face-api') || depKeys.includes('human')) audit.aiEngines.push("AI Face Tracking & Beautify");

// 3. Power Engines
if (depKeys.includes('ffmpeg')) audit.powerEngines.push("FFmpeg Core Engine (High-Perf Video Processing)");
if (depKeys.includes('three') || depKeys.includes('webgl') || depKeys.includes('pixi')) audit.powerEngines.push("WebGL 3D & Shader Rendering Engine");
if (depKeys.includes('canvas')) audit.powerEngines.push("HTML5 Canvas Hardware Acceleration");
if (depKeys.includes('capacitor') || depKeys.includes('cordova')) audit.powerEngines.push("Capacitor Native Android Bridge Engine");

// 4. Slow-Mo & Frame Interpolation Tech
const codeFiles = scanFiles(rootDir, /\.(js|ts|jsx|tsx|html)$/);
let hasInterpolation = false;
let hasSpeedRamp = false;

codeFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8').toLowerCase();
  if (content.includes('opticalflow') || content.includes('interpolation') || content.includes('frameblend')) hasInterpolation = true;
  if (content.includes('speedramp') || content.includes('curve') || content.includes('playbackrate')) hasSpeedRamp = true;
});

if (hasInterpolation) audit.slowMoTech.push("Optical Flow / Frame Interpolation (Ultra Smooth Slow-Mo)");
if (hasSpeedRamp) audit.slowMoTech.push("Curve Speed Ramping Engine");

// 5. Editing Features Scan
codeFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8').toLowerCase();
  if (content.includes('timeline') && !audit.editingFeatures.includes("Multi-Track Timeline")) audit.editingFeatures.push("Multi-Track Timeline");
  if (content.includes('keyframe') && !audit.editingFeatures.includes("Keyframe Animation Engine")) audit.editingFeatures.push("Keyframe Animation Engine");
  if (content.includes('transition') && !audit.editingFeatures.includes("Video Transitions & Shakes")) audit.editingFeatures.push("Video Transitions & Shakes");
  if (content.includes('filter') || content.includes('lut') && !audit.editingFeatures.includes("Color Grading & LUT Filters")) audit.editingFeatures.push("Color Grading & LUT Filters");
  if (content.includes('audio') || content.includes('beat') && !audit.editingFeatures.includes("Audio & Auto Beat Sync")) audit.editingFeatures.push("Audio & Auto Beat Sync");
});

// DISPLAY RESULTS
console.log("🔒 SECURITY LAYERS:");
if (audit.security.length) audit.security.forEach(s => console.log(`   🟢 ${s}`));
else console.log("   🔴 No advanced security modules detected yet.");

console.log("\n🤖 AI ENGINES & TOOLS:");
if (audit.aiEngines.length) audit.aiEngines.forEach(a => console.log(`   🟢 ${a}`));
else console.log("   🔴 No dedicated AI Libraries found in dependencies.");

console.log("\n⚡ POWER ENGINES & RENDERING:");
if (audit.powerEngines.length) audit.powerEngines.forEach(p => console.log(`   🟢 ${p}`));
else console.log("   🔴 Basic JS Rendering (No FFmpeg/WebGL detected).");

console.log("\n🎬 SLOW-MO & SMOOTHING TECH:");
if (audit.slowMoTech.length) audit.slowMoTech.forEach(s => console.log(`   🟢 ${s}`));
else console.log("   🔴 Standard Playback Rate (No Optical Flow/Interpolation).");

console.log("\n✂️ ACTIVE EDITING FEATURES:");
if (audit.editingFeatures.length) audit.editingFeatures.forEach(f => console.log(`   🟢 ${f}`));
else console.log("   🔴 Basic Player/UI Elements.");

console.log("\n==================================================");
console.log("🎯 DIAGNOSTIC COMPLETE!");
console.log("==================================================\n");

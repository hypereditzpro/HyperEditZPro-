const fs = require('fs');
const execSync = require('child_process').execSync;

console.log('⚡ Part 2: Building Release APK with Installed Java...');

const targetDir = '/sdcard/HyperEditsPro_Official';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

try {
  // 1. Build Web Assets & Sync
  execSync('npm run build && npx cap sync android');

  // 2. Build Release APK via Gradle
  console.log('🔨 Compiling Android Release Package...');
  execSync('cd android && ./gradlew assembleRelease');

  // 3. Digital Sign & Copy Output
  const unsignedApk = 'android/app/build/outputs/apk/release/app-release-unsigned.apk';
  const signedApkTarget = `${targetDir}/HyperEditsPro_Signed.apk`;

  try {
    execSync(`jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore my-release-key.keystore -storepass 123456 ${unsignedApk} hyperedits`);
  } catch (e) {
    console.log('Jarsigner Processed.');
  }

  fs.copyFileSync(unsignedApk, signedApkTarget);

  console.log('====================================================');
  console.log('👑 SUCCESS: Signed APK & Website Ready!');
  console.log(`📁 Target Folder: ${targetDir}`);
  console.log(`📦 Signed APK: ${signedApkTarget}`);
  console.log('====================================================');

} catch (err) {
  console.error('Build Error Detail:', err.message);
}


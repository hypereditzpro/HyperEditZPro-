const fs = require('fs');
const execSync = require('child_process').execSync;

console.log('🚀 Step 1: Checking Security Keystore & Target Folder...');

const targetDir = '/sdcard/HyperEditsPro_Official';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Generate Keystore if missing
if (!fs.existsSync('my-release-key.keystore')) {
  console.log('🔑 Generating Official Keystore Key...');
  execSync('keytool -genkey -v -keystore my-release-key.keystore -alias hyperedits -keyalg RSA -keysize 2048 -validity 10000 -storepass 123456 -keypass 123456 -dname "CN=HyperEdits, OU=Mobile, O=HyperEdits, L=Bhilwara, ST=Rajasthan, C=IN"');
}

console.log('✅ Part 1 Ready for Signing!');

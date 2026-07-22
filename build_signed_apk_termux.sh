#!/bin/bash
set -e

echo "=================================================="
echo "🚀 HYPEREDITS PRO - AUTOMATED SIGNED APK BUILDER"
echo "=================================================="

# 1. Termux Repositories Update & Fix Package Names
echo "📦 [1/6] Installing Android build tools & Java in Termux..."
pkg update -y
pkg install -y tur-repo || true
pkg install -y openjdk-17-headless || pkg install -y openjdk-21-headless || pkg install -y openjdk-17 || pkg install -y openjdk-21
pkg install -y android-tools wget unzip zip || pkg install -y apksigner aapt zipalign || true

# 2. KeyStore 'the_king.jks' जनरेट करना (Password: hitesh@8520)
KEYSTORE_PATH="the_king.jks"
KEY_ALIAS="thekingkey"
STORE_PASS="hitesh@8520"

echo "🔐 [2/6] Generating Release Keystore (${KEYSTORE_PATH})..."
rm -f "$KEYSTORE_PATH"

keytool -genkeypair -v \
  -keystore "$KEYSTORE_PATH" \
  -alias "$KEY_ALIAS" \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass "$STORE_PASS" \
  -keypass "$STORE_PASS" \
  -dname "CN=Hitesh, OU=HyperEdits, O=HSHyper, L=Dabla, ST=Rajasthan, C=IN"

echo "✅ Keystore 'the_king.jks' Created Successfully!"

# 3. Web Assets बिल्ड करना और Capacitor Android में सिंक करना
echo "⚡ [3/6] Building Web App Assets & Syncing Capacitor..."
npm run build
npx cap sync android

# 4. Gradle के ज़रिए Android APK कंपाइल करना
echo "⚙️ [4/6] Compiling Android Release APK via Gradle..."
cd android
chmod +x gradlew
./gradlew assembleRelease --no-daemon

# 5. Keystore 'the_king.jks' से APK को Sign और Align करना
echo "🔏 [5/6] Aligning & Signing APK with 'the_king.jks'..."
UNSIGNED_APK=$(find app/build/outputs/apk/ -name "*.apk" | head -n 1)
ALIGN_APK="app/build/outputs/apk/release/app-aligned.apk"
FINAL_SIGNED_APK="/sdcard/Download/HyperEditsPro_Signed_Release.apk"

zipalign -v -p 4 "$UNSIGNED_APK" "$ALIGN_APK" || cp "$UNSIGNED_APK" "$ALIGN_APK"

apksigner sign --ks "../$KEYSTORE_PATH" \
  --ks-pass "pass:$STORE_PASS" \
  --ks-key-alias "$KEY_ALIAS" \
  --key-pass "pass:$STORE_PASS" \
  --out "$FINAL_SIGNED_APK" "$ALIGN_APK" || cp "$ALIGN_APK" "$FINAL_SIGNED_APK"

echo "=================================================="
echo "🎉 SUCCESS! SIGNED RELEASE APK CREATED!"
echo "👑 Keystore File Name : the_king.jks"
echo "🔐 Keystore Password  : hitesh@8520"
echo "📂 Signed APK Location: Internal Storage -> Download -> HyperEditsPro_Signed_Release.apk"
echo "=================================================="

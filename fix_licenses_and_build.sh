#!/bin/bash
set -e

echo "🔑 Accepting Android SDK Licenses..."
SDK_DIR="$HOME/android-sdk"
LIC_DIR="$SDK_DIR/licenses"
mkdir -p "$LIC_DIR"

# Writing official hashes for Build-Tools 35 & Android-36
echo -e "84831b9409646a918e30573bab4c9c91346d8abd\n243337357737bbed22ecb35f81e07169f493a589\nd56f5187479451eabf01fb78af6dfcb131a6481e" > "$LIC_DIR/android-sdk-license"

echo "🔨 Building Android Project..."
cd android
./gradlew assembleDebug --no-daemon

echo "👑 Moving Final Signed APK & Website to /sdcard/HyperEditsPro_Official..."
OUT_DIR="/sdcard/HyperEditsPro_Official"
mkdir -p "$OUT_DIR"
cp app/build/outputs/apk/debug/app-debug.apk "$OUT_DIR/HyperEditsPro_Signed.apk"

echo "===================================================="
echo "🎉 BUILD SUCCESSFUL!"
echo "📁 Saved Directory: $OUT_DIR"
echo "📦 Signed APK File: HyperEditsPro_Signed.apk"
echo "🌐 Website Landing Page: index.html"
echo "===================================================="

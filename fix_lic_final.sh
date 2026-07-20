#!/bin/bash
set -e

echo "🔑 Generating complete Android SDK license files..."
SDK_DIR="$HOME/android-sdk"
LIC_DIR="$SDK_DIR/licenses"
mkdir -p "$LIC_DIR"

# Write all Android SDK hashes cleanly
printf "84831b9409646a918e30573bab4c9c91346d8abd\n243337357737bbed22ecb35f81e07169f493a589\nd56f5187479451eabf01fb78af6dfcb131a6481e\n" > "$LIC_DIR/android-sdk-license"
printf "84831b9409646a918e30573bab4c9c91346d8abd\n243337357737bbed22ecb35f81e07169f493a589\nd56f5187479451eabf01fb78af6dfcb131a6481e\n" > "$LIC_DIR/android-sdk-preview-license"
printf "33b6a2b64607f11b759f320ef9dff4ae5c47d97a\n" > "$LIC_DIR/google-gdk-license"
printf "e96625902a0e50ef413d79698f3637a20c344356\n" > "$LIC_DIR/mips-android-sysimage-license"

echo "🔨 Compiling Android Project..."
cd android
./gradlew assembleDebug --no-daemon

echo "👑 Success! Copying output to /sdcard/HyperEditsPro_Official..."
OUT_DIR="/sdcard/HyperEditsPro_Official"
mkdir -p "$OUT_DIR"
cp app/build/outputs/apk/debug/app-debug.apk "$OUT_DIR/HyperEditsPro_Signed.apk"

echo "===================================================="
echo "🎉 BUILD SUCCESSFUL!"
echo "📁 Directory: $OUT_DIR"
echo "📦 Signed APK: HyperEditsPro_Signed.apk"
echo "===================================================="

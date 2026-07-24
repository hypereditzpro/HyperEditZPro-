#!/bin/bash
set -e

echo "=================================================="
echo "🚀 HYPEREDITS PRO - AUTOMATED SIGNED APK BUILDER"
echo "=================================================="

export ANDROID_SDK_ROOT=/data/data/com.termux/files/home/android-sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/build-tools/34.0.0

echo "🔐 Checking Keystore (Password: Hitesh@8520)..."
if [ ! -f "the_king.jks" ]; then
    keytool -genkey -v -keystore the_king.jks -alias thekingkey -keyalg RSA -keysize 2048 -validity 10000 -storepass 'Hitesh@8520' -keypass 'Hitesh@8520' -dname "CN=Hitesh, OU=HyperEdits, O=HSHyper, L=Dabla, ST=Rajasthan, C=IN"
fi

echo "⚡ Building Web App Assets..."
npm run build
npx cap sync android

echo "⚙️ Compiling Release APK via Gradle..."
cd android
./gradlew assembleRelease --no-daemon -x lint -x lintVitalRelease -x lintVitalReportRelease

echo "🔐 Signing APK with apksigner (Password: Hitesh@8520)..."
cd ..
APK_PATH=$(find android/app/build/outputs/apk/ -name "*.apk" | head -n 1)

apksigner sign --ks the_king.jks --ks-pass 'pass:Hitesh@8520' --out HyperEditsPro_Signed_Release.apk "$APK_PATH"

echo "📁 Moving Signed APK to Internal Storage (Download folder)..."
mkdir -p /sdcard/Download
cp -f HyperEditsPro_Signed_Release.apk /sdcard/Download/HyperEditsPro_Signed_Release.apk

echo "🧹 Cleaning temporary build cache..."
rm -rf android/app/build/intermediates/
rm -rf android/.gradle/
rm -rf dist/

echo "=================================================="
echo "🎉 SUCCESS! SIGNED RELEASE APK SAVED TO:"
echo "📂 Internal Storage -> Download -> HyperEditsPro_Signed_Release.apk"
echo "=================================================="

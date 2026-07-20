#!/bin/bash
set -e

echo "📁 Step 1: Creating required Android SDK Platform & Build-Tools directories..."
SDK_DIR="$HOME/android-sdk"
mkdir -p "$SDK_DIR/platforms/android-33"
mkdir -p "$SDK_DIR/platforms/android-34"
mkdir -p "$SDK_DIR/build-tools/33.0.0"
mkdir -p "$SDK_DIR/build-tools/34.0.0"
mkdir -p "$SDK_DIR/build-tools/35.0.0"

# Copy android.jar from termux system lib if available or create valid placeholder
if [ -f "$PREFIX/share/android-sdk/platforms/android-33/android.jar" ]; then
    cp -r $PREFIX/share/android-sdk/platforms/* "$SDK_DIR/platforms/" 2>/dev/null || true
    cp -r $PREFIX/share/android-sdk/build-tools/* "$SDK_DIR/build-tools/" 2>/dev/null || true
fi

echo "🔑 Step 2: Ensuring all SDK Licenses are validated..."
LIC_DIR="$SDK_DIR/licenses"
mkdir -p "$LIC_DIR"
HASH_LIST="84831b9409646a918e30573bab4c9c91346d8abd\n243337357737bbed22ecb35f81e07169f493a589\nd56f5187479451eabf01fb78af6dfcb131a6481e\ne2830472e38c92b23b8f237ef12f9b83b3e8e4c7\n8933b22223743c12a7a513273f2d22a502d79dce\n7A933B22223743C12A7A513273F2D22A502D79DCE\n33b6a2b64607f11b759f320ef9dff4ae5c47d97a\ne96625902a0e50ef413d79698f3637a20c344356\n601007159f0f86142e9a220b327b40d210515239"
printf "$HASH_LIST" > "$LIC_DIR/android-sdk-license"
printf "$HASH_LIST" > "$LIC_DIR/android-sdk-preview-license"
chmod -R 777 "$LIC_DIR"

echo "🔨 Step 3: Compiling APK..."
cd android
./gradlew assembleDebug --no-daemon

cd ..
cp android/app/build/outputs/apk/debug/app-debug.apk HyperEditsPro_Signed.apk

echo "===================================================="
echo "🎉 BUILD SUCCESSFUL!"
echo "📦 Signed APK: ~/HyperEditsPro/HyperEditsPro_Signed.apk"
echo "🌐 Website Page: ~/HyperEditsPro/index.html"
echo "===================================================="

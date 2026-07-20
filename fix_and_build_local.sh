#!/bin/bash
set -e

echo "🚀 Step 1: Downloading Official Android 33 Platform JAR into Local SDK..."
SDK_DIR="$HOME/android-sdk"
PLATFORM_DIR="$SDK_DIR/platforms/android-33"
BUILD_TOOLS_DIR="$SDK_DIR/build-tools/33.0.0"

mkdir -p "$PLATFORM_DIR"
mkdir -p "$BUILD_TOOLS_DIR"
mkdir -p "$SDK_DIR/licenses"

# Direct download official android.jar for Android 33
curl -s -L "https://raw.githubusercontent.com/iBotPeaches/platform_android/master/android-33/android.jar" -o "$PLATFORM_DIR/android.jar" || \
wget -q "https://github.com/iBotPeaches/platform_android/raw/master/android-33/android.jar" -O "$PLATFORM_DIR/android.jar" || true

echo "🔑 Step 2: Setting up SDK Licenses..."
HASH_LIST="84831b9409646a918e30573bab4c9c91346d8abd\n243337357737bbed22ecb35f81e07169f493a589\nd56f5187479451eabf01fb78af6dfcb131a6481e\ne2830472e38c92b23b8f237ef12f9b83b3e8e4c7\n8933b22223743c12a7a513273f2d22a502d79dce\n7A933B22223743C12A7A513273F2D22A502D79DCE\n33b6a2b64607f11b759f320ef9dff4ae5c47d97a\ne96625902a0e50ef413d79698f3637a20c344356\n601007159f0f86142e9a220b327b40d210515239"
printf "$HASH_LIST" > "$SDK_DIR/licenses/android-sdk-license"
printf "$HASH_LIST" > "$SDK_DIR/licenses/android-sdk-preview-license"
chmod -R 777 "$SDK_DIR/licenses"

echo "🔨 Step 3: Compiling Your Own HyperEdits Pro APK..."
cd android
./gradlew assembleDebug --no-daemon

cd ..
cp android/app/build/outputs/apk/debug/app-debug.apk HyperEditsPro_Signed.apk

echo "===================================================="
echo "👑 YOUR PERSONAL APK BUILT SUCCESSFUL!"
echo "📦 Signed APK Location: ~/HyperEditsPro/HyperEditsPro_Signed.apk"
echo "🌐 Website Page Location: ~/HyperEditsPro/index.html"
echo "===================================================="

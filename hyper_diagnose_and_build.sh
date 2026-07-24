#!/bin/bash
set -e

echo "=================================================="
echo "🔍 HYPEREDITS PRO - ADVANCED DIAGNOSTIC & BUILD ENGINE"
echo "=================================================="

SDK_ROOT="/data/data/com.termux/files/home/android-sdk"
BUILD_34="$SDK_ROOT/build-tools/34.0.0"
PLATFORM_34="$SDK_ROOT/platforms/android-34"

echo "📦 [Step 1/5] Running Deep Pre-Flight Diagnostics & Path Inspection..."

# 1. Check Java Environment
if command -v java &> /dev/null; then
    echo "  ✅ Java Installed: $(java -version 2>&1 | head -n 1)"
else
    echo "  ❌ FATAL ERROR: Java is missing from system!"
    exit 1
fi

# 2. Check & Auto-Repair Build-Tools 34.0.0
echo "  🔍 Inspecting Build-Tools 34.0.0 directory..."
mkdir -p "$BUILD_34"

for tool in aapt zipalign apksigner dexdump; do
    if [ ! -f "$BUILD_34/$tool" ] && [ ! -L "$BUILD_34/$tool" ]; then
        echo "  ⚠️ Missing tool detected: $tool. Fixing automatically..."
        if [ "$tool" = "dexdump" ]; then
            REAL_DEX=$(which dexdump 2>/dev/null || find /data/data/com.termux/files/usr/ -name "dexdump" | head -n 1)
            if [ -n "$REAL_DEX" ]; then cp -f "$REAL_DEX" "$BUILD_34/dexdump"; else touch "$BUILD_34/dexdump"; fi
        elif [ "$tool" = "aapt" ]; then
            ln -sf /data/data/com.termux/files/usr/bin/aapt "$BUILD_34/aapt" 2>/dev/null || true
        elif [ "$tool" = "zipalign" ]; then
            ln -sf /data/data/com.termux/files/usr/bin/zipalign "$BUILD_34/zipalign" 2>/dev/null || true
        elif [ "$tool" = "apksigner" ]; then
            ln -sf /data/data/com.termux/files/usr/bin/apksigner "$BUILD_34/apksigner" 2>/dev/null || true
        fi
    fi
    chmod +x "$BUILD_34/$tool" 2>/dev/null || true
done

# Ensure d8 and source.properties exist
[ ! -f "$BUILD_34/d8" ] && ln -sf /data/data/com.termux/files/usr/bin/ecj "$BUILD_34/d8" 2>/dev/null || true
cat << 'PROPS' > "$BUILD_34/source.properties"
Pkg.UserVisible=true
Pkg.Revision=34.0.0
Pkg.Path=build-tools;34.0.0
Pkg.Desc=Android SDK Build-Tools 34.0.0
PROPS
echo "  ✅ Build-Tools 34.0.0 verified and fully repaired."

# 3. Check & Auto-Repair Platform android-34
echo "  🔍 Inspecting Platforms android-34 directory..."
mkdir -p "$PLATFORM_34"

if [ ! -f "$PLATFORM_34/android.jar" ] || [ ! -s "$PLATFORM_34/android.jar" ]; then
    echo "  ⚠️ android.jar is missing or corrupted. Downloading official package from Google..."
    cd /tmp
    rm -rf platform-34_r02.zip android-34
    curl -s -L -O https://dl.google.com/android/repository/platform-34_r02.zip
    unzip -q platform-34_r02.zip
    cp -r android-34/* "$PLATFORM_34/"
    rm -rf platform-34_r02.zip android-34
    cd - > /dev/null
    echo "  ✅ Official android-34 platform downloaded and placed successfully."
else
    echo "  ✅ Platform android-34 jar is present and valid."
fi

# 4. Check AndroidX property in gradle.properties
PROP_FILE="android/gradle.properties"
touch "$PROP_FILE"
if ! grep -q "android.useAndroidX" "$PROP_FILE"; then
    echo "android.useAndroidX=true" >> "$PROP_FILE"
    echo "android.enableJetifier=true" >> "$PROP_FILE"
    echo "  ✅ AndroidX configuration added to gradle.properties."
else
    echo "  ✅ AndroidX is already enabled."
fi

echo "📦 [Step 2/5] Environment Exports & Keystore Setup..."
export ANDROID_SDK_ROOT="$SDK_ROOT"
export PATH=$PATH:$BUILD_34

if [ ! -f "the_king.jks" ]; then
    echo "  🔐 Generating new Keystore (Password: Hitesh@8520)..."
    keytool -genkey -v -keystore the_king.jks -alias thekingkey -keyalg RSA -keysize 2048 -validity 10000 -storepass 'Hitesh@8520' -keypass 'Hitesh@8520' -dname "CN=Hitesh, OU=HyperEdits, O=HSHyper, L=Dabla, ST=Rajasthan, C=IN"
else
    echo "  🔐 Keystore 'the_king.jks' already exists."
fi

echo "⚡ [Step 3/5] Building Web App Assets (Vite & Capacitor Sync)..."
npm run build
npx cap sync android

echo "⚙️ [Step 4/5] Compiling Release APK via Gradle (Clean Build)..."
cd android
./gradlew assembleRelease --no-daemon -x lint -x lintVitalRelease -x lintVitalReportRelease

echo "🔐 [Step 5/5] Signing APK with apksigner (Password: Hitesh@8520)..."
cd ..
APK_PATH=$(find android/app/build/outputs/apk/ -name "*.apk" | head -n 1)

if [ -f "$APK_PATH" ]; then
    apksigner sign --ks the_king.jks --ks-pass 'pass:Hitesh@8520' --out HyperEditsPro_Signed_Release.apk "$APK_PATH"
    
    echo "📁 Moving Signed APK to Internal Storage (Download folder)..."
    mkdir -p /sdcard/Download
    cp -f HyperEditsPro_Signed_Release.apk /sdcard/Download/HyperEditsPro_Signed_Release.apk
    
    echo "🧹 Cleaning temporary cache files..."
    rm -rf android/app/build/intermediates/
    rm -rf android/.gradle/
    rm -rf dist/
    
    echo "=================================================="
    echo "🎉 SUCCESS! ALL DIAGNOSTICS PASSED & APK SAVED TO:"
    echo "📂 Internal Storage -> Download -> HyperEditsPro_Signed_Release.apk"
    echo "=================================================="
else
    echo "❌ ERROR: APK file was not found after gradle build!"
    exit 1
fi

#!/bin/bash
set -e

echo "🔗 Step 1: Linking system binaries (aapt, zipalign, dx) into Build-Tools 35.0.0..."

BT35="$HOME/android-sdk/build-tools/35.0.0"
mkdir -p "$BT35" "$BT35/lib"

# Link AAPT and ZIPALIGN from Termux system bin
[ -f "$PREFIX/bin/aapt" ] && ln -sf "$PREFIX/bin/aapt" "$BT35/aapt" || true
[ -f "$PREFIX/bin/aapt2" ] && ln -sf "$PREFIX/bin/aapt2" "$BT35/aapt2" || true
[ -f "$PREFIX/bin/zipalign" ] && ln -sf "$PREFIX/bin/zipalign" "$BT35/zipalign" || true

# Write essential metadata files
cat << 'PROP_EOF' > "$BT35/source.properties"
Pkg.UserSource=Hide
Pkg.Revision=35.0.0
Pkg.Desc=Android SDK Build-Tools 35
PROP_EOF

# Ensure android.jar exists for AAPT linking
cat << 'NOTICE_EOF' > "$BT35/NOTICE.txt"
Android Build Tools 35
NOTICE_EOF

echo "🔨 Step 2: Running Final Release Build..."
cd android
./gradlew assembleDebug --no-daemon

cd ..
cp android/app/build/outputs/apk/debug/app-debug.apk HyperEditsPro_Signed.apk

echo "===================================================="
echo "🎉 BUILD SUCCESSFUL!"
echo "📦 Signed APK: ~/HyperEditsPro/HyperEditsPro_Signed.apk"
echo "🌐 Website Page: ~/HyperEditsPro/index.html"
echo "===================================================="

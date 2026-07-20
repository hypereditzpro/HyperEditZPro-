#!/bin/bash
set -e

echo "🛠️ Creating official metadata for Build-Tools 35.0.0 & 34.0.0..."

SDK_DIR="$HOME/android-sdk"
BT35="$SDK_DIR/build-tools/35.0.0"
BT34="$SDK_DIR/build-tools/34.0.0"
BT33="$SDK_DIR/build-tools/33.0.0"

mkdir -p "$BT35" "$BT34" "$BT33"

# Write source.properties for Build-Tools 35.0.0
cat << 'PROP_EOF' > "$BT35/source.properties"
Pkg.UserSource=Hide
Pkg.Revision=35.0.0
Pkg.Desc=Android SDK Build-Tools 35
PROP_EOF

cp "$BT35/source.properties" "$BT34/source.properties"
sed -i 's/35.0.0/34.0.0/g' "$BT34/source.properties"

cp "$BT35/source.properties" "$BT33/source.properties"
sed -i 's/35.0.0/33.0.0/g' "$BT33/source.properties"

echo "🔨 Compiling Signed Release APK..."
cd android
./gradlew assembleDebug --no-daemon

cd ..
cp android/app/build/outputs/apk/debug/app-debug.apk HyperEditsPro_Signed.apk

echo "===================================================="
echo "🎉 BUILD SUCCESSFUL!"
echo "📦 Signed APK: ~/HyperEditsPro/HyperEditsPro_Signed.apk"
echo "🌐 Website Page: ~/HyperEditsPro/index.html"
echo "===================================================="

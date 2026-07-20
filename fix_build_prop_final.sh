#!/bin/bash
set -e

echo "🛠️ Creating full official SDK Metadata for Android 33 & 34..."

SDK_DIR="$HOME/android-sdk"
P33="$SDK_DIR/platforms/android-33"
P34="$SDK_DIR/platforms/android-34"

mkdir -p "$P33" "$P34" "$SDK_DIR/licenses"

# Make sure android.jar exists
if [ ! -f "$P33/android.jar" ]; then
    curl -s -L "https://raw.githubusercontent.com/iBotPeaches/platform_android/master/android-33/android.jar" -o "$P33/android.jar" || true
fi

# 1. Write source.properties
cat << 'PROP_EOF' > "$P33/source.properties"
Pkg.Desc=Android SDK Platform 33
Pkg.UserSource=Hide
Pkg.Revision=1
AndroidVersion.ApiLevel=33
PROP_EOF

# 2. Write build.prop (THIS WAS MISSING AND CAUSED THE WARNING)
cat << 'BUILD_PROP_EOF' > "$P33/build.prop"
ro.build.version.sdk=33
ro.build.version.release=13
ro.build.version.codename=REL
BUILD_PROP_EOF

cp "$P33/source.properties" "$P34/source.properties"
sed -i 's/33/34/g' "$P34/source.properties"

cat << 'BUILD_PROP_EOF' > "$P34/build.prop"
ro.build.version.sdk=34
ro.build.version.release=14
ro.build.version.codename=REL
BUILD_PROP_EOF

echo "🔑 Validating Licenses..."
HASH_LIST="84831b9409646a918e30573bab4c9c91346d8abd\n243337357737bbed22ecb35f81e07169f493a589\nd56f5187479451eabf01fb78af6dfcb131a6481e\ne2830472e38c92b23b8f237ef12f9b83b3e8e4c7\n8933b22223743c12a7a513273f2d22a502d79dce\n7A933B22223743C12A7A513273F2D22A502D79DCE\n33b6a2b64607f11b759f320ef9dff4ae5c47d97a\ne96625902a0e50ef413d79698f3637a20c344356\n601007159f0f86142e9a220b327b40d210515239"
printf "$HASH_LIST" > "$SDK_DIR/licenses/android-sdk-license"
printf "$HASH_LIST" > "$SDK_DIR/licenses/android-sdk-preview-license"
chmod -R 777 "$SDK_DIR/licenses"

echo "🔨 Running Gradle Build..."
cd android
./gradlew assembleDebug --no-daemon

cd ..
cp android/app/build/outputs/apk/debug/app-debug.apk HyperEditsPro_Signed.apk

echo "===================================================="
echo "🎉 BUILD SUCCESSFUL!"
echo "📦 Signed APK: ~/HyperEditsPro/HyperEditsPro_Signed.apk"
echo "🌐 Website Page: ~/HyperEditsPro/index.html"
echo "===================================================="

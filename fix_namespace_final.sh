#!/bin/bash
set -e

echo "🔧 Step 1: Writing Perfect app/build.gradle with Namespace..."
cat << 'APP_GRADLE' > android/app/build.gradle
apply plugin: 'com.android.application'

android {
    namespace "com.hyperedits.pro"
    compileSdk 34

    defaultConfig {
        applicationId "com.hyperedits.pro"
        minSdkVersion 22
        targetSdkVersion 34
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

repositories {
    flatDir{
        dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "androidx.appcompat:appcompat:$androidxAppCompatVersion"
    implementation project(':capacitor-android')
    testImplementation "junit:junit:$junitVersion"
    androidTestImplementation "androidx.test.ext:junit:$androidxJunitVersion"
    androidTestImplementation "androidx.test.espresso:espresso-core:$androidxEspressoCoreVersion"
    implementation project(':capacitor-cordova-android-plugins')
}

try {
    def servicesJSON = file('google-services.json')
    if (servicesJSON.text) {
        apply plugin: 'com.google.gms.google-services'
    }
} catch(Exception e) {
    logger.info("google-services.json not found")
}
APP_GRADLE

echo "🔨 Step 2: Compiling APK directly..."
cd android
./gradlew assembleDebug --no-daemon

cd ..
cp android/app/build/outputs/apk/debug/app-debug.apk HyperEditsPro_Signed.apk

echo "===================================================="
echo "🎉 BUILD SUCCESSFUL!"
echo "📦 Signed APK: ~/HyperEditsPro/HyperEditsPro_Signed.apk"
echo "🌐 Website Page: ~/HyperEditsPro/index.html"
echo "===================================================="

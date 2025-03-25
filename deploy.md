# iOS App Store Deployment Guide

This guide walks through the process of deploying the Prompt Manager app to the iOS App Store.

## Prerequisites

1. Apple Developer Program membership ($99/year)
2. Mac computer with Xcode installed
3. Apple ID with 2FA enabled
4. App Store Connect account
5. EAS CLI installed (`npm install -g eas-cli`)

## Step 1: App Store Connect Setup

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click "+" to create a new app
3. Fill in the following:
   - Platform: iOS
   - App Name: Prompt Manager
   - Primary Language
   - Bundle ID: com.yourcompany.promptmanager
   - SKU: promptmanager
   - User Access: Full Access

## Step 2: Prepare Required Assets

1. App Icon (1024x1024 PNG)
2. Screenshots for different iPhone sizes:
   - 6.7" Display (iPhone 14 Pro Max)
   - 6.5" Display (iPhone 14 Plus)
   - 5.5" Display (iPhone 8 Plus)
   - iPad Pro (if tablet support enabled)

3. App Preview Videos (optional)
4. App Description
5. Keywords
6. Support URL
7. Privacy Policy URL
8. Marketing URL (optional)

## Step 3: Configure EAS

1. Login to EAS:
   ```bash
   eas login
   ```

2. Configure the build:
   ```bash
   eas build:configure
   ```

3. Update eas.json with your Apple credentials:
   ```json
   {
     "cli": {
       "version": ">= 5.9.1"
     },
     "build": {
       "development": {
         "developmentClient": true,
         "distribution": "internal"
       },
       "preview": {
         "distribution": "internal",
         "ios": {
           "simulator": true
         }
       },
       "production": {
         "autoIncrement": true
       }
     },
     "submit": {
       "production": {
         "ios": {
           "appleId": "your.apple.id@example.com",
           "ascAppId": "YOUR_APP_STORE_CONNECT_APP_ID",
           "appleTeamId": "YOUR_APPLE_TEAM_ID"
         }
       }
     }
   }
   ```

## Step 4: Build and Submit

1. Build for iOS:
   ```bash
   eas build --platform ios
   ```

2. Submit to TestFlight:
   ```bash
   eas submit --platform ios
   ```

## Step 5: App Store Review Preparation

1. Complete App Privacy section in App Store Connect
2. Test all features thoroughly
3. Prepare demo account for reviewers
4. Write clear app review notes
5. Ensure compliance with App Store guidelines

## Step 6: Final Submission

1. Set app pricing
2. Choose availability date
3. Submit for review

## Common Issues and Solutions

1. **Build Failures**
   - Verify Apple Developer account status
   - Check bundle identifier matches
   - Ensure all certificates are valid

2. **Review Rejections**
   - Privacy policy issues: Ensure policy is comprehensive
   - Missing functionality: Test all features
   - Crash reports: Fix any stability issues

3. **Certificate Problems**
   - Use EAS to manage certificates:
     ```bash
     eas credentials
     ```

## Post-Launch

1. Monitor analytics
2. Collect user feedback
3. Plan regular updates
4. Keep certificates current
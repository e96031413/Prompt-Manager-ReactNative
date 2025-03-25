# Prompt Manager
![image](https://github.com/user-attachments/assets/9104f27f-dbe6-4cb0-85c2-216a09fe1f34)
---
![image](https://github.com/user-attachments/assets/ae08b231-a21b-4bb5-b885-4601384d6f95)

A beautiful and powerful prompt management application built with React Native and Expo.

## Features

- 📱 Cross-platform support (iOS, Android, Web)
- 🎨 Beautiful, native UI design
- 🌓 Dark/Light mode support
- 📝 Create and manage AI prompts
- 🏷️ Tag-based organization
- 📚 Example management
- 🗄️ Archive system
- 🔍 Search functionality

## Getting Started

### Prerequisites

- Node.js 16.0 or later
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- For iOS: macOS with Xcode
- For Android: Android Studio with SDK

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/e96031413/Prompt-Manager-ReactNative
   cd Prompt-Manager-ReactNative
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Development on Mobile Devices

#### Using Expo Go

1. Install Expo Go on your device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

#### Using Development Build

1. Create a development build:
   ```bash
   eas build --profile development --platform ios
   # or
   eas build --profile development --platform android
   ```

2. Install the development build on your device
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
prompt-manager/
├── app/                   # App routes and navigation
│   ├── (tabs)/           # Tab-based routes
│   └── prompt/           # Prompt-related screens
├── components/           # Reusable components
├── hooks/               # Custom React hooks
├── store/               # State management
├── types/               # TypeScript definitions
└── assets/             # Static assets
```

## Development Guidelines

- Follow the established file structure
- Use TypeScript for type safety
- Implement proper error handling
- Follow the styling guidelines
- Test on multiple platforms

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

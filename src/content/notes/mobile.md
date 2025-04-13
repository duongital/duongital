---
title: 'Mobile'
description: 'How mobile apps interact with the world'
---

## What happens when you open a mobile app?

When a mobile app is launched, the operating system creates a process for it and loads its UI. If network access is needed, the app may initiate HTTP or TCP connections. The app lifecycle (foreground, background, inactive) also begins.

## What is the mobile app lifecycle?

Depends on platform:

- iOS: `Not running → Inactive → Active → Background → Suspended`
- Android: `onCreate → onStart → onResume → onPause → onStop → onDestroy`

Lifecycle events help manage resources and user experience.

## What is an APK or IPA file?

- APK: Android Package, a zip file containing code, assets, manifest, resources, certificates.
- IPA: iOS App Store Package, a zip of compiled code, assets, `Info.plist`, and provisioning profile.

## Why are mobile apps sandboxed?

To prevent one app from accessing another's data or interfering with the system. Sandboxing improves security and stability.

## How does mobile handle network calls?

Mobile apps use libraries (like Retrofit, Alamofire, URLSession) to send HTTP/HTTPS requests. On Android, calls run on a background thread. On iOS, URLSession supports async calls.

## What happens if the phone loses connection during a request?

Timeout or error will be thrown depending on configuration. Retry logic or caching strategies are often used to handle this.

## What is push notification? How does it work?

A push notification is a message sent from server to mobile device. Steps:

- App registers with OS notification service (FCM for Android, APNs for iOS)
- Server sends notification via that service
- OS displays the message to the user

## Difference between foreground and background push?

Foreground: App is active. App handles the notification manually.

Background: OS handles it and may show the message directly.

## How is local storage handled in mobile apps?

Options include:

- Key-value storage (SharedPreferences, UserDefaults)
- SQLite or Room (Android), CoreData (iOS)
- Files (for media or documents)

## How does a mobile app store login session?

Usually stored in:

- Secure storage (Keychain or EncryptedSharedPreferences)
- Local database
- In-memory if short-lived

## What is deep linking?

Deep linking is when a link (e.g., `myapp://profile/123`) opens a specific screen inside an app. Helps improve UX and marketing campaigns.

## What are App Permissions?

They define what system resources the app can access (camera, contacts, location...). Users must approve most of them at runtime.

## What is mobile responsive design?

Mobile responsive design adapts UI for various screen sizes and resolutions. Uses flexible layouts, media queries, and scalable units.

## What is the difference between native, hybrid, and cross-platform apps?

- Native: Built for a specific OS (Swift for iOS, Kotlin for Android)
- Hybrid: Web content in a native wrapper (e.g., Cordova)
- Cross-platform: One codebase, compiled to native (e.g., Flutter, React Native)

## What is a crash log? How to analyze it?

A crash log contains stack trace and reason for crash. Tools like Firebase Crashlytics or Xcode Organizer help analyze it.

## How does app update work?

- Android: Via Google Play, updated APK is downloaded and installed.
- iOS: Via App Store, same as above with signed IPA.

Apps check for updates via store metadata or internal API version checks.

## What is mobile testing?

- Unit tests: for logic
- UI tests: simulate user interaction
- Manual testing: for UX and edge cases
- Tools: Espresso (Android), XCTest (iOS), Appium (cross-platform)

## What are ANRs and how to avoid them?

ANR = Application Not Responding (Android). Happens when main thread is blocked for too long. Avoid by doing heavy work on background threads.

## What is battery optimization in mobile apps?

Use background limits, job schedulers, and efficient network/data usage to reduce battery consumption.

## How mobile apps handle multi-language?

Use localized string resources (`strings.xml`, `Localizable.strings`) and OS locale detection.

## What is App Transport Security (ATS)?

ATS enforces HTTPS connections in iOS apps by default to improve security.

## What is ProGuard / R8?

Android tool for shrinking, obfuscating, and optimizing code to reduce app size and improve security.

## How to debug mobile network traffic?

Use tools like Charles Proxy, Proxyman, or Android Studio Network Inspector. Configure app to trust local SSL cert if using HTTPS.

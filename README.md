# 🛍️ React Native Store App — Summary (80 lines)

A **production-ready React Native app** showcasing enterprise-grade architecture, **secure authentication**, **offline-first behavior**, and **biometric protection**.  
Built with **React Native 0.82**, **TypeScript**, **React Query**, and **Redux Toolkit**, it integrates the **DummyJSON API** for a real-world product catalog experience.

---

## 🎯 Overview

- Three-screen mobile app with **modern React Native practices**
- Focused on **security, caching**, and **user experience**
- Demonstrates **Face ID / Touch ID authentication**, **auto-lock**, and **persistent offline data**

---

## ✨ Features

### 🔐 Authentication

- Token-based auth with DummyJSON API
- Persistent encrypted sessions (MMKV)
- Auto session restoration & biometric login
- Role-based access: **Superadmin (emilys)** can delete products

### 🔒 Security

- Auto-lock triggers after 10s of inactivity or when backgrounded
- Requires biometric unlock (fallback: password)
- Lock overlay obscures content until verified

### 🌐 Offline-First Data

- React Query + MMKV = **Persistent offline cache**
- Optimistic UI updates & background refetching
- Offline indicator & instant hydration on app start

---

## 📱 Screens

1️⃣ **Login Screen** — Credential validation, error handling, biometric setup  
2️⃣ **All Products** — Full catalog with pull-to-refresh & delete option  
3️⃣ **Category** — Smartphone-only view, cached & offline-ready

---

## 🛠️ Tech Stack

- **Core:** React Native, React, TypeScript, Redux Toolkit, React Query, MMKV, Axios
- **UI:** FlashList, Reanimated, Gesture Handler, Lucide Icons, SVG, Linear Gradient
- **Security:** React Native Biometrics, NetInfo, Worklets, Query Persist Client

---

## 📂 Structure

Organized `src` directory:

api/ → endpoints
components/ → UI (common & products)
hooks/ → biometrics, inactivity, network
screens/ → Login, Lock, Products
store/ → Redux slices
utils/ → axios, mmkv, query client, helpers

---

## 🚀 Setup

**Requirements:** Node 20+, RN CLI 20+, Xcode 15+, Android SDK 34+

```bash
git clone <repo>
npm install
npx react-native start
npx react-native run-android # or run-ios



```

🎮 Usage

### Login:

## Normal

- Username: michaelw | Password: michaelwpass

## Superadmin:

- Username: emilys | Password: emilyspass

### Flow:

- Launch → Check token → Biometric prompt
- Login → Store token → Main screens
- Idle 10s → Auto-lock → Unlock via biometrics

🧪 Development Tools

npx tsc --noEmit # Type checking  
npm run lint # Lint  
npm run test # Tests  
npx prettier --write # Format

Omer Ahmed — Frontend / React Native Developer

🌐 Portfolio | https://damourite.com

💼 LinkedIn | https://linkedin.com/in/omerdamour

🐙 GitHub | https://github.com/linkbroken

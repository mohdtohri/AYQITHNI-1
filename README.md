# ايقظني | AYQITHNI

**Smart Alert System for Fainting & Seizure Events**

نظام تنبيه ذكي لحالات الإغماء والصرع

---

## Overview

AYQITHNI ("Wake Me Up" in Arabic) is a smart emergency alert system designed for people who may experience sudden fainting or seizures (such as epilepsy). The app monitors health data in real-time and automatically notifies nearby trained volunteers when help is needed.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Google Fonts** (Tajawal for Arabic, Inter for English)

## Features

- 🌐 **Bilingual**: Full Arabic (RTL) and English (LTR) support with a one-click toggle
- 🏥 **Beneficiary Dashboard**: Health monitoring, nearby volunteers, SOS emergency button, sensor data simulation
- 🦺 **Volunteer Dashboard**: Active alert cases, response stats, certifications
- 💓 **Sensor Display**: Simulated heart rate and motion data with real-time updates
- 🔗 **Pairing System**: Connect beneficiaries with volunteers and trusted persons
- 📚 **Training Courses**: First aid courses (CPR, seizure response, fainting response) with completion badges
- 🆘 **Emergency SOS Button**: Animated big red button with confirmation modal
- 👤 **Health Profile**: Medical conditions, blood type, medications, allergies, emergency contacts

## Design

- **Colors**: Primary `#1e40af`, Medium `#3b82f6`, Light `#60a5fa`, Teal accent `#06b6d4`
- Mobile-first responsive design
- Beautiful gradient backgrounds, glass-morphism effects
- Card-based UI with shadows and rounded corners
- Smooth Framer Motion animations throughout

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Login (Beneficiary / Volunteer) |
| `/register` | Registration |
| `/dashboard/beneficiary` | Beneficiary dashboard |
| `/dashboard/volunteer` | Volunteer dashboard |
| `/profile` | Health profile management |
| `/pairing` | Pairing system |
| `/courses` | First aid training courses |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Deploy on Vercel

The app includes a `vercel.json` configuration file for seamless deployment on Vercel.

---

© 2024 ايقظني | AYQITHNI — All Rights Reserved
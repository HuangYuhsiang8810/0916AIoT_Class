# 🌐 AIoT-DA Course: Personal Web & AI Skill Dashboard (DIO)

> **Course**: AIoT & Data Analytics (AIoT-DA)  
> **Session**: DIO (Do In Class) — 2026-09-16  
> **Author / Repository**: [HuangYuhsiang8810/0916AIoT_Class](https://github.com/HuangYuhsiang8810/0916AIoT_Class.git)

---

## 📖 Project Overview

This project was developed as part of the **AIoT-DA (AIoT & Data Analytics)** in-class practical assignment (DIO). It features a modern, responsive personal website and dashboard combined with an integrated AI Agent skill (`grill-me`) for engineering decision-making.

### Core Objectives
1. **Personal Identity Showcase**: Prominently display the user's name with full customization and offline persistence.
2. **Real-Time Dynamic Clock**: Real-time temporal engine displaying hours, minutes, seconds, full localized date, and calendar metrics.
3. **Glassmorphic UI & Aesthetic Design**: Responsive dark/light theme with ambient lighting effects built with pure Vanilla web technologies.
4. **AI Agent Customization**: Implementation of Matt Pocock's `grill-me` design-tree interview skill within the `.agents` customization framework.
5. **Git Version Control**: Clean source code repository setup linked to GitHub.

---

## ✨ Key Features

### 1. Identity & Name Showcase
- **Customizable Name**: Displayed prominently in the hero section with an avatar monogram generator.
- **Interactive Profile Editor**: Click **Edit Profile** or the ✏️ pencil icon to update your Name, Bio, Active Status, and Focus Tags.
- **Client Persistence**: Profile modifications are automatically saved to `localStorage` and persist across browser reloads.

### 2. Real-Time Dynamic Clock Centerpiece
- **Precision Clock**: Continuously updates hours, minutes, and seconds using JavaScript timing loops.
- **12H / 24H Toggle**: Switch seamlessly between standard 24-hour time and 12-hour AM/PM format.
- **Date & Calendar Metrics**:
  - Full localized date (e.g. `Wednesday, September 16, 2026`).
  - Day of Year counter (`Day 259 / 365`).
  - Year progress completion visual indicator and percentage calculation.
  - ISO calendar week number (`W38`) and local UTC offset (`UTC+08:00`).

### 3. Modern Design System & Themes
- **Aesthetic**: Glassmorphism with `backdrop-filter` blurring, translucent borders, and ambient floating gradient orbs.
- **Theme Switcher**: One-click toggle between Dark Mode and Light Mode with smooth CSS variable transitions.
- **Dashboard Widgets**:
  - Today's Focus stat cards.
  - Daily Inspirational Quote generator with refresh button.
  - Quick social links (GitHub, LinkedIn, Twitter/X) and a 1-click email copy button.

### 4. Agentic Skill: `/grill-me`
- Located in `.agents/skills/grill-me/SKILL.md`.
- Implements an adversarial **Design Tree** protocol:
  - Takes a loose idea or architectural proposal and stress-tests it.
  - Asks questions strictly along the **Frontier** (decisions whose prerequisites are already settled).
  - Works in rounds with recommended trade-offs to prevent premature or flawed implementations.

---

## 📁 Repository Structure

```text
d:\Personal/
├── README.md                                   # Project documentation and DIO summary
├── index.html                                  # Semantic HTML5 document structure
├── styles.css                                  # Glassmorphic CSS design system
├── app.js                                      # Clock engine, theme manager & profile logic
├── .gitignore                                  # Standard Git ignore definitions
└── .agents/
    └── skills/
        └── grill-me/
            ├── SKILL.md                        # AI agent skill definition & interview protocol
            └── references/
                └── grill-me-doc.md             # Reference guide & documentation
```

---

## 🚀 Getting Started

### Method 1: Local HTTP Server (Recommended)
You can run any local static HTTP server:
```bash
# Python 3
python -m http.server 8080

# Or Node.js
npx serve .
```
Then open your browser to: **[http://localhost:8080](http://localhost:8080)**

### Method 2: Direct File Launch
Simply double-click `index.html` in your file explorer to open it in your default web browser (Edge, Chrome, Firefox, Safari).

---

## 🛠️ Technology Stack

- **Markup**: HTML5 (Semantic elements, accessibility landmarks)
- **Styling**: Vanilla CSS3 (Custom properties, CSS Grid, Flexbox, Glassmorphism, Keyframe animations)
- **Scripting**: Vanilla JavaScript (ES6+, DOM manipulation, `Date` & `Intl` APIs, `localStorage`)
- **Iconography**: Phosphor Icons
- **Typography**: Google Fonts (*Outfit*, *Plus Jakarta Sans*, *JetBrains Mono*)
- **Version Control**: Git & GitHub

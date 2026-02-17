# Smart Bookmarks 🚀

A simple, fast, and beautiful way to save your favorite links. Built with modern technology (Next.js & Supabase) and designed with a clean "Notion-like" look.

## ✨ Features

- **Easy Sign-in**: Just use your Google account. No passwords to remember.
- **Private & Secure**: Only you can see your bookmarks.
- **Instant Updates**: Your bookmarks appear on all your tabs immediately without refreshing.
- **Premium Design**: Clean white background, smooth animations, and a signature butterfly decoration.

## 🛠️ Tech Stack

- **Framework**: Next.js (The engine)
- **Database**: Supabase (The storage)
- **Styling**: Tailwind CSS (The paint)
- **Animations**: GSAP (The movement)

## 🧠 Challenges & Simple Solutions

We faced a few hurdles while building this, and here is how we fixed them in simple terms:

### 1. Same-Tab Updates
**Problem**: Sometimes when you add a bookmark in one tab, it wouldn't show up in another tab right away.
**Solution**: We used a "Broadcast" system. Think of it like a walkie-talkie for your browser tabs—as soon as one tab adds a bookmark, it tells all the others to show it instantly.

### 2. Messy Image Backgrounds
**Problem**: Adding illustrations to the dashboard created ugly white boxes around the drawings that didn't match the background.
**Solution**: We used special "Blending Modes" (like photo filters). This makes the white part of the drawings disappear so they blend perfectly into the page background.

### 3. Logged Out Randomly
**Problem**: The app would sometimes forget who you were and sign you out when you refreshed the page.
**Solution**: We fixed the "Memory" of the app (the persistent session) so it properly saves your login status even when the page reloads or redirects.

### 4. Making it Look Professional
**Problem**: The first version of the sign-up page was a bit too busy and confusing.
**Solution**: We "Simplified for Success." We removed all the distractions, made the page pure white, and used a clean blue button. We even added a beautiful butterfly to give it a unique, premium feel.

### 5. Running Out of Space
**Problem**: While building the app, our computer's "scratchpad" (memory space) got full, causing errors.
**Solution**: We performed a deep clean of temporary files and reset the system to make it run smoothly again.

---

## 🚀 Setup Instructions

1. **Environment Variables**: Add your Supabase keys to `.env.local`.
2. **Database Schema**: Run the SQL code in `supabase/schema.sql`.
3. **Run Locally**:
   ```bash
   npm install
   npm run dev
   ```

## 📝 Link
- **GitHub**: [Project Link](https://github.com/tanaydubey18/smart-bookmarks-main.git)

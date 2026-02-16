# Smart Bookmarks 🚀

A premium, innovative bookmark manager built with Next.js, Supabase, and GSAP. This project was designed to be both highly functional (real-time, secure) and visually stunning (architect-blueprint aesthetic, custom cursor animations).

## ✨ Features

- **Google OAuth Only**: Seamless, secure authentication using Google (strictly no email/password).
- **Private Bookmarks**: Row Level Security (RLS) ensures that every bookmark is private to the authenticated owner.
- **Real-time Sync**: Bookmark creation and deletion reflect instantly across all open tabs/devices without page refreshes.
- **Optimistic UI**: Instant visual feedback on all actions for a "lag-free" experience.
- **Innovative Design**: 
  - **Blueprint Aesthetic**: A technical graph-paper background with sketchy hand-drawn illustrations.
  - **Custom Cursor**: A smooth, trailing cursor that reacts to interactive elements.
  - **Shine Animations**: Tactile feedback on the "Save" button with light-glow effects.

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Database & Auth**: Supabase (Auth, PostgreSQL, Realtime)
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Lucide React

## 🧠 Problems & Solutions (Submission Requirement)

During the development of this project, several technical challenges were encountered and resolved:

### 1. Real-time Synchronization Conflicts
**Problem**: Using Next.js Server Actions with `revalidatePath` while also maintaining a client-side real-time subscription caused "flickering" and race conditions where the UI would revert to stale data before the real-time event arrived.
**Solution**: Switched to a unified client-side state management pattern using a custom `useBookmarksRealtime` hook. I implemented an Optimistic UI strategy for inserts/deletes and strictly handled all data synchronization through Supabase Realtime callbacks, eliminating the need for server-side revalidation.

### 2. Middleware Cookie Persistence
**Problem**: Upon refreshing a user's session in the middleware using Supabase's `updateSession`, the new session cookies were often "lost" during subsequent `NextResponse.redirect` calls, causing users to be signed out repeatedly.
**Solution**: I refactored the middleware to manually intercept the refreshed session cookies from the response and explicitly copy them into the final `NextResponse.redirect` object. This ensured that the browser received and saved the refreshed session tokens even during internal redirects.

### 3. Environment Constraints (ENOSPC)
**Problem**: The local development environment reached 100% disk capacity during the visual refresh phase, causing Turbopack to panic and the server to return 500 errors.
**Solution**: I diagnosed the `ENOSPC` (Error No Space) issue and performed aggressive disk cleanup. I successfully retrieved space by purging the `.next` and `node_modules/.cache` directories and implemented a more efficient build/restart strategy to keep the development server stable.

### 4. High-Performance Custom Cursor
**Problem**: Standard custom cursor implementations can feel "laggy" or jittery on web pages, often blocking actual mouse interactions.
**Solution**: I built a GSAP-powered cursor system using two decoupled elements (a dot and a trailing ring). By using GSAP's `power2.out` easing for the trailing ring and setting `pointer-events: none`, I achieved a high-performance "buttery smooth" experience that feels innovative without interfering with the user's ability to browse.

---

## 🚀 Setup Instructions

1. **Environment Variables**: Clone the `.env.example` into `.env.local` and add your Supabase URL and Anon Key.
2. **Database Schema**: Run the SQL found in [`supabase/schema.sql`](file:///Users/tanishqdubey/Desktop/Company%20/Astrabit/smart-bookmarks/supabase/schema.sql) in your Supabase SQL Editor.
3. **Realtime**: Enable Realtime for the `bookmarks` table in your Supabase Dashboard:
   ```sql
   ALTER PUBLICATION supabase_realtime ADD TABLE public.bookmarks;
   ```
4. **Run Locally**:
   ```bash
   npm install
   npm run dev
   ```

## 📝 Submission Details
- **GitHub**: [Link to public repo](https://github.com/tanaydubey18/smart-bookmarks-main.git)
- **Live URL**: [Link to Vercel deployment]

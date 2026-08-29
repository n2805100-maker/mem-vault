# Memory Vault — Build Notes

## What this is
A Figma Make export (React + Vite + TypeScript + Tailwind) of a "Memory Vault"
app: record/save personal memories (voice + text), timeline, "life book",
profile. All screens are currently a hard-coded, click-through demo — no
real login, no real saving, no real audio recording yet.

## Goal
A real public app with:
- Sign up / login via email+password AND Google/Apple
- Real saving of memories (per-user, private)
- Real audio recording, saved permanently
- Deployed to a live web address

## Done so far
- Created a free Supabase project (handles auth + database + file storage).
- Project URL and anon public key saved in `.env` (already gitignored — never commit it).
- Added `src/lib/supabaseClient.ts` — the connection helper.
- Added `@supabase/supabase-js` to package.json dependencies (not yet installed —
  run `npm install` or `pnpm install` once you have this open somewhere with
  internet access).

## Not done yet (next steps, roughly in order)
1. `npm install` (or `pnpm install`) to pull in the new dependency.
2. In Supabase dashboard → Authentication → Providers: enable Email, Google, Apple.
3. In Supabase dashboard → Table Editor: create a `profiles` table and a
   `memories` table (owner_id, title, content, audio_url, created_at, etc.),
   with Row Level Security so each user only sees their own rows.
4. Build a real Sign Up / Log In screen (replace the current `welcome` /
   `choose-who` flow's fake state) using `supabase.auth.signUp`,
   `supabase.auth.signInWithPassword`, and `supabase.auth.signInWithOAuth`
   for Google/Apple.
5. Replace `CreateProfileScreen`'s hard-coded state with real form + save to
   the `profiles` table.
6. Replace `AudioRecordingScreen`'s fake `seconds` counter with the real
   browser `MediaRecorder` API, and upload the resulting audio file to
   Supabase Storage on save.
7. Wire `MemoryPromptScreen` / `MemorySavedScreen` / `TimelineScreen` /
   `LifeBookScreen` to read/write real rows from the `memories` table
   instead of static content.
8. Deploy (Vercel is the easiest match for a Vite app) and set the same
   two env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in the
   hosting dashboard.
9. Optional: custom domain once a name is picked.

## Notes for whoever continues this (including future-me)
- User is non-technical — explain steps in plain language, avoid jargon,
  confirm before doing anything destructive.
- The `anon public` Supabase key is safe to expose in frontend code — it's
  designed for that. The `service_role` key must NEVER be used in frontend
  code or shared.

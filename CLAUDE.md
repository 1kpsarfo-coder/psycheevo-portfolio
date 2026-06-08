# psycheevo. — Manus Content Replacement Project
## CLAUDE.md · Project Brain · Read this first every session

---

## PROJECT IN ONE LINE

Replace all Manus placeholder content in the downloaded repo with real
psycheevo. brand content. Style stays exactly as Manus built it.
Only text, icons, links, and images change.

---

## DEVELOPER PROFILE

**Name:** Prince Kofi Sarfo  
**Brand:** psycheevo. (always lowercase, always with the period)  
**Role:** Creative Director & Founder  
**Location:** Accra, Ghana  
**OS:** Windows (PowerShell)  
**Project folder:** `C:\Users\PSYCHE\Documents\psycheevo-manus-project\`

---

## PROJECT FOLDER STRUCTURE

```
psycheevo-manus-project/
│
├── CLAUDE.md                     ← You are here (read first, every session)
├── CONTINUATION_BRIEF.md         ← Session state (update at end of every session)
├── PSYCHEEVO_CONTENT.md          ← All real psycheevo. content (reference for all copy)
├── MANUS_REPLACEMENT_PROMPT.txt  ← Exact code changes to make in Landing.tsx etc.
│
├── manus-repo/                   ← The downloaded Manus demo repo goes here
│   └── [user extracts manus_demo_complete.zip here]
│
├── portfolio-images/             ← Real portfolio project images (user adds these)
│   ├── project-1.jpg             → Just Sip branding
│   ├── project-2.jpg             → Blackmind Couture
│   ├── project-3.jpg             → Zentaprost
│   ├── project-4.jpg             → Kampus Crave
│   ├── project-5.jpg             → Peaceful Perks (paper bag)
│   └── project-6.jpg             → Bisa Microcredit stationery
│
└── assets/
    └── psycheevo_logo.svg        ← The actual psycheevo. SVG logo
```

---

## TECH STACK (Manus repo)

```
Framework:    React 19 + TypeScript
Styling:      Tailwind CSS v4
Bundler:      Vite
Backend:      Express + tRPC (do not touch)
Database:     Drizzle ORM + MySQL (do not touch)
Router:       Wouter
Animations:   Framer Motion (built in)
Icons:        Lucide React
Package mgr:  pnpm
Run dev:      pnpm dev
Build:        pnpm build
```

---

## TASKS — IN ORDER

### STAGE 0 — Setup (do once before any code changes)
- [ ] 0.1  Extract `manus_demo_complete.zip` into `manus-repo/` folder
- [ ] 0.2  Copy `psycheevo_logo.svg` from `assets/` to `manus-repo/manus_demo/client/public/`
- [ ] 0.3  Copy all 6 portfolio images from `portfolio-images/` to
           `manus-repo/manus_demo/client/public/portfolio/`
           (create the portfolio/ folder if it doesn't exist)
- [ ] 0.4  Run `pnpm install` inside `manus-repo/manus_demo/`
- [ ] 0.5  Run `pnpm dev` to confirm the original Manus site runs

### STAGE 1 — Content Replacement (the main work)
- [ ] 1.1  Replace `client/src/components/TopNav.tsx`
           Use exact code from MANUS_REPLACEMENT_PROMPT.txt → FILE 1 section
- [ ] 1.2  Replace `client/src/pages/Landing.tsx`
           Use exact code from MANUS_REPLACEMENT_PROMPT.txt → FILE 2 section
- [ ] 1.3  Update `client/src/App.tsx`
           Add Landing import, change "/" route from Home to Landing
           (see MANUS_REPLACEMENT_PROMPT.txt → FILE 3 section)
- [ ] 1.4  Run `pnpm dev` and verify site loads at localhost

### STAGE 2 — Portfolio Images
- [ ] 2.1  Confirm images exist in `client/public/portfolio/`
- [ ] 2.2  In Landing.tsx portfolio section, replace placeholder divs with
           real `<img>` tags pointing to `/portfolio/project-N.jpg`
- [ ] 2.3  Run `pnpm dev` and confirm all 6 portfolio images display

### STAGE 3 — Final Polish
- [ ] 3.1  Check all nav links scroll to correct sections
- [ ] 3.2  Check WhatsApp link opens correct number (+233552587956)
- [ ] 3.3  Check email link opens psycheevodesign@gmail.com
- [ ] 3.4  Test on mobile width (375px) in browser dev tools
- [ ] 3.5  Run `pnpm build` — confirm zero TypeScript errors
- [ ] 3.6  Deploy: `npx vercel --prod` from inside `manus-repo/manus_demo/`

---

## BRAND RULES (enforce in every session)

```
Brand name:    psycheevo.   ← always lowercase, always with period
Founder name:  Prince Kofi Sarfo
Email:         psycheevodesign@gmail.com
WhatsApp:      +233 55-258 7956
Location:      Accra, Ghana
Tagline:       Design That Thinks. Brands That Lead.
```

**Voice rules (enforce on any copy changes):**
- First person singular: "I build" NOT "we build"
- Short sentences: "Design That Thinks." NOT "We create thoughtful designs."
- No: "passionate", "amazing", "incredible", "we believe in"
- Yes: "precision", "rigour", "purposeful", "I build", "I design"

---

## FILE LOCATIONS (quick reference)

| What | Where |
|------|-------|
| All psycheevo. copy | `PSYCHEEVO_CONTENT.md` |
| Code replacement instructions | `MANUS_REPLACEMENT_PROMPT.txt` |
| Portfolio images | `portfolio-images/` → copy to `client/public/portfolio/` |
| Logo SVG | `assets/psycheevo_logo.svg` → copy to `client/public/` |
| Main page file | `manus-repo/manus_demo/client/src/pages/Landing.tsx` |
| Nav component | `manus-repo/manus_demo/client/src/components/TopNav.tsx` |
| Router | `manus-repo/manus_demo/client/src/App.tsx` |

---

## WHAT NOT TO TOUCH

```
❌  server/              — backend, leave entirely alone
❌  drizzle/             — database schema, leave alone
❌  client/src/components/ui/   — shadcn components, leave alone
❌  client/src/index.css        — Tailwind theme/tokens, leave alone
❌  tailwind.config.ts          — theme config, leave alone
❌  Any Tailwind className=""   — do not change CSS classes at all
❌  Any animation code          — Manus animations stay as-is
```

---

## SESSION PROTOCOL

**Start of every session:**
1. Read this CLAUDE.md first
2. Read CONTINUATION_BRIEF.md to see exact resume point
3. Confirm with user: "Picking up at [task]. Did anything change?"
4. Start immediately — no preamble

**End of every session:**
1. Update CONTINUATION_BRIEF.md with current state
2. Mark completed tasks with ✅ in that file
3. Write the exact next action clearly
4. Tell user: "Session saved. Next time say 'continue' to resume."

---

## KNOWN FACTS

- pnpm is the package manager (NOT npm or yarn)
- Vite runs on port 5173 by default (check terminal for actual port)
- The Manus repo uses Tailwind v4 (CSS-first config, not JS config file)
- `primary` and `accent` CSS variables drive all colors — do not hardcode hex values
- The site uses `wouter` for routing (not React Router)
- Auth system (OAuth, login, dashboard) is NOT needed for this portfolio use case
  — the Landing page is public-only; ignore all auth-related code

---

*psycheevo. · Manus Content Replacement · Prince Kofi Sarfo · Accra, Ghana*

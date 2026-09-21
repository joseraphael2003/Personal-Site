# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased] - 2026-09-21

### Added
- Global `EmailModalProvider` (`src/components/providers/email-modal-provider.tsx`) allowing Hero, Header ("Quick Email"), and Footer ("Send Email") to trigger the Formspree email composer without prop drilling.
- Clean `LightboxModal` component (`src/components/ui/lightbox-modal.tsx`) using Base UI Dialog for uncluttered, high-res popup views of project and musical performance images.
- Draggable marquee reels on project cards with screenshot galleries (*OpsDeck*).
- Active "See More" link on the VITRO Data Center certification card pointing directly to verified LinkedIn credential post.
- Route-level Escape key listener on `/projects` navigating smoothly back to `/` ("Return to Overview") when no modal is open.

### Changed
- Swapped Hero CTA button styles: "Quick Email" is now the primary solid emerald button (`bg-emerald-500 text-black font-bold`), and "Get Resume" is the secondary grey outline button (`border-neutral-700 bg-neutral-900/60`).
- Updated Hero GitHub and LinkedIn social link typography to match email button styling (`text-neutral-200 hover:text-white`).
- Replaced Work timeline line-and-dots with clean left-accent borders (`border-l-emerald-500` active, `border-l-neutral-700` historical).
- Replaced Work full-length outline banner with a compact solid emerald button (`bg-emerald-500 text-black font-bold`).
- Upgraded Work accordion transition to spring physics (`stiffness: 150, damping: 22`) for smooth expansion without layout snap.
- Upgraded Projects "View Complete Project Archive" button to full-width solid emerald styling.
- Renamed navbar "Hire Me" button to "Quick Email" across desktop and mobile menus, wired to the Formspree modal.
- Converted footer "Send Email" CTA into a direct trigger for the Formspree modal.

### Removed
- Removed bloat caption `PORTRAIT FRAMERATIO 4:5` from Hero portrait frame.
- Removed `[CURRENT ROLE]` and `[PRIOR ROLE]` text badges from Work role cards.
- Removed `Confidential Commercial Asset` fallback text from commissioned project cards.
- Removed Other Involvement subheader text paragraph.
- Removed Other Involvement 3 subcontainer highlights per card, focusing layout directly on descriptions and media.
- Removed bloat telemetry badges `LIVE ARCHIVE // N CAPTURES` and `VERIFIED` from Other Involvement cards.
- Removed `Ateneo de Naga University · Class of 2027` text from Footer identity column.

---

## [Remodel v1] - 2026-09-20
### Added
- Real portrait integration (`public/profile.png`) rendered via Next.js `<Image>` inside a 4:5 aspect ratio frame with emerald technical reticles.
- "GitHub" and "LinkedIn" text labels beside their SVG icons in the Hero contact row.
- New **Certifications** section (`src/components/sections/certifications.tsx`) rendering credentials for:
  - VITRO Inc. Academy: Certified Data Center Specialist (Top 10% Class Honors).
  - Cisco Networking Academy: CCNA: Introduction to Networks (verified Credly link).
  - Cisco Networking Academy: CCNA: Switching, Routing, and Wireless Essentials (verified Credly link).
- New **Other Involvement** section (`src/components/sections/other-involvement.tsx`) showcasing:
  - Ateneo de Naga University Symphonic Band (Vice President, Section Leader, Librarian).
  - Celestial Carabaos (Guitarist on EP *Pedagogy of Desire*, featuring "With You Tonight" and "Morena").
  - The Masirams (Lead Guitarist for live sets at Ateneo Open House and university festivities).
- Interactive **Draggable Marquee** (`src/components/ui/draggable-marquee.tsx`) powered by GSAP with momentum physics and continuous looping, integrated into `GalleryModal` and involvement photo reels.
- Clean URL Navigation (Option B) with smooth-scrolling anchor interceptor and `IntersectionObserver` active section tracking in `header.tsx`.
- High-visibility Career Ledger expand/collapse banner in `work.tsx` with emerald outline and pulsing indicator.

### Changed
- Removed all pre-heading uppercase green eyebrow labels across all 7 sections (`work`, `projects`, `skills`, `education`, `github-activity`, `other-involvement`, `footer`).
- Updated "Get Resume" CTA to point to `/resume%20for%20site.pdf`.
- Simplified footer location to "Philippines" and split copyright into two stacked lines.
- Updated Education period to "Aug 2022 - Jul 2027".
- Renamed project to "Domain Scorer and Selection Tool".
- Removed "Neon Serverless" from Tech Stack Databases & Storage.
- Reorganized raw media assets from `public/temp/` into permanent `public/involvement/` and `public/certifications/` directories.

### Removed
- Superseded resume PDF `public/dichoso-developer-resume_new.pdf`.
- Obsolete `photo-archive.tsx` component and dead `memories` export.

---

## [Remodel Core] - 2026-09-20
- **2c6b692**: Configure DotGothic16, Space Mono, Base UI, and interactive telemetry preview.
- **dd92ba3**: Upgrade Next.js and eslint-config-next to 16.3.5.
- **cd78de8**: Setup Neon infrastructure, agent skills, and AGENTS.md guidelines.
- **685a8a5**: Reset legacy components and clean workspace for portfolio remodel.

---

## [Initial Iterations & Feature Additions] - 2026-01-24 to 2026-05-11

### 2026-05-11
- **ddaa2a6**: Convert Virtual Assistant descriptions to past tense.
- **6f76eb0**: Update Virtual Assistant end date to May 2026.

### 2026-05-06
- **b3e19f9**: Update Core Infrastructure content.
- **821ff78**: Expand Toolstack with Mnemosyne-related tools.
- **a6ce86c**: Move Mnemosyne to top, add Favorite status.
- **52dba7c**: Add Mnemosyne AI memory system project.

### 2026-04-08
- **e070252**: Gallery opens as inline overlay on top of its own card, update project statuses, add heatmap project.
- **527e96f**: Add heatmap project, update statuses, fix gallery modal aspect ratio.
- **07bedd5**: Add OpsDeck project, update experience and toolstack.

### 2026-02-16
- **d350bcf**: Performance optimizations: ISR caching, dynamic imports, CursorGlow optimization, rAF scroll throttling, one-shot animations.

### 2026-02-11
- **ef21608**: Exclude drizzle.config.ts from ts build.
- **0c2b932**: Add Vercel Speed Insights.

### 2026-02-02
- **d676cb0**: Upgrade drizzle-kit and restore modern config.
- **2c9a909**: Fix drizzle config for drizzle-kit 0.18.1 compatibility.
- **19bfb5c**: Integrate Vercel Analytics.

### 2026-02-01
- **f3ec308**: Update scroll spy regex to handle sharp links correctly.
- **e2cbb23**: Add power supply project and electronics toolstack.
- **ecdd483**: Add contact section with formspree integration and fix nav links.
- **0a350ad**: Optimize GPU load by reducing backdrop-blur intensity.
- **27f5a9c**: Revamp project spotlight layout, optimize mobile experience, and refine consistency.

### 2026-01-31
- **47f2f48**: Implement Cinema Mode Project Spotlight (Split Gallery).
- **f0dfadc**: Visual standardization: unified font sizes and colors.
- **5cc3dd9**: Mobile revamp: global linear layout and style refinements.
- **d397302**: Mobile optimization and performance improvements.

### 2026-01-29
- **cf36062**: UI Polish: Fonts, Headers, Toolstack, Sidebar.

### 2026-01-28
- **4e74d8c**: Backend integration with Supabase/Drizzle, dynamic home page, restored content.

### 2026-01-27
- **06e2cc1**: Enhance landing page visuals with glass overlay, scroll animations, and dynamic cursor glow.

### 2026-01-25
- **f851c15**: Refine sidebar interactions, animations, and landing page assets.

### 2026-01-24
- **5b2a74a**: Initial commit: Personal OS Portfolio with Morphing Layout, Dark Wine theme, and Supabase integration.
- **1078008**: Initial commit from Create Next App.

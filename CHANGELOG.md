# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased] - 2026-09-22

### Added
- **Radial Origin Page Transitions**: Integrated hardware-accelerated `clip-path` radial circle expansion on `/projects` navigation originating from cursor/tap coordinates with reciprocal return collapse and `prefers-reduced-motion` safety.
- **Email Modal Tactile Spring Entrance**: Wrapped `EmailModal` popup card in a Framer Motion spring transition (`initial={{ opacity: 0, scale: 0.94, y: 10 }}`) for responsive emergence upon click.
- **Lightbox Loading Synchronization & Strict Containment**: Added pulse skeleton loader with smooth 300ms decode fade-in (`opacity-0 -> opacity-100`) and 3-tier boundary containment, eliminating empty black box delays and border clipping.
- **Consolidated Multi-Viewport Automation v6**: Added `.sisyphus/evidence/pw-refinements-v6.js` validating all 8 scenarios across 360px, 390px, 768px, and 1280px viewports.
- **Inteflow Project Entry**: Added internal project management and automation tool built for Integrya Technologies with category badge `INTERNSHIP`, positioned directly below Domain Scorer.
- **Projects Archive Filter Tab**: Added dedicated "Internship" filter tab on `/projects` with custom cyan styling (`bg-cyan-500/15 border-cyan-500/40 text-cyan-400`).
- **Desktop Magnet Tabs Navigation**: Implemented Framer Motion `layoutId="active-nav-pill"` smooth sliding indicator with subtle pointer spring magnetic attraction (`useSpring`) on desktop navbar tabs.
- **Dynamic Natural Aspect Ratio Lightbox**: Overhauled `LightboxModal` to naturally size to image orientation (square, portrait, panoramic) without rigid 16:10 / 16:9 letterbox clipping.
- **Click-Origin Spring Expansion Morph**: Lightbox modal now tracks the clicked thumbnail's `DOMRect` coordinates to scale up directly from the clicked thumbnail via Framer Motion spring physics (`stiffness: 380, damping: 30`).
- **Tactical Specular Sheen on Emerald Buttons**: Added GPU-accelerated angled light sweep (`.btn-tactical-sheen`) on hover across all primary solid emerald action buttons.
- **Hero Text Shimmer**: Added continuous CSS keyframe text shimmer (`.animate-text-shimmer`) across "AVAILABLE FOR WORK" status text.
- **Next.js 16 SEO Stack**: Added `metadataBase`, OpenGraph cards, Twitter cards, canonical tags for `/` and `/projects`, dynamic `src/app/sitemap.ts`, `src/app/robots.ts`, and structured `Person` JSON-LD schema.
- **Consolidated Multi-Viewport Automation**: Added `.sisyphus/evidence/pw-refinements-v5.js` validating all 11 scenarios across 360px, 390px, 768px, and 1280px viewports.
- **Hero Mobile Compact Avatar**: Integrated a 64×64px portrait avatar directly beside the name and headline on mobile devices (`lg:hidden`) featuring retro green micro-corner reticles, bringing immediate identity into the first screen fold.
- **Mobile Multi-Viewport Automation**: Added `.sisyphus/evidence/pw-mobile.js` verifying zero horizontal overflow, avatar visibility toggles, section spacing, and marquee interactions across 390px, 360px, and 1280px viewports.
- **Project Repository (`/projects`)**: Complete overhaul to match Overview flagship cards layout, complete with indexed headers (`01 //`), badges, tech stack chips, action links, and embedded interactive `DraggableMarquee` reels for all projects with screenshots (*OpsDeck*, *Mnemosyne*, *MuBrew*, *Modular Bench Power Supply*, *Naga City Incident Heat Map*).
- **Reddit Apify Actor**: Added custom autonomous web scraping actor developed with TypeScript, Crawlee, and residential proxy rotation to Project Repository.
- **Interactive Resizable Modal**: Enabled native two-axis resizing (`resize overflow-auto`) on `EmailModal` with responsive min/max constraints, natural textarea vertical expansion (`resize-y`), and a tactile bottom-right corner resize grip.
- **Hero Attention Drawer**: Upgraded "Available for Work" status badge with enlarged scale (`text-sm px-3.5 py-1.5`), dual sonar radar ping (`animate-ping`), and luminescent emerald glow aura (`shadow-[0_0_12px_rgba(52,211,153,0.18)]`).
- **Certifications**: Featured full-width VITRO Data Center Specialist card (`src/components/sections/certifications.tsx`) with an embedded 4-photo `DraggableMarquee` reel and full-size interactive `LightboxModal`.
- Added normalized photo assets `public/certifications/vitro-3.jpg` and `vitro-4.jpg` featuring cohort graduation celebration and logo wall ceremony.
- Global `EmailModalProvider` (`src/components/providers/email-modal-provider.tsx`) allowing Hero, Header ("Quick Email"), and Footer ("Send Email") to trigger the Formspree email composer without prop drilling.
- Clean `LightboxModal` component (`src/components/ui/lightbox-modal.tsx`) using Base UI Dialog for uncluttered, high-res popup views of project and musical performance images.
- Route-level Escape key listener on `/projects` navigating smoothly back to `/` ("Return to Overview") when no modal is open.
### Changed
- **Unified Emerald Button Hover/Tap Scale Physics**: Synchronized Framer Motion `whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.97 }}` spring scaling across all primary green buttons (Hero Quick Email, Header Quick Email, Work Expand Ledger, Projects Archive CTA, Footer Send Email).
- **Navbar Magnet Contact Tab Activation**: Added passive scroll listener triggering the active navigation pill when reaching the footer (`scrollHeight - 90px threshold`) and restoring the previously intersected section on scroll up.
- **Email Modal Window Ergonomics**: Removed outer window drag resizing and fixed min-heights from `Dialog.Popup`; preserved vertical-only resizing (`resize-y`) on message textarea.
- **GitHub Activity Legend Clean-Up**: Removed redundant `"Recent contribution cadence"` label and cleanly right-aligned color swatches (`justify-end`).
- **Project Ordering & Years Alignment**: Positioned `reddit-apify-actor` directly under `social-media-dashboard` and `inteflow` directly under `domain-selector`. Set all project years to `2026` with `Modular Bench Power Supply` as the sole `2025` hardware project.
- **Header Brand Click Scroll-to-Top**: Clicking `"Jose Raphael V. Dichoso"` smoothly scrolls the window to top without reload or hash clutter.
- **Header Drawer Breakpoint Parity**: Unified mobile/tablet drawer with hamburger trigger at `lg:hidden`, guaranteeing full navigation access across 768px–1023px tablet viewports.
- **Work Role & Contact Copy**: Updated Integrya role to `Tech Intern (University Requirement)` and contact CTA to `Available for commissioned freelance software development, automation workflows, and internship opportunities.`
- **Universal Card Padding Compaction**: Reduced card padding from `p-5 sm:p-7` / `p-6 sm:p-8` down to `p-4 sm:p-6 lg:p-7` / `lg:p-8` across role, project, skills, cert, education, and involvement cards, gaining 16px of horizontal text width on phones while strictly preserving desktop padding.
- **Wrap-Safe Metadata Headers**: Updated Project and Work card headers to `flex flex-row flex-wrap sm:flex-nowrap items-start sm:items-baseline justify-between gap-2 border-b border-neutral-800 pb-2.5 sm:pb-3`, allowing long titles to wrap gracefully on mobile without crushing badges or dates, while retaining single-line nowrap alignment on desktop.
- **Tech Stack Compact Spec Layout**: Reorganized category rows to stacked label + compact tags on mobile (`flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-4 lg:gap-3`) with `px-2 py-0.5 text-xs` chips, dropping ledger height on phones from 770px down to 498px while preserving desktop column constraints.
- **Marquee Responsive Thumbnail Scale**: Sized marquee thumbnail containers to `w-32 sm:w-40 lg:w-44` (`draggable-marquee.tsx:270`), presenting a clean 128px width on mobile screens inside compact cards.
- Swapped Hero CTA button styles: "Quick Email" is now the primary solid emerald button (`bg-emerald-500 text-black font-bold`), and "Get Resume" is the secondary grey outline button (`border-neutral-700 bg-neutral-900/60`).
- Updated Hero GitHub and LinkedIn social link typography to match email button styling (`text-neutral-200 hover:text-white`).
- **Work Timeline Geometric Centering**: Re-centered micro-square pixel nodes directly over the 1px rail border (`-left-[29.5px] sm:-left-[37.5px]` active, `-left-[28.5px] sm:-left-[36.5px]` historical), eliminating the 2px leftward bias.
- **Marquee Dragging Physics**: Fixed seamless repeat pitch calculation (`singleSetWidth = widths + gap * firstSetChildren.length`) without arbitrary multipliers across `buildWrap`, `getProgressInLoop`, and `setProgressInLoop`; added low-speed release momentum damping and `onPress` coordinate synchronization to eliminate photo skipping.
- **Involvement**: Added `"Marching Leader"` to Ateneo de Naga University Symphonic Band leadership roles.
- **Work**: Under Integrya Technologies entry, replaced AWS/Slack bullet with client meeting minutes and action items documentation bullet.
- Restored Work technical vertical line rail with **Option A Micro-Square (Data Pixel) Nodes**: solid emerald square for active role and dark neutral square with subtle border for historical roles.
- Positioned Work historical timeline nodes with clipping-safe negative margin gutter compensation (`-ml-8 sm:-ml-10 pl-8 sm:pl-10`) preventing clipping inside `<motion.div overflow-hidden>`.
- Removed colored left borders on Work cards, standardizing on uniform subtle borders (`border border-neutral-800`).
- Center-aligned Work "Expand Full Career Ledger" compact emerald button.
- Converted Projects "View Complete Project Archive" CTA from full-width to an auto-width, compact solid emerald button centered underneath project cards.
- Harmonized Other Involvement typography: rebalanced card headings to `font-pixel text-lg sm:text-xl` and body descriptions to `text-sm`, matching Work and Certifications scales.
- Replaced Work full-length outline banner with a compact solid emerald button (`bg-emerald-500 text-black font-bold`).
- Upgraded Work accordion transition to spring physics (`stiffness: 150, damping: 22`) for smooth expansion without layout snap.
- Renamed navbar "Hire Me" button to "Quick Email" across desktop and mobile menus, wired to the Formspree modal.
- Converted footer "Send Email" CTA into a direct trigger for the Formspree modal.

### Removed
- **Hero Radar Ping Dot**: Removed repetitive green dual ping animation, replacing it with the subtle typography shimmer.
- **Hero Mobile Portrait Block**: Removed the 400px bottom photo block on mobile screens (`hidden lg:flex`), allowing visitors to view bio, status, and CTAs without an oversized visual dead-end.
- **Marquee Images**: Removed visual captions across all thumbnail previews and stripped caption block from `LightboxModal` for edge-to-edge viewing.
- **Project Repository Header**: Removed `COMPLETE ARCHIVE` eyebrow and bloat description paragraph.
- **Project Repository**: Removed `portfolio-v2` (`Personal Portfolio v2`) from project archive listings.
- **Formspree Modal**: Removed subtext `"Direct dispatch to Jose Raphael V. Dichoso"` and footer text `"Formspree verified endpoint"`.
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

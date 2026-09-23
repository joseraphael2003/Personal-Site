# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased] - 2026-09-22

### Added
- **Home Projects Bento Grid**: Replaced the stacked flagship list on `/` with the same 2-column bento grid the archive uses (6 cards, records `01`–`06`), so both grids share one rhythm. `#projects` gains `scroll-mt-14` so a `/#projects` return lands the section below the sticky header.
- **Shared `ProjectCard` Component**: Extracted the card markup into `src/components/ui/project-card.tsx` (gallery/`hasImages` computation, index label, category badge, tech chips, marquee, action links) with a `headingLevel` prop (`h3` on the home section, `h2` on `/projects`).
- **Mnemosyne Flagship Promotion**: Moved `mnemosyne` to the end of `flagshipProjects`, closing the home grid with two full-width gallery cards (OpsDeck, Mnemosyne). The archive order and count are unchanged (9 projects, 5 wide / 4 compact).
- **Fade-and-Lift Page Transition**: Leaving a route fades a full-window cover in over 150ms, the committed route fades it out over 220ms and lifts 8px into place. Runs on a stable wrapper driven by `useAnimationControls()`, so the route subtree is never remounted; reduced motion navigates with no cover and no lift, and a 1600ms bail-out drops the cover if the route never commits.
- **Return to Projects Provenance**: "Return to Overview" and the `/projects` Escape key now call `router.back()` when the entry was reached from home — restoring the previous scroll position instead of pushing to the top — and fall back to `/#projects` otherwise. Backed by a `__ptFromHome` marker merged into the existing history state.
- **Mobile Avatar Aura**: The 64×64px mobile avatar now carries its own `Auralis` instance (`dprCap={1}`, `maxFps={30}`) above a see-through inner surface (`bg-[#0a0c0f]/60`), with exactly one tier mounted across the `lg` breakpoint.
- **Accent-Driven GitHub Heatmap**: Replaced the hard-coded green hex scale with `bg-heat-0` … `bg-heat-4` tokens mixed from `--accent-color`, so the contribution matrix and its legend follow the active preset.
- **Dynamic CSS Variable Accent System**: Introduced multi-preset accent color system (`Emerald`, `Cyan`, `Violet`, `Amber`, `Rose`) with Option A Tactical Swatch Popover in desktop navbar (`src/components/ui/accent-switcher.tsx`) and inline tactical swatch strip in mobile drawer. Driven by CSS custom properties (`--accent-color`, `--accent-glow`) and a single Tailwind v4 `@theme inline` accent family (`--color-accent`, `--color-accent-hover`, `--color-accent-soft`, `--color-accent-deep`, `--color-heat-0`…`-4`), resulting in 0ms React re-rendering overhead and zero SSR theme flash via `<head>` pre-paint script.
- **Auralis WebGL Aura Canvas**: Embedded high-performance 2D simplex noise WebGL component (`src/components/ui/auralis.tsx`) behind the Hero portrait on desktop and around the compact mobile avatar. Features dynamic uniform synchronization to the active accent color (`u_colors[3]`), configurable `dprCap` / `maxFps` limits, float32 time wrapping, and `IntersectionObserver` cancellation plus a `visibilitychange` gate that drops GPU/CPU usage to 0% when the Hero scrolls out of view or the tab is hidden. The WebGL context is released when a canvas is truly unmounted, so a breakpoint swap never stacks contexts.
- **Root Layout Page Transition Provider**: Hosts the fade-and-lift transition in a persistent `PageTransitionProvider` in `src/app/layout.tsx`. The cover renders outside the transformed content wrapper and survives route unmounts, `usePathname()` drives the commit, and the wrapper lifts through `useAnimationControls()` without ever remounting the route subtree.
- **Consolidated Multi-Viewport Automation v8**: Added `.sisyphus/evidence/pw-refinements-v8.js` validating 9 scenarios (lightbox containment, accent switcher sync, accent coverage, home bento, archive filters, fade-and-lift transition, aura lifecycle, viewport overflow, Tech Stack) across 360px, 390px, 768px, and 1280px viewports. Replaces the retired v7 suite.
- **Email Modal Tactile Spring Entrance**: Wrapped `EmailModal` popup card in a Framer Motion spring transition (`initial={{ opacity: 0, scale: 0.94, y: 10 }}`) for responsive emergence upon click.
- **Projects Archive Filter Tab**: Added dedicated "Internship" filter tab on `/projects`, driven by the accent tokens (the active tab is `bg-accent text-black`). Its category badge is outlined (`bg-transparent border border-dashed border-accent/50 text-accent-hover`) so it stays visually distinct from the filled `COMMISSIONED` badge in every preset.
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
- **Hero Attention Drawer**: Upgraded "Available for Work" status badge with enlarged scale (`text-sm px-3.5 py-1.5`) and a luminescent accent glow aura (`shadow-[0_0_12px_var(--accent-glow)]`).
- **Certifications**: Featured full-width VITRO Data Center Specialist card (`src/components/sections/certifications.tsx`) with an embedded 4-photo `DraggableMarquee` reel and full-size interactive `LightboxModal`.
- Added normalized photo assets `public/certifications/vitro-3.jpg` and `vitro-4.jpg` featuring cohort graduation celebration and logo wall ceremony.
- Global `EmailModalProvider` (`src/components/providers/email-modal-provider.tsx`) allowing Hero, Header ("Quick Email"), and Footer ("Send Email") to trigger the Formspree email composer without prop drilling.
- Clean `LightboxModal` component (`src/components/ui/lightbox-modal.tsx`) using Base UI Dialog for uncluttered, high-res popup views of project and musical performance images.
- Route-level Escape key listener on `/projects` navigating smoothly back to `/` ("Return to Overview") when no modal is open.
### Changed
- **Accent Token Cutover**: Every `emerald-*` / `cyan-*` utility in `src/` now routes through one `@theme inline` accent family — `bg-accent`, `text-accent-hover`, `text-accent-soft`, `bg-accent-deep`, the `bg-heat-0`…`-4` ramp, the shimmer gradient and the glow shadows — so a `data-accent` swap repaints every accent surface. The old `--color-emerald-400/500` theme overrides are gone, and the badge/selection/education/certification text that used to stay green now follows the preset.
- **Internship Badge Becomes Outlined**: The `INTERNSHIP` category badge is now an outline (`bg-transparent border border-dashed border-accent/50 text-accent-hover`), while `COMMISSIONED` keeps the filled accent badge (`bg-accent/15 border border-accent/40 text-accent-hover`), so the two stay distinguishable in all five presets.
- **Hero Social Hover Follows the Accent**: The Hero GitHub and LinkedIn links now hover to `hover:text-accent-hover` (over `hover:bg-neutral-900/60`), matching the email link.
- **Project Repository Dynamic Bento Grid**: Restructured `/projects` into a responsive 2-column bento grid (`src/app/projects/page.tsx`). Image-rich projects span 2 columns / full width (`col-span-1 md:col-span-2`) with interactive `DraggableMarquee`, while text-only projects form compact 1-column technical ledger cards (`col-span-1`). Stacks cleanly to 1 column on mobile.
- **Mobile Typography & Density Overhaul**: Stepped down mobile body copy and lists from flat `text-sm` (14px) to `text-xs sm:text-sm` with `leading-normal sm:leading-relaxed` across Hero, Work, Education, Projects, and Involvement. Added bold lead-in anchors (`<strong className="text-neutral-100 font-semibold">`) on work bullets, eliminating the monospace "sea of text" block while preserving desktop typography.
- **Lightbox Natural Zero-Crop Containment**: Removed conflicting `vw` caps on stage and image; applied `max-w-full max-h-[78dvh] object-contain` resolving within the popup card boundary. Eliminates side-cropping on wide monitors (1920×1080 and 1366×768) while keeping natural aspect ratios.
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
- Swapped Hero CTA button styles: "Quick Email" is now the primary solid accent button (`bg-accent text-black font-bold`), and "Get Resume" is the secondary grey outline button (`border-neutral-700 bg-neutral-900/60`).
- Updated Hero GitHub and LinkedIn social links to match the email link styling (`text-neutral-200 hover:text-accent-hover`), so the contact row shares one accent hover.
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
- Replaced Work full-length outline banner with a compact solid accent button (`bg-accent text-black font-bold`).
- Upgraded Work accordion transition to spring physics (`stiffness: 150, damping: 22`) for smooth expansion without layout snap.
- Renamed navbar "Hire Me" button to "Quick Email" across desktop and mobile menus, wired to the Formspree modal.
- Converted footer "Send Email" CTA into a direct trigger for the Formspree modal.

### Removed
- **Radial Page Transition**: Deleted `src/components/ui/radial-transition.tsx` and every `data-radial-*` cover/ring element; the fade-and-lift transition replaces it, which also removes the scrollbar-gutter edge and the per-frame filtered-layer rasterisation.
- **Vercel Skill Chip**: Removed `"Vercel"` from the "Automation & Tooling" stack. The separate "Vercel AI SDK" entry on OpsDeck is a different item and stays.
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

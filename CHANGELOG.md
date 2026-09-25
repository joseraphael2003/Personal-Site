# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased] - 2026-09-26

### Added
- **AI Tools Tech Stack Row**: New "AI Tools" category (Claude, ChatGPT) inserted before Engineering, with a `Bot` icon. Every skill category now carries an `icon: LucideIcon` field instead of a string-keyed `iconMap`, so `skills.tsx` renders `<category.icon />` directly.
- **Shared Contributions Normaliser**: `src/lib/github-contributions.ts` exports `CONTRIBUTIONS_URL`, the `ContributionLevel`/`ContributionDay`/`ContributionData` types and a pure `normalizeContributions()` that merges the three duplicated variants (cron route, DB read, client fallback) with clamped levels and no casts.
- **Cron Fail-Closed Auth**: `/api/cron/github` now returns 401 unless `CRON_SECRET` is set and the `Authorization` header matches; the upstream GitHub fetch carries a 10s `AbortSignal.timeout`, and the 500 body is a generic `{ ok: false, error: "Internal error" }` instead of leaking `error.message`. `CRON_SECRET` is set in Vercel Production.
- **DB Scripts**: `npm run db:push` and `npm run db:studio` (drizzle-kit upgraded to the modern config API), plus `import "dotenv/config"` in `drizzle.config.ts`.
- **`useLightbox` Hook**: `src/hooks/use-lightbox.ts` owns the image/origin-rect state and reset, replacing duplicated state across `projects.tsx`, `certifications.tsx`, `other-involvement.tsx` and `app/projects/page.tsx`.
- **`useCopyEmail` Hook**: `src/hooks/use-copy-email.ts` owns the copied state and its reset timer; the footer now only shows "Copied" after a successful clipboard write, falling back to `mailto:` when the clipboard API is restricted.
- **`pressableMotion` Helper**: Shared Framer Motion hover/tap spring props in `src/lib/motion.ts`, used by Hero, Header, Footer, Work and Projects.
- **`MotionProvider`**: A client `<MotionConfig reducedMotion="user">` mounted as the outermost provider in `src/app/layout.tsx`, so every Framer Motion animation (including the email modal and the page-transition cover) honours `prefers-reduced-motion`.
- **Overlay Tokens**: `--scrim` / `--on-scrim` theme tokens replace the raw black/white utilities on the lightbox, email modal and certifications overlay, keeping each site's existing opacity and `light:` override (the lightbox backdrop and stage stay dark in both themes).
- **`.env.example`**: Documents `DATABASE_URL` and `CRON_SECRET` and is un-ignored in `.gitignore`.

### Changed
- **GitHub Activity Fetch**: `github-activity.tsx` keeps fresh server props (`initialData` wins over client data whenever present) and types the client fetch with the shared normaliser — no untyped `json.*` access.
- **Heatmap Accessibility**: One `Tooltip.Provider delay={150}` wraps the grid, the cell grid is `aria-hidden` (cells keep `tabIndex={-1}`), and an `sr-only` "{total} contributions in the last year." summary sits outside the hidden subtree; the section gains `id="github"` following the sibling-section convention.
- **JSON-LD `jobTitle`**: Now reads `profile.role` from `src/data/portfolio.ts` instead of a drifted hard-coded string.
- **Email Modal Context**: Exposes only `openEmailModal`; the modal error banner is `role="alert"` with `aria-invalid`/`aria-describedby` on the fields, and the popup caps at `max-h-[92dvh]`.
- **Header Menu Semantics**: The mobile toggle carries `aria-expanded`/`aria-controls` pointing at the drawer.
- **Marquee Behaviour**: The GSAP marquee subscribes to `prefers-reduced-motion` (drag and keyboard still work, auto-advance and throw momentum stop), pauses via IntersectionObserver while off-screen, cleans up its listener/observer/ticker on unmount, and shows a `focus-visible` ring instead of `outline-none`.
- **Animate Plugin Registered**: `@plugin "tailwindcss-animate";` in `globals.css` turns the existing `animate-in` classes on, each gated with `motion-reduce:animate-none`.
- **Work Section Dedupe**: `work.tsx` extracts `RoleCard` and `Bullet`, so the rail-dot offsets exist once instead of triplicated markup.
- **Docs**: AGENTS.md (§3–§7) and README rewritten to match the trimmed stack; CHANGELOG entry added.

### Removed
- **Dead Data & Types**: `specs`, `pipelineSteps`, the `ProjectSpec`/`PipelineStep` types, the `leadership` export, the `LeadershipItem` type, and `profile.phone`/`profile.website` — all unreferenced; the prose mentioning "leadership" stays.
- **Content Tables & Seed**: `experience`, `education`, `projects`, `toolstack` and `memories` dropped from `src/db/schema.ts`, `seed.ts` and `getProfileData()` deleted — the drifted duplicate of `portfolio.ts` is gone and only `github_cache` remains.
- **`neon.ts`, Neon IaC Deps & `uploads` Bucket**: Deleted the empty infrastructure-as-code policy, uninstalled `@neon/config`/`@neon/env`, and deleted the empty `uploads` bucket from the production branch (its unused `AWS_*` credentials were dropped from the local `.env`). The live DB already held only `github_cache`, so `db:push` found no changes.
- **Unused Utility Deps**: `clsx` and `tailwind-merge` uninstalled with their `cn()`-style call sites gone.
- **Redundant Exports**: `export default Auralis` and the exported `*_STORAGE_KEY` constants in `theme-toggle.tsx`/`accent-cycle.tsx` (nothing imported them; the pre-paint script uses the literal keys).
- **Stale Directories**: Root `temp/` (a stray zip) and the empty `drizzle/` leftovers removed.
- **Node Types Pinned**: `@types/node` moved to `^22` to match the Node 22 runtime requirement.

---

## [Unreleased] - 2026-09-22

### Added
- **Light Mode**: `data-theme="light"` on `<html>` paints the same components on warm paper (`#faf8f3`, ink `#1c1917`) with a darker, earthy accent set (moss `#4f6b2c`, deep teal `#1f6470`, plum `#6a3d7c`, ochre `#8a5a14`, brick `#9e2f3c`), a paper-toned Auralis palette (reversed: the 80% accent is the field and the noise swirls read as paper-light) and an opaque light text-shimmer. Dark stays the default and `prefers-color-scheme` is ignored.
- **Theme Toggle**: A sun/moon button beside the accent control in the desktop navbar and the mobile drawer. `localStorage["portfolio-theme"]` is restored by the `<head>` pre-paint script and the swap runs inside a feature-detected `document.startViewTransition` 150ms crossfade (skipped under reduced motion).
- **Accent Cycle Button**: One button walks Emerald → Cyan → Violet → Amber → Rose, labelled `Accent: <Label> (click for <Next>)` and mirrored by `data-accent` on `<html>`, replacing the popover and the mobile swatch strip.
- **Home Projects Bento Grid**: Replaced the stacked flagship list on `/` with the same 2-column bento grid the archive uses (6 cards, records `01`–`06`), so both grids share one rhythm. `#projects` gains `scroll-mt-14` so a `/#projects` return lands the section below the sticky header.
- **Shared `ProjectCard` Component**: Extracted the card markup into `src/components/ui/project-card.tsx` (gallery/`hasImages` computation, index label, category badge, tech chips, marquee, action links) with a `headingLevel` prop (`h3` on the home section, `h2` on `/projects`).
- **Mnemosyne Flagship Promotion**: Moved `mnemosyne` to the end of `flagshipProjects`, closing the home grid with two full-width gallery cards (OpsDeck, Mnemosyne). The archive order and count are unchanged (9 projects, 5 wide / 4 compact).
- **Fade-and-Lift Page Transition**: Leaving a route fades a full-window cover in over 150ms, the committed route fades it out over 220ms and lifts 8px into place. Runs on a stable wrapper driven by `useAnimationControls()`, so the route subtree is never remounted; reduced motion navigates with no cover and no lift, and a 1600ms bail-out drops the cover if the route never commits.
- **Return to Projects Provenance**: "Return to Overview" and the `/projects` Escape key now call `router.back()` when the entry was reached from home — restoring the previous scroll position instead of pushing to the top — and fall back to `/#projects` otherwise. Backed by a `__ptFromHome` marker merged into the existing history state.
- **Mobile Avatar Aura**: The 64×64px mobile avatar now carries its own `Auralis` instance (`dprCap={1}`, `maxFps={30}`) above a see-through inner surface (`bg-[#0a0c0f]/60`), with exactly one tier mounted across the `lg` breakpoint.
- **Accent-Driven GitHub Heatmap**: Replaced the hard-coded green hex scale with `bg-heat-0` … `bg-heat-4` tokens mixed from `--accent-color`, so the contribution matrix and its legend follow the active preset.
- **Dynamic CSS Variable Accent System**: One `@theme inline` accent family (`--color-accent`, `--color-accent-hover`, `--color-accent-soft`, `--color-accent-deep`, `--color-heat-0`…`-4`) driven by CSS custom properties (`--accent-color`, `--accent-hover`, `--accent-glow`, `--accent-muted`) across five presets, so a `data-accent` swap repaints every accent surface with zero React re-rendering and no SSR flash — the `<head>` pre-paint script restores the stored preset before first paint, and each preset has its own earthy light values.
- **Auralis WebGL Aura Canvas**: Embedded high-performance 2D simplex noise WebGL component (`src/components/ui/auralis.tsx`) behind the Hero portrait on desktop and around the compact mobile avatar. Features dynamic uniform synchronization to the active accent color (`u_colors[3]`), configurable `dprCap` / `maxFps` limits, float32 time wrapping, and `IntersectionObserver` cancellation plus a `visibilitychange` gate that drops GPU/CPU usage to 0% when the Hero scrolls out of view or the tab is hidden. The WebGL context is released when a canvas is truly unmounted, so a breakpoint swap never stacks contexts.
- **Root Layout Page Transition Provider**: Hosts the fade-and-lift transition in a persistent `PageTransitionProvider` in `src/app/layout.tsx`. The cover renders outside the transformed content wrapper and survives route unmounts, `usePathname()` drives the commit, and the wrapper lifts through `useAnimationControls()` without ever remounting the route subtree.
- **Consolidated Multi-Viewport Automation v9**: `.sisyphus/evidence/pw-refinements-v9.js` validates 11 scenarios (lightbox containment, theme and accent controls, accent coverage, home bento, archive filters, fade-and-lift transition, aura lifecycle, viewport overflow, Tech Stack, light mode, token grep) across 360px, 390px, 768px and 1280px viewports. Replaces the retired v8 suite.
- **Email Modal Tactile Spring Entrance**: Wrapped `EmailModal` popup card in a Framer Motion spring transition (`initial={{ opacity: 0, scale: 0.94, y: 10 }}`) for responsive emergence upon click.
- **Projects Archive Filter Tab**: Added dedicated "Internship" filter tab on `/projects`, driven by the accent tokens (the active tab is `bg-accent text-black`). Its category badge is outlined (`bg-transparent border border-dashed border-accent/50 text-accent-hover`) so it stays visually distinct from the filled `COMMISSIONED` badge in every preset.
- **Desktop Magnet Tabs Navigation**: Implemented Framer Motion `layoutId="active-nav-pill"` smooth sliding indicator with subtle pointer spring magnetic attraction (`useSpring`) on desktop navbar tabs.
- **Dynamic Natural Aspect Ratio Lightbox**: Overhauled `LightboxModal` to naturally size to image orientation (square, portrait, panoramic) without rigid 16:10 / 16:9 letterbox clipping.
- **Click-Origin Spring Expansion Morph**: Lightbox modal now tracks the clicked thumbnail's `DOMRect` coordinates to scale up directly from the clicked thumbnail via Framer Motion spring physics (`stiffness: 380, damping: 30`).
- **Specular Sheen on Accent Buttons**: Added a GPU-accelerated angled light sweep (`.btn-accent`) on hover across all primary solid accent action buttons.
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
- **Semantic Colour and Font Tokens**: Every neutral utility, raw hex, `text-black` and `font-pixel`/`font-mono` usage in live `src/` code now routes through the theme tokens (`bg-page`, `bg-surface`, `text-ink`, `text-body`, `text-muted`, `border-edge`, `bg-chip`, `text-on-accent`, …) and the `font-display` / `font-text` families. One `@theme inline` family drives both themes, the `light:` variant carries the light-only fixes, and the T1 token grep returns zero lines.
- **Card Titles Use Space Mono Bold**: The in-card title headings (project cards, work roles, education degree, certification titles, involvement organisations) move from `font-display` to `font-text font-bold` at one size — `text-base sm:text-lg` (16px mobile / 18px desktop) — in both themes, with the project titles keeping their upper case. Page, section, header, footer and modal headings stay DotGothic16.
- **Footer Copy**: Now reads `Available for remote jobs, commissioned freelance software development, automation workflows, and internship opportunities.`
- **On-Accent Text Split by Theme**: Filled accent buttons and the active archive filter tab use black text in dark and white text in light, from one `--on-accent` token with no per-preset exception.
- **Light Text Shimmer**: The status-pill shimmer gets an opaque light gradient (solid `--accent-hover` ends, a `color-mix(--accent-color 50%, --page)` middle stop) so the glint stays visible on paper; the dark stops are unchanged.
- **Marquee Thumbnails Un-Dimmed**: The idle `opacity-70 hover:opacity-100` on reel thumbnails is dropped in both themes, so thumbnails are always fully opaque and the selected one keeps its accent border and ring.
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
- **Retired Accent Chrome**: Deleted `src/components/ui/accent-switcher.tsx` — its desktop `Popover` (five `aria-pressed` swatch rows) and the mobile drawer swatch strip are both replaced by the one accent cycle button — and renamed the `.btn-tactical-sheen` class to `.btn-accent` (same sheen, now token-driven).
- **Unused Components**: Deleted `src/components/ui/gallery-modal.tsx`, `spec-tabs.tsx` and `architecture-pipeline.tsx` (no importers anywhere in `src/`).
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

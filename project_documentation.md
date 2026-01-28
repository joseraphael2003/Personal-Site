# Project Documentation: "The Personal OS" Portfolio

## 1. Project Identity
**Name:** The Personal OS
**Concept:** A futuristic, "living system" portfolio that behaves like a high-end operating system interface. It emphasizes fluid motion, glassmorphism, and reactive visuals over static content.
**Aesthetic:** Dark Wine / Cyber-Glass. (Deep reds, blurs, white monospaced accents).

## 2. Technology Stack
The project is built on the absolute latest bleeding-edge React ecosystem (Next.js 16 + React 19).

| Component | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.1.4` | Server/Client Component Architecture |
| **Core** | React | `19.2.3` | UI Library |
| **Styling** | Tailwind CSS | `4.x` / `3.x` | Utility-first styling with custom "Dark Wine" palette |
| **Animations** | Framer Motion | `12.29.0` | Complex orchestrations (scroll linking, particles) |
| **Icons** | Lucide React | `0.563` | Consistent, clean iconography (Network, Cpu, etc.) |
| **Database** | Drizzle ORM | `0.45.1` | Type-safe SQL builder for Postgres |
| **Backend** | PostgreSQL | `8.x` | Database (Supabase ready) |
| **Type Safety**| TypeScript | `5.x` | Strict typing across the entire stack |

## 3. Core Architecture
The application layout diverges from standard websites, treating the browser window as a "viewport" into the OS.

### A. The "Glass Overlay" Layout Pattern
Instead of a traditional scroll-down page, the site employs a **Morphing Viewport**:
1.  **Fixed Hero Layer (`z-0`)**: The initial view ("Standard Output") is fixed. It does not scroll away; it blurs and dims.
2.  **Scrollable Overlay (`z-10`)**: The content ("System Architecture") slides **over** the fixed hero like a glass pane.
3.  **Implementation**: managed in `Scaffold.tsx` using scroll listeners to toggle `dimmed` and `scrolled` states.

### B. Reactive Visuals
*   **Cursor Glow (4-Quadrant Metadata)**: A custom particle system (`CursorGlow.tsx`) that generates mirrored "champagne" particles in all four quadrants of the screen based on cursor movement.
*   **Dynamic Dimming**: The particle system is aware of the scroll state. It dims automatically when the user reads text in the overlay section to preserve readability.

### C. File Structure
```
src/
├── app/
│   ├── layout.tsx       # Global Fonts (Sora + Geist Mono) & metadata
│   ├── page.tsx         # Main Landing (Hero + Core Infrastructure Grid)
│   └── globals.css      # Tailwind directives & global variables
├── components/
│   ├── layout/
│   │   ├── hero.tsx     # The fixed "Standard Output" intro
│   │   └── scaffold.tsx # The Logic Brain (Scroll state manager)
│   ├── nav/
│   │   └── sidebar.tsx  # Vertical navigation (Home, About, Connect)
│   └── ui/
│       └── cursor-glow.tsx # The particle system engine
├── db/
│   ├── index.ts         # Drizzle connection pool
│   └── schema.ts        # Database definitions (Users, Messages, etc.)
└── lib/
    └── utils.ts         # Tailwind merger helper
```

## 4. Current Feature Set (v0.1.0)
### Implemented ✅
*   **Hero Section**: Typewriter effect with "Init..." sequence.
*   **Core Infrastructure**: 4-column grid detailing skills (Networks, Hardware, Software, Leadership).
*   **Visuals**:
    *   Glassmorphism blur effects (`backdrop-blur-xl`).
    *   Staggered entrance animations for content cards.
    *   Reverse-scroll animations (elements animate out when scrolling up).
    *   Escaped JSX characters for terminal-style text.
*   **Navigation**: Sidebar navigation with hover states.

### Upcoming Roadmap 🚀
*   **Backend Integration**: Connecting Drizzle to Supabase to fetch "Live Project Status".
*   **Audio Output**: A visualizer component for the music section.
*   **Contact Terminal**: A working command-line style contact form.

## 5. Development Guide
### Running Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# > Ready on http://localhost:3000
```

### Database Management
```bash
# Generate migrations
npx drizzle-kit generate

# Push to Supabase
npx drizzle-kit push
```

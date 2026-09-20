# Future Roadmap & Technical Considerations (TBD)

## 1. Multi-Track Persona Architecture (Option C)

### Overview
Enable the portfolio to showcase two distinct technical profiles from a single deployment (`jrdichoso.vercel.app`) without fragmenting the codebase:
- **Primary Track**: Freelance Full-Stack Developer & Automation Specialist (Current Default).
- **Secondary Track**: Networks, Infrastructure & Data Center Engineering (Showcasing VITRO Academy Top 10% certification, Cisco networking, hardware engineering, and data center operations).

### Implementation Strategy

#### Phase 1: Header Track Switcher (Client & Query State)
- **UI Element**: A compact, high-contrast toggle in the global header or hero context bar:
  `[Track: Full-Stack Developer]` <-> `[Track: Networks & Hardware]`
- **State Handling**:
  - Controlled via URL search parameter: `?track=networks` vs `?track=dev` (default).
  - Persisted in browser cookies or localStorage for returning visitors.
- **Dynamic Content Swapping**:
  - **Hero**: Swaps primary headline and value proposition between client-focused automation engineering and systems/network engineering.
  - **Featured Projects**:
    - `dev`: Social Media Dashboard, Domain Selector Tool, OpsDeck.
    - `networks`: Modular Bench Power Supply (KiCAD PCB), Naga City Heat Map, VITRO Data Center Topology.
  - **Skills Matrix**: Reorders domain priority to elevate Cisco IOS, subnetting, Tier standards, and hardware diagnostics to the first column.
  - **Experience & Education**: Elevates VITRO Academy credentials and symphonic band operational leadership to prominent positions.

#### Phase 2: Domain-Level Routing (Future Custom Domain)
- When a custom domain is attached (e.g. `jrdichoso.com`):
  - `dev.jrdichoso.com` automatically rewrites to the developer track via Next.js `middleware.ts`.
  - `net.jrdichoso.com` (or `infra.jrdichoso.com`) rewrites to the networks track.
  - Root `jrdichoso.com` defaults to the freelance developer track with the track toggle readily accessible.

---

## 2. Project Media & Confidentiality Protocols

### Commissioned Client Work
- Client tools (such as the Italian Agency Social Media Dashboard and the US SEO Domain Selector) involve proprietary business logic and client IP.
- Strategy: Present these projects purely through architectural flowcharts, technical specification tabs, and concrete business outcomes. Omit screenshots and media buttons entirely rather than displaying empty states.

### Personal & Open-Source Projects
- Personal projects (OpsDeck, Mnemosyne, Modular Power Supply, MuBrew) feature interactive image gallery modals.
- Media trigger: `[View Gallery (N)]` button with a camera or photo icon.
- Modal experience: Base UI Dialog with full keyboard navigation (Escape to close, Left/Right arrow navigation) and high-resolution figure captions.

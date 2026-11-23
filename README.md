# Aurelia Estates — Premium Luxury Real Estate & Architectural Development

A complete, production-grade luxury real estate web application built with **React, Vite, Tailwind CSS, Lucide React, and React Hook Form**, featuring a **cinematic scroll-controlled 235-frame construction hero animation** powered by HTML5 Canvas.

---

## 🏛️ Project Highlights

- **Cinematic Canvas Frame Scroll Animation**: 235 sequential construction frames mapped to scroll progress (0% empty land → 100% finished luxury estate).
- **Smooth High-DPI Rendering**: 2D Canvas context with device pixel ratio scaling, cover-style aspect ratio fitting, and requestAnimationFrame batching.
- **Smart Progressive Frame Caching**: Bounded in-memory image cache with surrounding frame preloading, zero blank frames, and reverse scrubbing support.
- **Complete Route Architecture**:
  - `/` — Homepage with all 12 custom sections
  - `/about` — About Us, story, milestones, vision, values, and leadership
  - `/properties` — Dynamic catalog with multi-facet filters (type, status, bedroom count, sorting, search)
  - `/properties/:slug` — Deep property details with interactive photo gallery, specs, amenities, and enquiry prefill
  - `/projects` — Landmark portfolio with status filtering (Completed, Ongoing, Upcoming)
  - `/services` — 6 architectural capabilities with benefit breakdowns and CTAs
  - `/how-we-work` — 8-stage acquisition process timeline with interactive FAQ
  - `/contact` — Office directory, business hours, interactive Google Map, and validated contact form
  - `/enquire` — Dedicated conversion-optimized consultation page with WhatsApp handoff
  - `/privacy-policy` & `/terms-and-conditions` — Compliant legal documentation pages
  - `*` — 404 Not Found sanctuary page
- **Private Concierge Handoff**: Formatted, URL-encoded WhatsApp direct messaging and optional `mailto:` fallback without fake backend submissions.
- **Floating Contact Dock**: Desktop and mobile floating widget with instant WhatsApp, direct phone call, and enquiry triggers.

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| Framework | **React 18** (Functional Components + Hooks) |
| Bundler & Dev Server | **Vite 6** |
| Styling | **Tailwind CSS v3.4.17** + PostCSS + Autoprefixer |
| Routing | **React Router DOM v6.29** (`BrowserRouter`, `NavLink`, `useParams`, `useSearchParams`) |
| Icons | **Lucide React** |
| Form Validation | **React Hook Form** |
| Animation & Rendering | **HTML5 Canvas 2D API** + **IntersectionObserver API** + CSS transitions |

---

## 📂 Project Structure

```
real_state/
├── public/
│   ├── assets/
│   │   ├── frames/              # 235 imported sequential construction frames (frame-001.jpg .. frame-235.jpg)
│   │   ├── images/hero/         # land-before.jpg, house-after.jpg (static fallbacks)
│   │   └── videos/              # optional video fallbacks
│   ├── favicon.svg              # Aurelia gold compass brand icon
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── import-frames.mjs        # Automated Desktop frame discovery & manifest generation script
├── src/
│   ├── components/
│   │   ├── common/              # SectionHeading, PropertyCard, ProjectCard, EnquiryForm, etc.
│   │   ├── home/                # ConstructionHero, ConstructionCanvas, HeroOverlay, and 11 sections
│   │   └── layout/              # Navbar, Footer, PageLayout, ScrollToTop
│   ├── data/
│   │   ├── constructionFrames.js # Auto-generated manifest of verified imported frame paths
│   │   ├── siteConfig.js        # Centralized business phone, email, WhatsApp, address, stats
│   │   ├── properties.js        # Realistic fictional luxury properties
│   │   ├── projects.js          # Landmark projects data
│   │   ├── services.js          # Services & benefits
│   │   ├── testimonials.js      # Client reviews
│   │   └── faqs.js              # Frequently asked questions
│   ├── hooks/
│   │   ├── useConstructionFrames.js # Progressive frame loader & bounded cache
│   │   ├── useScrollProgress.js     # Normalized [0, 1] sticky scroll progress tracker
│   │   └── useMediaQuery.js         # Responsive detection & prefers-reduced-motion
│   ├── pages/                   # All 12 route pages
│   ├── styles/
│   │   └── globals.css          # Tailwind base layers, typography & luxury utilities
│   ├── utils/
│   │   ├── formatters.js        # Currency (₹ Cr/Lakh) and text formatting
│   │   ├── imageHelpers.js      # Fallback error handlers
│   │   └── whatsapp.js          # Pre-filled URL-encoded WhatsApp & email links
│   ├── App.jsx                  # Main router configuration
│   └── main.jsx                 # Application entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🏗️ Construction Animation Architecture

### 1. Frame Import & Manifest
- **Source location discovered**: `C:\Users\nk183\Desktop\frames_realstate`
- **Total verified frames imported**: `235` images (`ezgif-frame-001.jpg` to `ezgif-frame-235.jpg`)
- **Destination**: `public/assets/frames/frame-001.jpg` to `frame-235.jpg`
- **Manifest**: `src/data/constructionFrames.js` exports `TOTAL_CONSTRUCTION_FRAMES = 235` and an immutable array of paths.
- **Re-import script**: To import new or regenerated frames at any time, run:
  ```bash
  npm run import-frames
  ```

### 2. Scroll Physics & Sticky Pinning
- The outer container has a height of `400vh` (`ConstructionHero.jsx`).
- The internal viewport is pinned with `position: sticky; top: 0; height: 100vh`.
- As the user scrolls through the 400vh track:
  $$\text{progress} = \frac{-\text{containerRect.top}}{\text{containerRect.height} - \text{windowHeight}}$$
- Target frame index is calculated as:
  $$\text{targetIndex} = \text{round}(\text{progress} \times (\text{totalFrames} - 1))$$
- At 0% progress → Frame 1 (empty foundation ground).
- At 100% progress → Frame 235 (finished luxury modern villa).
- Reverse scrolling naturally reverses the construction progress.
- Once progress reaches 100%, continuing to scroll cleanly releases the sticky pin and naturally scrolls down to Section 2 (About Preview).

### 3. Rendering & High-DPI Scaling
- Rendered using HTML5 Canvas 2D with `imageSmoothingEnabled` and pixel ratio compensation (`window.devicePixelRatio`).
- Cover calculation ensures no stretching or black bars on ultrawide monitors or vertical smartphone screens:
  $$\text{scale} = \max\left(\frac{\text{canvasWidth}}{\text{imgWidth}}, \frac{\text{canvasHeight}}{\text{imgHeight}}\right)$$

### 4. Smart Caching & Preloading
- Frame 0 and Frame 234 are preloaded immediately.
- A sliding priority window loads frames $\pm 10$ positions around current scroll.
- Idle background loading streams the rest without blocking user interaction.
- If a frame is decoding during rapid scrubbing, the canvas retains the last valid neighbor frame, preventing flickering or white flashes.

### 5. Accessibility & Reduced Motion
- Uses the `usePrefersReducedMotion` hook.
- When `prefers-reduced-motion: reduce` is enabled, the site presents a static high-resolution architectural hero with full textual fidelity and direct CTA.

---

## 🚀 Running the Application

### Prerequisites
- Node.js (v18+ or v22+)
- npm (v9+)

### Development Server
```bash
npm run dev
```
Runs at `http://localhost:5173/` with hot module replacement (HMR).

### Production Build & Preview
```bash
npm run build
npm run preview
```
Creates an optimized production bundle in `/dist` and serves it locally.

---

## ⚙️ Customization Guide

### 1. Updating Business Contact Details
Edit `src/data/siteConfig.js`:
- Phone numbers, email, physical office address
- Google Maps embed URL
- Social media profiles

### 2. Adding / Editing Properties
Edit `src/data/properties.js`:
- Add or modify objects in the `properties` array.
- Include `slug`, `name`, `location`, `price`, `rawPrice`, `bedrooms`, `bathrooms`, `area`, `status`, `amenities`, and `images`.

### 3. Future MERN Backend Integration
- The frontend is designed with clean data separation.
- To connect a live Express/MongoDB backend:
  1. Replace `src/data/properties.js` calls with a React Query or fetch hook pointing to `/api/properties`.
  2. In `EnquiryForm.jsx`, change `onSubmit` to POST the payload to `/api/enquiries` before opening WhatsApp.

---

## 📝 Verification Checklist

- [x] 235 sequential frames located on Desktop and copied to `public/assets/frames/`
- [x] Sorted numerically (`frame-001.jpg` to `frame-235.jpg`)
- [x] Generated manifest `src/data/constructionFrames.js`
- [x] Canvas 2D frame renderer with cover scaling & high-DPI
- [x] Sticky 400vh container with scroll indicator & frame counter
- [x] All 12 homepage sections implemented in order
- [x] All 12 routes working with React Router
- [x] Working property filter by type, status, and bedrooms
- [x] Property detail page with gallery and pre-filled enquiry
- [x] React Hook Form validation with WhatsApp handoff
- [x] Floating contact widget & mobile responsive navbar
- [x] `npm run build` succeeds with 0 errors
#   r e a l _ s t a t e  
 
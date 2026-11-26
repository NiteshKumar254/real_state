# Aurelia Estates — Premium Luxury Real Estate & Architectural Development

A complete, production-grade luxury real estate web application built with **React, Vite, Tailwind CSS, Lucide React, and React Hook Form**, featuring a **cinematic scroll-controlled 235-frame construction hero animation** powered by HTML5 Canvas.

---

## 🏛️ Project Highlights

### Cinematic Canvas Frame Scroll Animation

- 235 sequential construction frames mapped to scroll progress.
- 0% progress represents empty land.
- 100% progress represents the finished luxury estate.
- Smooth scroll-controlled construction visualization.

### Smooth High-DPI Rendering

- HTML5 Canvas 2D context.
- Device pixel ratio scaling.
- Cover-style aspect ratio fitting.
- Optimized rendering using `requestAnimationFrame`.

### Smart Progressive Frame Caching

- Bounded in-memory image cache.
- Surrounding frame preloading.
- Zero blank frames.
- Reverse scroll animation support.

### Complete Route Architecture

| Route | Description |
| --- | --- |
| `/` | Homepage with 12 custom sections |
| `/about` | Company story, milestones, vision, values, and leadership |
| `/properties` | Dynamic property catalog with advanced filters |
| `/properties/:slug` | Property details, gallery, specifications, and amenities |
| `/projects` | Project portfolio with status-based filtering |
| `/services` | Six architectural capabilities with benefits and CTAs |
| `/how-we-work` | Eight-stage acquisition process and interactive FAQ |
| `/contact` | Office details, business hours, Google Map, and contact form |
| `/enquire` | Dedicated consultation page with WhatsApp integration |
| `/privacy-policy` | Privacy Policy |
| `/terms-and-conditions` | Terms and Conditions |
| `*` | Custom 404 Not Found page |

### Dynamic Property Filtering

- Property type filtering.
- Property status filtering.
- Bedroom count filtering.
- Property search.
- Sorting functionality.
- Interactive property image gallery.
- Property-specific enquiry prefill.

### Private Concierge Handoff

- Formatted WhatsApp direct messaging.
- URL-encoded enquiry information.
- Optional email fallback using `mailto:`.
- No fake backend form submissions.

### Floating Contact Dock

- Responsive desktop and mobile contact widget.
- Instant WhatsApp communication.
- Direct phone call functionality.
- Quick property enquiry access.

---

## 🛠️ Technology Stack

| Category | Technology |
| --- | --- |
| Frontend Framework | React 18 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v3.4.17 |
| CSS Processing | PostCSS + Autoprefixer |
| Routing | React Router DOM v6.29 |
| Icons | Lucide React |
| Form Validation | React Hook Form |
| Animation | HTML5 Canvas 2D API |
| Scroll Detection | IntersectionObserver API |
| Rendering Optimization | requestAnimationFrame |
| UI Transitions | CSS Transitions |

---

## 📁 Project Structure

```text
real_state/
│
├── public/
│   ├── assets/
│   │   ├── frames/
│   │   │   ├── frame-001.jpg
│   │   │   ├── ...
│   │   │   └── frame-235.jpg
│   │   │
│   │   ├── images/
│   │   │   └── hero/
│   │   │       ├── land-before.jpg
│   │   │       └── house-after.jpg
│   │   │
│   │   └── videos/
│   │
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
│
└── scripts/
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following tools are installed:

- Node.js
- npm
- Git

### Installation

Install the required project dependencies:

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Create Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🎬 Construction Animation

The website features a cinematic construction animation that
visualizes the transformation of empty land into a completed
luxury estate.

The animation is powered by:

- HTML5 Canvas.
- 235 sequential construction frames.
- Scroll-based frame progression.
- Progressive image preloading.
- High-DPI rendering.
- Reverse scroll support.
- Static image fallbacks.

---

## 📱 Responsive Design

The application is designed to support:

- Desktop screens.
- Laptops.
- Tablets.
- Mobile devices.

---

## 📞 Contact & Enquiry

The application provides multiple communication channels:

- WhatsApp integration.
- Direct phone calls.
- Validated contact forms.
- Property-specific enquiries.
- Google Maps integration.

---

## 🏗️ Project Scope

This project focuses on delivering a premium real estate
frontend experience with modern UI, cinematic animations,
dynamic property filtering, and seamless customer enquiries.

The current implementation is frontend-based and uses
WhatsApp and email for enquiry handoffs.

---

**Aurelia Estates — From Vision to Reality**

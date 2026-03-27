# ⚡ NEO-BRUTALIST WEBGPU PORTFOLIO

> **A living digital organism with particle swarm intelligence**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.183-black?style=flat-square&logo=three.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 🎯 Overview

This is a **Neo-Brutalist portfolio** for **Mark Anthony Tantongco** that pushes the boundaries of web development with:

- **WebGPU Compute Simulation** — Particle swarm with subgroup operations (voting, elect, broadcast, ShuffleXor)
- **React Three Fiber** — 3D particle systems and floating geometric shapes
- **GSAP Animations** — Magnetic buttons, scroll reveals, glitch effects
- **Raw Brutalist Aesthetic** — Electric #FFEA00 on void #000000, 4px borders, 8px hard shadows

---

## ✨ Features

### 🎨 Design System

| Element | Specification |
|---------|---------------|
| **Primary Color** | `#FFEA00` (Electric Yellow) |
| **Background** | `#000000` (Void Black) |
| **Borders** | 4px solid |
| **Shadows** | 8px hard offset |
| **Typography** | Monumental scale, uppercase tracking |

### 🖥️ Technical Features

- **Particle Swarm Intelligence**
  - 3000+ particles simulating WebGPU subgroup operations
  - Workgroup-based clustering (64-thread tiles)
  - Elected leaders control data flows
  - ShuffleXor for organic distribution

- **3D Scene (React Three Fiber)**
  - Real-time particle rendering with bloom effects
  - Floating geometric shapes (cube, octahedron, torus, icosahedron)
  - Dynamic grid lines
  - Post-processing with EffectComposer

- **GSAP Animations**
  - Magnetic button attraction
  - Scroll-triggered reveals
  - Glitch text effects on hover
  - Staggered grid animations
  - Hero entrance sequences

- **Interactive Elements**
  - Custom electric cursor with magnetic attraction
  - Command palette (Ctrl+K)
  - Floating action buttons (back-to-top, contact, GitHub)
  - Project modals with detailed views
  - Contact form with validation and confetti celebration

- **Accessibility**
  - Skip links for keyboard navigation
  - Reduced motion support
  - ARIA labels and semantic HTML
  - Screen reader friendly

---

## 📁 Project Structure

```
neo-brutalist-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main portfolio page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles + brutalist classes
│   ├── components/
│   │   └── brutal/
│   │       ├── cursor.tsx    # Electric cursor, glitch text, typewriter
│   │       ├── scroll.tsx    # ScrollReveal, Counter, StaggerGrid
│   │       ├── sections.tsx  # Timeline, Testimonials, Performance
│   │       ├── effects.tsx   # ScrollProgress, VHS, Marquee, FloatingActions
│   │       ├── contact.tsx   # Contact form with validation
│   │       ├── showcase.tsx  # Code showcase, particle connections
│   │       ├── carousel.tsx  # Section dividers
│   │       ├── advanced.tsx  # CommandPalette, Confetti, Newsletter
│   │       └── project-modal.tsx  # Project detail modals
│   └── hooks/
│       └── useScrollAnimation.ts  # Custom scroll animation hooks
├── prisma/
│   └── schema.prisma         # Database schema (if needed)
├── public/                   # Static assets
├── package.json
├── tailwind.config.ts
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ or **Bun** 1.0+
- **npm**, **yarn**, or **bun** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/marktantongco/neo-brutalist-portfolio.git
cd neo-brutalist-portfolio

# Install dependencies
bun install
# or
npm install

# Start development server
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
bun run build
bun run start
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript 5** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **shadcn/ui** | UI component library |
| **Lucide React** | Icon library |

### 3D & Animation

| Technology | Purpose |
|------------|---------|
| **Three.js** | 3D graphics library |
| **React Three Fiber** | React renderer for Three.js |
| **@react-three/drei** | Useful R3F helpers |
| **@react-three/postprocessing** | Post-processing effects |
| **GSAP** | Professional animations |
| **ScrollTrigger** | Scroll-based animations |

### State & Data

| Technology | Purpose |
|------------|---------|
| **Zustand** | Client state management |
| **TanStack Query** | Server state management |
| **Prisma** | Database ORM |
| **Zod** | Schema validation |

---

## 🎨 Customization

### Changing Colors

Edit `src/app/globals.css`:

```css
:root {
  --brutal-yellow: #FFEA00;
  --brutal-black: #000000;
  --brutal-red: #FF0033;
  --brutal-green: #00FF66;
}
```

### Modifying Particle Count

Edit `src/app/page.tsx`:

```tsx
<ParticleSwarm count={5000} mouse={mouseRef} />
```

### Adding Projects

Edit the `projects` array in `src/app/page.tsx`:

```tsx
const projects: Project[] = [
  {
    id: "your-project",
    title: "YOUR PROJECT",
    subtitle: "Project Tagline",
    description: "Short description",
    longDescription: "Detailed description...",
    tags: ["Tech1", "Tech2"],
    icon: "zap",
    variant: "yellow",
    stats: [
      { label: "Metric", value: "Value" },
    ],
    features: [
      "Feature 1",
      "Feature 2",
    ],
    github: "https://github.com/...",
    live: "https://...",
  },
];
```

---

## 🖼️ Screenshots

### Hero Section
The hero features a full-screen 3D particle swarm with floating geometric shapes and a typewriter effect.

### Projects Grid
Project cards with brutalist styling, magnetic hover effects, and detailed modal views.

### Skills Section
Animated skill bars with GSAP and icon grid showcasing capabilities.

### Crypto Vault
Real-time volatility tracker simulating WebGPU subgroup operations.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl + K` | Open command palette |
| `Esc` | Close modals/palette |
| `Tab` | Navigate through elements |

---

## 📱 Responsive Design

- **Mobile-first** approach
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- Touch-friendly interactions
- Adaptive particle count for performance

---

## 🔧 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized
- **Bundle Size**: Tree-shaken
- **3D Performance**: Adaptive quality

---

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Docker

```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

FROM base AS build
COPY --from=install /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM base AS release
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "server.js"]
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Three.js** community for 3D web graphics
- **GSAP** for professional animation tools
- **shadcn/ui** for beautiful component patterns
- **Vercel** for seamless deployment

---

## 📞 Contact

**Mark Anthony Tantongco**

- 🌐 Website: [markanthony.dev](https://markanthony.dev)
- 📧 Email: hello@markanthony.dev
- 💼 LinkedIn: [linkedin.com/in/markanthony](https://linkedin.com)
- 🐙 GitHub: [github.com/markanthony](https://github.com)

---

<div align="center">

**[⬆ Back to Top](#-neo-brutalist-webgpu-portfolio)**

---

*Forged with raw power. Zero corporate polish.*

</div>

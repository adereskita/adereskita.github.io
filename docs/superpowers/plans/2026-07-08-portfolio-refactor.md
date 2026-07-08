# Portfolio "iOS Vibe" Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the portfolio from a bland stacked-section layout to a premium "iOS Homescreen" experience with glassmorphism, ambient motion, parallax tilt, and App Store-style project cards with skills merged in.

**Architecture:** Single-page Astro site. All visual changes happen through CSS (global.css + Tailwind utilities), component rewrites (.astro files), and two JS scripts (scroll animations + parallax tilt/glare). No new dependencies — everything uses the existing Astro + Tailwind v4 + Motion stack.

**Tech Stack:** Astro 7, Tailwind CSS v4 (via @tailwindcss/vite), Motion library, Inter font.

## Global Constraints

- No new npm dependencies. Use only `astro`, `tailwindcss`, `@tailwindcss/vite`, and `motion`.
- Tailwind v4 with `@tailwindcss/vite` plugin. Config in `tailwind.config.mjs` with custom color aliases (`custom-black`, `custom-white`, `custom-gray`).
- All animations use the `motion` library (already installed). No GSAP, no anime.js.
- Font: Inter via Google Fonts (already loaded in Layout.astro).
- Dark mode only. Base background: `#0b0b0f`.
- Mobile-responsive. All layouts must work on 320px+ screens.

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/styles/global.css` | Rewrite | Dark base, glass utility classes, ambient orb styles, scroll-indicator keyframes |
| `tailwind.config.mjs` | Modify | Add glass-related color tokens |
| `src/layouts/Layout.astro` | Modify | Add ambient orb elements to body, update script imports |
| `src/pages/index.astro` | Modify | Remove Skills import, add Footer/Dock component |
| `src/components/Header.astro` | Rewrite | Lock-screen hero with scroll indicator |
| `src/components/Experience.astro` | Rewrite | Bento-grid glass widget cards |
| `src/components/Projects.astro` | Rewrite | App Store "Today" feed layout, skills data merged into project data |
| `src/components/ProjectCard.astro` | Rewrite | Large rounded glass card with AppIcon, skill tags, parallax tilt class |
| `src/components/AppIcon.astro` | Modify | Add emoji/icon prop for each project |
| `src/components/Education.astro` | Rewrite | Compact glass widget |
| `src/components/Footer.astro` | Create | iOS dock-style social links |
| `src/components/Skills.astro` | Delete | Skills merged into ProjectCard tags |
| `src/scripts/animations.js` | Rewrite | Staggered scroll reveals with spring feel |
| `src/scripts/tilt.js` | Create (rename from glare.js) | 3D parallax tilt + glare on `.glass-card` elements |
| `src/scripts/glare.js` | Delete | Replaced by tilt.js |

---

### Task 1: Foundation — Global CSS + Tailwind Config

**Files:**
- Modify: `tailwind.config.mjs`
- Rewrite: `src/styles/global.css`

**Interfaces:**
- Produces: CSS custom properties (`--glass-bg`, `--glass-border`, `--glass-blur`), utility classes (`.glass-panel`, `.glass-card`), ambient orb styles (`.ambient-orb`), scroll indicator animation (`.scroll-indicator`)

- [ ] **Step 1: Update Tailwind config with glass color tokens**

Replace the entire contents of `tailwind.config.mjs`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'custom-black': '#0b0b0f',
        'custom-white': '#f5f5f7',
        'custom-gray': '#808080',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Rewrite global.css**

Replace the entire contents of `src/styles/global.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-blur: 20px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #0b0b0f;
  color: #f5f5f7;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  letter-spacing: -0.01em;
  overflow-x: hidden;
}

/* Glass material — static panel (no hover effect) */
.glass-panel {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 1.5rem;
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}

/* Glass material — interactive card (receives tilt.js) */
.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 1.5rem;
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
  will-change: transform;
}

.glass-card:hover {
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Glare overlay inside glass-card */
.glass-card .glare {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 255, 255, 0.06),
    transparent 40%
  );
}

.glass-card:hover .glare {
  opacity: 1;
}

/* Ambient background orbs */
.ambient-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: -1;
  animation: float-orb 20s ease-in-out infinite alternate;
}

@keyframes float-orb {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 30px) scale(0.9); }
  100% { transform: translate(10px, -20px) scale(1.05); }
}

/* Scroll indicator bounce */
.scroll-indicator {
  animation: bounce-hint 2s ease-in-out infinite;
}

@keyframes bounce-hint {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(8px); opacity: 1; }
}

/* Section spacing */
section {
  padding: 5rem 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
}

/* Scroll animation initial state (set by JS) */
.scroll-anim {
  opacity: 0;
  transform: translateY(40px);
}
```

- [ ] **Step 3: Verify build**

Run: `cd "/Users/900294/Documents/Ade Reskita/web-porto" && npx astro build 2>&1 | tail -5`

Expected: Build succeeds. Existing components still compile (they use `section-panel` class which is now gone, but they'll be rewritten in later tasks — build will still succeed since Tailwind/CSS doesn't break on missing classes).

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.mjs src/styles/global.css
git commit -m "feat: foundation — glass material CSS, ambient orb styles, dark base theme"
```

---

### Task 2: Layout + Ambient Orbs

**Files:**
- Modify: `src/layouts/Layout.astro`

**Interfaces:**
- Consumes: `.ambient-orb` class and `float-orb` keyframes from Task 1
- Produces: Ambient orb DOM elements visible behind all page content, updated script imports

- [ ] **Step 1: Rewrite Layout.astro**

Replace the entire contents of `src/layouts/Layout.astro`:

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Ade Reskita — Principal iOS Engineer" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
    <title>{title}</title>
  </head>
  <body>
    <!-- Ambient background orbs -->
    <div class="ambient-orb" style="width: 600px; height: 600px; background: rgba(30, 64, 175, 0.15); top: -10%; left: -10%;"></div>
    <div class="ambient-orb" style="width: 500px; height: 500px; background: rgba(109, 40, 217, 0.1); top: 30%; right: -15%; animation-delay: -7s;"></div>
    <div class="ambient-orb" style="width: 400px; height: 400px; background: rgba(30, 64, 175, 0.08); bottom: 10%; left: 20%; animation-delay: -13s;"></div>

    <slot />

    <script type="module" src="/src/scripts/animations.js"></script>
    <script type="module" src="/src/scripts/tilt.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Verify build**

Run: `cd "/Users/900294/Documents/Ade Reskita/web-porto" && npx astro build 2>&1 | tail -5`

Expected: Build succeeds. `tilt.js` doesn't exist yet but the script tag won't break the build (it's a client-side reference).

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: layout — ambient orbs background, updated font weights and script imports"
```

---

### Task 3: Hero — Lock Screen Header

**Files:**
- Rewrite: `src/components/Header.astro`

**Interfaces:**
- Consumes: `.scroll-indicator` class from Task 1
- Produces: Full-screen hero section with name, subtitle, and scroll hint

- [ ] **Step 1: Rewrite Header.astro**

Replace the entire contents of `src/components/Header.astro`:

```astro
---
---
<header class="h-screen flex flex-col justify-center items-center text-center relative px-4">
  <!-- Thin top line: role context -->
  <p class="text-sm tracking-[0.3em] uppercase text-custom-gray mb-6 font-light">Principal iOS Engineer</p>

  <!-- Large name — lock screen clock style -->
  <h1 class="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none">
    Ade Reskita
  </h1>

  <!-- Tagline -->
  <p class="text-lg md:text-xl text-custom-gray/80 mt-6 max-w-md font-light leading-relaxed">
    Building polished mobile experiences with Swift, SwiftUI, and clean architecture.
  </p>

  <!-- Scroll indicator — iOS home bar style -->
  <div class="absolute bottom-10 scroll-indicator">
    <div class="w-8 h-1 bg-custom-white/30 rounded-full mx-auto"></div>
  </div>
</header>
```

- [ ] **Step 2: Verify dev server renders correctly**

Run: `cd "/Users/900294/Documents/Ade Reskita/web-porto" && npx astro build 2>&1 | tail -5`

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: hero — lock screen style header with scroll indicator"
```

---

### Task 4: Experience — Bento Grid Widgets

**Files:**
- Rewrite: `src/components/Experience.astro`

**Interfaces:**
- Consumes: `.glass-panel`, `.scroll-anim` classes from Task 1
- Produces: Bento-grid experience section with glass widget cards

- [ ] **Step 1: Rewrite Experience.astro**

Replace the entire contents of `src/components/Experience.astro`:

```astro
---
const experiences = [
  {
    company: "PT MITRA INTEGRASI INFORMATIKA",
    role: "iOS Developer",
    period: "2023 – Present",
    details: [
      "Developing new features and enhancing Wondr by BNI app, a large-scale banking application.",
      "Sub-lead of PGLS iOS team — improving production stability, handling Crashlytics issues and production bugs.",
      "Implementing VIPER for modular, scalable, and testable architecture.",
    ],
    highlight: true,
  },
  {
    company: "PT PHINCON",
    role: "iOS Developer",
    period: "2022 – 2023",
    details: [
      "Delivered features and migrated from MVC to MVVM with RxSwift.",
      "Increased unit test coverage to 80% for business logic.",
      "Integrated Google Analytics for data-driven decisions.",
    ],
    highlight: false,
  },
];
---

<section id="experience" class="scroll-anim">
  <h2 class="text-sm tracking-[0.3em] uppercase text-custom-gray mb-8 font-light">Experience</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {experiences.map((exp) => (
      <div class:list={[
        "glass-panel p-6 flex flex-col",
        exp.highlight && "md:col-span-2"
      ]}>
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-xl font-semibold text-custom-white">{exp.role}</h3>
            <p class="text-custom-gray text-sm mt-1">{exp.company}</p>
          </div>
          <span class="text-custom-gray text-sm whitespace-nowrap ml-4">{exp.period}</span>
        </div>
        <ul class="space-y-2 text-custom-white/70 text-sm leading-relaxed">
          {exp.details.map((detail) => (
            <li class="flex gap-2">
              <span class="text-custom-gray/50 mt-1 shrink-0">·</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `cd "/Users/900294/Documents/Ade Reskita/web-porto" && npx astro build 2>&1 | tail -5`

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.astro
git commit -m "feat: experience — bento grid glass widget cards"
```

---

### Task 5: Projects + Skills Merge — App Store "Today" Cards

**Files:**
- Rewrite: `src/components/Projects.astro`
- Rewrite: `src/components/ProjectCard.astro`
- Modify: `src/components/AppIcon.astro`
- Delete: `src/components/Skills.astro`

**Interfaces:**
- Consumes: `.glass-card`, `.glare`, `.scroll-anim` classes from Task 1
- Produces: App Store "Today"-style project cards with skill tags, app icons, and parallax tilt target class

- [ ] **Step 1: Update AppIcon.astro**

Replace the entire contents of `src/components/AppIcon.astro`:

```astro
---
interface Props {
  emoji: string;
  size?: 'sm' | 'md';
}

const { emoji, size = 'md' } = Astro.props;
const sizeClasses = size === 'sm' ? 'w-12 h-12 text-2xl rounded-xl' : 'w-16 h-16 text-3xl rounded-2xl';
---

<div class:list={["glass-panel flex items-center justify-center shrink-0", sizeClasses]}>
  <span>{emoji}</span>
</div>
```

- [ ] **Step 2: Rewrite ProjectCard.astro**

Replace the entire contents of `src/components/ProjectCard.astro`:

```astro
---
import AppIcon from './AppIcon.astro';

interface Props {
  title: string;
  description: string;
  emoji: string;
  tags: string[];
}

const { title, description, emoji, tags } = Astro.props;
---

<div class="glass-card p-6 relative overflow-hidden group cursor-default">
  <!-- Glare overlay -->
  <div class="glare"></div>

  <!-- App icon + info -->
  <div class="flex items-start gap-4 mb-4 relative z-10">
    <AppIcon emoji={emoji} />
    <div class="min-w-0">
      <h3 class="text-xl font-semibold text-custom-white truncate">{title}</h3>
      <p class="text-custom-gray text-sm mt-1 leading-relaxed">{description}</p>
    </div>
  </div>

  <!-- Skill tags -->
  <div class="flex flex-wrap gap-2 relative z-10">
    {tags.map((tag) => (
      <span class="text-xs px-3 py-1 rounded-full bg-custom-white/5 text-custom-white/60 border border-custom-white/10">
        {tag}
      </span>
    ))}
  </div>
</div>
```

- [ ] **Step 3: Rewrite Projects.astro with merged skills data**

Replace the entire contents of `src/components/Projects.astro`:

```astro
---
import ProjectCard from './ProjectCard.astro';

const projects = [
  {
    name: "Wondr by BNI",
    description: "Large-scale banking app — feature development and production stability as PGLS sub-lead.",
    emoji: "🏦",
    tags: ["Swift", "VIPER", "RxSwift", "Crashlytics", "Jenkins"],
  },
  {
    name: "Phincon Attendance",
    description: "Enterprise attendance app built with VIP Clean Architecture.",
    emoji: "📋",
    tags: ["Swift", "VIP", "Clean Architecture", "MVVM"],
  },
  {
    name: "Game Katalog",
    description: "iOS game catalog app — Dicoding iOS Developer Expert certification project.",
    emoji: "🎮",
    tags: ["SwiftUI", "Combine", "Core Data", "TCA"],
  },
  {
    name: "Smart Care",
    description: "IoT health monitoring app — 3rd Place at OLIVIA 2019 competition.",
    emoji: "❤️‍🩹",
    tags: ["Swift", "IoT", "Bluetooth LE", "HealthKit"],
  },
  {
    name: "Shape You",
    description: "Fitness tracking app published on Google Play Store.",
    emoji: "💪",
    tags: ["Java", "Android", "Firebase", "Google Fit"],
  },
  {
    name: "Cegah Covid-19",
    description: "Web and Android application for COVID-19 information and prevention.",
    emoji: "🛡️",
    tags: ["PHP Laravel", "Android", "SQL", "REST API"],
  },
];
---

<section id="projects" class="scroll-anim">
  <h2 class="text-sm tracking-[0.3em] uppercase text-custom-gray mb-8 font-light">Featured Works</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {projects.map((p) => (
      <ProjectCard title={p.name} description={p.description} emoji={p.emoji} tags={p.tags} />
    ))}
  </div>
</section>
```

- [ ] **Step 4: Delete Skills.astro**

Run: `rm "/Users/900294/Documents/Ade Reskita/web-porto/src/components/Skills.astro"`

- [ ] **Step 5: Verify build**

Run: `cd "/Users/900294/Documents/Ade Reskita/web-porto" && npx astro build 2>&1 | tail -5`

Expected: Build will FAIL because `index.astro` still imports Skills. That's fixed in Task 7. For now, just verify the component files are syntactically correct by checking no Astro parse errors on the modified files:

Run: `cd "/Users/900294/Documents/Ade Reskita/web-porto" && npx astro check 2>&1 | tail -10`

If `astro check` isn't available, skip — the build will be verified after Task 7.

- [ ] **Step 6: Commit**

```bash
git add src/components/AppIcon.astro src/components/ProjectCard.astro src/components/Projects.astro
git rm src/components/Skills.astro
git commit -m "feat: projects — App Store Today cards with skill tags, remove standalone Skills section"
```

---

### Task 6: Education — Compact Glass Widget + Footer Dock

**Files:**
- Rewrite: `src/components/Education.astro`
- Create: `src/components/Footer.astro`

**Interfaces:**
- Consumes: `.glass-panel`, `.glass-card`, `.scroll-anim` classes from Task 1
- Produces: Compact education widget, dock-style footer with social links

- [ ] **Step 1: Rewrite Education.astro**

Replace the entire contents of `src/components/Education.astro`:

```astro
---
const education = [
  {
    school: "Telkom University",
    degree: "Bachelor's Degree, Informatics Engineering",
    period: "2020 – 2023",
    gpa: "3.40 / 4.0",
  },
  {
    school: "Telkom University",
    degree: "Diploma, Informatics Engineering",
    period: "2017 – 2020",
    gpa: "3.42 / 4.0",
  },
];
---

<section id="education" class="scroll-anim">
  <h2 class="text-sm tracking-[0.3em] uppercase text-custom-gray mb-8 font-light">Education</h2>

  <div class="glass-panel p-6">
    <div class="flex flex-col divide-y divide-custom-white/5">
      {education.map((edu, i) => (
        <div class:list={["flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1", i > 0 && "pt-4", i < education.length - 1 && "pb-4"]}>
          <div>
            <h3 class="text-base font-semibold text-custom-white">{edu.school}</h3>
            <p class="text-custom-white/60 text-sm">{edu.degree}</p>
          </div>
          <div class="text-right sm:text-right">
            <p class="text-custom-gray text-sm">{edu.period}</p>
            <p class="text-custom-white/50 text-xs">GPA: {edu.gpa}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create Footer.astro**

Create the file `src/components/Footer.astro`:

```astro
---
const links = [
  { label: "Email", href: "mailto:ade.reskita@gmail.com", icon: "✉️" },
  { label: "LinkedIn", href: "https://linkedin.com/in/adereskita", icon: "💼" },
  { label: "GitHub", href: "https://github.com/adereskita", icon: "🐙" },
];
---

<footer class="py-12 px-4 text-center">
  <!-- Dock-style links -->
  <div class="flex justify-center gap-6 mb-8">
    {links.map((link) => (
      <a
        href={link.href}
        target={link.href.startsWith("mailto") ? undefined : "_blank"}
        rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
        class="glass-card px-5 py-3 flex items-center gap-2 text-sm text-custom-white/80 hover:text-custom-white transition-colors relative overflow-hidden"
      >
        <div class="glare"></div>
        <span>{link.icon}</span>
        <span class="relative z-10">{link.label}</span>
      </a>
    ))}
  </div>

  <p class="text-custom-gray/40 text-xs">© 2026 Ade Reskita</p>
</footer>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Education.astro src/components/Footer.astro
git commit -m "feat: education compact widget + dock-style footer"
```

---

### Task 7: Page Assembly — Wire Everything Together

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: All components from Tasks 3–6

- [ ] **Step 1: Rewrite index.astro**

Replace the entire contents of `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Experience from '../components/Experience.astro';
import Projects from '../components/Projects.astro';
import Education from '../components/Education.astro';
import Footer from '../components/Footer.astro';
---

<Layout title="Ade Reskita — Principal iOS Engineer">
  <Header />

  <main class="flex flex-col gap-0">
    <Experience />
    <Projects />
    <Education />
  </main>

  <Footer />
</Layout>
```

- [ ] **Step 2: Verify full build**

Run: `cd "/Users/900294/Documents/Ade Reskita/web-porto" && npx astro build 2>&1 | tail -10`

Expected: Build succeeds with no errors. Skills import is gone. All components resolve.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: wire up all refactored components, remove Skills import"
```

---

### Task 8: Animations — Staggered Scroll Reveals + Parallax Tilt

**Files:**
- Rewrite: `src/scripts/animations.js`
- Create: `src/scripts/tilt.js`
- Delete: `src/scripts/glare.js`

**Interfaces:**
- Consumes: `.scroll-anim` class on sections, `.glass-card` and `.glare` classes on interactive cards (from Tasks 1, 4, 5, 6)
- Produces: Scroll-triggered staggered fade-in animations, 3D parallax tilt + glare effect on hover

- [ ] **Step 1: Rewrite animations.js**

Replace the entire contents of `src/scripts/animations.js`:

```js
import { scroll, animate, stagger } from "motion";

document.addEventListener("astro:page-load", () => {
  // Animate each section as it scrolls into view
  document.querySelectorAll(".scroll-anim").forEach((section) => {
    // The section itself fades in
    scroll(animate(section, { opacity: [0, 1], y: [40, 0] }, { duration: 0.8, easing: [0.25, 0.1, 0.25, 1] }), {
      target: section,
      offset: ["start 90%", "start 60%"],
    });

    // Children stagger in after the section
    const children = section.querySelectorAll(".glass-panel, .glass-card");
    if (children.length > 0) {
      scroll(
        animate(
          children,
          { opacity: [0, 1], y: [30, 0] },
          { duration: 0.6, easing: [0.25, 0.1, 0.25, 1], delay: stagger(0.08) }
        ),
        {
          target: section,
          offset: ["start 85%", "start 50%"],
        }
      );
    }
  });
});
```

- [ ] **Step 2: Create tilt.js**

Create the file `src/scripts/tilt.js`:

```js
document.addEventListener("astro:page-load", () => {
  const cards = document.querySelectorAll(".glass-card");

  cards.forEach((card) => {
    const glare = card.querySelector(".glare");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Tilt: max 6 degrees
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // Glare follows cursor
      if (glare) {
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        glare.style.setProperty("--mouse-x", `${percentX}%`);
        glare.style.setProperty("--mouse-y", `${percentY}%`);
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    });
  });
});
```

- [ ] **Step 3: Delete glare.js**

Run: `rm "/Users/900294/Documents/Ade Reskita/web-porto/src/scripts/glare.js"`

- [ ] **Step 4: Verify full build and dev server**

Run: `cd "/Users/900294/Documents/Ade Reskita/web-porto" && npx astro build 2>&1 | tail -10`

Expected: Build succeeds.

Then start dev server and verify visually:

Run: `cd "/Users/900294/Documents/Ade Reskita/web-porto" && npx astro dev --host 2>&1 &`

Open http://localhost:4321 in a browser and verify:
1. Dark background with floating blue/purple orbs
2. Lock-screen hero with name, subtitle, scroll indicator
3. Glass panel experience widgets in bento layout
4. App Store-style project cards with emoji icons and skill tags
5. Hover on cards produces 3D tilt and glare effect
6. Scrolling triggers staggered fade-in animations
7. Compact education widget
8. Dock-style footer with social links

- [ ] **Step 5: Commit**

```bash
git add src/scripts/animations.js src/scripts/tilt.js
git rm src/scripts/glare.js
git commit -m "feat: staggered scroll animations + parallax tilt with glare effect"
```

---

### Task 9: Visual Polish Pass

**Files:**
- Potentially modify any component or `global.css` based on visual review

**Interfaces:**
- Consumes: All previous tasks
- Produces: Final polished output

This is a review task. Start the dev server and open the site. Walk through each section and fix:

- [ ] **Step 1: Check responsive layout**

Open the site at 375px (mobile), 768px (tablet), and 1200px+ (desktop). Verify:
- Hero text doesn't overflow on mobile
- Bento grid collapses to single column on mobile
- Project cards stack on mobile
- Footer dock wraps gracefully

Fix any overflow or spacing issues with Tailwind responsive prefixes.

- [ ] **Step 2: Check animation smoothness**

Scroll through the page. Verify:
- No janky scroll reveals (elements should animate smoothly)
- Tilt effect is subtle (max 6 degrees) and doesn't feel laggy
- Ambient orbs don't cause scroll performance issues

If orbs cause jank, add `will-change: transform` to `.ambient-orb` in global.css.

- [ ] **Step 3: Check glass material contrast**

Verify text is readable against glass panels. If contrast is too low, increase `--glass-bg` opacity (e.g., from `0.05` to `0.08`).

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: visual polish — responsive, animation, contrast adjustments"
```

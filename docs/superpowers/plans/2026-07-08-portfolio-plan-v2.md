# Ade Reskita - Portfolio Website Implementation Plan v2

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** To build a single-page portfolio with a "Glass Morphism" design.

**Architecture:** A component-based Astro site with a dynamic CSS Grid layout.

**Tech Stack:** Astro, Tailwind CSS, Custom CSS for glass effects.

## Global Constraints

- The site must be a single page with a "glass morphism" aesthetic.
- It must be responsive and work on both mobile and desktop.

---

### Task 1: Reset and Setup for Glass Morphism Design

**Files:**
- Delete: `src/components/Header.astro`
- Delete: `src/components/Skills.astro`
- Modify: `src/pages/index.astro`
- Create: `src/styles/global.css`

**Interfaces:**
- Produces: A clean project state and the basic CSS for the glass effect.

- [x] **Step 1: Remove old components**
- [x] **Step 2: Reset the index page**
- [x] **Step 3: Create the global CSS file**
- [x] **Step 4: Update Layout to import global styles**

### Task 2: Implement New Layout and Header

**Files:**
- Create: `src/components/Header.astro`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: A new header component with glass styling and a dynamic grid layout.

- [x] **Step 1: Update the Layout for CSS Grid**
- [x] **Step 2: Create the new Header component**
- [x] **Step 3: Add the Header to the index page**

### Task 3: Create Glass-Styled Skills Component

**Files:**
- Create: `src/components/Skills.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: A skills component with glass-styled pills.

- [x] **Step 1: Create the Skills component**
- [x] **Step 2: Add the Skills component to the index page**


### Task 4: Create Glass-Styled Projects Component

**Files:**
- Create: `src/components/Projects.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: A projects component with glass-styled cards.

- [x] **Step 1: Create the Projects component**
- [x] **Step 2: Add the Projects component to the index page**

### Task 5: Create Glass-Styled Experience Component

**Files:**
- Create: `src/components/Experience.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: An interactive, glass-styled experience component.

- [x] **Step 1: Create the Experience component**
- [x] **Step 2: Add the Experience component to the index page**

### Task 6: Create Glass-Styled Education Component and Final Polish

**Files:**
- Create: `src/components/Education.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: The final portfolio page.

- [ ] **Step 1: Create the Education component**

Create `src/components/Education.astro` with the following content:

```astro
---
---
<section class="glass-panel p-8 md:col-span-3 rounded-lg">
  <h2 class="text-2xl font-bold mb-4 text-white">Education</h2>
  <div>
    <h3 class="text-xl font-semibold text-white">TELKOM UNIVERSITY</h3>
    <p class="text-gray-200">Bachelor Degree, Informatics Engineering. GPA: 3.40/4.0</p>
    <p class="text-sm text-gray-300">2020 – 2023</p>
  </div>
  <div class="mt-4">
    <h3 class="text-xl font-semibold text-white">TELKOM UNIVERSITY</h3>
    <p class="text-gray-200">Diploma, Informatics Engineering. GPA: 3.42/4.0</p>
    <p class="text-sm text-gray-300">2017 – 2020</p>
  </div>
</section>
```

- [ ] **Step 2: Add the Education component to the index page**

Modify `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Skills from '../components/Skills.astro';
import Projects from '../components/Projects.astro';
import Experience from '../components/Experience.astro';
import Education from '../components/Education.astro';
---

<Layout title="Ade Reskita - Portfolio">
  <Header />
  <div class="md:col-span-3 space-y-8">
    <Experience />
    <Skills />
    <Projects />
    <Education />
  </div>
</Layout>
```

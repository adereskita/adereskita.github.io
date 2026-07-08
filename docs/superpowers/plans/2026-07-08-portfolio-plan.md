# Ade Reskita - Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** To build a single-page portfolio website with interactive components.

**Architecture:** A component-based Astro site. Each section of the portfolio will be a separate Astro component.

**Tech Stack:** Astro, Tailwind CSS, JavaScript.

## Global Constraints

- The site must be a single page.
- It must be responsive and work on both mobile and desktop.

---

### Task 1: Project Setup & Tailwind CSS Integration

**Files:**
- Modify: `astro.config.mjs`
- Modify: `src/pages/index.astro`
- Create: `tailwind.config.mjs`
- Create: `src/styles/global.css`

**Interfaces:**
- Produces: A basic Astro project with Tailwind CSS configured.

- [ ] **Step 1: Add Tailwind CSS to the project**

Run: `npx astro add tailwind`
Expected: The command will install Tailwind CSS and create/modify the necessary configuration files. When prompted, agree to the changes.

- [ ] **Step 2: Verify Tailwind CSS installation**

Modify `src/pages/index.astro` to include a Tailwind CSS class.

```astro
---
---
<h1 class="text-3xl font-bold underline">
  Hello, World!
</h1>
```

- [ ] **Step 3: Run the development server**

Run: `npm run dev`
Expected: The development server starts. Open the provided URL in a browser and verify that "Hello, World!" is displayed with an underline and bold font.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: setup project and integrate Tailwind CSS"
```

### Task 2: Create Layout and Header Component

**Files:**
- Create: `src/layouts/Layout.astro`
- Create: `src/components/Header.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: A basic page layout and a reusable header component.

- [ ] **Step 1: Create the Layout file**

Create `src/layouts/Layout.astro` with the following content:

```astro
---
interface Props {
	title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="description" content="Ade Reskita's Portfolio" />
		<meta name="viewport" content="width=device-width" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="generator" content={Astro.generator} />
		<title>{title}</title>
	</head>
	<body class="bg-gray-100 text-gray-800">
		<div class="max-w-4xl mx-auto p-4">
			<slot />
		</div>
	</body>
</html>
```

- [ ] **Step 2: Create the Header component**

Create `src/components/Header.astro` with the following content:

```astro
---
---
<header class="text-center p-8 bg-white rounded-lg shadow-md">
  <h1 class="text-4xl font-bold">Ade Reskita</h1>
  <p class="text-lg text-gray-600">DKI Jakarta, Indonesia</p>
  <div class="flex justify-center space-x-4 mt-4">
    <a href="mailto:ade.reskita@gmail.com" class="text-blue-500 hover:underline">Email</a>
    <a href="https://linkedin.com/in/adereskita" target="_blank" class="text-blue-500 hover:underline">LinkedIn</a>
    <a href="https://github.com/adereskita" target="_blank" class="text-blue-500 hover:underline">GitHub</a>
  </div>
</header>
```

- [ ] **Step 3: Update the index page to use the Layout and Header**

Modify `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
---

<Layout title="Ade Reskita - Portfolio">
  <main>
    <Header />
  </main>
</Layout>
```

- [ ] **Step 4: Verify in the browser**

Run `npm run dev` and check the browser. You should see the new header with your name and links.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: create layout and header component"
```

### Task 3: Create Skills Component

**Files:**
- Create: `src/components/Skills.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: A component that displays skills as pills.

- [ ] **Step 1: Create the Skills component**

Create `src/components/Skills.astro` with the following content:

```astro
---
const skills = {
  "Frameworks/Libraries": ["Swift", "SwiftUI", "RxSwift", "Combine", "Texture UI", "Java", "Python", "PHP Laravel", "SQL"],
  "Architecture": ["VIPER", "MVVM", "TCA", "MVC", "VIP", "Clean Architecture"],
  "Tools": ["XCTest", "CocoaPods", "SPM", "Git", "Xcodegen", "Figma", "Google Analytics", "Jenkins", "Agentic AI and AI powered IDE"]
};
---

<section class="p-8 mt-8 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4">Skills</h2>
  {Object.entries(skills).map(([category, skillList]) => (
    <div class="mb-4">
      <h3 class="text-xl font-semibold">{category}</h3>
      <div class="flex flex-wrap gap-2 mt-2">
        {skillList.map(skill => (
          <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
            {skill}
          </span>
        ))}
      </div>
    </div>
  ))}
</section>
```

- [ ] **Step 2: Add the Skills component to the index page**

Modify `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Skills from '../components/Skills.astro';
---

<Layout title="Ade Reskita - Portfolio">
  <main>
    <Header />
    <Skills />
  </main>
</Layout>
```

- [ ] **Step 3: Verify in the browser**

Run `npm run dev` and check the browser. You should see the new skills section with categorized pills.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: create skills component"
```

### Task 4: Create Projects Component

**Files:**
- Create: `src/components/Projects.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: A component that displays projects in a card grid.

- [ ] **Step 1: Create the Projects component**

Create `src/components/Projects.astro` with the following content:

```astro
---
const projects = [
  { name: "Phincon Attendance App", description: "VIP Clean Architecture." },
  { name: "Game Katalog", description: "Dicoding iOS Certification." },
  { name: "Smart Care", description: "IoT Health App (3rd Place OLIVIA 2019)." },
  { name: "Shape You", description: "Android Fitness App published on PlayStore." },
  { name: "Cegah Covid-19", description: "Web and Android application." }
];
---

<section class="p-8 mt-8 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4">Projects</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {projects.map(project => (
      <div class="border rounded-lg p-4 hover:shadow-lg transition-shadow">
        <h3 class="text-xl font-semibold">{project.name}</h3>
        <p class="text-gray-600 mt-2">{project.description}</p>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Add the Projects component to the index page**

Modify `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Skills from '../components/Skills.astro';
import Projects from '../components/Projects.astro';
---

<Layout title="Ade Reskita - Portfolio">
  <main>
    <Header />
    <Skills />
    <Projects />
  </main>
</Layout>
```

- [ ] **Step 3: Verify in the browser**

Run `npm run dev` and check the browser. You should see the new projects section with a grid of cards.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: create projects component"
```

### Task 5: Create Experience Component

**Files:**
- Create: `src/components/Experience.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: An interactive tabbed component for work experience.

- [ ] **Step 1: Create the Experience component**

Create `src/components/Experience.astro` with the following content:

```astro
---
const experiences = [
  {
    company: "PT MITRA INTEGRASI INFORMATIKA",
    role: "iOS Developer",
    period: "Oct 2023 – Present",
    details: [
      "Developing new Features and enhancing Wondr by BNI app, a large-scale banking application.",
      "Responsible as sub-lead of PGLS (Post Go-Live Support) iOS team, improving production stability and resolving incidents by handling Crashlytics issues, and production bugs.",
      "Implementing VIPER to maintain modular, better scalability, and testable architecture.",
      "Refactored legacy modules to improve code readability, maintainability and app performance.",
      "Collaborating across Product, Design, Scrum, QA, L2,Android and Backend teams.",
      "Conduct RnD for Liveness and POC Components",
      "Migrating dependencies from CocoaPods to Swift Package Manager."
    ]
  },
  {
    company: "PT PHINCON",
    role: "iOS Developer",
    period: "Mar 2022 – Oct 2023",
    details: [
      "Delivered new features and enhancements from MVC to MVVM and RxSwift.",
      "Increased unit test coverage to 80% for business logic.",
      "Integrated Google Analytics for data-driven decisions.",
      "Fixed production issues and collaborated in Agile sprints"
    ]
  }
];
---

<section class="p-8 mt-8 bg-white rounded-lg shadow-md" id="experience-section">
  <h2 class="text-2xl font-bold mb-4">Experience</h2>
  <div class="flex border-b">
    {experiences.map((exp, index) => (
      <button class="tab-button p-4 text-gray-500" data-tab={index}>{exp.company}</button>
    ))}
  </div>
  {experiences.map((exp, index) => (
    <div class="tab-content p-4 hidden" data-tab-content={index}>
      <h3 class="text-xl font-semibold">{exp.role}</h3>
      <p class="text-sm text-gray-500 mb-2">{exp.period}</p>
      <ul class="list-disc pl-5 space-y-1">
        {exp.details.map(detail => <li>{detail}</li>)}
      </ul>
    </div>
  ))}
</section>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    function switchTab(tabIndex) {
      tabs.forEach((t, i) => {
        const content = contents[i];
        if (i == tabIndex) {
          t.classList.add('border-b-2', 'border-blue-500', 'text-gray-900');
          t.classList.remove('text-gray-500');
          content?.classList.remove('hidden');
        } else {
          t.classList.remove('border-b-2', 'border-blue-500', 'text-gray-900');
          t.classList.add('text-gray-500');
          content?.classList.add('hidden');
        }
      });
    }

    // Show first tab by default
    switchTab(0);

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => switchTab(index));
    });
  });
</script>
```

- [ ] **Step 2: Add the Experience component to the index page**

Modify `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Skills from '../components/Skills.astro';
import Projects from '../components/Projects.astro';
import Experience from '../components/Experience.astro';
---

<Layout title="Ade Reskita - Portfolio">
  <main>
    <Header />
    <Experience />
    <Skills />
    <Projects />
  </main>
</Layout>
```

- [ ] **Step 3: Verify in the browser**

Run `npm run dev` and check the browser. You should see the new experience section with tabs. Clicking the tabs should switch the content.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: create experience component"
```

### Task 6: Create Education Component and Final Polish

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
<section class="p-8 mt-8 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4">Education</h2>
  <div>
    <h3 class="text-xl font-semibold">TELKOM UNIVERSITY</h3>
    <p>Bachelor Degree, Informatics Engineering. GPA: 3.40/4.0</p>
    <p class="text-sm text-gray-500">2020 – 2023</p>
  </div>
  <div class="mt-4">
    <h3 class="text-xl font-semibold">TELKOM UNIVERSITY</h3>
    <p>Diploma, Informatics Engineering. GPA: 3.42/4.0</p>
    <p class="text-sm text-gray-500">2017 – 2020</p>
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
  <main class="space-y-8">
    <Header />
    <Experience />
    <Skills />
    <Projects />
    <Education />
  </main>
</Layout>
```

- [ ] **Step 3: Final Polish**

Review the entire page in the browser. Adjust spacing, colors, and fonts in the components and the layout file (`src/layouts/Layout.astro`) as needed for a polished look.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add education component and final polish"
```

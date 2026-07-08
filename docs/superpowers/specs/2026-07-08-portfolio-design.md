# Portfolio Website Design

- **Date:** 2026-07-08
- **Topic:** Single-Page Portfolio with Interactive Components

## 1. Overview

This document outlines the design for a single-page personal portfolio website for Ade Reskita. The goal is to create a modern, clean, and interactive site to showcase experience, skills, and projects. The project will be built using Astro and styled with Tailwind CSS.

## 2. Architecture

The site will be a single-page application (SPA-like experience) built with Astro. The structure will be component-based to ensure modularity and reusability.

- **Main Page:** `src/pages/index.astro`
- **Layout:** `src/layouts/Layout.astro` will define the overall page structure, including the header and footer.
- **Components:** Reusable components will be located in `src/components/`.

## 3. Component Breakdown

The page will be composed of the following components:

### 3.1. `Header.astro`

- **Purpose:** Displays personal branding and contact information.
- **Content:**
    - Name: "Ade Reskita"
    - Location: "DKI Jakarta, Indonesia"
    - Contact Links: Email, LinkedIn, GitHub.

### 3.2. `Experience.astro`

- **Purpose:** To display professional experience in an interactive way.
- **Functionality:**
    - A tabbed interface.
    - Tabs for each company: "PT MITRA INTEGRASI INFORMATIKA", "PT PHINCON", "CHATAJA!", "MATA MERAH STUDIO".
    - The content for the selected company will be displayed when a tab is clicked.
- **Implementation:** A small amount of client-side JavaScript will be used for the tabbing logic. This will be included within the component's `<script>` tag.

### 3.3. `Skills.astro`

- **Purpose:** To list technical skills in a visually appealing manner.
- **Functionality:**
    - Skills will be displayed as "pills" or tags.
    - Skills will be grouped into categories: "Frameworks/Libraries", "Architecture", and "Tools".

### 3.4. `Projects.astro`

- **Purpose:** To showcase a portfolio of projects.
- **Functionality:**
    - A grid of cards.
    - Each card will represent a project and contain:
        - Project Title
        - Brief Description
        - Links to the project or source code where applicable.

### 3.5. `Education.astro`

- **Purpose:** To display educational background.
- **Content:**
    - Degrees from Telkom University.
    - GPA and relevant coursework/achievements.

## 4. Data Management

All content (resume data, project details, etc.) will be hardcoded into the respective Astro components. There will be no external data source or CMS for this initial version, following the `ponytail` principle of simplicity.

## 5. Styling

- **Framework:** Tailwind CSS will be used for all styling.
- **Setup:** The `astro add tailwind` command will be used to integrate Tailwind CSS into the project.

## 6. Development Workflow

1.  Set up Tailwind CSS.
2.  Create the `Layout.astro`.
3.  Develop each component individually with hardcoded data.
4.  Assemble the components in `src/pages/index.astro`.
5.  Add client-side JavaScript for the experience tabs.
6.  Test for responsiveness across different screen sizes.

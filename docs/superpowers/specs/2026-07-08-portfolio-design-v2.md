# Portfolio Website Design v2: "Glass Morphism"

- **Date:** 2026-07-08
- **Topic:** Single-Page Portfolio with "Glass Morphism" and "Awwwards" Style

## 1. Overview

This document outlines the design for a visually ambitious single-page personal portfolio for Ade Reskita. The design will use modern CSS techniques to achieve a "glass morphism" effect, giving UI elements a frosted-glass look. The goal is a high-quality, "Awwwards"-style portfolio that is both interactive and aesthetically pleasing.

## 2. Core Concepts

- **Glass Morphism:** Key UI elements will be styled as semi-transparent panels with a `backdrop-filter` blur and a subtle border to create a sense of depth.
- **Dynamic Layout:** A CSS Grid-based layout will be used to arrange components in a more visually interesting, non-linear fashion on larger screens. The layout will be fully responsive, collapsing to a single column on mobile.
- **Subtle Animations & Interactivity:** Smooth CSS transitions on hover states for interactive elements. Entrance animations for sections as they scroll into view.
- **Typography:** A modern, clean sans-serif font stack will be used to ensure readability and complement the visual style.
- **Background:** A vibrant, abstract gradient mesh will serve as the page background. This is crucial for the glass effect to be visible.

## 3. Component Breakdown

### 3.1. `Header.astro`

- **Style:** A floating glass panel at the top of the viewport.
- **Content:** Name, location, and social/contact links.

### 3.2. `Experience.astro`

- **Style:** The container will be a large glass panel.
- **Functionality:**
    - Tabs will be styled as smaller glass buttons.
    - The active tab will have a distinct style, such as a brighter border or a subtle inner glow effect.
    - Content for each role will fade in and out smoothly on tab-switch.

### 3.3. `Skills.astro`

- **Style:** Each skill will be a small, pill-shaped glass panel.
- **Interactivity:** On hover, the pills will subtly "lift" using a `transform: scale()` effect.

### 3.4. `Projects.astro`

- **Style:** A grid of larger glass cards.
- **Interactivity:**
    - On hover, a background image related to the project will become visible through the card.
    - The card itself will have a slight tilt effect on hover, using CSS transforms.

### 3.5. `Education.astro`

- **Style:** A clean, simple glass panel, consistent with the rest of the design.

## 4. Styling & Implementation Details

- **Tailwind CSS:** Will be used for the core utility classes.
- **Custom CSS:** A `src/styles/glass.css` file will be created to house the custom CSS for the glass effect, animations, and the background gradient mesh.
- **JavaScript:** Minimal vanilla JavaScript will be used for the tab-switching logic in the `Experience` component.

## 5. Development Workflow

1.  **Reset:** Remove the previously created simple components.
2.  **Setup:** Create the gradient background and the custom CSS file for glass effects.
3.  **Layout:** Implement the new CSS Grid-based layout in `Layout.astro`.
4.  **Components:** Re-create each component, one by one, applying the new glass morphism styles and animations.
5.  **Interactivity:** Add JavaScript for the experience tabs.
6.  **Testing:** Thoroughly test responsiveness and cross-browser compatibility.

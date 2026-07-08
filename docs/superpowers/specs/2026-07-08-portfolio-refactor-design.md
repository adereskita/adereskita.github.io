# Portfolio Design Spec: "iOS Vibe" Refactor

## Concept: "iOS Vibe" (Blend of Apple HIG + App Store)
Refactor the portfolio to exude a premium iOS engineering identity. The design uses Apple HIG-inspired glassmorphism, typography, and interactive depth, structured loosely like an iOS environment without being a literal OS clone.

## Visual Language
- **Theme:** Dark mode base (`#0b0b0f`).
- **Ambient Motion:** Slow-moving, large blurred ambient orbs (deep blue and purple) in the background.
- **Material:** "Liquid glass" panels using `backdrop-blur`, subtle white borders, and `rgba(255,255,255,0.05)` backgrounds.
- **Typography:** Inter (styled tightly to mimic San Francisco).
- **Interactions:**
  - **Scroll:** Staggered upward fade-ins (spring physics feel).
  - **Hover:** 3D parallax tilt on cards, with a dynamic glare/highlight following the cursor.

## Layout Structure
1. **Hero (Lock Screen style):**
   - Centered typography, large name, "Principal iOS Engineer" subtitle.
   - Social links moved to a bottom "dock" or kept minimal.
   - Subtle scroll indicator (home bar style).
2. **Experience (Widgets):**
   - Roles presented as glass "widgets" in a bento-style grid or stacked panels.
3. **Featured Works (App Store "Today" style):**
   - **Skills Merge:** The standalone Skills section is removed. Skills are now displayed as pill tags inside each project card (e.g., "SwiftUI • Clean Architecture").
   - Large, rounded cards with `AppIcon` integration and placeholder screenshots.
4. **Education:**
   - Compact glass widget at the bottom.

## Implementation Details
- **Tech Stack:** Astro, Tailwind CSS v4, Motion (for scroll/tilt animations).
- **Animations:** Update `animations.js` and `glare.js` to handle the 3D tilt and glare calculation on glass panels.
- **Component Refactoring:**
  - Update `Header`, `Experience`, `Projects`, `ProjectCard`, and `Education`.
  - Remove `Skills` component.
  - Integrate `AppIcon` into `ProjectCard`.
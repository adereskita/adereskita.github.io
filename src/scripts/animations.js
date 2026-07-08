import { scroll, animate, stagger } from "motion";

document.addEventListener("DOMContentLoaded", () => {
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

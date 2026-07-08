import { scroll, animate } from "motion";

document.addEventListener('astro:page-load', () => {
  document.querySelectorAll('.scroll-anim').forEach((el) => {
    scroll(animate(el, { opacity: [0, 1], y: [100, 0] }), {
      target: el,
      offset: ["start end", "end end"],
    });
  });
});

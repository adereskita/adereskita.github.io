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

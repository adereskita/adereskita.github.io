document.querySelectorAll('.project-card').forEach(card => {
  const glare = card.querySelector('.glare');
  card.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    glare.style.opacity = '1';
    glare.style.transform = `translate(${x}px, ${y}px)`;
  });
  card.addEventListener('mouseleave', () => {
    glare.style.opacity = '0';
  });
});

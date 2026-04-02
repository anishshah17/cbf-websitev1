const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealSelectors = [
  ".announcement-bar",
  ".hero-copy",
  ".hero-card",
  ".section-header",
  ".about-card",
  ".details-card",
  ".workshop-card",
  ".social-card",
  ".contact-card",
  ".committee-details",
  ".committee-about",
  ".announcement-card",
  ".photo-slot",
  ".woven-image",
  ".video-frame",
  ".testimonial-grid blockquote",
  ".hero-grid > *"
];

const revealElements = Array.from(
  new Set(
    revealSelectors
      .flatMap((selector) => Array.from(document.querySelectorAll(selector)))
      .filter((el) => el instanceof HTMLElement)
  )
);

// Initial state
revealElements.forEach((el) => el.classList.add("reveal"));

if (prefersReducedMotion) {
  revealElements.forEach((el) => el.classList.add("reveal--visible"));
} else {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, currentObserver) => {
    // Add staggered delay for elements appearing at the same time
    let delay = 0;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("reveal--visible");
        }, delay);
        delay += 100; // 100ms stagger between elements in the same viewport
        currentObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}

// Add parallax effect to hero orbs
document.addEventListener("mousemove", (e) => {
  if (prefersReducedMotion) return;
  const orbs = document.querySelectorAll(".hero-orb");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 20;
    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

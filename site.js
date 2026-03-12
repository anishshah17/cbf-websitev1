const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealSelectors = [
  ".announcement-bar",
  ".hero-copy",
  ".hero-card",
  ".section",
  ".about-card",
  ".details-card",
  ".workshop-card",
  ".social-card",
  ".contact-card",
  ".committee-details",
  ".committee-about",
  ".announcement-card",
  ".photo-slot",
  ".video-frame",
  ".testimonial-grid blockquote"
];

const revealElements = Array.from(
  new Set(
    revealSelectors
      .flatMap((selector) => Array.from(document.querySelectorAll(selector)))
      .filter((el) => el instanceof HTMLElement)
  )
);

revealElements.forEach((el) => el.classList.add("reveal"));

if (prefersReducedMotion) {
  revealElements.forEach((el) => el.classList.add("reveal--visible"));
} else {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

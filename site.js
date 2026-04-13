const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  setupRevealAnimations();
  setupAnnouncementModal();
});

function setupRevealAnimations() {
  const revealElements = Array.from(document.querySelectorAll(".reveal"));

  if (revealElements.length === 0) {
    return;
  }

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("reveal--visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("reveal--visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function setupAnnouncementModal() {
  const modal = document.querySelector("[data-announcement-modal]");

  if (!modal) {
    return;
  }

  const closeButtons = modal.querySelectorAll("[data-close-announcement]");
  const openButtons = document.querySelectorAll("[data-open-announcement]");
  const dismissedKey = "cbf-announcement-dismissed";
  const storage = getSessionStorage();

  if (storage && storage.getItem(dismissedKey) === "true") {
    modal.classList.add("is-hidden");
    return;
  }

  modal.classList.remove("is-hidden");

  const openModal = () => {
    modal.classList.remove("is-hidden");
  };

  const closeModal = () => {
    modal.classList.add("is-hidden");
    if (storage) {
      storage.setItem(dismissedKey, "true");
    }
  };

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  openButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function getSessionStorage() {
  try {
    return window.sessionStorage;
  } catch (error) {
    return null;
  }
}

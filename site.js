const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const supabaseConfig = {
  url: window.SUPABASE_URL || "",
  anonKey: window.SUPABASE_ANON_KEY || "",
  table: window.SUPABASE_TABLE || "mailing_list_signups"
};
const BIZZY_CORE_FAQ = [
  "Fair date: Saturday, August 8, 2026.",
  "Fair time: 10:00 AM - 2:00 PM.",
  "Fair location: TBD (to be announced).",
  "Participant age range: 5-14.",
  "Team size: up to 3 participants per business.",
  "Booth size: 5' x 6' table.",
  "Applications: open in late April 2026.",
  "Application review: first come, first serve with responses in about 5 business days.",
  "Only original, handmade items are allowed. Resellers are not allowed.",
  "Pre-fair programming: CBF Informational Workshop on Saturday, June 6, 2026 from 10:00 AM to 11:00 AM over Google Meet at https://meet.google.com/unx-ubxi-vsq, plus in-person workshops on July 11 and July 18 with more details coming soon.",
  "1:1 sessions are available and are not required for fair participation.",
  "1:1 session length: 30 minutes, free, limited availability.",
  "1:1 locations: Nichols Library (200 W Jefferson Ave), Starbucks (1200 S Naper Blvd), Starbucks (203 S Main St), or online via Google Meet.",
  "Main contact email: napervillebusinessfair@gmail.com.",
  "Families can join the mailing list from the home/contact pages."
].join("\n");

const CBF_MEDIA_ITEMS = [
  { src: "assets/cbf 2025/IMG_1290.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_1291.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_1292.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_1294.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_1295.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_1523.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_1524.mp4", type: "video", collection: "2025" },
  { src: "assets/cbf 2025/IMG_1525.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_1526.mp4", type: "video", collection: "2025" },
  { src: "assets/cbf 2025/IMG_1527.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_1528.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_1529.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_3771.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_3774.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_3776.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_5846.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_5847.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_5852.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_5854.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_5855.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_5856.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_5857.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_5858.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_6644.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_6646.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_6648.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_6651.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_6652.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_6654.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_6657.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_6659.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8771.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8773.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8775.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8776.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8779.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8780.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8781.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8784.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8785.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8786.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8788.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8791.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8795.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8796.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8798.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8799.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8800.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8801.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8802.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_8803.mp4", type: "video", collection: "2025" },
  { src: "assets/cbf 2025/IMG_9796 (1).jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_9796.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_9797.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_9799.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_9800.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_9801.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_9802.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_9803.jpg", type: "image", collection: "2025" },
  { src: "assets/cbf 2025/IMG_9804 (1).mp4", type: "video", collection: "2025" },
  { src: "assets/cbf 2025/IMG_9804.mp4", type: "video", collection: "2025" },
  { src: "assets/cbf old/00debcb83e10bfd27d9169e59e105cc6.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/06b56de928bc784df428246dfaf23b1a.JPEG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/1191600ba48effa74672825a049d6c10.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/121142106045578bea834a555879be3c.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/17003152b381807b4678fd3f577f49b4 (1).JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/17003152b381807b4678fd3f577f49b4.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/22c272cd2c1609db2c8b985cc02c6904.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/2688fc924fd75ce0fee111def85059fb.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/29d195fb228cbffdf0ceab3a4d8fea06.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/2cddb557c55872b31efe499f622a2786.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/50fe38e3db8609a8609184da9e6d85d5.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/592543899123fb5821ab781129827c72.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/5aa6f2c451bb7961b0572315a61e80a2.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/6150531e2341a8f8d564f2038310526a.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/61d8000e6f8e096635ca253cc8f3d565.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/6ced1bd07eebd510e497b42f79b19a4b.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/a57b413f594fc690521012cc0163f196.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/ad20fe0380a1528d0f7e2e47116caf99.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/b83a3c6edb2f1cbe0b28d4453260cd15.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/c1a6d2fb0b82259707857450f31a8b8d.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/d2a276aa93e1aad7e141667483672c54.JPEG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/d78650310542ca88a584a1d0a91d2ff5.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/d7dd0ce7ceba2b626fd93b0521b9c2af.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/d8777e84c554aa1e35cfa13b4e994f95.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/dc0dbd3a31536cce9ad55a2a1bd64856.JPEG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/ff0bdd3e4b12976f5598756be9c5430b.JPG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/image (1).PNG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/image (10).PNG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/image (11).PNG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/image (12).PNG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/image (13).PNG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/image (2).PNG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/image (3).PNG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/image (4).PNG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/image (5).PNG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/image (6).PNG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/image (7).PNG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/image (8).PNG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/image (9).PNG", type: "image", collection: "Past Fairs" },
  { src: "assets/cbf old/image.PNG", type: "image", collection: "Past Fairs" }
];

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupRevealAnimations();
  setupStatsCounters();
  setupAnnouncementModal();
  setupFlyerViewer();
  setupMediaViewer();
  setupBizzyChatbot();
  setupSponsorLogoFallbacks();
  setupCopyEmail();
  setupMailingListForms();
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

function setupMobileNav() {
  const nav = document.querySelector(".nav");
  const navLinks = nav ? nav.querySelector(".nav-links") : null;

  if (!nav || !navLinks || nav.querySelector("[data-nav-toggle]")) {
    return;
  }

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "nav-toggle";
  toggle.setAttribute("data-nav-toggle", "");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "mobile-nav-links");
  toggle.textContent = "Menu";

  if (!navLinks.id) {
    navLinks.id = "mobile-nav-links";
  }

  let backdrop = document.querySelector("[data-nav-backdrop]");
  if (!backdrop) {
    backdrop = document.createElement("button");
    backdrop.type = "button";
    backdrop.className = "nav-backdrop";
    backdrop.setAttribute("data-nav-backdrop", "");
    backdrop.setAttribute("aria-label", "Close menu");
    document.body.appendChild(backdrop);
  }

  const logo = nav.querySelector(".logo");
  if (logo) {
    logo.insertAdjacentElement("afterend", toggle);
  } else {
    nav.insertAdjacentElement("afterbegin", toggle);
  }

  const closeMenu = () => {
    nav.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    backdrop.classList.remove("is-visible");
    document.body.classList.remove("mobile-menu-open");
  };

  const openMenu = () => {
    nav.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    backdrop.classList.add("is-visible");
    document.body.classList.add("mobile-menu-open");
  };

  toggle.addEventListener("click", () => {
    if (nav.classList.contains("nav-open")) {
      closeMenu();
      return;
    }
    openMenu();
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  backdrop.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeMenu();
    }
  });
}

function setupStatsCounters() {
  const counters = Array.from(document.querySelectorAll("[data-counter]"));
  if (counters.length === 0) {
    return;
  }

  const formatCount = (value) => value.toLocaleString("en-US");

  const animateCounter = (counter) => {
    if (counter.dataset.counted === "true") {
      return;
    }

    const target = Number(counter.dataset.target || "0");
    const suffix = counter.dataset.suffix || "";

    if (!Number.isFinite(target)) {
      counter.textContent = `0${suffix}`;
      counter.dataset.counted = "true";
      return;
    }

    if (prefersReducedMotion) {
      counter.textContent = `${formatCount(target)}${suffix}`;
      counter.dataset.counted = "true";
      return;
    }

    const duration = 1200;
    let startTime = null;

    const update = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(target * easedProgress);
      counter.textContent = `${formatCount(nextValue)}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(update);
        return;
      }

      counter.dataset.counted = "true";
    };

    window.requestAnimationFrame(update);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.42 }
  );

  counters.forEach((counter) => observer.observe(counter));
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

function setupFlyerViewer() {
  const modal = document.querySelector("[data-flyer-modal]");
  const openButton = document.querySelector("[data-open-flyer]");

  if (!modal || !openButton) {
    return;
  }

  const closeButton = modal.querySelector("[data-close-flyer]");

  const openModal = () => {
    modal.classList.remove("is-hidden");
    document.body.classList.add("media-viewer-open");
    closeButton.focus();
  };

  const closeModal = () => {
    modal.classList.add("is-hidden");
    document.body.classList.remove("media-viewer-open");
  };

  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("is-hidden")) {
      closeModal();
    }
  });
}

function setupMediaViewer() {
  const gallery = document.querySelector("[data-media-gallery]");

  if (!gallery) {
    return;
  }

  const filtersContainer = gallery.querySelector("[data-media-filters]");
  const grid = gallery.querySelector("[data-media-grid]");
  const count = gallery.querySelector("[data-media-count]");
  const filters = ["All", "2025", "Past Fairs"];
  let activeFilter = "All";
  let visibleItems = [];
  let activeIndex = 0;
  let modal = null;
  let stage = null;
  let caption = null;
  let closeButton = null;
  let prevButton = null;
  let nextButton = null;

  const getVisibleItems = () => {
    if (activeFilter === "All") {
      return CBF_MEDIA_ITEMS;
    }

    return CBF_MEDIA_ITEMS.filter((item) => item.collection === activeFilter);
  };

  const updateFilterButtons = () => {
    filtersContainer.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.filter === activeFilter);
    });
  };

  const createMediaPreview = (item) => {
    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.muted = true;
      video.playsInline = true;
      video.preload = "metadata";
      return video;
    }

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = `${item.collection} Naperville Children's Business Fair photo`;
    image.loading = "lazy";
    return image;
  };

  const renderGallery = () => {
    visibleItems = getVisibleItems();
    grid.innerHTML = "";
    count.textContent = `${visibleItems.length} items`;

    visibleItems.forEach((item, index) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "media-viewer-tile";
      tile.setAttribute("aria-label", `Open ${item.collection} ${item.type}`);

      const media = createMediaPreview(item);
      const badge = document.createElement("span");
      badge.className = "media-viewer-badge";
      badge.textContent = item.type === "video" ? "Video" : item.collection;

      tile.append(media, badge);
      tile.addEventListener("click", () => openViewer(index));
      grid.append(tile);
    });

    updateFilterButtons();
  };

  const ensureModal = () => {
    if (modal) {
      return;
    }

    modal = document.createElement("div");
    modal.className = "media-lightbox is-hidden";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Media viewer");
    modal.innerHTML = `
      <div class="media-lightbox__panel">
        <button class="media-lightbox__close" type="button" aria-label="Close viewer">X</button>
        <button class="media-lightbox__nav media-lightbox__nav--prev" type="button" aria-label="Previous media">&lt;</button>
        <div class="media-lightbox__stage" data-media-stage></div>
        <button class="media-lightbox__nav media-lightbox__nav--next" type="button" aria-label="Next media">&gt;</button>
        <p class="media-lightbox__caption" data-media-caption></p>
      </div>
    `;

    document.body.append(modal);
    stage = modal.querySelector("[data-media-stage]");
    caption = modal.querySelector("[data-media-caption]");
    closeButton = modal.querySelector(".media-lightbox__close");
    prevButton = modal.querySelector(".media-lightbox__nav--prev");
    nextButton = modal.querySelector(".media-lightbox__nav--next");

    closeButton.addEventListener("click", closeViewer);
    prevButton.addEventListener("click", () => showMedia(activeIndex - 1));
    nextButton.addEventListener("click", () => showMedia(activeIndex + 1));
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeViewer();
      }
    });
  };

  const renderActiveMedia = () => {
    const item = visibleItems[activeIndex];
    stage.innerHTML = "";

    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      stage.append(video);
    } else {
      const image = document.createElement("img");
      image.src = item.src;
      image.alt = `${item.collection} Naperville Children's Business Fair photo`;
      stage.append(image);
    }

    caption.textContent = `${item.collection} ${item.type} ${activeIndex + 1} of ${visibleItems.length}`;
  };

  const showMedia = (nextIndex) => {
    activeIndex = (nextIndex + visibleItems.length) % visibleItems.length;
    renderActiveMedia();
  };

  function openViewer(index) {
    ensureModal();
    activeIndex = index;
    renderActiveMedia();
    modal.classList.remove("is-hidden");
    document.body.classList.add("media-viewer-open");
    closeButton.focus();
  }

  function closeViewer() {
    if (!modal) {
      return;
    }

    modal.classList.add("is-hidden");
    document.body.classList.remove("media-viewer-open");
    stage.innerHTML = "";
  }

  filters.forEach((filter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "media-viewer-filter";
    button.dataset.filter = filter;
    button.textContent = filter === "All" ? "All Media" : filter;
    button.addEventListener("click", () => {
      activeFilter = filter;
      closeViewer();
      renderGallery();
    });
    filtersContainer.append(button);
  });

  document.addEventListener("keydown", (event) => {
    if (!modal || modal.classList.contains("is-hidden")) {
      return;
    }

    if (event.key === "Escape") {
      closeViewer();
    } else if (event.key === "ArrowLeft") {
      showMedia(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      showMedia(activeIndex + 1);
    }
  });

  renderGallery();
}

function setupBizzyChatbot() {
  if (document.querySelector(".bizzy-widget")) {
    return;
  }

  const hasApiKey = Boolean(getBizzyApiKey());

  if (document.querySelector("[data-open-announcement]")) {
    document.body.classList.add("has-announcement-fab");
  }

  const widget = document.createElement("div");
  widget.className = "bizzy-widget";
  widget.innerHTML = `
    <button class="bizzy-toggle" type="button" aria-expanded="false" data-bizzy-toggle>Ask Bizzy</button>
    <section class="bizzy-panel" aria-label="Bizzy chatbot panel" data-bizzy-panel>
      <header class="bizzy-header">
        <div>
          <strong>Bizzy</strong>
          <p>Your fair assistant</p>
        </div>
        <button class="bizzy-close" type="button" aria-label="Close Bizzy chat" data-bizzy-close>Close</button>
      </header>
      <div class="bizzy-messages" data-bizzy-messages></div>
      <form class="bizzy-form" data-bizzy-form>
        <input type="text" name="bizzy-question" placeholder="Ask a question about the fair..." autocomplete="off" required />
        <button type="submit" class="btn primary">Send</button>
      </form>
      <p class="bizzy-hint">${
        hasApiKey
          ? "Bizzy is connected and ready to answer questions."
          : "Need setup? Use <code>/key YOUR_GEMINI_API_KEY</code> once."
      }</p>
    </section>
  `;

  document.body.appendChild(widget);

  const toggle = widget.querySelector("[data-bizzy-toggle]");
  const panel = widget.querySelector("[data-bizzy-panel]");
  const close = widget.querySelector("[data-bizzy-close]");
  const form = widget.querySelector("[data-bizzy-form]");
  const input = form ? form.querySelector('input[name="bizzy-question"]') : null;
  const messages = widget.querySelector("[data-bizzy-messages]");

  if (!toggle || !panel || !close || !form || !input || !messages) {
    return;
  }

  const state = {
    history: [],
    waiting: false,
    knowledgePromise: null
  };

  appendBizzyMessage(
    messages,
    "bot",
    "Hi! I'm Bizzy. Ask me anything about fair dates, applications, sessions, sponsors, or event details."
  );

  const openPanel = () => {
    panel.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    window.setTimeout(() => input.focus(), 60);
  };

  const closePanel = () => {
    panel.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    if (panel.classList.contains("is-open")) {
      closePanel();
      return;
    }
    openPanel();
  });

  close.addEventListener("click", closePanel);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (state.waiting) {
      return;
    }

    const userMessage = input.value.trim();
    if (!userMessage) {
      return;
    }

    appendBizzyMessage(messages, "user", userMessage);
    input.value = "";

    if (userMessage.toLowerCase().startsWith("/key ")) {
      const submittedKey = userMessage.slice(5).trim();
      if (!submittedKey) {
        appendBizzyMessage(messages, "bot", "I couldn't read that key. Try: /key YOUR_GEMINI_API_KEY");
        return;
      }

      saveBizzyApiKey(submittedKey);
      appendBizzyMessage(messages, "bot", "Got it. Gemini API key saved for this browser.");
      return;
    }

    state.waiting = true;
    input.disabled = true;
    appendBizzyMessage(messages, "bot", "Thinking...");

    try {
      const responseText = await askBizzyWithGemini(userMessage, state);
      replaceLastBizzyMessage(messages, responseText);
      state.history.push({ role: "user", text: userMessage });
      state.history.push({ role: "assistant", text: responseText });
      if (state.history.length > 12) {
        state.history = state.history.slice(-12);
      }
    } catch (error) {
      replaceLastBizzyMessage(
        messages,
        "I hit a connection issue. Please try again in a moment."
      );
    } finally {
      state.waiting = false;
      input.disabled = false;
      input.focus();
    }
  });
}

function appendBizzyMessage(container, role, text) {
  const message = document.createElement("div");
  message.className = `bizzy-message ${role === "user" ? "is-user" : "is-bot"}`;
  message.textContent = text;
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
}

function replaceLastBizzyMessage(container, text) {
  const messages = container.querySelectorAll(".bizzy-message");
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage) {
    return;
  }
  lastMessage.textContent = text;
}

async function askBizzyWithGemini(userQuestion, state) {
  const localAnswer = getBizzyLocalAnswer(userQuestion);
  if (localAnswer) {
    return localAnswer;
  }

  const apiKey = getBizzyApiKey();
  if (!apiKey) {
    return "I need a Gemini API key first. Send: /key YOUR_GEMINI_API_KEY";
  }

  const model = window.GEMINI_MODEL || "gemini-2.5-flash";
  const fairContext = await getBizzyFairContext(state);
  const recentHistory = state.history
    .slice(-6)
    .map((entry) => `${entry.role === "assistant" ? "Bizzy" : "User"}: ${entry.text}`)
    .join("\n");

  const prompt = [
    "FAIR WEBSITE CONTEXT:",
    fairContext,
    "",
    recentHistory ? `RECENT CHAT:\n${recentHistory}\n` : "",
    `USER QUESTION: ${userQuestion}`
  ].join("\n");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text:
                "You are Bizzy, the Naperville Children's Business Fair assistant. " +
                "Answer questions only using the provided fair context. " +
                "Prioritize the CORE FAQ facts when they answer the question directly. " +
                "If something is missing, say you are not sure and direct users to the Contact page."
            }
          ]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 420
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error("Gemini request failed");
  }

  const payload = await response.json();
  const text = payload?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();

  if (!text) {
    return "I couldn't generate an answer for that. Try rephrasing your question.";
  }

  return text;
}

function getBizzyApiKey() {
  return window.GEMINI_API_KEY || readBizzyApiKey();
}

function saveBizzyApiKey(apiKey) {
  try {
    window.localStorage.setItem("cbf_gemini_api_key", apiKey);
  } catch (error) {
    // Ignore storage errors and keep working with in-memory key usage only.
  }
}

function readBizzyApiKey() {
  try {
    return window.localStorage.getItem("cbf_gemini_api_key") || "";
  } catch (error) {
    return "";
  }
}

async function getBizzyFairContext(state) {
  if (state.knowledgePromise) {
    return state.knowledgePromise;
  }

  state.knowledgePromise = buildBizzyFairContext();
  return state.knowledgePromise;
}

async function buildBizzyFairContext() {
  const baselineContext =
    "Naperville Children's Business Fair: Saturday, August 8, 2026, 10:00 AM - 2:00 PM. " +
    "Location is currently listed as TBD. Applications open in late April 2026. " +
    "Age range is 5-14, with up to 3 participants per business. " +
    "This is a one-day market where children launch original businesses. " +
    "The site includes event details, FAQ rules, media, sponsor info, contact details, and 1:1 mentorship sessions.";
  const pages = [
    "index.html",
    "about.html",
    "event.html",
    "media.html",
    "sessions.html",
    "applications.html",
    "sponsors.html",
    "contact.html"
  ];

  const contexts = [];
  contexts.push(`[core-faq]\n${BIZZY_CORE_FAQ}`);
  contexts.push(`[baseline] ${baselineContext}`);
  contexts.push(`[${window.location.pathname || "current page"}] ${summarizeBizzyDocument(document)}`);

  await Promise.all(
    pages.map(async (page) => {
      try {
        const response = await fetch(page, { cache: "no-store" });
        if (!response.ok) {
          return;
        }
        const html = await response.text();
        const parsed = new DOMParser().parseFromString(html, "text/html");
        contexts.push(`[${page}] ${summarizeBizzyDocument(parsed)}`);
      } catch (error) {
        // Skip unavailable pages.
      }
    })
  );

  return contexts.join("\n\n").slice(0, 24000);
}

function getBizzyLocalAnswer(question) {
  const q = (question || "").toLowerCase();

  if (/(age|ages|how old|age range)/.test(q)) {
    return "The fair is for ages 5-14, with up to 3 participants per business.";
  }

  if (/(when|date).*(fair|event)|fair day/.test(q)) {
    return "The fair is on Saturday, August 8, 2026, from 10:00 AM to 2:00 PM.";
  }

  if (/(where|location|address).*(fair|event)|fair.*(where|location|address)/.test(q)) {
    return "The fair location is currently listed as TBD and will be announced soon.";
  }

  if (/application|apply|registration/.test(q)) {
    return "Applications open in late April 2026. Submit one application per business, with up to 3 participants per business.";
  }

  if (/(workshop|pre-?fair)/.test(q)) {
    return "The CBF Informational Workshop is Saturday, June 6, 2026 from 10:00 AM to 11:00 AM over Google Meet: https://meet.google.com/unx-ubxi-vsq. Two in-person workshops are planned for July 11 and July 18, with more details and RSVP information coming soon.";
  }

  if (/(session|1:1|one-on-one|mentorship).*(how long|length|minute|minutes)|how long.*(session|1:1|one-on-one|mentorship)/.test(q)) {
    return "Each 1:1 mentorship session is 30 minutes and free (limited availability).";
  }

  if (/(where|location).*(session|1:1|one-on-one|mentorship)|session.*(where|location)/.test(q)) {
    return "1:1 sessions are available at Nichols Library, Starbucks on S Naper Blvd, Starbucks on S Main St, or online via Google Meet.";
  }

  if (/(email|contact|reach)/.test(q)) {
    return "You can contact the committee at napervillebusinessfair@gmail.com.";
  }

  return "";
}

function summarizeBizzyDocument(doc) {
  const scope = doc.querySelector("main") || doc.body;
  if (!scope) {
    return "";
  }

  const snippets = [];
  const nodes = scope.querySelectorAll("h1, h2, h3, p, li");

  nodes.forEach((node) => {
    if (snippets.length >= 120) {
      return;
    }

    const text = (node.textContent || "").replace(/\s+/g, " ").trim();
    if (!text || text.length < 3) {
      return;
    }
    snippets.push(text);
  });

  return snippets.join(" ");
}

function setupSponsorLogoFallbacks() {
  const sponsorLogos = Array.from(document.querySelectorAll(".sponsor-logo-card img"));

  if (sponsorLogos.length === 0) {
    return;
  }

  sponsorLogos.forEach((image) => {
    image.addEventListener("error", () => {
      image.style.display = "none";
    });
  });
}

function getSessionStorage() {
  try {
    return window.sessionStorage;
  } catch (error) {
    return null;
  }
}

function setupCopyEmail() {
  const copyButton = document.querySelector("[data-copy-email]");
  const toast = document.querySelector("[data-copy-toast]");

  if (!copyButton || !toast) {
    return;
  }

  let hideToastTimer;
  const email = copyButton.getAttribute("data-copy-email") || "";

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(hideToastTimer);
    hideToastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 1800);
  };

  copyButton.addEventListener("click", async () => {
    if (!email) {
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied to clipboard.");
    } catch (error) {
      // Graceful fallback for browsers that block async clipboard APIs.
      const temporaryInput = document.createElement("input");
      temporaryInput.value = email;
      document.body.appendChild(temporaryInput);
      temporaryInput.select();
      document.execCommand("copy");
      document.body.removeChild(temporaryInput);
      showToast("Email copied to clipboard.");
    }
  });
}

function setupMailingListForms() {
  const forms = Array.from(document.querySelectorAll("[data-mailing-list-form]"));
  if (forms.length === 0) {
    return;
  }

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status]");
      const nameInput = form.querySelector('input[name="Parent or Guardian Name"]');
      const emailInput = form.querySelector('input[name="Email"]');

      if (!nameInput || !emailInput) {
        return;
      }

      const parentName = nameInput.value.trim();
      const email = emailInput.value.trim();

      if (!parentName || !email) {
        setFormStatus(status, "Please enter your name and email address.", true);
        return;
      }

      if (!isSupabaseConfigured()) {
        setFormStatus(
          status,
          "Mailing list is not configured yet. Add your Supabase URL and anon key in this page file.",
          true
        );
        return;
      }

      try {
        const response = await fetch(
          `${supabaseConfig.url}/rest/v1/${supabaseConfig.table}`,
          {
            method: "POST",
            headers: {
              apikey: supabaseConfig.anonKey,
              Authorization: `Bearer ${supabaseConfig.anonKey}`,
              "Content-Type": "application/json",
              Prefer: "return=minimal"
            },
            body: JSON.stringify([
              {
                parent_name: parentName,
                email,
                source_page: window.location.pathname,
                submitted_at: new Date().toISOString()
              }
            ])
          }
        );

        if (!response.ok) {
          throw new Error("Supabase insert failed");
        }

        form.reset();
        setFormStatus(status, "Thanks. You are on the mailing list.");
      } catch (error) {
        setFormStatus(
          status,
          "We could not submit right now. Please try again in a moment.",
          true
        );
      }
    });
  });
}

function isSupabaseConfigured() {
  if (!supabaseConfig.url || !supabaseConfig.anonKey) {
    return false;
  }

  return !(
    supabaseConfig.url.includes("YOUR-PROJECT") ||
    supabaseConfig.anonKey.includes("YOUR-ANON-KEY")
  );
}

function setFormStatus(statusElement, message, isError = false) {
  if (!statusElement) {
    return;
  }

  statusElement.textContent = message;
  statusElement.classList.toggle("error", Boolean(isError));
  statusElement.classList.add("is-visible");
}

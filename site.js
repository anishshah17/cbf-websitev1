const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const supabaseConfig = {
  url: window.SUPABASE_URL || "",
  anonKey: window.SUPABASE_ANON_KEY || "",
  table: window.SUPABASE_TABLE || "mailing_list_signups"
};

document.addEventListener("DOMContentLoaded", () => {
  setupRevealAnimations();
  setupAnnouncementModal();
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

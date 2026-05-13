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
  "Pre-fair programming: one Business Fundamentals Workshop (date/time/location coming soon).",
  "1:1 sessions are available and are not required for fair participation.",
  "1:1 session length: 30 minutes, free, limited availability.",
  "1:1 locations: Nichols Library (200 W Jefferson Ave), Starbucks (1200 S Naper Blvd), Starbucks (203 S Main St), or online via Google Meet.",
  "Main contact email: napervillebusinessfair@gmail.com.",
  "Families can join the mailing list from the home/contact pages."
].join("\n");

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupRevealAnimations();
  setupStatsCounters();
  setupAnnouncementModal();
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
    return "There will be one Business Fundamentals Workshop (date/time/location coming soon), plus optional 1:1 sessions.";
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

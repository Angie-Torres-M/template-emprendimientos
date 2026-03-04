document.addEventListener("DOMContentLoaded", async () => {
  // Theme init
  theme.setTheme(theme.getSavedTheme());

  // i18n init
  const savedLang = i18n.getSavedLang();
  await i18n.setLang(savedLang);
  updateLangLabel();

  // Buttons
  document.getElementById("btnTheme").addEventListener("click", () => theme.toggleTheme());

  document.getElementById("btnLang").addEventListener("click", async () => {
    const next = (document.documentElement.lang === "es") ? "en" : "es";
    await i18n.setLang(next);
    updateLangLabel();
    renderAll();
  });

  // Mobile drawer
  initDrawer();

  // Render
  renderAll();

  // Contact form validations
  initContactValidation();
});

function updateLangLabel(){
  const current = document.documentElement.lang || "es";
  const label = document.getElementById("langLabel");
  if (!label) return;
  label.textContent = (current === "es") ? "EN" : "ES";
}

function initDrawer(){
  const btnMenu = document.getElementById("btnMenu");
  const btnClose = document.getElementById("btnCloseMenu");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("drawerOverlay");

  if (!btnMenu || !btnClose || !drawer || !overlay) return;

  const open = () => {
    drawer.classList.remove("hidden");
    overlay.classList.remove("hidden");
    drawer.classList.add("is-open");
    btnMenu.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    drawer.classList.remove("is-open");
    btnMenu.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    setTimeout(() => {
      drawer.classList.add("hidden");
      overlay.classList.add("hidden");
    }, 180);
  };

  btnMenu.addEventListener("click", open);
  btnClose.addEventListener("click", close);
  overlay.addEventListener("click", close);

  // cerrar al dar click en un link del drawer
  drawer.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) close();
  });

  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !drawer.classList.contains("hidden")) close();
  });
}

function renderAll() {
  const cfg = window.SITE_CONFIG;

  // Brand
  document.getElementById("brandName").textContent = cfg.brand.name;
  document.getElementById("heroTitle").textContent = cfg.brand.name;
  document.getElementById("footerBrandName").textContent = cfg.brand.name;

  const brandLogo = document.getElementById("brandLogo");
  const heroLogo = document.getElementById("heroLogo");
  brandLogo.src = cfg.brand.logoSrc;
  heroLogo.src = cfg.brand.logoSrc;

  // Social links (stack)
  renderSocialLinks("socialLinks", cfg.socials);

  // Offer cards
  renderCards("offerCards", cfg.offer);

  // Featured cards
  renderFeatured("featuredCards", cfg.featured);

  // FAQ
  renderFaq("faqList", cfg.faq);

  // Catalog optional
  const catalogSection = document.getElementById("catalog");
  const canvaEmbed = document.getElementById("canvaEmbed");
  if (cfg.catalog?.canvaEmbedUrl?.trim()) {
    canvaEmbed.src = cfg.catalog.canvaEmbedUrl.trim();
    catalogSection.classList.remove("hidden");
  } else {
    canvaEmbed.removeAttribute("src");
    catalogSection.classList.add("hidden");
  }

  // Fast response link
  renderFastResponse(cfg);

  // Legal
  const year = cfg.footer?.year ?? new Date().getFullYear();
  const city = cfg.brand?.cityLine ?? "";
  document.getElementById("legalText").textContent =
    `© ${year} ${cfg.brand.name}. Todos los derechos reservados. ${city}.`;
}

function normalizeLabel(label){
  return (label || "").toLowerCase().trim();
}

function getSocialMeta(label){
  const l = normalizeLabel(label);

  const ICONS = {
    instagram: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="7" y="7" width="10" height="10" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M16.5 7.5h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        <path d="M12 10.2a1.8 1.8 0 1 0 0 3.6a1.8 1.8 0 0 0 0-3.6Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="4.5" y="4.5" width="15" height="15" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
      </svg>
    `,
    facebook: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M14 8.5V7.2c0-.7.4-1.2 1.3-1.2H17V3.5h-2.1c-2.6 0-4 1.6-4 4v1.0H9v2.6h1.9V21h3.1v-9.9h2.5l.4-2.6H14Z"
          fill="currentColor"/>
      </svg>
    `,
    tiktok: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M14.5 3c.4 2.8 2.2 4.7 5 5v2.7c-1.9 0-3.6-.6-5-1.7v6.6c0 3-2.4 5.4-5.4 5.4S3.7 18.6 3.7 15.6c0-3 2.4-5.4 5.4-5.4.5 0 1 .1 1.5.2v2.9c-.5-.2-1-.4-1.6-.4-1.4 0-2.6 1.2-2.6 2.6 0 1.4 1.2 2.6 2.6 2.6 1.6 0 2.6-1 2.6-3V3h2.9Z"
          fill="currentColor"/>
      </svg>
    `,
    whatsapp: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 4.2a7.8 7.8 0 0 0-6.7 11.8L4.5 20l4.1-.8A7.8 7.8 0 1 0 12 4.2Z"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M9.6 9.2c-.2-.5-.4-.5-.6-.6h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2 0 1.1.8 2.3.9 2.4.1.2 1.6 2.6 4 3.5 2 .8 2.4.6 2.8.6.4-.1 1.3-.6 1.5-1.1.2-.5.2-.9.1-1-.1-.1-.3-.2-.6-.4l-1.4-.7c-.2-.1-.4-.1-.6.1l-.6.7c-.2.2-.3.2-.6.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.4-1.9-.1-.3 0-.4.1-.5l.4-.5c.1-.1.2-.3.3-.5.1-.2.1-.4 0-.6l-.7-1.6Z"
          fill="currentColor"/>
      </svg>
    `
  };

  if (l.includes("instagram") || l === "ig") {
    return { cls: "social-btn--instagram", svg: ICONS.instagram };
  }
  if (l.includes("facebook") || l === "fb") {
    return { cls: "social-btn--facebook", svg: ICONS.facebook };
  }
  if (l.includes("tiktok")) {
    return { cls: "social-btn--tiktok", svg: ICONS.tiktok };
  }
  if (l.includes("whatsapp") || l.includes("wa")) {
    return { cls: "social-btn--whatsapp", svg: ICONS.whatsapp };
  }
  return { cls: "", svg: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 7h7v7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>` };
}
function renderSocialLinks(containerId, links) {
  const host = document.getElementById(containerId);
  if (!host) return;
  host.innerHTML = "";

  links.forEach((s) => {
    const meta = getSocialMeta(s.label);

    const a = document.createElement("a");
    a.className = `social-btn ${meta.cls}`.trim();
    a.href = s.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const icon = document.createElement("span");
    icon.className = "social-btn__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = meta.svg;

    const text = document.createElement("span");
    text.className = "social-btn__label";
    text.textContent = s.label;

    a.appendChild(icon);
    a.appendChild(text);
    host.appendChild(a);
  });
}

function renderCards(containerId, cards) {
  const host = document.getElementById(containerId);
  if (!host) return;
  host.innerHTML = "";

  cards.forEach((c) => {
    const el = document.createElement("article");
    el.className = "card";

    const h = document.createElement("h3");
    h.textContent = i18n.t(c.titleKey);

    const p = document.createElement("p");
    p.className = "muted";
    p.textContent = i18n.t(c.bodyKey);

    el.appendChild(h);
    el.appendChild(p);
    host.appendChild(el);
  });
}

function renderFeatured(containerId, items){
  const host = document.getElementById(containerId);
  if (!host) return;
  host.innerHTML = "";

  items.forEach((it, idx) => {
    const card = document.createElement("article");
    card.className = "card card--media";

    const media = document.createElement("div");
    media.className = "card__media";

    const img = document.createElement("img");
    img.alt = i18n.t(it.titleKey);
    img.src = it.imgSrc || `./assets/img/featured-${idx+1}.jpg`;
    img.onerror = () => { img.style.display = "none"; };

    media.appendChild(img);

    const body = document.createElement("div");
    body.className = "card__body";

    const h = document.createElement("h3");
    h.textContent = i18n.t(it.titleKey);

    const p = document.createElement("p");
    p.className = "muted";
    p.textContent = i18n.t(it.bodyKey);

    body.appendChild(h);
    body.appendChild(p);

    card.appendChild(media);
    card.appendChild(body);

    host.appendChild(card);
  });
}

function renderFaq(containerId, items) {
  const host = document.getElementById(containerId);
  if (!host) return;
  host.innerHTML = "";

  items.forEach((it) => {
    const details = document.createElement("details");
    details.className = "faq__item";

    const sum = document.createElement("summary");
    sum.textContent = i18n.t(it.qKey);

    const p = document.createElement("p");
    p.className = "muted";
    p.textContent = i18n.t(it.aKey);

    details.appendChild(sum);
    details.appendChild(p);
    host.appendChild(details);
  });
}

function renderFastResponse(cfg){
  const fastLink = document.getElementById("fastLink");
  if (!fastLink) return;

  const preferred = normalizeLabel(cfg.fastResponseSocial || "whatsapp");
  const found = (cfg.socials || []).find(s => normalizeLabel(s.label) === preferred);

  const pick = found || cfg.socials?.[0];
  if (!pick) return;

  fastLink.textContent = pick.label;
  fastLink.href = pick.url;
}

/* ===== Validations ===== */
function initContactValidation(){
  const form = document.getElementById("contactForm");
  if (!form) return;

  const name = document.getElementById("nameInput");
  const email = document.getElementById("emailInput");
  const msg = document.getElementById("msgInput");

  const nameErr = document.getElementById("nameError");
  const emailErr = document.getElementById("emailError");
  const msgErr = document.getElementById("msgError");
  const status = document.getElementById("formStatus");

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);

  const validate = () => {
    let ok = true;

    const n = (name.value || "").trim();
    const e = (email.value || "").trim();
    const m = (msg.value || "").trim();

    nameErr.textContent = "";
    emailErr.textContent = "";
    msgErr.textContent = "";
    status.textContent = "";

    if (n.length < 2){
      nameErr.textContent = i18n.t("form.errors.name");
      ok = false;
    }
    if (!isEmail(e)){
      emailErr.textContent = i18n.t("form.errors.email");
      ok = false;
    }
    if (m.length < 10){
      msgErr.textContent = i18n.t("form.errors.message");
      ok = false;
    }

    return ok;
  };

  [name, email, msg].forEach((el) => el.addEventListener("blur", validate));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    status.textContent = i18n.t("form.success");
    form.reset();
  });
}
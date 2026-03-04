const I18N = {
  lang: "es",
  dict: {},
};

function getSavedLang() {
  return localStorage.getItem("lang") || document.documentElement.lang || "es";
}

async function loadLocale(lang) {
  const res = await fetch(`./locales/${lang}.json`, { cache: "no-cache" });
  if (!res.ok) throw new Error(`No se pudo cargar el locale: ${lang}`);
  return res.json();
}

function t(key) {
  return I18N.dict?.[key] ?? key;
}

function applyI18n(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
}

async function setLang(lang) {
  I18N.lang = lang;
  I18N.dict = await loadLocale(lang);
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
  applyI18n();
}

window.i18n = { t, setLang, getSavedLang };
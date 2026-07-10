window.i18n = (function () {
  const SUPPORTED = ['pt', 'en'];
  const DEFAULT_LANG = 'pt';
  const STORAGE_KEY = 'site-lang';
  const LANG_LABELS = { pt: 'PT BR', en: 'EN US' };

  const emProjetos = window.location.pathname.includes('/projetos/');
  const basePath = emProjetos ? '../data/i18n/' : 'data/i18n/';

  let dict = {};
  let currentLang = DEFAULT_LANG;
  let ready = null;

  function getStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      // localStorage indisponível (modo privado etc.) — segue sem persistir
    }
  }

  function detectLang() {
    const stored = getStoredLang();
    if (stored && SUPPORTED.includes(stored)) return stored;
    const nav = (navigator.language || DEFAULT_LANG).toLowerCase();
    return nav.startsWith('en') ? 'en' : DEFAULT_LANG;
  }

  function resolveKey(obj, path) {
    return path
      .split('.')
      .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang === 'en' ? 'en' : 'pt-BR';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = resolveKey(dict, el.getAttribute('data-i18n'));
      if (typeof value === 'string') el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const value = resolveKey(dict, el.getAttribute('data-i18n-html'));
      if (typeof value === 'string') el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.getAttribute('data-i18n-attr')
        .split(';')
        .forEach((pair) => {
          const [attr, key] = pair.split('=').map((s) => s && s.trim());
          if (!attr || !key) return;
          const value = resolveKey(dict, key);
          if (typeof value === 'string') el.setAttribute(attr, value);
        });
    });

    document.querySelectorAll('[data-lang-current]').forEach((el) => {
      el.textContent = LANG_LABELS[currentLang] || currentLang.toUpperCase();
    });

    document.querySelectorAll('[data-lang-option]').forEach((btn) => {
      const isActive = btn.getAttribute('data-lang-option') === currentLang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: currentLang } }));
  }

  async function loadDict(lang) {
    const res = await fetch(`${basePath}${lang}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  async function setLang(lang) {
    if (!SUPPORTED.includes(lang) || lang === currentLang) return;
    currentLang = lang;
    setStoredLang(lang);
    try {
      dict = await loadDict(lang);
    } catch (err) {
      console.error(`Não foi possível carregar ${basePath}${lang}.json:`, err);
      return;
    }
    applyTranslations();
  }

  async function init() {
    currentLang = detectLang();
    try {
      dict = await loadDict(currentLang);
    } catch (err) {
      console.error(`Não foi possível carregar ${basePath}${currentLang}.json:`, err);
      dict = {};
    }
    applyTranslations();
    initLangSwitch();
  }

  function initLangSwitch() {
    document.querySelectorAll('[data-lang-switch]').forEach((wrapper) => {
      const trigger = wrapper.querySelector('[data-lang-trigger]');
      const menu = wrapper.querySelector('[data-lang-menu]');
      if (!trigger || !menu) return;

      const closeMenu = () => {
        menu.hidden = true;
        wrapper.removeAttribute('data-open');
        trigger.setAttribute('aria-expanded', 'false');
      };
      const openMenu = () => {
        menu.hidden = false;
        wrapper.setAttribute('data-open', '');
        trigger.setAttribute('aria-expanded', 'true');
      };

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (menu.hidden) openMenu();
        else closeMenu();
      });

      menu.querySelectorAll('[data-lang-option]').forEach((btn) => {
        btn.addEventListener('click', () => {
          setLang(btn.getAttribute('data-lang-option'));
          closeMenu();
        });
      });

      document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) closeMenu();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
      });
    });
  }

  ready = init();

  return {
    t(key) {
      const value = resolveKey(dict, key);
      return typeof value === 'string' ? value : key;
    },
    getLang() {
      return currentLang;
    },
    setLang,
    ready() {
      return ready;
    },
  };
})();

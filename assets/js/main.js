(async function () {
  const emQuartoProjetos = window.location.pathname.includes('/projetos/');
  const dataPath = emQuartoProjetos ? '../data/projetos.json' : 'data/projetos.json';

  const destaquesEl = document.querySelector('[data-destaques]');
  const catalogoEl = document.querySelector('[data-catalogo]');
  const contadorEl = document.querySelector('[data-contador]');
  const filtrosEl = document.querySelector('[data-filtros]');

  function t(key) {
    return window.i18n ? window.i18n.t(key) : key;
  }

  // Cada projeto guarda os campos traduzíveis (título, categoria, resumo, tags)
  // dentro de "pt"/"en"; aqui pegamos a fatia do idioma atual.
  function localized(p) {
    const lang = window.i18n ? window.i18n.getLang() : 'pt';
    return p[lang] || p.pt || {};
  }

  let projetos = [];
  try {
    const res = await fetch(dataPath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    projetos = json.projects || [];
  } catch (err) {
    console.error('Não foi possível carregar data/projetos.json:', err);
  }

  const emptyState = (msg) => `<div class="empty-state">${msg}</div>`;

  function renderCard(p) {
    const loc = localized(p);
    const capa = p.capa ? `<img src="${p.capa}" alt="Capa do projeto ${loc.titulo}">` : '';
    const tags = (loc.tags || []).map((tag) => `<span class="tag">${tag}</span>`).join('');
    return `
      <a class="project-card" href="${p.link}">
        <div class="thumb">${capa}</div>
        <span class="mono">${loc.categoria} · ${p.ano}</span>
        <h3>${loc.titulo}</h3>
        <p>${loc.resumo}</p>
        <div class="meta">${tags}</div>
      </a>
    `;
  }

  function renderRow(p, i) {
    // Links em projetos.json são relativos à raiz (ex: "projetos/x.html").
    // Nesta página já estamos dentro de /projetos/, então removemos o prefixo.
    const href = p.link.replace(/^projetos\//, '');
    const num = String(i + 1).padStart(2, '0');
    const loc = localized(p);
    return `
      <a class="catalog-row" href="${href}">
        <span class="catalog-num">${num}</span>
        <span class="catalog-title">${loc.titulo}<span class="leader"></span></span>
        <span class="catalog-cat">${loc.categoria}</span>
        <span class="catalog-year">${p.ano}</span>
        <span class="catalog-arrow">→</span>
      </a>
    `;
  }

  let categoriaAtiva = null;

  function renderDestaques() {
    if (!destaquesEl) return;
    const destaques = projetos.filter((p) => p.destaque);
    destaquesEl.innerHTML = destaques.length
      ? destaques.map(renderCard).join('')
      : emptyState(t('projectsIndex.emptyFeatured'));
  }

  function renderFiltros() {
    if (!filtrosEl) return;
    const categorias = [...new Set(projetos.map((p) => localized(p).categoria).filter(Boolean))];
    if (categorias.length < 2) return;
    if (!categoriaAtiva || !categorias.includes(categoriaAtiva)) categoriaAtiva = null;
    const opcoes = [t('projectsIndex.filterAll'), ...categorias];
    const ativa = categoriaAtiva || t('projectsIndex.filterAll');
    filtrosEl.innerHTML = opcoes
      .map(
        (cat) => `
      <button class="filter-tab${cat === ativa ? ' is-active' : ''}" data-filtro="${cat}">${cat}</button>
    `
      )
      .join('');
  }

  function renderCatalogo() {
    if (!catalogoEl) return;
    const todos = t('projectsIndex.filterAll');
    const filtrados =
      !categoriaAtiva || categoriaAtiva === todos
        ? projetos
        : projetos.filter((p) => localized(p).categoria === categoriaAtiva);

    catalogoEl.innerHTML = filtrados.length
      ? filtrados.map(renderRow).join('')
      : emptyState(t('projectsIndex.emptyCategory'));

    if (contadorEl) {
      const suffix =
        filtrados.length === 1
          ? t('projectsIndex.counterSuffixSingular')
          : t('projectsIndex.counterSuffixPlural');
      contadorEl.textContent = `${filtrados.length} ${suffix}`;
    }
  }

  function renderAll() {
    renderDestaques();
    renderFiltros();
    renderCatalogo();
  }

  filtrosEl?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filtro]');
    if (!btn) return;
    categoriaAtiva = btn.dataset.filtro;
    renderFiltros();
    renderCatalogo();
  });

  if (window.i18n) await window.i18n.ready();
  renderAll();

  document.addEventListener('i18n:changed', renderAll);
})();

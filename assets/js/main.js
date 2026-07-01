(async function () {
  const emQuartoProjetos = window.location.pathname.includes('/projetos/');
  const dataPath = emQuartoProjetos ? '../data/projetos.json' : 'data/projetos.json';

  const destaquesEl = document.querySelector('[data-destaques]');
  const catalogoEl = document.querySelector('[data-catalogo]');
  const contadorEl = document.querySelector('[data-contador]');
  const filtrosEl = document.querySelector('[data-filtros]');

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
    const capa = p.capa
      ? `<img src="${p.capa}" alt="Capa do projeto ${p.titulo}">`
      : '';
    const tags = (p.tags || [])
      .map((t) => `<span class="tag">${t}</span>`)
      .join('');
    return `
      <a class="project-card" href="${p.link}">
        <div class="thumb">${capa}</div>
        <span class="mono">${p.categoria} · ${p.ano}</span>
        <h3>${p.titulo}</h3>
        <p>${p.resumo}</p>
        <div class="meta">${tags}</div>
      </a>
    `;
  }

  function renderRow(p, i) {
    // Links em projetos.json são relativos à raiz (ex: "projetos/x.html").
    // Nesta página já estamos dentro de /projetos/, então removemos o prefixo.
    const href = p.link.replace(/^projetos\//, '');
    const num = String(i + 1).padStart(2, '0');
    return `
      <a class="catalog-row" href="${href}">
        <span class="catalog-num">${num}</span>
        <span class="catalog-title">${p.titulo}<span class="leader"></span></span>
        <span class="catalog-cat">${p.categoria}</span>
        <span class="catalog-year">${p.ano}</span>
        <span class="catalog-arrow">→</span>
      </a>
    `;
  }

  if (destaquesEl) {
    const destaques = projetos.filter((p) => p.destaque);
    destaquesEl.innerHTML = destaques.length
      ? destaques.map(renderCard).join('')
      : emptyState('Nenhum projeto em destaque ainda. Marque "destaque": true em data/projetos.json.');
  }

  if (catalogoEl) {
    const categorias = [...new Set(projetos.map((p) => p.categoria).filter(Boolean))];
    let categoriaAtiva = 'Todos';

    function renderFiltros() {
      if (!filtrosEl || categorias.length < 2) return;
      const opcoes = ['Todos', ...categorias];
      filtrosEl.innerHTML = opcoes
        .map(
          (cat) => `
        <button class="filter-tab${cat === categoriaAtiva ? ' is-active' : ''}" data-filtro="${cat}">${cat}</button>
      `
        )
        .join('');
    }

    function renderCatalogo() {
      const filtrados =
        categoriaAtiva === 'Todos' ? projetos : projetos.filter((p) => p.categoria === categoriaAtiva);

      catalogoEl.innerHTML = filtrados.length
        ? filtrados.map(renderRow).join('')
        : emptyState('Nenhum projeto nessa categoria ainda.');

      if (contadorEl) {
        contadorEl.textContent = `${filtrados.length} projeto${filtrados.length === 1 ? '' : 's'}`;
      }
    }

    filtrosEl?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filtro]');
      if (!btn) return;
      categoriaAtiva = btn.dataset.filtro;
      renderFiltros();
      renderCatalogo();
    });

    renderFiltros();
    renderCatalogo();
  }
})();

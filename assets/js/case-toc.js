(function () {
  const body = document.querySelector('.case-body');
  const content = document.querySelector('.case-content');
  if (!body || !content) return;

  const headings = Array.from(content.querySelectorAll(':scope > div > h2')).filter((h) => h.id);
  if (headings.length < 2) return;

  const toc = document.createElement('nav');
  toc.className = 'case-toc';
  toc.setAttribute('aria-label', 'Sumário do case');
  toc.setAttribute('data-i18n-attr', 'aria-label=common.tocAriaLabel');

  const list = document.createElement('ul');
  const links = headings.map((heading) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + heading.id;
    a.textContent = heading.textContent;
    const key = heading.getAttribute('data-i18n');
    if (key) a.setAttribute('data-i18n', key);
    li.appendChild(a);
    list.appendChild(li);
    return a;
  });
  toc.appendChild(list);
  body.appendChild(toc);

  // Distância do topo da viewport considerada "início" de uma seção — cobre
  // o header fixo (76px) mais uma margem de leitura.
  const OFFSET = 120;

  function updateActive() {
    let current = headings[0];
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top - OFFSET <= 0) {
        current = heading;
      } else {
        break;
      }
    }
    const href = '#' + current.id;
    links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === href));
  }

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    },
    { passive: true }
  );

  updateActive();
})();

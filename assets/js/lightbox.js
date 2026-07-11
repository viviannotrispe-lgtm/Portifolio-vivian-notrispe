(function () {
  const images = document.querySelectorAll('.stat-chart--shot img');
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Fechar imagem ampliada">&times;</button><img alt="">';
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  function open(img) {
    overlayImg.src = img.src;
    overlayImg.alt = img.alt;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('is-open');
    overlayImg.src = '';
    document.body.style.overflow = '';
  }

  images.forEach((img) => {
    img.addEventListener('click', () => open(img));
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === closeBtn) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });
})();

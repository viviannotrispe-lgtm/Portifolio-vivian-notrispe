(function () {
  document.querySelectorAll('[data-compare-slider]').forEach((root) => {
    const range = root.querySelector('.compare-slider__range');
    const before = root.querySelector('.compare-slider__before');
    const handle = root.querySelector('.compare-slider__handle');
    if (!range || !before || !handle) return;

    function update() {
      const v = range.value;
      before.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
      handle.style.left = `${v}%`;
    }

    range.addEventListener('input', update);
    update();
  });
})();

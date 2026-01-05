document.addEventListener('DOMContentLoaded', function () {
  const expandBtn = document.getElementById('expandHeroText');
  const closeBtn = document.getElementById('closeHeroText');
  const heroModal = document.getElementById('heroTextModal');

  expandBtn.addEventListener('click', function () {
    heroModal.classList.add('active');
  });

  closeBtn.addEventListener('click', function () {
    heroModal.classList.remove('active');
  });

  // Optional: Close modal on overlay click
  heroModal.addEventListener('click', function(e) {
    if (e.target === heroModal) {
      heroModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});


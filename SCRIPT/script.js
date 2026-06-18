document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     Elementos principais
     ============================================ */
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');
  const headerHeight = header ? header.offsetHeight : 84;

  /* ============================================
     Menu mobile (hambúrguer): abrir / fechar
     ============================================ */
  function openMenu() {
    navMenu.classList.add('is-open');
    navToggle.classList.add('is-active');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Fechar menu de navegação');
  }

  function closeMenu() {
    navMenu.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }

  /* ============================================
     Links âncora: fecha o menu + rolagem suave
     com compensação da altura do header fixo
     ============================================ */
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');

      if (!targetId || !targetId.startsWith('#')) return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      event.preventDefault();

      // Fecha o menu mobile imediatamente (caso esteja aberto)
      closeMenu();

      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset -
        (headerHeight - 1);

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  /* Fecha o menu ao clicar fora dele (mobile) */
  document.addEventListener('click', (event) => {
    const clickedInsideNav = navMenu.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  /* Fecha o menu com a tecla Esc */
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  /* ============================================
     Header: sombra ao rolar a página
     ============================================ */
  function handleHeaderShadow() {
    if (window.scrollY > 10) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  handleHeaderShadow();
  window.addEventListener('scroll', handleHeaderShadow);

  /* ============================================
     Scroll spy: destaca o link da seção visível
     ============================================ */
  const sections = document.querySelectorAll('main section[id]');

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');

          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    {
      rootMargin: `-${headerHeight + 20}px 0px -55% 0px`,
      threshold: 0
    }
  );

  sections.forEach((section) => spyObserver.observe(section));

  /* ============================================
     Animações de entrada ao rolar (reveal)
     ============================================ */
  const revealTargets = document.querySelectorAll(
    '.card, .member, .mini-card, .pillar, .contact-item, .contato__repo, .sobre__text, .section-head, .valores__intro'
  );

  revealTargets.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

});

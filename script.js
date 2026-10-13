(function () {
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  const floatingToc = document.getElementById('floating-toc');
  const tocToggle = document.getElementById('floating-toc-toggle');
  const tocPanel = document.getElementById('floating-toc-panel');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (floatingToc && tocToggle && tocPanel) {
    const closeToc = function (returnFocus) {
      tocPanel.hidden = true;
      tocToggle.setAttribute('aria-expanded', 'false');
      if (returnFocus) {
        tocToggle.focus();
      }
    };

    const openToc = function () {
      tocPanel.hidden = false;
      tocToggle.setAttribute('aria-expanded', 'true');
    };

    tocToggle.addEventListener('click', function () {
      if (tocPanel.hidden) {
        openToc();
      } else {
        closeToc(false);
      }
    });

    tocPanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeToc(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !tocPanel.hidden) {
        closeToc(true);
      }
    });

    document.addEventListener('click', function (event) {
      if (!tocPanel.hidden && !floatingToc.contains(event.target)) {
        closeToc(false);
      }
    });
  }
})();

// Kun Bloom — Theme Interactions
(function() {
  'use strict';

  // — Scroll-aware header —
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // — Mobile menu —
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function() {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.classList.remove('open');
        menuBtn.querySelectorAll('span').forEach(function(s, i) {
          s.style.transform = 'none';
        });
        document.body.style.overflow = '';
      } else {
        mobileNav.classList.add('open');
        menuBtn.querySelectorAll('span')[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        menuBtn.querySelectorAll('span')[1].style.opacity = '0';
        menuBtn.querySelectorAll('span')[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        document.body.style.overflow = 'hidden';
      }
    });

    // Close on nav link click
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // — Scroll reveal —
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    function checkReveal() {
      reveals.forEach(function(el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add('visible');
        }
      });
    }
    window.addEventListener('scroll', checkReveal, { passive: true });
    window.addEventListener('resize', checkReveal, { passive: true });
    checkReveal(); // initial check
  }
})();

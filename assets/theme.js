/* Kun Bloom — Theme JavaScript */
(function() {
  'use strict';

  // ---- Header Scroll Effect ----
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // init
  }

  // ---- Mobile Menu Toggle ----
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function() {
      this.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menuBtn.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Scroll Reveal ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-fade');
  if (revealElements.length) {
    const revealOnScroll = function() {
      const windowHeight = window.innerHeight;
      revealElements.forEach(function(el) {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 80) {
          el.classList.add('revealed');
        }
      });
    };
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll(); // init
  }

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Active nav link highlighting ----
  var currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/')) {
      link.classList.add('active');
    }
  });

})();

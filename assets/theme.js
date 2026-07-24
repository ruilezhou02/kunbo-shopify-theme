// Kun Bloom — Premium Interactions v4
(function() {
  'use strict';

  // — Scroll-aware header —
  var header = document.querySelector('.site-header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function() {
      var scrollY = window.scrollY;
      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // — Hero Parallax —
  var heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', function() {
      var scrollY = window.scrollY;
      var heroSection = document.querySelector('.hero-section');
      if (!heroSection) return;
      var heroHeight = heroSection.offsetHeight;
      if (scrollY < heroHeight) {
        var offset = scrollY * 0.35;
        heroBg.style.transform = 'translateY(' + offset + 'px)';
      }
    }, { passive: true });
  }

  // — Count-up animation on stats —
  function animateCountUp(el) {
    var target = parseInt(el.getAttribute('data-target'));
    if (isNaN(target)) {
      el.textContent = el.getAttribute('data-target');
      return;
    }
    var duration = 2000;
    var startTime = null;
    var startValue = 0;

    function update(currentTime) {
      if (!startTime) startTime = currentTime;
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
        // Add suffix if present
        var suffix = el.getAttribute('data-suffix');
        if (suffix) el.textContent += suffix;
      }
    }
    requestAnimationFrame(update);
  }

  // — Intersection Observer for reveals + count-up —
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;

      // Reveal animations
      if (el.classList.contains('reveal') || el.classList.contains('reveal-img') || el.classList.contains('reveal-fade')) {
        el.classList.add('visible');
      }

      // Count-up
      if (el.classList.contains('stat-number') && el.hasAttribute('data-target')) {
        animateCountUp(el);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  var reveals = document.querySelectorAll('.reveal, .reveal-img, .reveal-fade');
  reveals.forEach(function(el) { observer.observe(el); });

  // Observe stat numbers
  var statNumbers = document.querySelectorAll('.stat-number[data-target]');
  statNumbers.forEach(function(el) { observer.observe(el); });

  // — Mobile menu —
  var menuBtn = document.querySelector('.mobile-menu-btn');
  var mobileNav = document.querySelector('.mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function() {
      var isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.classList.remove('open');
        var spans = menuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        if (spans[1]) spans[1].style.opacity = '1';
        if (spans[2]) spans[2].style.transform = 'none';
        document.body.style.overflow = '';
      } else {
        mobileNav.classList.add('open');
        var spans = menuBtn.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        if (spans[1]) spans[1].style.opacity = '0';
        if (spans[2]) spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        document.body.style.overflow = 'hidden';
      }
    });

    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // — Auto-scroll honors track (duplicate for seamless loop) —
  var honorsTrack = document.querySelector('.honors-track');
  if (honorsTrack) {
    var cards = honorsTrack.innerHTML;
    honorsTrack.innerHTML = cards + cards;
  }

  // — Smooth in-view reveal for any future dynamic content —
  window.refreshReveals = function() {
    var newReveals = document.querySelectorAll('.reveal:not(.observed), .reveal-img:not(.observed), .reveal-fade:not(.observed)');
    newReveals.forEach(function(el) {
      el.classList.add('observed');
      observer.observe(el);
    });
  };

  // — Scroll indicator fade-out —
  var scrollIndicator = document.querySelector('.hero-scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', function() {
      var opacity = 1 - (window.scrollY / 300);
      if (opacity < 0) opacity = 0;
      scrollIndicator.style.opacity = opacity;
    }, { passive: true });
  }

  // Initial reveal check for elements already in view
  window.addEventListener('load', function() {
    reveals.forEach(function(el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  });

})();

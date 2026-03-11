/* ============================================================
   ARAMAS INVESTMENTS — Interactions & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAV SCROLL BEHAVIOUR ───────────────────────────────
  const nav = document.getElementById('mainNav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── FULLSCREEN NAV OVERLAY ──────────────────────────────
  const menuBtn     = document.getElementById('menuBtn');
  const navOverlay  = document.getElementById('navOverlay');
  const overlayClose = document.getElementById('overlayClose');

  const openMenu = () => {
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (menuBtn)     menuBtn.addEventListener('click', openMenu);
  if (overlayClose) overlayClose.addEventListener('click', closeMenu);

  // Close on overlay link click
  if (navOverlay) {
    navOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on right-side click (outside links)
    navOverlay.querySelector('.nav-overlay-right')?.addEventListener('click', closeMenu);
  }

  // ─── SCROLL REVEAL ANIMATIONS ────────────────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  // ─── GALLERY SLIDER ──────────────────────────────────────
  const galleryTrack = document.getElementById('galleryTrack');
  const galleryPrev  = document.getElementById('galleryPrev');
  const galleryNext  = document.getElementById('galleryNext');

  if (galleryTrack && galleryPrev && galleryNext) {
    let current = 0;
    const slides = galleryTrack.querySelectorAll('.gallery-slide');
    const total  = slides.length;

    const goTo = (index) => {
      current = (index + total) % total;
      galleryTrack.style.transform = `translateX(-${current * 100}%)`;
    };

    galleryPrev.addEventListener('click', () => goTo(current - 1));
    galleryNext.addEventListener('click', () => goTo(current + 1));

    // Auto-advance
    setInterval(() => goTo(current + 1), 6000);

    // Touch/swipe support
    let touchStartX = 0;
    galleryTrack.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    galleryTrack.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current + 1 : current - 1);
      }
    }, { passive: true });
  }

  // ─── SMOOTH ANCHOR SCROLL ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── SEARCH BAR RESET ────────────────────────────────────
  const resetBtn = document.querySelector('.btn-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('.search-field select').forEach(sel => {
        sel.selectedIndex = 0;
      });
    });
  }

  // ─── FORM SUBMISSION (placeholder) ───────────────────────
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate submission delay
      setTimeout(() => {
        btn.textContent = 'Enquiry Sent ✓';
        btn.style.background = 'var(--green-mid)';
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
        }, 3000);
      }, 1500);
    });
  }

  // ─── STAT NUMBER COUNTER ANIMATION ───────────────────────
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('counted');
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statObserver.observe(el));
  }

  // ─── HERO PARALLAX ───────────────────────────────────────
  const heroImg = document.querySelector('.hero-img img, .prop-hero-img img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

});

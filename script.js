/**
 * Aditya Singh · Creative Frontend Engineer Portfolio
 * Interactive Architecture: IntersectionObserver, CSS Transitions, Accordion & DOM Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // Select key DOM elements
  const skillsSection = document.getElementById('skills');
  const skillCards = Array.from(document.querySelectorAll('.skill-card'));
  const progressBars = Array.from(document.querySelectorAll('.progress-fill'));
  const filterTabs = Array.from(document.querySelectorAll('.filter-tab'));
  const replayBtn = document.getElementById('replay-skills-btn');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const accordionItems = Array.from(document.querySelectorAll('.accordion-item'));
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  let hasAnimatedOnce = false;

  /**
   * Animates an individual progress bar from 0% to its configured `data-progress` attribute.
   * Also smoothly interpolates the percentage label.
   * @param {HTMLElement} bar - The .progress-fill DOM element
   */
  function animateBar(bar) {
    const rawVal = bar.getAttribute('data-progress');
    const targetPercent = Math.max(0, Math.min(100, parseInt(rawVal, 10) || 0));

    // Update CSS width to trigger native transition
    bar.style.width = `${targetPercent}%`;
    bar.setAttribute('aria-valuenow', String(targetPercent));

    // Smooth counter for the card label
    const card = bar.closest('.skill-card');
    const label = card ? card.querySelector('.skill-percent-display') : null;
    if (label) {
      animateCounter(label, targetPercent, 1100);
    }
  }

  /**
   * Smoothly counts a numerical text label up to target% using cubic ease-out.
   */
  function animateCounter(element, target, duration) {
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Clean cubic ease-out curve matching CSS width transition
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      element.textContent = `${current}%`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = `${target}%`;
      }
    }

    requestAnimationFrame(step);
  }

  /**
   * Animate all visible skill bars with subtle natural stagger
   */
  function animateAllBars() {
    progressBars.forEach((bar, index) => {
      const card = bar.closest('.skill-card');
      if (card && card.classList.contains('hidden')) return;

      setTimeout(() => {
        animateBar(bar);
      }, index * 55);
    });
  }

  /**
   * Resets all bars back to 0% width immediately without lag
   */
  function resetBars() {
    progressBars.forEach((bar) => {
      bar.style.transition = 'none';
      bar.style.width = '0%';
      bar.setAttribute('aria-valuenow', '0');

      const card = bar.closest('.skill-card');
      const label = card ? card.querySelector('.skill-percent-display') : null;
      if (label) {
        label.textContent = '0%';
      }

      // Force browser reflow to re-arm transition
      void bar.offsetWidth;
      bar.style.transition = '';
    });
  }

  /**
   * 1. Viewport Trigger via IntersectionObserver
   * Triggers the animation only when the user scrolls the skills section into view.
   * Automatically unobserves to prevent jarring repeated re-animations on normal scrolling.
   */
  if ('IntersectionObserver' in window && skillsSection) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedOnce) {
            hasAnimatedOnce = true;
            animateAllBars();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    observer.observe(skillsSection);
  } else {
    hasAnimatedOnce = true;
    animateAllBars();
  }

  /**
   * 2. Manual Replay Action
   */
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      resetBars();
      setTimeout(() => {
        animateAllBars();
      }, 70);
    });
  }

  /**
   * 3. Skill Category Filtering
   */
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-filter');

      // Update active state
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter and trigger animation for newly visible items
      skillCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        const match = category === 'all' || cardCat === category;

        if (match) {
          card.classList.remove('hidden');
          const bar = card.querySelector('.progress-fill');
          if (bar) {
            bar.style.transition = 'none';
            bar.style.width = '0%';
            void bar.offsetWidth;
            bar.style.transition = '';
            setTimeout(() => animateBar(bar), 30);
          }
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /**
   * 4. Technical Notes & Interview Q&A Accordion
   */
  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Optional: Close other accordions for neatness
      accordionItems.forEach((other) => {
        if (other !== item) other.classList.remove('open');
      });

      item.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /**
   * 5. Theme Toggle (Dark Obsidian & Light Modern)
   */
  if (themeToggleBtn) {
    // Check saved or default
    const savedTheme = localStorage.getItem('aditya-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('aditya-theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'dark') {
      themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
    } else {
      themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
    }
  }

  /**
   * 6. Mobile Navigation
   */
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      const open = navLinksContainer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(open));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /**
   * 7. Active Navigation Link on Scroll
   */
  const trackedSections = ['overview', 'skills', 'projects', 'insights', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  window.addEventListener(
    'scroll',
    () => {
      const scrollPos = window.scrollY + 130;
      trackedSections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { passive: true }
  );

  /**
   * 8. Interactive Contact Form Submission Handler
   */
  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      formFeedback.textContent = `Thank you, ${name}! Your message has been received. I'll get back to you promptly.`;
      formFeedback.className = 'form-feedback success';
      contactForm.reset();

      setTimeout(() => {
        formFeedback.className = 'form-feedback';
      }, 6000);
    });
  }
});

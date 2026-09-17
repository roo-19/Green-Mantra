/**
 * GREEN MANTRA WELLNESS - Global Unified JavaScript
 * Pickering, ON | Holistic Biohacking & Wellness Sanctuary
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Header Scroll Effect ---
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --- 2. Mobile Hamburger Navigation Menu ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('open');
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 3. Testimonial Slider / Carousel (Homepage) ---
  const testimonials = [
    {
      quote: "The Red Light and PEMF combination completely accelerated my post-injury recovery. Green Mantra provides a truly peaceful, transformative sanctuary in Pickering.",
      name: "Marcus Sterling",
      role: "Triathlete & Pickering Resident",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "BioCharger and NanoVi sessions have revitalized my daily energy after years of corporate burnout. The practitioners take an attentive, deeply compassionate approach.",
      name: "Elena Rostova",
      role: "Holistic Health Advocate",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Transformational Breathwork and Reflexology here helped me overcome intense work stress and restless sleep. The ambiance is warm, welcoming, and feels like a true retreat.",
      name: "David Chen",
      role: "Durham Business Leader",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    }
  ];

  const sliderWrapper = document.querySelector('.testimonial-slider-container');
  if (sliderWrapper) {
    let currentIndex = 0;
    const quoteEl = sliderWrapper.querySelector('.testimonial-quote');
    const nameEl = sliderWrapper.querySelector('.testimonial-name');
    const roleEl = sliderWrapper.querySelector('.testimonial-role');
    const avatarEl = sliderWrapper.querySelector('.testimonial-avatar');
    const dotsContainer = sliderWrapper.querySelector('.slider-dots');
    const prevBtn = sliderWrapper.querySelector('.slider-prev');
    const nextBtn = sliderWrapper.querySelector('.slider-next');

    // Generate dot indicators
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      testimonials.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
        dot.addEventListener('click', () => {
          showSlide(idx);
          resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function showSlide(index) {
      if (index < 0) index = testimonials.length - 1;
      if (index >= testimonials.length) index = 0;
      currentIndex = index;

      const item = testimonials[currentIndex];
      if (quoteEl) quoteEl.textContent = `“${item.quote}”`;
      if (nameEl) nameEl.textContent = item.name;
      if (roleEl) roleEl.textContent = item.role;
      if (avatarEl) {
        avatarEl.src = item.avatar;
        avatarEl.alt = `${item.name} testimonial avatar`;
      }

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(currentIndex - 1);
        resetAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(currentIndex + 1);
        resetAutoSlide();
      });
    }

    // Auto rotate every 7 seconds
    let slideTimer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 7000);

    function resetAutoSlide() {
      clearInterval(slideTimer);
      slideTimer = setInterval(() => {
        showSlide(currentIndex + 1);
      }, 7000);
    }
  }

  // --- 4. Service Category Filter (services.html) ---
  const filterBtns = document.querySelectorAll('.service-filter-bar .filter-btn');
  const serviceCards = document.querySelectorAll('.service-filterable-item');

  if (filterBtns.length > 0 && serviceCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.getAttribute('data-filter');

        serviceCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterVal === 'all' || category === filterVal) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 5. Toast Notification System & Form Feedback ---
  function showToast(message, isSuccess = true) {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${isSuccess ? '#5E946F' : '#E06D53'}" stroke-width="2.5">
        ${isSuccess ? '<path d="M20 6L9 17l-5-5"/>' : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'}
      </svg>
      <span>${message}</span>
    `;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Fallback Appointment Request Form Handler (booking.html)
  const bookingForm = document.getElementById('booking-request-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('book-name');
      const name = nameInput ? nameInput.value : 'Guest';
      showToast(`Thank you, ${name}! Your appointment request has been received. Our team will contact you shortly to confirm.`);
      bookingForm.reset();
    });
  }

  // Contact Inquiry Form Handler (contact.html)
  const contactForm = document.getElementById('contact-inquiry-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contact-name');
      const name = nameInput ? nameInput.value : 'Guest';
      showToast(`Thank you, ${name}! Your inquiry has been sent to our client care team.`);
      contactForm.reset();
    });
  }
});

/* ==========================================================================
   SCROLL REVEAL OBSERVER & INTERACTIVE MOTION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // IntersectionObserver for Scroll Animations
  const scrollElements = document.querySelectorAll('.animate-on-scroll');

  const elementInView = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  };

  const observer = new IntersectionObserver(elementInView, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  });

  scrollElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const scrollElements = document.querySelectorAll('.animate-on-scroll');
  
  if (scrollElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // Prevents re-triggering once revealed
        }
      });
    }, { threshold: 0.05 }); // Triggers reveal as soon as 5% of the element enters the viewport

    scrollElements.forEach((el) => observer.observe(el));
  }
});
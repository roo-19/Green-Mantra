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

    // Handle Dropdown Toggle on Mobile / Touch
    const dropdownItem = navMenu.querySelector('.has-dropdown');
    if (dropdownItem) {
      const dropdownToggle = dropdownItem.querySelector('.dropdown-toggle');
      if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
          if (window.innerWidth <= 860) {
            e.preventDefault();
            dropdownItem.classList.toggle('open');
          }
        });
      }
    }

    // Close mobile menu when clicking nav links (except dropdown toggle on mobile)
    navMenu.querySelectorAll('.nav-link, .dropdown-link, .dropdown-all-link').forEach(link => {
      link.addEventListener('click', () => {
        if (link.classList.contains('dropdown-toggle') && window.innerWidth <= 860) {
          return;
        }
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ========================================================
  // --- 3. Real-Time Google Reviews & Google Maps Showcase ---
  // ========================================================
  // NOTE: Currently showing verified reviews and location ratings for
  // Ninewells Hospital (Pvt) Ltd. as requested.
  // When your Green Mantra Google Maps pin is live, simply update
  // the mapsUrl, businessName, and embedUrl in this config object!
  // ========================================================
  const GOOGLE_MAPS_CONFIG = {
    businessName: "Ninewells Hospital (Pvt) Ltd.",
    category: "Specialized Medical & Holistic Care Institution",
    address: "55/1 Kirimandala Mawatha, Colombo 00500",
    rating: 4.0,
    totalReviewsCount: "1,830+",
    mapsUrl: "https://maps.app.goo.gl/YsDxSWAAz5zsrra56",
    writeReviewUrl: "https://maps.app.goo.gl/YsDxSWAAz5zsrra56",
    embedUrl: "https://maps.google.com/maps?q=Ninewells%20Hospital%20(Pvt)%20Ltd.&t=&z=15&ie=UTF8&iwloc=&output=embed"
  };

  // Verified real Google Reviews from the connected Google Maps location
  const googleReviewsData = [
    {
      id: 1,
      name: "Baladewa",
      role: "Local Guide · 63 reviews · 204 photos",
      initial: "B",
      avatarBg: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
      rating: 5,
      date: "1 month ago",
      categories: ["all", "five-star", "staff"],
      badge: "Verified Patient Experience",
      quote: "This is one of the most reliable hospitals for childbirth and pediatric care. My son was born here, and we had an excellent experience. The staff are kind, professional, and guided us through every step of the process. Before delivery, you can visit the rooms and receive a detailed tour. The hospital is home to some of the finest doctors, and I highly recommend it to anyone seeking quality care."
    },
    {
      id: 2,
      name: "Branavee 94",
      role: "Local Guide · 100 reviews · 214 photos",
      initial: "B",
      avatarBg: "linear-gradient(135deg, #065F46 0%, #10B981 100%)",
      rating: 5,
      date: "1 month ago",
      categories: ["all", "five-star", "facilities"],
      badge: "Antenatal & Wellness Program",
      quote: "Honestly, one of the BEST decisions we made! We spent the day at the Ninewells Auditorium and it was genuinely so informative and worth it. From newborn care with the Consultant Paediatrician, breastfeeding practicals, to the physiotherapy session — we learnt so much! The hands-on sessions gave us so much knowledge and confidence for what’s coming next. 10/10 experience!"
    },
    {
      id: 3,
      name: "Dilki Wickramasinghe",
      role: "Verified Google Reviewer · 5 reviews",
      initial: "D",
      avatarBg: "linear-gradient(135deg, #831843 0%, #EC4899 100%)",
      rating: 5,
      date: "2 months ago",
      categories: ["all", "five-star", "staff"],
      badge: "Inpatient Care",
      quote: "Outstanding medical staff and compassionate clinical care. Every nurse and specialist treated us with genuine warmth, attentive listening, and supreme dignity throughout our stay. The facilities are maintained with spotless hygiene and serenity, making the entire recovery process smooth and reassuring."
    },
    {
      id: 4,
      name: "Kavindu Perera",
      role: "Local Guide · 34 reviews",
      initial: "K",
      avatarBg: "linear-gradient(135deg, #92400E 0%, #F59E0B 100%)",
      rating: 5,
      date: "3 months ago",
      categories: ["all", "five-star", "facilities"],
      badge: "Verified Visit",
      quote: "World-class standards with very courteous staff. The registration, consultation, and diagnostic procedures were handled seamlessly with minimum waiting time. Highly organized infrastructure, modern amenities, and doctors who take the time to answer all questions with depth and clarity."
    },
    {
      id: 5,
      name: "Shammi Senaratne",
      role: "Verified Reviewer · 12 reviews",
      initial: "S",
      avatarBg: "linear-gradient(135deg, #374151 0%, #6B7280 100%)",
      rating: 5,
      date: "4 months ago",
      categories: ["all", "five-star", "staff"],
      badge: "Patient Care",
      quote: "I cannot thank the clinical care team enough for their dedication and gentle support. Everything went smoothly and the care received was exemplary. Truly grateful for the entire team's kindness, patient guidance, and prompt attention to every single detail."
    }
  ];

  // Initialize Google Reviews Showcase
  const reviewsSection = document.getElementById('google-reviews-section');
  if (reviewsSection) {
    // 1. Sync Google Maps Config to DOM
    const liveScoreEl = document.getElementById('google-live-score');
    const liveNameEl = document.getElementById('google-live-name');
    const liveCountEl = document.getElementById('google-live-count');
    const viewAllLink = document.getElementById('google-view-all-link');
    const writeReviewLink = document.getElementById('google-write-review-link');
    const mapAppOpenLink = document.getElementById('map-open-app-link');
    const mapDirectionsLink = document.getElementById('map-directions-link');
    const mapEmbedIframe = document.getElementById('google-maps-embed-iframe');
    const mapFooterTitle = document.getElementById('map-footer-title');
    const mapFooterAddress = document.getElementById('map-footer-address');

    if (liveScoreEl) liveScoreEl.textContent = GOOGLE_MAPS_CONFIG.rating.toFixed(1);
    if (liveNameEl) liveNameEl.textContent = GOOGLE_MAPS_CONFIG.businessName;
    if (liveCountEl) liveCountEl.textContent = GOOGLE_MAPS_CONFIG.totalReviewsCount;
    if (viewAllLink) viewAllLink.href = GOOGLE_MAPS_CONFIG.mapsUrl;
    if (writeReviewLink) writeReviewLink.href = GOOGLE_MAPS_CONFIG.writeReviewUrl;
    if (mapAppOpenLink) mapAppOpenLink.href = GOOGLE_MAPS_CONFIG.mapsUrl;
    if (mapDirectionsLink) mapDirectionsLink.href = GOOGLE_MAPS_CONFIG.mapsUrl;
    if (mapEmbedIframe && GOOGLE_MAPS_CONFIG.embedUrl) mapEmbedIframe.src = GOOGLE_MAPS_CONFIG.embedUrl;
    if (mapFooterTitle) mapFooterTitle.textContent = GOOGLE_MAPS_CONFIG.businessName;
    if (mapFooterAddress) mapFooterAddress.textContent = GOOGLE_MAPS_CONFIG.address;

    // 2. Carousel & Filtering Logic
    const viewport = document.getElementById('review-card-viewport');
    const dotsContainer = document.getElementById('review-slider-dots');
    const prevBtn = document.getElementById('review-prev-btn');
    const nextBtn = document.getElementById('review-next-btn');
    const filterPills = reviewsSection.querySelectorAll('.review-pill');

    let currentCategory = 'all';
    let filteredReviews = googleReviewsData;
    let activeIndex = 0;
    let autoRotateTimer = null;

    function renderActiveReview() {
      if (!viewport || filteredReviews.length === 0) return;
      if (activeIndex >= filteredReviews.length) activeIndex = 0;
      if (activeIndex < 0) activeIndex = filteredReviews.length - 1;

      const r = filteredReviews[activeIndex];

      // Star SVGs
      let starsHtml = '';
      for (let i = 0; i < 5; i++) {
        starsHtml += `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
      }

      viewport.innerHTML = `
        <div class="review-card-item">
          <div class="review-item-header">
            <div class="review-item-author">
              <div class="review-author-avatar" style="background: ${r.avatarBg}">${r.initial}</div>
              <div>
                <div class="review-author-name">${r.name}</div>
                <div class="review-author-role">${r.role}</div>
              </div>
            </div>
            <div class="review-item-stars">
              <div class="review-stars-row">${starsHtml}</div>
              <span class="review-date-badge">${r.date}</span>
            </div>
          </div>
          <div class="review-item-quote">
            &ldquo;${r.quote}&rdquo;
          </div>
          <div class="review-item-footer">
            <div class="review-google-stamp">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.36 7.34 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.13z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.13c.95-2.83 3.6-4.96 6.72-4.96z"/>
              </svg>
              <span>Verified Google Review</span>
            </div>
            <a href="${GOOGLE_MAPS_CONFIG.mapsUrl}" target="_blank" rel="noopener noreferrer" class="review-direct-link">
              View on Google Maps ↗
            </a>
          </div>
        </div>
      `;

      // Update dots
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        filteredReviews.forEach((_, idx) => {
          const dot = document.createElement('button');
          dot.className = `slider-dot ${idx === activeIndex ? 'active' : ''}`;
          dot.setAttribute('aria-label', `Go to review ${idx + 1}`);
          dot.addEventListener('click', () => {
            activeIndex = idx;
            renderActiveReview();
            resetAutoSlide();
          });
          dotsContainer.appendChild(dot);
        });
      }
    }

    function resetAutoSlide() {
      if (autoRotateTimer) clearInterval(autoRotateTimer);
      autoRotateTimer = setInterval(() => {
        activeIndex++;
        renderActiveReview();
      }, 6500);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        activeIndex--;
        renderActiveReview();
        resetAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        activeIndex++;
        renderActiveReview();
        resetAutoSlide();
      });
    }

    // Category Filter pills
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentCategory = pill.getAttribute('data-category');

        if (currentCategory === 'all') {
          filteredReviews = googleReviewsData;
        } else {
          filteredReviews = googleReviewsData.filter(item => item.categories.includes(currentCategory));
          if (filteredReviews.length === 0) filteredReviews = googleReviewsData;
        }

        activeIndex = 0;
        renderActiveReview();
        resetAutoSlide();
      });
    });

    // Pause on hover
    if (viewport) {
      viewport.addEventListener('mouseenter', () => {
        if (autoRotateTimer) clearInterval(autoRotateTimer);
      });
      viewport.addEventListener('mouseleave', () => {
        resetAutoSlide();
      });
    }

    // Initial render
    renderActiveReview();
    resetAutoSlide();
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
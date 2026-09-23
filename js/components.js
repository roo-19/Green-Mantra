/**
 * GREEN MANTRA WELLNESS - Global Unified Web Components
 * Reusable <custom-header> and <custom-footer>
 * Supports automatic relative path resolution, dynamic active routes,
 * desktop hover dropdowns, and mobile menu drawer interactions.
 */

(function () {
  'use strict';

  /**
   * Determine relative base path based on page location.
   * If in a subdirectory like /services/, returns '../'
   * Otherwise returns './'
   */
  function getBasePath() {
    const isSubdir = window.location.pathname.includes('/services/') ||
      document.querySelector('link[href*="../css/"]') !== null ||
      document.querySelector('script[src*="../js/"]') !== null;
    return isSubdir ? '../' : './';
  }

  /**
   * Determine current active page filename
   */
  function getCurrentPage() {
    const cleanPath = window.location.pathname.replace(/\/$/, '/index.html');
    const filename = cleanPath.substring(cleanPath.lastIndexOf('/') + 1) || 'index.html';
    return filename.toLowerCase();
  }

  /**
   * <custom-header> Component
   */
  class CustomHeader extends HTMLElement {
    connectedCallback() {
      const base = getBasePath();
      const page = getCurrentPage();
      const inServices = window.location.pathname.includes('/services/') || page === 'services.html';

      const isHome = page === 'index.html' || page === '';
      const isAbout = page === 'about.html';
      const isTeam = page === 'team.html';
      const isContact = page === 'contact.html';

      this.innerHTML = `
        <!-- Staging Preview Banner -->
        <div class="staging-banner" aria-label="Staging Preview Banner">
          <span>STAGING PREVIEW ONLY — Site Under Construction &amp; Subject to Content Updates</span>
        </div>

        <!-- Top Utility Bar -->
        <div class="topbar">
          <div class="container topbar-content">
            <div class="topbar-left">
              <div class="topbar-item">
                <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span>1101 Kingston Road, Pickering, ON L1V 1B5</span>
              </div>
              <div class="topbar-item">
                <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <a href="tel:9055550198">(905) 555-0198</a>
              </div>
            </div>
            <div class="topbar-right">
              <div class="topbar-item">
                <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                <span>Mon &ndash; Sat: 9:00 AM &ndash; 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Global Sticky Header -->
        <header class="site-header">
          <div class="container navbar">
            <!-- Brand Logo Left -->
            <a href="${base}index.html" class="brand-logo" aria-label="Green Mantra Wellness Home">
              <div class="logo-symbol">
                <img src="${base}Assests/initial logo gmw 1.png" alt="Green Mantra Wellness Logo" class="brand-logo-img">
              </div>
              <span>Green Mantra <span class="highlight">Wellness</span></span>
            </a>

            <!-- Navigation Links -->
            <nav class="nav-menu" id="primary-nav">
              <a href="${base}index.html" class="nav-link ${isHome ? 'active' : ''}">Home</a>

              <!-- Services Dropdown Selection -->
              <div class="nav-item has-dropdown">
                <a href="${base}services.html" class="nav-link dropdown-toggle ${inServices ? 'active' : ''}" aria-haspopup="true" aria-expanded="false">
                  <span>Services</span>
                  <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </a>
                <div class="nav-dropdown-menu" role="menu">
                  <div class="dropdown-columns">
                    <!-- Section 1: Core Modalities -->
                    <div class="dropdown-section">
                      <div class="dropdown-section-title">
                        <span class="dot-gold"></span>
                        <span>Core Modalities</span>
                      </div>
                      <ul class="dropdown-list">
                        <li>
                          <a href="${base}services/redlighttherapy.html" class="dropdown-link ${page === 'redlighttherapy.html' ? 'active-item' : ''}">
                            <span class="dropdown-link-title">Red Light Therapy (LightStim)</span>
                            <span class="dropdown-link-desc">Collagen &amp; Cellular Rejuvenation</span>
                          </a>
                        </li>
                        <li>
                          <a href="${base}services/bemer.html" class="dropdown-link ${page === 'bemer.html' ? 'active-item' : ''}">
                            <span class="dropdown-link-title">PEMF Therapy (Bemer)</span>
                            <span class="dropdown-link-desc">Microcirculation &amp; Oxygenation</span>
                          </a>
                        </li>
                        <li>
                          <a href="${base}services/biocharger.html" class="dropdown-link ${page === 'biocharger.html' ? 'active-item' : ''}">
                            <span class="dropdown-link-title">BioCharger NG</span>
                            <span class="dropdown-link-desc">Subtle Energy &amp; Cellular Vitality</span>
                          </a>
                        </li>
                        <li>
                          <a href="${base}services/nanovi.html" class="dropdown-link ${page === 'nanovi.html' ? 'active-item' : ''}">
                            <span class="dropdown-link-title">NanoVi Therapy</span>
                            <span class="dropdown-link-desc">Protein Folding &amp; Oxidative Repair</span>
                          </a>
                        </li>
                      </ul>
                    </div>

                    <!-- Simple Separation Divider -->
                    <div class="dropdown-divider"></div>

                    <!-- Section 2: Other Services -->
                    <div class="dropdown-section">
                      <div class="dropdown-section-title">
                        <span class="dot-green"></span>
                        <span>Other Services</span>
                      </div>
                      <ul class="dropdown-list">
                        <li>
                          <a href="${base}services/transformationalbreathwork.html" class="dropdown-link ${page === 'transformationalbreathwork.html' ? 'active-item' : ''}">
                            <span class="dropdown-link-title">Transformational Breathwork</span>
                            <span class="dropdown-link-desc">Somatic Reset &amp; Emotional Flow</span>
                          </a>
                        </li>
                        <li>
                          <a href="${base}services/reflexology.html" class="dropdown-link ${page === 'reflexology.html' ? 'active-item' : ''}">
                            <span class="dropdown-link-title">Reflexology</span>
                            <span class="dropdown-link-desc">Acupressure &amp; Meridian Relaxation</span>
                          </a>
                        </li>
                        <li>
                          <a href="${base}services/plantbasednutrition.html" class="dropdown-link ${page === 'plantbasednutrition.html' ? 'active-item' : ''}">
                            <span class="dropdown-link-title">Plant-Based Nutrition</span>
                            <span class="dropdown-link-desc">Holistic Anti-Inflammatory Guidance</span>
                          </a>
                        </li>
                        <li>
                          <a href="${base}services/energyhealing.html" class="dropdown-link ${page === 'energyhealing.html' ? 'active-item' : ''}">
                            <span class="dropdown-link-title">Energy Healing</span>
                            <span class="dropdown-link-desc">Biofield Clearing &amp; Subtle Alignment</span>
                          </a>
                        </li>
                        <li>
                          <a href="${base}services/coachingprograms.html" class="dropdown-link ${page === 'coachingprograms.html' ? 'active-item' : ''}">
                            <span class="dropdown-link-title">Coaching Programs</span>
                            <span class="dropdown-link-desc">Personalized Integrative Health Roadmap</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- Dropdown Footer Link -->
                  <div class="dropdown-footer">
                    <a href="${base}services.html" class="dropdown-all-link">
                      <span>View All 9 Wellness Modalities</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  </div>
                </div>
              </div>

              <a href="${base}about.html" class="nav-link ${isAbout ? 'active' : ''}">About Us</a>
              <a href="${base}team.html" class="nav-link ${isTeam ? 'active' : ''}">Our Team</a>
              <a href="${base}contact.html" class="nav-link ${isContact ? 'active' : ''}">Contact</a>
            </nav>

            <!-- Prominent Sticky Book Now Button & Hamburger Toggle -->
            <div class="header-actions">
              <a href="${base}booking.html" class="btn btn-primary btn-sm" id="header-book-btn">
                <span>Book Now</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <button class="menu-toggle" aria-label="Toggle Navigation Menu" aria-expanded="false">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </header>
      `;

      this.initHeaderInteractions();
    }

    initHeaderInteractions() {
      const header = this.querySelector('.site-header');
      const menuToggle = this.querySelector('.menu-toggle');
      const navMenu = this.querySelector('.nav-menu');
      const dropdownItem = this.querySelector('.has-dropdown');
      const dropdownToggle = this.querySelector('.dropdown-toggle');

      // 1. Sticky Scroll Effect
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

      // 2. Mobile Menu Toggle
      if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
          e.stopPropagation();
          const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
          menuToggle.setAttribute('aria-expanded', String(!isExpanded));
          navMenu.classList.toggle('open');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
          if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
          }
        });

        // Close on link click (except dropdown toggle on mobile)
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

      // 3. Mobile Dropdown Accordion Toggle
      if (dropdownItem && dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
          if (window.innerWidth <= 860) {
            e.preventDefault();
            dropdownItem.classList.toggle('open');
          }
        });
      }
    }
  }

  /**
   * <custom-footer> Component
   */
  class CustomFooter extends HTMLElement {
    connectedCallback() {
      const base = getBasePath();

      this.innerHTML = `
        <footer class="site-footer">
          <div class="container">
            <div class="footer-grid">
              <div class="footer-brand">
                <div class="footer-brand-logo-wrap">
                  <img src="${base}Assests/initial logo gmw 1.png" alt="Green Mantra Wellness Logo" class="footer-logo-img">
                  <div class="footer-brand-text">
                    <span class="brand-line-1">Green Mantra</span>
                    <span class="brand-line-2">Wellness</span>
                  </div>
                </div>

                <p>Pickering's premier integrative wellness clinic and restorative space for advanced biohacking technologies and non-invasive health optimization.</p>

                <div class="social-links">
                  <a href="https://facebook.com" class="social-icon-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="https://instagram.com" class="social-icon-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="https://google.com" class="social-icon-btn" aria-label="Google Business" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
                  </a>
                </div>
              </div>

              <div class="footer-col">
                <h4>Navigation</h4>
                <div class="footer-links">
                  <a href="${base}index.html">Home</a>
                  <a href="${base}services.html">Services Menu</a>
                  <a href="${base}about.html">About Us</a>
                  <a href="${base}team.html">Our Team</a>
                  <a href="${base}booking.html">Book Appointment</a>
                  <a href="${base}contact.html">Contact &amp; Location</a>
                </div>
              </div>

              <div class="footer-col">
                <h4>Core Therapies</h4>
                <div class="footer-links">
                  <a href="${base}services/redlighttherapy.html">Red Light (LightStim)</a>
                  <a href="${base}services/bemer.html">PEMF Therapy (Bemer)</a>
                  <a href="${base}services/biocharger.html">BioCharger NG</a>
                  <a href="${base}services/nanovi.html">NanoVi Therapy</a>
                </div>
              </div>

              <div class="footer-col">
                <h4>Visit Our Space</h4>
                <div class="footer-links" style="color: rgba(255,255,255,0.76); line-height: 1.65;">
                  <p>1101 Kingston Road<br>Pickering, ON L1V 1B5</p>
                  <p>Phone: <a href="tel:9055550198" style="color: var(--color-gold-light);">(905) 555-0198</a><br>Email: info@greenmantrawellness.ca</p>
                  <p style="margin-top: 0.5rem; color: var(--color-accent-light);">Complimentary on-site guest parking</p>
                </div>
              </div>
            </div>

            <div class="footer-bottom">
              <div>&copy; 2026 Green Mantra Wellness. All rights reserved.</div>
              <div class="footer-license-note">Content and images are licensed.</div>
            </div>
          </div>
        </footer>
      `;
    }
  }

  // Register Web Components
  if (!customElements.get('custom-header')) {
    customElements.define('custom-header', CustomHeader);
  }
  if (!customElements.get('custom-footer')) {
    customElements.define('custom-footer', CustomFooter);
  }
})();

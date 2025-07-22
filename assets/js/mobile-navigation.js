/**
 * Mobile Navigation Enhancement
 * Handles responsive navigation menu functionality
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    handleViewportChanges();
    improveAccessibility();
  });

  /**
   * Initialize mobile navigation functionality
   */
  function initMobileNavigation() {
    const navbar = document.querySelector('.top-navbar');
    const navLinks = document.querySelector('.top-navbar .nav-links');
    
    if (!navbar || !navLinks) return;

    // Create mobile menu toggle button
    createMobileMenuToggle(navbar, navLinks);
    
    // Handle nav link clicks on mobile
    handleMobileNavClicks(navLinks);
    
    // Handle outside clicks to close menu
    handleOutsideClicks(navLinks);
    
    // Handle escape key to close menu
    handleEscapeKey(navLinks);
  }

  /**
   * Create and insert mobile menu toggle button
   */
  function createMobileMenuToggle(navbar, navLinks) {
    const existingToggle = navbar.querySelector('.mobile-menu-toggle');
    if (existingToggle) return;

    const toggleButton = document.createElement('button');
    toggleButton.className = 'mobile-menu-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle mobile menu');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.innerHTML = '<span>☰</span>';

    // Insert before nav-links
    navbar.insertBefore(toggleButton, navLinks);

    // Add click event listener
    toggleButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu(navLinks, toggleButton);
    });
  }

  /**
   * Toggle mobile menu open/closed
   */
  function toggleMobileMenu(navLinks, toggleButton) {
    const isOpen = navLinks.classList.contains('mobile-menu-open');
    
    if (isOpen) {
      closeMobileMenu(navLinks, toggleButton);
    } else {
      openMobileMenu(navLinks, toggleButton);
    }
    
    // Force remove any potential overlay styles
    navLinks.style.backgroundColor = '#ffffff';
    navLinks.style.backdropFilter = 'none';
    navLinks.style.opacity = '1';
    navLinks.style.visibility = 'visible';
  }

  /**
   * Open mobile menu
   */
  function openMobileMenu(navLinks, toggleButton) {
    navLinks.classList.add('mobile-menu-open');
    toggleButton.setAttribute('aria-expanded', 'true');
    toggleButton.innerHTML = '<span>✕</span>';
    
    // Force correct styling immediately
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.backgroundColor = '#ffffff';
    navLinks.style.backdropFilter = 'none';
    navLinks.style.border = '2px solid #16a34a';
    navLinks.style.borderRadius = '8px';
    navLinks.style.padding = '1rem';
    navLinks.style.boxShadow = '0 4px 16px rgba(22, 163, 74, 0.2)';
    navLinks.style.zIndex = '999';
    navLinks.style.position = 'relative';
    navLinks.style.opacity = '1';
    navLinks.style.visibility = 'visible';
    
    // Don't prevent body scroll - let content remain accessible
    // document.body.style.overflow = 'hidden';
    
    // Focus first menu item for accessibility
    const firstLink = navLinks.querySelector('a');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  /**
   * Close mobile menu
   */
  function closeMobileMenu(navLinks, toggleButton) {
    navLinks.classList.remove('mobile-menu-open');
    if (toggleButton) {
      toggleButton.setAttribute('aria-expanded', 'false');
      toggleButton.innerHTML = '<span>☰</span>';
    }
    
    // Restore body scroll (commented out since we're not blocking it)
    // document.body.style.overflow = '';
  }

  /**
   * Handle mobile navigation link clicks
   */
  function handleMobileNavClicks(navLinks) {
    const links = navLinks.querySelectorAll('a');
    
    links.forEach(link => {
      link.addEventListener('click', function() {
        // Close menu when a link is clicked on mobile
        if (window.innerWidth <= 768) {
          const toggleButton = document.querySelector('.mobile-menu-toggle');
          closeMobileMenu(navLinks, toggleButton);
        }
      });
    });
  }

  /**
   * Handle clicks outside the menu to close it
   */
  function handleOutsideClicks(navLinks) {
    document.addEventListener('click', function(e) {
      const navbar = document.querySelector('.top-navbar');
      const isMenuOpen = navLinks.classList.contains('mobile-menu-open');
      
      if (isMenuOpen && !navbar.contains(e.target)) {
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        closeMobileMenu(navLinks, toggleButton);
      }
    });
  }

  /**
   * Handle escape key to close menu
   */
  function handleEscapeKey(navLinks) {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navLinks.classList.contains('mobile-menu-open')) {
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        closeMobileMenu(navLinks, toggleButton);
        
        // Return focus to toggle button
        if (toggleButton) {
          toggleButton.focus();
        }
      }
    });
  }

  /**
   * Handle viewport changes
   */
  function handleViewportChanges() {
    let resizeTimeout;
    
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        const navLinks = document.querySelector('.top-navbar .nav-links');
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        
        // Close mobile menu if viewport becomes larger than mobile breakpoint
        if (window.innerWidth > 768 && navLinks.classList.contains('mobile-menu-open')) {
          closeMobileMenu(navLinks, toggleButton);
        }
        
        // Update viewport height for mobile browsers
        updateViewportHeight();
      }, 250);
    });
    
    // Initial viewport height update
    updateViewportHeight();
  }

  /**
   * Update viewport height for mobile browsers (handles address bar)
   */
  function updateViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  /**
   * Improve accessibility features
   */
  function improveAccessibility() {
    // Add keyboard navigation support
    const navLinks = document.querySelectorAll('.top-navbar .nav-links a');
    
    navLinks.forEach((link, index) => {
      link.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          const nextLink = navLinks[index + 1] || navLinks[0];
          nextLink.focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevLink = navLinks[index - 1] || navLinks[navLinks.length - 1];
          prevLink.focus();
        }
      });
    });

    // Add skip link for screen readers
    addSkipLink();
  }

  /**
   * Add skip link for screen readers
   */
  function addSkipLink() {
    if (document.querySelector('.skip-link')) return;
    
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id if it doesn't exist
    const mainContent = document.querySelector('.page__content') || 
                       document.querySelector('main') || 
                       document.querySelector('.content');
    
    if (mainContent && !mainContent.id) {
      mainContent.id = 'main-content';
    }
  }

  /**
   * Enhanced theme toggle for mobile
   */
  function enhanceThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Improve touch target size on mobile
    if (window.innerWidth <= 768) {
      themeToggle.style.minWidth = '44px';
      themeToggle.style.minHeight = '44px';
      themeToggle.style.display = 'flex';
      themeToggle.style.alignItems = 'center';
      themeToggle.style.justifyContent = 'center';
    }
  }

  // Initialize theme toggle enhancement
  document.addEventListener('DOMContentLoaded', enhanceThemeToggle);
  window.addEventListener('resize', enhanceThemeToggle);

  /**
   * Smooth scrolling enhancement for mobile
   */
  function enhanceSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          // Close mobile menu if open
          const navLinks = document.querySelector('.top-navbar .nav-links');
          const toggleButton = document.querySelector('.mobile-menu-toggle');
          if (navLinks.classList.contains('mobile-menu-open')) {
            closeMobileMenu(navLinks, toggleButton);
          }
          
          // Smooth scroll to target
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', enhanceSmoothScrolling);

  /**
   * Performance optimizations for mobile
   */
  function optimizeForMobile() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }

    // Optimize animations for mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduce-motion');
    }
  }

  document.addEventListener('DOMContentLoaded', optimizeForMobile);

})();

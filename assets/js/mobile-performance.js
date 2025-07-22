/**
 * Mobile Performance Optimizations
 * Improves loading speed and user experience on mobile devices
 */

(function() {
  'use strict';

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    optimizeForMobile();
    handleOrientationChange();
    improveScrollPerformance();
    optimizeImages();
  });

  /**
   * Main mobile optimization function
   */
  function optimizeForMobile() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      document.body.classList.add('is-mobile');
      
      // Optimize for touch events
      optimizeTouchEvents();
      
      // Prevent zoom on form focus (iOS)
      preventZoomOnFocus();
      
      // Add mobile-specific optimizations
      addMobileOptimizations();
    }
  }

  /**
   * Optimize touch events for better responsiveness
   */
  function optimizeTouchEvents() {
    // Add touch start events for immediate feedback
    const touchElements = document.querySelectorAll('a, button, .clickable');
    
    touchElements.forEach(element => {
      element.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      }, { passive: true });
      
      element.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
      }, { passive: true });
      
      element.addEventListener('touchcancel', function() {
        this.classList.remove('touch-active');
      }, { passive: true });
    });
  }

  /**
   * Prevent zoom on form focus for iOS
   */
  function preventZoomOnFocus() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Ensure font-size is at least 16px to prevent zoom
      const computedStyle = window.getComputedStyle(input);
      const fontSize = parseFloat(computedStyle.fontSize);
      
      if (fontSize < 16) {
        input.style.fontSize = '16px';
      }
    });
  }

  /**
   * Handle orientation changes
   */
  function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
      // Fix viewport issues after orientation change
      setTimeout(function() {
        window.scrollTo(0, 0);
        
        // Recalculate viewport height
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.top-navbar .nav-links');
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        if (navLinks && navLinks.classList.contains('mobile-menu-open')) {
          navLinks.classList.remove('mobile-menu-open');
          if (toggleButton) {
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.innerHTML = '<span>☰</span>';
          }
          document.body.style.overflow = '';
        }
      }, 500);
    });
  }

  /**
   * Improve scroll performance
   */
  function improveScrollPerformance() {
    // Use passive event listeners for scroll events
    let ticking = false;
    
    function updateScrollPosition() {
      // Add scroll-based optimizations here
      ticking = false;
    }
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    }, { passive: true });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          const yOffset = -80; // Account for fixed header
          const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Optimize images for mobile
   */
  function optimizeImages() {
    // Lazy load images if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Load the image
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            // Add loading animation
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.onload = function() {
              this.style.opacity = '1';
            };
            
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
      
      // Also observe regular images for fade-in effect
      document.querySelectorAll('img:not([data-src])').forEach(img => {
        if (!img.complete) {
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.3s ease';
          
          img.onload = function() {
            this.style.opacity = '1';
          };
        }
      });
    }
  }

  /**
   * Add mobile-specific optimizations
   */
  function addMobileOptimizations() {
    // Wrap tables for horizontal scrolling
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
      if (!table.parentElement.classList.contains('table-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });
    
    // Improve button touch targets
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
      const rect = button.getBoundingClientRect();
      if (rect.height < 44 || rect.width < 44) {
        button.style.minHeight = '44px';
        button.style.minWidth = '44px';
        button.style.display = 'inline-flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
      }
    });
    
    // Add touch ripple effect for better feedback
    addTouchRippleEffect();
  }

  /**
   * Add touch ripple effect for visual feedback
   */
  function addTouchRippleEffect() {
    const rippleElements = document.querySelectorAll('.top-navbar .nav-links a, .author__urls a, .btn');
    
    rippleElements.forEach(element => {
      element.addEventListener('touchstart', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.touches[0].clientX - rect.left - size / 2;
        const y = e.touches[0].clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      }, { passive: true });
    });
  }

  /**
   * Enhanced theme toggle for mobile
   */
  function enhanceThemeToggleForMobile() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    // Ensure proper touch target size
    themeToggle.style.minWidth = '44px';
    themeToggle.style.minHeight = '44px';
    themeToggle.style.display = 'flex';
    themeToggle.style.alignItems = 'center';
    themeToggle.style.justifyContent = 'center';
    
    // Add haptic feedback for iOS
    if ('vibrate' in navigator) {
      themeToggle.addEventListener('click', function() {
        navigator.vibrate(50);
      });
    }
  }

  // Initialize theme toggle enhancement
  document.addEventListener('DOMContentLoaded', enhanceThemeToggleForMobile);

  /**
   * Add CSS for touch effects
   */
  function addTouchStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .touch-active {
        opacity: 0.7 !important;
        transform: scale(0.98) !important;
      }
      
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      .table-wrapper {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        border-radius: 8px;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
      }
      
      @media (max-width: 768px) {
        .is-mobile * {
          -webkit-tap-highlight-color: transparent;
        }
        
        .is-mobile button,
        .is-mobile .btn,
        .is-mobile a {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Add touch styles immediately
  addTouchStyles();

})();

// Mobile-Only Navigation JavaScript - Simple Clean Theme
// This script only affects mobile devices and doesn't interfere with desktop navigation

(function() {
  'use strict';
  
  // Only run on mobile devices - strict check
  function isMobile() {
    return window.innerWidth <= 768;
  }
  
  // Destroy mobile navigation if on desktop
  function destroyMobileNavIfDesktop() {
    if (!isMobile()) {
      const mobileNav = document.querySelector('.mobile-nav-wrapper');
      if (mobileNav) {
        mobileNav.remove();
      }
      return true; // Exit early
    }
    return false;
  }
  
  // FORCE REMOVE desktop navigation on mobile
  function removeDesktopNavigationOnMobile() {
    if (isMobile()) {
      // Remove desktop navigation elements
      const desktopNavs = document.querySelectorAll('.top-navbar, nav.top-navbar, .masthead, .greedy-nav, .main-navigation, .desktop-nav, .site-nav');
      desktopNavs.forEach(nav => {
        if (nav) {
          nav.remove();
        }
      });
      
      // Remove skip link
      const skipLinks = document.querySelectorAll('.skip-link, a[href="#main-content"]');
      skipLinks.forEach(link => {
        if (link) {
          link.remove();
        }
      });
      
      // Force clean body styles
      document.body.style.paddingTop = '0px';
      document.body.style.background = '#f7fafc';
      document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
      document.body.style.lineHeight = '1.6';
      document.body.style.color = '#2d3748';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
    }
  }
  
  // Initialize mobile navigation
  function initMobileNav() {
    // Exit immediately if not mobile
    if (destroyMobileNavIfDesktop()) return;
    
    // FORCE REMOVE desktop navigation on mobile
    removeDesktopNavigationOnMobile();
    
    // Create mobile navigation structure
    createMobileNavigation();
    
    // Set up event listeners
    setupMobileEventListeners();
  }
  
  // Create mobile navigation HTML structure
  function createMobileNavigation() {
    // Check if mobile nav already exists
    if (document.querySelector('.mobile-nav-wrapper')) return;
    
    // Create mobile navigation wrapper
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav-wrapper';
    
    // Create navigation header
    const navHeader = document.createElement('div');
    navHeader.className = 'mobile-nav-header';
    
    // Create brand/logo with emoji
    const brand = document.createElement('a');
    brand.className = 'mobile-brand';
    brand.href = '/';
    brand.innerHTML = '🍃 Ritika Lamba';
    
    // Create menu button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.setAttribute('aria-label', 'Toggle mobile menu');
    menuBtn.setAttribute('aria-expanded', 'false');
    
    // Create hamburger icon
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger-icon';
    hamburger.innerHTML = `
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
    `;
    
    menuBtn.appendChild(hamburger);
    
    // Create dropdown menu
    const dropdown = document.createElement('div');
    dropdown.className = 'mobile-menu-dropdown';
    dropdown.setAttribute('aria-hidden', 'true');
    
    const menuItems = document.createElement('div');
    menuItems.className = 'mobile-menu-items';
    
    // Navigation items that match your site structure
    const navigationItems = [
      { text: 'Home', href: '/' },
      { text: 'Publications', href: '/publications/' },
      { text: 'Teaching', href: '/teaching/' },
      { text: 'Experience', href: '/experience/' },
      { text: 'Awards', href: '/awards/' },
      { text: 'Blog', href: '/year-archive/' },
      { text: 'News', href: '/news/' }
    ];
    
    navigationItems.forEach(item => {
      const link = document.createElement('a');
      link.className = 'mobile-menu-item';
      link.href = item.href;
      link.textContent = item.text;
      
      // Mark current page
      if (window.location.pathname === item.href || 
          (item.href !== '/' && window.location.pathname.includes(item.href.replace('/', '')))) {
        link.classList.add('active');
      }
      
      menuItems.appendChild(link);
    });
    
    dropdown.appendChild(menuItems);
    
    // Assemble navigation
    navHeader.appendChild(brand);
    navHeader.appendChild(menuBtn);
    mobileNav.appendChild(navHeader);
    mobileNav.appendChild(dropdown);
    
    // Insert at the beginning of body
    document.body.insertBefore(mobileNav, document.body.firstChild);
  }
  
  // Set up event listeners for mobile navigation
  function setupMobileEventListeners() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const dropdown = document.querySelector('.mobile-menu-dropdown');
    const menuItems = document.querySelectorAll('.mobile-menu-item');
    
    if (!menuBtn || !dropdown) return;
    
    // Toggle menu
    menuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = dropdown.classList.contains('show');
      
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
    
    // Close menu when clicking menu items
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        closeMobileMenu();
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.mobile-nav-wrapper') && dropdown.classList.contains('show')) {
        closeMobileMenu();
      }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && dropdown.classList.contains('show')) {
        closeMobileMenu();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (destroyMobileNavIfDesktop()) {
        return; // Exit if desktop
      }
      if (!isMobile() && dropdown.classList.contains('show')) {
        closeMobileMenu();
      }
    });
  }
  
  // Open mobile menu
  function openMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const dropdown = document.querySelector('.mobile-menu-dropdown');
    
    if (menuBtn && dropdown) {
      menuBtn.classList.add('active');
      menuBtn.setAttribute('aria-expanded', 'true');
      dropdown.classList.add('show');
      dropdown.setAttribute('aria-hidden', 'false');
      
      // Focus first menu item for accessibility
      const firstItem = dropdown.querySelector('.mobile-menu-item');
      if (firstItem) {
        setTimeout(() => firstItem.focus(), 300);
      }
    }
  }
  
  // Close mobile menu
  function closeMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const dropdown = document.querySelector('.mobile-menu-dropdown');
    
    if (menuBtn && dropdown) {
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      dropdown.classList.remove('show');
      dropdown.setAttribute('aria-hidden', 'true');
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // Run immediately on load for mobile
      if (isMobile()) {
        removeDesktopNavigationOnMobile();
      }
      initMobileNav();
    });
  } else {
    // Run immediately if DOM already loaded
    if (isMobile()) {
      removeDesktopNavigationOnMobile();
    }
    initMobileNav();
  }
  
  // Also run as early as possible
  if (isMobile()) {
    removeDesktopNavigationOnMobile();
  }
  
  // Re-initialize on window resize (for orientation changes)
  window.addEventListener('resize', function() {
    setTimeout(function() {
      if (destroyMobileNavIfDesktop()) {
        return; // Exit if desktop
      }
      
      if (isMobile() && !document.querySelector('.mobile-nav-wrapper')) {
        initMobileNav();
      }
    }, 100);
  });
  
})();

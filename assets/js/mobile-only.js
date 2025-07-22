// Mobile-Only Navigation JavaScript
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
  
  // Initialize mobile navigation
  function initMobileNav() {
    // Exit immediately if not mobile
    if (destroyMobileNavIfDesktop()) return;
    
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
    
    // Create brand/logo
    const brand = document.createElement('a');
    brand.className = 'mobile-brand';
    brand.href = '/';
    brand.textContent = document.title || 'My Site';
    
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
    
    // Get navigation links from existing navigation
    const existingNav = document.querySelector('nav') || 
                       document.querySelector('.navigation') ||
                       document.querySelector('.main-nav') ||
                       document.querySelector('.site-nav');
    
    if (existingNav) {
      const links = existingNav.querySelectorAll('a');
      links.forEach(link => {
        const mobileLink = document.createElement('a');
        mobileLink.className = 'mobile-menu-item';
        mobileLink.href = link.href;
        mobileLink.textContent = link.textContent.trim();
        
        // Mark current page
        if (link.href === window.location.href) {
          mobileLink.classList.add('active');
        }
        
        menuItems.appendChild(mobileLink);
      });
    } else {
      // Default navigation items if no existing nav found
      const defaultItems = [
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about/' },
        { text: 'Publications', href: '/publications/' },
        { text: 'Teaching', href: '/teaching/' },
        { text: 'Blog', href: '/year-archive/' }
      ];
      
      defaultItems.forEach(item => {
        const link = document.createElement('a');
        link.className = 'mobile-menu-item';
        link.href = item.href;
        link.textContent = item.text;
        
        if (window.location.pathname === item.href) {
          link.classList.add('active');
        }
        
        menuItems.appendChild(link);
      });
    }
    
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
    menuBtn.addEventListener('click', function() {
      const isOpen = dropdown.classList.contains('show');
      
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
    
    // Close menu when clicking menu items
    menuItems.forEach(item => {
      item.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.mobile-nav-wrapper')) {
        closeMobileMenu();
      }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (destroyMobileNavIfDesktop()) {
        return; // Exit if desktop
      }
      if (!isMobile()) {
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
        setTimeout(() => firstItem.focus(), 100);
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
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
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

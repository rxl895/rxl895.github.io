// OpenAI-Inspired Theme JavaScript
// Clean, minimal navigation with smooth interactions

(function() {
  'use strict';
  
  // Initialize the OpenAI theme
  function initOpenAITheme() {
    createOpenAINavigation();
    setupNavigationEvents();
    updateActiveNavigation();
    cleanupOldElements();
  }
  
  // Remove old theme elements
  function cleanupOldElements() {
    // Remove old navigation elements
    const oldElements = document.querySelectorAll(
      '.mobile-nav-wrapper, .top-navbar, .masthead, .greedy-nav, .skip-link'
    );
    oldElements.forEach(el => el.remove());
    
    // Reset body styles
    document.body.style.paddingTop = '0';
    document.body.className = '';
  }
  
  // Create the new OpenAI-style navigation
  function createOpenAINavigation() {
    // Check if already exists
    if (document.querySelector('.openai-nav')) return;
    
    const nav = document.createElement('nav');
    nav.className = 'openai-nav';
    
    const container = document.createElement('div');
    container.className = 'nav-container';
    
    // Brand/Logo
    const brand = document.createElement('a');
    brand.className = 'nav-brand';
    brand.href = '/';
    brand.innerHTML = '🍃 Ritika Lamba';
    
    // Desktop navigation links
    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';
    
    // Mobile menu button
    const mobileBtn = document.createElement('button');
    mobileBtn.className = 'mobile-menu-btn';
    mobileBtn.setAttribute('aria-label', 'Toggle menu');
    mobileBtn.innerHTML = `
      <div class="hamburger">
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
      </div>
    `;
    
    // Navigation items
    const navItems = [
      { text: 'Home', href: '/' },
      { text: 'Publications', href: '/publications/' },
      { text: 'Teaching', href: '/teaching/' },
      { text: 'Experience', href: '/experience/' },
      { text: 'Awards', href: '/awards/' },
      { text: 'Blog', href: '/year-archive/' },
      { text: 'News', href: '/news/' }
    ];
    
    // Create desktop nav links
    navItems.forEach(item => {
      const link = document.createElement('a');
      link.className = 'nav-link';
      link.href = item.href;
      link.textContent = item.text;
      
      // Mark active page
      if (isCurrentPage(item.href)) {
        link.classList.add('active');
      }
      
      navLinks.appendChild(link);
    });
    
    // Mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    const mobileMenuLinks = document.createElement('div');
    mobileMenuLinks.className = 'mobile-menu-links';
    
    // Create mobile nav links
    navItems.forEach(item => {
      const link = document.createElement('a');
      link.className = 'mobile-menu-link';
      link.href = item.href;
      link.textContent = item.text;
      
      if (isCurrentPage(item.href)) {
        link.classList.add('active');
      }
      
      mobileMenuLinks.appendChild(link);
    });
    
    mobileMenu.appendChild(mobileMenuLinks);
    
    // Assemble navigation
    container.appendChild(brand);
    container.appendChild(navLinks);
    container.appendChild(mobileBtn);
    nav.appendChild(container);
    nav.appendChild(mobileMenu);
    
    // Insert at beginning of body
    document.body.insertBefore(nav, document.body.firstChild);
  }
  
  // Check if current page
  function isCurrentPage(href) {
    const currentPath = window.location.pathname;
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && currentPath.includes(href.replace(/\//g, ''))) return true;
    return false;
  }
  
  // Setup navigation event listeners
  function setupNavigationEvents() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-link');
    
    if (!mobileBtn || !mobileMenu) return;
    
    // Mobile menu toggle
    mobileBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = mobileMenu.classList.contains('show');
      
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
    
    // Close menu when clicking mobile links
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.openai-nav')) {
        closeMobileMenu();
      }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
  
  // Open mobile menu
  function openMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileBtn && mobileMenu) {
      mobileBtn.classList.add('active');
      mobileMenu.classList.add('show');
    }
  }
  
  // Close mobile menu
  function closeMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileBtn && mobileMenu) {
      mobileBtn.classList.remove('active');
      mobileMenu.classList.remove('show');
    }
  }
  
  // Update active navigation based on scroll position
  function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
    
    function setActiveNav() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
    
    window.addEventListener('scroll', setActiveNav);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOpenAITheme);
  } else {
    initOpenAITheme();
  }
  
  // Handle page navigation changes
  window.addEventListener('popstate', function() {
    setTimeout(initOpenAITheme, 100);
  });
  
})();

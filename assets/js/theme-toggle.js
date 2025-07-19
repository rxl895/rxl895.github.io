// Theme Toggle System for Ritika's Website
(function() {
    'use strict';
    
    // Theme configuration
    const THEME_KEY = 'ritika-theme';
    const LIGHT_THEME = 'light';
    const DARK_THEME = 'dark';
    
    // Get current theme from localStorage or default to light
    function getCurrentTheme() {
        return localStorage.getItem(THEME_KEY) || LIGHT_THEME;
    }
    
    // Set theme in localStorage and apply to document
    function setTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeToggleButton(theme);
    }
    
    // Update the theme toggle button appearance
    function updateThemeToggleButton(theme) {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            if (theme === DARK_THEME) {
                toggleButton.innerHTML = '☀️';
                toggleButton.setAttribute('title', 'Switch to Light Mode');
            } else {
                toggleButton.innerHTML = '🌙';
                toggleButton.setAttribute('title', 'Switch to Dark Mode');
            }
        }
    }
    
    // Toggle between light and dark themes
    function toggleTheme() {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
        setTheme(newTheme);
    }
    
    // Initialize theme on page load
    function initTheme() {
        const savedTheme = getCurrentTheme();
        setTheme(savedTheme);
        
        // Add click event listener to theme toggle button
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleTheme);
        }
    }
    
    // Make toggleTheme available globally for onclick in HTML
    window.toggleTheme = toggleTheme;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();

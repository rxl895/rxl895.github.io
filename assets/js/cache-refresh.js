// Cache clearing script
(function() {
    'use strict';
    
    // Force reload all stylesheets
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
        const href = link.href;
        if (href.includes('custom-aesthetics.css')) {
            const url = new URL(href);
            url.searchParams.set('v', Date.now());
            link.href = url.toString();
        }
    });
    
    // Clear any cached images
    const images = document.querySelectorAll('img[src*="Profile_Pic.png"]');
    images.forEach(img => {
        const src = img.src;
        const url = new URL(src, window.location.origin);
        url.searchParams.set('v', Date.now());
        img.src = url.toString();
    });
    
    console.log('Cache refresh executed');
})();

// Glass navbar functionality
function toggleTheme() {
    // Since we're keeping light theme, this could be used for other features
    console.log('Theme toggle clicked - currently using light theme only');
    // Future: could toggle between different light variations
}

// Add active state to current page
document.addEventListener('DOMContentLoaded', function() {
    // The active states are already handled in the HTML with Liquid templating
    console.log('Glass top navbar loaded');
    
    // Add smooth scrolling for anchor links if needed
    const navLinks = document.querySelectorAll('.top-navbar a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Force center alignment of sidebar text - Ultra aggressive
document.addEventListener('DOMContentLoaded', function() {
    console.log('Centering sidebar text...');
    
    // Wait a bit for CSS to load, then force center
    setTimeout(function() {
        // Target all possible author elements
        const authorElements = document.querySelectorAll('.author__name, h3.author__name, .author__bio, p.author__bio, .sidebar h3, .sidebar p');
        
        authorElements.forEach(function(element) {
            element.style.textAlign = 'center';
            element.style.width = '100%';
            element.style.display = 'block';
            element.style.marginLeft = 'auto';
            element.style.marginRight = 'auto';
            element.style.float = 'none';
            element.style.clear = 'both';
            element.style.paddingLeft = '0';
            element.style.paddingRight = '0';
            element.style.position = 'relative';
            console.log('Centered element:', element.className || element.tagName);
        });
        
        // Also center the container
        const authorContent = document.querySelector('.author__content');
        if (authorContent) {
            authorContent.style.textAlign = 'center';
            authorContent.style.display = 'flex';
            authorContent.style.flexDirection = 'column';
            authorContent.style.alignItems = 'center';
            authorContent.style.width = '100%';
            console.log('Centered author content container');
        }
        
        // Force center all sidebar content
        const sidebarElements = document.querySelectorAll('.sidebar *');
        sidebarElements.forEach(function(element) {
            element.style.textAlign = 'center';
        });
        
        console.log('Sidebar centering script completed - applied to', authorElements.length, 'elements');
    }, 100); // Small delay to ensure CSS is loaded
});

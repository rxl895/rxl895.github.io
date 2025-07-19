// Force center alignment of sidebar text
document.addEventListener('DOMContentLoaded', function() {
    console.log('Centering sidebar text...');
    
    // Target the author name and bio elements
    const authorName = document.querySelector('.author__name, h3.author__name');
    const authorBio = document.querySelector('.author__bio, p.author__bio');
    const authorContent = document.querySelector('.author__content');
    
    // Apply centering styles
    if (authorName) {
        authorName.style.textAlign = 'center';
        authorName.style.width = '100%';
        authorName.style.display = 'block';
        authorName.style.marginLeft = 'auto';
        authorName.style.marginRight = 'auto';
        console.log('Centered author name');
    }
    
    if (authorBio) {
        authorBio.style.textAlign = 'center';
        authorBio.style.width = '100%';
        authorBio.style.display = 'block';
        authorBio.style.marginLeft = 'auto';
        authorBio.style.marginRight = 'auto';
        console.log('Centered author bio');
    }
    
    if (authorContent) {
        authorContent.style.textAlign = 'center';
        console.log('Centered author content container');
    }
    
    // Also try to center all elements within the sidebar
    const sidebarElements = document.querySelectorAll('.sidebar .author__content *');
    sidebarElements.forEach(function(element) {
        element.style.textAlign = 'center';
        element.style.marginLeft = 'auto';
        element.style.marginRight = 'auto';
    });
    
    console.log('Sidebar centering script completed');
});

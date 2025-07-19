// Force center profile picture
document.addEventListener('DOMContentLoaded', function() {
    console.log('Starting profile picture centering...');
    
    function centerProfilePicture() {
        // Try multiple selectors to find the image
        const imageSelectors = [
            '.author__avatar img',
            '.sidebar img',
            'img[alt="Ritika Lamba"]',
            '.author__avatar .author__avatar'
        ];
        
        let foundImage = false;
        
        imageSelectors.forEach(function(selector) {
            const images = document.querySelectorAll(selector);
            images.forEach(function(img) {
                if (img) {
                    // Force center the image
                    img.style.display = 'block';
                    img.style.marginLeft = 'auto';
                    img.style.marginRight = 'auto';
                    img.style.float = 'none';
                    img.style.clear = 'both';
                    img.style.position = 'relative';
                    img.style.transform = 'none';
                    img.style.left = 'auto';
                    img.style.right = 'auto';
                    
                    // Also center the parent container
                    const parent = img.parentElement;
                    if (parent) {
                        parent.style.textAlign = 'center';
                        parent.style.display = 'block';
                        parent.style.width = '100%';
                        parent.style.marginLeft = 'auto';
                        parent.style.marginRight = 'auto';
                    }
                    
                    foundImage = true;
                    console.log('Centered image with selector:', selector);
                }
            });
        });
        
        if (!foundImage) {
            console.log('No profile image found, retrying...');
            setTimeout(centerProfilePicture, 500);
        }
    }
    
    // Try centering immediately and also after delays
    centerProfilePicture();
    setTimeout(centerProfilePicture, 100);
    setTimeout(centerProfilePicture, 500);
    setTimeout(centerProfilePicture, 1000);
});

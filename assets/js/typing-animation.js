// Typing Animation Script
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.getElementById('typing-text');
    
    if (!typingText) return; // Only run on pages with typing text
    
    const fullText = "I am an LLM-focused ML Engineer with a strong foundation in scalable AI infrastructure, fairness, and interpretability. I have industry-proven experience building distributed systems at Volkswagen IT, paired with academic research in explainable AI, LORA-based LLM optimization, and symbolic reasoning.\n\nI am passionate about deploying efficient, trustworthy, and human-aligned intelligence at scale.";
    
    let currentIndex = 0;
    let isTyping = true;
    let currentText = '';
    
    const typeSpeed = 50; // Speed of typing (milliseconds)
    const pauseAfterComplete = 2000; // Pause after completing text
    const deleteSpeed = 25; // Speed of deleting (faster than typing)
    const pauseBeforeDelete = 1000; // Pause before starting to delete
    
    function typeWriter() {
        if (isTyping) {
            // Typing phase
            if (currentIndex < fullText.length) {
                const char = fullText.charAt(currentIndex);
                if (char === '\n') {
                    currentText += '<br>';
                } else {
                    currentText += char;
                }
                typingText.innerHTML = currentText;
                currentIndex++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Finished typing, pause then start deleting
                setTimeout(() => {
                    isTyping = false;
                    typeWriter();
                }, pauseBeforeDelete);
            }
        } else {
            // Deleting phase
            if (currentText.length > 0) {
                // Handle deleting <br> tags
                if (currentText.endsWith('<br>')) {
                    currentText = currentText.slice(0, -4);
                } else {
                    currentText = currentText.slice(0, -1);
                }
                typingText.innerHTML = currentText;
                setTimeout(typeWriter, deleteSpeed);
            } else {
                // Finished deleting, pause then start typing again
                currentIndex = 0;
                isTyping = true;
                setTimeout(typeWriter, pauseAfterComplete);
            }
        }
    }
    
    // Start the typing animation
    typeWriter();
});

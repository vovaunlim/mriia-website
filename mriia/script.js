console.log("Mriia Website Loaded - Premium Animations");

// Scroll animations
function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-section, .video-card, .media-card, .section-title');
    
    fadeElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight * 0.85) {
            // Stagger delay
            setTimeout(() => {
                el.classList.add('show');
            }, index * 60);
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    setTimeout(() => {
        handleScrollAnimations();
    }, 300);
    
    // Listen to scroll
    window.addEventListener('scroll', handleScrollAnimations, { passive: true });
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
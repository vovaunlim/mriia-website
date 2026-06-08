console.log("Mriia Website Loaded - Buttons Optimized");

// Prevent default on touch for better responsiveness
document.addEventListener('touchstart', function() {}, {passive: true});

// Make sure all buttons are clickable
document.querySelectorAll('.btn, .float-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Add active state for touch feedback
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
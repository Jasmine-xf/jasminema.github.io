/* ========================================
   OPS Portal Project - Custom JavaScript
   ======================================== */

/**
 * Fix component path issues before DOM loads
 * Rewrites fetch paths to load components from correct relative paths
 */
(function() {
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        // Fix path for component files
        if (url.includes('components/')) {
            url = '../../' + url;
        }
        return originalFetch.call(this, url, options);
    };
})();

/**
 * Initialize all features when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initInteractiveEffects();
    initPageLoadAnimations();
    fixNavigationPaths();
});

/**
 * Fix navigation link paths
 * Adds correct parent directory paths for relative links
 */
function fixNavigationPaths() {
    setTimeout(() => {
        const allLinks = document.querySelectorAll('a[href]');
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                // Add correct parent directory for relative paths
                if (href === 'index.html' || href === 'about.html' || href === 'resume.html') {
                    link.setAttribute('href', '../../../' + href);
                }
            }
        });
    }, 100); // Wait for components to load
}

/**
 * Initialize scroll animations using Intersection Observer
 * Adds fade-in animations to elements as they enter viewport
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.project-section, .detail-section, .scenario-card');
    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

/**
 * Initialize interactive effects
 * Handles hover effects for cards and click interactions
 */
function initInteractiveEffects() {
    // Scenario card hover effects
    const scenarioCards = document.querySelectorAll('.scenario-card');
    scenarioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        });
    });

    // Goals list item click effects
    const goalItems = document.querySelectorAll('.goals-list li');
    goalItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.background = 'linear-gradient(135deg, #EF5028, #F57C5A)';
            this.style.color = 'white';
            this.style.transform = 'translateX(12px) scale(1.05)';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
                this.style.transform = '';
            }, 2000);
        });
    });

    // Gallery image click to enlarge
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            createImageModal(this.src, this.alt);
        });
    });
}

/**
 * Initialize page load animations
 * Handles typewriter effect for title and gallery item animations
 */
function initPageLoadAnimations() {
    // Title typewriter effect
    const title = document.querySelector('.work-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid #EF5028';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                title.style.borderRight = 'none';
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Gallery items appear sequentially
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 1000 + (index * 200));
    });
}


/**
 * Create image modal for enlarged view
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 */
function createImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    `;
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

/**
 * Smooth scroll to anchor point
 * @param {string} target - CSS selector for target element
 */
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Keyboard navigation support
 * Closes modal on Escape key press
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.image-modal');
        if (modal) {
            document.body.removeChild(modal);
        }
    }
});

/**
 * Touch gesture support for mobile devices
 * Detects swipe gestures for navigation
 */
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Detect swipe gestures
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // Swipe left - can add navigation to next project
            console.log('Swipe left detected');
        } else {
            // Swipe right - can add navigation to previous project
            console.log('Swipe right detected');
        }
    }
});


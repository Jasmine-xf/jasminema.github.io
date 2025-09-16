// About页面专用功能
document.addEventListener('DOMContentLoaded', function() {
    initAboutPageFeatures();

    // 只保留这一个 Tooltip 初始化，避免重复
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl, {
            placement: 'bottom',  
            trigger: 'hover',
            boundary: 'viewport',
          
        });
    });
});

function initAboutPageFeatures() {
    initScrollAnimations();
    initSkillCardInteractions();
    initTimelineAnimations();
    initValueCardInteractions();
    initContactButtons();
    initSocialLinks();
}

function initScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
    }, observerOptions);

    document.querySelectorAll('.skill-category, .timeline-item, .value-card')
        .forEach(el => observer.observe(el));
}

function initSkillCardInteractions() {
    const skillCards = document.querySelectorAll('.skill-category');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        card.addEventListener('click', (e) => PortfolioUtils.createRippleEffect(e, card));
    });
}

function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);

        item.addEventListener('mouseenter', () => {
            item.querySelector('.timeline-content').style.transform = 'translateX(8px)';
        });
        item.addEventListener('mouseleave', () => {
            item.querySelector('.timeline-content').style.transform = 'translateX(0)';
        });
    });
}

function initValueCardInteractions() {
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        card.addEventListener('click', (e) => PortfolioUtils.createRippleEffect(e, card));
    });
}

function initContactButtons() {
    const sendMessageBtn = document.querySelector('.contact-buttons .btn-dark');
    const downloadResumeBtn = document.querySelector('.contact-buttons .btn-outline-dark');

    if (sendMessageBtn) sendMessageBtn.addEventListener('click', showContactModal);

    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function() {
            console.log('Download resume clicked');
            this.innerHTML = '<i class="bi bi-download me-2"></i>Downloading...';
            setTimeout(() => { this.innerHTML = 'Download Resume'; }, 2000);
        });
    }
}

function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
            link.style.color = 'rgba(0, 0, 0, 0.87)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
            link.style.color = 'rgba(0, 0, 0, 0.5)';
        });
        link.addEventListener('click', (e) => createRippleEffect(e, link));
    });
}

function showContactModal() {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Send Message</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="contactForm">
                        <div class="mb-3"><label for="name" class="form-label">Name</label><input type="text" class="form-control" id="name" required></div>
                        <div class="mb-3"><label for="email" class="form-label">Email</label><input type="email" class="form-control" id="email" required></div>
                        <div class="mb-3"><label for="message" class="form-label">Message</label><textarea class="form-control" id="message" rows="4" required></textarea></div>
                        <button type="submit" class="btn btn-dark w-100">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-btn').addEventListener('click', () => modal.remove());
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => { if (e.target === modal.querySelector('.modal-overlay')) modal.remove(); });

    modal.querySelector('#contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Contact form submitted');
        const submitBtn = modal.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
        submitBtn.disabled = true;
        setTimeout(() => modal.remove(), 1500);
    });
}

// 使用common.js中的createRippleEffect函数

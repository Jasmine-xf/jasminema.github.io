// About页面专用功能

document.addEventListener('DOMContentLoaded', function() {
    initAboutPageFeatures();
    
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

function initAboutPageFeatures() {
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化技能卡片交互
    initSkillCardInteractions();
    
    // 初始化时间轴动画
    initTimelineAnimations();
    
    // 初始化价值观卡片交互
    initValueCardInteractions();
    
    // 初始化联系按钮
    initContactButtons();
    
    // 初始化社交媒体链接
    initSocialLinks();
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.skill-category, .timeline-item, .value-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function initSkillCardInteractions() {
    const skillCards = document.querySelectorAll('.skill-category');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // 添加点击涟漪效果
        card.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // 设置延迟动画
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
        
        // 添加悬停效果
        item.addEventListener('mouseenter', function() {
            this.querySelector('.timeline-content').style.transform = 'translateX(8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.timeline-content').style.transform = 'translateX(0)';
        });
    });
}

function initValueCardInteractions() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        // 添加点击涟漪效果
        card.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

function initContactButtons() {
    const sendMessageBtn = document.querySelector('.contact-buttons .btn-dark');
    const downloadResumeBtn = document.querySelector('.contact-buttons .btn-outline-dark');
    
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', function() {
            showContactModal();
        });
    }
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function() {
            // 这里可以添加下载简历的逻辑
            console.log('Download resume clicked');
            // 示例：模拟下载
            this.innerHTML = '<i class="bi bi-download me-2"></i>Downloading...';
            setTimeout(() => {
                this.innerHTML = 'Download Resume';
            }, 2000);
        });
    }
}

function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.color = 'rgba(0, 0, 0, 0.87)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.color = 'rgba(0, 0, 0, 0.5)';
        });
        
        // 添加点击涟漪效果
        link.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

function showContactModal() {
    // 创建联系模态框
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
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Message</label>
                            <textarea class="form-control" id="message" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-dark w-100">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // 添加模态框样式
    const styles = document.createElement('style');
    styles.textContent = `
        .contact-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1050;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .modal-content {
            background: white;
            border-radius: 16px;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 24px 16px;
            border-bottom: 1px solid #eee;
        }
        .modal-header h3 {
            margin: 0;
            font-weight: 600;
        }
        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        .close-btn:hover {
            background: #f0f0f0;
            color: #333;
        }
        .modal-body {
            padding: 24px;
        }
        .form-label {
            font-weight: 500;
            color: #333;
        }
        .form-control {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 12px 16px;
            transition: border-color 0.3s ease;
        }
        .form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
    `;
    
    document.head.appendChild(styles);
    document.body.appendChild(modal);
    
    // 关闭模态框
    const closeBtn = modal.querySelector('.close-btn');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(modal);
        }
    });
    
    // 表单提交
    const form = modal.querySelector('#contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name') || document.getElementById('name').value;
        const email = formData.get('email') || document.getElementById('email').value;
        const message = formData.get('message') || document.getElementById('message').value;
        
        // 这里可以添加发送消息的逻辑
        console.log('Contact form submitted:', { name, email, message });
        
        // 显示成功消息
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 1500);
    });
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        element.removeChild(ripple);
    }, 600);
}

// 添加涟漪动画样式
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

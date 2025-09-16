// Homepage 专用JavaScript功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initHomepageFeatures();
});

// 初始化Homepage功能
function initHomepageFeatures() {
    initProjectInteractions();
    initButtonActions();
    initParallaxEffects();
    initDeviceAnimations();
}

// 项目交互功能
function initProjectInteractions() {
    const projectItems = document.querySelectorAll('.project-item');
    const projectCards = document.querySelectorAll('.project-card');
    
    // 为项目项添加悬停效果
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 为项目卡片添加点击效果
    projectCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // 添加点击波纹效果
            PortfolioUtils.createRippleEffect(event, this);
            
            // 可以在这里添加跳转到项目详情页的逻辑
            console.log('Project card clicked:', this.querySelector('.card-title').textContent);
        });
    });
}

// 按钮动作功能
function initButtonActions() {
    // Hero区域的按钮
    const sayHiBtn = document.querySelector('.hero .btn-primary');
    const discoverBtn = document.querySelector('.hero .btn-secondary');
    
    if (sayHiBtn) {
        sayHiBtn.addEventListener('click', function() {
            // 可以添加联系表单或跳转逻辑
            console.log('Say Hi button clicked');
            showContactForm();
        });
    }
    
    if (discoverBtn) {
        discoverBtn.addEventListener('click', function() {
            // 滚动到项目展示区域
            const projectShowcase = document.querySelector('.project-showcase');
            if (projectShowcase) {
                projectShowcase.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // 项目详情按钮
    const projectButtons = document.querySelectorAll('.project-item .btn-secondary');
    projectButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectTitle = this.closest('.project-item').querySelector('.project-title').textContent;
            console.log('Project details requested for:', projectTitle);
            // 可以添加项目详情弹窗或跳转逻辑
        });
    });
    
    // 联系区域的按钮
    const contactBtn = document.querySelector('.contact .btn-primary');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            console.log('Contact button clicked');
            showContactForm();
        });
    }
}

// 视差效果
function initParallaxEffects() {
    const gradientBgs = document.querySelectorAll('.gradient-bg');
    
    // 使用节流函数优化滚动性能
    const throttledScroll = PortfolioUtils.throttle(function() {
        const scrolled = window.pageYOffset;
        
        gradientBgs.forEach((bg, index) => {
            const speed = 0.3 + (index * 0.1); // 不同层级的移动速度
            const yPos = -(scrolled * speed);
            bg.style.transform = `translateY(${yPos}px)`;
        });
    }, 16); // 约60fps
    
    window.addEventListener('scroll', throttledScroll);
}

// 设备动画效果
function initDeviceAnimations() {
    const devices = document.querySelectorAll('.project-device');
    
    // 使用 Intersection Observer 检测设备进入视口
    const deviceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('device-animate');
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    devices.forEach(device => {
        deviceObserver.observe(device);
    });
}

// 使用common.js中的createRippleEffect函数

// 显示联系表单
function showContactForm() {
    // 创建联系表单弹窗
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Get in Touch</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form class="contact-form-modal">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
            </div>
        </div>
    `;
    
    // 添加弹窗样式
    if (!document.querySelector('#modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .contact-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(10px);
            }
            
            .modal-content {
                position: relative;
                background: white;
                border-radius: 24px;
                padding: 32px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: modalSlideIn 0.3s ease;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
            }
            
            .modal-header h3 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 28px;
                cursor: pointer;
                color: rgba(0, 0, 0, 0.6);
                padding: 0;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                background: rgba(0, 0, 0, 0.1);
                color: rgba(0, 0, 0, 0.8);
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.87);
            }
            
            .form-group input,
            .form-group textarea {
                width: 100%;
                padding: 12px 16px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 12px;
                font-size: 16px;
                transition: border-color 0.3s ease;
            }
            
            .form-group input:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: rgba(0, 0, 0, 0.3);
            }
            
            .contact-form-modal .btn {
                width: 100%;
                margin-top: 16px;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(modal);
    
    // 关闭弹窗事件
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', () => modal.remove());
    
    // 表单提交事件
    const form = modal.querySelector('.contact-form-modal');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // 这里可以添加实际的表单提交逻辑
        alert('Thank you for your message! I\'ll get back to you soon.');
        modal.remove();
    });
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.remove();
        }
    });
}

// 添加设备动画样式
if (!document.querySelector('#device-animations')) {
    const styles = document.createElement('style');
    styles.id = 'device-animations';
    styles.textContent = `
        .project-device {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .project-device.device-animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project-item {
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s ease;
        }
        
        .project-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .project-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-content {
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s ease;
        }
        
        .hero-content.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styles);
}

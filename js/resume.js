// Resume页面专用功能

document.addEventListener('DOMContentLoaded', function() {
    initResumePageFeatures();
});

function initResumePageFeatures() {
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化时间轴动画
    initTimelineAnimations();
    
    // 初始化技能进度条动画
    initSkillProgressAnimations();
    
    // 初始化卡片交互
    initCardInteractions();
    
    // 初始化下载和打印功能
    initDownloadAndPrint();
    
    // 初始化进度条动画
    initProgressBars();
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
                
                // 如果是技能卡片，触发进度条动画
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillProgress(entry.target);
                }
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.personal-card, .timeline-item, .skill-category, .education-item, .certification-card');
    animatedElements.forEach(el => {
        observer.observe(el);
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

function initSkillProgressAnimations() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const progressBars = category.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            // 初始状态
            bar.style.width = '0%';
        });
    });
}

function animateSkillProgress(skillCategory) {
    const progressBars = skillCategory.querySelectorAll('.progress-bar');
    
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.style.width || '0%';
            const width = targetWidth.replace('%', '');
            
            // 重置宽度并开始动画
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        }, index * 200);
    });
}

function initCardInteractions() {
    // 个人卡片交互
    const personalCard = document.querySelector('.personal-card');
    if (personalCard) {
        personalCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        personalCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    // 技能卡片交互
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
    
    // 教育卡片交互
    const educationCards = document.querySelectorAll('.education-item');
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 认证卡片交互
    const certificationCards = document.querySelectorAll('.certification-card');
    certificationCards.forEach(card => {
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

function initDownloadAndPrint() {
    const downloadBtn = document.querySelector('.header-buttons .btn-dark');
    const printBtn = document.querySelector('.header-buttons .btn-outline-dark');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            downloadResume();
        });
    }
    
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            printResume();
        });
    }
}

function downloadResume() {
    const downloadBtn = document.querySelector('.header-buttons .btn-dark');
    const originalText = downloadBtn.innerHTML;
    
    // 显示下载状态
    downloadBtn.innerHTML = '<i class="bi bi-download me-2"></i>Preparing...';
    downloadBtn.disabled = true;
    
    // 模拟下载过程
    setTimeout(() => {
        downloadBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Downloaded!';
        
        // 创建下载链接（这里可以连接到实际的PDF文件）
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'resume.pdf';
        link.click();
        
        // 恢复按钮状态
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }, 2000);
    }, 1500);
}

function printResume() {
    const printBtn = document.querySelector('.header-buttons .btn-outline-dark');
    const originalText = printBtn.innerHTML;
    
    // 显示打印状态
    printBtn.innerHTML = '<i class="bi bi-printer me-2"></i>Preparing...';
    printBtn.disabled = true;
    
    // 模拟打印过程
    setTimeout(() => {
        printBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Printing...';
        
        // 调用打印功能
        window.print();
        
        // 恢复按钮状态
        setTimeout(() => {
            printBtn.innerHTML = originalText;
            printBtn.disabled = false;
        }, 2000);
    }, 1000);
}

function initProgressBars() {
    // 监听技能部分的可见性
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 延迟触发进度条动画
                    setTimeout(() => {
                        const progressBars = entry.target.querySelectorAll('.progress-bar');
                        progressBars.forEach((bar, index) => {
                            setTimeout(() => {
                                const width = bar.getAttribute('style')?.match(/width:\s*(\d+)%/)?.[1] || '0';
                                bar.style.width = '0%';
                                
                                setTimeout(() => {
                                    bar.style.width = width + '%';
                                }, 100);
                            }, index * 200);
                        });
                    }, 500);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }
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
    
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(rippleStyles);

// 添加打印样式
const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        .navbar,
        .footer,
        .header-buttons,
        .gradient-bg {
            display: none !important;
        }
        
        body {
            margin: 0;
            padding: 20px;
            background: white;
        }
        
        .card {
            border: 1px solid #ddd !important;
            box-shadow: none !important;
        }
        
        .timeline::before {
            background: #ddd !important;
        }
        
        .timeline-marker {
            background: #ddd !important;
            border-color: #ddd !important;
        }
        
        .progress-bar {
            background: #ddd !important;
        }
        
        .badge {
            border: 1px solid #ddd !important;
            background: white !important;
            color: #333 !important;
        }
    }
`;
document.head.appendChild(printStyles);

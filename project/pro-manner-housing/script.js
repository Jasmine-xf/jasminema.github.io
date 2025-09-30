// Pro Manner Housing项目专用JavaScript

// 立即修复组件路径问题（在DOM加载前执行）
(function() {
    // 重写fetch路径，使其从正确的相对路径加载组件
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        // 如果是组件文件，修正路径
        if (url.includes('components/')) {
            url = '../../' + url;
        }
        return originalFetch.call(this, url, options);
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    // 滚动动画
    initScrollAnimations();
    
    // 交互效果
    initInteractiveEffects();
    
    // 页面加载动画
    initPageLoadAnimations();
    
    // 修复导航链接路径
    fixNavigationPaths();
    
    // 初始化房产搜索演示
    initPropertySearchDemo();
});

// 修复导航链接路径
function fixNavigationPaths() {
    setTimeout(() => {
        // 修复所有导航链接
        const allLinks = document.querySelectorAll('a[href]');
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                // 为相对路径添加正确的上级目录
                if (href === 'index.html' || href === 'about.html' || href === 'resume.html') {
                    link.setAttribute('href', '../../../' + href);
                }
            }
        });
    }, 100); // 等待组件加载完成
}

// 滚动动画
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

// 交互效果
function initInteractiveEffects() {
    // 场景卡片悬停效果
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

    // 目标列表项点击效果
    const goalItems = document.querySelectorAll('.goals-list li');
    goalItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.background = 'linear-gradient(135deg, #6f42c1, #8e44ad)';
            this.style.color = 'white';
            this.style.transform = 'translateX(12px) scale(1.05)';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
                this.style.transform = '';
            }, 2000);
        });
    });

    // 画廊图片点击放大
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            createImageModal(this.src, this.alt);
        });
    });
}

// 页面加载动画
function initPageLoadAnimations() {
    // 标题打字机效果
    const title = document.querySelector('.work-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid #6f42c1';
        
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

    // 画廊图片依次显示
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

// 初始化房产搜索演示
function initPropertySearchDemo() {
    // 创建房产搜索演示元素
    const demoContainer = document.createElement('div');
    demoContainer.className = 'property-search-demo mt-4';
    demoContainer.innerHTML = `
        <div class="demo-section">
            <h5>Property Search Demo</h5>
            <div class="demo-controls">
                <button class="btn btn-outline-primary btn-sm" onclick="startPropertySearchDemo()">
                    <i class="bi bi-play-circle"></i> Start Demo
                </button>
                <button class="btn btn-outline-secondary btn-sm" onclick="resetPropertySearchDemo()">
                    <i class="bi bi-arrow-clockwise"></i> Reset
                </button>
            </div>
            <div class="property-search mt-3" id="property-search" style="display: none;">
                <div class="search-step">
                    <span class="step-number">1</span>
                    <span class="step-text">Set location and budget preferences</span>
                </div>
                <div class="search-step">
                    <span class="step-number">2</span>
                    <span class="step-text">Browse filtered property listings with detailed information</span>
                </div>
                <div class="search-step">
                    <span class="step-number">3</span>
                    <span class="step-text">Schedule virtual tours and view property details</span>
                </div>
                <div class="search-step">
                    <span class="step-number">4</span>
                    <span class="step-text">Submit application and manage lease through platform</span>
                </div>
            </div>
        </div>
    `;
    
    // 将演示添加到第一个项目部分
    const firstSection = document.querySelector('.project-section');
    if (firstSection) {
        firstSection.appendChild(demoContainer);
    }
}

// 开始房产搜索演示
function startPropertySearchDemo() {
    const propertySearch = document.getElementById('property-search');
    if (propertySearch) {
        propertySearch.style.display = 'block';
        propertySearch.style.opacity = '0';
        propertySearch.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            propertySearch.style.transition = 'all 0.5s ease';
            propertySearch.style.opacity = '1';
            propertySearch.style.transform = 'translateY(0)';
        }, 100);
        
        // 逐步显示搜索步骤
        const searchSteps = propertySearch.querySelectorAll('.search-step');
        searchSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                step.style.transition = 'all 0.3s ease';
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';
            }, 500 + (index * 300));
        });
    }
}

// 重置房产搜索演示
function resetPropertySearchDemo() {
    const propertySearch = document.getElementById('property-search');
    if (propertySearch) {
        propertySearch.style.display = 'none';
        propertySearch.style.opacity = '0';
        propertySearch.style.transform = 'translateY(20px)';
        
        const searchSteps = propertySearch.querySelectorAll('.search-step');
        searchSteps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-20px)';
        });
    }
}

// 创建图片模态框
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

// 平滑滚动到锚点
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.image-modal');
        if (modal) {
            document.body.removeChild(modal);
        }
    }
});

// 添加触摸手势支持（移动端）
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
    
    // 检测滑动手势
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // 向左滑动 - 可以添加导航到下一个项目
            console.log('Swipe left detected');
        } else {
            // 向右滑动 - 可以添加导航到上一个项目
            console.log('Swipe right detected');
        }
    }
});

// 添加房产搜索演示的CSS样式
const demoStyles = `
    .property-search-demo {
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        border-radius: 12px;
        padding: 20px;
        border-left: 4px solid #6f42c1;
    }
    
    .demo-controls {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    }
    
    .search-step {
        display: flex;
        align-items: center;
        padding: 12px;
        margin: 8px 0;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    }
    
    .search-step:hover {
        transform: translateX(5px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .step-number {
        background: #6f42c1;
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-right: 15px;
        font-size: 0.9rem;
    }
    
    .step-text {
        flex: 1;
        font-weight: 500;
    }
`;

// 添加样式到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = demoStyles;
document.head.appendChild(styleSheet);

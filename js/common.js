// 通用JavaScript功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initSmoothScroll();
    initBackToTop();
    initScrollAnimations();
});

// 导航栏功能
function initNavigation() {
    const navOptions = document.querySelectorAll('.nav-option');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 设置当前页面的导航高亮
    navOptions.forEach(option => {
        const href = option.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // 移动端导航菜单（如果需要）
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const navOptions = document.querySelector('.nav-options');
            navOptions.classList.toggle('active');
        });
    }
}

// 平滑滚动功能
function initSmoothScroll() {
    // 为所有内部链接添加平滑滚动
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 考虑固定导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 回到顶部功能
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // 监听滚动事件
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
        
        // 点击回到顶部
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 滚动动画功能
function initScrollAnimations() {
    // 使用 Intersection Observer API 检测元素进入视口
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.project-item, .project-card, .hero-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// 工具函数：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 工具函数：防抖函数
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// 工具函数：获取元素位置
function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset,
        bottom: rect.bottom + window.pageYOffset,
        right: rect.right + window.pageXOffset
    };
}

// 工具函数：检查元素是否在视口中
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 导出函数供其他模块使用
window.PortfolioUtils = {
    throttle,
    debounce,
    getElementPosition,
    isElementInViewport
};

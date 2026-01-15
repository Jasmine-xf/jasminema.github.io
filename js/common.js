// 通用JavaScript功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initSmoothScroll();
    initBackToTop();
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
    // 处理所有包含锚点的链接（包括跨页面的）
    const allLinks = document.querySelectorAll('a[href*="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 检查是否是跨页面的锚点链接（如 index.html#projects）
            if (href.includes('#') && href.includes('.html')) {
                const [page, anchor] = href.split('#');
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                
                // 如果是当前页面，直接滚动
                if (page === currentPage || (page === 'index.html' && currentPage === 'index.html')) {
                    e.preventDefault();
                    const targetId = '#' + anchor;
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80; // 考虑固定导航栏高度
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
                // 如果是其他页面，让浏览器正常跳转，然后在目标页面滚动
                // Bootstrap会自动处理这种情况
            } 
            // 处理同页面的锚点链接
            else if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // 考虑固定导航栏高度
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 页面加载时检查URL中的锚点
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
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

// 创建点击波纹效果
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
    
    // 添加动画样式
    if (!document.querySelector('#ripple-styles')) {
        const styles = document.createElement('style');
        styles.id = 'ripple-styles';
        styles.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // 动画完成后移除元素
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// 导出函数供其他模块使用
window.PortfolioUtils = {
    throttle,
    debounce,
    getElementPosition,
    isElementInViewport,
    createRippleEffect
};

// UofT Library项目专用JavaScript

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
    
    // 初始化导航演示
    initNavigationDemo();

    // 移除白色背景
    initBackgroundRemoval();
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
            this.style.background = 'linear-gradient(135deg, #007bff, #0056b3)';
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

// 打开图片模态框（支持缩放和拖拽）
function openImageModal(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    if (modal && modalImage && typeof bootstrap !== 'undefined') {
        modalImage.src = imgElement.src;
        modalImage.alt = imgElement.alt;
        
        // 重置图片状态
        modalImage.classList.remove('zoomed');
        modalImage.style.transform = 'scale(1) translate(0, 0)';
        
        // 显示模态框
        const bsModal = new bootstrap.Modal(modal, {
            backdrop: true,
            keyboard: true
        });
        bsModal.show();
        
        // 添加图片交互功能
        initImageZoom(modalImage);
    }
}

// 初始化图片缩放和拖拽功能
function initImageZoom(img) {
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;
    let scale = 1;
    let isZoomed = false;
    
    // 鼠标滚轮缩放
    img.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        scale = Math.max(0.5, Math.min(3, scale + delta));
        
        if (scale > 1) {
            img.classList.add('zoomed');
            isZoomed = true;
        } else {
            img.classList.remove('zoomed');
            isZoomed = false;
            translateX = 0;
            translateY = 0;
        }
        
        img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    });
    
    // 鼠标拖拽
    img.addEventListener('mousedown', function(e) {
        if (isZoomed) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            img.style.cursor = 'grabbing';
        }
    });
    
    img.addEventListener('mousemove', function(e) {
        if (isDragging && isZoomed) {
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        }
    });
    
    img.addEventListener('mouseup', function() {
        isDragging = false;
        if (isZoomed) {
            img.style.cursor = 'grab';
        }
    });
    
    img.addEventListener('mouseleave', function() {
        isDragging = false;
        if (isZoomed) {
            img.style.cursor = 'grab';
        }
    });
    
    // 双击重置
    img.addEventListener('dblclick', function() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        img.classList.remove('zoomed');
        img.style.transform = 'scale(1) translate(0, 0)';
        img.style.cursor = 'grab';
        isZoomed = false;
    });
    
    // 触摸设备支持
    let lastTouchDistance = 0;
    
    img.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            // 双指缩放
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            lastTouchDistance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) +
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );
        } else if (e.touches.length === 1 && isZoomed) {
            // 单指拖拽
            isDragging = true;
            const touch = e.touches[0];
            startX = touch.clientX - translateX;
            startY = touch.clientY - translateY;
        }
    });
    
    img.addEventListener('touchmove', function(e) {
        e.preventDefault();
        
        if (e.touches.length === 2) {
            // 双指缩放
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const currentDistance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) +
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );
            
            if (lastTouchDistance > 0) {
                const delta = (currentDistance - lastTouchDistance) * 0.01;
                scale = Math.max(0.5, Math.min(3, scale + delta));
                
                if (scale > 1) {
                    img.classList.add('zoomed');
                    isZoomed = true;
                } else {
                    img.classList.remove('zoomed');
                    isZoomed = false;
                    translateX = 0;
                    translateY = 0;
                }
                
                img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
            }
            
            lastTouchDistance = currentDistance;
        } else if (e.touches.length === 1 && isDragging && isZoomed) {
            // 单指拖拽
            const touch = e.touches[0];
            translateX = touch.clientX - startX;
            translateY = touch.clientY - startY;
            img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        }
    });
    
    img.addEventListener('touchend', function(e) {
        isDragging = false;
        if (e.touches.length === 0) {
            lastTouchDistance = 0;
        }
    });
}

// 页面加载动画
function initPageLoadAnimations() {
    // 标题打字机效果
    const title = document.querySelector('.work-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid #007bff';
        
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


// 开始导航演示
function startNavigationDemo() {
    const demoPath = document.getElementById('demo-path');
    if (demoPath) {
        demoPath.style.display = 'block';
        demoPath.style.opacity = '0';
        demoPath.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            demoPath.style.transition = 'all 0.5s ease';
            demoPath.style.opacity = '1';
            demoPath.style.transform = 'translateY(0)';
        }, 100);
        
        // 逐步显示路径步骤
        const steps = demoPath.querySelectorAll('.path-step');
        steps.forEach((step, index) => {
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

// 重置导航演示
function resetNavigationDemo() {
    const demoPath = document.getElementById('demo-path');
    if (demoPath) {
        demoPath.style.display = 'none';
        demoPath.style.opacity = '0';
        demoPath.style.transform = 'translateY(20px)';
        
        const steps = demoPath.querySelectorAll('.path-step');
        steps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-20px)';
        });
    }
}


// 创建图片模态框（备用方法）
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

// 添加导航演示的CSS样式
const demoStyles = `
    .navigation-demo {
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        border-radius: 12px;
        padding: 20px;
        border-left: 4px solid #007bff;
    }
    
    .demo-controls {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    }
    
    .path-step {
        display: flex;
        align-items: center;
        padding: 10px;
        margin: 5px 0;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    }
    
    .path-step:hover {
        transform: translateX(5px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .step-number {
        background: #007bff;
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

// 初始化 Swiper 轮播
function initSwiper() {
    const swiper = new Swiper('.stages-swiper', {
        slidesPerView: 4.5,
        spaceBetween: 24,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 16
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 24
            },
            1200: {
                slidesPerView: 4.5,
                spaceBetween: 24
            }
        }
    });
}

// 页面加载完成后初始化 Swiper
document.addEventListener('DOMContentLoaded', function() {
    initSwiper();
});

// 将白色背景转换为透明
function initBackgroundRemoval() {
    const targetImages = document.querySelectorAll('.gallery-item img[src*="indoor web low fi"]');
    targetImages.forEach(img => {
        if (img.dataset.bgProcessed === 'true') return;
        const processImage = () => {
            removeWhiteBackground(img);
            img.dataset.bgProcessed = 'true';
        };
        if (img.complete && img.naturalWidth) {
            processImage();
        } else {
            img.addEventListener('load', processImage, { once: true });
        }
    });
}

function removeWhiteBackground(imageElement) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const { naturalWidth, naturalHeight } = imageElement;

    if (!naturalWidth || !naturalHeight) return;

    canvas.width = naturalWidth;
    canvas.height = naturalHeight;
    context.drawImage(imageElement, 0, 0, naturalWidth, naturalHeight);

    const imageData = context.getImageData(0, 0, naturalWidth, naturalHeight);
    const { data } = imageData;
    const tolerance = 240; // 阈值越低，保留的浅色越多

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (r > tolerance && g > tolerance && b > tolerance) {
            data[i + 3] = 0;
        }
    }

    context.putImageData(imageData, 0, 0);
    imageElement.src = canvas.toDataURL('image/png');
    imageElement.classList.add('bg-removed');
}

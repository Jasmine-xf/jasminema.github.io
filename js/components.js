/**
 * ===== 组件加载器 - 作品集网站 =====
 * 功能：动态加载header和footer组件
 * 作用：实现组件的全局化和复用
 * 作者：Portfolio Team
 * 版本：1.0.0
 */

/**
 * ===== 组件加载器类 =====
 * 负责管理所有全局组件的加载和渲染
 */
class ComponentLoader {
    constructor() {
        // 存储加载的组件内容
        this.components = {};
        // 标记是否使用了备用组件
        this.isFallbackMode = false;
        // 初始化组件加载器
        this.init();
    }

    /**
     * ===== 初始化方法 =====
     * 按顺序执行：加载组件 -> 渲染组件 -> 设置导航
     */
    async init() {
        await this.loadComponents();    // 异步加载组件文件
        this.renderComponents();        // 渲染组件到页面
        this.setupNavigation();         // 设置导航高亮
    }

    /**
     * ===== 加载组件方法 =====
     * 从服务器异步加载header和footer组件文件
     * 如果加载失败，则使用内置的备用组件
     */
    async loadComponents() {
        try {
            // 加载导航栏组件
            const headerResponse = await fetch('components/header.html');
            this.components.header = await headerResponse.text();

            // 加载页脚组件
            const footerResponse = await fetch('components/footer.html');
            this.components.footer = await footerResponse.text();
        } catch (error) {
            console.error('组件加载失败:', error);
            this.isFallbackMode = true;
            this.loadFallbackComponents(); // 使用备用组件
        }
    }

    /**
     * ===== 获取基础路径方法 =====
     * 根据当前页面位置确定正确的相对路径前缀
     */
    getBasePath() {
        const path = window.location.pathname;
        if (path.includes('/project/')) {
            return '../../'; // 项目页面需要回到根目录
        }
        return ''; // 根目录页面不需要前缀
    }

    /**
     * ===== 加载备用组件方法 =====
     * 当外部组件文件加载失败时，使用内置的备用组件
     * 确保网站始终能正常显示导航和页脚
     */
    loadFallbackComponents() {
        const basePath = this.getBasePath();
        // 备用组件：当fetch失败时使用
        this.components.header = `
            <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
                <div class="container">
                    <a href="${basePath}index.html" class="navbar-brand d-flex align-items-center text-decoration-none">
                        <img src="${basePath}assets/images/logo.png" alt="Jasmine Ma Logo" style="width: 40px; height: 40px; object-fit: contain;">
                        <span class="fw-bold text-dark d-none d-md-inline">Jasmine Ma</span>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav mx-auto">
                            <li class="nav-item">
                                <a class="nav-link fw-medium" href="${basePath}index.html" data-page="home">
                                    Work
                                    <div class="nav-highlighter"></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fw-medium" href="${basePath}about.html" data-page="about">
                                    About
                                    <div class="nav-highlighter"></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fw-medium" href="${basePath}resume.html" data-page="resume">
                                    Resume
                                    <div class="nav-highlighter"></div>
                                </a>
                            </li>
                        </ul>
                        <div class="navbar-nav flex-row flex-nowrap align-items-center gap-3">
                            <a class="nav-link text-muted p-0 d-flex align-items-center"
                                href="https://www.linkedin.com/in/xuefei-ma-66aa26178/"
                                aria-label="Find Jasmine on LinkedIn"
                                target="_blank" rel="noopener noreferrer">
                                <i class="bi bi-linkedin" aria-hidden="true" style="font-size:30px; line-height:1;"></i>
                            </a>
                            <a class="nav-link text-muted p-0 d-flex align-items-center"
                                href="mailto:jasminemacn@gmail.com"
                                aria-label="Email Jasmine">
                                <i class="bi bi-envelope-fill" aria-hidden="true" style="font-size:30px; line-height:1;"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        `;

        this.components.footer = `
            <footer class="footer bg-light py-5 mt-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 mb-4">
                            <div class="d-flex align-items-center mb-3">
                                <div class="avatar me-3"></div>
                                <span class="fw-bold">Portfolio</span>
                            </div>
                            <p class="text-muted mb-0">
                                A modern portfolio template built with Bootstrap 5. 
                                Showcase your work, skills, and experience in style.
                            </p>
                        </div>
                        <div class="col-lg-4 mb-4">
                            <h6 class="fw-bold mb-3">Quick Links</h6>
                            <div class="d-flex gap-4 flex-wrap justify-content-center justify-content-lg-start">
                                <a href="index.html" class="text-muted text-decoration-none">Works</a>
                                <a href="about.html" class="text-muted text-decoration-none">About</a>
                                <a href="resume.html" class="text-muted text-decoration-none">Resume</a>
                                <a href="#" class="text-muted text-decoration-none">Experiments</a>
                            </div>
                        </div>
                        <div class="col-lg-4 mb-4">
                            <h6 class="fw-bold mb-3">Connect</h6>
                            <div class="d-flex gap-3">
                                <a href="#" class="text-muted text-decoration-none">
                                    <i class="bi bi-twitter fs-5"></i>
                                </a>
                                <a href="#" class="text-muted text-decoration-none">
                                    <i class="bi bi-linkedin fs-5"></i>
                                </a>
                                <a href="#" class="text-muted text-decoration-none">
                                    <i class="bi bi-github fs-5"></i>
                                </a>
                                <a href="#" class="text-muted text-decoration-none">
                                    <i class="bi bi-envelope fs-5"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <hr class="my-4">
                    <div class="text-center">
                        <p class="text-muted mb-0">
                            © 2024 Portfolio. Built with ❤️ and Bootstrap 5.
                        </p>
                    </div>
                </div>
            </footer>
        `;
    }

    /**
     * ===== 渲染组件方法 =====
     * 将加载的组件内容渲染到页面的指定容器中
     */
    renderComponents() {
        // 渲染导航栏组件
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            let headerContent = this.components.header;
            
            // 如果不是备用组件，需要动态调整路径
            if (!this.isFallbackMode) {
                headerContent = this.adjustHeaderPaths(headerContent);
            }
            
            headerContainer.innerHTML = headerContent;
        }

        // 渲染页脚组件
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = this.components.footer;
        }
    }

    /**
     * ===== 调整Header路径方法 =====
     * 动态调整外部加载的header组件中的路径
     */
    adjustHeaderPaths(headerContent) {
        const basePath = this.getBasePath();
        
        // 替换logo链接
        headerContent = headerContent.replace(
            /href="index\.html"/g, 
            `href="${basePath}index.html"`
        );
        
        // 替换导航链接
        headerContent = headerContent.replace(
            /href="about\.html"/g, 
            `href="${basePath}about.html"`
        );
        
        headerContent = headerContent.replace(
            /href="resume\.html"/g, 
            `href="${basePath}resume.html"`
        );
        
        // 替换logo图片路径
        headerContent = headerContent.replace(
            /src="assets\/images\/logo\.png"/g, 
            `src="${basePath}assets/images/logo.png"`
        );
        
        return headerContent;
    }

    /**
     * ===== 设置导航方法 =====
     * 根据当前页面自动设置导航栏的高亮状态
     */
    setupNavigation() {
        // 获取当前页面标识
        const currentPage = this.getCurrentPage();
        // 高亮对应的导航项
        this.highlightActiveNav(currentPage);
    }

    /**
     * ===== 获取当前页面标识方法 =====
     * 通过URL路径判断当前页面，返回对应的页面标识
     * 用于导航栏的高亮显示
     */
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('index.html') || path.endsWith('/')) return 'home';      // 首页
        if (path.includes('about.html')) return 'about';                          // 关于页面
        if (path.includes('resume.html')) return 'resume';                        // 简历页面
        if (path.includes('work.html')) return 'home';                            // 作品页面使用首页导航
        return 'home';                                                            // 默认返回首页
    }

    /**
     * ===== 高亮当前导航项方法 =====
     * 根据当前页面自动高亮对应的导航链接
     */
    highlightActiveNav(page) {
        // 移除所有导航链接的激活状态
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const highlighter = link.querySelector('.nav-highlighter');
            if (highlighter) {
                highlighter.style.display = 'none'; // 隐藏高亮指示器
            }
        });

        // 为当前页面的导航链接添加激活状态
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            const highlighter = activeLink.querySelector('.nav-highlighter');
            if (highlighter) {
                highlighter.style.display = 'block'; // 显示高亮指示器
            }
        }
    }
}

// ===== 页面初始化 =====
// 当DOM加载完成后，初始化组件加载器
document.addEventListener('DOMContentLoaded', () => {
    new ComponentLoader();
});

// ===== 全局导出 =====
// 将ComponentLoader类导出到全局作用域，供其他脚本使用
window.ComponentLoader = ComponentLoader;

/**
 * Component Loader for Portfolio Website
 * Dynamically loads header and footer components
 */

class ComponentLoader {
    constructor() {
        this.components = {};
        this.init();
    }

    async init() {
        await this.loadComponents();
        this.renderComponents();
        this.setupNavigation();
    }

    async loadComponents() {
        try {
            // Load header component
            const headerResponse = await fetch('components/header.html');
            this.components.header = await headerResponse.text();

            // Load footer component
            const footerResponse = await fetch('components/footer.html');
            this.components.footer = await footerResponse.text();
        } catch (error) {
            console.error('Error loading components:', error);
            this.loadFallbackComponents();
        }
    }

    loadFallbackComponents() {
        // Fallback components if fetch fails
        this.components.header = `
            <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
                <div class="container">
                    <div class="navbar-brand d-flex align-items-center">
                        <div class="avatar me-3"></div>
                        <span class="fw-bold">Portfolio</span>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav mx-auto">
                            <li class="nav-item">
                                <a class="nav-link fw-medium" href="index.html" data-page="home">
                                    Work
                                    <div class="nav-highlighter"></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fw-medium" href="about.html" data-page="about">
                                    About
                                    <div class="nav-highlighter"></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fw-medium" href="resume.html" data-page="resume">
                                    Resume
                                    <div class="nav-highlighter"></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link fw-medium" href="#" data-page="experiments">
                                    Experiments
                                    <div class="nav-highlighter"></div>
                                </a>
                            </li>
                        </ul>
                        <div class="navbar-nav">
                            <a class="nav-link text-muted" href="#">
                                <i class="bi bi-twitter me-1"></i>@Your_Twitter
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

    renderComponents() {
        // Render header
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = this.components.header;
        }

        // Render footer
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = this.components.footer;
        }
    }

    setupNavigation() {
        // Set active navigation based on current page
        const currentPage = this.getCurrentPage();
        this.highlightActiveNav(currentPage);
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('index.html') || path.endsWith('/')) return 'home';
        if (path.includes('about.html')) return 'about';
        if (path.includes('resume.html')) return 'resume';
        if (path.includes('work.html')) return 'home'; // work page uses same nav as home
        return 'home';
    }

    highlightActiveNav(page) {
        // Remove all active classes
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const highlighter = link.querySelector('.nav-highlighter');
            if (highlighter) {
                highlighter.style.display = 'none';
            }
        });

        // Add active class to current page
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            const highlighter = activeLink.querySelector('.nav-highlighter');
            if (highlighter) {
                highlighter.style.display = 'block';
            }
        }
    }
}

// Initialize component loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ComponentLoader();
});

// Export for use in other scripts
window.ComponentLoader = ComponentLoader;

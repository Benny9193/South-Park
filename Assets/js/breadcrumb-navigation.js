/**
 * South Park Facebook Profiles - Breadcrumb Navigation System
 * Provides dynamic breadcrumb navigation across all pages
 */

class BreadcrumbNavigation {
    constructor() {
        this.breadcrumbContainer = null;
        this.currentPath = window.location.pathname;
        this.pageConfig = this.setupPageConfiguration();
        this.init();
    }

    setupPageConfiguration() {
        return {
            // Landing page
            '/facebook.html': {
                title: 'South Park Community',
                path: [
                    { name: '🏠 Home', url: 'facebook.html', icon: '🏠' }
                ]
            },
            // Character profiles
            '/Characters/Facebook/HTML Profiles/': {
                getTitle: (filename) => {
                    const characterName = filename.replace('.html', '').replace(/_/g, ' ');
                    return characterName;
                },
                path: [
                    { name: '🏠 Home', url: '../../../facebook.html', icon: '🏠' },
                    { name: '👥 Characters', url: '../../../facebook.html', icon: '👥' }
                ]
            },
            // Group chats
            '/Characters/Facebook/Group Chats/': {
                getTitle: (filename) => {
                    const chatName = filename.replace('.html', '').replace(/-/g, ' ');
                    return `${chatName} Chat`;
                },
                path: [
                    { name: '🏠 Home', url: '../../../facebook.html', icon: '🏠' },
                    { name: '💬 Group Chats', url: '../../../facebook.html#groups', icon: '💬' }
                ]
            },
            // Special pages
            '/south-park-feed.html': {
                title: 'News Feed',
                path: [
                    { name: '🏠 Home', url: 'facebook.html', icon: '🏠' },
                    { name: '📰 News Feed', url: 'south-park-feed.html', icon: '📰' }
                ]
            },
            '/Characters/Facebook/relationship-map.html': {
                title: 'Relationship Map',
                path: [
                    { name: '🏠 Home', url: '../../facebook.html', icon: '🏠' },
                    { name: '🗺️ Relationship Map', url: 'relationship-map.html', icon: '🗺️' }
                ]
            }
        };
    }

    init() {
        this.createBreadcrumbContainer();
        this.generateBreadcrumb();
        this.attachEventListeners();
    }

    createBreadcrumbContainer() {
        // Find the container or create one
        const container = document.querySelector('.container') || document.body;
        
        // Check if breadcrumb already exists
        if (document.querySelector('.breadcrumb-nav')) {
            return;
        }

        // Create breadcrumb navigation
        this.breadcrumbContainer = document.createElement('nav');
        this.breadcrumbContainer.className = 'breadcrumb-nav slide-in';
        this.breadcrumbContainer.innerHTML = '<ol class="breadcrumb" id="breadcrumb-list"></ol>';
        
        // Insert after header or at beginning of container
        const header = document.querySelector('.header');
        if (header && header.nextSibling) {
            container.insertBefore(this.breadcrumbContainer, container.firstChild);
        } else {
            container.insertBefore(this.breadcrumbContainer, container.firstChild);
        }
    }

    generateBreadcrumb() {
        const breadcrumbList = document.getElementById('breadcrumb-list');
        if (!breadcrumbList) return;

        // Clear existing breadcrumbs
        breadcrumbList.innerHTML = '';

        // Get current page info
        const pageInfo = this.getCurrentPageInfo();
        if (!pageInfo) return;

        // Build breadcrumb path
        pageInfo.path.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'breadcrumb-item';
            
            if (index === pageInfo.path.length - 1 && pageInfo.title) {
                // Last item (current page)
                listItem.className += ' active';
                listItem.innerHTML = `<span>${item.icon} ${pageInfo.title}</span>`;
            } else {
                // Clickable items
                listItem.innerHTML = `
                    <a href="${item.url}" class="breadcrumb-link" data-page="${item.name}">
                        ${item.icon} ${item.name}
                    </a>
                `;
            }
            
            breadcrumbList.appendChild(listItem);
        });

        // Add current page if not in path
        if (pageInfo.title && pageInfo.path[pageInfo.path.length - 1].name !== pageInfo.title) {
            const currentItem = document.createElement('li');
            currentItem.className = 'breadcrumb-item active';
            currentItem.innerHTML = `<span>👤 ${pageInfo.title}</span>`;
            breadcrumbList.appendChild(currentItem);
        }
    }

    getCurrentPageInfo() {
        const filename = this.getFilename();
        const currentPath = window.location.pathname;

        // Check for exact matches first
        for (const [path, config] of Object.entries(this.pageConfig)) {
            if (currentPath.includes(path.replace('/', ''))) {
                if (config.getTitle && typeof config.getTitle === 'function') {
                    return {
                        title: config.getTitle(filename),
                        path: config.path
                    };
                }
                return config;
            }
        }

        // Default for character profiles
        if (filename && filename.includes('.html')) {
            const characterName = this.extractCharacterName(filename);
            return {
                title: characterName,
                path: [
                    { name: '🏠 Home', url: this.getRelativeUrl('facebook.html'), icon: '🏠' },
                    { name: '👥 Characters', url: this.getRelativeUrl('facebook.html'), icon: '👥' }
                ]
            };
        }

        return null;
    }

    getFilename() {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf('/') + 1);
    }

    extractCharacterName(filename) {
        return filename
            .replace('.html', '')
            .replace(/_/g, ' ')
            .replace(/([A-Z])/g, ' $1')
            .replace(/\b\w/g, l => l.toUpperCase())
            .trim();
    }

    getRelativeUrl(target) {
        const currentPath = window.location.pathname;
        const depth = (currentPath.match(/\//g) || []).length - 1;
        
        if (depth <= 1) return target;
        return '../'.repeat(depth - 1) + target;
    }

    attachEventListeners() {
        // Add click analytics
        document.addEventListener('click', (e) => {
            if (e.target.matches('.breadcrumb-link')) {
                const pageName = e.target.dataset.page;
                console.log(`Breadcrumb navigation: ${pageName}`);
                
                // Add click animation
                e.target.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    e.target.style.transform = '';
                }, 150);
            }
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'ArrowLeft') {
                e.preventDefault();
                const breadcrumbs = document.querySelectorAll('.breadcrumb-link');
                if (breadcrumbs.length > 0) {
                    const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
                    lastBreadcrumb.click();
                }
            }
        });
    }

    // Public method to update breadcrumb dynamically
    updateBreadcrumb(title, path) {
        if (title) {
            this.pageConfig[window.location.pathname] = { title, path };
            this.generateBreadcrumb();
        }
    }

    // Add back button functionality
    static createBackButton(targetUrl, text = '← Back') {
        const backBtn = document.createElement('a');
        backBtn.href = targetUrl;
        backBtn.className = 'back-btn bounce-in';
        backBtn.innerHTML = `<span>←</span> ${text}`;
        
        backBtn.addEventListener('click', (e) => {
            backBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                backBtn.style.transform = '';
            }, 150);
        });

        return backBtn;
    }
}

// Initialize breadcrumb navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BreadcrumbNavigation();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BreadcrumbNavigation;
}
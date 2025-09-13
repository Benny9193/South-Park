/**
 * Floating Action Button Integration for Character Switcher
 * Adds the FAB to all pages and handles integration
 */

class FABIntegration {
    constructor() {
        this.fab = null;
        this.init();
    }

    init() {
        this.createFAB();
        this.attachEventListeners();
        this.handlePageSpecificLogic();
    }

    createFAB() {
        // Don't create FAB on the main landing page
        if (this.isLandingPage()) {
            return;
        }

        this.fab = document.createElement('button');
        this.fab.className = 'character-switcher-fab bounce-in';
        this.fab.setAttribute('aria-label', 'Quick Character Switcher');
        this.fab.style.animationDelay = '1s';
        
        document.body.appendChild(this.fab);
    }

    attachEventListeners() {
        if (!this.fab) return;

        this.fab.addEventListener('click', () => {
            if (window.characterSwitcher) {
                window.characterSwitcher.show();
            }
        });

        // Add click animation
        this.fab.addEventListener('click', () => {
            this.fab.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.fab.style.transform = '';
            }, 150);
        });
    }

    isLandingPage() {
        const path = window.location.pathname;
        return path.includes('facebook.html') || path === '/' || path.endsWith('/');
    }

    handlePageSpecificLogic() {
        // Add page-specific enhancements based on current page
        const currentPage = this.getCurrentPageType();
        
        switch (currentPage) {
            case 'character-profile':
                this.enhanceCharacterProfile();
                break;
            case 'group-chat':
                this.enhanceGroupChat();
                break;
            case 'news-feed':
                this.enhanceNewsFeed();
                break;
        }
    }

    getCurrentPageType() {
        const path = window.location.pathname;
        
        if (path.includes('HTML Profiles')) return 'character-profile';
        if (path.includes('Group Chats')) return 'group-chat';
        if (path.includes('feed.html')) return 'news-feed';
        if (path.includes('relationship-map.html')) return 'relationship-map';
        
        return 'other';
    }

    enhanceCharacterProfile() {
        // Add character-specific enhancements
        setTimeout(() => {
            // Add quick navigation between related characters
            this.addQuickNavigation();
            
            // Add character status indicator
            this.addCharacterStatus();
            
            // Enhance post interactions
            this.enhancePostInteractions();
        }, 1000);
    }

    addQuickNavigation() {
        const profileHeader = document.querySelector('.profile-header');
        if (!profileHeader) return;

        const quickNav = document.createElement('div');
        quickNav.className = 'quick-navigation fade-in';
        quickNav.innerHTML = `
            <div class="quick-nav-item" onclick="window.characterSwitcher?.show()" title="All Characters">
                <span>👥</span>
            </div>
            <div class="quick-nav-item" onclick="window.history.back()" title="Go Back">
                <span>←</span>
            </div>
            <div class="quick-nav-item" onclick="window.location.href='../../../facebook.html'" title="Home">
                <span>🏠</span>
            </div>
        `;
        
        // Add styles for quick navigation
        const styles = document.createElement('style');
        styles.textContent = `
            .quick-navigation {
                position: absolute;
                top: 20px;
                right: 20px;
                display: flex;
                gap: 8px;
                z-index: 100;
            }
            
            .quick-nav-item {
                width: 36px;
                height: 36px;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                font-size: 16px;
            }
            
            .quick-nav-item:hover {
                background: white;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            
            @media (max-width: 768px) {
                .quick-navigation {
                    top: 10px;
                    right: 10px;
                }
                
                .quick-nav-item {
                    width: 32px;
                    height: 32px;
                    font-size: 14px;
                }
            }
        `;
        
        if (!document.querySelector('#quick-nav-styles')) {
            styles.id = 'quick-nav-styles';
            document.head.appendChild(styles);
        }
        
        profileHeader.style.position = 'relative';
        profileHeader.appendChild(quickNav);
    }

    addCharacterStatus() {
        const profileName = document.querySelector('.profile-name');
        if (!profileName) return;

        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'character-status-indicator pulse';
        statusIndicator.innerHTML = '<span class="status-dot online"></span><span class="status-text">Active</span>';
        
        const styles = document.createElement('style');
        styles.textContent = `
            .character-status-indicator {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 13px;
                color: #42b883;
                margin-top: 4px;
            }
            
            .status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #42b883;
                box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.3);
            }
            
            .status-dot.online {
                background: #42b883;
                animation: pulse 2s infinite;
            }
            
            .status-text {
                font-weight: 500;
            }
        `;
        
        if (!document.querySelector('#status-styles')) {
            styles.id = 'status-styles';
            document.head.appendChild(styles);
        }
        
        profileName.parentNode.appendChild(statusIndicator);
    }

    enhancePostInteractions() {
        const posts = document.querySelectorAll('.post');
        posts.forEach((post, index) => {
            // Add loading states to post actions
            const actions = post.querySelectorAll('.post-action');
            actions.forEach(action => {
                action.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Add loading animation
                    const originalText = action.textContent;
                    action.classList.add('loading');
                    action.textContent = 'Loading...';
                    
                    setTimeout(() => {
                        action.classList.remove('loading');
                        action.textContent = originalText;
                        
                        // Add success feedback
                        action.style.color = '#42b883';
                        setTimeout(() => {
                            action.style.color = '';
                        }, 1000);
                    }, 800);
                });
            });
            
            // Add entrance animation with delay
            post.style.animationDelay = `${index * 0.1}s`;
            post.classList.add('slide-in');
        });
    }

    enhanceGroupChat() {
        // Add group chat specific enhancements
        setTimeout(() => {
            this.addChatEnhancements();
        }, 500);
    }

    addChatEnhancements() {
        // Add typing indicators, message reactions, etc.
        const messages = document.querySelectorAll('.chat-message');
        messages.forEach((message, index) => {
            message.style.animationDelay = `${index * 0.1}s`;
            message.classList.add('slide-in');
        });
    }

    enhanceNewsFeed() {
        // Add news feed specific enhancements
        setTimeout(() => {
            this.addFeedEnhancements();
        }, 500);
    }

    addFeedEnhancements() {
        const feedPosts = document.querySelectorAll('.feed-post');
        feedPosts.forEach((post, index) => {
            post.style.animationDelay = `${index * 0.15}s`;
            post.classList.add('slide-in');
        });
    }
}

// Initialize FAB integration when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.fabIntegration = new FABIntegration();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FABIntegration;
}
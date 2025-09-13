/**
 * South Park Facebook Profiles - Mobile Touch Enhancements
 * Provides touch gestures, swipe navigation, and mobile-specific improvements
 */

class MobileEnhancements {
    constructor() {
        this.isMobile = this.detectMobile();
        this.touchStart = null;
        this.touchEnd = null;
        this.swipeThreshold = 50;
        this.tapTimeout = null;
        this.lastTap = 0;
        
        if (this.isMobile) {
            this.init();
        }
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 768;
    }

    init() {
        this.addMobileStyles();
        this.enhanceTouchInteractions();
        this.addSwipeNavigation();
        this.addPullToRefresh();
        this.enhanceScrolling();
        this.addTouchFeedback();
        this.optimizeForMobile();
    }

    addMobileStyles() {
        const styles = document.createElement('style');
        styles.id = 'mobile-enhancements-styles';
        styles.textContent = `
            @media (max-width: 768px) {
                /* Touch-friendly sizing */
                .post-action, .composer-action, .reaction-trigger {
                    min-height: 44px;
                    min-width: 44px;
                    padding: 12px 16px;
                }

                .character-card, .friend-card {
                    min-height: 44px;
                    touch-action: manipulation;
                }

                /* Improved touch targets */
                .nav-icon, .close-btn, .filter-btn {
                    min-width: 44px;
                    min-height: 44px;
                    touch-action: manipulation;
                }

                /* Swipe indicators */
                .swipe-indicator {
                    position: fixed;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(24, 119, 242, 0.9);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 500;
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 0.2s;
                    pointer-events: none;
                }

                .swipe-indicator.left {
                    left: 20px;
                }

                .swipe-indicator.right {
                    right: 20px;
                }

                .swipe-indicator.visible {
                    opacity: 1;
                }

                /* Pull to refresh indicator */
                .pull-refresh-indicator {
                    position: fixed;
                    top: 70px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(24, 119, 242, 0.9);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 13px;
                    opacity: 0;
                    transition: all 0.3s;
                    z-index: 10000;
                }

                .pull-refresh-indicator.visible {
                    opacity: 1;
                    transform: translateX(-50%) translateY(10px);
                }

                /* Touch feedback */
                .touch-feedback {
                    position: relative;
                    overflow: hidden;
                }

                .touch-feedback::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle, rgba(24, 119, 242, 0.3) 0%, transparent 70%);
                    transform: scale(0);
                    transition: transform 0.3s ease-out;
                    pointer-events: none;
                    z-index: 1;
                }

                .touch-feedback.active::before {
                    transform: scale(1);
                }

                /* Smooth scrolling */
                * {
                    -webkit-overflow-scrolling: touch;
                }

                /* Prevent zoom on inputs */
                input, select, textarea {
                    font-size: 16px !important;
                }

                /* Larger tap targets for small elements */
                .profile-pic, .post-avatar, .friend-avatar {
                    cursor: pointer;
                    touch-action: manipulation;
                }

                /* Bottom navigation safe area */
                .content-area {
                    padding-bottom: env(safe-area-inset-bottom);
                }

                /* Enhanced floating action button for mobile */
                .character-switcher-fab {
                    bottom: calc(16px + env(safe-area-inset-bottom));
                    right: 16px;
                    width: 56px;
                    height: 56px;
                    box-shadow: 0 6px 20px rgba(24, 119, 242, 0.4);
                }
            }

            /* Haptic feedback animation */
            @keyframes hapticPulse {
                0% { transform: scale(1); }
                50% { transform: scale(0.95); }
                100% { transform: scale(1); }
            }

            .haptic-pulse {
                animation: hapticPulse 0.1s ease-out;
            }

            /* Long press indicator */
            @keyframes longPressRipple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(1);
                    opacity: 0;
                }
            }

            .long-press-ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(24, 119, 242, 0.3);
                animation: longPressRipple 0.6s ease-out;
                pointer-events: none;
            }
        `;
        
        document.head.appendChild(styles);
    }

    enhanceTouchInteractions() {
        // Add touch feedback to interactive elements
        const interactiveElements = document.querySelectorAll(`
            .post-action, .composer-action, .character-card, .friend-card,
            .filter-btn, .action-btn, .nav-icon, .reaction-trigger
        `);

        interactiveElements.forEach(element => {
            element.classList.add('touch-feedback');
            
            element.addEventListener('touchstart', (e) => {
                this.addTouchRipple(element, e.touches[0]);
                element.classList.add('active');
                
                // Add haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate(10);
                }
            });

            element.addEventListener('touchend', () => {
                element.classList.remove('active');
            });

            // Double tap enhancement
            element.addEventListener('touchend', (e) => {
                const currentTime = new Date().getTime();
                const tapLength = currentTime - this.lastTap;
                
                if (tapLength < 500 && tapLength > 0) {
                    this.handleDoubleTap(element, e);
                }
                this.lastTap = currentTime;
            });
        });
    }

    addTouchRipple(element, touch) {
        const rect = element.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.className = 'long-press-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    addSwipeNavigation() {
        document.addEventListener('touchstart', (e) => {
            this.touchStart = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                time: Date.now()
            };
        });

        document.addEventListener('touchmove', (e) => {
            if (!this.touchStart) return;
            
            const touch = e.touches[0];
            const deltaX = touch.clientX - this.touchStart.x;
            const deltaY = touch.clientY - this.touchStart.y;
            
            // Show swipe indicators
            if (Math.abs(deltaX) > 30 && Math.abs(deltaY) < 50) {
                this.showSwipeIndicator(deltaX > 0 ? 'right' : 'left');
                
                // Prevent default scrolling during horizontal swipe
                e.preventDefault();
            }
        });

        document.addEventListener('touchend', (e) => {
            if (!this.touchStart) return;
            
            this.touchEnd = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
                time: Date.now()
            };
            
            this.handleSwipe();
            this.hideSwipeIndicators();
            this.touchStart = null;
            this.touchEnd = null;
        });
    }

    handleSwipe() {
        if (!this.touchStart || !this.touchEnd) return;
        
        const deltaX = this.touchEnd.x - this.touchStart.x;
        const deltaY = this.touchEnd.y - this.touchStart.y;
        const deltaTime = this.touchEnd.time - this.touchStart.time;
        
        // Must be a quick swipe
        if (deltaTime > 300) return;
        
        // Must be mostly horizontal
        if (Math.abs(deltaY) > Math.abs(deltaX)) return;
        
        // Must be long enough
        if (Math.abs(deltaX) < this.swipeThreshold) return;
        
        if (deltaX > 0) {
            this.handleSwipeRight();
        } else {
            this.handleSwipeLeft();
        }
    }

    handleSwipeRight() {
        // Swipe right - go back or to previous character
        if (this.isCharacterProfile()) {
            this.goToPreviousCharacter();
        } else {
            window.history.back();
        }
    }

    handleSwipeLeft() {
        // Swipe left - go forward or to next character  
        if (this.isCharacterProfile()) {
            this.goToNextCharacter();
        } else {
            // Open character switcher
            if (window.characterSwitcher) {
                window.characterSwitcher.show();
            }
        }
    }

    goToPreviousCharacter() {
        // Implementation would require character list - for demo, just show switcher
        if (window.characterSwitcher) {
            window.characterSwitcher.show();
        }
    }

    goToNextCharacter() {
        // Implementation would require character list - for demo, just show switcher
        if (window.characterSwitcher) {
            window.characterSwitcher.show();
        }
    }

    showSwipeIndicator(direction) {
        let indicator = document.querySelector(`.swipe-indicator.${direction}`);
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = `swipe-indicator ${direction}`;
            indicator.textContent = direction === 'left' ? '← Back' : 'Switch →';
            document.body.appendChild(indicator);
        }
        
        indicator.classList.add('visible');
    }

    hideSwipeIndicators() {
        document.querySelectorAll('.swipe-indicator').forEach(indicator => {
            indicator.classList.remove('visible');
        });
    }

    addPullToRefresh() {
        let startY = 0;
        let currentY = 0;
        let isPulling = false;
        
        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].clientY;
                isPulling = true;
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (!isPulling) return;
            
            currentY = e.touches[0].clientY;
            const pullDistance = currentY - startY;
            
            if (pullDistance > 50 && window.scrollY === 0) {
                this.showPullRefreshIndicator();
                
                if (pullDistance > 100) {
                    // Prevent default scroll behavior
                    e.preventDefault();
                }
            } else {
                this.hidePullRefreshIndicator();
            }
        });

        document.addEventListener('touchend', () => {
            if (isPulling && currentY - startY > 100) {
                this.performRefresh();
            }
            
            isPulling = false;
            this.hidePullRefreshIndicator();
        });
    }

    showPullRefreshIndicator() {
        let indicator = document.querySelector('.pull-refresh-indicator');
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'pull-refresh-indicator';
            indicator.innerHTML = '⟳ Release to refresh';
            document.body.appendChild(indicator);
        }
        
        indicator.classList.add('visible');
    }

    hidePullRefreshIndicator() {
        const indicator = document.querySelector('.pull-refresh-indicator');
        if (indicator) {
            indicator.classList.remove('visible');
        }
    }

    performRefresh() {
        const indicator = document.querySelector('.pull-refresh-indicator');
        if (indicator) {
            indicator.innerHTML = '⟳ Refreshing...';
            indicator.classList.add('visible');
        }
        
        // Add haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Simulate refresh delay
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    enhanceScrolling() {
        // Add momentum scrolling
        document.documentElement.style.cssText = `
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
        `;

        // Add scroll position restoration
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('scrollPosition', window.scrollY.toString());
        });

        window.addEventListener('load', () => {
            const savedPosition = sessionStorage.getItem('scrollPosition');
            if (savedPosition) {
                window.scrollTo(0, parseInt(savedPosition));
                sessionStorage.removeItem('scrollPosition');
            }
        });
    }

    addTouchFeedback() {
        // Add visual feedback for long presses
        let longPressTimer;
        
        document.addEventListener('touchstart', (e) => {
            const element = e.target.closest('.touch-feedback');
            if (!element) return;
            
            longPressTimer = setTimeout(() => {
                element.classList.add('haptic-pulse');
                
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
                
                setTimeout(() => {
                    element.classList.remove('haptic-pulse');
                }, 100);
            }, 500);
        });

        document.addEventListener('touchend', () => {
            clearTimeout(longPressTimer);
        });

        document.addEventListener('touchmove', () => {
            clearTimeout(longPressTimer);
        });
    }

    handleDoubleTap(element, event) {
        // Add double tap functionality
        event.preventDefault();
        
        // Add visual feedback
        element.classList.add('haptic-pulse');
        
        // Add haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate([30, 50, 30]);
        }
        
        // Handle different element types
        if (element.classList.contains('post')) {
            this.handlePostDoubleTap(element);
        } else if (element.classList.contains('character-card')) {
            this.handleCharacterDoubleTap(element);
        }
        
        setTimeout(() => {
            element.classList.remove('haptic-pulse');
        }, 100);
    }

    handlePostDoubleTap(post) {
        // Double tap on post - quick like
        const likeButton = post.querySelector('.reaction-trigger');
        if (likeButton && window.emojiReactions) {
            const postId = likeButton.getAttribute('data-post-id');
            window.emojiReactions.addReaction(postId, 'love', { 
                clientX: window.innerWidth / 2, 
                clientY: window.innerHeight / 2 
            });
        }
    }

    handleCharacterDoubleTap(card) {
        // Double tap on character card - quick navigation
        if (card.href) {
            window.location.href = card.href;
        }
    }

    isCharacterProfile() {
        return window.location.pathname.includes('HTML Profiles');
    }

    optimizeForMobile() {
        // Add mobile-specific meta tags if not present
        if (!document.querySelector('meta[name="theme-color"]')) {
            const themeColor = document.createElement('meta');
            themeColor.name = 'theme-color';
            themeColor.content = '#1877f2';
            document.head.appendChild(themeColor);
        }

        // Add apple touch icon
        if (!document.querySelector('link[rel="apple-touch-icon"]')) {
            const touchIcon = document.createElement('link');
            touchIcon.rel = 'apple-touch-icon';
            touchIcon.href = '/Assets/images/apple-touch-icon.png';
            document.head.appendChild(touchIcon);
        }

        // Disable text selection on UI elements
        const uiElements = document.querySelectorAll(`
            .header, .nav-icon, .filter-btn, .character-card, 
            .post-action, .reaction-trigger
        `);
        
        uiElements.forEach(element => {
            element.style.userSelect = 'none';
            element.style.webkitUserSelect = 'none';
        });

        // Prevent context menu on long press for UI elements
        uiElements.forEach(element => {
            element.addEventListener('contextmenu', (e) => {
                if (element.classList.contains('touch-feedback')) {
                    e.preventDefault();
                }
            });
        });
    }
}

// Initialize mobile enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mobileEnhancements = new MobileEnhancements();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileEnhancements;
}
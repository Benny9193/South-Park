/**
 * South Park Facebook Profiles - Complete System Integration
 * Orchestrates all subsystems for seamless operation
 */

class SouthParkSystemIntegration {
    constructor() {
        this.systems = {};
        this.integrationReady = false;
        this.performanceMetrics = {
            loadTime: 0,
            interactionCount: 0,
            errorCount: 0,
            systemHealth: 'initializing'
        };
        this.initializeSystemIntegration();
    }

    async initializeSystemIntegration() {
        console.log('🚀 Initializing South Park Facebook Profiles System...');
        const startTime = Date.now();
        
        try {
            // Initialize core systems in order
            await this.initializeCoreCharacterSystem();
            await this.initializeMoodSystem();
            await this.initializeCommentThreading();
            await this.initializeEventsCalendar();
            await this.integrateAllSystems();
            
            this.performanceMetrics.loadTime = Date.now() - startTime;
            this.performanceMetrics.systemHealth = 'operational';
            this.integrationReady = true;
            
            console.log(`✅ System fully initialized in ${this.performanceMetrics.loadTime}ms`);
            this.startSystemMonitoring();
            this.displaySystemStatus();
            
        } catch (error) {
            console.error('❌ System initialization failed:', error);
            this.performanceMetrics.systemHealth = 'error';
            this.performanceMetrics.errorCount++;
            this.handleSystemError(error);
        }
    }

    async initializeCoreCharacterSystem() {
        console.log('📝 Initializing Character Interaction System...');
        
        if (typeof CharacterInteractionSystem !== 'undefined') {
            this.systems.characters = window.characterInteractions || new CharacterInteractionSystem();
            console.log('✓ Character system ready');
        } else {
            throw new Error('Character Interaction System not loaded');
        }
    }

    async initializeMoodSystem() {
        console.log('😊 Initializing Character Mood System...');
        
        if (typeof CharacterMoodSystem !== 'undefined' && this.systems.characters) {
            this.systems.moods = new CharacterMoodSystem(this.systems.characters);
            console.log('✓ Mood system ready');
        } else {
            console.warn('⚠️ Mood system not available, continuing without it');
        }
    }

    async initializeCommentThreading() {
        console.log('🧵 Initializing Advanced Comment Threading...');
        
        if (typeof AdvancedCommentThreading !== 'undefined' && this.systems.characters) {
            this.systems.threading = new AdvancedCommentThreading(this.systems.characters);
            console.log('✓ Threading system ready');
        } else {
            console.warn('⚠️ Threading system not available, using basic comments');
        }
    }

    async initializeEventsCalendar() {
        console.log('📅 Initializing Special Events Calendar...');
        
        if (typeof SpecialEventsCalendar !== 'undefined' && this.systems.characters) {
            this.systems.events = new SpecialEventsCalendar(
                this.systems.characters, 
                this.systems.moods
            );
            console.log('✓ Events system ready');
        } else {
            console.warn('⚠️ Events system not available, continuing without it');
        }
    }

    async integrateAllSystems() {
        console.log('🔗 Integrating all systems...');
        
        // Cross-system event listeners
        this.setupSystemEventListeners();
        
        // Shared state management
        this.setupSharedStateManagement();
        
        // Performance optimization
        this.setupPerformanceOptimizations();
        
        // Error handling
        this.setupGlobalErrorHandling();
        
        console.log('✓ Systems integrated successfully');
    }

    setupSystemEventListeners() {
        // Character interaction triggers mood changes
        if (this.systems.threading && this.systems.moods) {
            const originalGenerateComment = this.systems.threading.generateContextualComment;
            this.systems.threading.generateContextualComment = (commenterKey, postAuthorKey, postContent, context) => {
                // Trigger mood-based interaction detection
                if (this.systems.moods) {
                    this.systems.moods.detectInteractionEvent(commenterKey, postAuthorKey, 'comment');
                }
                return originalGenerateComment.call(this.systems.threading, commenterKey, postAuthorKey, postContent, context);
            };
        }

        // Mood changes affect comment generation
        if (this.systems.characters && this.systems.moods) {
            const originalGetContextualComment = this.systems.characters.getContextualComment;
            this.systems.characters.getContextualComment = (commenterKey, postAuthorKey, postContent, postType, relationship) => {
                const originalComment = originalGetContextualComment.call(
                    this.systems.characters, commenterKey, postAuthorKey, postContent, postType, relationship
                );
                
                // Apply mood modifications
                if (this.systems.moods) {
                    return this.systems.moods.getMoodModifiedComment(commenterKey, originalComment, postType);
                }
                
                return originalComment;
            };
        }

        // Events trigger mood changes
        if (this.systems.events && this.systems.moods) {
            // This integration is already handled in the events system
            console.log('✓ Events-Mood integration active');
        }

        // Post interactions increment metrics
        document.addEventListener('click', (event) => {
            if (event.target.matches('.comment-like, .action-btn, .character-card, .filter-btn')) {
                this.performanceMetrics.interactionCount++;
                this.trackInteraction(event.target);
            }
        });
    }

    setupSharedStateManagement() {
        // Global state object for cross-system communication
        window.southParkState = {
            currentCrisisLevel: 1,
            activeMoods: new Map(),
            globalModifiers: {},
            systemHealth: this.performanceMetrics.systemHealth,
            lastUpdate: Date.now()
        };

        // State synchronization every 30 seconds
        setInterval(() => {
            this.synchronizeSystemState();
        }, 30000);
    }

    setupPerformanceOptimizations() {
        // Debounce rapid interactions
        this.debouncedInteraction = this.debounce((target) => {
            this.processInteraction(target);
        }, 300);

        // Throttle mood updates
        this.throttledMoodUpdate = this.throttle((charKey, trigger) => {
            if (this.systems.moods) {
                this.systems.moods.triggerMoodChange(charKey, trigger);
            }
        }, 1000);

        // Memory cleanup for old posts
        setInterval(() => {
            this.performMemoryCleanup();
        }, 300000); // 5 minutes
    }

    setupGlobalErrorHandling() {
        window.addEventListener('error', (event) => {
            this.handleError(event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason);
        });
    }

    trackInteraction(element) {
        const interactionType = element.className.split(' ')[0];
        const characterContext = element.closest('[data-character]')?.dataset.character;
        
        // Log interaction for analytics
        if (this.systems.moods && characterContext) {
            this.systems.moods.detectInteractionEvent(
                'user', 
                characterContext, 
                interactionType
            );
        }
        
        // Update UI responsiveness
        this.debouncedInteraction(element);
    }

    processInteraction(target) {
        // Add visual feedback
        target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            target.style.transform = '';
        }, 150);

        // Update interaction metrics
        this.updateSystemHealth();
    }

    synchronizeSystemState() {
        if (!window.southParkState) return;

        // Update global state with current system status
        window.southParkState.lastUpdate = Date.now();
        window.southParkState.systemHealth = this.performanceMetrics.systemHealth;
        
        if (this.systems.moods) {
            window.southParkState.activeMoods.clear();
            this.systems.moods.characterMoods.forEach((mood, charKey) => {
                window.southParkState.activeMoods.set(charKey, mood.current);
            });
        }

        if (this.systems.events) {
            window.southParkState.currentCrisisLevel = Math.max(
                1,
                this.systems.events.getActiveEvents().length
            );
        }
    }

    updateSystemHealth() {
        const errorRate = this.performanceMetrics.errorCount / Math.max(1, this.performanceMetrics.interactionCount);
        
        if (errorRate > 0.1) {
            this.performanceMetrics.systemHealth = 'degraded';
        } else if (errorRate > 0.05) {
            this.performanceMetrics.systemHealth = 'warning';
        } else {
            this.performanceMetrics.systemHealth = 'operational';
        }
    }

    performMemoryCleanup() {
        // Clean up old post data
        if (window.newsFeed && window.newsFeed.posts) {
            const maxPosts = 50;
            if (window.newsFeed.posts.length > maxPosts) {
                window.newsFeed.posts = window.newsFeed.posts.slice(0, maxPosts);
            }
        }

        // Clean up old mood history
        if (this.systems.moods) {
            this.systems.moods.moodHistory.forEach((history, charKey) => {
                if (history.length > 20) {
                    this.systems.moods.moodHistory.set(charKey, history.slice(-20));
                }
            });
        }

        // Clean up old comment threads
        if (this.systems.threading) {
            this.systems.threading.activeThreads.forEach((thread, threadId) => {
                const age = Date.now() - thread.comments[0]?.timestamp || 0;
                if (age > 3600000) { // 1 hour
                    this.systems.threading.activeThreads.delete(threadId);
                }
            });
        }

        console.log('🧹 Memory cleanup completed');
    }

    handleError(error) {
        this.performanceMetrics.errorCount++;
        console.error('System Error:', error);
        
        // Attempt graceful degradation
        if (error.message.includes('mood')) {
            console.warn('Disabling mood system due to errors');
            this.systems.moods = null;
        } else if (error.message.includes('threading')) {
            console.warn('Falling back to basic comments due to threading errors');
            this.systems.threading = null;
        } else if (error.message.includes('events')) {
            console.warn('Disabling events system due to errors');
            this.systems.events = null;
        }
        
        this.updateSystemHealth();
    }

    handleSystemError(error) {
        // Display user-friendly error message
        const errorContainer = document.createElement('div');
        errorContainer.className = 'system-error';
        errorContainer.innerHTML = `
            <div style="background: #ff6b6b; color: white; padding: 10px; border-radius: 5px; margin: 10px;">
                ⚠️ System temporarily unavailable. Refreshing page...
            </div>
        `;
        
        document.body.insertBefore(errorContainer, document.body.firstChild);
        
        // Auto-refresh after delay
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    startSystemMonitoring() {
        // Performance monitoring
        setInterval(() => {
            this.checkSystemPerformance();
        }, 60000); // Every minute
        
        // Health checks
        setInterval(() => {
            this.performHealthCheck();
        }, 300000); // Every 5 minutes
        
        // Auto-optimization
        setInterval(() => {
            this.optimizeSystemPerformance();
        }, 900000); // Every 15 minutes
    }

    checkSystemPerformance() {
        const memoryUsage = performance.memory ? performance.memory.usedJSHeapSize : 0;
        const maxMemory = performance.memory ? performance.memory.jsHeapSizeLimit : 0;
        
        if (memoryUsage > maxMemory * 0.8) {
            console.warn('High memory usage detected, performing cleanup');
            this.performMemoryCleanup();
        }
    }

    performHealthCheck() {
        const healthStatus = {
            characters: !!this.systems.characters,
            moods: !!this.systems.moods,
            threading: !!this.systems.threading,
            events: !!this.systems.events,
            interactions: this.performanceMetrics.interactionCount > 0,
            errors: this.performanceMetrics.errorCount < 5
        };
        
        const healthScore = Object.values(healthStatus).filter(Boolean).length / Object.keys(healthStatus).length;
        
        if (healthScore < 0.7) {
            console.warn('System health degraded:', healthStatus);
            this.performanceMetrics.systemHealth = 'degraded';
        }
    }

    optimizeSystemPerformance() {
        // Reduce animation frequency if performance is poor
        const shouldReduceAnimations = this.performanceMetrics.errorCount > 3;
        
        if (shouldReduceAnimations) {
            document.body.classList.add('reduced-motion');
        }
        
        // Adjust posting frequency based on system load
        if (this.systems.characters && this.performanceMetrics.systemHealth === 'degraded') {
            this.systems.characters.globalModifiers = this.systems.characters.globalModifiers || {};
            this.systems.characters.globalModifiers.posting_frequency = 0.5;
        }
    }

    displaySystemStatus() {
        if (this.integrationReady) {
            console.log(`
🎉 South Park Facebook Profiles System Status:
✅ Characters: ${Object.keys(this.systems.characters?.characters || {}).length} loaded
✅ Moods: ${this.systems.moods ? 'Active' : 'Disabled'}
✅ Threading: ${this.systems.threading ? 'Active' : 'Basic'}
✅ Events: ${this.systems.events ? 'Active' : 'Disabled'}
📊 Performance: ${this.performanceMetrics.systemHealth}
⚡ Load Time: ${this.performanceMetrics.loadTime}ms
🎯 Ready for interactions!
            `);
        }
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Public API for external integration
    getSystemStatus() {
        return {
            ready: this.integrationReady,
            health: this.performanceMetrics.systemHealth,
            systems: Object.keys(this.systems),
            metrics: this.performanceMetrics
        };
    }

    triggerCommunityEvent(eventKey, duration) {
        if (this.systems.events) {
            return this.systems.events.activateEvent(eventKey, duration);
        }
        return false;
    }

    setCharacterMood(characterKey, moodTrigger) {
        if (this.systems.moods) {
            this.systems.moods.triggerMoodChange(characterKey, moodTrigger);
            return true;
        }
        return false;
    }

    generateCommentThread(postAuthor, postContent, participants) {
        if (this.systems.threading) {
            return this.systems.threading.generateCommentThread(
                postAuthor, 
                postContent, 
                participants
            );
        }
        return null;
    }
}

// Initialize the integrated system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏔️ Welcome to South Park Facebook Profiles!');
    window.southParkSystem = new SouthParkSystemIntegration();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SouthParkSystemIntegration;
} else {
    window.SouthParkSystemIntegration = SouthParkSystemIntegration;
}

// Mobile-specific optimizations
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
    
    // Prevent zoom on double-tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Add touch-friendly interactions
    document.addEventListener('touchstart', function(e) {
        const target = e.target.closest('.character-card, .action-btn, .filter-btn');
        if (target) {
            target.style.transform = 'scale(0.98)';
        }
    });
    
    document.addEventListener('touchend', function(e) {
        const target = e.target.closest('.character-card, .action-btn, .filter-btn');
        if (target) {
            setTimeout(() => {
                target.style.transform = '';
            }, 100);
        }
    });
}

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
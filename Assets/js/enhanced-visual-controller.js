/**
 * South Park Facebook Profiles - Enhanced Visual Effects Controller
 * Manages dynamic visual effects, particle systems, and interactive animations
 */

class EnhancedVisualController {
    constructor() {
        this.isAnimationEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.currentTheme = 'default';
        this.performanceMode = false;
        this.particles = [];
        this.effectsQueue = [];
        this.characterMoodStates = new Map();
        
        this.initializeController();
        this.setupEventListeners();
        this.loadUserPreferences();
    }

    initializeController() {
        // Add enhanced effects CSS
        this.loadEnhancedCSS();
        
        // Initialize particle system
        this.initializeParticleSystem();
        
        // Setup character mood tracking
        this.initializeCharacterMoods();
        
        // Create theme switcher
        this.createThemeSwitcher();
        
        // Initialize visual effect triggers
        this.initializeEffectTriggers();
        
        console.log('Enhanced Visual Controller initialized');
    }

    loadEnhancedCSS() {
        const cssPath = 'Assets/css/enhanced-visual-effects.css';
        if (!document.querySelector(`link[href="${cssPath}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssPath;
            document.head.appendChild(link);
        }
    }

    setupEventListeners() {
        // Character card hover effects
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.character-card')) {
                this.handleCharacterCardHover(e.target.closest('.character-card'));
            }
        });

        // Performance monitoring
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Reduced motion preference changes
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            this.isAnimationEnabled = !e.matches;
            this.updateAnimationState();
        });

        // Click effects
        document.addEventListener('click', (e) => {
            if (e.target.closest('.enhanced-button, .character-card, .filter-btn')) {
                this.triggerClickEffect(e.target.closest('.enhanced-button, .character-card, .filter-btn'), e);
            }
        });
    }

    handleCharacterCardHover(card) {
        if (!this.isAnimationEnabled) return;

        const characterName = this.getCharacterName(card);
        const characterKey = this.getCharacterKey(characterName);
        
        // Apply character-specific hover effects
        this.applyCharacterHoverEffect(card, characterKey);
        
        // Trigger particle effect
        this.createHoverParticles(card, characterKey);
        
        // Update mood visualization
        this.updateCharacterMoodDisplay(card, characterKey);
    }

    getCharacterName(card) {
        const nameElement = card.querySelector('.character-name');
        return nameElement ? nameElement.textContent : '';
    }

    getCharacterKey(characterName) {
        const keyMap = {
            'Eric Cartman': 'cartman',
            'Kyle Broflovski': 'kyle',
            'Stan Marsh': 'stan',
            'Kenny McCormick': 'kenny',
            'Tweek Tweak': 'tweek',
            'Craig Tucker': 'craig',
            'Randy Marsh': 'randy',
            'Butters Stotch': 'butters',
            'Jimmy Valmer': 'jimmy',
            'Timmy Burch': 'timmy'
        };
        return keyMap[characterName] || 'default';
    }

    applyCharacterHoverEffect(card, characterKey) {
        // Remove existing effect classes
        card.classList.remove(
            'cartman-business-mode', 'cartman-evil-mode',
            'kyle-justice-mode', 'tweek-panic-mode',
            'enhance-on-hover'
        );

        // Apply character-specific effects
        switch (characterKey) {
            case 'cartman':
                if (Math.random() > 0.5) {
                    card.classList.add('cartman-business-mode');
                } else {
                    card.classList.add('cartman-evil-mode');
                }
                break;
            
            case 'kyle':
                card.classList.add('kyle-justice-mode');
                break;
            
            case 'tweek':
                card.classList.add('tweek-panic-mode');
                break;
            
            default:
                card.classList.add('enhance-on-hover');
        }

        // Auto-remove after animation
        setTimeout(() => {
            card.classList.remove(
                'cartman-business-mode', 'cartman-evil-mode',
                'kyle-justice-mode', 'tweek-panic-mode'
            );
        }, 2500);
    }

    createHoverParticles(card, characterKey) {
        if (!this.isAnimationEnabled || this.performanceMode) return;

        const rect = card.getBoundingClientRect();
        const particleCount = Math.floor(Math.random() * 3) + 2;

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createParticle(
                    rect.left + rect.width * Math.random(),
                    rect.top + rect.height * Math.random(),
                    characterKey
                );
            }, i * 200);
        }
    }

    createParticle(x, y, characterKey) {
        const particle = document.createElement('div');
        particle.className = 'emoji-particle';
        
        // Character-specific emoji
        const emojiMap = {
            'cartman': ['💰', '🍔', '😈', '👑'],
            'kyle': ['📚', '✊', '🎓', '⚖️'],
            'stan': ['🎸', '😐', '🎵', '👥'],
            'kenny': ['👻', '💀', '🧡', '🔥'],
            'tweek': ['☕', '😰', '⚡', '💫'],
            'craig': ['🖕', '😑', '💙', '🐹'],
            'randy': ['🍷', '🌿', '🎭', '📈'],
            'butters': ['🌈', '😊', '⭐', '🌸'],
            'jimmy': ['🎤', '😂', '🎭', '👏'],
            'timmy': ['🎭', '👍', '⚡', '🌟']
        };

        const emojis = emojiMap[characterKey] || ['✨', '⭐', '💫', '🌟'];
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.zIndex = '9999';
        particle.style.pointerEvents = 'none';
        particle.style.fontSize = (Math.random() * 8 + 12) + 'px';
        
        document.body.appendChild(particle);
        
        // Animate and remove
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4000);
    }

    triggerClickEffect(element, event) {
        if (!this.isAnimationEnabled) return;

        // Create ripple effect
        this.createRippleEffect(element, event);
        
        // Add click feedback class
        element.classList.add('click-feedback');
        setTimeout(() => {
            element.classList.remove('click-feedback');
        }, 200);
    }

    createRippleEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    initializeCharacterMoods() {
        // Set initial mood states
        this.characterMoodStates.set('cartman', { 
            mood: 'scheming', 
            intensity: 0.8, 
            lastUpdate: Date.now() 
        });
        this.characterMoodStates.set('kyle', { 
            mood: 'determined', 
            intensity: 0.7, 
            lastUpdate: Date.now() 
        });
        this.characterMoodStates.set('tweek', { 
            mood: 'anxious', 
            intensity: 0.9, 
            lastUpdate: Date.now() 
        });
    }

    updateCharacterMoodDisplay(card, characterKey) {
        const moodState = this.characterMoodStates.get(characterKey);
        if (!moodState) return;

        // Create or update mood indicator
        let moodIndicator = card.querySelector('.mood-indicator');
        if (!moodIndicator) {
            moodIndicator = document.createElement('div');
            moodIndicator.className = 'mood-indicator';
            moodIndicator.innerHTML = `
                <div class="mood-bar">
                    <div class="mood-fill"></div>
                </div>
                <span class="mood-label">${moodState.mood}</span>
            `;
            
            const characterInfo = card.querySelector('.character-info');
            if (characterInfo) {
                characterInfo.appendChild(moodIndicator);
            }
        }

        // Update mood visualization
        const moodFill = moodIndicator.querySelector('.mood-fill');
        const moodLabel = moodIndicator.querySelector('.mood-label');
        
        if (moodFill) {
            moodFill.style.width = (moodState.intensity * 100) + '%';
            moodFill.className = `mood-fill mood-${moodState.mood}`;
        }
        
        if (moodLabel) {
            moodLabel.textContent = moodState.mood;
        }
    }

    createThemeSwitcher() {
        const themeSwitcher = document.createElement('div');
        themeSwitcher.className = 'theme-switcher';
        themeSwitcher.innerHTML = `
            <div class="theme-options">
                <button class="theme-btn enhanced-button" data-theme="default">🌟 Default</button>
                <button class="theme-btn enhanced-button" data-theme="dark">🌙 Dark</button>
                <button class="theme-btn enhanced-button" data-theme="south-park">🏔️ South Park</button>
                <button class="theme-btn enhanced-button" data-theme="high-contrast">⚡ High Contrast</button>
            </div>
            <div class="performance-controls">
                <label class="performance-toggle">
                    <input type="checkbox" id="performance-mode"> 
                    <span>⚡ Performance Mode</span>
                </label>
                <label class="animation-toggle">
                    <input type="checkbox" id="animation-enabled" checked> 
                    <span>✨ Animations</span>
                </label>
            </div>
        `;

        // Add styles for theme switcher
        const style = document.createElement('style');
        style.textContent = `
            .theme-switcher {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                padding: 20px;
                border-radius: 15px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                max-width: 250px;
            }
            
            .theme-options {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                margin-bottom: 15px;
            }
            
            .theme-btn {
                padding: 8px 12px;
                border: none;
                border-radius: 8px;
                background: linear-gradient(45deg, #667eea, #764ba2);
                color: white;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .theme-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            
            .theme-btn.active {
                background: linear-gradient(45deg, #f093fb, #f5576c);
            }
            
            .performance-controls {
                border-top: 1px solid rgba(0, 0, 0, 0.1);
                padding-top: 15px;
            }
            
            .performance-toggle, .animation-toggle {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 8px;
                font-size: 14px;
                cursor: pointer;
            }
            
            .performance-toggle input, .animation-toggle input {
                margin: 0;
            }
        `;
        document.head.appendChild(style);

        // Add event listeners
        themeSwitcher.addEventListener('click', (e) => {
            if (e.target.classList.contains('theme-btn')) {
                const theme = e.target.dataset.theme;
                this.switchTheme(theme);
                
                // Update active state
                themeSwitcher.querySelectorAll('.theme-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });

        // Performance mode toggle
        const performanceToggle = themeSwitcher.querySelector('#performance-mode');
        performanceToggle.addEventListener('change', (e) => {
            this.performanceMode = e.target.checked;
            document.body.classList.toggle('performance-mode', this.performanceMode);
        });

        // Animation toggle
        const animationToggle = themeSwitcher.querySelector('#animation-enabled');
        animationToggle.addEventListener('change', (e) => {
            this.isAnimationEnabled = e.target.checked;
            this.updateAnimationState();
        });

        document.body.appendChild(themeSwitcher);
    }

    switchTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        // Save preference
        localStorage.setItem('sp-theme', theme);
        
        // Apply theme-specific effects
        this.applyThemeEffects(theme);
    }

    applyThemeEffects(theme) {
        switch (theme) {
            case 'dark':
                document.body.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
                break;
            
            case 'south-park':
                document.body.style.background = 'linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #FFB6C1 100%)';
                this.createMountainBackground();
                break;
            
            case 'high-contrast':
                document.body.style.background = '#000000';
                break;
            
            default:
                document.body.style.background = 'linear-gradient(135deg, #f0f2f5 0%, #e4e6ea 100%)';
        }
    }

    createMountainBackground() {
        if (document.querySelector('.mountain-background')) return;

        const mountains = document.createElement('div');
        mountains.className = 'mountain-background';
        mountains.innerHTML = `
            <div class="mountain mountain-1">🏔️</div>
            <div class="mountain mountain-2">🏔️</div>
            <div class="mountain mountain-3">🏔️</div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .mountain-background {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
            }
            
            .mountain {
                position: absolute;
                font-size: 60px;
                opacity: 0.3;
                animation: float-mountain 20s ease-in-out infinite;
            }
            
            .mountain-1 { top: 10%; left: 10%; animation-delay: 0s; }
            .mountain-2 { top: 15%; right: 20%; animation-delay: 7s; }
            .mountain-3 { top: 8%; left: 70%; animation-delay: 14s; }
            
            @keyframes float-mountain {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(mountains);
    }

    initializeEffectTriggers() {
        // Auto-trigger effects for demonstration
        setInterval(() => {
            if (!this.isAnimationEnabled || this.performanceMode) return;
            
            const cards = document.querySelectorAll('.character-card');
            if (cards.length === 0) return;
            
            const randomCard = cards[Math.floor(Math.random() * cards.length)];
            const characterName = this.getCharacterName(randomCard);
            const characterKey = this.getCharacterKey(characterName);
            
            // Randomly update character mood
            this.updateCharacterMood(characterKey);
            
        }, 30000); // Every 30 seconds
    }

    updateCharacterMood(characterKey) {
        const moodOptions = {
            'cartman': ['scheming', 'greedy', 'manipulative', 'satisfied'],
            'kyle': ['determined', 'passionate', 'frustrated', 'righteous'],
            'tweek': ['anxious', 'panicked', 'caffeinated', 'overwhelmed'],
            'craig': ['apathetic', 'annoyed', 'bored', 'protective'],
            'randy': ['obsessive', 'dramatic', 'enthusiastic', 'dejected']
        };

        const moods = moodOptions[characterKey] || ['neutral'];
        const newMood = moods[Math.floor(Math.random() * moods.length)];
        const intensity = Math.random() * 0.4 + 0.6; // 0.6 to 1.0

        this.characterMoodStates.set(characterKey, {
            mood: newMood,
            intensity: intensity,
            lastUpdate: Date.now()
        });

        // Update any visible mood displays
        const cards = document.querySelectorAll('.character-card');
        cards.forEach(card => {
            if (this.getCharacterKey(this.getCharacterName(card)) === characterKey) {
                this.updateCharacterMoodDisplay(card, characterKey);
            }
        });
    }

    updateAnimationState() {
        document.body.classList.toggle('no-animations', !this.isAnimationEnabled);
        
        if (!this.isAnimationEnabled) {
            // Clear existing particles
            document.querySelectorAll('.emoji-particle').forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
        }
    }

    pauseAnimations() {
        document.body.classList.add('paused-animations');
    }

    resumeAnimations() {
        document.body.classList.remove('paused-animations');
    }

    loadUserPreferences() {
        // Load saved theme
        const savedTheme = localStorage.getItem('sp-theme');
        if (savedTheme) {
            this.switchTheme(savedTheme);
            
            // Update theme switcher UI
            const themeBtn = document.querySelector(`[data-theme="${savedTheme}"]`);
            if (themeBtn) {
                document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
                themeBtn.classList.add('active');
            }
        }

        // Load performance preferences
        const performanceMode = localStorage.getItem('sp-performance-mode') === 'true';
        if (performanceMode) {
            this.performanceMode = true;
            document.body.classList.add('performance-mode');
            const toggle = document.querySelector('#performance-mode');
            if (toggle) toggle.checked = true;
        }
    }

    // Public API for triggering specific effects
    triggerCharacterEffect(characterKey, effectType = 'default') {
        const cards = document.querySelectorAll('.character-card');
        cards.forEach(card => {
            if (this.getCharacterKey(this.getCharacterName(card)) === characterKey) {
                this.applyCharacterHoverEffect(card, characterKey);
                this.createHoverParticles(card, characterKey);
            }
        });
    }

    createCustomParticleEffect(x, y, particleType, count = 5) {
        if (!this.isAnimationEnabled || this.performanceMode) return;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createParticle(x + (Math.random() - 0.5) * 50, y + (Math.random() - 0.5) * 50, particleType);
            }, i * 100);
        }
    }
}

// CSS injection for additional effects
const additionalCSS = `
    .no-animations * {
        animation: none !important;
        transition: none !important;
    }
    
    .paused-animations * {
        animation-play-state: paused !important;
    }
    
    .mood-indicator {
        margin-top: 10px;
        padding: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        font-size: 12px;
    }
    
    .mood-bar {
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        overflow: hidden;
        margin-bottom: 4px;
    }
    
    .mood-fill {
        height: 100%;
        transition: all 0.5s ease;
        border-radius: 2px;
    }
    
    .mood-scheming { background: linear-gradient(90deg, #F44336, #FF5722); }
    .mood-determined { background: linear-gradient(90deg, #4CAF50, #8BC34A); }
    .mood-anxious { background: linear-gradient(90deg, #FF9800, #FFC107); }
    .mood-apathetic { background: linear-gradient(90deg, #9E9E9E, #607D8B); }
    .mood-dramatic { background: linear-gradient(90deg, #9C27B0, #E91E63); }
    
    .mood-label {
        color: rgba(255, 255, 255, 0.9);
        font-weight: 500;
        text-transform: capitalize;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Initialize the enhanced visual controller
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedVisualController = new EnhancedVisualController();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedVisualController;
}
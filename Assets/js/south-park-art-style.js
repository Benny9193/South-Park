class SouthParkArtStyleIntegration {
    constructor() {
        this.artElements = new Map();
        this.characterAnimations = new Map();
        this.backgroundEffects = [];
        this.widget = null;
        this.isVisible = false;
        this.currentTheme = 'default';
        this.animationLevel = 'medium';

        this.initializeArtStyles();
        this.createWidget();
        this.applyDefaultEffects();
    }

    initializeArtStyles() {
        // Character-specific art styles
        this.artElements.set('characters', {
            'butters': {
                colors: ['#FFE135', '#87CEEB', '#32CD32'],
                animations: ['bounce', 'wiggle', 'sparkle'],
                effects: ['innocent-glow', 'hamburger-particles'],
                voice: 'Oh hamburgers!'
            },
            'randy': {
                colors: ['#8B4513', '#FF6347', '#4682B4'],
                animations: ['dramatic-zoom', 'obsessive-shake', 'discovery-flash'],
                effects: ['geological-particles', 'music-notes'],
                voice: 'Sharon! Sharon!'
            },
            'cartman': {
                colors: ['#FF69B4', '#87CEEB', '#FFD700'],
                animations: ['evil-scheme', 'authority-pose', 'manipulation-swirl'],
                effects: ['chaos-aura', 'scheming-shadows'],
                voice: 'Respect mah authoritah!'
            },
            'kyle': {
                colors: ['#32CD32', '#FF6347', '#4169E1'],
                animations: ['righteous-point', 'frustrated-gesture', 'moral-stance'],
                effects: ['justice-glow', 'speech-bubbles'],
                voice: 'That\'s not fair!'
            },
            'stan': {
                colors: ['#4169E1', '#8B4513', '#32CD32'],
                animations: ['eye-roll', 'voice-of-reason', 'cynical-shrug'],
                effects: ['reality-check-aura', 'sarcasm-particles'],
                voice: 'Oh my god, they killed Kenny!'
            },
            'kenny': {
                colors: ['#FF8C00', '#8B4513', '#32CD32'],
                animations: ['muffled-speak', 'death-resurrection', 'poverty-struggle'],
                effects: ['mystery-hood', 'death-particles'],
                voice: 'Mmph mmph mmph!'
            }
        });

        // Art style themes
        this.artElements.set('themes', {
            'classic-south-park': {
                name: 'Classic South Park',
                colors: {
                    primary: '#4A90E2',
                    secondary: '#F39C12',
                    accent: '#E74C3C',
                    background: '#ECF0F1'
                },
                fonts: {
                    main: '"Comic Sans MS", cursive',
                    secondary: 'Arial, sans-serif'
                },
                effects: 'construction-paper'
            },
            'winter-wonderland': {
                name: 'South Park Winter',
                colors: {
                    primary: '#3498DB',
                    secondary: '#E8F8F5',
                    accent: '#E74C3C',
                    background: '#F4F6F7'
                },
                effects: 'snow-particles'
            },
            'halloween-spooky': {
                name: 'Halloween South Park',
                colors: {
                    primary: '#8E44AD',
                    secondary: '#E67E22',
                    accent: '#C0392B',
                    background: '#2C3E50'
                },
                effects: 'spooky-shadows'
            },
            'christmas-cheer': {
                name: 'Christmas South Park',
                colors: {
                    primary: '#27AE60',
                    secondary: '#E74C3C',
                    accent: '#F1C40F',
                    background: '#ECF0F1'
                },
                effects: 'christmas-lights'
            }
        });

        // Animation presets
        this.characterAnimations.set('presets', {
            'subtle': {
                level: 'low',
                effects: ['gentle-hover', 'soft-glow'],
                frequency: 5000
            },
            'moderate': {
                level: 'medium',
                effects: ['bounce', 'wiggle', 'pulse'],
                frequency: 3000
            },
            'energetic': {
                level: 'high',
                effects: ['dramatic-zoom', 'sparkle', 'shake', 'spin'],
                frequency: 1500
            },
            'chaos': {
                level: 'extreme',
                effects: ['all-effects', 'rapid-transitions', 'random-colors'],
                frequency: 500
            }
        });

        // Background effects
        this.backgroundEffects = [
            {
                name: 'snow-particles',
                description: 'Gentle snowfall across the page',
                season: 'winter',
                intensity: 'medium'
            },
            {
                name: 'construction-paper',
                description: 'Classic South Park construction paper texture',
                season: 'all',
                intensity: 'subtle'
            },
            {
                name: 'floating-hamburgers',
                description: 'Butters\' hamburgers floating in the background',
                character: 'butters',
                intensity: 'low'
            },
            {
                name: 'musical-notes',
                description: 'Randy\'s musical ambitions visualized',
                character: 'randy',
                intensity: 'medium'
            }
        ];
    }

    createWidget() {
        this.widget = document.createElement('div');
        this.widget.id = 'art-style-widget';
        this.widget.innerHTML = `
            <div class="art-header" onclick="window.artSystem.toggleWidget()">
                <span class="art-icon">🎨</span>
                <span class="art-title">South Park Art Style</span>
                <span class="current-theme">${this.currentTheme}</span>
                <span class="toggle-arrow">▼</span>
            </div>
            <div class="art-content" style="display: none;">
                <div class="art-tabs">
                    <button class="art-tab active" onclick="window.artSystem.showTab('themes')">🎭 Themes</button>
                    <button class="art-tab" onclick="window.artSystem.showTab('animations')">✨ Animations</button>
                    <button class="art-tab" onclick="window.artSystem.showTab('effects')">🌟 Effects</button>
                    <button class="art-tab" onclick="window.artSystem.showTab('character')">👤 Character</button>
                </div>
                <div class="art-content-area">
                    <div id="themes-tab" class="art-tab-content active">
                        <div class="theme-selector"></div>
                    </div>
                    <div id="animations-tab" class="art-tab-content">
                        <div class="animation-controls"></div>
                    </div>
                    <div id="effects-tab" class="art-tab-content">
                        <div class="effects-panel"></div>
                    </div>
                    <div id="character-tab" class="art-tab-content">
                        <div class="character-styles"></div>
                    </div>
                </div>
            </div>
        `;

        // Add comprehensive styles
        const styles = `
            <style>
            #art-style-widget {
                position: fixed;
                top: 300px;
                right: 20px;
                width: 320px;
                background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
                border: 3px solid #fff;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.4);
                font-family: 'Comic Sans MS', cursive;
                z-index: 1000;
                max-height: 85vh;
                overflow: hidden;
                transform: rotate(-1deg);
                animation: float 6s ease-in-out infinite;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(-1deg); }
                50% { transform: translateY(-10px) rotate(1deg); }
            }

            .art-header {
                background: linear-gradient(90deg, #8e44ad 0%, #3498db 50%, #e74c3c 100%);
                color: white;
                padding: 15px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: bold;
                user-select: none;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }

            .art-icon {
                font-size: 20px;
                animation: spin 3s linear infinite;
            }

            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            .art-title {
                flex: 1;
                font-size: 14px;
                font-weight: bold;
            }

            .current-theme {
                background: rgba(255,255,255,0.2);
                padding: 3px 8px;
                border-radius: 10px;
                font-size: 10px;
                border: 1px solid rgba(255,255,255,0.3);
            }

            .toggle-arrow {
                font-size: 14px;
                transition: transform 0.3s;
            }

            .art-content.visible .toggle-arrow {
                transform: rotate(180deg);
            }

            .art-content {
                background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
                max-height: 450px;
                overflow-y: auto;
                border: 2px solid #e9ecef;
            }

            .art-tabs {
                display: flex;
                background: linear-gradient(90deg, #fd79a8 0%, #fdcb6e 50%, #6c5ce7 100%);
                border-bottom: 3px solid #2d3436;
            }

            .art-tab {
                flex: 1;
                padding: 12px 8px;
                border: none;
                background: none;
                cursor: pointer;
                font-size: 10px;
                font-weight: bold;
                color: white;
                transition: all 0.3s;
                font-family: 'Comic Sans MS', cursive;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            }

            .art-tab.active {
                background: rgba(255,255,255,0.3);
                color: #2d3436;
                border-radius: 8px 8px 0 0;
                text-shadow: none;
                transform: scale(1.05);
            }

            .art-tab:hover {
                background: rgba(255,255,255,0.2);
                transform: scale(1.02);
            }

            .art-tab-content {
                display: none;
                padding: 15px;
            }

            .art-tab-content.active {
                display: block;
            }

            .theme-card {
                background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
                border: 2px solid #fff;
                border-radius: 12px;
                padding: 12px;
                margin-bottom: 12px;
                cursor: pointer;
                transition: all 0.3s;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }

            .theme-card:hover {
                transform: translateY(-3px) rotate(1deg);
                box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            }

            .theme-card.active {
                border-color: #f1c40f;
                transform: scale(1.02);
                box-shadow: 0 0 20px rgba(241, 196, 15, 0.5);
            }

            .theme-name {
                font-weight: bold;
                font-size: 14px;
                color: white;
                margin-bottom: 5px;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            }

            .theme-preview {
                display: flex;
                gap: 5px;
                margin-bottom: 8px;
            }

            .color-dot {
                width: 15px;
                height: 15px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }

            .theme-description {
                font-size: 11px;
                color: #ecf0f1;
                font-style: italic;
            }

            .animation-control {
                background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
                border: 2px solid #fff;
                border-radius: 10px;
                padding: 12px;
                margin-bottom: 10px;
                color: white;
            }

            .control-title {
                font-weight: bold;
                font-size: 13px;
                margin-bottom: 8px;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            }

            .animation-slider {
                width: 100%;
                height: 6px;
                border-radius: 3px;
                background: rgba(255,255,255,0.3);
                outline: none;
                margin: 8px 0;
            }

            .animation-buttons {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
            }

            .anim-button {
                background: rgba(255,255,255,0.2);
                color: white;
                border: 1px solid rgba(255,255,255,0.3);
                padding: 6px 12px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 10px;
                font-family: 'Comic Sans MS', cursive;
                transition: all 0.3s;
            }

            .anim-button.active {
                background: rgba(255,255,255,0.8);
                color: #e84393;
                transform: scale(1.1);
            }

            .anim-button:hover {
                background: rgba(255,255,255,0.4);
                transform: scale(1.05);
            }

            .effect-toggle {
                background: linear-gradient(135deg, #00cec9 0%, #00b894 100%);
                border: 2px solid #fff;
                border-radius: 8px;
                padding: 10px;
                margin-bottom: 8px;
                cursor: pointer;
                transition: all 0.3s;
                color: white;
            }

            .effect-toggle.active {
                border-color: #fdcb6e;
                box-shadow: 0 0 15px rgba(253, 203, 110, 0.5);
                transform: scale(1.02);
            }

            .effect-toggle:hover {
                transform: translateX(5px);
            }

            .effect-name {
                font-weight: bold;
                font-size: 12px;
                margin-bottom: 3px;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            }

            .effect-description {
                font-size: 10px;
                opacity: 0.9;
                font-style: italic;
            }

            .character-style-card {
                background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
                border: 2px solid #fff;
                border-radius: 10px;
                padding: 12px;
                margin-bottom: 10px;
                color: white;
                cursor: pointer;
                transition: all 0.3s;
            }

            .character-style-card:hover {
                transform: translateY(-2px) rotate(-1deg);
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            }

            .character-name {
                font-weight: bold;
                font-size: 14px;
                margin-bottom: 5px;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            }

            .character-colors {
                display: flex;
                gap: 4px;
                margin-bottom: 8px;
            }

            .character-colors .color-dot {
                width: 12px;
                height: 12px;
            }

            .character-voice {
                background: rgba(255,255,255,0.2);
                border-radius: 15px;
                padding: 4px 8px;
                font-size: 10px;
                font-style: italic;
                margin-top: 5px;
                text-align: center;
            }

            /* South Park Art Effects */
            .south-park-construction-paper {
                background: linear-gradient(45deg, #f8f9fa 25%, transparent 25%),
                           linear-gradient(-45deg, #f8f9fa 25%, transparent 25%),
                           linear-gradient(45deg, transparent 75%, #f8f9fa 75%),
                           linear-gradient(-45deg, transparent 75%, #f8f9fa 75%);
                background-size: 20px 20px;
                background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
            }

            .south-park-snow-effect {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 999;
            }

            .snowflake {
                position: absolute;
                color: #fff;
                font-size: 1em;
                animation: fall linear infinite;
            }

            @keyframes fall {
                0% { transform: translateY(-100vh); }
                100% { transform: translateY(100vh); }
            }

            .south-park-glow {
                animation: southParkGlow 2s ease-in-out infinite alternate;
            }

            @keyframes southParkGlow {
                from { box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
                to { box-shadow: 0 0 30px rgba(255, 255, 255, 0.8); }
            }

            .south-park-bounce {
                animation: southParkBounce 1s infinite;
            }

            @keyframes southParkBounce {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }

            .south-park-wiggle {
                animation: southParkWiggle 0.5s infinite;
            }

            @keyframes southParkWiggle {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(1deg); }
                75% { transform: rotate(-1deg); }
            }

            @media (max-width: 768px) {
                #art-style-widget {
                    width: calc(100% - 40px);
                    right: 20px;
                    left: 20px;
                    transform: rotate(0deg);
                }
            }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.appendChild(this.widget);

        this.updateContent();
        window.artSystem = this;
    }

    toggleWidget() {
        const content = this.widget.querySelector('.art-content');
        const arrow = this.widget.querySelector('.toggle-arrow');

        if (this.isVisible) {
            content.style.display = 'none';
            arrow.textContent = '▼';
            this.isVisible = false;
        } else {
            content.style.display = 'block';
            arrow.textContent = '▲';
            this.isVisible = true;
        }
    }

    showTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.art-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.art-tab-content').forEach(content => content.classList.remove('active'));

        // Show selected tab
        document.querySelector(`[onclick="window.artSystem.showTab('${tabName}')"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.updateContent();
    }

    updateContent() {
        this.updateThemeSelector();
        this.updateAnimationControls();
        this.updateEffectsPanel();
        this.updateCharacterStyles();
    }

    updateThemeSelector() {
        const container = this.widget.querySelector('.theme-selector');
        if (!container) return;

        const themes = this.artElements.get('themes');

        container.innerHTML = Object.entries(themes).map(([key, theme]) => `
            <div class="theme-card ${key === this.currentTheme ? 'active' : ''}" onclick="window.artSystem.applyTheme('${key}')">
                <div class="theme-name">${theme.name}</div>
                <div class="theme-preview">
                    ${theme.colors ? Object.values(theme.colors).map(color =>
                        `<div class="color-dot" style="background-color: ${color}"></div>`
                    ).join('') : ''}
                </div>
                <div class="theme-description">
                    Click to apply this ${theme.name.toLowerCase()} theme to all profiles
                </div>
            </div>
        `).join('');
    }

    updateAnimationControls() {
        const container = this.widget.querySelector('.animation-controls');
        if (!container) return;

        const presets = this.characterAnimations.get('presets');

        container.innerHTML = `
            <div class="animation-control">
                <div class="control-title">Animation Intensity</div>
                <div class="animation-buttons">
                    ${Object.entries(presets).map(([key, preset]) => `
                        <button class="anim-button ${key === this.animationLevel ? 'active' : ''}"
                                onclick="window.artSystem.setAnimationLevel('${key}')">
                            ${key.toUpperCase()}
                        </button>
                    `).join('')}
                </div>
                <div style="font-size: 10px; margin-top: 8px; opacity: 0.8;">
                    Current: ${presets[this.animationLevel].level} intensity,
                    updates every ${presets[this.animationLevel].frequency / 1000}s
                </div>
            </div>

            <div class="animation-control">
                <div class="control-title">Special Effects</div>
                <div class="animation-buttons">
                    <button class="anim-button" onclick="window.artSystem.triggerSpecialEffect('rainbow')">
                        🌈 Rainbow
                    </button>
                    <button class="anim-button" onclick="window.artSystem.triggerSpecialEffect('chaos')">
                        💥 Chaos Mode
                    </button>
                    <button class="anim-button" onclick="window.artSystem.triggerSpecialEffect('zen')">
                        ☮️ Zen Mode
                    </button>
                </div>
            </div>
        `;
    }

    updateEffectsPanel() {
        const container = this.widget.querySelector('.effects-panel');
        if (!container) return;

        container.innerHTML = this.backgroundEffects.map(effect => `
            <div class="effect-toggle" onclick="window.artSystem.toggleEffect('${effect.name}')">
                <div class="effect-name">${effect.name.replace('-', ' ').toUpperCase()}</div>
                <div class="effect-description">${effect.description}</div>
            </div>
        `).join('');
    }

    updateCharacterStyles() {
        const container = this.widget.querySelector('.character-styles');
        if (!container) return;

        const characters = this.artElements.get('characters');

        container.innerHTML = Object.entries(characters).map(([key, character]) => `
            <div class="character-style-card" onclick="window.artSystem.applyCharacterStyle('${key}')">
                <div class="character-name">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
                <div class="character-colors">
                    ${character.colors.map(color => `<div class="color-dot" style="background-color: ${color}"></div>`).join('')}
                </div>
                <div style="font-size: 10px; opacity: 0.9;">
                    Effects: ${character.effects.join(', ')}
                </div>
                <div class="character-voice">"${character.voice}"</div>
            </div>
        `).join('');
    }

    applyTheme(themeKey) {
        this.currentTheme = themeKey;
        const theme = this.artElements.get('themes')[themeKey];

        // Update current theme display
        this.widget.querySelector('.current-theme').textContent = themeKey;

        // Apply theme colors to page
        if (theme.colors) {
            document.documentElement.style.setProperty('--sp-primary', theme.colors.primary);
            document.documentElement.style.setProperty('--sp-secondary', theme.colors.secondary);
            document.documentElement.style.setProperty('--sp-accent', theme.colors.accent);
            document.documentElement.style.setProperty('--sp-background', theme.colors.background);
        }

        // Apply special effects
        this.removeAllThemeEffects();
        if (theme.effects) {
            this.applyThemeEffect(theme.effects);
        }

        // Update theme selector
        this.updateThemeSelector();

        // Show confirmation
        this.showNotification(`Applied ${theme.name} theme!`, 'success');
    }

    setAnimationLevel(level) {
        this.animationLevel = level;
        const preset = this.characterAnimations.get('presets')[level];

        // Clear existing animation intervals
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }

        // Start new animation cycle
        this.animationInterval = setInterval(() => {
            this.triggerRandomAnimation(preset.effects);
        }, preset.frequency);

        this.updateAnimationControls();
        this.showNotification(`Animation set to ${level.toUpperCase()} intensity`, 'info');
    }

    triggerSpecialEffect(effectType) {
        switch (effectType) {
            case 'rainbow':
                this.createRainbowEffect();
                break;
            case 'chaos':
                this.createChaosEffect();
                break;
            case 'zen':
                this.createZenEffect();
                break;
        }
    }

    toggleEffect(effectName) {
        const effectElement = document.getElementById(`sp-effect-${effectName}`);

        if (effectElement) {
            effectElement.remove();
        } else {
            this.createEffect(effectName);
        }
    }

    applyCharacterStyle(characterKey) {
        const character = this.artElements.get('characters')[characterKey];

        // Apply character-specific animations
        this.triggerCharacterAnimations(character.animations);

        // Apply character colors as theme
        if (character.colors.length >= 3) {
            document.documentElement.style.setProperty('--sp-primary', character.colors[0]);
            document.documentElement.style.setProperty('--sp-secondary', character.colors[1]);
            document.documentElement.style.setProperty('--sp-accent', character.colors[2]);
        }

        // Play character voice
        this.showNotification(`"${character.voice}"`, 'character');

        // Apply character-specific effects
        character.effects.forEach(effect => {
            this.createEffect(effect);
        });
    }

    applyDefaultEffects() {
        // Apply subtle South Park construction paper effect
        document.body.classList.add('south-park-construction-paper');

        // Start gentle background animations
        this.setAnimationLevel('moderate');
    }

    createEffect(effectName) {
        switch (effectName) {
            case 'snow-particles':
                this.createSnowEffect();
                break;
            case 'floating-hamburgers':
                this.createHamburgerEffect();
                break;
            case 'musical-notes':
                this.createMusicEffect();
                break;
            case 'innocent-glow':
                this.applyGlowEffect();
                break;
            case 'chaos-aura':
                this.createChaosAura();
                break;
        }
    }

    createSnowEffect() {
        if (document.getElementById('sp-effect-snow-particles')) return;

        const snowContainer = document.createElement('div');
        snowContainer.id = 'sp-effect-snow-particles';
        snowContainer.className = 'south-park-snow-effect';

        for (let i = 0; i < 50; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = '❄';
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
            snowflake.style.animationDelay = Math.random() * 2 + 's';
            snowContainer.appendChild(snowflake);
        }

        document.body.appendChild(snowContainer);

        setTimeout(() => {
            if (snowContainer.parentNode) {
                snowContainer.remove();
            }
        }, 10000);
    }

    createRainbowEffect() {
        const elements = document.querySelectorAll('.widget, .character-profile, h1, h2');
        elements.forEach((element, index) => {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
            element.style.transition = 'all 0.3s ease';
            element.style.color = colors[index % colors.length];
            element.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
        });

        setTimeout(() => {
            elements.forEach(element => {
                element.style.color = '';
                element.style.textShadow = '';
            });
        }, 5000);
    }

    createChaosEffect() {
        const elements = document.querySelectorAll('*');
        const chaosEffects = ['bounce', 'wiggle', 'glow'];

        elements.forEach(element => {
            if (element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE') {
                const randomEffect = chaosEffects[Math.floor(Math.random() * chaosEffects.length)];
                element.classList.add(`south-park-${randomEffect}`);
            }
        });

        setTimeout(() => {
            elements.forEach(element => {
                chaosEffects.forEach(effect => {
                    element.classList.remove(`south-park-${effect}`);
                });
            });
        }, 3000);
    }

    createZenEffect() {
        document.body.style.filter = 'sepia(30%) saturate(70%)';
        document.body.style.transition = 'filter 2s ease';

        const meditation = document.createElement('div');
        meditation.innerHTML = '🧘‍♂️ Zen Mode Active...';
        meditation.style.position = 'fixed';
        meditation.style.top = '50%';
        meditation.style.left = '50%';
        meditation.style.transform = 'translate(-50%, -50%)';
        meditation.style.background = 'rgba(255,255,255,0.9)';
        meditation.style.padding = '20px';
        meditation.style.borderRadius = '15px';
        meditation.style.zIndex = '10000';
        meditation.style.fontFamily = 'Comic Sans MS, cursive';
        meditation.style.fontSize = '18px';
        meditation.style.textAlign = 'center';
        document.body.appendChild(meditation);

        setTimeout(() => {
            document.body.style.filter = '';
            meditation.remove();
        }, 4000);
    }

    triggerRandomAnimation(effects) {
        const animatableElements = document.querySelectorAll('.widget, .profile-section, h1, h2, .post');
        if (animatableElements.length === 0) return;

        const randomElement = animatableElements[Math.floor(Math.random() * animatableElements.length)];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];

        randomElement.classList.add(`south-park-${randomEffect}`);
        setTimeout(() => {
            randomElement.classList.remove(`south-park-${randomEffect}`);
        }, 1000);
    }

    removeAllThemeEffects() {
        // Remove all dynamic effect elements
        const effectElements = document.querySelectorAll('[id^="sp-effect-"]');
        effectElements.forEach(element => element.remove());

        // Remove all South Park animation classes
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            element.classList.remove('south-park-bounce', 'south-park-wiggle', 'south-park-glow');
        });
    }

    applyThemeEffect(effectType) {
        setTimeout(() => {
            this.createEffect(effectType);
        }, 500);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.innerHTML = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#27ae60' : type === 'character' ? '#8e44ad' : '#3498db'};
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-family: 'Comic Sans MS', cursive;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            animation: slideIn 0.5s ease-out;
        `;

        const keyframes = `
            @keyframes slideIn {
                from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
        `;

        if (!document.querySelector('#notification-keyframes')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-keyframes';
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideIn 0.5s ease-out reverse';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
}

// Initialize South Park Art Style System
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (!window.artSystem) {
            new SouthParkArtStyleIntegration();
        }
    }, 2500);
});
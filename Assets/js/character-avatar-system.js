/**
 * South Park Facebook Profiles - Character Avatar System
 * Dynamic character avatars with expressions, moods, and context-aware changes
 */

class CharacterAvatarSystem {
    constructor() {
        this.avatars = new Map();
        this.expressions = new Map();
        this.moods = new Map();
        this.contexts = new Map();
        this.avatarElements = new Map();
        this.currentStates = new Map();
        this.initializeCharacterAvatars();
        this.initializeExpressions();
        this.initializeMoods();
        this.startMoodCycle();
    }

    initializeCharacterAvatars() {
        // Base avatar configurations for each character
        this.avatars.set('cartman', {
            name: 'Eric Cartman',
            baseColor: '#FF4444',
            secondaryColor: '#FF8888',
            shape: 'round',
            size: 'large',
            defaultExpression: 'scheming',
            hat: '👑',
            accessories: ['💰', '📊', '🏢'],
            personality: 'manipulative'
        });

        this.avatars.set('kyle', {
            name: 'Kyle Broflovski',
            baseColor: '#44AA44',
            secondaryColor: '#88DD88',
            shape: 'round',
            size: 'medium',
            defaultExpression: 'thoughtful',
            hat: '🧢',
            accessories: ['📚', '✊', '⚖️'],
            personality: 'moral'
        });

        this.avatars.set('stan', {
            name: 'Stan Marsh',
            baseColor: '#4444FF',
            secondaryColor: '#8888FF',
            shape: 'round',
            size: 'medium',
            defaultExpression: 'neutral',
            hat: '🧢',
            accessories: ['🏈', '🎸', '🤷‍♂️'],
            personality: 'normal'
        });

        this.avatars.set('kenny', {
            name: 'Kenny McCormick',
            baseColor: '#FF8800',
            secondaryColor: '#FFAA44',
            shape: 'round',
            size: 'medium',
            defaultExpression: 'muffled',
            hat: '🧡',
            accessories: ['💀', '👻', '🦸‍♂️'],
            personality: 'mysterious'
        });

        this.avatars.set('butters', {
            name: 'Butters Stotch',
            baseColor: '#FFDD44',
            secondaryColor: '#FFEE88',
            shape: 'round',
            size: 'small',
            defaultExpression: 'innocent',
            hat: '😇',
            accessories: ['🌈', '🦋', '🍔'],
            personality: 'sweet'
        });

        this.avatars.set('randy', {
            name: 'Randy Marsh',
            baseColor: '#9C27B0',
            secondaryColor: '#BA68C8',
            shape: 'oval',
            size: 'large',
            defaultExpression: 'excited',
            hat: '🎯',
            accessories: ['🌿', '🍷', '🚀'],
            personality: 'dramatic'
        });

        this.avatars.set('tweek', {
            name: 'Tweek Tweak',
            baseColor: '#FFAA00',
            secondaryColor: '#FFCC66',
            shape: 'round',
            size: 'medium',
            defaultExpression: 'anxious',
            hat: '☕',
            accessories: ['⚠️', '💥', '😰'],
            personality: 'anxious'
        });

        this.avatars.set('craig', {
            name: 'Craig Tucker',
            baseColor: '#666666',
            secondaryColor: '#999999',
            shape: 'square',
            size: 'medium',
            defaultExpression: 'apathetic',
            hat: '📱',
            accessories: ['🖕', '😑', '🤷'],
            personality: 'apathetic'
        });

        this.avatars.set('jimmy', {
            name: 'Jimmy Valmer',
            baseColor: '#FF6B35',
            secondaryColor: '#FF8A65',
            shape: 'round',
            size: 'medium',
            defaultExpression: 'confident',
            hat: '🎤',
            accessories: ['🎭', '🏆', '⭐'],
            personality: 'comedic'
        });

        this.avatars.set('timmy', {
            name: 'Timmy Burch',
            baseColor: '#2196F3',
            secondaryColor: '#64B5F6',
            shape: 'round',
            size: 'medium',
            defaultExpression: 'excited',
            hat: '🏁',
            accessories: ['🎪', '🎉', '💪'],
            personality: 'enthusiastic'
        });

        this.avatars.set('wendy', {
            name: 'Wendy Testaburger',
            baseColor: '#FF69B4',
            secondaryColor: '#FF8A9B',
            shape: 'oval',
            size: 'medium',
            defaultExpression: 'determined',
            hat: '👩‍🎓',
            accessories: ['✊', '📢', '🏛️'],
            personality: 'activist'
        });
    }

    initializeExpressions() {
        // Facial expressions for different emotions and situations
        this.expressions.set('happy', {
            eyes: '😊',
            mouth: '😄',
            eyebrows: '⬆️',
            cheeks: '😊',
            animation: 'bounce',
            duration: 1000
        });

        this.expressions.set('angry', {
            eyes: '😠',
            mouth: '😡',
            eyebrows: '⬇️',
            cheeks: '😤',
            animation: 'shake',
            duration: 800
        });

        this.expressions.set('sad', {
            eyes: '😢',
            mouth: '😞',
            eyebrows: '⬇️',
            cheeks: '💧',
            animation: 'droop',
            duration: 1500
        });

        this.expressions.set('surprised', {
            eyes: '😲',
            mouth: '😮',
            eyebrows: '⬆️',
            cheeks: '😳',
            animation: 'scale-up',
            duration: 600
        });

        this.expressions.set('scheming', {
            eyes: '😏',
            mouth: '😈',
            eyebrows: '⬇️',
            cheeks: '😏',
            animation: 'evil-grin',
            duration: 1200
        });

        this.expressions.set('thoughtful', {
            eyes: '🤔',
            mouth: '😐',
            eyebrows: '⬆️',
            cheeks: '🤔',
            animation: 'think',
            duration: 2000
        });

        this.expressions.set('neutral', {
            eyes: '😐',
            mouth: '😐',
            eyebrows: '➡️',
            cheeks: '😐',
            animation: 'none',
            duration: 1000
        });

        this.expressions.set('muffled', {
            eyes: '👀',
            mouth: '🤐',
            eyebrows: '➡️',
            cheeks: '🧡',
            animation: 'muffle',
            duration: 1000
        });

        this.expressions.set('innocent', {
            eyes: '😇',
            mouth: '😊',
            eyebrows: '⬆️',
            cheeks: '😇',
            animation: 'sparkle',
            duration: 1500
        });

        this.expressions.set('anxious', {
            eyes: '😰',
            mouth: '😨',
            eyebrows: '⬆️',
            cheeks: '💦',
            animation: 'anxiety-shake',
            duration: 2000
        });

        this.expressions.set('apathetic', {
            eyes: '😑',
            mouth: '😑',
            eyebrows: '⬇️',
            cheeks: '😑',
            animation: 'minimal',
            duration: 3000
        });

        this.expressions.set('confident', {
            eyes: '😎',
            mouth: '😄',
            eyebrows: '⬆️',
            cheeks: '😎',
            animation: 'confident-pose',
            duration: 1200
        });

        this.expressions.set('excited', {
            eyes: '🤩',
            mouth: '😃',
            eyebrows: '⬆️',
            cheeks: '🤩',
            animation: 'excitement-bounce',
            duration: 800
        });

        this.expressions.set('determined', {
            eyes: '😤',
            mouth: '😠',
            eyebrows: '⬇️',
            cheeks: '💪',
            animation: 'determined-stance',
            duration: 1000
        });
    }

    initializeMoods() {
        // Character mood states that affect expression probability
        this.moods.set('cartman', {
            current: 'scheming',
            states: {
                'scheming': { weight: 40, expressions: ['scheming', 'happy', 'confident'] },
                'angry': { weight: 30, expressions: ['angry', 'mad', 'frustrated'] },
                'victorious': { weight: 15, expressions: ['happy', 'proud', 'smug'] },
                'defeated': { weight: 10, expressions: ['angry', 'sad', 'plotting'] },
                'neutral': { weight: 5, expressions: ['neutral', 'thinking'] }
            }
        });

        this.moods.set('kyle', {
            current: 'thoughtful',
            states: {
                'thoughtful': { weight: 35, expressions: ['thoughtful', 'neutral', 'reading'] },
                'passionate': { weight: 30, expressions: ['determined', 'angry', 'speaking'] },
                'happy': { weight: 20, expressions: ['happy', 'satisfied', 'proud'] },
                'frustrated': { weight: 10, expressions: ['angry', 'annoyed', 'arguing'] },
                'studying': { weight: 5, expressions: ['focused', 'concentrated', 'reading'] }
            }
        });

        this.moods.set('stan', {
            current: 'neutral',
            states: {
                'neutral': { weight: 40, expressions: ['neutral', 'calm', 'normal'] },
                'confused': { weight: 25, expressions: ['confused', 'thinking', 'uncertain'] },
                'sick': { weight: 15, expressions: ['sick', 'queasy', 'uncomfortable'] },
                'happy': { weight: 10, expressions: ['happy', 'content', 'smiling'] },
                'concerned': { weight: 10, expressions: ['worried', 'thinking', 'serious'] }
            }
        });

        this.moods.set('kenny', {
            current: 'muffled',
            states: {
                'muffled': { weight: 50, expressions: ['muffled', 'mysterious', 'hidden'] },
                'heroic': { weight: 20, expressions: ['confident', 'brave', 'determined'] },
                'dead': { weight: 15, expressions: ['dead', 'ghost', 'floating'] },
                'happy': { weight: 10, expressions: ['happy', 'excited', 'playful'] },
                'poor': { weight: 5, expressions: ['sad', 'hungry', 'tired'] }
            }
        });

        this.moods.set('butters', {
            current: 'innocent',
            states: {
                'innocent': { weight: 45, expressions: ['innocent', 'happy', 'sweet'] },
                'grounded': { weight: 25, expressions: ['sad', 'apologetic', 'worried'] },
                'confused': { weight: 15, expressions: ['confused', 'uncertain', 'thinking'] },
                'excited': { weight: 10, expressions: ['excited', 'happy', 'bouncy'] },
                'scared': { weight: 5, expressions: ['scared', 'nervous', 'hiding'] }
            }
        });

        // Initialize current states
        this.moods.forEach((moodData, character) => {
            this.currentStates.set(character, {
                mood: moodData.current,
                expression: this.avatars.get(character).defaultExpression,
                lastChange: Date.now(),
                energy: 100
            });
        });
    }

    // Avatar generation and rendering
    generateAvatar(character, size = 'medium', expression = null) {
        const avatarData = this.avatars.get(character);
        const currentState = this.currentStates.get(character);
        
        if (!avatarData) return null;

        const finalExpression = expression || currentState?.expression || avatarData.defaultExpression;
        const expressionData = this.expressions.get(finalExpression);

        const avatarHTML = `
            <div class="character-avatar ${character}-avatar" 
                 data-character="${character}"
                 data-expression="${finalExpression}"
                 data-size="${size}"
                 style="--avatar-color: ${avatarData.baseColor}; --avatar-secondary: ${avatarData.secondaryColor};">
                
                <div class="avatar-container ${avatarData.shape}-shape size-${size}">
                    <!-- Hat/Accessory -->
                    <div class="avatar-hat">${avatarData.hat}</div>
                    
                    <!-- Face Base -->
                    <div class="avatar-face">
                        <!-- Eyes -->
                        <div class="avatar-eyes">
                            <span class="eye left-eye">${expressionData?.eyes || '👀'}</span>
                            <span class="eye right-eye">${expressionData?.eyes || '👀'}</span>
                        </div>
                        
                        <!-- Eyebrows -->
                        <div class="avatar-eyebrows ${expressionData?.eyebrows || 'normal'}">
                            <span class="eyebrow left-eyebrow">‾</span>
                            <span class="eyebrow right-eyebrow">‾</span>
                        </div>
                        
                        <!-- Mouth -->
                        <div class="avatar-mouth">
                            ${expressionData?.mouth || '😐'}
                        </div>
                        
                        <!-- Cheeks/Special Effects -->
                        <div class="avatar-cheeks">
                            ${expressionData?.cheeks || ''}
                        </div>
                    </div>
                    
                    <!-- Character-specific accessories -->
                    <div class="avatar-accessories">
                        ${this.renderAccessories(character, finalExpression)}
                    </div>
                </div>
                
                <!-- Mood indicator -->
                <div class="mood-indicator" title="Mood: ${currentState?.mood || 'unknown'}">
                    ${this.getMoodEmoji(character)}
                </div>
                
                <!-- Animation overlay -->
                <div class="avatar-animation ${expressionData?.animation || 'none'}"></div>
            </div>
        `;

        return avatarHTML;
    }

    renderAccessories(character, expression) {
        const avatarData = this.avatars.get(character);
        if (!avatarData.accessories) return '';

        // Show different accessories based on expression/context
        const contextualAccessories = this.getContextualAccessories(character, expression);
        
        return contextualAccessories.map((accessory, index) => 
            `<span class="accessory accessory-${index}" style="animation-delay: ${index * 0.2}s">${accessory}</span>`
        ).join('');
    }

    getContextualAccessories(character, expression) {
        const avatarData = this.avatars.get(character);
        const baseAccessories = avatarData.accessories || [];
        
        // Add expression-specific accessories
        const expressionAccessories = {
            'scheming': ['💡', '💰'],
            'angry': ['💢', '🔥'],
            'happy': ['✨', '🌟'],
            'sad': ['💧', '😢'],
            'anxious': ['⚠️', '💦'],
            'confident': ['😎', '👑']
        };

        const extras = expressionAccessories[expression] || [];
        return [...baseAccessories.slice(0, 2), ...extras.slice(0, 1)];
    }

    getMoodEmoji(character) {
        const moodData = this.moods.get(character);
        const currentMood = moodData?.current || 'neutral';
        
        const moodEmojis = {
            'scheming': '🎭',
            'thoughtful': '💭',
            'neutral': '😐',
            'muffled': '🤐',
            'innocent': '😇',
            'anxious': '☕',
            'apathetic': '🤷',
            'confident': '🎤',
            'excited': '🎉',
            'determined': '💪'
        };

        return moodEmojis[currentMood] || '❓';
    }

    // Dynamic expression changing
    changeExpression(character, newExpression, duration = null) {
        const currentState = this.currentStates.get(character);
        if (!currentState) return false;

        const expressionData = this.expressions.get(newExpression);
        if (!expressionData) return false;

        // Update current state
        currentState.expression = newExpression;
        currentState.lastChange = Date.now();

        // Update all avatar elements for this character
        const avatarElements = document.querySelectorAll(`.character-avatar[data-character="${character}"]`);
        avatarElements.forEach(element => {
            this.updateAvatarElement(element, newExpression, duration || expressionData.duration);
        });

        return true;
    }

    updateAvatarElement(element, expression, duration) {
        const expressionData = this.expressions.get(expression);
        if (!expressionData) return;

        // Update expression attribute
        element.setAttribute('data-expression', expression);

        // Update facial features
        const eyes = element.querySelectorAll('.eye');
        eyes.forEach(eye => eye.textContent = expressionData.eyes);

        const mouth = element.querySelector('.avatar-mouth');
        if (mouth) mouth.textContent = expressionData.mouth;

        const cheeks = element.querySelector('.avatar-cheeks');
        if (cheeks) cheeks.textContent = expressionData.cheeks;

        // Update eyebrow positioning
        const eyebrowsContainer = element.querySelector('.avatar-eyebrows');
        if (eyebrowsContainer) {
            eyebrowsContainer.className = `avatar-eyebrows ${expressionData.eyebrows}`;
        }

        // Trigger animation
        const animationOverlay = element.querySelector('.avatar-animation');
        if (animationOverlay && expressionData.animation !== 'none') {
            animationOverlay.className = `avatar-animation ${expressionData.animation}`;
            
            // Reset animation after duration
            setTimeout(() => {
                if (animationOverlay) {
                    animationOverlay.className = 'avatar-animation';
                }
            }, duration);
        }
    }

    // Mood management
    changeMood(character, newMood) {
        const moodData = this.moods.get(character);
        if (!moodData || !moodData.states[newMood]) return false;

        moodData.current = newMood;
        
        const currentState = this.currentStates.get(character);
        if (currentState) {
            currentState.mood = newMood;
            currentState.lastChange = Date.now();
        }

        // Update mood indicator
        const avatarElements = document.querySelectorAll(`.character-avatar[data-character="${character}"]`);
        avatarElements.forEach(element => {
            const moodIndicator = element.querySelector('.mood-indicator');
            if (moodIndicator) {
                moodIndicator.textContent = this.getMoodEmoji(character);
                moodIndicator.title = `Mood: ${newMood}`;
            }
        });

        return true;
    }

    // Automatic mood cycling
    startMoodCycle() {
        setInterval(() => {
            this.moods.forEach((moodData, character) => {
                const currentState = this.currentStates.get(character);
                if (!currentState) return;

                const timeSinceChange = Date.now() - currentState.lastChange;
                
                // Change mood/expression every 30-60 seconds based on character personality
                const changeInterval = this.getChangeInterval(character);
                
                if (timeSinceChange > changeInterval) {
                    const newExpression = this.getRandomExpression(character);
                    if (newExpression !== currentState.expression) {
                        this.changeExpression(character, newExpression);
                    }
                }
            });
        }, 5000); // Check every 5 seconds
    }

    getChangeInterval(character) {
        const baseInterval = 45000; // 45 seconds
        const personality = this.avatars.get(character)?.personality;
        
        const personalityMultipliers = {
            'dramatic': 0.5,     // Randy changes often
            'anxious': 0.3,      // Tweek changes very often
            'apathetic': 2.0,    // Craig rarely changes
            'mysterious': 1.5,   // Kenny changes less often
            'sweet': 1.2,        // Butters changes slowly
            'normal': 1.0        // Stan is baseline
        };

        return baseInterval * (personalityMultipliers[personality] || 1.0);
    }

    getRandomExpression(character) {
        const moodData = this.moods.get(character);
        const currentState = this.currentStates.get(character);
        
        if (!moodData || !currentState) return 'neutral';
        
        const currentMoodState = moodData.states[currentState.mood];
        if (!currentMoodState) return 'neutral';
        
        const expressions = currentMoodState.expressions;
        return expressions[Math.floor(Math.random() * expressions.length)];
    }

    // Context-aware expression changes
    respondToContext(character, context, intensity = 1.0) {
        const contextExpressions = {
            'post_created': 'happy',
            'got_reaction': 'excited',
            'argument_started': 'angry',
            'mentioned_positively': 'happy',
            'mentioned_negatively': 'angry',
            'achievement_unlocked': 'excited',
            'death_occurred': 'sad',  // Except for Kenny
            'business_success': 'scheming', // Mainly Cartman
            'moral_dilemma': 'thoughtful', // Mainly Kyle
            'confusion': 'confused',  // Mainly Stan
            'anxiety_trigger': 'anxious' // Mainly Tweek
        };

        let targetExpression = contextExpressions[context];
        
        // Character-specific context overrides
        if (character === 'kenny' && context === 'death_occurred') {
            targetExpression = 'muffled'; // Kenny doesn't care about death
        }
        
        if (character === 'craig' && context === 'argument_started') {
            targetExpression = 'apathetic'; // Craig doesn't care
        }
        
        if (targetExpression) {
            this.changeExpression(character, targetExpression);
        }
    }

    // Utility methods
    getCharacterState(character) {
        return {
            avatar: this.avatars.get(character),
            mood: this.moods.get(character),
            currentState: this.currentStates.get(character)
        };
    }

    exportAvatarData() {
        return {
            characters: Object.fromEntries(this.avatars),
            expressions: Object.fromEntries(this.expressions),
            moods: Object.fromEntries(this.moods),
            currentStates: Object.fromEntries(this.currentStates)
        };
    }

    // Character interaction methods
    expressReactionTo(character, targetCharacter, reactionType) {
        const reactions = {
            'cartman': {
                'kyle': 'angry',
                'stan': 'scheming',
                'kenny': 'confident',
                'butters': 'scheming'
            },
            'kyle': {
                'cartman': 'angry',
                'stan': 'happy',
                'randy': 'frustrated'
            },
            'stan': {
                'randy': 'confused',
                'wendy': 'happy',
                'cartman': 'neutral'
            }
        };

        const expression = reactions[character]?.[targetCharacter] || 'neutral';
        this.changeExpression(character, expression);
    }
}

// Global helper functions
function createCharacterAvatar(character, size = 'medium', expression = null) {
    return window.avatarSystem.generateAvatar(character, size, expression);
}

function changeCharacterExpression(character, expression) {
    return window.avatarSystem.changeExpression(character, expression);
}

function changeCharacterMood(character, mood) {
    return window.avatarSystem.changeMood(character, mood);
}

function respondToContext(character, context) {
    return window.avatarSystem.respondToContext(character, context);
}

// CSS for avatar system
const avatarStyles = document.createElement('style');
avatarStyles.textContent = `
    .character-avatar {
        position: relative;
        display: inline-block;
        user-select: none;
        transition: all 0.3s ease;
    }

    .avatar-container {
        background: linear-gradient(135deg, var(--avatar-color), var(--avatar-secondary));
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .round-shape {
        border-radius: 50%;
    }

    .square-shape {
        border-radius: 15%;
    }

    .oval-shape {
        border-radius: 50%;
        transform: scale(1, 1.2);
    }

    .size-small {
        width: 40px;
        height: 40px;
        font-size: 12px;
    }

    .size-medium {
        width: 60px;
        height: 60px;
        font-size: 16px;
    }

    .size-large {
        width: 80px;
        height: 80px;
        font-size: 20px;
    }

    .avatar-face {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .avatar-eyes {
        display: flex;
        gap: 8px;
        margin-bottom: 4px;
    }

    .eye {
        font-size: 0.8em;
        animation: blink 4s infinite;
    }

    @keyframes blink {
        0%, 90%, 100% { transform: scaleY(1); }
        95% { transform: scaleY(0.1); }
    }

    .avatar-eyebrows {
        display: flex;
        gap: 10px;
        font-size: 0.6em;
        position: absolute;
        top: 15%;
        transition: all 0.3s ease;
    }

    .avatar-eyebrows.⬆️ { transform: translateY(-2px); }
    .avatar-eyebrows.⬇️ { transform: translateY(2px); }
    .avatar-eyebrows.➡️ { transform: translateY(0px); }

    .avatar-mouth {
        font-size: 0.7em;
        margin-top: 2px;
    }

    .avatar-cheeks {
        position: absolute;
        font-size: 0.5em;
        opacity: 0.8;
    }

    .avatar-hat {
        position: absolute;
        top: -15%;
        font-size: 0.8em;
        z-index: 2;
    }

    .avatar-accessories {
        position: absolute;
        bottom: -10%;
        right: -10%;
        display: flex;
        gap: 2px;
        flex-wrap: wrap;
    }

    .accessory {
        font-size: 0.5em;
        animation: float 2s ease-in-out infinite;
    }

    .accessory:nth-child(2) { animation-delay: 0.5s; }
    .accessory:nth-child(3) { animation-delay: 1s; }

    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3px); }
    }

    .mood-indicator {
        position: absolute;
        bottom: -8px;
        left: -8px;
        width: 20px;
        height: 20px;
        background: rgba(255,255,255,0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        cursor: help;
    }

    .avatar-animation {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 3;
    }

    /* Expression animations */
    .avatar-animation.bounce {
        animation: avatar-bounce 1s ease-in-out;
    }

    @keyframes avatar-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    .avatar-animation.shake {
        animation: avatar-shake 0.8s ease-in-out;
    }

    @keyframes avatar-shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    .avatar-animation.evil-grin {
        animation: evil-grin 1.2s ease-in-out;
    }

    @keyframes evil-grin {
        0%, 100% { transform: scale(1); filter: brightness(1); }
        50% { transform: scale(1.05); filter: brightness(1.1); }
    }

    .avatar-animation.anxiety-shake {
        animation: anxiety-shake 2s ease-in-out infinite;
    }

    @keyframes anxiety-shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
        20%, 40%, 60%, 80% { transform: translateX(2px); }
    }

    .avatar-animation.sparkle {
        animation: sparkle 1.5s ease-in-out;
    }

    @keyframes sparkle {
        0%, 100% { filter: brightness(1); }
        25%, 75% { filter: brightness(1.3); }
        50% { filter: brightness(1.5); }
    }

    /* Hover effects */
    .character-avatar:hover .avatar-container {
        transform: scale(1.1);
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    }

    .character-avatar:hover .accessory {
        animation-duration: 1s;
    }

    /* Character-specific enhancements */
    .cartman-avatar .avatar-container {
        border-color: #FFD700;
    }

    .kyle-avatar .avatar-hat {
        color: #FF6B35;
    }

    .kenny-avatar .avatar-face {
        filter: blur(0.5px); /* Slightly muffled appearance */
    }

    .tweek-avatar {
        animation: constant-anxiety 3s ease-in-out infinite;
    }

    @keyframes constant-anxiety {
        0%, 100% { transform: translateX(0px); }
        25% { transform: translateX(-1px); }
        75% { transform: translateX(1px); }
    }

    .craig-avatar .avatar-container {
        opacity: 0.9; /* Slightly less engaged */
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .size-large { width: 60px; height: 60px; font-size: 16px; }
        .size-medium { width: 50px; height: 50px; font-size: 14px; }
        .size-small { width: 35px; height: 35px; font-size: 10px; }
    }
`;
document.head.appendChild(avatarStyles);

// Create global instance
window.avatarSystem = new CharacterAvatarSystem();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CharacterAvatarSystem;
}
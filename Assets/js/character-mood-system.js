/**
 * Dynamic Character Mood and Status System
 * Manages emotional states and their effects on interactions
 */

class CharacterMoodSystem {
    constructor(characterSystem) {
        this.characterSystem = characterSystem;
        this.characterMoods = new Map();
        this.moodHistory = new Map();
        this.moodInfluences = this.initializeMoodInfluences();
        this.statusEffects = new Map();
        this.initializeCharacterMoods();
        this.startMoodCycle();
    }

    initializeMoodInfluences() {
        return {
            'cartman': {
                triggers: {
                    'business_success': { mood: 'euphoric', intensity: 0.9, duration: 30000 },
                    'kyle_interaction': { mood: 'antagonistic', intensity: 0.7, duration: 20000 },
                    'scheme_failure': { mood: 'frustrated', intensity: 0.8, duration: 25000 },
                    'attention_received': { mood: 'satisfied', intensity: 0.6, duration: 15000 }
                },
                baseMood: 'scheming',
                volatility: 0.8
            },
            'kyle': {
                triggers: {
                    'injustice_witnessed': { mood: 'outraged', intensity: 0.9, duration: 40000 },
                    'cartman_scheme': { mood: 'frustrated', intensity: 0.8, duration: 35000 },
                    'moral_victory': { mood: 'satisfied', intensity: 0.7, duration: 20000 },
                    'family_support': { mood: 'confident', intensity: 0.6, duration: 25000 }
                },
                baseMood: 'determined',
                volatility: 0.6
            },
            'stan': {
                triggers: {
                    'randy_embarrassment': { mood: 'embarrassed', intensity: 0.8, duration: 30000 },
                    'normal_moment': { mood: 'content', intensity: 0.5, duration: 45000 },
                    'friend_conflict': { mood: 'stressed', intensity: 0.7, duration: 25000 },
                    'wendy_interaction': { mood: 'nervous', intensity: 0.6, duration: 15000 }
                },
                baseMood: 'trying_to_cope',
                volatility: 0.5
            },
            'kenny': {
                triggers: {
                    'death_imminent': { mood: 'resigned', intensity: 0.9, duration: 10000 },
                    'mysterion_mode': { mood: 'heroic', intensity: 0.8, duration: 60000 },
                    'family_concern': { mood: 'protective', intensity: 0.7, duration: 20000 },
                    'friends_happy': { mood: 'content', intensity: 0.6, duration: 30000 }
                },
                baseMood: 'mysterious',
                volatility: 0.9 // High due to death/resurrection cycle
            },
            'sheila': {
                triggers: {
                    'child_threat': { mood: 'mama_bear', intensity: 1.0, duration: 60000 },
                    'kyle_achievement': { mood: 'proud', intensity: 0.8, duration: 40000 },
                    'community_issue': { mood: 'activist', intensity: 0.9, duration: 45000 },
                    'gerald_support': { mood: 'loving', intensity: 0.6, duration: 20000 }
                },
                baseMood: 'vigilant',
                volatility: 0.7
            },
            'gerald': {
                triggers: {
                    'troll_success': { mood: 'satisfied_troll', intensity: 0.9, duration: 50000 },
                    'family_pride': { mood: 'paternal', intensity: 0.7, duration: 30000 },
                    'legal_victory': { mood: 'professional', intensity: 0.8, duration: 35000 },
                    'identity_conflict': { mood: 'conflicted', intensity: 0.6, duration: 40000 }
                },
                baseMood: 'dual_identity',
                volatility: 0.6
            },
            'randy': {
                triggers: {
                    'new_obsession': { mood: 'manic_enthusiasm', intensity: 1.0, duration: 120000 },
                    'project_failure': { mood: 'dejected', intensity: 0.8, duration: 30000 },
                    'sharon_approval': { mood: 'hopeful', intensity: 0.7, duration: 25000 },
                    'stan_embarrassment': { mood: 'oblivious_pride', intensity: 0.9, duration: 60000 }
                },
                baseMood: 'obsessive',
                volatility: 0.9
            },
            'sharon': {
                triggers: {
                    'randy_antics': { mood: 'exasperated', intensity: 0.8, duration: 45000 },
                    'wine_time': { mood: 'relaxed', intensity: 0.7, duration: 30000 },
                    'stan_success': { mood: 'proud_mom', intensity: 0.8, duration: 35000 },
                    'work_achievement': { mood: 'accomplished', intensity: 0.6, duration: 40000 }
                },
                baseMood: 'patient_but_tired',
                volatility: 0.4
            },
            'liane': {
                triggers: {
                    'eric_happiness': { mood: 'doting', intensity: 0.9, duration: 60000 },
                    'eric_criticism': { mood: 'defensive', intensity: 0.8, duration: 40000 },
                    'mothering_opportunity': { mood: 'nurturing', intensity: 0.7, duration: 30000 },
                    'social_interaction': { mood: 'sweet', intensity: 0.6, duration: 25000 }
                },
                baseMood: 'enabling_love',
                volatility: 0.3
            }
        };
    }

    initializeCharacterMoods() {
        Object.keys(this.moodInfluences).forEach(charKey => {
            const influence = this.moodInfluences[charKey];
            this.characterMoods.set(charKey, {
                current: influence.baseMood,
                intensity: 0.5,
                duration: 0,
                lastUpdate: Date.now(),
                effects: []
            });
            this.moodHistory.set(charKey, []);
        });
    }

    triggerMoodChange(characterKey, trigger, context = {}) {
        const influence = this.moodInfluences[characterKey];
        if (!influence || !influence.triggers[trigger]) return;

        const moodChange = influence.triggers[trigger];
        const currentMood = this.characterMoods.get(characterKey);
        
        // Apply mood change
        this.characterMoods.set(characterKey, {
            current: moodChange.mood,
            intensity: moodChange.intensity,
            duration: moodChange.duration,
            lastUpdate: Date.now(),
            effects: this.calculateMoodEffects(characterKey, moodChange.mood, moodChange.intensity),
            trigger: trigger,
            context: context
        });

        // Record in history
        this.addMoodToHistory(characterKey, moodChange.mood, trigger);
        
        // Propagate mood effects to interactions
        this.propagateMoodEffects(characterKey, moodChange.mood, moodChange.intensity);
        
        // Update UI if character is visible
        this.updateCharacterMoodDisplay(characterKey);
    }

    calculateMoodEffects(characterKey, mood, intensity) {
        const effects = [];
        
        const moodEffects = {
            'euphoric': ['increased_posting', 'grandiose_claims', 'business_promotion'],
            'antagonistic': ['argumentative_comments', 'rivalry_escalation', 'confrontational'],
            'frustrated': ['aggressive_responses', 'complaint_posts', 'blame_targeting'],
            'outraged': ['activism_posts', 'moral_crusading', 'call_to_action'],
            'embarrassed': ['reduced_posting', 'apologetic_tone', 'avoidance_behavior'],
            'mama_bear': ['protective_comments', 'threat_assessment', 'emergency_mobilization'],
            'satisfied_troll': ['subtle_provocations', 'anonymous_activities', 'satisfaction_posts'],
            'manic_enthusiasm': ['excessive_posting', 'project_announcements', 'recruitment_attempts'],
            'exasperated': ['reality_check_comments', 'wine_references', 'patience_warnings'],
            'doting': ['praise_comments', 'gift_announcements', 'protective_responses']
        };

        if (moodEffects[mood]) {
            effects.push(...moodEffects[mood].map(effect => ({
                type: effect,
                intensity: intensity,
                duration: intensity * 30000 // Scale duration with intensity
            })));
        }

        return effects;
    }

    propagateMoodEffects(characterKey, mood, intensity) {
        // Mood affects how character responds to others
        const relationships = this.characterSystem.relationships[characterKey] || {};
        
        // Family members are affected by mood changes
        if (relationships.family) {
            relationships.family.forEach(familyMember => {
                this.influenceCharacterMood(familyMember, characterKey, mood, intensity * 0.3);
            });
        }
        
        // Enemies/rivals are triggered by certain moods
        if (mood === 'antagonistic' && relationships.enemies) {
            relationships.enemies.forEach(enemy => {
                this.triggerMoodChange(enemy, 'opponent_aggression', { source: characterKey });
            });
        }
        
        // Special cases
        if (characterKey === 'randy' && mood === 'manic_enthusiasm') {
            // Randy's enthusiasm embarrasses Stan
            this.triggerMoodChange('stan', 'randy_embarrassment', { project: 'unknown' });
        }
        
        if (characterKey === 'cartman' && mood === 'euphoric') {
            // Cartman's success frustrates Kyle
            this.triggerMoodChange('kyle', 'cartman_scheme', { success: true });
        }
    }

    influenceCharacterMood(targetKey, sourceKey, sourceMood, influence) {
        const currentMood = this.characterMoods.get(targetKey);
        if (!currentMood) return;
        
        // Subtle mood influence based on relationships
        const relationship = this.characterSystem.getRelationship(targetKey, sourceKey);
        let moodShift = 0;
        
        switch (relationship) {
            case 'family':
                moodShift = influence * 0.8;
                break;
            case 'friend':
                moodShift = influence * 0.5;
                break;
            case 'enemy':
                moodShift = -influence * 0.6; // Opposite mood effect
                break;
            default:
                moodShift = influence * 0.2;
        }
        
        // Apply subtle influence
        if (Math.abs(moodShift) > 0.1) {
            setTimeout(() => {
                this.adjustMoodIntensity(targetKey, moodShift);
            }, Math.random() * 5000);
        }
    }

    adjustMoodIntensity(characterKey, adjustment) {
        const currentMood = this.characterMoods.get(characterKey);
        if (!currentMood) return;
        
        currentMood.intensity = Math.max(0, Math.min(1, currentMood.intensity + adjustment));
        currentMood.lastUpdate = Date.now();
        
        this.characterMoods.set(characterKey, currentMood);
        this.updateCharacterMoodDisplay(characterKey);
    }

    getCharacterMood(characterKey) {
        return this.characterMoods.get(characterKey) || {
            current: 'neutral',
            intensity: 0.5,
            duration: 0,
            effects: []
        };
    }

    getMoodModifiedComment(characterKey, originalComment, context) {
        const mood = this.getCharacterMood(characterKey);
        
        // Apply mood-based modifications
        const modifiers = {
            'antagonistic': (comment) => `${comment} And I'm NOT backing down!`,
            'frustrated': (comment) => `UGH! ${comment}`,
            'euphoric': (comment) => `${comment} Life is AMAZING right now! 🎉`,
            'outraged': (comment) => `THIS IS UNACCEPTABLE! ${comment}`,
            'embarrassed': (comment) => `Um... ${comment.toLowerCase()}... sorry.`,
            'mama_bear': (comment) => `WHAT WHAT WHAT?! ${comment}`,
            'satisfied_troll': (comment) => `${comment} 😏`,
            'manic_enthusiasm': (comment) => `OH MY GOD! ${comment} This is HUGE!`,
            'exasperated': (comment) => `*sigh* ${comment} Why is everything so complicated?`,
            'doting': (comment) => `Oh my! ${comment} Such a precious angel! 💕`
        };
        
        const modifier = modifiers[mood.current];
        if (modifier && mood.intensity > 0.6) {
            return modifier(originalComment);
        }
        
        return originalComment;
    }

    getMoodEmoji(characterKey) {
        const mood = this.getCharacterMood(characterKey);
        
        const moodEmojis = {
            'scheming': '😏',
            'antagonistic': '😤',
            'frustrated': '😠',
            'euphoric': '🤩',
            'determined': '😤',
            'outraged': '😡',
            'satisfied': '😌',
            'confident': '😎',
            'trying_to_cope': '😐',
            'embarrassed': '😳',
            'stressed': '😰',
            'nervous': '😅',
            'content': '🙂',
            'mysterious': '🤐',
            'resigned': '😔',
            'heroic': '🦸‍♂️',
            'protective': '🛡️',
            'vigilant': '👀',
            'mama_bear': '🐻',
            'proud': '🥲',
            'activist': '✊',
            'loving': '💕',
            'dual_identity': '🎭',
            'satisfied_troll': '😈',
            'paternal': '👨‍👦',
            'professional': '👔',
            'conflicted': '😕',
            'obsessive': '🤯',
            'manic_enthusiasm': '🚀',
            'dejected': '😞',
            'hopeful': '🤞',
            'oblivious_pride': '😤',
            'patient_but_tired': '😮‍💨',
            'exasperated': '🤦‍♀️',
            'relaxed': '😌',
            'proud_mom': '🥰',
            'accomplished': '💪',
            'enabling_love': '🥰',
            'defensive': '🛡️',
            'nurturing': '🤱',
            'sweet': '😊'
        };
        
        return moodEmojis[mood.current] || '😐';
    }

    updateCharacterMoodDisplay(characterKey) {
        // Update mood indicators in UI
        const moodIndicators = document.querySelectorAll(`[data-character="${characterKey}"] .mood-indicator`);
        const emoji = this.getMoodEmoji(characterKey);
        
        moodIndicators.forEach(indicator => {
            indicator.textContent = emoji;
            indicator.title = `Current mood: ${this.getCharacterMood(characterKey).current}`;
        });
        
        // Update status in character profiles
        const statusElements = document.querySelectorAll(`[data-character="${characterKey}"] .character-status`);
        const mood = this.getCharacterMood(characterKey);
        
        statusElements.forEach(status => {
            status.textContent = this.getMoodDescription(characterKey);
            status.className = `character-status mood-${mood.current}`;
        });
    }

    getMoodDescription(characterKey) {
        const mood = this.getCharacterMood(characterKey);
        
        const descriptions = {
            'scheming': 'Planning something big...',
            'antagonistic': 'Ready for a fight',
            'frustrated': 'Having a bad day',
            'euphoric': 'On top of the world!',
            'determined': 'Focused and ready',
            'outraged': 'Fighting injustice',
            'mama_bear': 'Protective mode activated',
            'satisfied_troll': 'Mission accomplished',
            'manic_enthusiasm': 'EXCITED about new project!',
            'exasperated': 'Questioning life choices',
            'doting': 'Loving every moment'
        };
        
        return descriptions[mood.current] || 'Just existing';
    }

    addMoodToHistory(characterKey, mood, trigger) {
        const history = this.moodHistory.get(characterKey) || [];
        history.push({
            mood: mood,
            trigger: trigger,
            timestamp: Date.now(),
            intensity: this.getCharacterMood(characterKey).intensity
        });
        
        // Keep last 20 mood changes
        if (history.length > 20) {
            history.shift();
        }
        
        this.moodHistory.set(characterKey, history);
    }

    startMoodCycle() {
        // Natural mood decay over time
        setInterval(() => {
            this.characterMoods.forEach((mood, charKey) => {
                const timeSinceUpdate = Date.now() - mood.lastUpdate;
                
                // Mood intensity decays over time
                if (timeSinceUpdate > mood.duration && mood.intensity > 0.1) {
                    mood.intensity *= 0.95; // Gradual decay
                    
                    // Return to base mood if intensity is very low
                    if (mood.intensity < 0.3) {
                        const baseMood = this.moodInfluences[charKey]?.baseMood || 'neutral';
                        mood.current = baseMood;
                        mood.intensity = 0.5;
                    }
                    
                    mood.lastUpdate = Date.now();
                    this.updateCharacterMoodDisplay(charKey);
                }
            });
        }, 10000); // Check every 10 seconds
        
        // Random mood fluctuations
        setInterval(() => {
            const characters = Array.from(this.characterMoods.keys());
            const randomChar = characters[Math.floor(Math.random() * characters.length)];
            const influence = this.moodInfluences[randomChar];
            
            if (influence && Math.random() < influence.volatility / 10) {
                const triggers = Object.keys(influence.triggers);
                const randomTrigger = triggers[Math.floor(Math.random() * triggers.length)];
                this.triggerMoodChange(randomChar, randomTrigger, { source: 'random' });
            }
        }, 30000); // Random mood changes every 30 seconds
    }

    // Event detection for automatic mood triggers
    detectInteractionEvent(fromChar, toChar, interactionType) {
        // Detect specific interaction patterns
        if (fromChar === 'cartman' && toChar === 'kyle' && interactionType === 'comment') {
            this.triggerMoodChange('cartman', 'kyle_interaction');
            this.triggerMoodChange('kyle', 'cartman_scheme');
        }
        
        if (fromChar === 'randy' && interactionType === 'post' && Math.random() < 0.3) {
            this.triggerMoodChange('randy', 'new_obsession');
        }
        
        if (toChar === 'sheila' && interactionType === 'crisis') {
            this.triggerMoodChange('sheila', 'child_threat');
        }
    }

    exportMoodState() {
        const state = {};
        this.characterMoods.forEach((mood, charKey) => {
            state[charKey] = mood;
        });
        return state;
    }

    getMoodInfluenceLevel(characterKey) {
        const mood = this.getCharacterMood(characterKey);
        return {
            posting_frequency: this.calculatePostingFrequency(mood),
            comment_aggression: this.calculateCommentAggression(mood),
            interaction_likelihood: this.calculateInteractionLikelihood(mood)
        };
    }

    calculatePostingFrequency(mood) {
        const frequencyModifiers = {
            'manic_enthusiasm': 2.0,
            'euphoric': 1.5,
            'outraged': 1.8,
            'mama_bear': 1.7,
            'embarrassed': 0.3,
            'resigned': 0.4
        };
        
        return frequencyModifiers[mood.current] || 1.0;
    }

    calculateCommentAggression(mood) {
        const aggressionModifiers = {
            'antagonistic': 0.9,
            'frustrated': 0.8,
            'outraged': 0.8,
            'mama_bear': 0.7,
            'satisfied_troll': 0.6,
            'sweet': 0.1,
            'embarrassed': 0.2
        };
        
        return (aggressionModifiers[mood.current] || 0.5) * mood.intensity;
    }

    calculateInteractionLikelihood(mood) {
        const interactionModifiers = {
            'manic_enthusiasm': 0.9,
            'euphoric': 0.8,
            'activist': 0.8,
            'doting': 0.7,
            'embarrassed': 0.2,
            'resigned': 0.3,
            'conflicted': 0.4
        };
        
        return (interactionModifiers[mood.current] || 0.6) * mood.intensity;
    }
}

// Export the mood system
window.CharacterMoodSystem = CharacterMoodSystem;
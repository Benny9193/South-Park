/**
 * South Park Facebook Profiles - Custom Emoji Reaction System
 * South Park-themed reactions with character-specific responses
 */

class SouthParkReactions {
    constructor() {
        this.reactions = new Map();
        this.reactionCounts = new Map();
        this.userReactions = new Map(); // Track user's reactions to posts
        this.characterResponses = new Map();
        this.initializeReactions();
        this.initializeCharacterResponses();
    }

    initializeReactions() {
        // South Park themed reactions
        this.reactions.set('respect_authority', {
            emoji: '👮‍♂️',
            label: 'Respect Mah Authoritah!',
            description: 'Show respect for Cartman\'s authority',
            character: 'cartman',
            rarity: 'common',
            animation: 'cartman-scheme',
            sound: 'authoritah.mp3'
        });

        this.reactions.set('oh_my_god', {
            emoji: '😱',
            label: 'Oh My God!',
            description: 'Classic South Park shock reaction',
            character: 'all',
            rarity: 'common',
            animation: 'shock-wave',
            sound: 'omg.mp3'
        });

        this.reactions.set('killed_kenny', {
            emoji: '💀',
            label: 'They Killed Kenny!',
            description: 'You bastards!',
            character: 'kenny',
            rarity: 'common',
            animation: 'kenny-death',
            sound: 'killed-kenny.mp3'
        });

        this.reactions.set('kick_ass', {
            emoji: '🦵',
            label: 'Kick Ass!',
            description: 'This is totally kick ass!',
            character: 'all',
            rarity: 'common',
            animation: 'kick-animation',
            sound: 'kick-ass.mp3'
        });

        this.reactions.set('sweet', {
            emoji: '🍬',
            label: 'Sweet!',
            description: 'Sweet reaction from Cartman',
            character: 'cartman',
            rarity: 'common',
            animation: 'cartman-happy',
            sound: 'sweet.mp3'
        });

        this.reactions.set('screw_you_guys', {
            emoji: '🏠',
            label: 'Screw You Guys, I\'m Going Home',
            description: 'Cartman\'s signature exit',
            character: 'cartman',
            rarity: 'uncommon',
            animation: 'cartman-leave',
            sound: 'screw-you-guys.mp3'
        });

        this.reactions.set('mmkay', {
            emoji: '💊',
            label: 'Mmkay',
            description: 'Mr. Mackey\'s signature agreement',
            character: 'mackey',
            rarity: 'common',
            animation: 'mackey-nod',
            sound: 'mmkay.mp3'
        });

        this.reactions.set('drugs_bad', {
            emoji: '🚫',
            label: 'Drugs Are Bad',
            description: 'Mmkay, drugs are bad',
            character: 'mackey',
            rarity: 'common',
            animation: 'warning-shake',
            sound: 'drugs-bad.mp3'
        });

        this.reactions.set('tegridy', {
            emoji: '🌿',
            label: 'Tegridy',
            description: 'Got some tegridy right here!',
            character: 'randy',
            rarity: 'uncommon',
            animation: 'randy-tegridy',
            sound: 'tegridy.mp3'
        });

        this.reactions.set('member_berries', {
            emoji: '🍇',
            label: 'Member?',
            description: 'Member when things were better?',
            character: 'all',
            rarity: 'rare',
            animation: 'nostalgic-glow',
            sound: 'member-berries.mp3'
        });

        this.reactions.set('underpants_gnomes', {
            emoji: '👕',
            label: 'Phase 1: Collect Underpants',
            description: 'Step 1: Collect underpants, Step 3: Profit!',
            character: 'all',
            rarity: 'rare',
            animation: 'profit-scheme',
            sound: 'underpants.mp3'
        });

        this.reactions.set('chef_hello', {
            emoji: '👨‍🍳',
            label: 'Hello There Children!',
            description: 'Chef\'s warm greeting',
            character: 'chef',
            rarity: 'uncommon',
            animation: 'chef-wave',
            sound: 'hello-children.mp3'
        });

        this.reactions.set('timmy', {
            emoji: '🏁',
            label: 'TIMMY!',
            description: 'Timmy\'s enthusiastic expression',
            character: 'timmy',
            rarity: 'common',
            animation: 'timmy-excitement',
            sound: 'timmy.mp3'
        });

        this.reactions.set('wow_great_audience', {
            emoji: '🎤',
            label: 'Wow, What a Great Audience!',
            description: 'Jimmy\'s comedy catchphrase',
            character: 'jimmy',
            rarity: 'uncommon',
            animation: 'jimmy-bow',
            sound: 'great-audience.mp3'
        });

        this.reactions.set('hamburgers', {
            emoji: '🍔',
            label: 'Oh Hamburgers!',
            description: 'Butters\' innocent surprise',
            character: 'butters',
            rarity: 'common',
            animation: 'butters-surprise',
            sound: 'hamburgers.mp3'
        });

        this.reactions.set('grounded', {
            emoji: '🏠',
            label: 'You\'re Grounded!',
            description: 'Butters gets grounded again',
            character: 'butters',
            rarity: 'common',
            animation: 'butters-grounded',
            sound: 'grounded.mp3'
        });

        this.reactions.set('anxiety', {
            emoji: '☕',
            label: 'Too Much Pressure!',
            description: 'Tweek\'s anxiety response',
            character: 'tweek',
            rarity: 'common',
            animation: 'tweek-panic',
            sound: 'pressure.mp3'
        });

        this.reactions.set('dont_care', {
            emoji: '🖕',
            label: 'I Don\'t Care',
            description: 'Craig\'s apathetic response',
            character: 'craig',
            rarity: 'common',
            animation: 'craig-flip',
            sound: 'dont-care.mp3'
        });

        this.reactions.set('stan_pukes', {
            emoji: '🤮',
            label: 'Stan Pukes',
            description: 'Stan\'s reaction to romance',
            character: 'stan',
            rarity: 'uncommon',
            animation: 'stan-sick',
            sound: 'puke.mp3'
        });

        this.reactions.set('kyle_learns', {
            emoji: '📚',
            label: 'I Learned Something Today',
            description: 'Kyle\'s moral lesson moment',
            character: 'kyle',
            rarity: 'uncommon',
            animation: 'kyle-wisdom',
            sound: 'learned-something.mp3'
        });

        // Rare/Epic reactions
        this.reactions.set('cartman_authority', {
            emoji: '👑',
            label: 'I Am Not Fat, I\'m Big Boned!',
            description: 'Cartman\'s classic defense',
            character: 'cartman',
            rarity: 'epic',
            animation: 'cartman-dramatic',
            sound: 'big-boned.mp3'
        });

        this.reactions.set('mysterion', {
            emoji: '🦸‍♂️',
            label: 'Mysterion Rises',
            description: 'Kenny\'s superhero alter ego',
            character: 'kenny',
            rarity: 'epic',
            animation: 'kenny-mysterion',
            sound: 'mysterion.mp3'
        });

        this.reactions.set('pc_principal', {
            emoji: '💪',
            label: 'PC Principal Smash!',
            description: 'You PC bro?',
            character: 'pc_principal',
            rarity: 'rare',
            animation: 'pc-flex',
            sound: 'pc-smash.mp3'
        });
    }

    initializeCharacterResponses() {
        // Character-specific responses when their reactions are used
        this.characterResponses.set('cartman', {
            'respect_authority': [
                "Finally! Someone who understands my natural leadership abilities! 👑",
                "You show proper respect for authority! I like you! 💰",
                "This person gets it! I should hire them for Cartman Enterprises! 📈"
            ],
            'sweet': [
                "Sweet! Another person who appreciates excellence! 🌟",
                "I know, right? I'm pretty awesome! 😎",
                "Sweet reaction to my sweet content! 🎯"
            ],
            'screw_you_guys': [
                "That's right! When you're as awesome as me, sometimes you gotta make dramatic exits! 🚪",
                "Screw you guys! I'm going home to count my money! 💰",
                "Classic Cartman move! I invented that, by the way! 👑"
            ]
        });

        this.characterResponses.set('kyle', {
            'kyle_learns': [
                "You know, I really did learn something important today... 📖",
                "Sometimes we all need to step back and think about the bigger picture! 🤔",
                "Education and moral growth are so important! ✊"
            ],
            'oh_my_god': [
                "I know, right? Sometimes this town is just unbelievable! 😤",
                "Oh my God, you're totally right to be shocked! 😱",
                "The things that happen in South Park still surprise me! 🤯"
            ]
        });

        this.characterResponses.set('stan', {
            'stan_pukes': [
                "Ugh, yeah... sometimes things just make me sick... 🤢",
                "I can't help it! Certain things just trigger that response! 😵",
                "At least I'm consistent, right? Right?? 🤷‍♂️"
            ],
            'kick_ass': [
                "Yeah, that is pretty kick ass! 🤘",
                "Finally something cool happening in this crazy town! 😎",
                "Kick ass! I love when things actually work out! 🎉"
            ]
        });

        this.characterResponses.set('kenny', {
            'killed_kenny': [
                "Mmmph mph mmmph! (Hey, I'm still here... for now!) 💀",
                "Mph mmmph mph mmmph! (Death is just a temporary inconvenience!) 👻",
                "Mmmph! (You bastards! But thanks for caring!) ❤️"
            ],
            'mysterion': [
                "Mmmph mph mmmph mph! (The darkness rises to protect the innocent!) 🦸‍♂️",
                "Mph mmmph! (Justice never dies!) ⚖️",
                "Mmmph mph mmmph! (I am the hero this town needs!) 🌟"
            ]
        });

        this.characterResponses.set('butters', {
            'hamburgers': [
                "Oh hamburgers! You used my catchphrase! That makes me so happy! 😊",
                "Aw, gee fellas! Thanks for remembering my favorite expression! 🌈",
                "Oh hamburgers! Now I'm all excited and stuff! 🎉"
            ],
            'grounded': [
                "Aw jeez, I hope I don't get grounded for this reaction being used! 😰",
                "Well, I suppose being grounded isn't so bad... gives me time to think! 🤔",
                "Oh no! Are you gonna tell my dad I got a grounding reaction? 😨"
            ]
        });

        this.characterResponses.set('randy', {
            'tegridy': [
                "Oh my God, you get it! This is what real tegridy looks like! 🌿",
                "Finally! Someone who understands the importance of tegridy! 🚀",
                "That's some premium tegridy appreciation right there! 💎"
            ]
        });
    }

    // Main reaction methods
    addReaction(postId, reactionId, userId = 'user') {
        const postReactions = this.reactionCounts.get(postId) || new Map();
        const currentCount = postReactions.get(reactionId) || 0;
        postReactions.set(reactionId, currentCount + 1);
        this.reactionCounts.set(postId, postReactions);

        // Track user's reaction
        const userReactionKey = `${userId}-${postId}`;
        this.userReactions.set(userReactionKey, reactionId);

        // Trigger animation and response
        this.triggerReactionAnimation(reactionId);
        this.generateCharacterResponse(postId, reactionId);

        return this.getReactionData(reactionId);
    }

    removeReaction(postId, reactionId, userId = 'user') {
        const postReactions = this.reactionCounts.get(postId);
        if (postReactions && postReactions.has(reactionId)) {
            const currentCount = postReactions.get(reactionId);
            if (currentCount > 1) {
                postReactions.set(reactionId, currentCount - 1);
            } else {
                postReactions.delete(reactionId);
            }
        }

        // Remove user's reaction tracking
        const userReactionKey = `${userId}-${postId}`;
        this.userReactions.delete(userReactionKey);
    }

    getReactionData(reactionId) {
        return this.reactions.get(reactionId);
    }

    getPostReactions(postId) {
        return this.reactionCounts.get(postId) || new Map();
    }

    getUserReaction(postId, userId = 'user') {
        const userReactionKey = `${userId}-${postId}`;
        return this.userReactions.get(userReactionKey);
    }

    triggerReactionAnimation(reactionId) {
        const reactionData = this.reactions.get(reactionId);
        if (reactionData && reactionData.animation) {
            // Create floating reaction animation
            this.createFloatingReaction(reactionData);
            
            // Play character-specific animation if available
            const elements = document.querySelectorAll(`.${reactionData.animation}`);
            elements.forEach(el => {
                el.classList.add('trigger-animation');
                setTimeout(() => {
                    el.classList.remove('trigger-animation');
                }, 1000);
            });
        }
    }

    createFloatingReaction(reactionData) {
        const floatingElement = document.createElement('div');
        floatingElement.className = 'floating-reaction';
        floatingElement.innerHTML = `
            <span class="reaction-emoji">${reactionData.emoji}</span>
            <span class="reaction-label">${reactionData.label}</span>
        `;
        
        // Style the floating reaction
        floatingElement.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight - 100}px;
            z-index: 10000;
            pointer-events: none;
            font-size: 24px;
            font-weight: bold;
            color: #1877f2;
            text-align: center;
            animation: float-up-reaction 3s ease-out forwards;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        `;

        document.body.appendChild(floatingElement);

        // Remove element after animation
        setTimeout(() => {
            if (floatingElement.parentNode) {
                floatingElement.parentNode.removeChild(floatingElement);
            }
        }, 3000);
    }

    generateCharacterResponse(postId, reactionId) {
        const reactionData = this.reactions.get(reactionId);
        if (!reactionData) return;

        const character = reactionData.character;
        if (character === 'all') return; // Generic reactions don't trigger responses

        const responses = this.characterResponses.get(character);
        if (!responses || !responses[reactionId]) return;

        const responseMessages = responses[reactionId];
        const randomResponse = responseMessages[Math.floor(Math.random() * responseMessages.length)];

        // Generate notification if notification system is available
        if (window.notificationSystem) {
            setTimeout(() => {
                window.notificationSystem.createNotification(
                    'character_interaction',
                    character,
                    `${character.charAt(0).toUpperCase() + character.slice(1)} reacts`,
                    randomResponse,
                    {
                        reactionId,
                        postId,
                        source: 'reaction_response'
                    }
                );
            }, 1500); // Delay to make it feel like a response
        }

        return randomResponse;
    }

    // UI Generation Methods
    renderReactionPicker(postId, character = null) {
        const availableReactions = this.getAvailableReactions(character);
        const userReaction = this.getUserReaction(postId);

        const reactionHTML = availableReactions.map(([reactionId, reactionData]) => {
            const isSelected = userReaction === reactionId;
            const count = this.getPostReactions(postId).get(reactionId) || 0;
            const rarityClass = `rarity-${reactionData.rarity}`;
            
            return `
                <button class="reaction-btn ${rarityClass} ${isSelected ? 'selected' : ''}" 
                        onclick="toggleReaction('${postId}', '${reactionId}')"
                        title="${reactionData.description}">
                    <span class="reaction-emoji">${reactionData.emoji}</span>
                    <span class="reaction-label">${reactionData.label}</span>
                    ${count > 0 ? `<span class="reaction-count">${count}</span>` : ''}
                </button>
            `;
        }).join('');

        return `
            <div class="reaction-picker" data-post-id="${postId}">
                <div class="reaction-grid">
                    ${reactionHTML}
                </div>
                <div class="reaction-summary">
                    ${this.renderReactionSummary(postId)}
                </div>
            </div>
        `;
    }

    renderReactionSummary(postId) {
        const postReactions = this.getPostReactions(postId);
        if (postReactions.size === 0) return '<span class="no-reactions">No reactions yet</span>';

        const summaryHTML = Array.from(postReactions.entries())
            .sort(([,a], [,b]) => b - a) // Sort by count descending
            .map(([reactionId, count]) => {
                const reactionData = this.reactions.get(reactionId);
                return `
                    <span class="reaction-summary-item">
                        ${reactionData.emoji} ${count}
                    </span>
                `;
            }).join('');

        return `<div class="reaction-summary-list">${summaryHTML}</div>`;
    }

    getAvailableReactions(character = null) {
        const allReactions = Array.from(this.reactions.entries());
        
        if (!character) {
            // Return common reactions if no character specified
            return allReactions.filter(([, data]) => 
                data.character === 'all' || data.rarity === 'common'
            );
        }

        // Return character-specific reactions plus common ones
        return allReactions.filter(([, data]) => 
            data.character === character || 
            data.character === 'all' || 
            data.rarity === 'common'
        );
    }

    // Statistics and analytics
    getPopularReactions(limit = 10) {
        const reactionStats = new Map();
        
        for (const postReactions of this.reactionCounts.values()) {
            for (const [reactionId, count] of postReactions.entries()) {
                const currentCount = reactionStats.get(reactionId) || 0;
                reactionStats.set(reactionId, currentCount + count);
            }
        }

        return Array.from(reactionStats.entries())
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit)
            .map(([reactionId, count]) => ({
                id: reactionId,
                data: this.reactions.get(reactionId),
                totalCount: count
            }));
    }

    exportReactionData() {
        return {
            reactions: Object.fromEntries(this.reactions),
            reactionCounts: Object.fromEntries(this.reactionCounts),
            userReactions: Object.fromEntries(this.userReactions),
            timestamp: new Date().toISOString()
        };
    }
}

// Global helper functions
function toggleReaction(postId, reactionId) {
    const currentReaction = window.southParkReactions.getUserReaction(postId);
    
    if (currentReaction === reactionId) {
        // Remove reaction if clicking the same one
        window.southParkReactions.removeReaction(postId, reactionId);
    } else {
        // Remove old reaction if exists
        if (currentReaction) {
            window.southParkReactions.removeReaction(postId, currentReaction);
        }
        // Add new reaction
        window.southParkReactions.addReaction(postId, reactionId);
    }
    
    // Update UI
    updateReactionDisplay(postId);
    
    // Add click feedback animation
    event.target.classList.add('click-feedback');
    setTimeout(() => {
        event.target.classList.remove('click-feedback');
    }, 300);
}

function updateReactionDisplay(postId) {
    const reactionPicker = document.querySelector(`.reaction-picker[data-post-id="${postId}"]`);
    if (reactionPicker) {
        const character = reactionPicker.getAttribute('data-character');
        reactionPicker.innerHTML = window.southParkReactions.renderReactionPicker(postId, character).replace(/<[^>]*reaction-picker[^>]*>/g, '');
    }
}

function showReactionStats() {
    const stats = window.southParkReactions.getPopularReactions(10);
    const statsHTML = stats.map((stat, index) => `
        <div class="reaction-stat">
            <span class="rank">#${index + 1}</span>
            <span class="reaction">${stat.data.emoji} ${stat.data.label}</span>
            <span class="count">${stat.totalCount} uses</span>
        </div>
    `).join('');
    
    alert(`Popular Reactions:\n\n${stats.map((stat, i) => `#${i+1} ${stat.data.emoji} ${stat.data.label} (${stat.totalCount} uses)`).join('\n')}`);
}

// Add CSS for floating reaction animation
const reactionStyles = document.createElement('style');
reactionStyles.textContent = `
    @keyframes float-up-reaction {
        0% { 
            transform: translateY(0px) scale(1);
            opacity: 1;
        }
        50% {
            transform: translateY(-50px) scale(1.2);
            opacity: 0.8;
        }
        100% { 
            transform: translateY(-100px) scale(0.8);
            opacity: 0;
        }
    }
    
    .reaction-picker {
        background: white;
        border-radius: 12px;
        padding: 15px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        margin: 10px 0;
    }
    
    .reaction-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 10px;
    }
    
    .reaction-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 8px 12px;
        border: 2px solid #e0e0e0;
        border-radius: 20px;
        background: white;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 14px;
        position: relative;
    }
    
    .reaction-btn:hover {
        border-color: #1877f2;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .reaction-btn.selected {
        background: #1877f2;
        color: white;
        border-color: #1877f2;
    }
    
    .reaction-btn .reaction-emoji {
        font-size: 18px;
    }
    
    .reaction-btn .reaction-count {
        background: rgba(0,0,0,0.1);
        color: #666;
        padding: 2px 6px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: bold;
    }
    
    .reaction-btn.selected .reaction-count {
        background: rgba(255,255,255,0.2);
        color: white;
    }
    
    .rarity-common { border-color: #4CAF50; }
    .rarity-uncommon { border-color: #FF9800; }
    .rarity-rare { border-color: #9C27B0; }
    .rarity-epic { 
        border-color: #FF6B35; 
        background: linear-gradient(45deg, #FF6B35, #F7931E);
        color: white;
    }
    
    .reaction-summary-list {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        padding-top: 10px;
        border-top: 1px solid #f0f0f0;
    }
    
    .reaction-summary-item {
        background: #f8f9fa;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 14px;
        color: #666;
    }
    
    .no-reactions {
        color: #999;
        font-style: italic;
        padding: 10px 0;
    }
`;
document.head.appendChild(reactionStyles);

// Create global instance
window.southParkReactions = new SouthParkReactions();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SouthParkReactions;
}
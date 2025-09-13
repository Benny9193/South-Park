/**
 * South Park Facebook Profiles - Emoji Reactions System
 * Adds interactive emoji reactions to posts and comments
 */

class EmojiReactionsSystem {
    constructor() {
        this.reactions = {
            'like': { emoji: '👍', label: 'Like', color: '#1877f2' },
            'love': { emoji: '❤️', label: 'Love', color: '#e91e63' },
            'haha': { emoji: '😂', label: 'Haha', color: '#f57c00' },
            'wow': { emoji: '😮', label: 'Wow', color: '#f57c00' },
            'sad': { emoji: '😢', label: 'Sad', color: '#f57c00' },
            'angry': { emoji: '😡', label: 'Angry', color: '#e53935' },
            'cartman': { emoji: '💰', label: 'Cartman', color: '#dc3545' },
            'kyle': { emoji: '📚', label: 'Kyle', color: '#4CAF50' },
            'stan': { emoji: '🎵', label: 'Stan', color: '#2196F3' },
            'kenny': { emoji: '💀', label: 'Kenny', color: '#FF9800' }
        };

        this.reactionCounts = new Map();
        this.userReactions = new Map();
        this.init();
    }

    init() {
        this.addReactionStyles();
        this.enhancePosts();
        this.attachEventListeners();
        this.loadStoredReactions();
    }

    addReactionStyles() {
        const styles = document.createElement('style');
        styles.id = 'emoji-reactions-styles';
        styles.textContent = `
            /* Reaction Bar */
            .reaction-bar {
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 8px 0;
                border-top: 1px solid #e4e6ea;
                margin-top: 12px;
            }

            .reaction-trigger {
                background: none;
                border: none;
                cursor: pointer;
                padding: 6px 12px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                font-size: 13px;
                font-weight: 500;
                color: #65676b;
                position: relative;
            }

            .reaction-trigger:hover {
                background: rgba(24, 119, 242, 0.08);
                color: #1877f2;
                transform: translateY(-1px);
            }

            .reaction-trigger.active {
                background: rgba(24, 119, 242, 0.1);
                color: #1877f2;
            }

            /* Reaction Picker */
            .reaction-picker {
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                border-radius: 25px;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
                padding: 8px;
                display: flex;
                gap: 4px;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 1000;
                margin-bottom: 8px;
                border: 1px solid rgba(228, 230, 235, 0.6);
            }

            .reaction-picker.visible {
                opacity: 1;
                visibility: visible;
                transform: translateX(-50%) translateY(-4px);
            }

            .reaction-option {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: none;
                background: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
            }

            .reaction-option:hover {
                transform: scale(1.3);
                z-index: 10;
            }

            .reaction-option::after {
                content: attr(data-label);
                position: absolute;
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 11px;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.2s;
            }

            .reaction-option:hover::after {
                opacity: 1;
                visibility: visible;
            }

            /* Reaction Counts Display */
            .reaction-counts {
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
                margin-top: 8px;
                padding: 4px 0;
            }

            .reaction-count {
                display: flex;
                align-items: center;
                gap: 4px;
                background: rgba(0, 0, 0, 0.05);
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 12px;
                color: #65676b;
                cursor: pointer;
                transition: all 0.2s;
                border: 1px solid rgba(228, 230, 235, 0.6);
            }

            .reaction-count:hover {
                background: rgba(24, 119, 242, 0.08);
                transform: translateY(-1px);
            }

            .reaction-count.user-reacted {
                background: rgba(24, 119, 242, 0.1);
                color: #1877f2;
                border-color: rgba(24, 119, 242, 0.2);
            }

            .reaction-emoji {
                font-size: 14px;
            }

            /* Animation for new reactions */
            @keyframes reactionPop {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1.3); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
            }

            .reaction-animation {
                animation: reactionPop 0.4s ease-out;
            }

            /* Floating reaction animation */
            @keyframes floatReaction {
                0% {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-50px) scale(0.5);
                    opacity: 0;
                }
            }

            .floating-reaction {
                position: absolute;
                font-size: 20px;
                pointer-events: none;
                z-index: 1001;
                animation: floatReaction 1.5s ease-out forwards;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .reaction-picker {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    margin-bottom: 0;
                }

                .reaction-option {
                    width: 36px;
                    height: 36px;
                    font-size: 20px;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }

    enhancePosts() {
        const posts = document.querySelectorAll('.post');
        posts.forEach((post, index) => {
            this.addReactionsToPost(post, `post-${index}`);
        });

        const comments = document.querySelectorAll('.comment');
        comments.forEach((comment, index) => {
            this.addReactionsToComment(comment, `comment-${index}`);
        });
    }

    addReactionsToPost(post, postId) {
        const actionsContainer = post.querySelector('.post-actions');
        if (!actionsContainer) return;

        // Replace the existing Like button with enhanced reaction button
        const likeButton = actionsContainer.querySelector('.post-action');
        if (likeButton && likeButton.textContent.includes('Like')) {
            likeButton.innerHTML = `
                <span class="reaction-emoji">👍</span>
                <span class="reaction-text">Like</span>
            `;
            likeButton.className = 'reaction-trigger';
            likeButton.setAttribute('data-post-id', postId);
        }

        // Add reaction picker
        const reactionPicker = this.createReactionPicker();
        likeButton.appendChild(reactionPicker);

        // Add reaction counts display
        const reactionCounts = document.createElement('div');
        reactionCounts.className = 'reaction-counts';
        reactionCounts.setAttribute('data-post-id', postId);
        actionsContainer.appendChild(reactionCounts);

        // Initialize with some sample reactions for demo
        this.initializeSampleReactions(postId);
    }

    addReactionsToComment(comment, commentId) {
        // Similar to posts but for comments
        const actionsContainer = comment.querySelector('.comment-actions');
        if (!actionsContainer) return;

        // Add reaction functionality to comments
        // Implementation similar to posts but scaled down
    }

    createReactionPicker() {
        const picker = document.createElement('div');
        picker.className = 'reaction-picker';

        Object.entries(this.reactions).forEach(([key, reaction]) => {
            const option = document.createElement('button');
            option.className = 'reaction-option';
            option.innerHTML = reaction.emoji;
            option.setAttribute('data-reaction', key);
            option.setAttribute('data-label', reaction.label);
            picker.appendChild(option);
        });

        return picker;
    }

    attachEventListeners() {
        document.addEventListener('click', (e) => {
            // Show reaction picker on like button click
            if (e.target.closest('.reaction-trigger')) {
                e.preventDefault();
                const trigger = e.target.closest('.reaction-trigger');
                const picker = trigger.querySelector('.reaction-picker');
                
                // Hide all other pickers
                document.querySelectorAll('.reaction-picker').forEach(p => {
                    if (p !== picker) p.classList.remove('visible');
                });
                
                picker.classList.toggle('visible');
                
                // Position the picker correctly
                setTimeout(() => this.positionPicker(picker, trigger), 0);
            }
            
            // Handle reaction selection
            else if (e.target.closest('.reaction-option')) {
                e.preventDefault();
                const option = e.target.closest('.reaction-option');
                const reaction = option.getAttribute('data-reaction');
                const trigger = option.closest('.reaction-trigger');
                const postId = trigger.getAttribute('data-post-id');
                
                this.addReaction(postId, reaction, e);
                option.closest('.reaction-picker').classList.remove('visible');
            }
            
            // Handle clicking on reaction counts
            else if (e.target.closest('.reaction-count')) {
                const reactionCount = e.target.closest('.reaction-count');
                const reaction = reactionCount.getAttribute('data-reaction');
                const postId = reactionCount.closest('.reaction-counts').getAttribute('data-post-id');
                
                this.toggleReaction(postId, reaction, e);
            }
            
            // Hide pickers when clicking elsewhere
            else {
                document.querySelectorAll('.reaction-picker').forEach(p => {
                    p.classList.remove('visible');
                });
            }
        });

        // Handle long press on mobile
        let longPressTimer;
        document.addEventListener('touchstart', (e) => {
            if (e.target.closest('.reaction-trigger')) {
                longPressTimer = setTimeout(() => {
                    const trigger = e.target.closest('.reaction-trigger');
                    const picker = trigger.querySelector('.reaction-picker');
                    picker.classList.add('visible');
                }, 500);
            }
        });

        document.addEventListener('touchend', () => {
            clearTimeout(longPressTimer);
        });
    }

    positionPicker(picker, trigger) {
        const rect = trigger.getBoundingClientRect();
        const pickerRect = picker.getBoundingClientRect();
        
        // Check if picker would go off screen
        if (rect.left + pickerRect.width / 2 > window.innerWidth) {
            picker.style.left = 'auto';
            picker.style.right = '0';
            picker.style.transform = 'none';
        }
    }

    addReaction(postId, reactionType, event) {
        // Create floating animation
        this.createFloatingReaction(reactionType, event);

        // Update user's reaction
        this.userReactions.set(postId, reactionType);
        
        // Update reaction counts
        const postReactions = this.reactionCounts.get(postId) || {};
        postReactions[reactionType] = (postReactions[reactionType] || 0) + 1;
        this.reactionCounts.set(postId, postReactions);

        // Update UI
        this.updateReactionDisplay(postId);
        this.updateReactionTrigger(postId, reactionType);
        
        // Save to localStorage
        this.saveReactions();

        // Add haptic feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    toggleReaction(postId, reactionType, event) {
        const userReaction = this.userReactions.get(postId);
        
        if (userReaction === reactionType) {
            // Remove reaction
            this.userReactions.delete(postId);
            const postReactions = this.reactionCounts.get(postId) || {};
            if (postReactions[reactionType]) {
                postReactions[reactionType] = Math.max(0, postReactions[reactionType] - 1);
                if (postReactions[reactionType] === 0) {
                    delete postReactions[reactionType];
                }
            }
            this.reactionCounts.set(postId, postReactions);
        } else {
            // Add/change reaction
            this.addReaction(postId, reactionType, event);
        }

        this.updateReactionDisplay(postId);
        this.updateReactionTrigger(postId, this.userReactions.get(postId));
    }

    createFloatingReaction(reactionType, event) {
        const reaction = this.reactions[reactionType];
        const floatingEmoji = document.createElement('div');
        floatingEmoji.className = 'floating-reaction';
        floatingEmoji.textContent = reaction.emoji;
        
        // Position at cursor/touch point
        floatingEmoji.style.left = event.clientX + 'px';
        floatingEmoji.style.top = event.clientY + 'px';
        
        document.body.appendChild(floatingEmoji);
        
        // Remove after animation
        setTimeout(() => {
            floatingEmoji.remove();
        }, 1500);
    }

    updateReactionDisplay(postId) {
        const countsContainer = document.querySelector(`.reaction-counts[data-post-id="${postId}"]`);
        if (!countsContainer) return;

        const postReactions = this.reactionCounts.get(postId) || {};
        const userReaction = this.userReactions.get(postId);

        countsContainer.innerHTML = '';

        Object.entries(postReactions).forEach(([reactionType, count]) => {
            if (count > 0) {
                const reaction = this.reactions[reactionType];
                const countElement = document.createElement('div');
                countElement.className = `reaction-count ${userReaction === reactionType ? 'user-reacted' : ''}`;
                countElement.setAttribute('data-reaction', reactionType);
                countElement.innerHTML = `
                    <span class="reaction-emoji">${reaction.emoji}</span>
                    <span>${count}</span>
                `;
                countElement.classList.add('reaction-animation');
                countsContainer.appendChild(countElement);
            }
        });
    }

    updateReactionTrigger(postId, userReaction) {
        const trigger = document.querySelector(`.reaction-trigger[data-post-id="${postId}"]`);
        if (!trigger) return;

        const emojiSpan = trigger.querySelector('.reaction-emoji');
        const textSpan = trigger.querySelector('.reaction-text');

        if (userReaction && this.reactions[userReaction]) {
            const reaction = this.reactions[userReaction];
            emojiSpan.textContent = reaction.emoji;
            textSpan.textContent = reaction.label;
            trigger.classList.add('active');
            trigger.style.color = reaction.color;
        } else {
            emojiSpan.textContent = '👍';
            textSpan.textContent = 'Like';
            trigger.classList.remove('active');
            trigger.style.color = '';
        }
    }

    initializeSampleReactions(postId) {
        // Add some sample reactions for demonstration
        const sampleReactions = {
            'like': Math.floor(Math.random() * 10) + 1,
            'love': Math.floor(Math.random() * 5),
            'haha': Math.floor(Math.random() * 3),
            'cartman': Math.floor(Math.random() * 2)
        };

        // Remove empty reactions
        Object.keys(sampleReactions).forEach(key => {
            if (sampleReactions[key] === 0) {
                delete sampleReactions[key];
            }
        });

        if (Object.keys(sampleReactions).length > 0) {
            this.reactionCounts.set(postId, sampleReactions);
            this.updateReactionDisplay(postId);
        }
    }

    saveReactions() {
        try {
            const data = {
                counts: Object.fromEntries(this.reactionCounts),
                user: Object.fromEntries(this.userReactions)
            };
            localStorage.setItem('sp-reactions', JSON.stringify(data));
        } catch (e) {
            console.warn('Could not save reactions to localStorage:', e);
        }
    }

    loadStoredReactions() {
        try {
            const data = JSON.parse(localStorage.getItem('sp-reactions') || '{}');
            if (data.counts) {
                this.reactionCounts = new Map(Object.entries(data.counts));
            }
            if (data.user) {
                this.userReactions = new Map(Object.entries(data.user));
            }

            // Update displays
            this.reactionCounts.forEach((_, postId) => {
                this.updateReactionDisplay(postId);
                this.updateReactionTrigger(postId, this.userReactions.get(postId));
            });
        } catch (e) {
            console.warn('Could not load reactions from localStorage:', e);
        }
    }

    // Public method to add custom reactions for specific characters
    addCharacterReaction(character, emoji, label, color) {
        this.reactions[character] = { emoji, label, color };
    }
}

// Initialize emoji reactions system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.emojiReactions = new EmojiReactionsSystem();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmojiReactionsSystem;
}
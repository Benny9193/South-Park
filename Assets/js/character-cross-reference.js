/**
 * South Park Character Cross-Reference System
 * Tracks mentions between characters and creates real-time notifications
 */

class CharacterCrossReference {
    constructor() {
        this.characters = new Map();
        this.mentions = new Set();
        this.notifications = [];
        this.relationshipMap = new Map();

        this.initializeCharacters();
        this.initializeRelationships();
        this.scanForMentions();
        this.setupNotificationSystem();
    }

    initializeCharacters() {
        // Define all South Park characters with their identifiers
        const characterList = [
            { id: 'stan', name: 'Stan Marsh', aliases: ['stan', 'stanley'] },
            { id: 'kyle', name: 'Kyle Broflovski', aliases: ['kyle'] },
            { id: 'cartman', name: 'Eric Cartman', aliases: ['cartman', 'eric', 'fatass'] },
            { id: 'kenny', name: 'Kenny McCormick', aliases: ['kenny'] },
            { id: 'butters', name: 'Butters Stotch', aliases: ['butters', 'leopold'] },
            { id: 'tweek', name: 'Tweek Tweak', aliases: ['tweek'] },
            { id: 'craig', name: 'Craig Tucker', aliases: ['craig'] },
            { id: 'randy', name: 'Randy Marsh', aliases: ['randy', 'dad'] },
            { id: 'sharon', name: 'Sharon Marsh', aliases: ['sharon', 'mom'] },
            { id: 'gerald', name: 'Gerald Broflovski', aliases: ['gerald'] },
            { id: 'sheila', name: 'Sheila Broflovski', aliases: ['sheila'] },
            { id: 'liane', name: 'Liane Cartman', aliases: ['liane', 'mom'] },
            { id: 'mr_garrison', name: 'Mr. Garrison', aliases: ['garrison', 'mr garrison', 'teacher'] },
            { id: 'mr_mackey', name: 'Mr. Mackey', aliases: ['mackey', 'mr mackey', 'mmkay'] },
            { id: 'chef', name: 'Chef', aliases: ['chef'] },
            { id: 'jimmy', name: 'Jimmy Valmer', aliases: ['jimmy'] },
            { id: 'timmy', name: 'Timmy Burch', aliases: ['timmy'] },
            { id: 'wendy', name: 'Wendy Testaburger', aliases: ['wendy'] },
            { id: 'bebe', name: 'Bebe Stevens', aliases: ['bebe'] },
            { id: 'clyde', name: 'Clyde Donovan', aliases: ['clyde'] },
            { id: 'token', name: 'Token Black', aliases: ['token'] },
            { id: 'red', name: 'Red McArthur', aliases: ['red'] }
        ];

        characterList.forEach(char => {
            this.characters.set(char.id, char);
        });
    }

    initializeRelationships() {
        // Define character relationships for context
        this.relationshipMap.set('stan_kyle', { type: 'best_friends', strength: 95 });
        this.relationshipMap.set('stan_wendy', { type: 'boyfriend_girlfriend', strength: 80 });
        this.relationshipMap.set('cartman_kyle', { type: 'enemies', strength: 90 });
        this.relationshipMap.set('tweek_craig', { type: 'boyfriend_boyfriend', strength: 85 });
        this.relationshipMap.set('stan_randy', { type: 'father_son', strength: 70 });
        this.relationshipMap.set('stan_sharon', { type: 'mother_son', strength: 85 });
        this.relationshipMap.set('cartman_liane', { type: 'mother_son', strength: 95 });
        this.relationshipMap.set('butters_cartman', { type: 'exploited_friend', strength: 60 });
        // Add more relationships as needed
    }

    scanForMentions() {
        // Scan all posts for character mentions
        const posts = document.querySelectorAll('.post-content, .post');

        posts.forEach(post => {
            const text = post.textContent.toLowerCase();
            const foundMentions = [];

            this.characters.forEach((character, id) => {
                character.aliases.forEach(alias => {
                    const regex = new RegExp(`\\b${alias}\\b`, 'gi');
                    if (regex.test(text)) {
                        foundMentions.push({
                            characterId: id,
                            characterName: character.name,
                            alias: alias,
                            element: post
                        });
                    }
                });
            });

            if (foundMentions.length > 0) {
                this.processMentions(foundMentions, post);
            }
        });
    }

    processMentions(mentions, postElement) {
        mentions.forEach(mention => {
            // Create mention notification
            const notification = {
                id: `mention_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: 'character_mention',
                mentionedCharacter: mention.characterId,
                mentionedName: mention.characterName,
                source: this.getCurrentCharacter(),
                timestamp: new Date(),
                postElement: postElement,
                read: false
            };

            this.notifications.push(notification);
            this.highlightMention(mention, postElement);
            this.createNotificationWidget(notification);
        });
    }

    highlightMention(mention, postElement) {
        // Highlight mentioned character names in posts
        const text = postElement.innerHTML;
        const regex = new RegExp(`\\b(${mention.alias})\\b`, 'gi');

        const highlightedText = text.replace(regex, (match) => {
            return `<span class="character-mention" data-character="${mention.characterId}" title="Mentioned: ${mention.characterName}">${match}</span>`;
        });

        postElement.innerHTML = highlightedText;

        // Add click handler to character mentions
        postElement.querySelectorAll('.character-mention').forEach(span => {
            span.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCharacterPreview(span.dataset.character);
            });
        });
    }

    createNotificationWidget(notification) {
        // Create floating notification
        const notificationElement = document.createElement('div');
        notificationElement.className = 'cross-reference-notification';
        notificationElement.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">🔗</div>
                <div class="notification-text">
                    <strong>Character Mentioned!</strong><br>
                    ${notification.mentionedName} was mentioned in a post
                </div>
                <div class="notification-actions">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
            </div>
        `;

        // Position notification
        notificationElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            padding: 12px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            min-width: 250px;
            font-size: 14px;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notificationElement);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notificationElement.parentNode) {
                notificationElement.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => notificationElement.remove(), 300);
            }
        }, 5000);
    }

    showCharacterPreview(characterId) {
        const character = this.characters.get(characterId);
        if (!character) return;

        // Create character preview popup
        const preview = document.createElement('div');
        preview.className = 'character-preview-popup';
        preview.innerHTML = `
            <div class="preview-content">
                <div class="preview-header">
                    <h3>${character.name}</h3>
                    <button class="close-preview" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                <div class="preview-body">
                    <div class="preview-avatar">${character.name.split(' ').map(n => n[0]).join('')}</div>
                    <div class="preview-info">
                        <p>Click to visit ${character.name}'s profile</p>
                        <div class="preview-actions">
                            <button onclick="window.open('${character.id.replace('_', ' ')}.html', '_blank')" class="visit-profile-btn">
                                Visit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Style the preview
        preview.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            z-index: 10001;
            max-width: 300px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        document.body.appendChild(preview);

        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
        `;
        backdrop.onclick = () => {
            backdrop.remove();
            preview.remove();
        };
        document.body.appendChild(backdrop);
    }

    getCurrentCharacter() {
        // Determine current character from page title or URL
        const title = document.title;
        for (let [id, character] of this.characters) {
            if (title.includes(character.name)) {
                return id;
            }
        }
        return 'unknown';
    }

    addNotificationStyles() {
        // Add CSS for notifications and mentions
        const style = document.createElement('style');
        style.textContent = `
            .character-mention {
                background: linear-gradient(135deg, #e3f2fd, #bbdefb);
                color: #1976d2;
                padding: 2px 4px;
                border-radius: 3px;
                cursor: pointer;
                border-bottom: 1px dashed #1976d2;
                transition: all 0.2s ease;
            }

            .character-mention:hover {
                background: linear-gradient(135deg, #bbdefb, #90caf9);
                transform: scale(1.05);
            }

            .cross-reference-notification {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .notification-icon {
                font-size: 20px;
            }

            .notification-actions button {
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .preview-content {
                padding: 20px;
            }

            .preview-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                border-bottom: 1px solid #e0e0e0;
                padding-bottom: 10px;
            }

            .preview-header h3 {
                margin: 0;
                color: #333;
            }

            .close-preview {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #666;
            }

            .preview-body {
                display: flex;
                gap: 15px;
                align-items: center;
            }

            .preview-avatar {
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #2196F3, #1976D2);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 14px;
            }

            .visit-profile-btn {
                background: #1877f2;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                margin-top: 10px;
            }

            .visit-profile-btn:hover {
                background: #166fe5;
            }

            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }

            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    init() {
        this.addNotificationStyles();
        console.log(`Character Cross-Reference System initialized with ${this.notifications.length} mentions found`);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.characterCrossReference === 'undefined') {
        window.characterCrossReference = new CharacterCrossReference();
        window.characterCrossReference.init();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CharacterCrossReference;
}
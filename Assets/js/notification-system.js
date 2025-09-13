/**
 * South Park Facebook Profiles - Notification System
 * Manages character notifications, breaking news, and episode-based updates
 */

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.notificationId = 0;
        this.subscribers = new Set();
        this.notificationQueue = [];
        this.isProcessing = false;
        this.characterNotifications = new Map();
        this.episodeNotifications = new Map();
        this.initializeNotificationTypes();
        this.startNotificationService();
    }

    initializeNotificationTypes() {
        this.notificationTypes = {
            CHARACTER_POST: 'character_post',
            CHARACTER_INTERACTION: 'character_interaction',
            EPISODE_REFERENCE: 'episode_reference',
            BREAKING_NEWS: 'breaking_news',
            BIRTHDAY: 'birthday',
            ACHIEVEMENT: 'achievement',
            RELATIONSHIP_UPDATE: 'relationship_update',
            BUSINESS_UPDATE: 'business_update',
            SCHOOL_NEWS: 'school_news',
            TOWN_ALERT: 'town_alert'
        };

        // Character-specific notification templates
        this.characterTemplates = {
            cartman: {
                business_update: [
                    "💰 BREAKING: Cartman Enterprises™ announces new revolutionary product!",
                    "🚨 ATTENTION: Eric Cartman has a new get-rich-quick scheme!",
                    "💎 EXCLUSIVE: Cartman's latest business venture promises 500% returns!"
                ],
                achievement: [
                    "🏆 Eric Cartman declared himself 'Winner of Everything' today",
                    "👑 Cartman crowned himself 'Supreme Leader' of something",
                    "🎯 Eric achieved his goal of annoying Kyle for 24 hours straight"
                ],
                relationship_update: [
                    "💔 Cartman and Kyle's feud reaches new levels of pettiness",
                    "😤 Eric unfriended Kyle AGAIN for the 47th time this month",
                    "🤝 Cartman briefly considered friendship with Kyle (lasted 3 minutes)"
                ]
            },
            kyle: {
                school_news: [
                    "📚 Kyle Broflovski starts petition for better school lunches",
                    "✊ Kyle organizes study group to help struggling classmates",
                    "🎓 Kyle wins academic achievement award (again)"
                ],
                achievement: [
                    "🌟 Kyle successfully argues another moral point",
                    "📖 Kyle reads entire library section on environmental science",
                    "⚖️ Kyle mediates playground dispute with diplomatic success"
                ]
            },
            stan: {
                relationship_update: [
                    "💕 Stan and Wendy are officially back together",
                    "💔 Stan and Wendy take another 'break'",
                    "🤷‍♂️ Stan confused about relationship status with Wendy"
                ],
                town_alert: [
                    "🏈 Stan leads football team to minor victory",
                    "🎸 Stan's band 'Moop' releases new song about confusion",
                    "😐 Stan expresses moderate opinion about town crisis"
                ]
            },
            kenny: {
                breaking_news: [
                    "💀 Kenny McCormick died today (cause: mysterious)",
                    "👻 Kenny McCormick mysteriously returned from the dead",
                    "🎭 Kenny seen at school acting like nothing happened"
                ],
                achievement: [
                    "🦸‍♂️ Mysterion saves the day (identity still unknown)",
                    "💪 Kenny survives entire day without dying",
                    "🎯 Kenny successfully translates muffled joke to friends"
                ]
            },
            randy: {
                business_update: [
                    "🌿 Tegridy Farms announces new strain with 'maximum tegridy'",
                    "🚀 Randy Marsh pivots Tegridy Farms business model again",
                    "🌟 Randy discovers revolutionary farming technique"
                ],
                breaking_news: [
                    "🔥 Randy Marsh declares himself expert in trending topic",
                    "🎯 Randy's new obsession causes neighborhood concern",
                    "📢 Randy holds press conference about his latest discovery"
                ]
            },
            butters: {
                achievement: [
                    "🌈 Butters helps lost puppy find way home",
                    "😊 Butters spreads joy at local community center",
                    "🌟 Butters gets ungrounded for exactly 3 hours"
                ],
                breaking_news: [
                    "😇 Butters accidentally saves the day through pure innocence",
                    "🦋 Butters starts butterfly conservation program",
                    "💝 Butters organizes surprise party for unpopular kid"
                ]
            },
            tweek: {
                town_alert: [
                    "☕ ANXIETY ALERT: Tweek senses impending doom (Tuesday)",
                    "😰 Tweek predicts disaster based on coffee grounds",
                    "⚠️ Tweek's stress levels indicate possible crisis"
                ]
            },
            craig: {
                relationship_update: [
                    "💙 Craig shows rare emotion supporting Tweek",
                    "🖕 Craig flips off three different people today",
                    "🤷‍♂️ Craig doesn't care about latest town drama"
                ]
            },
            wendy: {
                school_news: [
                    "🏛️ Student President Wendy implements new policy",
                    "✊ Wendy organizes protest for social justice cause",
                    "📢 Wendy delivers passionate speech about student rights"
                ]
            },
            jimmy: {
                achievement: [
                    "🎤 Jimmy's comedy show sells out (again)",
                    "🌟 Jimmy wins Special Olympics gold medal",
                    "😂 Jimmy's new joke goes viral at school"
                ]
            },
            timmy: {
                achievement: [
                    "🏁 TIMMY! (Translation: Timmy wins wheelchair race)",
                    "🎭 TIMMY! (Timmy's comedy partnership with Jimmy grows)",
                    "👍 TIMMEH! (Timmy spreads positivity around school)"
                ]
            }
        };

        // Episode-based notifications
        this.episodeNotificationTemplates = {
            tegridy_farms: [
                "🌿 Tegridy Farms update: Randy discovers new meaning of 'tegridy'",
                "🚨 Breaking: Tegridy Farms faces new challenge to business model"
            ],
            pc_principal: [
                "💪 PC Principal announces new sensitivity training",
                "🎯 PC Principal addresses microaggression in cafeteria"
            ],
            memberberries: [
                "🍇 Citizens report strange nostalgic feelings",
                "📺 Member Berries spotted in local grocery store"
            ]
        };
    }

    startNotificationService() {
        // Process notifications every 5 seconds
        setInterval(() => {
            if (!this.isProcessing && this.notificationQueue.length > 0) {
                this.processNextNotification();
            }
        }, 5000);

        // Generate random notifications
        setInterval(() => {
            this.generateRandomNotification();
        }, 30000); // Every 30 seconds

        // Generate episode-based notifications
        setInterval(() => {
            if (window.episodeDatabase) {
                this.generateEpisodeNotification();
            }
        }, 60000); // Every minute
    }

    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    notify(notification) {
        this.notifications.unshift(notification);
        
        // Keep only last 50 notifications
        if (this.notifications.length > 50) {
            this.notifications = this.notifications.slice(0, 50);
        }

        // Notify all subscribers
        this.subscribers.forEach(callback => {
            try {
                callback(notification);
            } catch (error) {
                console.error('Notification callback error:', error);
            }
        });

        return notification;
    }

    createNotification(type, character, title, message, metadata = {}) {
        const notification = {
            id: ++this.notificationId,
            type,
            character,
            title,
            message,
            timestamp: new Date().toISOString(),
            read: false,
            metadata,
            priority: metadata.priority || 'normal'
        };

        return this.notify(notification);
    }

    generateRandomNotification() {
        const characters = ['cartman', 'kyle', 'stan', 'kenny', 'randy', 'butters', 'tweek', 'craig', 'wendy', 'jimmy', 'timmy'];
        const character = characters[Math.floor(Math.random() * characters.length)];
        
        const templates = this.characterTemplates[character];
        if (!templates) return;

        const typeKeys = Object.keys(templates);
        const randomType = typeKeys[Math.floor(Math.random() * typeKeys.length)];
        const messages = templates[randomType];
        const message = messages[Math.floor(Math.random() * messages.length)];

        this.createNotification(
            this.notificationTypes[randomType.toUpperCase()],
            character,
            `${character.charAt(0).toUpperCase() + character.slice(1)} Update`,
            message,
            {
                source: 'auto_generated',
                priority: randomType === 'breaking_news' ? 'high' : 'normal'
            }
        );
    }

    generateEpisodeNotification() {
        if (!window.episodeDatabase) return;

        const characters = ['cartman', 'kyle', 'stan', 'kenny', 'randy'];
        const character = characters[Math.floor(Math.random() * characters.length)];
        
        const episodePost = window.episodeDatabase.generateEpisodeBasedPost(character);
        if (episodePost) {
            this.createNotification(
                this.notificationTypes.EPISODE_REFERENCE,
                character,
                `${character.charAt(0).toUpperCase() + character.slice(1)} remembers`,
                episodePost.content,
                {
                    episodeId: episodePost.episodeId,
                    episodeTitle: episodePost.episodeReference,
                    themes: episodePost.themes,
                    source: 'episode_database'
                }
            );
        }
    }

    generateBreakingNews(event, characters = []) {
        const newsTemplates = [
            `🚨 BREAKING: ${event} shakes South Park community!`,
            `📺 NEWS ALERT: Local incident involving ${event}`,
            `⚡ LIVE: South Park residents react to ${event}`,
            `🗞️ HEADLINE: ${event} causes stir in quiet mountain town`
        ];

        const template = newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
        
        this.createNotification(
            this.notificationTypes.BREAKING_NEWS,
            'news',
            'South Park News',
            template,
            {
                event,
                characters,
                priority: 'high'
            }
        );
    }

    generateCharacterInteraction(char1, char2, interaction) {
        const interactionTemplates = {
            argument: `💥 ${char1} and ${char2} are having an epic argument!`,
            friendship: `🤝 ${char1} and ${char2} become unlikely friends`,
            collaboration: `🤜🤛 ${char1} and ${char2} team up for new project`,
            rivalry: `⚔️ ${char1} vs ${char2}: The rivalry continues`
        };

        const message = interactionTemplates[interaction] || `${char1} and ${char2} interact`;

        this.createNotification(
            this.notificationTypes.CHARACTER_INTERACTION,
            char1,
            'Character Drama',
            message,
            {
                characters: [char1, char2],
                interaction_type: interaction
            }
        );
    }

    addToQueue(notification) {
        this.notificationQueue.push(notification);
    }

    processNextNotification() {
        if (this.notificationQueue.length === 0) return;

        this.isProcessing = true;
        const notification = this.notificationQueue.shift();
        
        // Simulate processing time
        setTimeout(() => {
            this.notify(notification);
            this.isProcessing = false;
        }, 1000);
    }

    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
        }
    }

    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
    }

    getUnreadCount() {
        return this.notifications.filter(n => !n.read).length;
    }

    getNotificationsByCharacter(character) {
        return this.notifications.filter(n => n.character === character);
    }

    getNotificationsByType(type) {
        return this.notifications.filter(n => n.type === type);
    }

    getRecentNotifications(limit = 10) {
        return this.notifications.slice(0, limit);
    }

    clearNotifications() {
        this.notifications = [];
    }

    // UI Rendering Methods
    renderNotificationBell() {
        const unreadCount = this.getUnreadCount();
        
        return `
            <div class="notification-bell" onclick="toggleNotificationPanel()">
                🔔
                ${unreadCount > 0 ? `<span class="notification-badge">${unreadCount}</span>` : ''}
            </div>
        `;
    }

    renderNotificationPanel() {
        const recent = this.getRecentNotifications(15);
        
        return `
            <div class="notification-panel">
                <div class="notification-header">
                    <h3>🔔 Notifications</h3>
                    <button onclick="markAllNotificationsRead()">Mark all read</button>
                </div>
                <div class="notification-list">
                    ${recent.map(notification => this.renderNotificationItem(notification)).join('')}
                </div>
                ${recent.length === 0 ? '<div class="no-notifications">No notifications yet!</div>' : ''}
            </div>
        `;
    }

    renderNotificationItem(notification) {
        const timeAgo = this.getTimeAgo(new Date(notification.timestamp));
        const characterIcon = this.getCharacterIcon(notification.character);
        const priorityClass = notification.priority === 'high' ? 'priority-high' : '';
        const unreadClass = !notification.read ? 'unread' : '';

        return `
            <div class="notification-item ${priorityClass} ${unreadClass}" 
                 onclick="selectNotification(${notification.id})">
                <div class="notification-icon">${characterIcon}</div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${timeAgo}</div>
                </div>
                ${!notification.read ? '<div class="unread-indicator">●</div>' : ''}
            </div>
        `;
    }

    getCharacterIcon(character) {
        const icons = {
            cartman: '👑',
            kyle: '🎓',
            stan: '🏈',
            kenny: '💀',
            randy: '🌿',
            butters: '😇',
            tweek: '☕',
            craig: '🖕',
            wendy: '📢',
            jimmy: '🎤',
            timmy: '🏁',
            news: '📺'
        };
        return icons[character] || '👤';
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - timestamp) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    }
}

// Global Functions for UI Integration
function toggleNotificationPanel() {
    const existingPanel = document.querySelector('.notification-panel');
    if (existingPanel) {
        existingPanel.remove();
    } else {
        const panel = document.createElement('div');
        panel.innerHTML = window.notificationSystem.renderNotificationPanel();
        panel.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            width: 350px;
            max-height: 400px;
            overflow-y: auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            padding: 0;
        `;
        document.body.appendChild(panel);
    }
}

function markAllNotificationsRead() {
    window.notificationSystem.markAllAsRead();
    updateNotificationUI();
}

function selectNotification(notificationId) {
    window.notificationSystem.markAsRead(notificationId);
    updateNotificationUI();
}

function updateNotificationUI() {
    const bell = document.querySelector('.notification-bell');
    if (bell) {
        bell.innerHTML = window.notificationSystem.renderNotificationBell().replace(/<[^>]*>/g, function(match) {
            return match.includes('notification-bell') ? '' : match;
        });
    }
    
    const panel = document.querySelector('.notification-panel');
    if (panel) {
        panel.innerHTML = window.notificationSystem.renderNotificationPanel().replace(/<[^>]*notification-panel[^>]*>/g, '');
    }
}

// Create global instance
window.notificationSystem = new NotificationSystem();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationSystem;
}
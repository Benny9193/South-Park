/**
 * South Park News Network (SPNN)
 * Centralized news system for major South Park events affecting all characters
 */

class SouthParkNewsNetwork {
    constructor() {
        this.currentEvents = [];
        this.newsHistory = [];
        this.breakingNewsActive = false;
        this.weatherData = {};
        this.communityEvents = [];

        this.initializeNewsSystem();
        this.loadCurrentEvents();
        this.setupBreakingNewsSystem();
        this.initializeWeatherSystem();
        this.createNewsWidget();
    }

    initializeNewsSystem() {
        // Define news categories and their impact on different characters
        this.newsCategories = {
            'school': {
                name: 'South Park Elementary',
                icon: '🏫',
                affectedCharacters: ['stan', 'kyle', 'cartman', 'kenny', 'butters', 'tweek', 'craig', 'wendy', 'bebe', 'clyde', 'token', 'jimmy', 'timmy'],
                color: '#2196F3'
            },
            'town': {
                name: 'Town Events',
                icon: '🏘️',
                affectedCharacters: ['all'],
                color: '#4CAF50'
            },
            'family': {
                name: 'Family Drama',
                icon: '👨‍👩‍👧‍👦',
                affectedCharacters: ['variable'], // depends on specific family
                color: '#FF5722'
            },
            'business': {
                name: 'Local Business',
                icon: '💼',
                affectedCharacters: ['randy', 'gerald', 'mr_garrison', 'chef'],
                color: '#FF9800'
            },
            'celebrity': {
                name: 'Celebrity Visit',
                icon: '⭐',
                affectedCharacters: ['all'],
                color: '#E91E63'
            },
            'disaster': {
                name: 'South Park Crisis',
                icon: '⚠️',
                affectedCharacters: ['all'],
                color: '#F44336'
            }
        };
    }

    loadCurrentEvents() {
        // Load current active events in South Park
        this.currentEvents = [
            {
                id: 'soap_craze_2024',
                title: 'Local Dad Discovers Artisanal Soap Making',
                description: 'Randy Marsh claims to have revolutionized soap industry with "Tegridy Eucalyptus" blend',
                category: 'business',
                severity: 'low',
                timestamp: new Date('2024-01-15T10:30:00'),
                duration: '2-3 weeks',
                affectedCharacters: ['randy', 'sharon', 'stan'],
                status: 'ongoing',
                updates: [
                    { time: '2 hours ago', text: 'Randy orders $847 worth of soap equipment' },
                    { time: '1 day ago', text: 'Sharon hides credit cards' },
                    { time: '2 days ago', text: 'Stan apologizes to school for dad\'s behavior' }
                ]
            },
            {
                id: 'gnome_sighting_winter',
                title: 'Increased Underpants Gnome Activity Reported',
                description: 'Multiple residents report missing underwear, gnome sightings up 300%',
                category: 'town',
                severity: 'medium',
                timestamp: new Date('2024-01-10T20:15:00'),
                duration: 'ongoing',
                affectedCharacters: ['tweek', 'butters', 'all'],
                status: 'developing',
                updates: [
                    { time: '6 hours ago', text: 'Tweek sets up gnome detection system' },
                    { time: '1 day ago', text: 'Mayor announces Gnome Task Force' },
                    { time: '3 days ago', text: 'First confirmed gnome sighting at Token\'s house' }
                ]
            },
            {
                id: 'mackey_mmkay_record',
                title: 'Mr. Mackey Sets New "Mmkay" Usage Record',
                description: 'School counselor achieves 47 "mmkays" in single assembly, school board investigating',
                category: 'school',
                severity: 'low',
                timestamp: new Date('2024-01-12T09:00:00'),
                duration: '1 week',
                affectedCharacters: ['mr_mackey', 'stan', 'kyle', 'cartman', 'kenny'],
                status: 'concluded',
                updates: [
                    { time: '2 days ago', text: 'Students organize "Mmkay Counter" app' },
                    { time: '3 days ago', text: 'Assembly reaches critical mmkay saturation' },
                    { time: '4 days ago', text: 'Mr. Mackey begins anxiety awareness week' }
                ]
            },
            {
                id: 'cartman_business_venture',
                title: 'New Cartman Enterprise Promises "Premium Air"',
                description: 'Local entrepreneur Eric Cartman launches bottled air business, charging $5 per bottle',
                category: 'business',
                severity: 'low',
                timestamp: new Date('2024-01-14T12:00:00'),
                duration: '1-2 weeks',
                affectedCharacters: ['cartman', 'kyle', 'butters'],
                status: 'ongoing',
                updates: [
                    { time: '4 hours ago', text: 'Kyle files complaint with Better Business Bureau' },
                    { time: '1 day ago', text: 'Butters becomes "business partner"' },
                    { time: '2 days ago', text: 'First premium air bottles hit market' }
                ]
            }
        ];
    }

    setupBreakingNewsSystem() {
        // Set up system for breaking news alerts
        this.breakingNewsQueue = [];

        // Simulate breaking news events
        setInterval(() => {
            if (Math.random() > 0.85) { // 15% chance every interval
                this.generateBreakingNews();
            }
        }, 180000); // Check every 3 minutes
    }

    generateBreakingNews() {
        const breakingNewsTemplates = [
            {
                title: 'BREAKING: Cartman Declares Himself "CEO of Everything"',
                description: 'Local fourth-grader issues executive orders, demands respect for authoritah',
                category: 'school',
                severity: 'medium',
                affectedCharacters: ['cartman', 'kyle', 'stan', 'kenny']
            },
            {
                title: 'ALERT: Randy Marsh Discovers New Obsession',
                description: 'Tegridy Farms owner abandons previous hobby, family braces for impact',
                category: 'family',
                severity: 'low',
                affectedCharacters: ['randy', 'sharon', 'stan']
            },
            {
                title: 'URGENT: Coffee Shop Runs Out of Coffee',
                description: 'Tweek Tweak enters panic mode, town-wide caffeine shortage declared',
                category: 'disaster',
                severity: 'high',
                affectedCharacters: ['tweek', 'craig', 'all']
            },
            {
                title: 'NEWS FLASH: Butters Grounded for Smiling',
                description: 'Local boy\'s excessive happiness deemed "suspicious" by parents',
                category: 'family',
                severity: 'low',
                affectedCharacters: ['butters']
            },
            {
                title: 'BREAKING: Mr. Mackey\'s "Mmkay" Counter Breaks',
                description: 'School counselor exceeds daily mmkay limit, guidance system overloads',
                category: 'school',
                severity: 'medium',
                affectedCharacters: ['mr_mackey', 'all']
            }
        ];

        const randomNews = breakingNewsTemplates[Math.floor(Math.random() * breakingNewsTemplates.length)];
        const breakingNews = {
            id: `breaking_${Date.now()}`,
            ...randomNews,
            timestamp: new Date(),
            status: 'breaking',
            duration: 'developing',
            updates: [
                { time: 'just now', text: 'Story developing...' }
            ]
        };

        this.currentEvents.unshift(breakingNews);
        this.showBreakingNewsAlert(breakingNews);
        this.updateNewsWidget();
    }

    initializeWeatherSystem() {
        // South Park weather system affecting character moods
        const weatherConditions = [
            { condition: 'sunny', temp: '45°F', mood: 'positive', icon: '☀️' },
            { condition: 'snowing', temp: '12°F', mood: 'neutral', icon: '❄️' },
            { condition: 'blizzard', temp: '-5°F', mood: 'negative', icon: '🌨️' },
            { condition: 'cloudy', temp: '32°F', mood: 'neutral', icon: '☁️' }
        ];

        this.weatherData = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

        // Update weather every hour
        setInterval(() => {
            this.weatherData = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
            this.updateNewsWidget();
        }, 3600000);
    }

    createNewsWidget() {
        // Create floating news widget
        const newsWidget = document.createElement('div');
        newsWidget.id = 'spnn-widget';
        newsWidget.className = 'spnn-widget';
        newsWidget.innerHTML = `
            <div class="spnn-header" onclick="window.spnn.toggleWidget()">
                <div class="spnn-logo">📺 SPNN</div>
                <div class="spnn-toggle">−</div>
            </div>
            <div class="spnn-content" id="spnn-content">
                <div class="spnn-weather">
                    <div class="weather-display">
                        <span class="weather-icon">${this.weatherData.icon}</span>
                        <span class="weather-temp">${this.weatherData.temp}</span>
                        <span class="weather-condition">${this.weatherData.condition}</span>
                    </div>
                </div>
                <div class="spnn-news-feed" id="spnn-news-feed">
                    ${this.generateNewsFeedHTML()}
                </div>
            </div>
        `;

        document.body.appendChild(newsWidget);
        this.addNewsStyles();

        // Auto-update news feed
        setInterval(() => {
            this.updateNewsWidget();
        }, 30000); // Update every 30 seconds
    }

    generateNewsFeedHTML() {
        return this.currentEvents.slice(0, 5).map(event => `
            <div class="news-item ${event.status}" data-event-id="${event.id}">
                <div class="news-header">
                    <span class="news-icon">${this.newsCategories[event.category].icon}</span>
                    <span class="news-category">${this.newsCategories[event.category].name}</span>
                    <span class="news-time">${this.getTimeAgo(event.timestamp)}</span>
                </div>
                <div class="news-title">${event.title}</div>
                <div class="news-description">${event.description}</div>
                <div class="news-affected">
                    Affects: ${this.getAffectedCharactersText(event.affectedCharacters)}
                </div>
                ${event.status === 'ongoing' ? `
                    <div class="news-updates">
                        <div class="latest-update">
                            <strong>Latest:</strong> ${event.updates[0].text}
                        </div>
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    getAffectedCharactersText(characters) {
        if (characters.includes('all')) return 'All residents';
        if (characters.length > 3) return `${characters.length} characters`;
        return characters.map(id => this.getCharacterName(id)).join(', ');
    }

    getCharacterName(id) {
        const nameMap = {
            'stan': 'Stan', 'kyle': 'Kyle', 'cartman': 'Cartman', 'kenny': 'Kenny',
            'butters': 'Butters', 'tweek': 'Tweek', 'craig': 'Craig', 'randy': 'Randy',
            'sharon': 'Sharon', 'mr_mackey': 'Mr. Mackey', 'mr_garrison': 'Mr. Garrison'
        };
        return nameMap[id] || id;
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }

    showBreakingNewsAlert(news) {
        const alert = document.createElement('div');
        alert.className = 'breaking-news-alert';
        alert.innerHTML = `
            <div class="breaking-news-content">
                <div class="breaking-header">
                    <span class="breaking-badge">BREAKING</span>
                    <span class="breaking-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</span>
                </div>
                <div class="breaking-title">${news.title}</div>
                <div class="breaking-description">${news.description}</div>
            </div>
        `;

        document.body.appendChild(alert);

        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 8000);
    }

    updateNewsWidget() {
        const newsFeed = document.getElementById('spnn-news-feed');
        if (newsFeed) {
            newsFeed.innerHTML = this.generateNewsFeedHTML();
        }
    }

    toggleWidget() {
        const content = document.getElementById('spnn-content');
        const toggle = document.querySelector('.spnn-toggle');

        if (content.style.display === 'none') {
            content.style.display = 'block';
            toggle.textContent = '−';
        } else {
            content.style.display = 'none';
            toggle.textContent = '+';
        }
    }

    addNewsStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .spnn-widget {
                position: fixed;
                top: 20px;
                left: 20px;
                width: 320px;
                background: white;
                border: 2px solid #1877f2;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                max-height: 500px;
                overflow: hidden;
            }

            .spnn-header {
                background: linear-gradient(135deg, #1877f2, #166fe5);
                color: white;
                padding: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                user-select: none;
            }

            .spnn-logo {
                font-weight: bold;
                font-size: 16px;
            }

            .spnn-toggle {
                font-size: 18px;
                font-weight: bold;
            }

            .spnn-content {
                max-height: 440px;
                overflow-y: auto;
            }

            .spnn-weather {
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
                padding: 10px 12px;
                text-align: center;
            }

            .weather-display {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }

            .weather-icon {
                font-size: 20px;
            }

            .weather-temp {
                font-weight: bold;
                font-size: 16px;
            }

            .weather-condition {
                text-transform: capitalize;
                opacity: 0.9;
            }

            .spnn-news-feed {
                padding: 8px;
            }

            .news-item {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 8px;
                transition: all 0.2s ease;
            }

            .news-item:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .news-item.breaking {
                border-color: #dc3545;
                background: linear-gradient(135deg, #ffebee, #fce4ec);
            }

            .news-item.ongoing {
                border-color: #ff9800;
                background: linear-gradient(135deg, #fff3e0, #fef7f0);
            }

            .news-header {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 6px;
                font-size: 12px;
                color: #666;
            }

            .news-icon {
                font-size: 16px;
            }

            .news-category {
                font-weight: 600;
                color: #1877f2;
            }

            .news-time {
                margin-left: auto;
                opacity: 0.7;
            }

            .news-title {
                font-weight: bold;
                color: #333;
                margin-bottom: 4px;
                line-height: 1.3;
            }

            .news-description {
                color: #555;
                font-size: 13px;
                line-height: 1.4;
                margin-bottom: 6px;
            }

            .news-affected {
                font-size: 12px;
                color: #666;
                font-style: italic;
                margin-bottom: 6px;
            }

            .news-updates {
                background: rgba(24, 119, 242, 0.1);
                padding: 6px 8px;
                border-radius: 4px;
                font-size: 12px;
            }

            .latest-update {
                color: #1877f2;
            }

            .breaking-news-alert {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #dc3545, #c82333);
                color: white;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(220, 53, 69, 0.4);
                z-index: 10001;
                max-width: 400px;
                animation: breakingNewsAppear 0.5s ease-out;
            }

            .breaking-news-content {
                padding: 20px;
            }

            .breaking-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }

            .breaking-badge {
                background: rgba(255,255,255,0.2);
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: bold;
                animation: pulse 1s infinite;
            }

            .breaking-close {
                cursor: pointer;
                font-size: 20px;
                font-weight: bold;
                opacity: 0.8;
            }

            .breaking-close:hover {
                opacity: 1;
            }

            .breaking-title {
                font-weight: bold;
                font-size: 16px;
                margin-bottom: 8px;
                line-height: 1.3;
            }

            .breaking-description {
                font-size: 14px;
                opacity: 0.9;
                line-height: 1.4;
            }

            @keyframes breakingNewsAppear {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }

            @media (max-width: 768px) {
                .spnn-widget {
                    position: relative;
                    width: 100%;
                    margin: 10px 0;
                    top: auto;
                    left: auto;
                }

                .breaking-news-alert {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    right: 20px;
                    transform: none;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Public API methods
    addEvent(eventData) {
        this.currentEvents.unshift({
            id: `custom_${Date.now()}`,
            timestamp: new Date(),
            status: 'ongoing',
            ...eventData
        });
        this.updateNewsWidget();
    }

    init() {
        console.log('South Park News Network initialized with', this.currentEvents.length, 'active events');
    }
}

// Initialize SPNN when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.spnn === 'undefined') {
        window.spnn = new SouthParkNewsNetwork();
        window.spnn.init();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SouthParkNewsNetwork;
}
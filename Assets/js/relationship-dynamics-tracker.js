/**
 * Universal Relationship Dynamics Tracker
 * Tracks and visualizes relationships between all South Park characters
 */

class RelationshipDynamicsTracker {
    constructor() {
        this.characters = new Map();
        this.relationships = new Map();
        this.relationshipHistory = [];
        this.conflictLog = [];
        this.currentDramas = [];

        this.initializeCharacters();
        this.initializeRelationships();
        this.setupRelationshipTracking();
        this.createRelationshipWidget();
        this.startDynamicUpdates();
    }

    initializeCharacters() {
        const characterDatabase = [
            {
                id: 'stan',
                name: 'Stan Marsh',
                avatar: 'SM',
                color: '#2196F3',
                personality: ['loyal', 'moral', 'leader'],
                family: ['randy', 'sharon'],
                grade: 4
            },
            {
                id: 'kyle',
                name: 'Kyle Broflovski',
                avatar: 'KB',
                color: '#4CAF50',
                personality: ['intelligent', 'passionate', 'stubborn'],
                family: ['gerald', 'sheila'],
                grade: 4
            },
            {
                id: 'cartman',
                name: 'Eric Cartman',
                avatar: 'EC',
                color: '#FF5722',
                personality: ['manipulative', 'selfish', 'cunning'],
                family: ['liane'],
                grade: 4
            },
            {
                id: 'kenny',
                name: 'Kenny McCormick',
                avatar: 'KM',
                color: '#FF9800',
                personality: ['loyal', 'poor', 'mysterious'],
                family: [],
                grade: 4
            },
            {
                id: 'butters',
                name: 'Butters Stotch',
                avatar: 'BS',
                color: '#FFEB3B',
                personality: ['innocent', 'optimistic', 'naive'],
                family: [],
                grade: 4
            },
            {
                id: 'tweek',
                name: 'Tweek Tweak',
                avatar: 'TT',
                color: '#8BC34A',
                personality: ['anxious', 'paranoid', 'energetic'],
                family: [],
                grade: 4
            },
            {
                id: 'craig',
                name: 'Craig Tucker',
                avatar: 'CT',
                color: '#607D8B',
                personality: ['calm', 'monotone', 'logical'],
                family: [],
                grade: 4
            },
            {
                id: 'wendy',
                name: 'Wendy Testaburger',
                avatar: 'WT',
                color: '#E91E63',
                personality: ['activist', 'intelligent', 'strong'],
                family: [],
                grade: 4
            },
            {
                id: 'randy',
                name: 'Randy Marsh',
                avatar: 'RM',
                color: '#795548',
                personality: ['obsessive', 'impulsive', 'expert'],
                family: ['stan', 'sharon'],
                grade: 'adult'
            },
            {
                id: 'sharon',
                name: 'Sharon Marsh',
                avatar: 'SM',
                color: '#9C27B0',
                personality: ['patient', 'realistic', 'long-suffering'],
                family: ['stan', 'randy'],
                grade: 'adult'
            },
            {
                id: 'mr_mackey',
                name: 'Mr. Mackey',
                avatar: 'MM',
                color: '#4CAF50',
                personality: ['counselor', 'caring', 'mmkay'],
                family: [],
                grade: 'adult'
            }
        ];

        characterDatabase.forEach(char => {
            this.characters.set(char.id, char);
        });
    }

    initializeRelationships() {
        // Define all character relationships with dynamic tracking
        const relationshipData = [
            // Main friend group
            {
                id: 'stan_kyle',
                characters: ['stan', 'kyle'],
                type: 'best_friends',
                strength: 95,
                status: 'stable',
                history: ['childhood friends', 'adventures together', 'moral support'],
                conflicts: 0,
                lastInteraction: new Date(Date.now() - 3600000), // 1 hour ago
                traits: ['loyal', 'supportive', 'understanding']
            },
            {
                id: 'stan_wendy',
                characters: ['stan', 'wendy'],
                type: 'romantic',
                strength: 75,
                status: 'on_and_off',
                history: ['elementary romance', 'breakups', 'makeups'],
                conflicts: 3,
                lastInteraction: new Date(Date.now() - 86400000), // 1 day ago
                traits: ['complicated', 'young love', 'dramatic']
            },
            {
                id: 'cartman_kyle',
                characters: ['cartman', 'kyle'],
                type: 'enemies',
                strength: 90,
                status: 'hostile',
                history: ['constant conflict', 'ideological differences', 'personal attacks'],
                conflicts: 127,
                lastInteraction: new Date(Date.now() - 1800000), // 30 min ago
                traits: ['antagonistic', 'passionate', 'irreconcilable']
            },
            {
                id: 'tweek_craig',
                characters: ['tweek', 'craig'],
                type: 'romantic',
                strength: 85,
                status: 'stable',
                history: ['yaoi fan shipping', 'became real', 'complementary'],
                conflicts: 1,
                lastInteraction: new Date(Date.now() - 1800000), // 30 min ago
                traits: ['calming', 'opposite personalities', 'supportive']
            },
            {
                id: 'butters_cartman',
                characters: ['butters', 'cartman'],
                type: 'exploitative',
                strength: 60,
                status: 'one_sided',
                history: ['constant manipulation', 'schemes', 'false friendship'],
                conflicts: 8,
                lastInteraction: new Date(Date.now() - 7200000), // 2 hours ago
                traits: ['manipulative', 'innocent victim', 'business partners']
            },
            // Family relationships
            {
                id: 'stan_randy',
                characters: ['stan', 'randy'],
                type: 'family',
                strength: 70,
                status: 'embarrassed',
                history: ['father-son', 'constant embarrassment', 'love despite issues'],
                conflicts: 15,
                lastInteraction: new Date(Date.now() - 3600000), // 1 hour ago
                traits: ['embarrassing parent', 'unconditional love', 'generational gap']
            },
            {
                id: 'stan_sharon',
                characters: ['stan', 'sharon'],
                type: 'family',
                strength: 85,
                status: 'supportive',
                history: ['mother-son', 'understanding', 'stable support'],
                conflicts: 2,
                lastInteraction: new Date(Date.now() - 5400000), // 1.5 hours ago
                traits: ['maternal love', 'understanding', 'protective']
            },
            {
                id: 'randy_sharon',
                characters: ['randy', 'sharon'],
                type: 'marriage',
                strength: 65,
                status: 'strained',
                history: ['married couple', 'Randy\'s obsessions', 'long-suffering wife'],
                conflicts: 23,
                lastInteraction: new Date(Date.now() - 900000), // 15 min ago
                traits: ['long-suffering', 'patient wife', 'marital strain']
            },
            // School relationships
            {
                id: 'all_mr_mackey',
                characters: ['stan', 'kyle', 'cartman', 'kenny', 'mr_mackey'],
                type: 'authority',
                strength: 50,
                status: 'professional',
                history: ['school counselor', 'guidance', 'mmkay'],
                conflicts: 5,
                lastInteraction: new Date(Date.now() - 14400000), // 4 hours ago
                traits: ['guidance', 'professional care', 'mmkay']
            }
        ];

        relationshipData.forEach(rel => {
            this.relationships.set(rel.id, rel);
        });
    }

    setupRelationshipTracking() {
        // Monitor for relationship-affecting events
        this.relationshipEvents = [
            'mention', 'interaction', 'conflict', 'support', 'business_deal', 'prank', 'help'
        ];

        // Track interactions from other systems
        document.addEventListener('character_interaction', (event) => {
            this.updateRelationshipFromEvent(event.detail);
        });
    }

    createRelationshipWidget() {
        const widget = document.createElement('div');
        widget.id = 'relationship-tracker';
        widget.className = 'relationship-tracker';
        widget.innerHTML = `
            <div class="relationship-header" onclick="window.relationshipTracker.toggleWidget()">
                <div class="relationship-logo">💕 Relationships</div>
                <div class="relationship-toggle">−</div>
            </div>
            <div class="relationship-content" id="relationship-content">
                <div class="relationship-tabs">
                    <button class="tab-btn active" onclick="window.relationshipTracker.showTab('current')">Current</button>
                    <button class="tab-btn" onclick="window.relationshipTracker.showTab('map')">Map</button>
                    <button class="tab-btn" onclick="window.relationshipTracker.showTab('drama')">Drama</button>
                </div>
                <div class="relationship-body">
                    <div id="current-relationships" class="tab-content active">
                        ${this.generateCurrentRelationshipsHTML()}
                    </div>
                    <div id="relationship-map" class="tab-content">
                        ${this.generateRelationshipMapHTML()}
                    </div>
                    <div id="drama-log" class="tab-content">
                        ${this.generateDramaLogHTML()}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(widget);
        this.addRelationshipStyles();
        this.initializeRelationshipMap();
    }

    generateCurrentRelationshipsHTML() {
        const currentCharacter = this.getCurrentCharacterFromPage();
        const relevantRelationships = Array.from(this.relationships.values())
            .filter(rel => rel.characters.includes(currentCharacter))
            .sort((a, b) => b.strength - a.strength);

        if (relevantRelationships.length === 0) {
            return '<div class="no-relationships">No tracked relationships</div>';
        }

        return relevantRelationships.map(rel => {
            const otherCharacter = rel.characters.find(id => id !== currentCharacter);
            const character = this.characters.get(otherCharacter);
            const statusIcon = this.getStatusIcon(rel.status);
            const strengthBar = this.getStrengthBar(rel.strength);

            return `
                <div class="relationship-item ${rel.status}" data-relationship-id="${rel.id}">
                    <div class="relationship-character">
                        <div class="character-avatar" style="background-color: ${character.color}">
                            ${character.avatar}
                        </div>
                        <div class="character-info">
                            <div class="character-name">${character.name}</div>
                            <div class="relationship-type">${statusIcon} ${this.formatRelationType(rel.type)}</div>
                        </div>
                    </div>
                    <div class="relationship-details">
                        ${strengthBar}
                        <div class="relationship-status">Status: ${this.formatStatus(rel.status)}</div>
                        <div class="last-interaction">Last seen: ${this.getTimeAgo(rel.lastInteraction)}</div>
                        ${rel.conflicts > 0 ? `<div class="conflict-count">⚔️ ${rel.conflicts} conflicts</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    generateRelationshipMapHTML() {
        return `
            <div class="relationship-map-container">
                <div class="map-instructions">
                    Interactive relationship map showing connections between all characters
                </div>
                <canvas id="relationship-canvas" width="300" height="400"></canvas>
                <div class="map-legend">
                    <div class="legend-item">💙 Friends</div>
                    <div class="legend-item">❤️ Romance</div>
                    <div class="legend-item">⚔️ Enemies</div>
                    <div class="legend-item">👪 Family</div>
                </div>
            </div>
        `;
    }

    generateDramaLogHTML() {
        const recentDrama = this.generateRecentDrama();

        return `
            <div class="drama-log-container">
                <div class="drama-stats">
                    <div class="stat-item">
                        <div class="stat-value">${recentDrama.length}</div>
                        <div class="stat-label">Active Dramas</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${this.getTotalConflicts()}</div>
                        <div class="stat-label">Total Conflicts</div>
                    </div>
                </div>
                <div class="drama-feed">
                    ${recentDrama.map(drama => `
                        <div class="drama-item ${drama.severity}">
                            <div class="drama-icon">${drama.icon}</div>
                            <div class="drama-content">
                                <div class="drama-title">${drama.title}</div>
                                <div class="drama-description">${drama.description}</div>
                                <div class="drama-participants">
                                    ${drama.participants.map(p => `<span class="participant">${this.characters.get(p).name}</span>`).join(' vs ')}
                                </div>
                                <div class="drama-time">${this.getTimeAgo(drama.timestamp)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    initializeRelationshipMap() {
        // Initialize canvas-based relationship visualization
        setTimeout(() => {
            const canvas = document.getElementById('relationship-canvas');
            if (canvas) {
                this.drawRelationshipMap(canvas);
            }
        }, 100);
    }

    drawRelationshipMap(canvas) {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 120;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Get main characters for visualization
        const mainCharacters = ['stan', 'kyle', 'cartman', 'kenny', 'butters', 'tweek', 'craig', 'wendy'];
        const characterPositions = new Map();

        // Position characters in a circle
        mainCharacters.forEach((charId, index) => {
            const angle = (index / mainCharacters.length) * 2 * Math.PI;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            characterPositions.set(charId, { x, y });
        });

        // Draw relationship lines
        this.relationships.forEach(rel => {
            const [char1, char2] = rel.characters.slice(0, 2);
            const pos1 = characterPositions.get(char1);
            const pos2 = characterPositions.get(char2);

            if (pos1 && pos2) {
                ctx.beginPath();
                ctx.moveTo(pos1.x, pos1.y);
                ctx.lineTo(pos2.x, pos2.y);

                // Set line style based on relationship type
                switch (rel.type) {
                    case 'best_friends':
                        ctx.strokeStyle = '#2196F3';
                        ctx.lineWidth = 3;
                        break;
                    case 'romantic':
                        ctx.strokeStyle = '#E91E63';
                        ctx.lineWidth = 3;
                        break;
                    case 'enemies':
                        ctx.strokeStyle = '#F44336';
                        ctx.lineWidth = 2;
                        ctx.setLineDash([5, 5]);
                        break;
                    case 'family':
                        ctx.strokeStyle = '#4CAF50';
                        ctx.lineWidth = 2;
                        break;
                    default:
                        ctx.strokeStyle = '#999';
                        ctx.lineWidth = 1;
                }

                ctx.stroke();
                ctx.setLineDash([]); // Reset line dash
            }
        });

        // Draw character nodes
        characterPositions.forEach((pos, charId) => {
            const character = this.characters.get(charId);

            // Draw circle
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI);
            ctx.fillStyle = character.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw avatar text
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(character.avatar, pos.x, pos.y + 4);
        });
    }

    generateRecentDrama() {
        return [
            {
                id: 'cartman_kyle_feud',
                title: 'Cartman vs Kyle: Premium Air Dispute',
                description: 'Kyle files complaint against Cartman\'s air business',
                participants: ['cartman', 'kyle'],
                severity: 'high',
                icon: '⚔️',
                timestamp: new Date(Date.now() - 3600000)
            },
            {
                id: 'randy_soap_obsession',
                title: 'Randy\'s Soap Addiction Strains Marriage',
                description: 'Sharon hides credit cards as Randy orders more equipment',
                participants: ['randy', 'sharon'],
                severity: 'medium',
                icon: '💔',
                timestamp: new Date(Date.now() - 7200000)
            },
            {
                id: 'stan_embarrassment',
                title: 'Stan Mortified by Father\'s Behavior',
                description: 'Randy demonstrates soap making at school assembly',
                participants: ['stan', 'randy'],
                severity: 'medium',
                icon: '😱',
                timestamp: new Date(Date.now() - 10800000)
            }
        ];
    }

    // Utility methods
    getCurrentCharacterFromPage() {
        const title = document.title;
        for (let [id, character] of this.characters) {
            if (title.includes(character.name)) {
                return id;
            }
        }
        return 'stan'; // default
    }

    getStatusIcon(status) {
        const icons = {
            'stable': '💙',
            'strained': '⚠️',
            'hostile': '⚔️',
            'romantic': '❤️',
            'complicated': '💔',
            'supportive': '🤝',
            'professional': '👔',
            'on_and_off': '💕',
            'one_sided': '😔'
        };
        return icons[status] || '❓';
    }

    getStrengthBar(strength) {
        const width = Math.round((strength / 100) * 100);
        const color = strength > 70 ? '#4CAF50' : strength > 40 ? '#FF9800' : '#F44336';

        return `
            <div class="strength-bar">
                <div class="strength-fill" style="width: ${width}%; background: ${color}"></div>
                <div class="strength-text">${strength}%</div>
            </div>
        `;
    }

    formatRelationType(type) {
        const types = {
            'best_friends': 'Best Friends',
            'romantic': 'Romantic',
            'enemies': 'Enemies',
            'family': 'Family',
            'exploitative': 'Complicated',
            'marriage': 'Married',
            'authority': 'Student/Teacher'
        };
        return types[type] || type;
    }

    formatStatus(status) {
        return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    }

    getTotalConflicts() {
        return Array.from(this.relationships.values()).reduce((sum, rel) => sum + rel.conflicts, 0);
    }

    // Widget control methods
    toggleWidget() {
        const content = document.getElementById('relationship-content');
        const toggle = document.querySelector('.relationship-toggle');

        if (content.style.display === 'none') {
            content.style.display = 'block';
            toggle.textContent = '−';
        } else {
            content.style.display = 'none';
            toggle.textContent = '+';
        }
    }

    showTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        document.getElementById(`${tabName}-relationships`) &&
            document.getElementById(`${tabName}-relationships`).classList.add('active');
        document.getElementById(`relationship-${tabName}`) &&
            document.getElementById(`relationship-${tabName}`).classList.add('active');
        document.getElementById(`${tabName}-log`) &&
            document.getElementById(`${tabName}-log`).classList.add('active');

        event.target.classList.add('active');

        // Redraw map if map tab is selected
        if (tabName === 'map') {
            setTimeout(() => this.initializeRelationshipMap(), 100);
        }
    }

    startDynamicUpdates() {
        // Update relationships every 2 minutes
        setInterval(() => {
            this.updateRelationshipWidget();
        }, 120000);
    }

    updateRelationshipWidget() {
        const currentTab = document.querySelector('.tab-content.active');
        if (currentTab) {
            if (currentTab.id === 'current-relationships') {
                currentTab.innerHTML = this.generateCurrentRelationshipsHTML();
            } else if (currentTab.id === 'drama-log') {
                currentTab.innerHTML = this.generateDramaLogHTML();
            }
        }
    }

    addRelationshipStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .relationship-tracker {
                position: fixed;
                bottom: 20px;
                left: 20px;
                width: 350px;
                background: white;
                border: 2px solid #E91E63;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                max-height: 500px;
                overflow: hidden;
            }

            .relationship-header {
                background: linear-gradient(135deg, #E91E63, #C2185B);
                color: white;
                padding: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                user-select: none;
            }

            .relationship-logo {
                font-weight: bold;
                font-size: 16px;
            }

            .relationship-toggle {
                font-size: 18px;
                font-weight: bold;
            }

            .relationship-content {
                max-height: 440px;
                overflow-y: auto;
            }

            .relationship-tabs {
                display: flex;
                background: #f5f5f5;
                border-bottom: 1px solid #e0e0e0;
            }

            .tab-btn {
                flex: 1;
                padding: 10px;
                background: none;
                border: none;
                cursor: pointer;
                font-weight: 500;
                color: #666;
                transition: all 0.2s ease;
            }

            .tab-btn.active {
                background: white;
                color: #E91E63;
                border-bottom: 2px solid #E91E63;
            }

            .tab-btn:hover:not(.active) {
                background: #eee;
            }

            .relationship-body {
                padding: 12px;
            }

            .tab-content {
                display: none;
            }

            .tab-content.active {
                display: block;
            }

            .relationship-item {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 8px;
                transition: all 0.2s ease;
            }

            .relationship-item:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .relationship-item.hostile {
                border-color: #F44336;
                background: linear-gradient(135deg, #ffebee, #fce4ec);
            }

            .relationship-item.romantic {
                border-color: #E91E63;
                background: linear-gradient(135deg, #fce4ec, #f8bbd9);
            }

            .relationship-item.stable {
                border-color: #4CAF50;
                background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
            }

            .relationship-character {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 8px;
            }

            .character-avatar {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 12px;
            }

            .character-name {
                font-weight: bold;
                color: #333;
            }

            .relationship-type {
                font-size: 12px;
                color: #666;
            }

            .strength-bar {
                background: #e0e0e0;
                border-radius: 10px;
                height: 6px;
                position: relative;
                margin: 6px 0;
                overflow: hidden;
            }

            .strength-fill {
                height: 100%;
                border-radius: 10px;
                transition: width 0.3s ease;
            }

            .strength-text {
                position: absolute;
                right: 4px;
                top: -18px;
                font-size: 10px;
                color: #666;
            }

            .relationship-status,
            .last-interaction,
            .conflict-count {
                font-size: 11px;
                color: #666;
                margin-top: 3px;
            }

            .conflict-count {
                color: #F44336;
                font-weight: 500;
            }

            .relationship-map-container {
                text-align: center;
            }

            .map-instructions {
                font-size: 12px;
                color: #666;
                margin-bottom: 10px;
                font-style: italic;
            }

            #relationship-canvas {
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                max-width: 100%;
            }

            .map-legend {
                display: flex;
                justify-content: space-around;
                margin-top: 8px;
                flex-wrap: wrap;
            }

            .legend-item {
                font-size: 11px;
                color: #666;
                margin: 2px;
            }

            .drama-stats {
                display: flex;
                gap: 20px;
                margin-bottom: 15px;
            }

            .stat-item {
                text-align: center;
                flex: 1;
            }

            .stat-value {
                font-size: 24px;
                font-weight: bold;
                color: #E91E63;
            }

            .stat-label {
                font-size: 11px;
                color: #666;
                margin-top: 2px;
            }

            .drama-item {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 6px;
                padding: 10px;
                margin-bottom: 6px;
                display: flex;
                gap: 10px;
            }

            .drama-item.high {
                border-color: #F44336;
                background: linear-gradient(135deg, #ffebee, #fce4ec);
            }

            .drama-item.medium {
                border-color: #FF9800;
                background: linear-gradient(135deg, #fff3e0, #fef7f0);
            }

            .drama-icon {
                font-size: 16px;
                width: 20px;
                text-align: center;
            }

            .drama-content {
                flex: 1;
            }

            .drama-title {
                font-weight: bold;
                color: #333;
                font-size: 13px;
                margin-bottom: 3px;
            }

            .drama-description {
                font-size: 12px;
                color: #555;
                margin-bottom: 4px;
            }

            .drama-participants {
                font-size: 11px;
                color: #E91E63;
                font-weight: 500;
                margin-bottom: 3px;
            }

            .participant {
                background: rgba(233, 30, 99, 0.1);
                padding: 1px 4px;
                border-radius: 3px;
                margin: 0 1px;
            }

            .drama-time {
                font-size: 10px;
                color: #999;
            }

            .no-relationships {
                text-align: center;
                color: #999;
                font-style: italic;
                padding: 20px;
            }

            @media (max-width: 768px) {
                .relationship-tracker {
                    position: relative;
                    bottom: auto;
                    left: auto;
                    width: 100%;
                    margin: 10px 0;
                }

                .relationship-tabs {
                    flex-wrap: wrap;
                }

                .tab-btn {
                    min-width: 80px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    init() {
        console.log(`Relationship Dynamics Tracker initialized with ${this.relationships.size} relationships tracked`);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.relationshipTracker === 'undefined') {
        window.relationshipTracker = new RelationshipDynamicsTracker();
        window.relationshipTracker.init();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RelationshipDynamicsTracker;
}
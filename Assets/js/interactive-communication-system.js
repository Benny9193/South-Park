/**
 * Interactive Communication System
 * Cross-profile messaging with character voices, group chats, and voice messages
 */

class InteractiveCommunicationSystem {
    constructor() {
        this.characters = new Map();
        this.messageHistory = new Map();
        this.groupChats = new Map();
        this.voiceMessages = new Map();
        this.currentCharacter = null;
        this.activeConversations = new Set();

        this.initializeCharacters();
        this.initializeGroupChats();
        this.setupMessageTemplates();
        this.createCommunicationWidget();
        this.startMessageSimulation();
    }

    initializeCharacters() {
        const characterData = [
            {
                id: 'stan',
                name: 'Stan Marsh',
                avatar: 'SM',
                color: '#2196F3',
                voicePatterns: [
                    'Dude,', 'Oh my God,', 'This is so screwed up',
                    'Whatever, man', 'I hate this town', 'Jesus Christ'
                ],
                messageStyle: 'casual',
                responseTime: 'fast',
                traits: ['moral', 'frustrated', 'caring']
            },
            {
                id: 'kyle',
                name: 'Kyle Broflovski',
                avatar: 'KB',
                color: '#4CAF50',
                voicePatterns: [
                    'Seriously?', 'That\'s not right!', 'You guys,',
                    'Listen to me', 'This is important', 'We need to'
                ],
                messageStyle: 'passionate',
                responseTime: 'immediate',
                traits: ['intelligent', 'righteous', 'argumentative']
            },
            {
                id: 'cartman',
                name: 'Eric Cartman',
                avatar: 'EC',
                color: '#FF5722',
                voicePatterns: [
                    'Respect mah authoritah!', 'You guys are so lame',
                    'Sweet!', 'Screw you guys, I\'m going home',
                    'I\'m not fat, I\'m big-boned', 'Whatever, I do what I want'
                ],
                messageStyle: 'selfish',
                responseTime: 'when_convenient',
                traits: ['manipulative', 'dramatic', 'self-centered']
            },
            {
                id: 'kenny',
                name: 'Kenny McCormick',
                avatar: 'KM',
                color: '#FF9800',
                voicePatterns: [
                    'Mmph mmpf mmph', '(muffled)', '*muffled agreement*',
                    '*muffled laughter*', '*something inappropriate*'
                ],
                messageStyle: 'muffled',
                responseTime: 'variable',
                traits: ['mysterious', 'loyal', 'poor']
            },
            {
                id: 'butters',
                name: 'Butters Stotch',
                avatar: 'BS',
                color: '#FFEB3B',
                voicePatterns: [
                    'Oh hamburgers!', 'Gee whiz,', 'Aw, that\'s real neat!',
                    'Golly!', 'Well, I don\'t know about that',
                    'Aw shucks', 'Boy howdy!'
                ],
                messageStyle: 'innocent',
                responseTime: 'delayed',
                traits: ['optimistic', 'naive', 'polite']
            },
            {
                id: 'tweek',
                name: 'Tweek Tweak',
                avatar: 'TT',
                color: '#8BC34A',
                voicePatterns: [
                    'AGH!', 'This is too much pressure!',
                    'I can\'t take it!', 'What if',
                    'Oh God!', '*nervous twitching*', 'Coffee!'
                ],
                messageStyle: 'anxious',
                responseTime: 'erratic',
                traits: ['paranoid', 'energetic', 'worried']
            },
            {
                id: 'craig',
                name: 'Craig Tucker',
                avatar: 'CT',
                color: '#607D8B',
                voicePatterns: [
                    'Whatever.', 'I don\'t care.',
                    'This is dumb.', 'Fine.',
                    '*flips off*', 'So?'
                ],
                messageStyle: 'monotone',
                responseTime: 'slow',
                traits: ['apathetic', 'calm', 'sarcastic']
            },
            {
                id: 'randy',
                name: 'Randy Marsh',
                avatar: 'RM',
                color: '#795548',
                voicePatterns: [
                    'Oh my God!', 'This is huge!',
                    'I am Lorde!', 'Sharon!',
                    'Best day ever!', 'I\'m an expert'
                ],
                messageStyle: 'dramatic',
                responseTime: 'obsessive',
                traits: ['enthusiastic', 'impulsive', 'expert']
            }
        ];

        characterData.forEach(char => {
            this.characters.set(char.id, char);
        });
    }

    initializeGroupChats() {
        this.groupChats.set('main_boys', {
            id: 'main_boys',
            name: 'The Boys',
            participants: ['stan', 'kyle', 'cartman', 'kenny'],
            icon: '👦',
            color: '#2196F3',
            description: 'Stan, Kyle, Cartman & Kenny',
            lastActive: new Date(),
            messageCount: 1247
        });

        this.groupChats.set('creek', {
            id: 'creek',
            name: 'Creek ❤️',
            participants: ['tweek', 'craig'],
            icon: '💕',
            color: '#E91E63',
            description: 'Tweek & Craig',
            lastActive: new Date(Date.now() - 1800000),
            messageCount: 892
        });

        this.groupChats.set('marsh_family', {
            id: 'marsh_family',
            name: 'Marsh Family',
            participants: ['randy', 'sharon', 'stan'],
            icon: '👨‍👩‍👦',
            color: '#4CAF50',
            description: 'Family Chat',
            lastActive: new Date(Date.now() - 3600000),
            messageCount: 2156
        });

        this.groupChats.set('elementary_class', {
            id: 'elementary_class',
            name: 'South Park Elementary',
            participants: ['stan', 'kyle', 'cartman', 'kenny', 'butters', 'tweek', 'craig'],
            icon: '🏫',
            color: '#FF9800',
            description: 'Class Group',
            lastActive: new Date(Date.now() - 7200000),
            messageCount: 3421
        });
    }

    setupMessageTemplates() {
        this.messageTemplates = {
            greeting: {
                'stan': ['Hey', 'What\'s up', 'Dude'],
                'kyle': ['Hi everyone', 'Hey guys', 'What\'s going on?'],
                'cartman': ['What do you guys want?', 'I\'m busy', 'Sweet!'],
                'kenny': ['*muffled hello*', 'Mmph!', '*waves*'],
                'butters': ['Oh, hi fellas!', 'Gee, hello!', 'Howdy!'],
                'tweek': ['AGH! Hi!', 'Oh God, what now?', '*nervous wave*'],
                'craig': ['Whatever.', 'Hi.', '*nods*'],
                'randy': ['Hey everyone!', 'Big news!', 'Did you hear?']
            },
            response: {
                'stan': ['Yeah, I guess', 'That\'s messed up', 'Whatever'],
                'kyle': ['Are you serious?', 'That\'s not right', 'Listen to me'],
                'cartman': ['That\'s lame', 'I don\'t care', 'Sweet!'],
                'kenny': ['*muffled agreement*', '*nods*', 'Mmph mmph'],
                'butters': ['Oh boy!', 'That sounds neat!', 'Aw, really?'],
                'tweek': ['This is too much!', 'AGH!', 'I can\'t handle this!'],
                'craig': ['Whatever.', 'I don\'t care.', 'So?'],
                'randy': ['That\'s amazing!', 'I\'m an expert on this!', 'Sharon won\'t believe this!']
            },
            question: {
                'stan': ['What do you think?', 'Should we do something?', 'This is crazy, right?'],
                'kyle': ['Don\'t you agree?', 'How can you not care?', 'What\'s wrong with you guys?'],
                'cartman': ['Who wants to help me?', 'Isn\'t this sweet?', 'You guys are jealous, right?'],
                'kenny': ['*muffled question*', 'Mmph?', '*questioning gesture*'],
                'butters': ['Is that okay?', 'Should I ask my mom?', 'That\'s good, right?'],
                'tweek': ['What if something bad happens?', 'Are you sure?', 'What do we do?'],
                'craig': ['Why should I care?', 'And?', 'So what?'],
                'randy': ['Want to see my latest project?', 'Did you know...?', 'Isn\'t this revolutionary?']
            }
        };
    }

    createCommunicationWidget() {
        const widget = document.createElement('div');
        widget.id = 'communication-system';
        widget.className = 'communication-system';
        widget.innerHTML = `
            <div class="communication-header" onclick="window.commSystem.toggleWidget()">
                <div class="communication-logo">💬 Messages</div>
                <div class="message-indicator" id="messageIndicator">3</div>
                <div class="communication-toggle">−</div>
            </div>
            <div class="communication-content" id="communication-content">
                <div class="communication-tabs">
                    <button class="comm-tab-btn active" onclick="window.commSystem.showTab('chats')">Chats</button>
                    <button class="comm-tab-btn" onclick="window.commSystem.showTab('groups')">Groups</button>
                    <button class="comm-tab-btn" onclick="window.commSystem.showTab('voice')">Voice</button>
                </div>
                <div class="communication-body">
                    <div id="chats-tab" class="comm-tab-content active">
                        ${this.generateChatsHTML()}
                    </div>
                    <div id="groups-tab" class="comm-tab-content">
                        ${this.generateGroupsHTML()}
                    </div>
                    <div id="voice-tab" class="comm-tab-content">
                        ${this.generateVoiceHTML()}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(widget);
        this.addCommunicationStyles();
        this.setupMessageHandlers();
    }

    generateChatsHTML() {
        const currentChar = this.getCurrentCharacter();
        const otherCharacters = Array.from(this.characters.values())
            .filter(char => char.id !== currentChar);

        return `
            <div class="chat-list">
                ${otherCharacters.map(char => {
                    const lastMessage = this.getLastMessage(currentChar, char.id);
                    const unreadCount = this.getUnreadCount(currentChar, char.id);

                    return `
                        <div class="chat-item ${unreadCount > 0 ? 'unread' : ''}" onclick="window.commSystem.openChat('${char.id}')">
                            <div class="chat-avatar" style="background-color: ${char.color}">
                                ${char.avatar}
                            </div>
                            <div class="chat-info">
                                <div class="chat-name">${char.name}</div>
                                <div class="chat-preview">${lastMessage.text}</div>
                                <div class="chat-time">${this.getTimeAgo(lastMessage.timestamp)}</div>
                            </div>
                            ${unreadCount > 0 ? `<div class="chat-unread">${unreadCount}</div>` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    generateGroupsHTML() {
        const currentChar = this.getCurrentCharacter();

        return `
            <div class="group-list">
                ${Array.from(this.groupChats.values())
                    .filter(group => group.participants.includes(currentChar))
                    .map(group => `
                        <div class="group-item" onclick="window.commSystem.openGroupChat('${group.id}')">
                            <div class="group-icon">${group.icon}</div>
                            <div class="group-info">
                                <div class="group-name">${group.name}</div>
                                <div class="group-description">${group.description}</div>
                                <div class="group-stats">${group.messageCount} messages • ${group.participants.length} members</div>
                            </div>
                            <div class="group-time">${this.getTimeAgo(group.lastActive)}</div>
                        </div>
                    `).join('')}
            </div>
        `;
    }

    generateVoiceHTML() {
        return `
            <div class="voice-messages">
                <div class="voice-recorder">
                    <div class="recorder-info">Send a voice message!</div>
                    <button class="record-btn" onclick="window.commSystem.simulateVoiceMessage()">🎤 Record</button>
                </div>
                <div class="voice-history">
                    <h4>Recent Voice Messages</h4>
                    ${this.generateVoiceHistoryHTML()}
                </div>
            </div>
        `;
    }

    generateVoiceHistoryHTML() {
        const voiceMessages = [
            {
                from: 'cartman',
                message: 'Respect mah authoritah!',
                duration: '0:03',
                timestamp: new Date(Date.now() - 1800000)
            },
            {
                from: 'tweek',
                message: 'AGH! Too much pressure!',
                duration: '0:05',
                timestamp: new Date(Date.now() - 3600000)
            },
            {
                from: 'butters',
                message: 'Oh hamburgers, that sounds neat!',
                duration: '0:04',
                timestamp: new Date(Date.now() - 5400000)
            }
        ];

        return voiceMessages.map(vm => {
            const character = this.characters.get(vm.from);
            return `
                <div class="voice-message-item" onclick="window.commSystem.playVoiceMessage('${vm.from}', '${vm.message}')">
                    <div class="voice-avatar" style="background-color: ${character.color}">
                        ${character.avatar}
                    </div>
                    <div class="voice-content">
                        <div class="voice-sender">${character.name}</div>
                        <div class="voice-preview">"${vm.message}"</div>
                        <div class="voice-duration">${vm.duration}</div>
                    </div>
                    <div class="voice-time">${this.getTimeAgo(vm.timestamp)}</div>
                </div>
            `;
        }).join('');
    }

    openChat(characterId) {
        const character = this.characters.get(characterId);
        const currentChar = this.getCurrentCharacter();

        // Create chat modal
        const chatModal = document.createElement('div');
        chatModal.className = 'chat-modal';
        chatModal.innerHTML = `
            <div class="chat-modal-content">
                <div class="chat-modal-header">
                    <div class="chat-modal-info">
                        <div class="chat-modal-avatar" style="background-color: ${character.color}">
                            ${character.avatar}
                        </div>
                        <div class="chat-modal-name">${character.name}</div>
                    </div>
                    <button class="close-chat" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                <div class="chat-modal-messages" id="chatMessages">
                    ${this.generateChatMessages(currentChar, characterId)}
                </div>
                <div class="chat-modal-input">
                    <input type="text" placeholder="Type a message..." id="messageInput" onkeypress="window.commSystem.handleMessageInput(event, '${characterId}')">
                    <button onclick="window.commSystem.sendMessage('${characterId}')">Send</button>
                </div>
            </div>
        `;

        document.body.appendChild(chatModal);
        this.addChatModalStyles();

        // Focus input
        setTimeout(() => {
            document.getElementById('messageInput').focus();
        }, 100);
    }

    generateChatMessages(currentChar, otherChar) {
        const messages = this.getMessageHistory(currentChar, otherChar);

        return messages.map(msg => `
            <div class="message ${msg.sender === currentChar ? 'sent' : 'received'}">
                <div class="message-content">${msg.text}</div>
                <div class="message-time">${this.getTimeAgo(msg.timestamp)}</div>
            </div>
        `).join('');
    }

    openGroupChat(groupId) {
        const group = this.groupChats.get(groupId);

        const groupModal = document.createElement('div');
        groupModal.className = 'chat-modal';
        groupModal.innerHTML = `
            <div class="chat-modal-content">
                <div class="chat-modal-header">
                    <div class="chat-modal-info">
                        <div class="group-modal-icon">${group.icon}</div>
                        <div class="chat-modal-name">${group.name}</div>
                    </div>
                    <button class="close-chat" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                <div class="chat-modal-messages" id="groupChatMessages">
                    ${this.generateGroupMessages(groupId)}
                </div>
                <div class="chat-modal-input">
                    <input type="text" placeholder="Message ${group.name}..." id="groupMessageInput" onkeypress="window.commSystem.handleGroupMessageInput(event, '${groupId}')">
                    <button onclick="window.commSystem.sendGroupMessage('${groupId}')">Send</button>
                </div>
            </div>
        `;

        document.body.appendChild(groupModal);
        this.addChatModalStyles();
    }

    generateGroupMessages(groupId) {
        const group = this.groupChats.get(groupId);
        const messages = this.getGroupMessageHistory(groupId);

        return messages.map(msg => {
            const character = this.characters.get(msg.sender);
            const isCurrentUser = msg.sender === this.getCurrentCharacter();

            return `
                <div class="group-message ${isCurrentUser ? 'sent' : 'received'}">
                    ${!isCurrentUser ? `
                        <div class="group-message-avatar" style="background-color: ${character.color}">
                            ${character.avatar}
                        </div>
                    ` : ''}
                    <div class="group-message-content">
                        ${!isCurrentUser ? `<div class="group-message-sender">${character.name}</div>` : ''}
                        <div class="message-content">${msg.text}</div>
                        <div class="message-time">${this.getTimeAgo(msg.timestamp)}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    sendMessage(characterId) {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();

        if (message) {
            this.addMessageToHistory(this.getCurrentCharacter(), characterId, message);
            input.value = '';

            // Simulate response after delay
            setTimeout(() => {
                this.generateCharacterResponse(characterId, message);
            }, this.getResponseDelay(characterId));

            // Update chat display
            this.updateChatDisplay(characterId);
        }
    }

    generateCharacterResponse(characterId, originalMessage) {
        const character = this.characters.get(characterId);
        let response = '';

        // Generate character-appropriate response
        if (originalMessage.toLowerCase().includes('hello') || originalMessage.toLowerCase().includes('hi')) {
            const greetings = this.messageTemplates.greeting[characterId];
            response = greetings[Math.floor(Math.random() * greetings.length)];
        } else if (originalMessage.includes('?')) {
            const responses = this.messageTemplates.response[characterId];
            response = responses[Math.floor(Math.random() * responses.length)];
        } else {
            const patterns = character.voicePatterns;
            response = patterns[Math.floor(Math.random() * patterns.length)];
        }

        this.addMessageToHistory(characterId, this.getCurrentCharacter(), response);
        this.updateChatDisplay(characterId);
    }

    simulateVoiceMessage() {
        const currentChar = this.getCurrentCharacter();
        const character = this.characters.get(currentChar);
        const voicePattern = character.voicePatterns[Math.floor(Math.random() * character.voicePatterns.length)];

        // Show voice message popup
        const voicePopup = document.createElement('div');
        voicePopup.className = 'voice-popup';
        voicePopup.innerHTML = `
            <div class="voice-popup-content">
                <div class="voice-recording">
                    <div class="recording-animation">🎤</div>
                    <div class="recording-text">Recording voice message...</div>
                    <div class="voice-preview">"${voicePattern}"</div>
                </div>
                <div class="voice-actions">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">Cancel</button>
                    <button onclick="window.commSystem.sendVoiceMessage('${voicePattern}'); this.parentElement.parentElement.parentElement.remove()">Send</button>
                </div>
            </div>
        `;

        document.body.appendChild(voicePopup);
        this.addVoicePopupStyles();
    }

    playVoiceMessage(characterId, message) {
        // Show voice message playback
        const playPopup = document.createElement('div');
        playPopup.className = 'voice-play-popup';
        playPopup.innerHTML = `
            <div class="voice-play-content">
                <div class="voice-playing">
                    <div class="play-animation">🔊</div>
                    <div class="play-text">Playing voice message from ${this.characters.get(characterId).name}</div>
                    <div class="voice-transcript">"${message}"</div>
                </div>
            </div>
        `;

        document.body.appendChild(playPopup);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            playPopup.remove();
        }, 3000);
    }

    // Utility methods
    getCurrentCharacter() {
        if (this.currentCharacter) return this.currentCharacter;

        const title = document.title;
        for (let [id, character] of this.characters) {
            if (title.includes(character.name)) {
                this.currentCharacter = id;
                return id;
            }
        }
        return 'stan'; // default
    }

    getLastMessage(char1, char2) {
        // Generate sample last messages
        const messages = {
            [`${char1}_${char2}`]: {
                text: 'Hey, what\'s up?',
                timestamp: new Date(Date.now() - Math.random() * 3600000)
            }
        };

        return messages[`${char1}_${char2}`] || messages[`${char2}_${char1}`] || {
            text: 'No messages yet',
            timestamp: new Date(Date.now() - 86400000)
        };
    }

    getUnreadCount(char1, char2) {
        return Math.floor(Math.random() * 4); // 0-3 unread messages
    }

    getMessageHistory(char1, char2) {
        // Generate sample conversation
        return [
            {
                sender: char2,
                text: 'Hey dude',
                timestamp: new Date(Date.now() - 7200000)
            },
            {
                sender: char1,
                text: 'What\'s up?',
                timestamp: new Date(Date.now() - 7000000)
            },
            {
                sender: char2,
                text: this.characters.get(char2).voicePatterns[0],
                timestamp: new Date(Date.now() - 6800000)
            }
        ];
    }

    getGroupMessageHistory(groupId) {
        const group = this.groupChats.get(groupId);

        return [
            {
                sender: group.participants[0],
                text: 'Anyone want to hang out?',
                timestamp: new Date(Date.now() - 3600000)
            },
            {
                sender: group.participants[1],
                text: this.characters.get(group.participants[1]).voicePatterns[0],
                timestamp: new Date(Date.now() - 3400000)
            },
            {
                sender: group.participants[2],
                text: 'Sure, sounds cool',
                timestamp: new Date(Date.now() - 3200000)
            }
        ];
    }

    getResponseDelay(characterId) {
        const character = this.characters.get(characterId);
        const delays = {
            'immediate': 1000,
            'fast': 2000,
            'slow': 5000,
            'delayed': 8000,
            'erratic': Math.random() * 10000 + 1000,
            'when_convenient': Math.random() * 15000 + 3000,
            'obsessive': 500
        };
        return delays[character.responseTime] || 3000;
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'now';
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        return `${days}d`;
    }

    // Widget control methods
    toggleWidget() {
        const content = document.getElementById('communication-content');
        const toggle = document.querySelector('.communication-toggle');

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
        document.querySelectorAll('.comm-tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.comm-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        document.getElementById(`${tabName}-tab`).classList.add('active');
        event.target.classList.add('active');
    }

    startMessageSimulation() {
        // Simulate incoming messages every 30 seconds
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.simulateIncomingMessage();
            }
        }, 30000);
    }

    simulateIncomingMessage() {
        const indicator = document.getElementById('messageIndicator');
        const currentCount = parseInt(indicator.textContent) || 0;
        indicator.textContent = currentCount + 1;
        indicator.style.display = 'block';

        // Flash notification
        indicator.style.animation = 'pulse 0.5s ease-in-out 3';
    }

    addCommunicationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .communication-system {
                position: fixed;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                width: 320px;
                background: white;
                border: 2px solid #1877f2;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                z-index: 9998;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                max-height: 600px;
                overflow: hidden;
            }

            .communication-header {
                background: linear-gradient(135deg, #1877f2, #166fe5);
                color: white;
                padding: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                user-select: none;
                position: relative;
            }

            .communication-logo {
                font-weight: bold;
                font-size: 16px;
            }

            .message-indicator {
                position: absolute;
                top: -5px;
                right: 40px;
                background: #ff4444;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                font-weight: bold;
            }

            .communication-toggle {
                font-size: 18px;
                font-weight: bold;
            }

            .communication-content {
                max-height: 540px;
                overflow-y: auto;
            }

            .communication-tabs {
                display: flex;
                background: #f5f5f5;
                border-bottom: 1px solid #e0e0e0;
            }

            .comm-tab-btn {
                flex: 1;
                padding: 10px;
                background: none;
                border: none;
                cursor: pointer;
                font-weight: 500;
                color: #666;
                transition: all 0.2s ease;
            }

            .comm-tab-btn.active {
                background: white;
                color: #1877f2;
                border-bottom: 2px solid #1877f2;
            }

            .comm-tab-btn:hover:not(.active) {
                background: #eee;
            }

            .communication-body {
                padding: 0;
            }

            .comm-tab-content {
                display: none;
                padding: 12px;
            }

            .comm-tab-content.active {
                display: block;
            }

            .chat-list,
            .group-list {
                max-height: 400px;
                overflow-y: auto;
            }

            .chat-item,
            .group-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 8px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                position: relative;
            }

            .chat-item:hover,
            .group-item:hover {
                background: #f0f2f5;
            }

            .chat-item.unread {
                background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
                border-left: 3px solid #1877f2;
            }

            .chat-avatar,
            .group-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 14px;
            }

            .group-icon {
                background: #1877f2;
                font-size: 18px;
            }

            .chat-info,
            .group-info {
                flex: 1;
                min-width: 0;
            }

            .chat-name,
            .group-name {
                font-weight: bold;
                color: #333;
                margin-bottom: 2px;
            }

            .chat-preview,
            .group-description {
                color: #666;
                font-size: 13px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .chat-time,
            .group-time {
                color: #999;
                font-size: 11px;
                margin-bottom: 2px;
            }

            .group-stats {
                color: #999;
                font-size: 11px;
            }

            .chat-unread {
                background: #1877f2;
                color: white;
                border-radius: 50%;
                width: 18px;
                height: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                font-weight: bold;
            }

            .voice-messages {
                text-align: center;
            }

            .voice-recorder {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 20px;
            }

            .recorder-info {
                color: #666;
                margin-bottom: 10px;
            }

            .record-btn {
                background: #1877f2;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                font-size: 14px;
            }

            .record-btn:hover {
                background: #166fe5;
            }

            .voice-history h4 {
                text-align: left;
                color: #333;
                margin-bottom: 10px;
                font-size: 14px;
            }

            .voice-message-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px;
                border-radius: 6px;
                cursor: pointer;
                transition: background 0.2s ease;
            }

            .voice-message-item:hover {
                background: #f0f2f5;
            }

            .voice-avatar {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 10px;
            }

            .voice-content {
                flex: 1;
                text-align: left;
            }

            .voice-sender {
                font-weight: 500;
                color: #333;
                font-size: 12px;
            }

            .voice-preview {
                color: #666;
                font-size: 11px;
                font-style: italic;
            }

            .voice-duration {
                color: #1877f2;
                font-size: 10px;
                font-weight: 500;
            }

            .voice-time {
                color: #999;
                font-size: 10px;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.1); }
            }

            @media (max-width: 768px) {
                .communication-system {
                    position: relative;
                    right: auto;
                    top: auto;
                    transform: none;
                    width: 100%;
                    margin: 10px 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addChatModalStyles() {
        if (document.getElementById('chatModalStyles')) return;

        const style = document.createElement('style');
        style.id = 'chatModalStyles';
        style.textContent = `
            .chat-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 10002;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .chat-modal-content {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 500px;
                height: 70%;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }

            .chat-modal-header {
                background: #1877f2;
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .chat-modal-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .chat-modal-avatar {
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

            .group-modal-icon {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                background: rgba(255,255,255,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
            }

            .chat-modal-name {
                font-weight: bold;
                font-size: 16px;
            }

            .close-chat {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .close-chat:hover {
                background: rgba(255,255,255,0.2);
            }

            .chat-modal-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background: #f8f9fa;
            }

            .message,
            .group-message {
                margin-bottom: 15px;
                display: flex;
                align-items: flex-end;
                gap: 8px;
            }

            .message.sent,
            .group-message.sent {
                justify-content: flex-end;
            }

            .message.received,
            .group-message.received {
                justify-content: flex-start;
            }

            .group-message-avatar {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 10px;
                margin-bottom: 15px;
            }

            .message-content {
                max-width: 70%;
                padding: 10px 15px;
                border-radius: 18px;
                word-wrap: break-word;
            }

            .message.sent .message-content {
                background: #1877f2;
                color: white;
                border-bottom-right-radius: 4px;
            }

            .message.received .message-content,
            .group-message.received .message-content {
                background: #e4e6ea;
                color: #333;
                border-bottom-left-radius: 4px;
            }

            .group-message.sent .message-content {
                background: #1877f2;
                color: white;
                border-bottom-right-radius: 4px;
            }

            .group-message-content {
                max-width: 70%;
            }

            .group-message-sender {
                font-size: 11px;
                color: #666;
                margin-bottom: 2px;
                font-weight: 500;
            }

            .message-time {
                font-size: 10px;
                color: #999;
                margin-top: 2px;
            }

            .chat-modal-input {
                padding: 15px;
                border-top: 1px solid #e4e6ea;
                display: flex;
                gap: 10px;
                background: white;
            }

            .chat-modal-input input {
                flex: 1;
                padding: 10px 15px;
                border: 1px solid #e4e6ea;
                border-radius: 20px;
                outline: none;
                font-size: 14px;
            }

            .chat-modal-input input:focus {
                border-color: #1877f2;
            }

            .chat-modal-input button {
                background: #1877f2;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                font-weight: 600;
            }

            .chat-modal-input button:hover {
                background: #166fe5;
            }
        `;
        document.head.appendChild(style);
    }

    addVoicePopupStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .voice-popup,
            .voice-play-popup {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                z-index: 10003;
                padding: 20px;
                text-align: center;
                min-width: 250px;
            }

            .recording-animation,
            .play-animation {
                font-size: 30px;
                margin-bottom: 10px;
                animation: pulse 1s infinite;
            }

            .recording-text,
            .play-text {
                font-weight: bold;
                color: #333;
                margin-bottom: 10px;
            }

            .voice-preview,
            .voice-transcript {
                font-style: italic;
                color: #666;
                margin-bottom: 15px;
                padding: 10px;
                background: #f8f9fa;
                border-radius: 6px;
            }

            .voice-actions {
                display: flex;
                gap: 10px;
                justify-content: center;
            }

            .voice-actions button {
                padding: 8px 16px;
                border: 1px solid #e4e6ea;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
            }

            .voice-actions button:first-child {
                background: white;
                color: #666;
            }

            .voice-actions button:last-child {
                background: #1877f2;
                color: white;
                border-color: #1877f2;
            }
        `;
        document.head.appendChild(style);
    }

    // Event handlers
    handleMessageInput(event, characterId) {
        if (event.key === 'Enter') {
            this.sendMessage(characterId);
        }
    }

    handleGroupMessageInput(event, groupId) {
        if (event.key === 'Enter') {
            this.sendGroupMessage(groupId);
        }
    }

    addMessageToHistory(sender, receiver, message) {
        // Implementation for adding messages to history
    }

    updateChatDisplay(characterId) {
        // Implementation for updating chat display
    }

    sendGroupMessage(groupId) {
        // Implementation for group messages
    }

    sendVoiceMessage(message) {
        // Implementation for voice messages
    }

    setupMessageHandlers() {
        // Setup additional event handlers
    }

    init() {
        console.log('Interactive Communication System initialized');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.commSystem === 'undefined') {
        window.commSystem = new InteractiveCommunicationSystem();
        window.commSystem.init();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractiveCommunicationSystem;
}
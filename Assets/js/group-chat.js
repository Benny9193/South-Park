/**
 * South Park Facebook Profiles - Group Chat System
 * Manages multi-character conversations and group interactions
 */

class GroupChatSystem {
    constructor() {
        this.activeChats = new Map();
        this.chatHistory = new Map();
        this.participants = new Set();
        this.messageId = 0;
        this.chatScenarios = {};
        this.initializeChatScenarios();
    }

    initializeChatScenarios() {
        this.chatScenarios = {
            'main_four': {
                name: 'The Main Four',
                participants: ['cartman', 'kyle', 'stan', 'kenny'],
                topics: [
                    'Planning weekend activities',
                    'Dealing with Cartman\'s schemes',
                    'School project coordination',
                    'Video game tournaments'
                ],
                dynamics: {
                    'cartman': 'dominates conversation with schemes',
                    'kyle': 'voices moral concerns and practical objections',
                    'stan': 'tries to keep everyone on topic',
                    'kenny': 'makes muffled comments that everyone interprets differently'
                }
            },
            'craig_clyde_token': {
                name: 'Craig\'s Crew',
                participants: ['craig', 'clyde', 'token'],
                topics: [
                    'Planning hangouts',
                    'Dealing with school drama',
                    'Supporting Clyde through emotional moments',
                    'Token providing voice of reason'
                ],
                dynamics: {
                    'craig': 'doesn\'t care but participates anyway',
                    'clyde': 'gets emotional about minor things',
                    'token': 'provides practical solutions nobody asks for'
                }
            },
            'craig_tweek_couple': {
                name: 'Craig & Tweek',
                participants: ['craig', 'tweek'],
                topics: [
                    'Date planning (if you can call it that)',
                    'Tweek\'s anxiety management',
                    'Guinea pig care tips',
                    'Dealing with relationship assumptions'
                ],
                dynamics: {
                    'craig': 'calm and supportive in his apathetic way',
                    'tweek': 'anxious but comforted by Craig\'s presence'
                }
            },
            'popular_girls': {
                name: 'Popular Girl Squad',
                participants: ['bebe', 'wendy'],
                topics: [
                    'Fashion trends and social dynamics',
                    'School politics and student issues',
                    'Relationship advice and boy drama',
                    'Balancing popularity with principles'
                ],
                dynamics: {
                    'bebe': 'focuses on social trends and relationships',
                    'wendy': 'brings activist perspective to discussions'
                }
            },
            'student_government': {
                name: 'Student Council Chat',
                participants: ['wendy', 'token', 'kyle'],
                topics: [
                    'School improvement initiatives',
                    'Organizing events and fundraisers',
                    'Dealing with administrative challenges',
                    'Balancing student interests'
                ],
                dynamics: {
                    'wendy': 'leads with passion and organization',
                    'token': 'provides realistic timelines and budgets',
                    'kyle': 'ensures moral and ethical considerations'
                }
            },
            'emotional_support': {
                name: 'Feelings Circle',
                participants: ['clyde', 'butters', 'tweek'],
                topics: [
                    'Processing daily anxieties and emotions',
                    'Supporting each other through tough times',
                    'Sharing coping strategies',
                    'Discussing therapy and self-care'
                ],
                dynamics: {
                    'clyde': 'cries about everything but offers emotional support',
                    'butters': 'provides innocent wisdom and encouragement',
                    'tweek': 'shares anxiety but finds comfort in understanding friends'
                }
            }
        };
    }

    createGroupChat(scenarioKey, customParticipants = null) {
        const scenario = this.chatScenarios[scenarioKey];
        if (!scenario && !customParticipants) {
            throw new Error('Invalid chat scenario or missing participants');
        }

        const chatId = this.generateChatId();
        const participants = customParticipants || scenario.participants;
        const chatName = scenario?.name || 'Custom Chat';

        const chat = {
            id: chatId,
            name: chatName,
            participants: participants,
            messages: [],
            scenario: scenario,
            created: new Date(),
            active: true
        };

        this.activeChats.set(chatId, chat);
        this.chatHistory.set(chatId, []);

        return chat;
    }

    generateChatMessage(chatId, senderId, content = null, messageType = 'text') {
        const chat = this.activeChats.get(chatId);
        if (!chat) return null;

        const sender = this.getCharacterInfo(senderId);
        if (!sender || !chat.participants.includes(senderId)) return null;

        // Generate contextual content if not provided
        if (!content) {
            content = this.generateContextualMessage(chat, senderId);
        }

        const message = {
            id: this.generateMessageId(),
            chatId: chatId,
            senderId: senderId,
            sender: sender,
            content: content,
            type: messageType,
            timestamp: new Date(),
            reactions: new Map(),
            replies: []
        };

        chat.messages.push(message);
        this.chatHistory.get(chatId).push(message);

        // Trigger responses from other participants
        this.scheduleResponses(chat, message);

        return message;
    }

    generateContextualMessage(chat, senderId) {
        const scenario = chat.scenario;
        if (!scenario) return this.getGenericMessage(senderId);

        const senderDynamic = scenario.dynamics[senderId];
        const topics = scenario.topics;
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];

        return this.createCharacterMessage(senderId, randomTopic, senderDynamic, chat);
    }

    createCharacterMessage(characterKey, topic, dynamic, chat) {
        const templates = this.getMessageTemplates();
        
        switch (characterKey) {
            case 'cartman':
                return this.randomChoice([
                    `Guys, I have the most amazing scheme for ${topic.toLowerCase()}!`,
                    `Seriously you guys, this is gonna be SWEET! We should totally ${this.getCartmanAction(topic)}.`,
                    `Kyle, your mom says we can't ${this.getCartmanScheme(topic)}, but I think she's wrong.`,
                    `Whatever, this is gonna be awesome and you're all gonna thank me later!`
                ]);
            
            case 'kyle':
                return this.randomChoice([
                    `Dude, we need to think this through properly. ${topic} isn't something we should rush into.`,
                    `This is actually a really good opportunity for us to ${this.getKyleSolution(topic)}.`,
                    `Cartman, that's obviously a terrible idea. Here's what we should actually do...`,
                    `Guys, let's be smart about this. We can make ${topic.toLowerCase()} work if we plan it right.`
                ]);
            
            case 'stan':
                return this.randomChoice([
                    `Oh man, ${topic.toLowerCase()} sounds complicated. Are we sure about this?`,
                    `Whatever works for everyone, I guess. Just don't make it too crazy.`,
                    `Can we just keep this simple? ${topic} shouldn't be this hard to figure out.`,
                    `I'm in, but let's not overthink it like last time.`
                ]);
            
            case 'kenny':
                const kennyPhrases = [
                    { kenny: 'Mmpfh mph mmpfh!', translation: 'That sounds awesome!' },
                    { kenny: 'Mmph mmpfh mph mmpfh?', translation: 'What about the budget?' },
                    { kenny: 'Mmpfh mmpfh!', translation: 'I\'m totally in!' },
                    { kenny: 'Mmph mph mmpfh mmpfh!', translation: 'This could be really fun!' }
                ];
                const chosen = this.randomChoice(kennyPhrases);
                return `${chosen.kenny} <br><small>(Translation: ${chosen.translation})</small>`;
            
            case 'craig':
                return this.randomChoice([
                    `I don't really care about ${topic.toLowerCase()}, but whatever.`,
                    `*flips you off* This sounds stupid, but I'll probably show up anyway.`,
                    `Whatever. If Tweek wants to do it, I guess I'm in.`,
                    `This better not take too long. I have guinea pigs to feed.`
                ]);
            
            case 'tweek':
                return this.randomChoice([
                    `GAH! What if ${topic.toLowerCase()} goes horribly wrong?! *pulls hair*`,
                    `This makes me nervous! What if we're not prepared for all the variables?! ☕`,
                    `Craig thinks it'll be fine, but what if it's NOT fine?! What then?!`,
                    `*twitches* I need more coffee before we decide anything this important!`
                ]);
            
            case 'clyde':
                return this.randomChoice([
                    `*sniffling* This is either going to be amazing or I'm going to cry about it! 😭`,
                    `Guys, I'm already getting emotional thinking about ${topic.toLowerCase()}! *tears up*`,
                    `What if we mess this up?! *sobbing* I couldn't handle the disappointment!`,
                    `This sounds beautiful! I'm literally crying happy tears right now! 💧`
                ]);
            
            case 'token':
                return this.randomChoice([
                    `Has anyone actually thought about the logistics of ${topic.toLowerCase()}? *sigh*`,
                    `This is going to require actual planning. Do we want to do this right or just wing it?`,
                    `I can organize this properly, but only if people actually listen to the plan.`,
                    `Let me guess - we're going to ignore all the obvious problems and deal with them later?`
                ]);
            
            case 'bebe':
                return this.randomChoice([
                    `This could be really cute! *hair flip* We should totally make it stylish! ✨`,
                    `OMG yes! ${topic} is going to be amazing if we do it right! 💕`,
                    `I have SO many ideas for making this look perfect! Obviously! 💅`,
                    `This is giving me such good vibes! We're going to look incredible! 👑`
                ]);
            
            case 'wendy':
                return this.randomChoice([
                    `This is a great opportunity to ${this.getWendyAction(topic)}! I'm totally on board!`,
                    `We should make sure ${topic.toLowerCase()} benefits everyone, not just us.`,
                    `I can help organize this! We need to be strategic about our approach.`,
                    `This could actually make a real difference if we do it thoughtfully.`
                ]);
            
            case 'butters':
                return this.randomChoice([
                    `Oh hamburgers! ${topic} sounds really swell, fellas!`,
                    `Aw jeez, I'm so excited! This is gonna be the best thing ever!`,
                    `Golly, I hope I can help make ${topic.toLowerCase()} really special for everyone!`,
                    `That's super neat! I can't wait to see how this turns out!`
                ]);
            
            default:
                return `Hey everyone! What do you think about ${topic.toLowerCase()}?`;
        }
    }

    getCartmanAction(topic) {
        const actions = {
            'Planning weekend activities': 'turn this into a money-making opportunity',
            'School project coordination': 'make Kyle do all the work',
            'Video game tournaments': 'totally dominate and win everything',
            'default': 'make this AWESOME and profitable'
        };
        return actions[topic] || actions.default;
    }

    getCartmanScheme(topic) {
        const schemes = {
            'Planning weekend activities': 'charge admission to our hangout',
            'School project coordination': 'outsource the work to kindergarteners',
            'Video game tournaments': 'use performance enhancing energy drinks',
            'default': 'revolutionize everything forever'
        };
        return schemes[topic] || schemes.default;
    }

    getKyleSolution(topic) {
        const solutions = {
            'Planning weekend activities': 'organize something fun that everyone can enjoy',
            'School project coordination': 'divide the work fairly and meet our deadlines',
            'Video game tournaments': 'create fair teams and have good sportsmanship',
            'default': 'handle this responsibly and ethically'
        };
        return solutions[topic] || solutions.default;
    }

    getWendyAction(topic) {
        const actions = {
            'Fashion trends and social dynamics': 'promote positive body image and self-expression',
            'School politics and student issues': 'advocate for real student needs',
            'Relationship advice and boy drama': 'focus on healthy communication',
            'default': 'create positive change in our community'
        };
        return actions[topic] || actions.default;
    }

    scheduleResponses(chat, triggerMessage) {
        const otherParticipants = chat.participants.filter(p => p !== triggerMessage.senderId);
        const respondersCount = Math.min(Math.floor(Math.random() * 2) + 1, otherParticipants.length);
        const responders = this.shuffleArray(otherParticipants).slice(0, respondersCount);

        responders.forEach((responderId, index) => {
            setTimeout(() => {
                this.generateChatMessage(chat.id, responderId);
            }, (index + 1) * (Math.random() * 3000 + 2000)); // 2-5 second delays
        });
    }

    renderGroupChat(container, chatId) {
        const chat = this.activeChats.get(chatId);
        if (!chat) return;

        const chatElement = document.createElement('div');
        chatElement.className = 'group-chat';
        chatElement.innerHTML = `
            <div class="chat-header">
                <h3 class="chat-title">${chat.name}</h3>
                <div class="chat-participants">
                    ${chat.participants.map(p => `<span class="participant-badge">${this.getCharacterInfo(p)?.name || p}</span>`).join('')}
                </div>
            </div>
            <div class="chat-messages" id="messages-${chatId}"></div>
            <div class="chat-input">
                <button onclick="generateRandomMessage('${chatId}')" class="generate-message-btn">
                    Generate Random Message
                </button>
                <button onclick="addUserMessage('${chatId}')" class="add-message-btn">
                    Add Message
                </button>
            </div>
        `;

        container.appendChild(chatElement);
        this.renderMessages(chatId);
    }

    renderMessages(chatId) {
        const chat = this.activeChats.get(chatId);
        const messagesContainer = document.getElementById(`messages-${chatId}`);
        if (!chat || !messagesContainer) return;

        messagesContainer.innerHTML = '';
        
        chat.messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'chat-message';
            messageElement.innerHTML = `
                <div class="message-header">
                    <span class="message-sender" style="color: ${message.sender.colorScheme}">
                        ${message.sender.name}
                    </span>
                    <span class="message-timestamp">
                        ${this.formatTime(message.timestamp)}
                    </span>
                </div>
                <div class="message-content">
                    ${message.content}
                </div>
            `;
            messagesContainer.appendChild(messageElement);
        });

        // Auto-scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getCharacterInfo(characterKey) {
        // This should integrate with the existing character data
        const characters = {
            'cartman': { name: 'Eric Cartman', colorScheme: '#dc3545' },
            'kyle': { name: 'Kyle Broflovski', colorScheme: '#4CAF50' },
            'stan': { name: 'Stan Marsh', colorScheme: '#2196F3' },
            'kenny': { name: 'Kenny McCormick', colorScheme: '#FF9800' },
            'craig': { name: 'Craig Tucker', colorScheme: '#87CEEB' },
            'tweek': { name: 'Tweek Tweak', colorScheme: '#FFD700' },
            'clyde': { name: 'Clyde Donovan', colorScheme: '#87CEEB' },
            'token': { name: 'Token Black', colorScheme: '#32CD32' },
            'bebe': { name: 'Bebe Stevens', colorScheme: '#FF69B4' },
            'wendy': { name: 'Wendy Testaburger', colorScheme: '#e91e63' },
            'butters': { name: 'Leopold Stotch', colorScheme: '#FFEB3B' }
        };
        return characters[characterKey];
    }

    // Utility methods
    generateChatId() {
        return 'chat_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    }

    generateMessageId() {
        return ++this.messageId;
    }

    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    getGenericMessage(senderId) {
        return `Hey everyone! What's going on? - ${senderId}`;
    }

    getMessageTemplates() {
        return {
            greeting: ['Hey everyone!', 'What\'s up guys?', 'Anyone here?'],
            question: ['What do you think?', 'Should we do this?', 'Any ideas?'],
            agreement: ['Sounds good!', 'I\'m in!', 'Let\'s do it!'],
            disagreement: ['I don\'t think so...', 'Maybe we should reconsider?', 'That might not work...']
        };
    }
}

// Global functions for integration
window.GroupChatSystem = GroupChatSystem;

window.generateRandomMessage = function(chatId) {
    if (window.groupChatInstance) {
        const chat = window.groupChatInstance.activeChats.get(chatId);
        if (chat) {
            const randomParticipant = chat.participants[Math.floor(Math.random() * chat.participants.length)];
            window.groupChatInstance.generateChatMessage(chatId, randomParticipant);
            window.groupChatInstance.renderMessages(chatId);
        }
    }
};

window.addUserMessage = function(chatId) {
    const message = prompt('Enter message:');
    if (message && window.groupChatInstance) {
        const chat = window.groupChatInstance.activeChats.get(chatId);
        if (chat) {
            const senderId = chat.participants[0]; // Default to first participant
            window.groupChatInstance.generateChatMessage(chatId, senderId, message);
            window.groupChatInstance.renderMessages(chatId);
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    window.groupChatInstance = new GroupChatSystem();
});
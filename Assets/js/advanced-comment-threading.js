/**
 * Advanced Comment Threading System for South Park Facebook Profiles
 * Generates realistic comment reply chains, arguments, and conversation flows
 */

class AdvancedCommentThreading {
    constructor(characterSystem) {
        this.characterSystem = characterSystem;
        this.activeThreads = new Map();
        this.argumentPatterns = this.initializeArgumentPatterns();
        this.conversationContexts = new Map();
        this.threadDepth = 0;
        this.maxThreadDepth = 5;
    }

    initializeArgumentPatterns() {
        return {
            'cartman_kyle_escalation': [
                { speaker: 'cartman', message: "Kyle, you're being totally lame about this!", sentiment: 'dismissive' },
                { speaker: 'kyle', message: "Cartman, you can't just ignore the facts!", sentiment: 'frustrated' },
                { speaker: 'cartman', message: "What facts? You're just making stuff up!", sentiment: 'defensive' },
                { speaker: 'kyle', message: "I have EVIDENCE, fatass!", sentiment: 'angry' },
                { speaker: 'cartman', message: "Don't call me fat, you stupid Jew!", sentiment: 'outraged' },
                { speaker: 'stan', message: "Guys, maybe we should just calm down...", sentiment: 'mediating' }
            ],
            'parent_concern_spiral': [
                { speaker: 'sheila', message: "This is completely unacceptable! WHAT WHAT WHAT?!", sentiment: 'outraged' },
                { speaker: 'sharon', message: "Sheila, maybe we should look at this rationally...", sentiment: 'calming' },
                { speaker: 'sheila', message: "Rationally?! Our children's safety is at stake!", sentiment: 'escalating' },
                { speaker: 'randy', message: "OH MY GOD! Sheila's right! This is HUGE!", sentiment: 'panicking' },
                { speaker: 'sharon', message: "Randy, you're not helping...", sentiment: 'exasperated' },
                { speaker: 'liane', message: "Should I bring snacks to the emergency meeting?", sentiment: 'oblivious' }
            ],
            'enabling_intervention': [
                { speaker: 'liane', message: "Eric is just being creative! He's such an angel!", sentiment: 'defensive' },
                { speaker: 'sharon', message: "Liane, maybe Eric needs some boundaries...", sentiment: 'concerned' },
                { speaker: 'liane', message: "Boundaries? But he's just a child expressing himself!", sentiment: 'protective' },
                { speaker: 'sheila', message: "Expressing himself by scamming people?!", sentiment: 'incredulous' },
                { speaker: 'liane', message: "Oh my! Eric would never do anything wrong!", sentiment: 'denial' },
                { speaker: 'gerald', message: "Legally speaking, this could be considered fraud...", sentiment: 'analytical' }
            ],
            'relationship_drama': [
                { speaker: 'craig', message: "I don't care about any of this drama.", sentiment: 'apathetic' },
                { speaker: 'tweek', message: "But what if the drama affects everyone?! GAH!", sentiment: 'anxious' },
                { speaker: 'craig', message: "Tweek, you worry too much. It's fine.", sentiment: 'reassuring' },
                { speaker: 'clyde', message: "*sobbing* Why does everything have to be so complicated?!", sentiment: 'emotional' },
                { speaker: 'craig', message: "See? This is exactly why I don't care.", sentiment: 'vindicated' }
            ]
        };
    }

    generateCommentThread(postAuthor, postContent, initialCommenters, context = 'general') {
        const threadId = this.generateThreadId();
        const thread = {
            id: threadId,
            postAuthor: postAuthor,
            postContent: postContent,
            comments: [],
            context: context,
            depth: 0,
            activeConversations: new Set(),
            argumentLevel: 0
        };

        // Generate initial comments
        initialCommenters.forEach((commenter, index) => {
            setTimeout(() => {
                const comment = this.generateContextualComment(commenter, postAuthor, postContent, context);
                this.addCommentToThread(thread, comment);
                
                // Chance for immediate replies
                if (Math.random() < 0.7) {
                    this.triggerReplyChain(thread, comment);
                }
            }, index * 1000);
        });

        this.activeThreads.set(threadId, thread);
        return thread;
    }

    generateContextualComment(commenterKey, postAuthorKey, postContent, context) {
        const commenter = this.characterSystem.characters[commenterKey];
        const relationship = this.characterSystem.getRelationship(commenterKey, postAuthorKey);
        
        let comment = {
            id: this.generateCommentId(),
            commenter: commenter,
            commenterKey: commenterKey,
            content: '',
            timestamp: new Date(),
            replies: [],
            likes: Math.floor(Math.random() * 15),
            sentiment: this.determineSentiment(commenterKey, postAuthorKey, context),
            replyTarget: null
        };

        // Generate comment based on context and relationship
        comment.content = this.generateSmartComment(commenterKey, postAuthorKey, context, relationship);
        
        return comment;
    }

    generateSmartComment(commenterKey, postAuthorKey, context, relationship) {
        const patterns = this.getCommentPatterns(commenterKey, postAuthorKey, context);
        let comment = this.characterSystem.randomChoice(patterns);
        
        // Add contextual modifiers
        if (context === 'crisis') {
            comment = this.addCrisisUrgency(comment, commenterKey);
        } else if (context === 'family') {
            comment = this.addFamilyDynamics(comment, commenterKey, postAuthorKey);
        }
        
        return comment;
    }

    triggerReplyChain(thread, triggerComment) {
        const potentialRepliers = this.getPotentialRepliers(triggerComment.commenterKey, thread);
        
        if (potentialRepliers.length === 0 || thread.depth >= this.maxThreadDepth) return;
        
        // Check if this should trigger an argument pattern
        const argumentPattern = this.detectArgumentPattern(triggerComment.commenterKey, potentialRepliers);
        
        if (argumentPattern) {
            this.executeArgumentPattern(thread, triggerComment, argumentPattern);
        } else {
            // Generate organic reply chain
            this.generateOrganicReplies(thread, triggerComment, potentialRepliers);
        }
    }

    detectArgumentPattern(commenterKey, potentialRepliers) {
        // Kyle vs Cartman
        if (commenterKey === 'kyle' && potentialRepliers.includes('cartman')) {
            return 'cartman_kyle_escalation';
        }
        if (commenterKey === 'cartman' && potentialRepliers.includes('kyle')) {
            return 'cartman_kyle_escalation';
        }
        
        // Parent drama
        if (['sheila', 'sharon', 'randy', 'liane'].includes(commenterKey)) {
            return 'parent_concern_spiral';
        }
        
        // Enabling intervention
        if (commenterKey === 'liane' && potentialRepliers.some(r => ['sharon', 'sheila', 'gerald'].includes(r))) {
            return 'enabling_intervention';
        }
        
        return null;
    }

    executeArgumentPattern(thread, triggerComment, patternName) {
        const pattern = this.argumentPatterns[patternName];
        if (!pattern) return;
        
        let currentReplyTarget = triggerComment;
        
        pattern.forEach((step, index) => {
            setTimeout(() => {
                if (thread.depth >= this.maxThreadDepth) return;
                
                const reply = {
                    id: this.generateCommentId(),
                    commenter: this.characterSystem.characters[step.speaker],
                    commenterKey: step.speaker,
                    content: step.message,
                    timestamp: new Date(),
                    replies: [],
                    likes: Math.floor(Math.random() * 8),
                    sentiment: step.sentiment,
                    replyTarget: currentReplyTarget.id,
                    isArgumentStep: true
                };
                
                this.addReplyToComment(currentReplyTarget, reply);
                thread.argumentLevel = Math.min(thread.argumentLevel + 1, 5);
                thread.depth++;
                
                currentReplyTarget = reply;
                
                // Chance for intervention
                if (thread.argumentLevel >= 3 && Math.random() < 0.4) {
                    this.triggerIntervention(thread, reply);
                }
                
            }, (index + 1) * 2000);
        });
    }

    generateOrganicReplies(thread, triggerComment, potentialRepliers) {
        const numReplies = Math.min(Math.floor(Math.random() * 3) + 1, potentialRepliers.length);
        const selectedRepliers = potentialRepliers.sort(() => Math.random() - 0.5).slice(0, numReplies);
        
        selectedRepliers.forEach((replierKey, index) => {
            setTimeout(() => {
                if (thread.depth >= this.maxThreadDepth) return;
                
                const reply = this.generateReply(replierKey, triggerComment, thread.context);
                this.addReplyToComment(triggerComment, reply);
                thread.depth++;
                
                // Chain reaction - replies can generate more replies
                if (Math.random() < 0.3 && thread.depth < this.maxThreadDepth) {
                    setTimeout(() => this.triggerReplyChain(thread, reply), 1500);
                }
                
            }, (index + 1) * 1500);
        });
    }

    generateReply(replierKey, originalComment, context) {
        const replier = this.characterSystem.characters[replierKey];
        const relationship = this.characterSystem.getRelationship(replierKey, originalComment.commenterKey);
        
        const reply = {
            id: this.generateCommentId(),
            commenter: replier,
            commenterKey: replierKey,
            content: this.generateReplyContent(replierKey, originalComment, context),
            timestamp: new Date(),
            replies: [],
            likes: Math.floor(Math.random() * 5),
            sentiment: this.determineSentiment(replierKey, originalComment.commenterKey, context),
            replyTarget: originalComment.id
        };
        
        return reply;
    }

    generateReplyContent(replierKey, originalComment, context) {
        const replyPatterns = this.getReplyPatterns(replierKey, originalComment.commenterKey);
        let reply = this.characterSystem.randomChoice(replyPatterns);
        
        // Add conversational connectors
        const connectors = this.getConversationalConnectors(originalComment.sentiment, replierKey);
        if (Math.random() < 0.4) {
            reply = connectors + ' ' + reply;
        }
        
        return reply;
    }

    triggerIntervention(thread, argumentComment) {
        const interventionCandidates = ['stan', 'sharon', 'token', 'wendy'].filter(char => 
            !thread.comments.some(comment => comment.commenterKey === char)
        );
        
        if (interventionCandidates.length === 0) return;
        
        const interventor = this.characterSystem.randomChoice(interventionCandidates);
        const interventionMessages = {
            'stan': 'Guys, maybe we should just calm down before this gets out of hand...',
            'sharon': '*sigh* Can we please try to be adults about this?',
            'token': 'Has anyone actually thought about this logically?',
            'wendy': 'This argument isn\'t solving anything productive!'
        };
        
        setTimeout(() => {
            const intervention = {
                id: this.generateCommentId(),
                commenter: this.characterSystem.characters[interventor],
                commenterKey: interventor,
                content: interventionMessages[interventor],
                timestamp: new Date(),
                replies: [],
                likes: Math.floor(Math.random() * 12),
                sentiment: 'mediating',
                replyTarget: argumentComment.id,
                isIntervention: true
            };
            
            this.addReplyToComment(argumentComment, intervention);
            thread.argumentLevel = Math.max(thread.argumentLevel - 1, 0);
            
        }, 2000);
    }

    getPotentialRepliers(originalCommenterKey, thread) {
        const allCharacters = Object.keys(this.characterSystem.characters);
        const alreadyCommented = new Set(thread.comments.map(c => c.commenterKey));
        
        // Remove original commenter and those who already commented
        let potentialRepliers = allCharacters.filter(char => 
            char !== originalCommenterKey && !alreadyCommented.has(char)
        );
        
        // Prioritize based on relationships
        const relationships = this.characterSystem.relationships[originalCommenterKey] || {};
        const priorityRepliers = [];
        
        // Enemies are likely to reply
        if (relationships.enemies) {
            priorityRepliers.push(...relationships.enemies);
        }
        
        // Best friends are likely to reply
        if (relationships.bestFriend) {
            priorityRepliers.push(relationships.bestFriend);
        }
        
        // Family members are likely to reply
        if (relationships.family) {
            priorityRepliers.push(...relationships.family);
        }
        
        // Merge and deduplicate
        const finalRepliers = [...new Set([...priorityRepliers, ...potentialRepliers.slice(0, 3)])];
        return finalRepliers.filter(char => potentialRepliers.includes(char));
    }

    getCommentPatterns(commenterKey, postAuthorKey, context) {
        // Use existing character patterns from the main system
        return this.characterSystem.characters[commenterKey]?.speechPatterns || [
            "This is interesting!",
            "I have thoughts about this.",
            "Thanks for sharing!"
        ];
    }

    getReplyPatterns(replierKey, originalCommenterKey) {
        const relationship = this.characterSystem.getRelationship(replierKey, originalCommenterKey);
        
        const basePatterns = {
            'enemy': [
                "You're totally wrong about this!",
                "That's the dumbest thing I've ever heard!",
                "Why would anyone listen to you?",
                "This is exactly why nobody likes you!"
            ],
            'friend': [
                "I totally agree with you!",
                "You make a really good point!",
                "That's exactly what I was thinking!",
                "Thanks for saying what we're all thinking!"
            ],
            'family': [
                "As your [family member], I think...",
                "We've talked about this at home...",
                "Family always supports family!",
                "I'm proud of you for speaking up!"
            ],
            'neutral': [
                "Interesting perspective!",
                "I hadn't thought about it that way.",
                "That's one way to look at it.",
                "Thanks for the insight!"
            ]
        };
        
        return basePatterns[relationship] || basePatterns['neutral'];
    }

    getConversationalConnectors(originalSentiment, replierKey) {
        const connectors = {
            'angry': ['Hold on,', 'Wait a minute,', 'Actually,'],
            'happy': ['Yes!', 'Exactly!', 'I love this!'],
            'sad': ['I understand,', 'That\'s tough,', 'I feel you,'],
            'defensive': ['Look,', 'Listen,', 'Here\'s the thing,'],
            'neutral': ['Well,', 'So,', 'I think']
        };
        
        return this.characterSystem.randomChoice(connectors[originalSentiment] || connectors['neutral']);
    }

    determineSentiment(commenterKey, postAuthorKey, context) {
        const relationship = this.characterSystem.getRelationship(commenterKey, postAuthorKey);
        const personality = this.characterSystem.characters[commenterKey]?.personality || 'neutral';
        
        if (relationship === 'enemy') return 'hostile';
        if (relationship === 'friend') return 'supportive';
        if (relationship === 'family') return 'caring';
        if (context === 'crisis') return 'concerned';
        if (personality === 'scheming') return 'opportunistic';
        
        return 'neutral';
    }

    addCommentToThread(thread, comment) {
        thread.comments.push(comment);
    }

    addReplyToComment(parentComment, reply) {
        parentComment.replies.push(reply);
    }

    addCrisisUrgency(comment, commenterKey) {
        const urgencyPrefixes = {
            'sheila': 'WHAT WHAT WHAT?! ',
            'randy': 'OH MY GOD! ',
            'cartman': 'Seriously you guys! ',
            'kyle': 'This is really important! '
        };
        
        const prefix = urgencyPrefixes[commenterKey] || 'Listen! ';
        return prefix + comment;
    }

    addFamilyDynamics(comment, commenterKey, postAuthorKey) {
        const familyRelationship = this.characterSystem.relationships[commenterKey];
        
        if (familyRelationship?.child === postAuthorKey) {
            return "As your parent, " + comment.toLowerCase();
        } else if (familyRelationship?.spouse === postAuthorKey) {
            return "Honey, " + comment.toLowerCase();
        } else if (familyRelationship?.family?.includes(postAuthorKey)) {
            return "Family, " + comment.toLowerCase();
        }
        
        return comment;
    }

    generateThreadId() {
        return 'thread_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    }

    generateCommentId() {
        return 'comment_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    }

    renderThreadedComments(container, thread) {
        const threadHTML = this.generateThreadHTML(thread);
        container.innerHTML = threadHTML;
        this.attachThreadEventListeners(container);
    }

    generateThreadHTML(thread) {
        let html = '<div class="threaded-comments">';
        
        thread.comments.forEach(comment => {
            html += this.generateCommentHTML(comment, 0);
        });
        
        html += '</div>';
        return html;
    }

    generateCommentHTML(comment, depth) {
        const indentClass = depth > 0 ? `indent-${Math.min(depth, 5)}` : '';
        const sentimentClass = `sentiment-${comment.sentiment}`;
        
        let html = `
            <div class="threaded-comment ${indentClass} ${sentimentClass}" data-comment-id="${comment.id}">
                <div class="comment-header">
                    <div class="comment-avatar" style="background: linear-gradient(45deg, ${comment.commenter.colorScheme}, ${this.lightenColor(comment.commenter.colorScheme)});">
                        ${comment.commenter.avatar}
                    </div>
                    <div class="comment-info">
                        <strong class="commenter-name">${comment.commenter.name}</strong>
                        <span class="comment-time">${this.formatTimeAgo(comment.timestamp)}</span>
                    </div>
                </div>
                <div class="comment-content">${comment.content}</div>
                <div class="comment-actions">
                    <button class="comment-like" data-likes="${comment.likes}">👍 ${comment.likes}</button>
                    <button class="comment-reply" data-comment-id="${comment.id}">Reply</button>
                </div>
        `;
        
        if (comment.replies && comment.replies.length > 0) {
            html += '<div class="comment-replies">';
            comment.replies.forEach(reply => {
                html += this.generateCommentHTML(reply, depth + 1);
            });
            html += '</div>';
        }
        
        html += '</div>';
        return html;
    }

    attachThreadEventListeners(container) {
        container.querySelectorAll('.comment-like').forEach(button => {
            button.addEventListener('click', (e) => {
                const currentLikes = parseInt(e.target.dataset.likes);
                const newLikes = currentLikes + 1;
                e.target.dataset.likes = newLikes;
                e.target.innerHTML = `👍 ${newLikes}`;
                e.target.style.color = '#1877f2';
            });
        });
    }

    lightenColor(color, percent = 20) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
                    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
                    (B < 255 ? B < 1 ? 0 : B : 255))
                    .toString(16).slice(1);
    }

    formatTimeAgo(timestamp) {
        const now = new Date();
        const diffMs = now - timestamp;
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m`;
        return `${Math.floor(diffMins / 60)}h`;
    }
}

// CSS for threaded comments
const threadedCommentStyles = `
    .threaded-comments {
        margin-top: 20px;
    }
    
    .threaded-comment {
        margin: 10px 0;
        padding: 10px;
        border-radius: 8px;
        background: #f8f9fa;
        transition: all 0.2s ease;
    }
    
    .threaded-comment:hover {
        background: #e9ecef;
    }
    
    .indent-1 { margin-left: 30px; border-left: 3px solid #1877f2; }
    .indent-2 { margin-left: 60px; border-left: 3px solid #42a5f5; }
    .indent-3 { margin-left: 90px; border-left: 3px solid #64b5f6; }
    .indent-4 { margin-left: 120px; border-left: 3px solid #90caf9; }
    .indent-5 { margin-left: 150px; border-left: 3px solid #bbdefb; }
    
    .sentiment-hostile { border-left-color: #f44336; background: #ffebee; }
    .sentiment-supportive { border-left-color: #4caf50; background: #e8f5e8; }
    .sentiment-caring { border-left-color: #2196f3; background: #e3f2fd; }
    .sentiment-concerned { border-left-color: #ff9800; background: #fff3e0; }
    .sentiment-mediating { border-left-color: #9c27b0; background: #f3e5f5; }
    
    .comment-replies {
        margin-top: 10px;
    }
    
    .comment-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
    }
    
    .comment-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 10px;
    }
    
    .comment-actions {
        margin-top: 8px;
        display: flex;
        gap: 15px;
    }
    
    .comment-like, .comment-reply {
        background: none;
        border: none;
        color: #65676b;
        cursor: pointer;
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 4px;
    }
    
    .comment-like:hover, .comment-reply:hover {
        background: #e4e6ea;
    }
`;

// Inject threaded comment styles
const threadedStyleSheet = document.createElement('style');
threadedStyleSheet.textContent = threadedCommentStyles;
document.head.appendChild(threadedStyleSheet);

// Export the advanced threading system
window.AdvancedCommentThreading = AdvancedCommentThreading;
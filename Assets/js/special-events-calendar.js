/**
 * South Park Special Events Calendar System
 * Manages holidays, town events, and character-specific celebrations
 */

class SpecialEventsCalendar {
    constructor(characterSystem, moodSystem) {
        this.characterSystem = characterSystem;
        this.moodSystem = moodSystem;
        this.activeEvents = new Map();
        this.eventHistory = [];
        this.eventTemplates = this.initializeEventTemplates();
        this.seasonalEvents = this.initializeSeasonalEvents();
        this.characterEvents = this.initializeCharacterEvents();
        this.startEventMonitoring();
    }

    initializeEventTemplates() {
        return {
            'halloween': {
                name: 'Halloween in South Park',
                duration: 24 * 60 * 60 * 1000, // 24 hours
                description: 'Spooky season brings out the best and worst in South Park residents',
                characterReactions: {
                    'cartman': {
                        posts: [
                            "ATTENTION FRIENDS! Cartman's Halloween Candy Exchange is now OPEN! Trade your lame candy for premium Cartman-approved treats! 🍭💰",
                            "My costume this year is going to be EPIC! Nobody will guess who I am! (Hint: I'm someone AWESOME) 👻",
                            "Halloween is the perfect time for... business opportunities. Check out my new Haunted House experience! Only $20 per person! 👻💵"
                        ],
                        mood_triggers: ['business_opportunity', 'attention_seeking'],
                        interactions: ['increased_posting', 'costume_bragging', 'candy_hoarding']
                    },
                    'kyle': {
                        posts: [
                            "Halloween should be about community fun, not Cartman's latest money-making scheme! 🎃✊",
                            "Reminder: check all candy before eating! Safety first, South Park! 🍬🔍",
                            "The history of Halloween traditions is actually really fascinating... anyone want to learn? 📚🎃"
                        ],
                        mood_triggers: ['educational_opportunity', 'cartman_opposition'],
                        interactions: ['safety_warnings', 'historical_facts', 'anti_cartman_posts']
                    },
                    'stan': {
                        posts: [
                            "Just trying to have a normal Halloween... why does everything in this town have to be so complicated? 🎃😐",
                            "Anyone else remember when Halloween was just about trick-or-treating? Simpler times... 👻",
                            "My dad already has 17 different costume ideas. Send help. 🤦‍♂️"
                        ],
                        mood_triggers: ['nostalgia', 'randy_embarrassment'],
                        interactions: ['normal_posts', 'dad_complaints', 'simple_wishes']
                    },
                    'randy': {
                        posts: [
                            "OH MY GOD! I just figured out the PERFECT Halloween costume! It's going to revolutionize costume parties! 🎭🚀",
                            "Sharon doesn't appreciate my vision for our Halloween decorations, but wait until she sees the fog machine installation! 🌫️💡",
                            "Halloween is actually deeply connected to ancient agricultural practices! Let me tell you about Tegridy Halloween! 🎃🌿"
                        ],
                        mood_triggers: ['new_obsession', 'creative_enthusiasm'],
                        interactions: ['costume_planning', 'decoration_overload', 'historical_connections']
                    },
                    'sheila': {
                        posts: [
                            "WHAT WHAT WHAT?! Some houses are giving out candy with artificial colors! This is unacceptable! 🍭⚠️",
                            "Parents! We need to organize a safe trick-or-treating route! I've created a spreadsheet with safety ratings! 📊👻",
                            "Kyle's costume is absolutely perfect! My brilliant boy is going as a social justice warrior! So proud! ✊💙"
                        ],
                        mood_triggers: ['child_safety_concern', 'organization_mode'],
                        interactions: ['safety_campaigns', 'proud_mom_posts', 'community_organizing']
                    },
                    'sharon': {
                        posts: [
                            "Randy has turned our front yard into what he calls 'Halloween Wonderland.' The neighbors are... concerned. 🎃😅",
                            "Wine pairs surprisingly well with Halloween candy. Scientific fact. 🍷🍬",
                            "Stan's costume is simple and perfect. Unlike his father's 47-piece 'masterpiece.' 👻🤦‍♀️"
                        ],
                        mood_triggers: ['randy_antics', 'wine_time'],
                        interactions: ['reality_checks', 'mom_pride', 'husband_management']
                    },
                    'liane': {
                        posts: [
                            "Oh my! Eric looks absolutely adorable in his costume! He's going as a successful businessman! So creative! 👔💕",
                            "I made 400 special Halloween treats for Eric to give to his friends! He's so thoughtful! 🍪👻",
                            "Eric's Halloween party planning is so impressive! He's charging admission to help pay for decorations! Such an entrepreneur! 💰🎉"
                        ],
                        mood_triggers: ['eric_happiness', 'mothering_opportunity'],
                        interactions: ['enabling_posts', 'proud_mom_content', 'party_planning']
                    }
                },
                globalEffects: {
                    posting_frequency: 1.5,
                    argument_likelihood: 1.2,
                    business_schemes: 2.0,
                    community_organizing: 1.8
                }
            },
            'christmas': {
                name: 'Christmas in South Park',
                duration: 72 * 60 * 60 * 1000, // 3 days
                description: 'The most wonderful and chaotic time of the year',
                characterReactions: {
                    'cartman': {
                        posts: [
                            "SERIOUSLY you guys! Christmas is the BEST time for business! Check out my premium gift-wrapping service! 🎁💵",
                            "I've been extra good this year! Santa definitely owes me the BEST presents! 🎅✨",
                            "My Christmas list is 47 pages long. Mom's already started shopping! Best Christmas ever! 📝🎄"
                        ],
                        mood_triggers: ['christmas_greed', 'present_anticipation'],
                        interactions: ['gift_demands', 'business_promotions', 'santa_negotiations']
                    },
                    'kyle': {
                        posts: [
                            "Christmas should be about giving, not getting. Let's remember what's really important! 🎄❤️",
                            "Organizing a toy drive for families in need! Christmas is about community! 🧸✊",
                            "Cartman's Christmas 'businesses' are getting out of hand. Someone needs to stop this! 🚫💰"
                        ],
                        mood_triggers: ['christmas_spirit', 'charitable_mood'],
                        interactions: ['charity_organizing', 'anti_commercialism', 'community_service']
                    },
                    'sheila': {
                        posts: [
                            "WHAT WHAT WHAT?! Christmas decorations are going up before Thanksgiving! This timeline is unacceptable! 📅⚠️",
                            "Kyle's Christmas pageant performance was PERFECT! My brilliant angel! So proud! 🎭💙",
                            "Emergency parent meeting! We need to discuss appropriate Christmas gift limits for children! 🎁📢"
                        ],
                        mood_triggers: ['holiday_tradition_protection', 'kyle_pride'],
                        interactions: ['tradition_defense', 'gift_regulation', 'pageant_promotion']
                    },
                    'randy': {
                        posts: [
                            "OH MY GOD! I'm going to create the ULTIMATE Christmas light display! This will revolutionize holiday decorating! 💡🎄",
                            "Christmas trees are actually deeply connected to ancient winter solstice celebrations and Tegridy! 🌲🌿",
                            "Sharon doesn't understand my vision for Christmas morning, but wait until she sees my surprise! 🎁🤯"
                        ],
                        mood_triggers: ['christmas_project_mania', 'decoration_obsession'],
                        interactions: ['light_display_planning', 'historical_connections', 'surprise_preparation']
                    }
                },
                globalEffects: {
                    posting_frequency: 2.0,
                    family_interactions: 2.5,
                    business_activity: 1.8,
                    charitable_mood: 1.5
                }
            },
            'school_election': {
                name: 'South Park Elementary Election',
                duration: 48 * 60 * 60 * 1000, // 2 days
                description: 'Democracy in action at the elementary level',
                characterReactions: {
                    'wendy': {
                        posts: [
                            "Vote Wendy for Class President! Real change, real leadership! ✊🗳️",
                            "My platform focuses on actual student needs, not empty promises! 📋💪",
                            "Democracy is too important to leave to demagogues and troublemakers! Make your voice heard! 🗳️✊"
                        ],
                        mood_triggers: ['campaign_mode', 'leadership_drive'],
                        interactions: ['policy_posts', 'campaign_rallies', 'voter_education']
                    },
                    'cartman': {
                        posts: [
                            "VOTE CARTMAN for Class President! Free ice cream! No homework! Premium air for everyone! 🍦📚💨",
                            "My opponent makes promises she can't keep! I make promises that are AWESOME! 🎉👑",
                            "Campaign contributions now accepted! Every donation gets you a premium Cartman campaign button! 💰📌"
                        ],
                        mood_triggers: ['campaign_schemes', 'power_hunger'],
                        interactions: ['impossible_promises', 'bribery_attempts', 'rally_organization']
                    },
                    'kyle': {
                        posts: [
                            "Please vote responsibly! Research the candidates and their actual policies! 🗳️📚",
                            "A functioning democracy requires informed citizens, even at the elementary level! ⚖️👥",
                            "Cartman's campaign promises are literally impossible. Vote for real leadership! ✋🚫"
                        ],
                        mood_triggers: ['civic_duty', 'anti_cartman_campaign'],
                        interactions: ['voter_education', 'fact_checking', 'campaign_opposition']
                    }
                },
                globalEffects: {
                    argument_likelihood: 2.5,
                    political_posts: 3.0,
                    community_engagement: 2.0
                }
            }
        };
    }

    initializeSeasonalEvents() {
        return {
            'spring': {
                events: ['spring_break', 'easter', 'earth_day'],
                mood_effects: {
                    general_optimism: 0.3,
                    outdoor_activities: 0.5,
                    environmental_awareness: 0.4
                }
            },
            'summer': {
                events: ['summer_vacation', 'fourth_july', 'camping_trip'],
                mood_effects: {
                    relaxation: 0.4,
                    family_time: 0.6,
                    adventure_seeking: 0.5
                }
            },
            'fall': {
                events: ['back_to_school', 'halloween', 'thanksgiving'],
                mood_effects: {
                    academic_focus: 0.5,
                    family_gathering: 0.6,
                    seasonal_preparation: 0.4
                }
            },
            'winter': {
                events: ['christmas', 'new_years', 'winter_storm'],
                mood_effects: {
                    family_bonding: 0.7,
                    gift_giving: 0.8,
                    weather_complaints: 0.3
                }
            }
        };
    }

    initializeCharacterEvents() {
        return {
            'cartman_business_launch': {
                trigger: 'weekly',
                probability: 0.3,
                name: 'New Cartman Enterprise',
                duration: 48 * 60 * 60 * 1000,
                effects: {
                    'cartman': ['business_euphoria', 'marketing_mode'],
                    'kyle': ['scheme_opposition', 'ethical_concerns'],
                    'liane': ['proud_supporter', 'financial_enabler']
                }
            },
            'randy_obsession_cycle': {
                trigger: 'bi_weekly',
                probability: 0.6,
                name: 'Randy\'s New Passion Project',
                duration: 120 * 60 * 60 * 1000, // 5 days
                effects: {
                    'randy': ['manic_enthusiasm', 'project_focus'],
                    'sharon': ['increasing_exasperation', 'wine_dependency'],
                    'stan': ['embarrassment_levels', 'damage_control']
                }
            },
            'sheila_crusade_activation': {
                trigger: 'monthly',
                probability: 0.4,
                name: 'Sheila\'s Moral Campaign',
                duration: 96 * 60 * 60 * 1000, // 4 days
                effects: {
                    'sheila': ['activist_mode', 'organization_frenzy'],
                    'gerald': ['supportive_spouse', 'legal_backup'],
                    'kyle': ['family_pride', 'moral_support']
                }
            }
        };
    }

    getCurrentSeason() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'spring';
        if (month >= 5 && month <= 7) return 'summer';
        if (month >= 8 && month <= 10) return 'fall';
        return 'winter';
    }

    checkForHolidays() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        
        const holidays = {
            '10-31': 'halloween',
            '12-25': 'christmas',
            '7-4': 'fourth_july',
            '11-4': 'election_day', // First Tuesday approximation
            '2-14': 'valentines_day',
            '3-17': 'st_patricks_day'
        };
        
        const dateKey = `${month}-${day}`;
        return holidays[dateKey] || null;
    }

    activateEvent(eventKey, customDuration = null) {
        const eventTemplate = this.eventTemplates[eventKey];
        if (!eventTemplate) return false;
        
        const event = {
            key: eventKey,
            name: eventTemplate.name,
            startTime: Date.now(),
            duration: customDuration || eventTemplate.duration,
            description: eventTemplate.description,
            characterReactions: eventTemplate.characterReactions,
            globalEffects: eventTemplate.globalEffects,
            active: true
        };
        
        this.activeEvents.set(eventKey, event);
        this.applyEventEffects(event);
        this.generateEventPosts(event);
        this.triggerEventMoods(event);
        
        console.log(`🎉 Event activated: ${event.name}`);
        return true;
    }

    applyEventEffects(event) {
        // Apply global effects
        if (event.globalEffects) {
            Object.keys(event.globalEffects).forEach(effect => {
                this.applyGlobalEffect(effect, event.globalEffects[effect]);
            });
        }
        
        // Apply character-specific effects
        if (event.characterReactions) {
            Object.keys(event.characterReactions).forEach(charKey => {
                const reactions = event.characterReactions[charKey];
                if (reactions.mood_triggers) {
                    reactions.mood_triggers.forEach(trigger => {
                        this.moodSystem.triggerMoodChange(charKey, trigger, { event: event.key });
                    });
                }
            });
        }
    }

    applyGlobalEffect(effectType, multiplier) {
        switch (effectType) {
            case 'posting_frequency':
                // Increase posting frequency for all characters
                this.characterSystem.globalModifiers = this.characterSystem.globalModifiers || {};
                this.characterSystem.globalModifiers.posting_frequency = multiplier;
                break;
            case 'argument_likelihood':
                // Increase chance of arguments
                this.characterSystem.globalModifiers = this.characterSystem.globalModifiers || {};
                this.characterSystem.globalModifiers.argument_likelihood = multiplier;
                break;
            case 'business_activity':
                // Increase business-related posts
                if (this.moodSystem) {
                    this.moodSystem.triggerMoodChange('cartman', 'business_opportunity');
                }
                break;
        }
    }

    generateEventPosts(event) {
        if (!event.characterReactions) return;
        
        let delay = 0;
        Object.keys(event.characterReactions).forEach(charKey => {
            const reactions = event.characterReactions[charKey];
            if (reactions.posts && reactions.posts.length > 0) {
                
                // Schedule posts throughout the event
                reactions.posts.forEach((post, index) => {
                    setTimeout(() => {
                        this.createEventPost(charKey, post, event.key);
                    }, delay + (index * 30000)); // 30 seconds between posts
                });
                
                delay += 60000; // 1 minute between characters
            }
        });
    }

    createEventPost(characterKey, content, eventKey) {
        if (typeof window !== 'undefined' && window.newsFeed) {
            const character = this.characterSystem.characters[characterKey];
            const post = {
                id: this.generateEventPostId(),
                author: characterKey,
                authorName: character.name,
                content: content,
                type: 'event',
                eventKey: eventKey,
                mood: this.moodSystem.getMoodEmoji(characterKey),
                timestamp: new Date(),
                likes: Math.floor(Math.random() * 30) + 10,
                comments: Math.floor(Math.random() * 15) + 5,
                shares: Math.floor(Math.random() * 8) + 2,
                isEventPost: true
            };
            
            window.newsFeed.posts.unshift(post);
            window.newsFeed.renderPost(post, true);
        }
    }

    triggerEventMoods(event) {
        if (!event.characterReactions) return;
        
        Object.keys(event.characterReactions).forEach(charKey => {
            const reactions = event.characterReactions[charKey];
            if (reactions.mood_triggers) {
                // Stagger mood triggers
                reactions.mood_triggers.forEach((trigger, index) => {
                    setTimeout(() => {
                        if (this.moodSystem) {
                            this.moodSystem.triggerMoodChange(charKey, trigger, { 
                                event: event.key,
                                source: 'event_system'
                            });
                        }
                    }, index * 10000); // 10 seconds between triggers
                });
            }
        });
    }

    checkActiveEvents() {
        this.activeEvents.forEach((event, eventKey) => {
            const elapsed = Date.now() - event.startTime;
            
            if (elapsed >= event.duration) {
                this.deactivateEvent(eventKey);
            } else {
                // Check for mid-event triggers
                this.checkEventProgression(event, elapsed);
            }
        });
    }

    checkEventProgression(event, elapsed) {
        const progressPercentage = elapsed / event.duration;
        
        // Trigger different phases of events
        if (progressPercentage > 0.5 && !event.midPointTriggered) {
            this.triggerEventMidPoint(event);
            event.midPointTriggered = true;
        }
        
        if (progressPercentage > 0.8 && !event.nearEndTriggered) {
            this.triggerEventNearEnd(event);
            event.nearEndTriggered = true;
        }
    }

    triggerEventMidPoint(event) {
        // Escalate existing moods or introduce complications
        if (event.key === 'halloween') {
            this.moodSystem?.triggerMoodChange('cartman', 'scheme_escalation');
            this.createEventPost('kyle', 'Cartman\'s Halloween schemes are getting out of hand! Someone needs to stop this! 🎃⚠️', event.key);
        }
        
        if (event.key === 'christmas') {
            this.moodSystem?.triggerMoodChange('sheila', 'holiday_stress');
            this.createEventPost('sharon', 'Randy\'s Christmas light display can be seen from space. The electric bill will be... substantial. 💡💸', event.key);
        }
    }

    triggerEventNearEnd(event) {
        // Resolution or climax moments
        if (event.key === 'school_election') {
            this.createEventPost('wendy', 'Election results are in! Thank you to everyone who participated in democracy! 🗳️✨', event.key);
            this.moodSystem?.triggerMoodChange('cartman', 'electoral_disappointment');
        }
    }

    deactivateEvent(eventKey) {
        const event = this.activeEvents.get(eventKey);
        if (!event) return;
        
        event.active = false;
        this.eventHistory.push({
            ...event,
            endTime: Date.now(),
            totalDuration: Date.now() - event.startTime
        });
        
        this.activeEvents.delete(eventKey);
        this.removeEventEffects(event);
        
        console.log(`🎊 Event ended: ${event.name}`);
    }

    removeEventEffects(event) {
        // Reset global modifiers
        if (this.characterSystem.globalModifiers) {
            this.characterSystem.globalModifiers = {};
        }
        
        // Create post-event content
        this.generatePostEventContent(event);
    }

    generatePostEventContent(event) {
        // Characters reflect on completed events
        const reflectionPosts = {
            'halloween': {
                'stan': 'Well, another Halloween in South Park. Somehow we all survived... again. 🎃😅',
                'sharon': 'Cleaning up Randy\'s Halloween decorations will take until Thanksgiving. 🧹😮‍💨',
                'kyle': 'Despite Cartman\'s schemes, Halloween was actually kind of fun. Community spirit prevails! ✨'
            },
            'christmas': {
                'liane': 'Eric had such a wonderful Christmas! He got everything on his list... and then some! 🎁💕',
                'gerald': 'Another successful Christmas with the family. Time to start planning next year... 🎄👨‍👦',
                'randy': 'Christmas is over, but my holiday spirit lives on! Time to plan Easter decorations! 🐰✨'
            }
        };
        
        const eventReflections = reflectionPosts[event.key];
        if (eventReflections) {
            Object.keys(eventReflections).forEach((charKey, index) => {
                setTimeout(() => {
                    this.createEventPost(charKey, eventReflections[charKey], 'post_' + event.key);
                }, index * 15000);
            });
        }
    }

    startEventMonitoring() {
        // Check for holidays and trigger events
        setInterval(() => {
            const holiday = this.checkForHolidays();
            if (holiday && !this.activeEvents.has(holiday)) {
                this.activateEvent(holiday);
            }
            
            this.checkActiveEvents();
            this.checkCharacterEvents();
        }, 60000); // Check every minute
        
        // Weekly event checks
        setInterval(() => {
            this.checkWeeklyEvents();
        }, 7 * 24 * 60 * 60 * 1000); // Weekly
        
        // Random event triggers
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every hour
                this.triggerRandomEvent();
            }
        }, 60 * 60 * 1000); // Hourly
    }

    checkCharacterEvents() {
        Object.keys(this.characterEvents).forEach(eventKey => {
            const eventDef = this.characterEvents[eventKey];
            const shouldTrigger = Math.random() < (eventDef.probability / 24); // Daily probability
            
            if (shouldTrigger && !this.activeEvents.has(eventKey)) {
                this.activateCharacterEvent(eventKey);
            }
        });
    }

    activateCharacterEvent(eventKey) {
        const eventDef = this.characterEvents[eventKey];
        const event = {
            key: eventKey,
            name: eventDef.name,
            startTime: Date.now(),
            duration: eventDef.duration,
            effects: eventDef.effects,
            active: true,
            isCharacterEvent: true
        };
        
        this.activeEvents.set(eventKey, event);
        
        // Apply character-specific effects
        Object.keys(event.effects).forEach(charKey => {
            const effects = event.effects[charKey];
            effects.forEach(effect => {
                if (this.moodSystem) {
                    this.moodSystem.triggerMoodChange(charKey, effect, { event: eventKey });
                }
            });
        });
    }

    triggerRandomEvent() {
        const randomEvents = [
            'minor_crisis',
            'community_celebration',
            'weather_event',
            'school_announcement'
        ];
        
        const eventKey = randomEvents[Math.floor(Math.random() * randomEvents.length)];
        this.createRandomEventContent(eventKey);
    }

    createRandomEventContent(eventKey) {
        const randomContent = {
            'minor_crisis': {
                'sheila': 'WHAT WHAT WHAT?! There\'s a minor issue at the school! Emergency parent meeting in 10 minutes! 📢⚠️',
                'sharon': '*sigh* Here we go again... 🤦‍♀️'
            },
            'community_celebration': {
                'randy': 'OH MY GOD! We need to celebrate this amazing community moment! Party at our house! 🎉🏠',
                'kyle': 'It\'s nice to see the community coming together for positive reasons! ✨👥'
            }
        };
        
        const content = randomContent[eventKey];
        if (content) {
            Object.keys(content).forEach((charKey, index) => {
                setTimeout(() => {
                    this.createEventPost(charKey, content[charKey], eventKey);
                }, index * 5000);
            });
        }
    }

    getActiveEvents() {
        return Array.from(this.activeEvents.values());
    }

    getEventHistory() {
        return this.eventHistory.slice(-10); // Last 10 events
    }

    generateEventPostId() {
        return 'event_post_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    }
}

// Export the events system
window.SpecialEventsCalendar = SpecialEventsCalendar;
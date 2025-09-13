/**
 * South Park Facebook Profiles - Character Interconnections System
 * Manages cross-profile interactions, comments, and relationship dynamics
 */

class CharacterInteractionSystem {
    constructor() {
        this.characters = {};
        this.interactions = [];
        this.relationships = {};
        this.initializeCharacters();
        this.initializeRelationships();
        this.loadInteractions();
    }

    initializeCharacters() {
        this.characters = {
            'cartman': {
                name: 'Eric Cartman',
                avatar: 'EC',
                colorScheme: '#dc3545',
                speechPatterns: ['Seriously you guys', 'Sweet!', 'That is so lame'],
                personality: 'scheming',
                onlineStatus: 'Always Scheming'
            },
            'kyle': {
                name: 'Kyle Broflovski',
                avatar: 'KB',
                colorScheme: '#4CAF50',
                speechPatterns: ['Dude!', 'This is wrong!', 'We have to do something'],
                personality: 'moral',
                onlineStatus: 'Fighting injustice'
            },
            'stan': {
                name: 'Stan Marsh',
                avatar: 'SM',
                colorScheme: '#2196F3',
                speechPatterns: ['Oh man', 'This is crazy', 'Whatever'],
                personality: 'normal',
                onlineStatus: 'Trying to stay sane'
            },
            'kenny': {
                name: 'Kenny McCormick',
                avatar: 'KM',
                colorScheme: '#FF9800',
                speechPatterns: ['Mmpfh mph mmpfh', '(Translation: Hey guys!)', 'Mmph mmpfh!'],
                personality: 'mysterious',
                onlineStatus: 'Alive (for now)'
            },
            'randy': {
                name: 'Randy Marsh',
                avatar: 'RM',
                colorScheme: '#9C27B0',
                speechPatterns: ['Oh my God!', 'Sharon!', 'This is huge!'],
                personality: 'obsessive',
                onlineStatus: 'Having a moment'
            },
            'butters': {
                name: 'Leopold "Butters" Stotch',
                avatar: 'BS',
                colorScheme: '#FFEB3B',
                speechPatterns: ['Oh hamburgers!', 'Aw jeez', 'That\'s swell!'],
                personality: 'innocent',
                onlineStatus: 'Being wholesome'
            },
            'garrison': {
                name: 'Mr. Garrison',
                avatar: 'HG',
                colorScheme: '#E91E63',
                speechPatterns: ['Okay children', 'That\'s enough!', 'What the hell?'],
                personality: 'unstable',
                onlineStatus: 'Identity crisis'
            },
            'jimmy': {
                name: 'Jimmy Valmer',
                avatar: 'JV',
                colorScheme: '#ff6b35',
                speechPatterns: ['Wow, w-what a great audience!', 'That\'s p-p-pretty funny!', 'Thank you, thank you!'],
                personality: 'comedic',
                onlineStatus: 'Working on new material'
            },
            'wendy': {
                name: 'Wendy Testaburger',
                avatar: 'WT',
                colorScheme: '#e91e63',
                speechPatterns: ['This is unacceptable!', 'We need to take action!', 'As class president...'],
                personality: 'activist',
                onlineStatus: 'Fighting injustice'
            },
            'timmy': {
                name: 'Timmy Burch',
                avatar: 'TB',
                colorScheme: '#2196f3',
                speechPatterns: ['TIMMY!', 'TIMMEH!', 'Timmy...', 'Timmy Burch!'],
                personality: 'enthusiastic',
                onlineStatus: 'Being awesome'
            },
            'craig': {
                name: 'Craig Tucker',
                avatar: 'CT',
                colorScheme: '#87CEEB',
                speechPatterns: ['I don\'t care', 'Whatever', '*flips you off*', 'This is stupid'],
                personality: 'apathetic',
                onlineStatus: 'Not caring'
            },
            'tweek': {
                name: 'Tweek Tweak',
                avatar: 'TT',
                colorScheme: '#FFD700',
                speechPatterns: ['GAH!', 'What if...?!', '*pulls hair*', 'This is terrible!'],
                personality: 'anxious',
                onlineStatus: 'Panicking about something'
            },
            'clyde': {
                name: 'Clyde Donovan',
                avatar: 'CD',
                colorScheme: '#87CEEB',
                speechPatterns: ['*sobbing*', 'This is so sad!', '*sniffling*', 'Why does everything hurt?'],
                personality: 'emotional',
                onlineStatus: 'Crying about something'
            },
            'token': {
                name: 'Token Black',
                avatar: 'TB',
                colorScheme: '#32CD32',
                speechPatterns: ['This is obviously...', '*sigh*', 'I told you so', 'Think before you act'],
                personality: 'practical',
                onlineStatus: 'Being right about everything'
            },
            'bebe': {
                name: 'Bebe Stevens',
                avatar: 'BS',
                colorScheme: '#FF69B4',
                speechPatterns: ['Obviously!', 'That\'s so cute!', '*hair flip*', 'I look amazing today'],
                personality: 'popular',
                onlineStatus: 'Setting trends'
            },
            'gerald': {
                name: 'Gerald Broflovski',
                avatar: 'GB',
                colorScheme: '#2C3E50',
                speechPatterns: ['Professionally speaking...', 'As a lawyer...', '*secretly trolling*', 'Justice is important'],
                personality: 'dual_identity',
                onlineStatus: 'Maintaining public image'
            },
            'sheila': {
                name: 'Sheila Broflovski',
                avatar: 'SB',
                colorScheme: '#FF6B35',
                speechPatterns: ['WHAT WHAT WHAT?!', 'This is unacceptable!', 'Think of the children!', 'We need immediate action!'],
                personality: 'outraged',
                onlineStatus: 'Leading a moral crusade'
            },
            'chef': {
                name: 'Chef (Memorial)',
                avatar: '👨‍🍳',
                colorScheme: '#8B4513',
                speechPatterns: ['Hello there, children!', '🎵 *soulful wisdom* 🎵', 'Life lessons through music', 'Inappropriate but caring advice'],
                personality: 'memorial',
                onlineStatus: 'Forever in our hearts'
            },
            'red': {
                name: 'Red McArthur',
                avatar: 'RM',
                colorScheme: '#DC143C',
                speechPatterns: ['That\'s so cute!', 'OMG totally!', 'Me and Bebe...', 'That\'s absolutely perfect!'],
                personality: 'stylish',
                onlineStatus: 'Looking absolutely adorable'
            },
            'sharon': {
                name: 'Sharon Marsh',
                avatar: 'SM',
                colorScheme: '#9370DB',
                speechPatterns: ['*sigh*', 'Randy, what now?', 'I need wine', 'Why is everything so crazy?'],
                personality: 'exasperated',
                onlineStatus: 'Questioning life choices'
            },
            'liane': {
                name: 'Liane Cartman',
                avatar: 'LC',
                colorScheme: '#FF69B4',
                speechPatterns: ['Oh my!', 'Eric is such an angel!', 'How wonderful!', 'My precious baby!'],
                personality: 'enabling',
                onlineStatus: 'Doting on Eric'
            }
        };
    }

    initializeRelationships() {
        this.relationships = {
            'cartman': {
                enemies: ['kyle'],
                friends: ['stan', 'kenny'],
                family: [],
                frenemies: ['butters'],
                rivals: ['wendy']
            },
            'kyle': {
                enemies: ['cartman'],
                friends: ['stan', 'kenny'],
                family: ['gerald', 'sheila'],
                bestFriend: 'stan'
            },
            'stan': {
                friends: ['kyle', 'kenny', 'cartman'],
                family: ['randy', 'sharon'],
                girlfriend: 'wendy',
                bestFriend: 'kyle',
                embarrassingParent: 'randy'
            },
            'kenny': {
                friends: ['stan', 'kyle', 'cartman'],
                family: ['stuart', 'carol', 'karen'],
                protects: ['karen']
            },
            'randy': {
                family: ['stan', 'sharon'],
                embarrasses: ['stan'],
                obsessions: ['current_trend']
            },
            'butters': {
                parents: ['stephen', 'linda'],
                exploitedBy: ['cartman'],
                friends: ['everyone'],
                innocent: true
            },
            'jimmy': {
                bestFriend: 'timmy',
                rivals: ['nathan'],
                audience: ['classmates']
            },
            'wendy': {
                boyfriend: 'stan',
                friends: ['bebe', 'kyle'],
                rivals: ['cartman'],
                activistAllies: ['kyle'],
                politicalOpponents: ['cartman']
            },
            'timmy': {
                bestFriend: 'jimmy',
                friends: ['classmates'],
                supportive: true
            },
            'craig': {
                boyfriend: 'tweek',
                friends: ['clyde', 'token', 'jimmy'],
                enemies: [],
                apathetic: true,
                cares_about: ['stripe', 'tweek']
            },
            'tweek': {
                boyfriend: 'craig',
                friends: ['craig', 'jimmy'],
                anxious_about: ['everything'],
                calmed_by: ['craig'],
                parents: ['tweek_sr', 'mrs_tweak']
            },
            'clyde': {
                friends: ['craig', 'token', 'jimmy', 'butters'],
                crush: 'bebe',
                supportive: true,
                emotional: true,
                cries_about: ['everything']
            },
            'token': {
                friends: ['clyde', 'kyle', 'stan'],
                rivals: ['cartman'],
                voice_of_reason: true,
                practical: true,
                wealthy: true
            },
            'bebe': {
                friends: ['wendy', 'red'],
                crush_target: 'clyde',
                popular: true,
                trendsetter: true,
                social_leader: true
            },
            'gerald': {
                family: ['kyle', 'sheila'],
                son: 'kyle',
                wife: 'sheila',
                secret_identity: 'skankhunt42',
                professional: true,
                dual_life: true
            },
            'sheila': {
                family: ['kyle', 'gerald'],
                son: 'kyle',
                husband: 'gerald',
                activist: true,
                helicopter_parent: true,
                moral_crusader: true
            },
            'chef': {
                students: ['cartman', 'kyle', 'stan', 'kenny'],
                mentor: true,
                memorial: true,
                beloved_teacher: true
            },
            'red': {
                friends: ['bebe', 'wendy'],
                best_friend: 'bebe',
                popular: true,
                style_icon: true,
                supportive: true
            },
            'sharon': {
                family: ['stan', 'randy'],
                son: 'stan',
                husband: 'randy',
                exhausted_by: 'randy',
                professional: true,
                reality_checker: true,
                wine_dependent: true
            },
            'liane': {
                family: ['cartman'],
                son: 'cartman',
                enables: 'cartman',
                spoils: 'cartman',
                blind_to: 'cartman_flaws',
                sweet: true,
                naive: true
            }
        };
    }

    generateComment(commenterKey, postAuthorKey, postContent, postType = 'general') {
        const commenter = this.characters[commenterKey];
        const postAuthor = this.characters[postAuthorKey];
        const relationship = this.getRelationship(commenterKey, postAuthorKey);
        
        let comment = this.getContextualComment(commenterKey, postAuthorKey, postContent, postType, relationship);
        
        return {
            id: this.generateId(),
            commenter: commenter,
            comment: comment,
            timestamp: new Date(),
            likes: Math.floor(Math.random() * 20),
            relationship: relationship
        };
    }

    getContextualComment(commenterKey, postAuthorKey, postContent, postType, relationship) {
        // Cartman's comments
        if (commenterKey === 'cartman') {
            if (postAuthorKey === 'kyle') {
                return this.randomChoice([
                    "This is totally lame, Kyle! 🙄",
                    "Whatever Kyle, nobody cares about your stupid causes!",
                    "Why don't you go save some whales or something? 🐋",
                    "This is why nobody likes you, Kyle!"
                ]);
            } else if (postAuthorKey === 'stan') {
                return this.randomChoice([
                    "Stan, you should totally help me with my new business!",
                    "Dude, this reminds me of my latest scheme... 💡",
                    "Stan, you're being way too reasonable about this."
                ]);
            } else if (postAuthorKey === 'butters') {
                return this.randomChoice([
                    "Butters, I have the perfect job for you! 😈",
                    "This gives me an idea for how you can help me...",
                    "Butters, you're so innocent it's almost annoying."
                ]);
            }
        }

        // Kyle's comments
        if (commenterKey === 'kyle') {
            if (postAuthorKey === 'cartman') {
                return this.randomChoice([
                    "Cartman, this is exactly why you can't be trusted! 😤",
                    "Are you seriously trying to scam people again?",
                    "This is wrong on so many levels, fatass!",
                    "How do you even come up with this stuff??"
                ]);
            } else if (postAuthorKey === 'stan') {
                return this.randomChoice([
                    "Dude, I totally get what you mean!",
                    "We should do something about this, Stan!",
                    "This is exactly what I was talking about! ✊",
                    "Finally, someone who makes sense!"
                ]);
            } else if (postAuthorKey === 'butters') {
                return this.randomChoice([
                    "Butters, you don't have to put up with that!",
                    "Someone needs to protect you from Cartman's schemes.",
                    "Your optimism is actually really inspiring! 🌟"
                ]);
            }
        }

        // Stan's comments
        if (commenterKey === 'stan') {
            if (postAuthorKey === 'cartman') {
                return this.randomChoice([
                    "Dude, this is getting out of hand... 😐",
                    "Cartman, people are going to figure out your scheme.",
                    "Why can't you just do something normal for once?",
                    "This is so typical..."
                ]);
            } else if (postAuthorKey === 'kyle') {
                return this.randomChoice([
                    "Kyle, you're totally right about this!",
                    "I'm with you on this one, dude! 👍",
                    "This is exactly what we should be focusing on.",
                    "Let's figure out what to do about this."
                ]);
            } else if (postAuthorKey === 'randy') {
                return this.randomChoice([
                    "Dad, please don't embarrass me at school... 🤦‍♂️",
                    "Oh God, my dad is at it again...",
                    "Dad, you promised you'd try to be normal!",
                    "Why does my dad have to be so weird?"
                ]);
            }
        }

        // Kenny's comments (with translations)
        if (commenterKey === 'kenny') {
            const muffledComments = [
                { muffled: "Mmpfh mph mmpfh!", translation: "That's pretty cool!" },
                { muffled: "Mph mmpfh mmpfh mph!", translation: "I totally agree with you!" },
                { muffled: "Mmpfh mmpfh!", translation: "That's funny!" },
                { muffled: "Mph mmpfh mmpfh mmpfh!", translation: "You guys are crazy!" }
            ];
            const chosen = this.randomChoice(muffledComments);
            return `${chosen.muffled} <br><small>(Translation: ${chosen.translation})</small>`;
        }

        // Randy's comments (overly dramatic)
        if (commenterKey === 'randy') {
            if (postAuthorKey === 'stan') {
                return this.randomChoice([
                    "Stanley, this is EXACTLY what I've been trying to tell you! 🔥",
                    "Oh my God, Stan! This is like my current obsession!",
                    "Son, you're finally starting to understand life!",
                    "This reminds me of when I was your age... which was totally different but also similar!"
                ]);
            } else {
                return this.randomChoice([
                    "This is HUGE! Everyone needs to see this! 🚀",
                    "I'm literally shaking right now! This is so important!",
                    "This changes EVERYTHING! How did I not see this before?",
                    "I need to incorporate this into my latest project immediately!"
                ]);
            }
        }

        // Butters' comments (always positive)
        if (commenterKey === 'butters') {
            return this.randomChoice([
                "Oh hamburgers, that's really swell! 😊",
                "Aw jeez, you're so smart! I wish I could think of stuff like that!",
                "Gosh, that sounds really neat! Can I help somehow?",
                "Oh boy, oh boy! That's the most interesting thing I've heard all day!",
                "Golly, you're really good at this Facebook thing! ⭐"
            ]);
        }

        // Jimmy's comments (comedy focused)
        if (commenterKey === 'jimmy') {
            return this.randomChoice([
                "Wow, w-w-what a great story! That's c-comedy gold! 🎤",
                "That's p-p-pretty funny! Mind if I use that in my act?",
                "Thank you, thank you! That r-r-reminds me of a joke I'm working on!",
                "T-t-terrific! The audience would love this! 👏"
            ]);
        }

        // Mr. Garrison's comments (inappropriate oversharing)
        if (commenterKey === 'garrison') {
            return this.randomChoice([
                "This reminds me of my own personal journey... which I'll share with my class tomorrow! 📚",
                "Children, this is exactly what we should be discussing in school!",
                "This triggers some complex feelings about my identity... 🎭",
                "I'm going to use this as a teaching moment, mkay!"
            ]);
        }

        // Wendy's comments (activist perspective)
        if (commenterKey === 'wendy') {
            if (postAuthorKey === 'stan') {
                return this.randomChoice([
                    "Stan, this is exactly why we need to have deeper conversations about important issues! 💕",
                    "I love that you're starting to see the bigger picture, Stan!",
                    "This is why you're my boyfriend - you actually care! ❤️",
                    "Stan, we should talk about this more! Maybe over dinner?"
                ]);
            } else if (postAuthorKey === 'cartman') {
                return this.randomChoice([
                    "Cartman, this is exactly the kind of thinking that perpetuates systemic problems! 😤",
                    "Your business practices are exploitative and I won't stand for it!",
                    "As class president, I cannot allow this behavior to continue!",
                    "This is why we need better education about ethics and social responsibility!"
                ]);
            } else if (postAuthorKey === 'kyle') {
                return this.randomChoice([
                    "Kyle, you're absolutely right! We need to organize and take action! ✊",
                    "This is exactly the kind of leadership we need! Count me in!",
                    "Thank you for speaking up about this! Together we can make change!",
                    "Kyle, your moral compass is exactly what this school needs!"
                ]);
            } else {
                return this.randomChoice([
                    "This is a great opportunity for us to learn and grow as a community! 🌟",
                    "We should use this as a teachable moment for everyone!",
                    "As class president, I support any effort to make our school better!",
                    "This is exactly why student voices matter in important decisions!"
                ]);
            }
        }

        // Timmy's comments (enthusiastic and supportive)
        if (commenterKey === 'timmy') {
            if (postAuthorKey === 'jimmy') {
                const timmyToJimmy = [
                    { timmy: "TIMMY!", translation: "That's hilarious, Jimmy!" },
                    { timmy: "TIMMEH!", translation: "Your comedy keeps getting better!" },
                    { timmy: "Timmy Burch!", translation: "I'm so proud to be your comedy partner!" },
                    { timmy: "TIMMY! TIMMY!", translation: "The audience is going to love this!" }
                ];
                const chosen = this.randomChoice(timmyToJimmy);
                return `${chosen.timmy} <br><small>(Translation: ${chosen.translation})</small>`;
            } else {
                const generalTimmy = [
                    { timmy: "TIMMY!", translation: "This is awesome!" },
                    { timmy: "TIMMEH!", translation: "You're doing great!" },
                    { timmy: "Timmy!", translation: "I support this!" },
                    { timmy: "TIMMY! TIMMY!", translation: "Keep being amazing!" }
                ];
                const chosen = this.randomChoice(generalTimmy);
                return `${chosen.timmy} <br><small>(Translation: ${chosen.translation})</small>`;
            }
        }

        // Craig's comments (apathetic but caring about Tweek)
        if (commenterKey === 'craig') {
            if (postAuthorKey === 'tweek') {
                return this.randomChoice([
                    "Tweek, you're fine. I don't care what they say. 💙",
                    "Whatever. You worry too much, but... that's okay I guess.",
                    "*flips everyone off* Leave my boyfriend alone.",
                    "I don't care about any of this drama. Tweek, just ignore them."
                ]);
            } else if (postAuthorKey === 'cartman') {
                return this.randomChoice([
                    "I don't care about your stupid schemes, fatass.",
                    "*flips you off* Whatever, Cartman.",
                    "This is dumb. You're dumb. I don't care.",
                    "Yeah, no. I'm not helping with whatever this is."
                ]);
            } else {
                return this.randomChoice([
                    "I don't care.",
                    "Whatever. 🖕",
                    "This is stupid.",
                    "Cool story. I don't care though.",
                    "*flips you off and walks away*"
                ]);
            }
        }

        // Tweek's comments (anxious and paranoid)
        if (commenterKey === 'tweek') {
            if (postAuthorKey === 'craig') {
                return this.randomChoice([
                    "Craig always knows what to say to make me feel better! 💙 But what if he's just being nice?!",
                    "My boyfriend is so cool and calm... GAH! What if that's suspicious?!",
                    "Craig, this is why I love you! But also, what if love is a government conspiracy?! 😰☕",
                    "You're so rational, Craig! *twitches nervously* But what if being rational is irrational?!"
                ]);
            } else if (postAuthorKey === 'cartman') {
                return this.randomChoice([
                    "GAH! Cartman, this sounds like a trap! What if it's connected to the gnomes?! 😱",
                    "This gives me a really bad feeling! *pulls hair* What if this makes everything worse?!",
                    "OH GOD! What if this is how they get us?! *nervous twitching* ☕⚡",
                    "I don't like this! What if... what if... GAH! Too many variables!"
                ]);
            } else {
                return this.randomChoice([
                    "This is making me nervous! What if something goes wrong?! 😰",
                    "GAH! *pulls hair* What if this is a sign of something terrible?!",
                    "This could be dangerous! What if... what if... *twitches* ☕",
                    "I have a bad feeling about this! What if it's connected to a larger conspiracy?!"
                ]);
            }
        }

        // Clyde's comments (overly emotional about everything)
        if (commenterKey === 'clyde') {
            if (postAuthorKey === 'bebe') {
                return this.randomChoice([
                    "Bebe, you're so amazing! *sobbing* This post made me cry happy tears! 😭💕",
                    "*sniffling* You always know exactly what to say! This is beautiful! 💖",
                    "I'm literally crying right now because you're so perfect! *tears of joy* 😭✨",
                    "Bebe, this is why I have such intense feelings! You get it! *emotional sobbing*"
                ]);
            } else if (postAuthorKey === 'craig') {
                return this.randomChoice([
                    "Craig, how do you stay so calm?! *sobbing* I wish I could be like that! 😭",
                    "I'm crying because this is so deep and you don't even realize it! *sniffling*",
                    "Your apathy makes me emotional! *tears* Why can't I not care about things?!",
                    "Craig, this is actually really sad when you think about it! *ugly crying*"
                ]);
            } else if (postAuthorKey === 'tweek') {
                return this.randomChoice([
                    "Tweek, I totally get the anxiety! *crying* Everything IS scary! 😭☕",
                    "*sobbing* Your worries are so valid! I'm crying for both of us now!",
                    "This made me cry because I feel your pain! *emotional support tears* 💧",
                    "Tweek, we should start a support group for feelings! *sniffling*"
                ]);
            } else {
                return this.randomChoice([
                    "*sobbing* This is so beautiful/sad/meaningful! I can't stop crying! 😭",
                    "I'm having so many feelings about this! *sniffling* 💧",
                    "This post made me emotional! *tears streaming* Why does everything make me cry?!",
                    "*ugly crying* I don't know why I'm crying but I can't stop! 😢",
                    "This is either the saddest or happiest thing ever! *confused sobbing*"
                ]);
            }
        }

        // Token's comments (practical voice of reason)
        if (commenterKey === 'token') {
            if (postAuthorKey === 'cartman') {
                return this.randomChoice([
                    "Called it. This is obviously a terrible idea and here's why... *sigh*",
                    "Cartman, I predicted this exact outcome three posts ago. Nobody listened then either.",
                    "Let me guess - you didn't think this through? Shocking. 🙄",
                    "This is why we need to think before we act. But do people listen? No."
                ]);
            } else if (postAuthorKey === 'kyle') {
                return this.randomChoice([
                    "Kyle, finally someone who thinks things through! This makes actual sense. 👍",
                    "Thank you for being the voice of reason. It's exhausting being the only one sometimes.",
                    "This is exactly the kind of practical thinking we need more of.",
                    "Kyle gets it. Maybe there's hope for this town after all."
                ]);
            } else if (postAuthorKey === 'clyde') {
                return this.randomChoice([
                    "Clyde, maybe try thinking about this rationally instead of emotionally? *supportive sigh*",
                    "I understand you're upset, but let's look at this practically...",
                    "Your feelings are valid, but here's a more logical approach to consider.",
                    "Clyde, deep breaths. Let's solve this step by step."
                ]);
            } else {
                return this.randomChoice([
                    "This is obviously going to end badly, but nobody asks my opinion until it's too late.",
                    "Has anyone actually thought this through? *exasperated sigh*",
                    "I can see the problems with this plan from here...",
                    "Let me know when you want some practical advice. I'll be waiting. 📊"
                ]);
            }
        }

        // Bebe's comments (popular girl social dynamics)
        if (commenterKey === 'bebe') {
            if (postAuthorKey === 'clyde') {
                return this.randomChoice([
                    "Clyde, you're so sweet! *hair flip* This is actually really thoughtful! 💕",
                    "Aww, this is why you're different from the other guys! So emotional and caring! 💖",
                    "This is so cute! You always know how to make me smile! ✨",
                    "Clyde, your sensitivity is honestly refreshing. Don't change! 💙"
                ]);
            } else if (postAuthorKey === 'wendy') {
                return this.randomChoice([
                    "Wendy, you're such a natural leader! This is exactly what we need! 👑",
                    "Girl, you always know how to get things done! So inspiring! ✨",
                    "This is why you're class president - you actually care about everyone! 💪",
                    "Wendy, your passion for justice is honestly amazing! Keep fighting the good fight! 🌟"
                ]);
            } else if (postAuthorKey === 'red') {
                return this.randomChoice([
                    "Red, you're absolutely right! *hair flip* We make such a perfect team! 💕",
                    "OMG yes! This is exactly what I was thinking! Great minds think alike! ✨",
                    "Red, you always know exactly what to say! BFF goals! 👭",
                    "This is why we're the ultimate squad! Love you, girl! 💖"
                ]);
            } else if (postAuthorKey === 'cartman') {
                return this.randomChoice([
                    "Cartman, this is SO not cute. Maybe try being nice for once? 💅",
                    "Ugh, obviously this is a bad idea. Even I can see that! 🙄",
                    "Eric, you need to think about how this affects other people! *eye roll*",
                    "This is exactly why you're not popular. Just saying. 💋"
                ]);
            } else {
                return this.randomChoice([
                    "This is actually pretty cute! I love it! ✨💕",
                    "Obviously this is amazing! *hair flip* Great job! 👑",
                    "This made my day! You look so good! 💄",
                    "Love this energy! Keep being awesome! 🌟",
                    "This is giving me all the right vibes! So stylish! 💅"
                ]);
            }
        }

        // Gerald's comments (professional with subtle troll hints)
        if (commenterKey === 'gerald') {
            if (postAuthorKey === 'kyle') {
                return this.randomChoice([
                    "So proud of my brilliant son! You're going to change the world, Kyle! 👨‍👦⚖️",
                    "Kyle, your moral compass never ceases to amaze me. Keep standing up for what's right!",
                    "This is exactly the kind of leadership we need. Well said, son! 💙",
                    "Your mother and I are so proud of the young man you're becoming! 🌟"
                ]);
            } else if (postAuthorKey === 'sheila') {
                return this.randomChoice([
                    "Sheila, your passion for protecting our community is inspiring! ⚖️💕",
                    "As always, my wife is fighting the good fight for all our families! 👩‍⚖️",
                    "This is why I married the most dedicated woman in South Park! 💙",
                    "Sheila's right - we need to take action to protect what matters most! 🛡️"
                ]);
            } else if (postAuthorKey === 'cartman') {
                return this.randomChoice([
                    "Eric, perhaps you should consider the... broader implications... of your actions. 😏",
                    "As a lawyer, I'd advise thinking this through more carefully... 🤔",
                    "Interesting approach, Eric. Sometimes people reveal more than they intend online... 😈",
                    "Be careful what you post, son. The internet never forgets... *knowing smile*"
                ]);
            } else {
                return this.randomChoice([
                    "Great post! It's important to maintain positive community engagement! ⚖️",
                    "Well said! Professional communication builds stronger relationships! 💼",
                    "This is the kind of thoughtful content our community needs more of! 🌟",
                    "As someone who values integrity, I appreciate this perspective! 👔"
                ]);
            }
        }

        // Sheila's comments (moral outrage and activism)
        if (commenterKey === 'sheila') {
            if (postAuthorKey === 'kyle') {
                return this.randomChoice([
                    "Kyle, I'm so proud of your moral conviction! This is exactly right! 👩‍👦⚡",
                    "My brilliant son! You understand what's important in life! 💙",
                    "WHAT WHAT WHAT?! Kyle is absolutely correct about this! Everyone should listen! 📢",
                    "This is why you're going to be a leader, sweetheart! Keep fighting the good fight! ✊"
                ]);
            } else if (postAuthorKey === 'gerald') {
                return this.randomChoice([
                    "Gerald always knows exactly what to say! This is why I married him! 💕",
                    "My husband understands the importance of community responsibility! ⚖️💙",
                    "Gerald's professional wisdom is exactly what our family needs! 👨‍💼",
                    "This is the kind of moral leadership our community deserves! 🌟"
                ]);
            } else if (postAuthorKey === 'cartman') {
                return this.randomChoice([
                    "WHAT WHAT WHAT?! Eric, this is completely unacceptable! 😤⚡",
                    "This is exactly the kind of behavior we need to address! Unacceptable! 📢",
                    "Eric Cartman! This affects ALL our children! Think about the consequences! ⚠️",
                    "As a concerned parent, I DEMAND better behavior from our young people! 👩‍⚖️"
                ]);
            } else {
                return this.randomChoice([
                    "This is exactly what our community needs to hear! Thank you! 🙌",
                    "FINALLY! Someone who understands what's important! 💪",
                    "We need more people like you speaking up for what's right! ✊",
                    "This is the kind of moral leadership our children need to see! 🌟"
                ]);
            }
        }

        // Chef's memorial comments (wisdom from beyond)
        if (commenterKey === 'chef') {
            return this.randomChoice([
                "🎵 Hello there, children! Chef's wisdom lives on in all your hearts! 🎵",
                "From beyond, Chef sees you growing into wonderful people! Keep asking the hard questions! 💙",
                "🎤 *soulful melody* Life's lessons are best learned through love and understanding! 🎵",
                "Chef's spirit is proud of how you're all growing up! Stay true to yourselves! ✨",
                "🎵 Remember children, the most important ingredient in life is caring for each other! 🎵"
            ]);
        }

        // Red's comments (stylish and supportive)
        if (commenterKey === 'red') {
            if (postAuthorKey === 'bebe') {
                return this.randomChoice([
                    "Bebe, you're absolutely perfect! *adores* We're such an amazing team! 💕👭",
                    "OMG yes! This is exactly what I was thinking too! BFF telepathy! ✨",
                    "Bebe, you always look so cute! Love coordinating with you! 💖",
                    "That's so totally adorable! You're the best bestie ever! 👑"
                ]);
            } else if (postAuthorKey === 'wendy') {
                return this.randomChoice([
                    "Wendy, you're such an inspiration! Leadership looks so good on you! 👑",
                    "This is amazing! You always know how to make things better! ✨",
                    "Girl, you're absolutely right! We should totally support this! 💪",
                    "Wendy, you're like the perfect role model! So smart and stylish! 🌟"
                ]);
            } else if (postAuthorKey === 'clyde') {
                return this.randomChoice([
                    "Clyde, that's actually really sweet! You have such a good heart! 💙",
                    "Aww, you're so thoughtful! That's totally adorable! ✨",
                    "Clyde, you always surprise me with how caring you are! 😊",
                    "That's so cute! I love how much you care about everything! 💕"
                ]);
            } else {
                return this.randomChoice([
                    "That's absolutely adorable! Love this so much! ✨💕",
                    "OMG this is so cute! You look amazing! 👑",
                    "This is giving me all the right vibes! Totally perfect! 💄",
                    "Love this energy! You're absolutely glowing! 🌟"
                ]);
            }
        }

        // Sharon's comments (reality checks and exasperation)
        if (commenterKey === 'sharon') {
            if (postAuthorKey === 'randy') {
                return this.randomChoice([
                    "Randy... *deep sigh* ... what are you doing now? 🍷🤦‍♀️",
                    "Honey, I love you, but this is exactly why I keep a wine cellar. 🍷",
                    "Randy, please tell me this isn't another one of your 'projects.' 😐",
                    "I'm a geologist. I study rocks. Rocks make more sense than this. 🧪"
                ]);
            } else if (postAuthorKey === 'stan') {
                return this.randomChoice([
                    "Stan, you're the only sane one in this family. Thank you for that! 💙",
                    "My wonderful, reasonable son! This is why I'm proud of you! 😊",
                    "Stan, you get your common sense from me. Definitely not from your dad... 😐",
                    "Finally, someone in this house who thinks before acting! 💙"
                ]);
            } else if (postAuthorKey === 'liane') {
                return this.randomChoice([
                    "Liane, sweetie... maybe Eric could use some... boundaries? 😅",
                    "Oh Liane... that's... very supportive of you... 😬",
                    "I admire your dedication, but maybe consider saying 'no' sometimes? 😐",
                    "Liane, you're so sweet. Maybe too sweet? Just a thought... 🍷"
                ]);
            } else {
                return this.randomChoice([
                    "Finally, some sanity in my feed! Thank you! 😌",
                    "This is refreshingly normal. I needed this today. 🍷",
                    "As someone who deals with Randy daily, I appreciate rational thinking. 🧪",
                    "*saves post* I'm showing this to Randy as an example of logic. 💾"
                ]);
            }
        }

        // Liane's comments (enabling and sweet obliviousness)
        if (commenterKey === 'liane') {
            if (postAuthorKey === 'cartman') {
                return this.randomChoice([
                    "Oh Eric! You're such a brilliant little entrepreneur! So proud! 💕👑",
                    "My precious angel always has the most wonderful ideas! 😍",
                    "Eric is so creative and smart! Other parents must be so jealous! ✨",
                    "That's my little CEO! I knew you were destined for greatness! 👑💼"
                ]);
            } else if (postAuthorKey === 'kyle') {
                return this.randomChoice([
                    "Kyle, you're such a sweet boy! Eric always speaks so highly of you! 😊",
                    "Oh my! You're so smart! Eric could learn a lot from you! 💙",
                    "Kyle, you and Eric are such good friends! It warms my heart! 💕",
                    "What a thoughtful young man! Eric is lucky to have a friend like you! ✨"
                ]);
            } else if (postAuthorKey === 'stan') {
                return this.randomChoice([
                    "Stan, you're always so level-headed! Eric admires that about you! 😊",
                    "Such a nice boy! Your parents raised you so well! 💙",
                    "Stan, you and Eric make such a good team! 👫",
                    "Oh my, you're so mature! Eric looks up to you! ✨"
                ]);
            } else if (postAuthorKey === 'sharon') {
                return this.randomChoice([
                    "Sharon, you're such a wonderful mother! We should have coffee! ☕💕",
                    "Oh my! You balance work and family so well! I admire that! 😍",
                    "Sharon, you're so accomplished! Eric could learn from Stan! 🌟",
                    "What a strong woman! Randy is so lucky! 💙"
                ]);
            } else {
                return this.randomChoice([
                    "Oh my! This is so wonderful! You're all such good influences! 😊💕",
                    "How sweet! I love seeing positive posts like this! ✨",
                    "Oh, this just warms my heart! Thank you for sharing! 💙",
                    "Such lovely content! Eric would enjoy seeing this! 😍"
                ]);
            }
        }

        // Default generic comment
        return this.randomChoice([
            "Interesting post! 👍",
            "Thanks for sharing!",
            "This is really cool!",
            "Great content! 🌟"
        ]);
    }

    getRelationship(character1, character2) {
        const rel = this.relationships[character1];
        if (!rel) return 'neutral';
        
        if (rel.enemies && rel.enemies.includes(character2)) return 'enemy';
        if (rel.bestFriend === character2) return 'bestFriend';
        if (rel.friends && rel.friends.includes(character2)) return 'friend';
        if (rel.family && rel.family.includes(character2)) return 'family';
        if (rel.frenemies && rel.frenemies.includes(character2)) return 'frenemy';
        if (rel.rivals && rel.rivals.includes(character2)) return 'rival';
        if (rel.embarrasses && rel.embarrasses.includes(character2)) return 'embarrassingParent';
        if (rel.exploitedBy && rel.exploitedBy.includes(character2)) return 'exploited';
        if (rel.boyfriend === character2 || rel.girlfriend === character2) return 'romantic';
        if (rel.crush === character2) return 'crush';
        if (rel.crush_target === character2) return 'crush_target';
        if (rel.son === character2 || rel.daughter === character2) return 'child';
        if (rel.husband === character2 || rel.wife === character2) return 'spouse';
        if (rel.students && rel.students.includes(character2)) return 'student';
        if (rel.best_friend === character2) return 'best_friend';
        
        return 'neutral';
    }

    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    generateId() {
        return 'comment_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    }

    addInteractiveComments(postElement, postAuthorKey, postContent, postType = 'general') {
        const commentsContainer = postElement.querySelector('.post-comments') || this.createCommentsContainer(postElement);
        
        // Generate 2-4 comments from different characters
        const numComments = 2 + Math.floor(Math.random() * 3);
        const availableCommenters = Object.keys(this.characters).filter(key => key !== postAuthorKey);
        
        // Prioritize certain relationships
        const priorityCommenters = this.getPriorityCommenters(postAuthorKey);
        const selectedCommenters = [...priorityCommenters];
        
        // Fill remaining slots with random characters
        while (selectedCommenters.length < numComments) {
            const randomCommenter = this.randomChoice(availableCommenters);
            if (!selectedCommenters.includes(randomCommenter)) {
                selectedCommenters.push(randomCommenter);
            }
        }

        selectedCommenters.forEach((commenterKey, index) => {
            setTimeout(() => {
                const comment = this.generateComment(commenterKey, postAuthorKey, postContent, postType);
                this.renderComment(commentsContainer, comment);
            }, index * 500); // Stagger comment appearances
        });
    }

    getPriorityCommenters(postAuthorKey) {
        const priorities = [];
        const relationships = this.relationships[postAuthorKey];
        
        if (!relationships) return priorities;
        
        // Always include enemies for drama
        if (relationships.enemies) priorities.push(...relationships.enemies);
        
        // Include best friend
        if (relationships.bestFriend) priorities.push(relationships.bestFriend);
        
        // Include embarrassing family members
        if (relationships.embarrassingParent) priorities.push(relationships.embarrassingParent);
        
        // Include romantic partners
        if (relationships.boyfriend) priorities.push(relationships.boyfriend);
        if (relationships.girlfriend) priorities.push(relationships.girlfriend);
        
        // Include crushes
        if (relationships.crush) priorities.push(relationships.crush);
        if (relationships.crush_target) priorities.push(relationships.crush_target);
        
        return priorities.slice(0, 2); // Max 2 priority commenters
    }

    createCommentsContainer(postElement) {
        const container = document.createElement('div');
        container.className = 'post-comments';
        container.innerHTML = `
            <div class="comments-header">
                <span class="comments-count">Comments</span>
                <button class="comments-toggle">Show Comments</button>
            </div>
            <div class="comments-list" style="display: none;"></div>
        `;
        
        postElement.appendChild(container);
        
        // Add toggle functionality
        const toggle = container.querySelector('.comments-toggle');
        const list = container.querySelector('.comments-list');
        
        toggle.addEventListener('click', () => {
            const isVisible = list.style.display !== 'none';
            list.style.display = isVisible ? 'none' : 'block';
            toggle.textContent = isVisible ? 'Show Comments' : 'Hide Comments';
        });
        
        return container;
    }

    renderComment(container, comment) {
        const commentsList = container.querySelector('.comments-list');
        const commentElement = document.createElement('div');
        commentElement.className = 'character-comment';
        commentElement.innerHTML = `
            <div class="comment-header">
                <div class="comment-avatar" style="background: linear-gradient(45deg, ${comment.commenter.colorScheme}, ${this.lightenColor(comment.commenter.colorScheme)});">
                    ${comment.commenter.avatar}
                </div>
                <div class="comment-info">
                    <strong class="commenter-name">${comment.commenter.name}</strong>
                    <div class="comment-content">${comment.comment}</div>
                    <div class="comment-actions">
                        <span class="comment-time">${this.formatTimeAgo(comment.timestamp)}</span>
                        <button class="comment-like" data-likes="${comment.likes}">👍 ${comment.likes}</button>
                        <button class="comment-reply">Reply</button>
                    </div>
                </div>
            </div>
        `;
        
        commentsList.appendChild(commentElement);
        
        // Update comments count
        const countElement = container.querySelector('.comments-count');
        const currentCount = commentsList.children.length;
        countElement.textContent = `${currentCount} Comment${currentCount !== 1 ? 's' : ''}`;
        
        // Add like functionality
        const likeButton = commentElement.querySelector('.comment-like');
        likeButton.addEventListener('click', () => {
            const currentLikes = parseInt(likeButton.dataset.likes);
            const newLikes = currentLikes + 1;
            likeButton.dataset.likes = newLikes;
            likeButton.innerHTML = `👍 ${newLikes}`;
            likeButton.style.color = '#1877f2';
        });
    }

    lightenColor(color, percent = 20) {
        // Simple color lightening function
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

    loadInteractions() {
        // Initialize interactions when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeProfileInteractions();
        });
    }

    initializeProfileInteractions() {
        // Find all posts and add interactive comments
        const posts = document.querySelectorAll('.post');
        posts.forEach((post, index) => {
            // Determine post author from the URL or page context
            const postAuthor = this.detectPostAuthor();
            const postContent = post.querySelector('.post-content')?.textContent || '';
            
            // Add comments after a brief delay
            setTimeout(() => {
                this.addInteractiveComments(post, postAuthor, postContent);
            }, (index + 1) * 1000);
        });
    }

    detectPostAuthor() {
        // Detect character from URL or page title
        const url = window.location.pathname;
        const title = document.title;
        
        if (url.includes('Eric Cartman') || title.includes('Eric Cartman')) return 'cartman';
        if (url.includes('Kyle Broflovski') || title.includes('Kyle Broflovski')) return 'kyle';
        if (url.includes('Stan Marsh') || title.includes('Stan Marsh')) return 'stan';
        if (url.includes('Kenny McCormick') || title.includes('Kenny McCormick')) return 'kenny';
        if (url.includes('Randy Marsh') || title.includes('Randy Marsh')) return 'randy';
        if (url.includes('butters') || title.includes('Butters')) return 'butters';
        if (url.includes('garrison') || title.includes('Garrison')) return 'garrison';
        if (url.includes('Jimmy Valmer') || title.includes('Jimmy Valmer')) return 'jimmy';
        if (url.includes('Wendy Testaburger') || title.includes('Wendy Testaburger')) return 'wendy';
        if (url.includes('Timmy Burch') || title.includes('Timmy Burch')) return 'timmy';
        if (url.includes('Gerald Broflovski') || title.includes('Gerald Broflovski')) return 'gerald';
        if (url.includes('Sheila Broflovski') || title.includes('Sheila Broflovski')) return 'sheila';
        if (url.includes('Chef') || title.includes('Chef')) return 'chef';
        if (url.includes('Red McArthur') || title.includes('Red McArthur')) return 'red';
        if (url.includes('Sharon Marsh') || title.includes('Sharon Marsh')) return 'sharon';
        if (url.includes('Liane Cartman') || title.includes('Liane Cartman')) return 'liane';
        if (url.includes('Craig Tucker') || title.includes('Craig Tucker')) return 'craig';
        if (url.includes('Tweek Tweak') || title.includes('Tweek Tweak')) return 'tweek';
        if (url.includes('Clyde Donovan') || title.includes('Clyde Donovan')) return 'clyde';
        if (url.includes('Token Black') || title.includes('Token Black')) return 'token';
        if (url.includes('Bebe Stevens') || title.includes('Bebe Stevens')) return 'bebe';
        
        return 'unknown';
    }

    // New method: Generate multi-character group conversations
    generateGroupConversation(participants, topic, context = 'general') {
        const conversation = [];
        const shuffledParticipants = [...participants].sort(() => Math.random() - 0.5);
        
        // Generate 4-8 messages in the group conversation
        const messageCount = 4 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < messageCount; i++) {
            const speaker = shuffledParticipants[i % shuffledParticipants.length];
            const message = this.generateGroupMessage(speaker, topic, context, conversation);
            
            conversation.push({
                id: this.generateId(),
                speaker: this.characters[speaker],
                message: message,
                timestamp: new Date(Date.now() + (i * 30000)), // 30 seconds apart
                reactions: this.generateReactions(participants.filter(p => p !== speaker))
            });
        }
        
        return conversation;
    }

    generateGroupMessage(speakerKey, topic, context, previousMessages) {
        const speaker = this.characters[speakerKey];
        const recentSpeakers = previousMessages.slice(-2).map(m => this.getCharacterKey(m.speaker.name));
        
        // React to recent messages or start new thread
        if (previousMessages.length > 0 && Math.random() < 0.7) {
            return this.generateReactiveMessage(speakerKey, topic, recentSpeakers, context);
        } else {
            return this.generateInitiativeMessage(speakerKey, topic, context);
        }
    }

    generateReactiveMessage(speakerKey, topic, recentSpeakers, context) {
        const lastSpeaker = recentSpeakers[recentSpeakers.length - 1];
        
        // Family dynamics
        if (speakerKey === 'sheila' && recentSpeakers.includes('kyle')) {
            return this.randomChoice([
                "Kyle, sweetheart, that's exactly right! I'm so proud of my brilliant son! 💙",
                "WHAT WHAT WHAT?! Kyle understands what's important! Everyone should listen to him!",
                "My son has such good judgment! This is why I'm always so protective!",
                "Kyle, you're showing such mature thinking! This is what good parenting produces!"
            ]);
        }
        
        if (speakerKey === 'gerald' && recentSpeakers.includes('kyle')) {
            return this.randomChoice([
                "Kyle's analysis is legally sound. I'm impressed by his reasoning skills! ⚖️",
                "My son would make an excellent lawyer someday. Great critical thinking!",
                "Kyle, that's the kind of logic that wins cases! Well done, son!",
                "Professionally speaking, Kyle's approach is very methodical. Proud dad moment! 👔"
            ]);
        }
        
        if (speakerKey === 'kyle' && (recentSpeakers.includes('sheila') || recentSpeakers.includes('gerald'))) {
            return this.randomChoice([
                "Thanks Mom/Dad! I learned from watching how you both stand up for what's right!",
                "Our family talks about this stuff at dinner all the time. It's important!",
                "Mom's activism and Dad's legal knowledge really shaped how I think about these issues.",
                "I'm lucky to have parents who care about making the world better! 👨‍👩‍👦"
            ]);
        }
        
        // Group dynamics
        if (speakerKey === 'cartman' && recentSpeakers.includes('kyle')) {
            return this.randomChoice([
                "Kyle, that is so lame! Nobody asked for your stupid opinion! 🙄",
                "Here comes Kyle with another one of his speeches! Boooring!",
                "Why does Kyle always have to make everything so serious??",
                "Kyle, you're such a buzzkill! Can't you just let people have fun?"
            ]);
        }
        
        if (speakerKey === 'stan' && recentSpeakers.includes('cartman')) {
            return this.randomChoice([
                "Cartman, dude, can you just be normal for like five minutes? 😐",
                "Here we go again... Cartman's got another scheme.",
                "Cartman, this is exactly why people don't trust you.",
                "Oh God, what's Cartman planning now?"
            ]);
        }
        
        return this.getContextualComment(speakerKey, lastSpeaker, topic, context, this.getRelationship(speakerKey, lastSpeaker));
    }

    generateInitiativeMessage(speakerKey, topic, context) {
        const initiatives = {
            'cartman': [
                "Seriously you guys, I have the BEST idea for how to handle this situation! 💡",
                "This gives me an idea for my latest business venture! Who wants to invest?",
                "I'm about to revolutionize how we think about this whole thing!",
                "Sweet! This is exactly what I needed for my new scheme!"
            ],
            'kyle': [
                "We need to think about the ethical implications of this situation! ✊",
                "This is exactly the kind of issue we should be addressing as a community!",
                "I've been researching this topic and here's what I found...",
                "We can't just ignore this problem - we need to take action!"
            ],
            'stan': [
                "This whole situation is getting pretty crazy... 😐",
                "Can we just try to handle this like normal people?",
                "I don't know, guys. This seems like it could get out of hand.",
                "Why does everything in this town have to be so weird?"
            ],
            'sheila': [
                "WHAT WHAT WHAT?! This affects ALL our children! We must take immediate action! 📢",
                "As a concerned parent, I demand better from our community leaders!",
                "This is unacceptable! I'm organizing a committee to address this issue!",
                "We need to protect our children from these harmful influences!"
            ],
            'gerald': [
                "From a legal perspective, this raises some interesting questions... ⚖️",
                "I've been doing some research online about this topic... 😏",
                "As someone who works in the justice system, I find this fascinating...",
                "This could have significant legal ramifications if not handled properly."
            ]
        };
        
        return initiatives[speakerKey] ? this.randomChoice(initiatives[speakerKey]) : 
               this.randomChoice(this.characters[speakerKey].speechPatterns);
    }

    generateReactions(participantKeys) {
        const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];
        const reactionCount = Math.floor(Math.random() * 3) + 1;
        const selectedReactions = {};
        
        for (let i = 0; i < reactionCount && i < participantKeys.length; i++) {
            const participant = participantKeys[i];
            const reaction = this.randomChoice(reactions);
            selectedReactions[participant] = reaction;
        }
        
        return selectedReactions;
    }

    getCharacterKey(characterName) {
        return Object.keys(this.characters).find(key => 
            this.characters[key].name === characterName
        ) || 'unknown';
    }

    // Enhanced method: Create family-specific conversations
    generateFamilyConversation(familyMembers, scenario = 'general') {
        const familyScenarios = {
            'broflovski': {
                'homework': {
                    topic: "Kyle's homework and academic performance",
                    context: 'family_academic'
                },
                'internet_safety': {
                    topic: "Internet safety and appropriate online behavior",
                    context: 'family_safety'
                },
                'dinner_plans': {
                    topic: "Family dinner and household responsibilities",
                    context: 'family_domestic'
                }
            },
            'marsh': {
                'dad_embarrassment': {
                    topic: "Randy's latest obsession embarrassing Stan",
                    context: 'family_embarrassment'
                },
                'farm_business': {
                    topic: "Tegridy Farms business updates",
                    context: 'family_business'
                }
            }
        };
        
        return this.generateGroupConversation(familyMembers, scenario, 'family');
    }

    // Method to initialize group chat scenarios
    initializeGroupChat(chatType, participants) {
        const chatContainer = document.querySelector('#familyChat, #parentsChat');
        if (!chatContainer) return;
        
        const conversation = this.generateGroupConversation(participants, chatType, 'group_chat');
        
        conversation.forEach((message, index) => {
            setTimeout(() => {
                this.renderGroupMessage(chatContainer, message);
            }, index * 2000);
        });
    }

    renderGroupMessage(container, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.speaker.name.toLowerCase().replace(' ', '-')}-message`;
        
        messageDiv.innerHTML = `
            <div class="message-header">
                <strong>${message.speaker.name}</strong>
                <span class="message-time">${this.formatTimeAgo(message.timestamp)}</span>
            </div>
            <div class="message-content">${message.message}</div>
            <div class="message-reactions">
                ${Object.entries(message.reactions).map(([reactor, emoji]) => 
                    `<span class="reaction" title="${this.characters[reactor]?.name || reactor}">${emoji}</span>`
                ).join('')}
            </div>
        `;
        
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }
}

// CSS for comment styling
const commentStyles = `
    .post-comments {
        margin-top: 15px;
        border-top: 1px solid #e4e6ea;
        padding-top: 15px;
    }
    
    .comments-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .comments-toggle {
        background: #f0f2f5;
        border: none;
        padding: 6px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        color: #65676b;
    }
    
    .comments-toggle:hover {
        background: #e4e6ea;
    }
    
    .character-comment {
        margin-bottom: 12px;
        padding: 8px 0;
    }
    
    .comment-header {
        display: flex;
        gap: 10px;
    }
    
    .comment-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        flex-shrink: 0;
    }
    
    .comment-info {
        flex: 1;
    }
    
    .commenter-name {
        font-size: 13px;
        color: #1c1e21;
    }
    
    .comment-content {
        margin: 4px 0;
        font-size: 14px;
        line-height: 1.4;
        color: #1c1e21;
    }
    
    .comment-actions {
        display: flex;
        gap: 15px;
        align-items: center;
        margin-top: 4px;
    }
    
    .comment-time {
        font-size: 12px;
        color: #65676b;
    }
    
    .comment-like, .comment-reply {
        background: none;
        border: none;
        font-size: 12px;
        color: #65676b;
        cursor: pointer;
        padding: 2px 4px;
        border-radius: 4px;
    }
    
    .comment-like:hover, .comment-reply:hover {
        background: #f0f2f5;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = commentStyles;
document.head.appendChild(styleSheet);

// Initialize the system
window.characterInteractions = new CharacterInteractionSystem();

// Group chat initialization for family and parent chats
if (window.location.pathname.includes('broflovski-family')) {
    document.addEventListener('DOMContentLoaded', () => {
        window.characterInteractions.initializeGroupChat('family', ['gerald', 'sheila', 'kyle']);
    });
}

if (window.location.pathname.includes('south-park-parents')) {
    document.addEventListener('DOMContentLoaded', () => {
        window.characterInteractions.initializeGroupChat('parents', ['sheila', 'gerald', 'randy', 'sharon', 'liane', 'stuart']);
    });
}

// Initialize enhanced family dynamics for new characters
if (window.location.pathname.includes('Sharon Marsh') || window.location.pathname.includes('Liane Cartman')) {
    document.addEventListener('DOMContentLoaded', () => {
        // Add special family interaction patterns
        setTimeout(() => {
            const posts = document.querySelectorAll('.post');
            posts.forEach(post => {
                if (Math.random() < 0.8) { // High chance of family interactions
                    const postAuthor = window.characterInteractions.detectPostAuthor();
                    window.characterInteractions.addInteractiveComments(post, postAuthor, '', 'family');
                }
            });
        }, 1000);
    });
}
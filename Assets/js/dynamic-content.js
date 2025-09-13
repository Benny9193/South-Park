/**
 * South Park Facebook Profiles - Dynamic Content System
 * Generates episode-synced and seasonal content for character profiles
 */

class DynamicContentSystem {
    constructor() {
        this.episodes = {};
        this.seasonalContent = {};
        this.characterPersonalities = {};
        this.currentSeason = new Date().getMonth(); // 0-11
        this.currentDate = new Date();
        
        this.initializeEpisodeDatabase();
        this.initializeSeasonalContent();
        this.initializeCharacterPersonalities();
    }

    initializeEpisodeDatabase() {
        // Recent and classic episode references for dynamic content
        this.episodes = {
            recent: [
                {
                    title: "The Pandemic Special",
                    season: 24,
                    themes: ["pandemic", "covid", "isolation", "masks"],
                    characters: ["randy", "stan", "kyle", "cartman"],
                    contentHooks: {
                        randy: "This pandemic is giving me so many ideas for new ventures!",
                        stan: "Everything's weird now but at least it's not just South Park being weird anymore",
                        cartman: "I've been preparing for social distancing my whole life!",
                        kyle: "We need to follow the science and protect our community!"
                    }
                },
                {
                    title: "South ParQ Vaccination Special", 
                    season: 24,
                    themes: ["vaccination", "conspiracy", "qanon"],
                    characters: ["randy", "stan", "cartman", "kyle"],
                    contentHooks: {
                        cartman: "I'm starting a business selling 'vaccination exemption certificates'",
                        kyle: "The misinformation spread is really concerning guys",
                        stan: "Can we just get back to normal weird instead of this weird?"
                    }
                },
                {
                    title: "Back to the Cold War",
                    season: 25,
                    themes: ["russia", "ukraine", "politics"],
                    characters: ["randy", "cartman", "garrison"],
                    contentHooks: {
                        randy: "I knew I should have invested in bunker supplies!",
                        cartman: "This gives me an idea for a new world order business model",
                        garrison: "Children, today we're learning about international relations!"
                    }
                }
            ],
            classic: [
                {
                    title: "Scott Tenorman Must Die",
                    season: 5,
                    themes: ["revenge", "chili", "radiohead"],
                    characters: ["cartman"],
                    contentHooks: {
                        cartman: "Still my greatest masterpiece of revenge planning!"
                    }
                },
                {
                    title: "Make Love Not Warcraft",
                    season: 10,
                    themes: ["gaming", "world of warcraft", "basement dwelling"],
                    characters: ["stan", "kyle", "cartman", "kenny"],
                    contentHooks: {
                        cartman: "I'm basically a professional gamer now",
                        kyle: "We spent way too much time on that game",
                        stan: "At least we saved the world... of warcraft"
                    }
                }
            ]
        };
    }

    initializeSeasonalContent() {
        this.seasonalContent = {
            // Winter (Dec, Jan, Feb)
            winter: {
                months: [11, 0, 1],
                themes: ["christmas", "snow", "holidays", "new year"],
                contentTemplates: {
                    cartman: [
                        "Christmas is my favorite time of year because everyone gives ME presents!",
                        "My New Year's resolution: Make even more money and annoy Kyle more",
                        "Building the world's most efficient snow fort for maximum snowball damage"
                    ],
                    kyle: [
                        "Celebrating Hanukkah with family traditions and reflection",
                        "New Year's resolution: Try to make South Park a better place",
                        "The snow is beautiful but I wish Cartman would stop throwing snowballs"
                    ],
                    stan: [
                        "Dad's Christmas decorations are getting out of control again...",
                        "Just trying to survive another South Park winter",
                        "Wendy and I are having our annual holiday argument"
                    ],
                    butters: [
                        "Oh boy! Christmas is so magical! I love giving presents!",
                        "I'm making New Year's cards for everyone in my class!",
                        "Building snow angels in the backyard! Well, until I got grounded for getting my clothes wet..."
                    ]
                },
                events: ["Christmas", "New Year", "Winter Break", "Snow Day"]
            },
            
            // Spring (Mar, Apr, May)
            spring: {
                months: [2, 3, 4],
                themes: ["easter", "spring break", "baseball", "allergies"],
                contentTemplates: {
                    cartman: [
                        "Spring means new business opportunities! Time to corner the Easter candy market!",
                        "Baseball season = hot dog sales opportunities at every game",
                        "My allergies are acting up but that just gives me an excuse to stay inside and plan"
                    ],
                    kyle: [
                        "Finally warm enough to start our environmental awareness campaigns!",
                        "Spring cleaning means organizing all my study materials",
                        "Baseball season! Time to show I can actually play sports"
                    ],
                    randy: [
                        "Spring has arrived and I have 47 new seasonal business ideas!",
                        "Started my annual spring garden project... this year will be different!",
                        "Baseball season means DAD SEASON! Time to embarrass Stan!"
                    ]
                },
                events: ["Easter", "Spring Break", "Baseball Season", "Earth Day"]
            },
            
            // Summer (Jun, Jul, Aug)
            summer: {
                months: [5, 6, 7],
                themes: ["summer camp", "vacation", "heat", "swimming"],
                contentTemplates: {
                    cartman: [
                        "Summer camp is just an opportunity to run profitable side businesses away from adult supervision",
                        "Started a premium lemonade stand - $3 per cup because it's 'artisanal'",
                        "The heat doesn't bother me because I'm cool inside AND outside"
                    ],
                    kyle: [
                        "Summer reading program is actually pretty fun this year!",
                        "Trying to convince everyone to go to educational museums instead of just arcade",
                        "Camp activities are great but I miss having structured learning"
                    ],
                    stan: [
                        "Summer vacation means more time for my dad to come up with embarrassing projects",
                        "Just trying to enjoy being a normal kid for a few months",
                        "Swimming at the community pool with friends (when they're not fighting)"
                    ]
                },
                events: ["Summer Camp", "4th of July", "Swimming", "Vacation"]
            },
            
            // Fall (Sep, Oct, Nov)  
            fall: {
                months: [8, 9, 10],
                themes: ["school", "halloween", "thanksgiving", "football"],
                contentTemplates: {
                    cartman: [
                        "Back to school means back to business! New classmates = new customers",
                        "Halloween is the perfect cover for some of my more creative schemes",
                        "Thanksgiving means I get to eat until I'm even more awesome"
                    ],
                    kyle: [
                        "Excited for the new school year and all the learning opportunities!",
                        "Halloween costume contest prep - going for historically accurate this year",
                        "Thanksgiving reminder to be grateful for family and friends (even Cartman... somehow)"
                    ],
                    stan: [
                        "Another school year, another year of South Park weirdness",
                        "Halloween in South Park is always... eventful",
                        "Football season! Finally something normal and American!"
                    ]
                },
                events: ["Back to School", "Halloween", "Thanksgiving", "Football Season"]
            }
        };
    }

    initializeCharacterPersonalities() {
        this.characterPersonalities = {
            cartman: {
                traits: ["greedy", "scheming", "narcissistic", "entrepreneurial"],
                vocabulary: ["awesome", "sweet", "totally", "seriously guys"],
                postTypes: ["business_scheme", "kyle_hatred", "victim_card", "mom_worship"],
                likesToMention: ["his businesses", "Kyle's failures", "his mom", "his awesomeness"]
            },
            kyle: {
                traits: ["moral", "intellectual", "passionate", "argumentative"],
                vocabulary: ["dude", "seriously", "we need to", "this is wrong"],
                postTypes: ["social_cause", "academic_achievement", "cartman_frustration", "family_pride"],
                likesToMention: ["injustice", "education", "his family", "doing the right thing"]
            },
            stan: {
                traits: ["normal", "reasonable", "overwhelmed", "loyal"],
                vocabulary: ["oh man", "this is crazy", "whatever", "dude"],
                postTypes: ["dad_embarrassment", "friend_drama", "normal_kid_stuff", "voice_of_reason"],
                likesToMention: ["his friends", "his dad's antics", "just wanting normalcy", "Wendy drama"]
            },
            kenny: {
                traits: ["mysterious", "poor", "resilient", "protective"],
                vocabulary: ["mmpfh", "mph", "translation:", "muffled speech"],
                postTypes: ["family_struggles", "death_references", "karen_protection", "friend_loyalty"],
                likesToMention: ["his sister Karen", "being poor but proud", "his friends", "mysterious past"]
            },
            butters: {
                traits: ["innocent", "optimistic", "naive", "helpful"],
                vocabulary: ["oh hamburgers", "gosh", "golly", "aw jeez"],
                postTypes: ["innocent_joy", "grounding_updates", "helping_others", "professor_chaos"],
                likesToMention: ["how great everything is", "his parents", "helping friends", "being grounded"]
            },
            randy: {
                traits: ["obsessive", "dramatic", "embarrassing", "trendy"],
                vocabulary: ["oh my god", "this is huge", "Sharon!", "I'm gonna"],
                postTypes: ["new_obsession", "dramatic_announcement", "embarrassing_stan", "business_venture"],
                likesToMention: ["his latest obsession", "how amazing his ideas are", "his family", "being dramatic"]
            }
        };
    }

    getCurrentSeason() {
        const month = this.currentDate.getMonth();
        for (const [season, data] of Object.entries(this.seasonalContent)) {
            if (data.months.includes(month)) {
                return season;
            }
        }
        return 'spring'; // fallback
    }

    generateSeasonalPost(characterKey) {
        const season = this.getCurrentSeason();
        const seasonData = this.seasonalContent[season];
        const character = this.characterPersonalities[characterKey];
        
        if (!seasonData.contentTemplates[characterKey]) {
            return this.generateGenericPost(characterKey);
        }
        
        const templates = seasonData.contentTemplates[characterKey];
        const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
        
        return {
            content: selectedTemplate,
            type: "seasonal",
            season: season,
            timestamp: new Date(),
            mood: this.getSeasonalMood(characterKey, season),
            hashtags: this.generateSeasonalHashtags(season, characterKey)
        };
    }

    generateEpisodeReferencedPost(characterKey, episodeTitle = null) {
        let relevantEpisodes = [...this.episodes.recent, ...this.episodes.classic];
        
        // Filter episodes that feature this character
        relevantEpisodes = relevantEpisodes.filter(ep => 
            ep.characters.includes(characterKey)
        );
        
        if (relevantEpisodes.length === 0) {
            return this.generateGenericPost(characterKey);
        }
        
        const episode = episodeTitle ? 
            relevantEpisodes.find(ep => ep.title === episodeTitle) :
            relevantEpisodes[Math.floor(Math.random() * relevantEpisodes.length)];
            
        if (!episode || !episode.contentHooks[characterKey]) {
            return this.generateGenericPost(characterKey);
        }
        
        return {
            content: episode.contentHooks[characterKey],
            type: "episode_reference",
            episode: episode.title,
            season: episode.season,
            timestamp: new Date(),
            themes: episode.themes,
            hashtags: this.generateEpisodeHashtags(episode, characterKey)
        };
    }

    generateGenericPost(characterKey) {
        const character = this.characterPersonalities[characterKey];
        if (!character) return null;
        
        const genericTemplates = {
            cartman: [
                "Just had another brilliant business idea! The market isn't ready for my genius yet.",
                "Kyle tried to argue with me today. When will he learn that I'm always right?",
                "My mom made me my favorite dinner because she knows I'm special!",
                "Started planning my next scheme. It's going to be SWEET!"
            ],
            kyle: [
                "Finished another book for my summer reading. Education never stops!",
                "Saw some injustice today and couldn't stay silent about it.",
                "Family dinner was great - love hearing about my dad's cases and my mom's activism.",
                "Sometimes I wonder why I even try to reason with Cartman..."
            ],
            stan: [
                "Just another weird day in South Park. At least my friends are... mostly normal.",
                "My dad's latest project is somehow more embarrassing than the last one.",
                "Hanging out with Kyle and Kenny. Cartman's being Cartman.",
                "Sometimes I feel like the only sane person in this town."
            ],
            kenny: [
                "Mmpfh mph mmpfh! (Translation: Had a pretty good day!)",
                "Mmpfh mmpfh mph mmpfh. (Translation: Looking out for my little sister.)",
                "Mph mmpfh mmpfh! (Translation: My friends are awesome!)",
                "Mmpfh mph! (Translation: Still alive!)"
            ],
            butters: [
                "Oh hamburgers, what a swell day! Everyone's being so nice!",
                "I helped three people today and it made me feel all warm inside!",
                "Got grounded again but I'm making the best of it by organizing my room!",
                "Gosh, life is just so wonderful when you look for the good in everything!"
            ]
        };
        
        const templates = genericTemplates[characterKey] || ["Having a great day!"];
        const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
        
        return {
            content: selectedTemplate,
            type: "generic",
            timestamp: new Date(),
            hashtags: this.generateGenericHashtags(characterKey)
        };
    }

    getSeasonalMood(characterKey, season) {
        const seasonalMoods = {
            winter: {
                cartman: "Scheming holiday profits",
                kyle: "Reflecting and grateful",
                stan: "Surviving winter chaos",
                kenny: "Staying warm",
                butters: "Holiday excitement"
            },
            spring: {
                cartman: "Planning new ventures", 
                kyle: "Energized for change",
                stan: "Relieved it's warming up",
                kenny: "Enjoying longer days",
                butters: "Spring cleaning joy"
            },
            summer: {
                cartman: "Summer business mode",
                kyle: "Learning and exploring", 
                stan: "Relaxed (for South Park)",
                kenny: "Summer freedom",
                butters: "Pure summer bliss"
            },
            fall: {
                cartman: "Back to school schemes",
                kyle: "Academic enthusiasm",
                stan: "Football and normalcy",
                kenny: "New school year",
                butters: "Excited for learning"
            }
        };
        
        return seasonalMoods[season]?.[characterKey] || "Feeling good";
    }

    generateSeasonalHashtags(season, characterKey) {
        const baseSeasonalTags = {
            winter: ["#Winter", "#Holidays", "#SouthParkSnow"],
            spring: ["#Spring", "#NewBeginnings", "#SouthParkSpring"], 
            summer: ["#Summer", "#Vacation", "#SouthParkSummer"],
            fall: ["#Fall", "#BackToSchool", "#SouthParkAutumn"]
        };
        
        const characterTags = {
            cartman: ["#BusinessGenius", "#Entrepreneur", "#AwesomeIdeas"],
            kyle: ["#DoingTheRightThing", "#Family", "#Learning"],
            stan: ["#NormalKid", "#BestFriends", "#SouthParkLife"],
            kenny: ["#StillAlive", "#Friends", "#Family"],
            butters: ["#PositiveThinking", "#OhHamburgers", "#Wholesome"]
        };
        
        return [
            ...(baseSeasonalTags[season] || []),
            ...(characterTags[characterKey] || []),
            "#SouthPark"
        ];
    }

    generateEpisodeHashtags(episode, characterKey) {
        const baseTags = episode.themes.map(theme => `#${theme.charAt(0).toUpperCase() + theme.slice(1)}`);
        const characterTags = {
            cartman: ["#BusinessGenius", "#Schemes"],
            kyle: ["#VoiceOfReason", "#Moral"],
            stan: ["#Normal", "#Confused"],
            kenny: ["#Mysterious", "#Poor"]
        };
        
        return [
            ...baseTags,
            ...(characterTags[characterKey] || []),
            "#SouthPark",
            `#Season${episode.season}`
        ];
    }

    generateGenericHashtags(characterKey) {
        const characterTags = {
            cartman: ["#Entrepreneur", "#Awesome", "#KyleIsJealous"],
            kyle: ["#Justice", "#Family", "#Education"], 
            stan: ["#Friends", "#Normal", "#SouthParkLife"],
            kenny: ["#Muffled", "#Friends", "#StillAlive"],
            butters: ["#OhHamburgers", "#Positive", "#Innocent"]
        };
        
        return [
            ...(characterTags[characterKey] || []),
            "#SouthPark",
            "#4thGrade"
        ];
    }

    // Main method to generate new post content
    generatePost(characterKey, type = 'auto') {
        switch (type) {
            case 'seasonal':
                return this.generateSeasonalPost(characterKey);
            case 'episode':
                return this.generateEpisodeReferencedPost(characterKey);
            case 'generic':
                return this.generateGenericPost(characterKey);
            default:
                // Auto mode - randomly choose type based on current season/date
                const random = Math.random();
                if (random < 0.4) return this.generateSeasonalPost(characterKey);
                if (random < 0.7) return this.generateEpisodeReferencedPost(characterKey);
                return this.generateGenericPost(characterKey);
        }
    }

    // Method to inject new posts into existing profiles
    injectDynamicPost(characterKey, targetElement) {
        const post = this.generatePost(characterKey);
        if (!post) return;
        
        const postElement = this.createPostElement(post, characterKey);
        targetElement.prepend(postElement);
        
        // Add fade-in animation
        postElement.style.opacity = '0';
        postElement.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            postElement.style.transition = 'all 0.5s ease';
            postElement.style.opacity = '1';
            postElement.style.transform = 'translateY(0)';
        }, 100);
    }

    createPostElement(post, characterKey) {
        const character = window.characterInteractions?.characters[characterKey];
        const timeAgo = this.formatTimeAgo(post.timestamp);
        
        const postDiv = document.createElement('div');
        postDiv.className = 'post dynamic-post';
        postDiv.innerHTML = `
            <div class="post-header">
                <div class="post-avatar" style="background: linear-gradient(45deg, ${character?.colorScheme || '#333'}, ${this.lightenColor(character?.colorScheme || '#333')});">
                    ${character?.avatar || 'SP'}
                </div>
                <div class="post-info">
                    <h4>${character?.name || 'South Park Character'}</h4>
                    <div class="post-time">${timeAgo} • 🆕 ${post.mood || 'Posting'}</div>
                </div>
            </div>
            <div class="post-content">
                ${post.content}
                ${post.hashtags ? `<div style="margin-top: 10px; color: #1877f2; font-size: 14px;">${post.hashtags.join(' ')}</div>` : ''}
            </div>
            <div class="post-actions">
                <div class="post-action">👍 Like</div>
                <div class="post-action">💬 Comment</div>
                <div class="post-action">↗️ Share</div>
            </div>
        `;
        
        return postDiv;
    }

    formatTimeAgo(timestamp) {
        const now = new Date();
        const diffMs = now - timestamp;
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
        return `${Math.floor(diffMins / 1440)}d ago`;
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
}

// CSS for dynamic posts
const dynamicPostStyles = `
    .dynamic-post {
        border-left: 4px solid #1877f2;
        background: linear-gradient(135deg, rgba(24, 119, 242, 0.05), rgba(255, 255, 255, 1));
    }
    
    .dynamic-post .post-header::after {
        content: "🆕";
        position: absolute;
        top: -5px;
        right: -5px;
        background: #1877f2;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
    }
`;

// Inject dynamic post styles
const dynamicStyleSheet = document.createElement('style');
dynamicStyleSheet.textContent = dynamicPostStyles;
document.head.appendChild(dynamicStyleSheet);

// Initialize the dynamic content system
window.dynamicContent = new DynamicContentSystem();

// Auto-generate content on supported profiles
document.addEventListener('DOMContentLoaded', () => {
    // Add a "New Post" button to profiles that generates dynamic content
    const addDynamicContentButton = () => {
        const composer = document.querySelector('.post-composer');
        if (composer && window.dynamicContent) {
            const button = document.createElement('button');
            button.textContent = '🆕 Generate New Post';
            button.className = 'dynamic-content-btn';
            button.style.cssText = `
                background: #1877f2;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 6px;
                margin-top: 10px;
                cursor: pointer;
                font-weight: 600;
                display: block;
                width: 100%;
            `;
            
            button.addEventListener('click', () => {
                const characterKey = window.characterInteractions?.detectPostAuthor();
                const mainContent = document.querySelector('.main-content');
                if (characterKey && mainContent) {
                    window.dynamicContent.injectDynamicPost(characterKey, mainContent);
                    button.textContent = '✓ Post Added!';
                    setTimeout(() => {
                        button.textContent = '🆕 Generate Another Post';
                    }, 2000);
                }
            });
            
            composer.appendChild(button);
        }
    };
    
    // Add button after a delay to ensure other systems are loaded
    setTimeout(addDynamicContentButton, 2000);
});
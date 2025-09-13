/**
 * South Park Facebook Profiles - Episode Reference Database
 * Links character posts and interactions to specific South Park episodes
 */

class EpisodeDatabase {
    constructor() {
        this.episodes = new Map();
        this.characterEpisodes = new Map();
        this.seasonData = new Map();
        this.taggedPosts = new Map();
        this.initializeDatabase();
    }

    initializeDatabase() {
        // Season 1 Episodes
        this.addEpisode('S01E01', {
            title: 'Cartman Gets an Anal Probe',
            season: 1,
            episode: 1,
            airDate: '1997-08-13',
            characters: ['cartman', 'kyle', 'stan', 'kenny', 'chef'],
            themes: ['aliens', 'friendship', 'first episode'],
            memorable_quotes: [
                'Oh my God, they killed Kenny! - You bastards!',
                'I\'m not fat, I\'m big boned!'
            ],
            character_focus: ['cartman', 'kenny']
        });

        this.addEpisode('S01E08', {
            title: 'Damien',
            season: 1,
            episode: 8,
            airDate: '1998-02-04',
            characters: ['cartman', 'kyle', 'stan', 'kenny', 'damien', 'jesus'],
            themes: ['good vs evil', 'boxing', 'supernatural'],
            memorable_quotes: [
                'It\'s on!'
            ],
            character_focus: ['damien', 'jesus']
        });

        // Season 2 Episodes
        this.addEpisode('S02E04', {
            title: 'Chickenlover',
            season: 2,
            episode: 4,
            airDate: '1998-05-27',
            characters: ['cartman', 'kyle', 'stan', 'kenny', 'barbrady'],
            themes: ['authority', 'responsibility', 'literacy'],
            memorable_quotes: [
                'Respect mah authoritah!'
            ],
            character_focus: ['cartman', 'barbrady']
        });

        // Season 3 Episodes
        this.addEpisode('S03E02', {
            title: 'Spontaneous Combustion',
            season: 3,
            episode: 2,
            airDate: '1999-04-14',
            characters: ['randy', 'stan', 'cartman', 'kyle', 'kenny'],
            themes: ['science', 'religion', 'spontaneous combustion'],
            memorable_quotes: [
                'Stan, can you help your old man?'
            ],
            character_focus: ['randy', 'stan']
        });

        // Season 4 Episodes
        this.addEpisode('S04E10', {
            title: 'Probably',
            season: 4,
            episode: 10,
            airDate: '2000-07-26',
            characters: ['cartman', 'kyle', 'stan', 'kenny', 'satan', 'saddam'],
            themes: ['religion', 'hell', 'morality'],
            memorable_quotes: [
                'You go to Hell and you die!'
            ],
            character_focus: ['satan', 'cartman']
        });

        // Season 5 Episodes
        this.addEpisode('S05E03', {
            title: 'Cripple Fight',
            season: 5,
            episode: 3,
            airDate: '2001-06-27',
            characters: ['jimmy', 'timmy', 'cartman', 'kyle', 'stan', 'kenny'],
            themes: ['competition', 'disability', 'friendship'],
            memorable_quotes: [
                'Wow, what a great audience!',
                'TIMMY!'
            ],
            character_focus: ['jimmy', 'timmy']
        });

        // Modern Episodes
        this.addEpisode('S10E08', {
            title: 'Make Love, Not Warcraft',
            season: 10,
            episode: 8,
            airDate: '2006-10-04',
            characters: ['cartman', 'kyle', 'stan', 'kenny', 'randy'],
            themes: ['gaming', 'addiction', 'friendship'],
            memorable_quotes: [
                'We can\'t trust the sword of a thousand truths to a noob!'
            ],
            character_focus: ['randy', 'stan']
        });

        this.addEpisode('S15E07', {
            title: 'You\'re Getting Old',
            season: 15,
            episode: 7,
            airDate: '2011-06-08',
            characters: ['stan', 'randy', 'sharon', 'kyle'],
            themes: ['growing up', 'cynicism', 'family'],
            memorable_quotes: [
                'Everything sounds like shit to me'
            ],
            character_focus: ['stan', 'randy']
        });

        this.addEpisode('S21E02', {
            title: 'Put It Down',
            season: 21,
            episode: 2,
            airDate: '2017-09-20',
            characters: ['tweek', 'craig', 'cartman', 'kyle', 'stan'],
            themes: ['anxiety', 'relationships', 'support'],
            memorable_quotes: [
                'Craig and Tweek are gay'
            ],
            character_focus: ['tweek', 'craig']
        });

        // Recent Episodes
        this.addEpisode('S23E01', {
            title: 'Mexican Joker',
            season: 23,
            episode: 1,
            airDate: '2019-09-25',
            characters: ['cartman', 'kyle', 'stan', 'kenny', 'randy'],
            themes: ['immigration', 'detention centers'],
            memorable_quotes: [
                'Oh, hamburgers!'
            ],
            character_focus: ['cartman', 'butters']
        });

        // Tegridy Farms Arc
        this.addEpisode('S23E04', {
            title: 'Let Them Eat Goo',
            season: 23,
            episode: 4,
            airDate: '2019-10-16',
            characters: ['randy', 'stan', 'sharon', 'cartman', 'kyle'],
            themes: ['tegridy farms', 'meat alternatives', 'business'],
            memorable_quotes: [
                'I got some tegridy'
            ],
            character_focus: ['randy', 'stan']
        });

        // Initialize character episode mappings
        this.buildCharacterEpisodeMaps();
    }

    addEpisode(episodeId, episodeData) {
        this.episodes.set(episodeId, episodeData);
        
        // Add to season data
        if (!this.seasonData.has(episodeData.season)) {
            this.seasonData.set(episodeData.season, []);
        }
        this.seasonData.get(episodeData.season).push(episodeId);
    }

    buildCharacterEpisodeMaps() {
        for (const [episodeId, episode] of this.episodes) {
            episode.characters.forEach(character => {
                if (!this.characterEpisodes.has(character)) {
                    this.characterEpisodes.set(character, []);
                }
                this.characterEpisodes.get(character).push(episodeId);
            });
        }
    }

    getEpisodesByCharacter(character) {
        return this.characterEpisodes.get(character) || [];
    }

    getEpisodeData(episodeId) {
        return this.episodes.get(episodeId);
    }

    getRandomEpisodeForCharacter(character) {
        const episodes = this.getEpisodesByCharacter(character);
        if (episodes.length === 0) return null;
        
        const randomIndex = Math.floor(Math.random() * episodes.length);
        const episodeId = episodes[randomIndex];
        return this.getEpisodeData(episodeId);
    }

    generateEpisodeBasedPost(character) {
        const episode = this.getRandomEpisodeForCharacter(character);
        if (!episode) return null;

        const templates = {
            cartman: [
                `Just rewatched "${episode.title}" and I STILL can't believe Kyle thought he could outsmart me! 💰`,
                `That episode "${episode.title}" proves I was RIGHT all along! Respect mah authoritah! 👑`,
                `Remember when "${episode.title}" aired? That was peak Cartman brilliance right there! 🧠`
            ],
            kyle: [
                `"${episode.title}" really makes you think about ${episode.themes[0] || 'important issues'}... 🤔`,
                `Watching "${episode.title}" again - Cartman was SO wrong about everything! 😤`,
                `That "${episode.title}" episode had some really important messages about society 📚`
            ],
            stan: [
                `"${episode.title}" was a weird time... but then again, everything in this town is weird 🙄`,
                `Just thinking about that "${episode.title}" episode... why does everything have to be so complicated? 😕`,
                `Remember "${episode.title}"? Yeah, that was pretty messed up even for South Park standards 🤷‍♂️`
            ],
            kenny: [
                `Mmmph mph mmmph "${episode.title}" mmmph! (That episode was crazy but at least I didn't die!) 💀`,
                `Mph mmmph "${episode.title}" mph mmmph! (Translation: That episode was wild!) 🎭`,
                `Mmmph "${episode.title}" mph! (Man, that was a good episode!) 👍`
            ],
            randy: [
                `Oh my God, "${episode.title}" was AMAZING! I'm going to base my entire personality around it for the next month! 🚀`,
                `Sharon, you HAVE to watch "${episode.title}" with me again! This changes EVERYTHING! 🌟`,
                `"${episode.title}" proves I was ahead of my time! I called it! 🎯`
            ],
            butters: [
                `Oh hamburgers! "${episode.title}" was so exciting! Even though I was grounded afterwards... 😊`,
                `Golly, that "${episode.title}" episode was really something! I learned a lot! 🌈`,
                `Well gee fellas, "${episode.title}" sure was an adventure! 😇`
            ]
        };

        const characterTemplates = templates[character];
        if (!characterTemplates) return null;

        const randomTemplate = characterTemplates[Math.floor(Math.random() * characterTemplates.length)];
        
        return {
            content: randomTemplate,
            episodeReference: episode.title,
            episodeId: `S${String(episode.season).padStart(2, '0')}E${String(episode.episode).padStart(2, '0')}`,
            themes: episode.themes,
            timestamp: new Date().toISOString()
        };
    }

    tagPost(postId, episodeId) {
        if (!this.taggedPosts.has(episodeId)) {
            this.taggedPosts.set(episodeId, []);
        }
        this.taggedPosts.get(episodeId).push(postId);
    }

    getPostsByEpisode(episodeId) {
        return this.taggedPosts.get(episodeId) || [];
    }

    searchEpisodes(query) {
        const results = [];
        const searchTerm = query.toLowerCase();

        for (const [episodeId, episode] of this.episodes) {
            if (
                episode.title.toLowerCase().includes(searchTerm) ||
                episode.themes.some(theme => theme.toLowerCase().includes(searchTerm)) ||
                episode.characters.some(char => char.toLowerCase().includes(searchTerm)) ||
                episode.memorable_quotes.some(quote => quote.toLowerCase().includes(searchTerm))
            ) {
                results.push({
                    id: episodeId,
                    ...episode,
                    relevanceScore: this.calculateRelevance(episode, searchTerm)
                });
            }
        }

        return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }

    calculateRelevance(episode, searchTerm) {
        let score = 0;
        
        if (episode.title.toLowerCase().includes(searchTerm)) score += 10;
        if (episode.themes.some(theme => theme.toLowerCase().includes(searchTerm))) score += 5;
        if (episode.characters.some(char => char.toLowerCase().includes(searchTerm))) score += 3;
        if (episode.memorable_quotes.some(quote => quote.toLowerCase().includes(searchTerm))) score += 2;
        
        return score;
    }

    getSeasonEpisodes(season) {
        return this.seasonData.get(season) || [];
    }

    getAllSeasons() {
        return Array.from(this.seasonData.keys()).sort((a, b) => a - b);
    }

    generateEpisodeTimeline() {
        const timeline = [];
        
        for (const [episodeId, episode] of this.episodes) {
            timeline.push({
                id: episodeId,
                title: episode.title,
                date: episode.airDate,
                season: episode.season,
                episode: episode.episode,
                characters: episode.characters,
                themes: episode.themes
            });
        }

        return timeline.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    getRelatedEpisodes(episodeId, limit = 5) {
        const episode = this.episodes.get(episodeId);
        if (!episode) return [];

        const related = [];
        
        for (const [otherId, otherEpisode] of this.episodes) {
            if (otherId === episodeId) continue;
            
            const commonCharacters = episode.characters.filter(char => 
                otherEpisode.characters.includes(char)
            ).length;
            
            const commonThemes = episode.themes.filter(theme => 
                otherEpisode.themes.includes(theme)
            ).length;
            
            const relevanceScore = commonCharacters * 2 + commonThemes * 3;
            
            if (relevanceScore > 0) {
                related.push({
                    id: otherId,
                    ...otherEpisode,
                    relevanceScore
                });
            }
        }

        return related
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, limit);
    }
}

// Create global instance
window.episodeDatabase = new EpisodeDatabase();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EpisodeDatabase;
}
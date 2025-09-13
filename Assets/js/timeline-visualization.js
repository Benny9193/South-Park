/**
 * South Park Facebook Profiles - Timeline Visualization System
 * Interactive timeline with smooth animations and visual storytelling
 */

class TimelineVisualization {
    constructor() {
        this.timeline = [];
        this.timelineElements = new Map();
        this.currentView = 'character'; // character, episode, chronological, relationship
        this.visibleRange = { start: null, end: null };
        this.animationSpeed = 'normal'; // slow, normal, fast
        this.isPlaying = false;
        this.playbackPosition = 0;
        this.filters = new Set();
        this.initializeTimelineData();
        this.bindEvents();
    }

    initializeTimelineData() {
        // Character-based timeline events
        this.timeline = [
            {
                id: 'timeline_001',
                type: 'character_introduction',
                character: 'cartman',
                title: 'Eric Cartman Joins South Park Elementary',
                description: 'The future CEO arrives and immediately starts scheming',
                date: '1997-08-13',
                episode: 'S01E01',
                importance: 'high',
                tags: ['origin', 'school', 'cartman'],
                media: ['cartman_first_day.jpg'],
                connections: ['kyle', 'stan', 'kenny']
            },
            {
                id: 'timeline_002',
                type: 'relationship_start',
                character: 'cartman',
                relatedCharacter: 'kyle',
                title: 'The Great Cartman-Kyle Rivalry Begins',
                description: 'First recorded argument between future sworn enemies',
                date: '1997-08-13',
                episode: 'S01E01',
                importance: 'high',
                tags: ['rivalry', 'cartman', 'kyle'],
                media: ['cartman_kyle_fight.jpg'],
                connections: ['cartman', 'kyle']
            },
            {
                id: 'timeline_003',
                type: 'achievement',
                character: 'cartman',
                title: 'First Business Venture: "Respect Mah Authoritah" Security',
                description: 'Cartman\'s debut as a self-appointed authority figure',
                date: '1998-05-27',
                episode: 'S02E04',
                importance: 'medium',
                tags: ['business', 'authority', 'cartman'],
                media: ['cartman_cop.jpg'],
                connections: ['barbrady']
            },
            {
                id: 'timeline_004',
                type: 'death',
                character: 'kenny',
                title: 'Kenny\'s First Documented Death',
                description: 'You bastards! The cycle of Kenny deaths officially begins',
                date: '1997-08-13',
                episode: 'S01E01',
                importance: 'high',
                tags: ['death', 'kenny', 'mystery'],
                media: ['kenny_death_1.jpg'],
                connections: ['kenny']
            },
            {
                id: 'timeline_005',
                type: 'character_development',
                character: 'kyle',
                title: 'Kyle\'s First "I Learned Something Today" Moment',
                description: 'Kyle establishes himself as the moral center of the group',
                date: '1997-08-20',
                episode: 'S01E02',
                importance: 'medium',
                tags: ['moral', 'kyle', 'lesson'],
                media: ['kyle_speech.jpg'],
                connections: ['kyle']
            },
            {
                id: 'timeline_006',
                type: 'family_drama',
                character: 'stan',
                title: 'Stan Deals with Randy\'s First Major Obsession',
                description: 'Randy discovers something new and Stan suffers the consequences',
                date: '1999-04-14',
                episode: 'S03E02',
                importance: 'medium',
                tags: ['family', 'randy', 'stan', 'embarrassment'],
                media: ['randy_obsession.jpg'],
                connections: ['stan', 'randy']
            },
            {
                id: 'timeline_007',
                type: 'business_launch',
                character: 'cartman',
                title: 'Cartman Enterprises™ Official Launch',
                description: 'The birth of an empire (in Cartman\'s bedroom)',
                date: '2000-07-26',
                episode: 'S04E10',
                importance: 'high',
                tags: ['business', 'empire', 'cartman'],
                media: ['cartman_enterprises.jpg'],
                connections: ['cartman']
            },
            {
                id: 'timeline_008',
                type: 'romantic_relationship',
                character: 'craig',
                relatedCharacter: 'tweek',
                title: 'Craig & Tweek: From Forced to Real',
                description: 'What started as a social experiment became genuine love',
                date: '2017-09-20',
                episode: 'S21E02',
                importance: 'high',
                tags: ['love', 'craig', 'tweek', 'relationship'],
                media: ['craig_tweek_relationship.jpg'],
                connections: ['craig', 'tweek']
            },
            {
                id: 'timeline_009',
                type: 'business_pivot',
                character: 'randy',
                title: 'Tegridy Farms: Randy\'s Greatest Obsession',
                description: 'Randy discovers his true calling and won\'t shut up about it',
                date: '2018-09-26',
                episode: 'S22E01',
                importance: 'high',
                tags: ['tegridy', 'randy', 'farming', 'business'],
                media: ['tegridy_farms.jpg'],
                connections: ['randy', 'stan', 'towelie']
            },
            {
                id: 'timeline_010',
                type: 'character_growth',
                character: 'butters',
                title: 'Butters\' Innocent Optimism Peak',
                description: 'Peak wholesome Butters content, maximum hamburgers achieved',
                date: '2019-10-16',
                episode: 'S23E04',
                importance: 'medium',
                tags: ['innocence', 'butters', 'wholesome'],
                media: ['butters_peak.jpg'],
                connections: ['butters']
            },
            {
                id: 'timeline_011',
                type: 'achievement',
                character: 'jimmy',
                title: 'Jimmy\'s Comedy Career Breakthrough',
                description: 'What a great audience! Jimmy becomes South Park\'s premier comedian',
                date: '2001-06-27',
                episode: 'S05E03',
                importance: 'medium',
                tags: ['comedy', 'jimmy', 'success'],
                media: ['jimmy_comedy.jpg'],
                connections: ['jimmy', 'timmy']
            },
            {
                id: 'timeline_012',
                type: 'friendship',
                character: 'jimmy',
                relatedCharacter: 'timmy',
                title: 'Jimmy & Timmy: Dynamic Comedy Duo',
                description: 'TIMMY! The perfect partnership is born',
                date: '2001-06-27',
                episode: 'S05E03',
                importance: 'high',
                tags: ['friendship', 'jimmy', 'timmy', 'comedy'],
                media: ['jimmy_timmy_duo.jpg'],
                connections: ['jimmy', 'timmy']
            }
        ];

        // Sort timeline by date
        this.timeline.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Set default visible range
        this.visibleRange.start = new Date('1997-01-01');
        this.visibleRange.end = new Date('2024-12-31');
    }

    bindEvents() {
        // Keyboard controls for timeline navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.navigateTimeline(-1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.navigateTimeline(1);
                    break;
                case ' ':
                    e.preventDefault();
                    this.togglePlayback();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToTimelineStart();
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToTimelineEnd();
                    break;
            }
        });
    }

    // Timeline rendering methods
    renderTimeline(containerId, viewType = 'character') {
        const container = document.getElementById(containerId);
        if (!container) return;

        this.currentView = viewType;
        
        const timelineHTML = `
            <div class="timeline-container">
                ${this.renderTimelineControls()}
                ${this.renderTimelineHeader()}
                ${this.renderTimelineTrack()}
                ${this.renderTimelineFooter()}
            </div>
        `;
        
        container.innerHTML = timelineHTML;
        this.attachEventListeners();
        this.animateTimelineEntrance();
    }

    renderTimelineControls() {
        return `
            <div class="timeline-controls">
                <div class="playback-controls">
                    <button class="control-btn" onclick="timeline.goToTimelineStart()" title="Go to Start">⏮️</button>
                    <button class="control-btn" onclick="timeline.navigateTimeline(-1)" title="Previous Event">⏪</button>
                    <button class="control-btn ${this.isPlaying ? 'playing' : ''}" onclick="timeline.togglePlayback()" title="Play/Pause">
                        ${this.isPlaying ? '⏸️' : '▶️'}
                    </button>
                    <button class="control-btn" onclick="timeline.navigateTimeline(1)" title="Next Event">⏩</button>
                    <button class="control-btn" onclick="timeline.goToTimelineEnd()" title="Go to End">⏭️</button>
                </div>
                
                <div class="view-controls">
                    <select class="view-selector" onchange="timeline.changeView(this.value)">
                        <option value="character" ${this.currentView === 'character' ? 'selected' : ''}>Character View</option>
                        <option value="episode" ${this.currentView === 'episode' ? 'selected' : ''}>Episode View</option>
                        <option value="chronological" ${this.currentView === 'chronological' ? 'selected' : ''}>Chronological</option>
                        <option value="relationship" ${this.currentView === 'relationship' ? 'selected' : ''}>Relationships</option>
                    </select>
                    
                    <select class="speed-selector" onchange="timeline.changeAnimationSpeed(this.value)">
                        <option value="slow" ${this.animationSpeed === 'slow' ? 'selected' : ''}>Slow</option>
                        <option value="normal" ${this.animationSpeed === 'normal' ? 'selected' : ''}>Normal</option>
                        <option value="fast" ${this.animationSpeed === 'fast' ? 'selected' : ''}>Fast</option>
                    </select>
                </div>
                
                <div class="filter-controls">
                    <div class="filter-tags">
                        ${this.renderFilterTags()}
                    </div>
                    <button class="control-btn" onclick="timeline.clearFilters()" title="Clear Filters">🧹</button>
                </div>
            </div>
        `;
    }

    renderFilterTags() {
        const allTags = [...new Set(this.timeline.flatMap(event => event.tags))];
        return allTags.slice(0, 8).map(tag => `
            <button class="filter-tag ${this.filters.has(tag) ? 'active' : ''}" 
                    onclick="timeline.toggleFilter('${tag}')">${tag}</button>
        `).join('');
    }

    renderTimelineHeader() {
        const currentEvent = this.timeline[this.playbackPosition] || this.timeline[0];
        const progress = ((this.playbackPosition + 1) / this.timeline.length) * 100;
        
        return `
            <div class="timeline-header">
                <div class="timeline-progress">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                    <div class="progress-text">${this.playbackPosition + 1} / ${this.timeline.length}</div>
                </div>
                
                <div class="current-event-preview">
                    <div class="event-date">${this.formatDate(currentEvent.date)}</div>
                    <div class="event-title">${currentEvent.title}</div>
                    <div class="event-episode">${currentEvent.episode}</div>
                </div>
            </div>
        `;
    }

    renderTimelineTrack() {
        const filteredEvents = this.getFilteredEvents();
        const trackHTML = filteredEvents.map((event, index) => this.renderTimelineEvent(event, index)).join('');
        
        return `
            <div class="timeline-track">
                <div class="timeline-line"></div>
                <div class="timeline-events">
                    ${trackHTML}
                </div>
            </div>
        `;
    }

    renderTimelineEvent(event, index) {
        const isActive = index === this.playbackPosition;
        const isPast = index < this.playbackPosition;
        const isFuture = index > this.playbackPosition;
        
        const eventClass = `timeline-event ${event.type} ${event.importance}-importance ${isActive ? 'active' : ''} ${isPast ? 'past' : ''} ${isFuture ? 'future' : ''}`;
        
        const position = this.calculateEventPosition(event, index);
        
        return `
            <div class="${eventClass}" 
                 data-event-id="${event.id}"
                 data-index="${index}"
                 style="left: ${position.x}%; top: ${position.y}px;"
                 onclick="timeline.selectEvent(${index})">
                
                <div class="event-marker">
                    <div class="event-icon">${this.getEventIcon(event.type)}</div>
                    <div class="event-pulse ${isActive ? 'active' : ''}"></div>
                </div>
                
                <div class="event-popup">
                    <div class="event-header">
                        <div class="event-character-avatar">
                            ${window.avatarSystem ? window.avatarSystem.generateAvatar(event.character, 'small') : event.character.charAt(0).toUpperCase()}
                        </div>
                        <div class="event-info">
                            <div class="event-title">${event.title}</div>
                            <div class="event-meta">
                                <span class="event-date">${this.formatDate(event.date)}</span>
                                <span class="event-episode">${event.episode}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="event-description">${event.description}</div>
                    
                    <div class="event-tags">
                        ${event.tags.map(tag => `<span class="event-tag">#${tag}</span>`).join('')}
                    </div>
                    
                    ${event.connections ? `
                        <div class="event-connections">
                            <strong>Connected to:</strong>
                            ${event.connections.map(char => `
                                <span class="connection-char" onclick="timeline.focusCharacter('${char}')">${char}</span>
                            `).join(', ')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderTimelineFooter() {
        return `
            <div class="timeline-footer">
                <div class="timeline-legend">
                    <div class="legend-item">
                        <div class="legend-marker high-importance"></div>
                        <span>Major Events</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-marker medium-importance"></div>
                        <span>Important Events</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-marker low-importance"></div>
                        <span>Minor Events</span>
                    </div>
                </div>
                
                <div class="timeline-stats">
                    <span>📊 ${this.timeline.length} Total Events</span>
                    <span>🎭 ${this.getUniqueCharacters().length} Characters</span>
                    <span>📺 ${this.getUniqueEpisodes().length} Episodes</span>
                </div>
            </div>
        `;
    }

    // Utility methods
    calculateEventPosition(event, index) {
        const timeSpan = this.visibleRange.end - this.visibleRange.start;
        const eventDate = new Date(event.date);
        const relativePosition = (eventDate - this.visibleRange.start) / timeSpan;
        
        // X position based on date
        const x = Math.max(5, Math.min(95, relativePosition * 100));
        
        // Y position based on view type and character
        let y = 0;
        switch (this.currentView) {
            case 'character':
                y = this.getCharacterTrack(event.character) * 80;
                break;
            case 'episode':
                y = (index % 5) * 60;
                break;
            case 'relationship':
                y = event.relatedCharacter ? 120 : 40;
                break;
            default:
                y = 40;
        }
        
        return { x, y };
    }

    getCharacterTrack(character) {
        const characters = ['cartman', 'kyle', 'stan', 'kenny', 'butters', 'randy'];
        const index = characters.indexOf(character);
        return index >= 0 ? index : characters.length;
    }

    getEventIcon(eventType) {
        const icons = {
            'character_introduction': '👋',
            'relationship_start': '🤝',
            'achievement': '🏆',
            'death': '💀',
            'character_development': '📈',
            'family_drama': '👨‍👩‍👧‍👦',
            'business_launch': '🚀',
            'romantic_relationship': '💕',
            'business_pivot': '🔄',
            'character_growth': '🌟',
            'friendship': '👫'
        };
        return icons[eventType] || '📅';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    // Navigation and playback methods
    navigateTimeline(direction) {
        const newPosition = this.playbackPosition + direction;
        if (newPosition >= 0 && newPosition < this.timeline.length) {
            this.playbackPosition = newPosition;
            this.updateTimelineDisplay();
            this.animateToEvent(this.playbackPosition);
        }
    }

    selectEvent(index) {
        this.playbackPosition = index;
        this.updateTimelineDisplay();
        this.animateToEvent(index);
    }

    togglePlayback() {
        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            this.startAutoPlayback();
        } else {
            this.stopAutoPlayback();
        }
        
        this.updatePlaybackButton();
    }

    startAutoPlayback() {
        if (this.playbackInterval) {
            clearInterval(this.playbackInterval);
        }
        
        const speedMultiplier = {
            'slow': 3000,
            'normal': 2000,
            'fast': 1000
        }[this.animationSpeed];
        
        this.playbackInterval = setInterval(() => {
            if (this.playbackPosition < this.timeline.length - 1) {
                this.navigateTimeline(1);
            } else {
                this.isPlaying = false;
                this.updatePlaybackButton();
                clearInterval(this.playbackInterval);
            }
        }, speedMultiplier);
    }

    stopAutoPlayback() {
        if (this.playbackInterval) {
            clearInterval(this.playbackInterval);
            this.playbackInterval = null;
        }
    }

    goToTimelineStart() {
        this.playbackPosition = 0;
        this.updateTimelineDisplay();
        this.animateToEvent(0);
    }

    goToTimelineEnd() {
        this.playbackPosition = this.timeline.length - 1;
        this.updateTimelineDisplay();
        this.animateToEvent(this.timeline.length - 1);
    }

    // Visual effects and animations
    animateTimelineEntrance() {
        const events = document.querySelectorAll('.timeline-event');
        events.forEach((event, index) => {
            event.style.opacity = '0';
            event.style.transform = 'scale(0.8) translateY(20px)';
            
            setTimeout(() => {
                event.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                event.style.opacity = '1';
                event.style.transform = 'scale(1) translateY(0)';
            }, index * 100);
        });
    }

    animateToEvent(index) {
        const allEvents = document.querySelectorAll('.timeline-event');
        const targetEvent = allEvents[index];
        
        if (!targetEvent) return;
        
        // Remove previous active states
        allEvents.forEach(event => event.classList.remove('active'));
        
        // Add active state to target
        targetEvent.classList.add('active');
        
        // Animate camera movement
        targetEvent.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
        
        // Pulse effect
        const marker = targetEvent.querySelector('.event-marker');
        if (marker) {
            marker.classList.add('pulse-animation');
            setTimeout(() => {
                marker.classList.remove('pulse-animation');
            }, 1000);
        }
        
        // Show/hide event popups based on proximity
        this.updateEventPopupVisibility(index);
    }

    updateEventPopupVisibility(centerIndex) {
        const events = document.querySelectorAll('.timeline-event');
        events.forEach((event, index) => {
            const popup = event.querySelector('.event-popup');
            const distance = Math.abs(index - centerIndex);
            
            if (distance <= 2) { // Show popups for nearby events
                popup.style.opacity = distance === 0 ? '1' : '0.7';
                popup.style.display = 'block';
            } else {
                popup.style.opacity = '0';
                setTimeout(() => {
                    if (popup.style.opacity === '0') {
                        popup.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

    updateTimelineDisplay() {
        // Update progress bar
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        
        if (progressBar && progressText) {
            const progress = ((this.playbackPosition + 1) / this.timeline.length) * 100;
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${this.playbackPosition + 1} / ${this.timeline.length}`;
        }
        
        // Update current event preview
        const currentEvent = this.timeline[this.playbackPosition];
        if (currentEvent) {
            const dateElement = document.querySelector('.current-event-preview .event-date');
            const titleElement = document.querySelector('.current-event-preview .event-title');
            const episodeElement = document.querySelector('.current-event-preview .event-episode');
            
            if (dateElement) dateElement.textContent = this.formatDate(currentEvent.date);
            if (titleElement) titleElement.textContent = currentEvent.title;
            if (episodeElement) episodeElement.textContent = currentEvent.episode;
        }
    }

    updatePlaybackButton() {
        const playButton = document.querySelector('.playback-controls .control-btn:nth-child(3)');
        if (playButton) {
            playButton.innerHTML = this.isPlaying ? '⏸️' : '▶️';
            playButton.classList.toggle('playing', this.isPlaying);
        }
    }

    // Filter and view methods
    toggleFilter(tag) {
        if (this.filters.has(tag)) {
            this.filters.delete(tag);
        } else {
            this.filters.add(tag);
        }
        
        this.refreshTimeline();
    }

    clearFilters() {
        this.filters.clear();
        this.refreshTimeline();
    }

    changeView(viewType) {
        this.currentView = viewType;
        this.refreshTimeline();
    }

    changeAnimationSpeed(speed) {
        this.animationSpeed = speed;
        
        if (this.isPlaying) {
            this.stopAutoPlayback();
            this.startAutoPlayback();
        }
    }

    getFilteredEvents() {
        if (this.filters.size === 0) return this.timeline;
        
        return this.timeline.filter(event => 
            event.tags.some(tag => this.filters.has(tag))
        );
    }

    refreshTimeline() {
        const container = document.querySelector('.timeline-track');
        if (container) {
            container.innerHTML = this.renderTimelineTrack();
            this.animateTimelineEntrance();
        }
        
        // Update filter tags
        const filterContainer = document.querySelector('.filter-tags');
        if (filterContainer) {
            filterContainer.innerHTML = this.renderFilterTags();
        }
    }

    // Character interaction methods
    focusCharacter(character) {
        // Filter timeline to show only this character's events
        this.filters.clear();
        this.filters.add(character);
        this.refreshTimeline();
        
        // Find first event for this character
        const characterEventIndex = this.timeline.findIndex(event => 
            event.character === character || 
            event.relatedCharacter === character ||
            event.connections?.includes(character)
        );
        
        if (characterEventIndex >= 0) {
            this.selectEvent(characterEventIndex);
        }
    }

    // Utility getters
    getUniqueCharacters() {
        const characters = new Set();
        this.timeline.forEach(event => {
            characters.add(event.character);
            if (event.relatedCharacter) characters.add(event.relatedCharacter);
            if (event.connections) event.connections.forEach(char => characters.add(char));
        });
        return Array.from(characters);
    }

    getUniqueEpisodes() {
        return [...new Set(this.timeline.map(event => event.episode))];
    }

    attachEventListeners() {
        // Add any additional event listeners needed
        const timelineTrack = document.querySelector('.timeline-track');
        if (timelineTrack) {
            timelineTrack.addEventListener('wheel', (e) => {
                e.preventDefault();
                const direction = e.deltaY > 0 ? 1 : -1;
                this.navigateTimeline(direction);
            });
        }
    }

    // Export methods
    exportTimelineData() {
        return {
            timeline: this.timeline,
            currentView: this.currentView,
            playbackPosition: this.playbackPosition,
            filters: Array.from(this.filters),
            timestamp: new Date().toISOString()
        };
    }
}

// Global helper functions
function initializeTimeline(containerId, viewType = 'character') {
    window.timeline.renderTimeline(containerId, viewType);
}

function createTimelineModal() {
    const modalHTML = `
        <div class="timeline-modal">
            <div class="timeline-modal-content">
                <div class="timeline-modal-header">
                    <h2>🕐 South Park Timeline</h2>
                    <button onclick="closeTimelineModal()">✕</button>
                </div>
                <div id="modal-timeline-container" class="timeline-modal-body"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    window.timeline.renderTimeline('modal-timeline-container', 'character');
    
    // Add entrance animation
    setTimeout(() => {
        document.querySelector('.timeline-modal').classList.add('show');
    }, 10);
}

function closeTimelineModal() {
    const modal = document.querySelector('.timeline-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// CSS for timeline visualization
const timelineStyles = document.createElement('style');
timelineStyles.textContent = `
    .timeline-container {
        background: #f8f9fa;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        position: relative;
        overflow: hidden;
    }

    .timeline-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        flex-wrap: wrap;
        gap: 15px;
    }

    .playback-controls, .view-controls, .filter-controls {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .control-btn {
        padding: 8px 12px;
        border: none;
        border-radius: 6px;
        background: #e0e0e0;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 16px;
        min-width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .control-btn:hover {
        background: #d0d0d0;
        transform: translateY(-1px);
    }

    .control-btn.playing {
        background: #ff6b6b;
        color: white;
    }

    .view-selector, .speed-selector {
        padding: 8px 12px;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        background: white;
        cursor: pointer;
        outline: none;
    }

    .filter-tags {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
    }

    .filter-tag {
        padding: 4px 8px;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        background: white;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
    }

    .filter-tag:hover {
        background: #f0f0f0;
    }

    .filter-tag.active {
        background: #1877f2;
        color: white;
        border-color: #1877f2;
    }

    .timeline-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 15px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .timeline-progress {
        flex: 1;
        max-width: 300px;
        position: relative;
    }

    .progress-bar {
        height: 6px;
        background: #1877f2;
        border-radius: 3px;
        transition: width 0.3s ease;
    }

    .timeline-progress::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 6px;
        background: #e0e0e0;
        border-radius: 3px;
    }

    .progress-text {
        position: absolute;
        right: 0;
        top: 10px;
        font-size: 12px;
        color: #666;
    }

    .current-event-preview {
        text-align: right;
    }

    .current-event-preview .event-date {
        font-size: 14px;
        color: #666;
        margin-bottom: 5px;
    }

    .current-event-preview .event-title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin-bottom: 5px;
    }

    .current-event-preview .event-episode {
        font-size: 14px;
        color: #1877f2;
    }

    .timeline-track {
        position: relative;
        height: 400px;
        overflow-x: auto;
        overflow-y: hidden;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
    }

    .timeline-line {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 2px;
        background: rgba(255,255,255,0.3);
        transform: translateY(-50%);
    }

    .timeline-events {
        position: relative;
        height: 100%;
        width: 100%;
    }

    .timeline-event {
        position: absolute;
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;
    }

    .timeline-event:hover {
        transform: scale(1.1);
        z-index: 20;
    }

    .timeline-event.active {
        z-index: 30;
    }

    .event-marker {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
        border: 3px solid #1877f2;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    }

    .timeline-event.high-importance .event-marker {
        border-color: #ff6b6b;
        width: 24px;
        height: 24px;
    }

    .timeline-event.medium-importance .event-marker {
        border-color: #ffa726;
        width: 22px;
        height: 22px;
    }

    .timeline-event.active .event-marker {
        animation: active-pulse 2s infinite;
    }

    @keyframes active-pulse {
        0%, 100% { box-shadow: 0 2px 8px rgba(0,0,0,0.2), 0 0 0 0 rgba(24,119,242,0.4); }
        50% { box-shadow: 0 2px 8px rgba(0,0,0,0.2), 0 0 0 15px rgba(24,119,242,0); }
    }

    .event-pulse {
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        border: 2px solid #1877f2;
        border-radius: 50%;
        opacity: 0;
    }

    .event-pulse.active {
        animation: pulse-ring 1s ease-out infinite;
    }

    @keyframes pulse-ring {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(2); }
    }

    .event-icon {
        font-size: 10px;
        position: relative;
        z-index: 2;
    }

    .event-popup {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        min-width: 250px;
        max-width: 300px;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        border: 2px solid #e0e0e0;
    }

    .timeline-event:hover .event-popup,
    .timeline-event.active .event-popup {
        opacity: 1;
        pointer-events: auto;
    }

    .event-header {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
    }

    .event-character-avatar {
        flex-shrink: 0;
    }

    .event-info {
        flex: 1;
    }

    .event-popup .event-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin-bottom: 5px;
    }

    .event-meta {
        display: flex;
        gap: 10px;
        font-size: 12px;
        color: #666;
    }

    .event-description {
        font-size: 14px;
        color: #555;
        margin-bottom: 10px;
        line-height: 1.4;
    }

    .event-tags {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        margin-bottom: 10px;
    }

    .event-tag {
        background: #e3f2fd;
        color: #1565c0;
        padding: 2px 6px;
        border-radius: 8px;
        font-size: 10px;
        font-weight: 500;
    }

    .event-connections {
        font-size: 12px;
        color: #666;
    }

    .connection-char {
        color: #1877f2;
        cursor: pointer;
        text-decoration: underline;
    }

    .connection-char:hover {
        color: #166fe5;
    }

    .timeline-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        background: white;
        border-radius: 8px;
        flex-wrap: wrap;
        gap: 15px;
    }

    .timeline-legend {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
    }

    .legend-marker {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid;
    }

    .legend-marker.high-importance {
        border-color: #ff6b6b;
    }

    .legend-marker.medium-importance {
        border-color: #ffa726;
    }

    .legend-marker.low-importance {
        border-color: #1877f2;
    }

    .timeline-stats {
        display: flex;
        gap: 15px;
        font-size: 14px;
        color: #666;
        flex-wrap: wrap;
    }

    .timeline-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 20px;
    }

    .timeline-modal.show {
        opacity: 1;
    }

    .timeline-modal-content {
        background: white;
        border-radius: 12px;
        width: 95vw;
        height: 85vh;
        max-width: 1200px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .timeline-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #e0e0e0;
        background: #f8f9fa;
    }

    .timeline-modal-header button {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: #666;
        transition: background 0.2s;
    }

    .timeline-modal-header button:hover {
        background: rgba(0,0,0,0.1);
    }

    .timeline-modal-body {
        flex: 1;
        overflow: auto;
        padding: 0;
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .timeline-controls {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
        }
        
        .playback-controls, .view-controls, .filter-controls {
            justify-content: center;
        }
        
        .timeline-header {
            flex-direction: column;
            text-align: center;
            gap: 15px;
        }
        
        .current-event-preview {
            text-align: center;
        }
        
        .timeline-track {
            height: 300px;
        }
        
        .event-popup {
            max-width: 200px;
            font-size: 12px;
        }
        
        .timeline-footer {
            flex-direction: column;
            text-align: center;
        }
    }
`;
document.head.appendChild(timelineStyles);

// Create global instance
window.timeline = new TimelineVisualization();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimelineVisualization;
}
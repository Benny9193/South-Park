/**
 * South Park Facebook Profiles - Quick Character Switcher Overlay
 * Provides instant character switching and search functionality
 */

class CharacterSwitcher {
    constructor() {
        this.characters = [];
        this.isVisible = false;
        this.overlay = null;
        this.searchInput = null;
        this.currentIndex = -1;
        this.init();
    }

    init() {
        this.loadCharacters();
        this.createOverlay();
        this.attachEventListeners();
        this.loadKeyboardShortcuts();
    }

    loadCharacters() {
        // Character database with URLs and metadata
        this.characters = [
            // Main Characters
            { name: 'Stan Marsh', url: 'Characters/Facebook/HTML Profiles/Stan Marsh.html', avatar: 'SM', color: '#2196F3', category: 'Main Characters', description: 'The most normal kid in South Park' },
            { name: 'Kyle Broflovski', url: 'Characters/Facebook/HTML Profiles/Kyle Broflovski.html', avatar: 'KB', color: '#4CAF50', category: 'Main Characters', description: 'Smart, moral, and Jewish' },
            { name: 'Eric Cartman', url: 'Characters/Facebook/HTML Profiles/Eric Cartman.html', avatar: 'EC', color: '#dc3545', category: 'Main Characters', description: 'Scheming, selfish, and manipulative' },
            { name: 'Kenny McCormick', url: 'Characters/Facebook/HTML Profiles/Kenny McCormick.html', avatar: 'KM', color: '#FF9800', category: 'Main Characters', description: 'Poor kid who dies a lot' },
            
            // Students
            { name: 'Jimmy Valmer', url: 'Characters/Facebook/HTML Profiles/Jimmy Valmer.html', avatar: 'JV', color: '#ff6b35', category: 'Students', description: 'Aspiring comedian with a stutter' },
            { name: 'Wendy Testaburger', url: 'Characters/Facebook/HTML Profiles/Wendy Testaburger.html', avatar: 'WT', color: '#9c27b0', category: 'Students', description: 'Student activist and Stan\'s girlfriend' },
            { name: 'Timmy Burch', url: 'Characters/Facebook/HTML Profiles/Timmy Burch.html', avatar: 'TB', color: '#2196f3', category: 'Students', description: 'Jimmy\'s best friend and comedy partner' },
            { name: 'Butters Stotch', url: 'Characters/Facebook/HTML Profiles/butters_stotch_facebook.html', avatar: 'BS', color: '#ffd700', category: 'Students', description: 'Innocent and optimistic' },
            { name: 'Craig Tucker', url: 'Characters/Facebook/HTML Profiles/Craig Tucker.html', avatar: 'CT', color: '#607d8b', category: 'Students', description: 'Apathetic and often flips people off' },
            { name: 'Tweek Tweak', url: 'Characters/Facebook/HTML Profiles/Tweek Tweak.html', avatar: 'TT', color: '#8bc34a', category: 'Students', description: 'Hyperactive coffee addict' },
            { name: 'Clyde Donovan', url: 'Characters/Facebook/HTML Profiles/Clyde Donovan.html', avatar: 'CD', color: '#795548', category: 'Students', description: 'Regular South Park student' },
            { name: 'Token Black', url: 'Characters/Facebook/HTML Profiles/Token Black.html', avatar: 'TB', color: '#3f51b5', category: 'Students', description: 'Wealthy and well-mannered student' },
            
            // Adults
            { name: 'Randy Marsh', url: 'Characters/Facebook/HTML Profiles/Randy Marsh.html', avatar: 'RM', color: '#228b22', category: 'Adults', description: 'Stan\'s embarrassing father' },
            { name: 'Mr. Garrison', url: 'Characters/Facebook/HTML Profiles/mr_garrison_facebook.html', avatar: 'MG', color: '#667eea', category: 'Adults', description: 'Fourth grade teacher with identity issues' },
            { name: 'Mr. Mackey', url: 'Characters/Facebook/HTML Profiles/mr_mackey_facebook.html', avatar: 'MM', color: '#ff5722', category: 'Adults', description: 'School counselor who says "mmkay"' },
            { name: 'Gerald Broflovski', url: 'Characters/Facebook/HTML Profiles/Gerald Broflovski.html', avatar: 'GB', color: '#4caf50', category: 'Adults', description: 'Kyle\'s father and internet troll' },
            { name: 'Sheila Broflovski', url: 'Characters/Facebook/HTML Profiles/Sheila Broflovski.html', avatar: 'SB', color: '#e91e63', category: 'Adults', description: 'Kyle\'s activist mother' },
            { name: 'Chef', url: 'Characters/Facebook/HTML Profiles/Chef.html', avatar: 'CH', color: '#8b4513', category: 'Adults', description: 'School cafeteria cook with advice' },
            
            // Special Pages
            { name: 'News Feed', url: 'south-park-feed.html', avatar: '📰', color: '#1877f2', category: 'Special', description: 'South Park community news feed' },
            { name: 'Relationship Map', url: 'Characters/Facebook/relationship-map.html', avatar: '🗺️', color: '#9c27b0', category: 'Special', description: 'Character relationship network' }
        ];

        // Filter out characters that don't exist yet
        this.characters = this.characters.filter(char => {
            // For now, keep all characters - in production, you'd check if the files exist
            return true;
        });
    }

    createOverlay() {
        // Create main overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'character-switcher-overlay';
        this.overlay.innerHTML = `
            <div class="switcher-container">
                <div class="switcher-header">
                    <h3>Quick Character Switcher</h3>
                    <button class="close-btn" aria-label="Close">&times;</button>
                </div>
                
                <div class="switcher-search">
                    <input type="text" id="switcher-search" placeholder="Search characters..." autocomplete="off">
                    <div class="search-icon">🔍</div>
                </div>
                
                <div class="switcher-categories">
                    <button class="category-btn active" data-category="all">All</button>
                    <button class="category-btn" data-category="Main Characters">Main</button>
                    <button class="category-btn" data-category="Students">Students</button>
                    <button class="category-btn" data-category="Adults">Adults</button>
                    <button class="category-btn" data-category="Special">Special</button>
                </div>
                
                <div class="switcher-results">
                    <div class="characters-list" id="switcher-characters-list"></div>
                    <div class="switcher-footer">
                        <div class="keyboard-hint">
                            <span>💡 Tips:</span>
                            <span>Use ↑↓ arrows to navigate • Enter to select • Esc to close</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add CSS styles
        const styles = document.createElement('style');
        styles.textContent = `
            .character-switcher-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(8px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .character-switcher-overlay.visible {
                opacity: 1;
                visibility: visible;
            }

            .switcher-container {
                background: white;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                width: 90%;
                max-width: 600px;
                max-height: 80vh;
                overflow: hidden;
                transform: translateY(-30px) scale(0.95);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .character-switcher-overlay.visible .switcher-container {
                transform: translateY(0) scale(1);
            }

            .switcher-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 24px 16px;
                border-bottom: 1px solid #e4e6ea;
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            }

            .switcher-header h3 {
                margin: 0;
                font-size: 20px;
                font-weight: 700;
                color: #1c1e21;
            }

            .close-btn {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #65676b;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }

            .close-btn:hover {
                background: rgba(0, 0, 0, 0.05);
                color: #1c1e21;
            }

            .switcher-search {
                position: relative;
                padding: 20px 24px;
            }

            .switcher-search input {
                width: 100%;
                padding: 12px 16px 12px 44px;
                border: 2px solid #e4e6ea;
                border-radius: 24px;
                font-size: 16px;
                outline: none;
                transition: all 0.2s;
            }

            .switcher-search input:focus {
                border-color: #1877f2;
                box-shadow: 0 0 0 3px rgba(24, 119, 242, 0.1);
            }

            .search-icon {
                position: absolute;
                left: 40px;
                top: 50%;
                transform: translateY(-50%);
                color: #65676b;
                font-size: 18px;
            }

            .switcher-categories {
                display: flex;
                gap: 8px;
                padding: 0 24px 16px;
                flex-wrap: wrap;
            }

            .category-btn {
                padding: 6px 12px;
                border: 1px solid #e4e6ea;
                background: white;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
                color: #65676b;
            }

            .category-btn.active,
            .category-btn:hover {
                background: #1877f2;
                color: white;
                border-color: #1877f2;
            }

            .switcher-results {
                max-height: 400px;
                overflow-y: auto;
                border-top: 1px solid #e4e6ea;
            }

            .characters-list {
                padding: 8px 0;
            }

            .character-item {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 12px 24px;
                cursor: pointer;
                transition: all 0.2s;
                border: none;
                background: none;
                width: 100%;
                text-align: left;
            }

            .character-item:hover,
            .character-item.active {
                background: rgba(24, 119, 242, 0.08);
                border-left: 4px solid #1877f2;
            }

            .character-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 14px;
                flex-shrink: 0;
            }

            .character-info {
                flex: 1;
                min-width: 0;
            }

            .character-name {
                font-weight: 600;
                color: #1c1e21;
                margin-bottom: 2px;
            }

            .character-description {
                font-size: 13px;
                color: #65676b;
                opacity: 0.8;
            }

            .character-category {
                font-size: 11px;
                color: #1877f2;
                background: rgba(24, 119, 242, 0.1);
                padding: 2px 6px;
                border-radius: 4px;
                font-weight: 500;
            }

            .switcher-footer {
                padding: 16px 24px;
                background: #f8f9fa;
                border-top: 1px solid #e4e6ea;
            }

            .keyboard-hint {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 12px;
                color: #65676b;
            }

            .keyboard-hint span:first-child {
                font-weight: 600;
            }

            .no-results {
                padding: 40px 24px;
                text-align: center;
                color: #65676b;
            }

            @media (max-width: 768px) {
                .switcher-container {
                    width: 95%;
                    margin: 20px;
                }
                
                .switcher-search {
                    padding: 16px 20px;
                }
                
                .switcher-categories {
                    padding: 0 20px 12px;
                }
                
                .character-item {
                    padding: 12px 20px;
                }
                
                .switcher-footer {
                    padding: 12px 20px;
                }
            }
        `;

        document.head.appendChild(styles);
        document.body.appendChild(this.overlay);

        this.searchInput = document.getElementById('switcher-search');
        this.renderCharacters();
    }

    renderCharacters(filter = '', category = 'all') {
        const container = document.getElementById('switcher-characters-list');
        const filtered = this.characters.filter(char => {
            const matchesSearch = char.name.toLowerCase().includes(filter.toLowerCase()) ||
                                char.description.toLowerCase().includes(filter.toLowerCase());
            const matchesCategory = category === 'all' || char.category === category;
            return matchesSearch && matchesCategory;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <h4>No characters found</h4>
                    <p>Try adjusting your search or category filter</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map((char, index) => `
            <button class="character-item" data-url="${char.url}" data-index="${index}">
                <div class="character-avatar" style="background-color: ${char.color}">
                    ${char.avatar}
                </div>
                <div class="character-info">
                    <div class="character-name">${char.name}</div>
                    <div class="character-description">${char.description}</div>
                </div>
                <div class="character-category">${char.category}</div>
            </button>
        `).join('');

        this.filteredCharacters = filtered;
        this.currentIndex = -1;
    }

    attachEventListeners() {
        // Close overlay
        this.overlay.querySelector('.close-btn').addEventListener('click', () => this.hide());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.hide();
        });

        // Search functionality
        this.searchInput.addEventListener('input', (e) => {
            const category = document.querySelector('.category-btn.active').dataset.category;
            this.renderCharacters(e.target.value, category);
        });

        // Category filtering
        this.overlay.addEventListener('click', (e) => {
            if (e.target.matches('.category-btn')) {
                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                this.renderCharacters(this.searchInput.value, e.target.dataset.category);
            }
        });

        // Character selection
        this.overlay.addEventListener('click', (e) => {
            if (e.target.matches('.character-item') || e.target.closest('.character-item')) {
                const item = e.target.closest('.character-item');
                this.navigateToCharacter(item.dataset.url);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isVisible) return;

            switch (e.key) {
                case 'Escape':
                    e.preventDefault();
                    this.hide();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.navigateList(1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.navigateList(-1);
                    break;
                case 'Enter':
                    e.preventDefault();
                    this.selectCurrent();
                    break;
            }
        });
    }

    loadKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Cmd/Ctrl + K to open switcher
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    navigateList(direction) {
        const items = this.overlay.querySelectorAll('.character-item');
        if (items.length === 0) return;

        // Remove current active
        if (this.currentIndex >= 0) {
            items[this.currentIndex]?.classList.remove('active');
        }

        // Calculate new index
        this.currentIndex += direction;
        if (this.currentIndex >= items.length) this.currentIndex = 0;
        if (this.currentIndex < 0) this.currentIndex = items.length - 1;

        // Add active to new item
        items[this.currentIndex].classList.add('active');
        items[this.currentIndex].scrollIntoView({ block: 'nearest' });
    }

    selectCurrent() {
        const items = this.overlay.querySelectorAll('.character-item');
        if (this.currentIndex >= 0 && items[this.currentIndex]) {
            this.navigateToCharacter(items[this.currentIndex].dataset.url);
        }
    }

    navigateToCharacter(url) {
        this.hide();
        
        // Add navigation animation
        document.body.style.transition = 'opacity 0.2s ease';
        document.body.style.opacity = '0.8';
        
        setTimeout(() => {
            window.location.href = url;
        }, 100);
    }

    show() {
        this.isVisible = true;
        this.overlay.classList.add('visible');
        setTimeout(() => this.searchInput.focus(), 300);
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.isVisible = false;
        this.overlay.classList.remove('visible');
        document.body.style.overflow = '';
        this.searchInput.value = '';
        this.currentIndex = -1;
        
        // Reset to show all characters
        const allBtn = this.overlay.querySelector('.category-btn[data-category="all"]');
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        allBtn.classList.add('active');
        this.renderCharacters();
    }

    toggle() {
        this.isVisible ? this.hide() : this.show();
    }
}

// Initialize the character switcher
document.addEventListener('DOMContentLoaded', () => {
    window.characterSwitcher = new CharacterSwitcher();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CharacterSwitcher;
}
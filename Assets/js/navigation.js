/**
 * South Park Facebook Profiles - Navigation and Shared Functionality
 */

// Character search and filtering functionality
class CharacterSearch {
    constructor() {
        this.currentFilter = 'all';
        this.bindEvents();
    }

    bindEvents() {
        const searchInput = document.getElementById('characterSearch');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterCharacters());
        }
    }

    filterCharacters() {
        const searchTerm = document.getElementById('characterSearch').value.toLowerCase();
        const cards = document.querySelectorAll('.character-card');
        const searchResults = document.getElementById('searchResults');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const name = card.dataset.name.toLowerCase();
            const description = card.dataset.description.toLowerCase();
            const category = card.dataset.category;
            
            const matchesSearch = name.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = this.currentFilter === 'all' || category.includes(this.currentFilter);
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show search results info
        if (searchResults) {
            if (searchTerm) {
                searchResults.style.display = 'block';
                searchResults.textContent = `Found ${visibleCount} character${visibleCount !== 1 ? 's' : ''} matching "${searchTerm}"`;
            } else {
                searchResults.style.display = 'none';
            }
        }
        
        this.showNoResultsMessage(visibleCount, searchTerm);
    }

    filterByCategory(category) {
        this.currentFilter = category;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Clear search and rerun filter
        const searchInput = document.getElementById('characterSearch');
        if (searchInput) {
            searchInput.value = '';
        }
        this.filterCharacters();
    }

    showNoResultsMessage(visibleCount, searchTerm) {
        let existingMessage = document.querySelector('.no-results');
        
        if (visibleCount === 0) {
            if (!existingMessage) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.innerHTML = `
                    <h3>No characters found</h3>
                    <p>${searchTerm ? `Try different search terms or ` : ''}check out different categories above.</p>
                    <button class="filter-btn" onclick="characterSearch.resetFilters()" style="margin-top: 15px;">Show All Characters</button>
                `;
                const grid = document.querySelector('.characters-grid');
                if (grid && grid.parentNode) {
                    grid.parentNode.insertBefore(message, grid.nextSibling);
                }
            }
        } else if (existingMessage) {
            existingMessage.remove();
        }
    }

    resetFilters() {
        this.currentFilter = 'all';
        const searchInput = document.getElementById('characterSearch');
        if (searchInput) {
            searchInput.value = '';
        }
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        const firstFilterBtn = document.querySelector('.filter-btn');
        if (firstFilterBtn) {
            firstFilterBtn.classList.add('active');
        }
        this.filterCharacters();
    }

    randomCharacter() {
        const cards = Array.from(document.querySelectorAll('.character-card')).filter(card => 
            card.style.display !== 'none'
        );
        if (cards.length > 0) {
            const randomCard = cards[Math.floor(Math.random() * cards.length)];
            window.location.href = randomCard.href;
        }
    }
}

// Profile navigation functionality
class ProfileNavigation {
    constructor() {
        this.initializeTabs();
        this.initializeBackNavigation();
    }

    initializeTabs() {
        const tabs = document.querySelectorAll('.profile-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e));
        });
    }

    switchTab(event) {
        const clickedTab = event.target;
        const tabName = clickedTab.textContent.toLowerCase();
        
        // Update active tab
        document.querySelectorAll('.profile-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        clickedTab.classList.add('active');
        
        // Here you could implement actual tab switching logic
        // For now, we'll just handle the visual state
        console.log(`Switched to ${tabName} tab`);
    }

    initializeBackNavigation() {
        // Add back to directory button if we're on a character page
        const isCharacterPage = window.location.pathname.includes('Characters/Facebook/HTML Profiles/');
        if (isCharacterPage) {
            this.addBackButton();
        }
    }

    addBackButton() {
        const header = document.querySelector('.header');
        if (header) {
            const backBtn = document.createElement('div');
            backBtn.className = 'nav-icon';
            backBtn.innerHTML = '←';
            backBtn.style.fontSize = '20px';
            backBtn.title = 'Back to Character Directory';
            backBtn.addEventListener('click', () => {
                window.location.href = '../../../facebook.html';
            });
            
            const navIcons = header.querySelector('.nav-icons');
            if (navIcons) {
                navIcons.insertBefore(backBtn, navIcons.firstChild);
            }
        }
    }
}

// Utility functions
const SouthParkUtils = {
    // Format timestamps relative to now
    formatTimeAgo(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diffMs = now - time;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minutes ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        if (diffDays < 7) return `${diffDays} days ago`;
        return time.toLocaleDateString();
    },

    // Add character-specific animations
    addCharacterAnimations(characterName) {
        const character = characterName.toLowerCase();
        const body = document.body;
        
        switch (character) {
            case 'cartman':
                body.classList.add('cartman-theme');
                break;
            case 'kyle':
                body.classList.add('kyle-theme');
                break;
            case 'stan':
                body.classList.add('stan-theme');
                break;
            case 'kenny':
                body.classList.add('kenny-theme');
                break;
            case 'jimmy':
                body.classList.add('jimmy-theme');
                break;
            default:
                break;
        }
    },

    // Simulate Facebook-like interactions
    simulateInteraction(element, type) {
        element.classList.add('interacted');
        
        const feedback = document.createElement('div');
        feedback.className = 'interaction-feedback';
        feedback.textContent = type === 'like' ? '👍' : type === 'comment' ? '💬' : '↗️';
        
        element.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
            element.classList.remove('interacted');
        }, 1000);
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize search functionality
    window.characterSearch = new CharacterSearch();
    
    // Initialize profile navigation
    window.profileNavigation = new ProfileNavigation();
    
    // Add interaction handlers for post actions
    document.querySelectorAll('.post-action').forEach(action => {
        action.addEventListener('click', (e) => {
            e.preventDefault();
            const actionType = action.textContent.toLowerCase();
            SouthParkUtils.simulateInteraction(action, actionType);
        });
    });
    
    // Add hover effects for character cards
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-2px)';
        });
    });
});

// Global functions for backwards compatibility
function filterCharacters() {
    if (window.characterSearch) {
        window.characterSearch.filterCharacters();
    }
}

function filterByCategory(category) {
    if (window.characterSearch) {
        window.characterSearch.filterByCategory(category);
    }
}

function resetFilters() {
    if (window.characterSearch) {
        window.characterSearch.resetFilters();
    }
}

function randomCharacter() {
    if (window.characterSearch) {
        window.characterSearch.randomCharacter();
    }
}
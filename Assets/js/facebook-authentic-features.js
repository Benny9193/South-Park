/**
 * Facebook Authentic Features for South Park Character Profiles
 * Implements real Facebook-like interactions and UI elements
 */

class FacebookAuthenticFeatures {
    constructor() {
        this.reactionEmojis = ['👍', '❤️', '😂', '😮', '😢', '😡'];
        this.reactionNames = ['Like', 'Love', 'Haha', 'Wow', 'Sad', 'Angry'];
        this.init();
    }

    init() {
        this.enhancePostReactions();
        this.addCommentSections();
        this.implementSeeMore();
        this.addHoverEffects();
        this.addDropdownMenus();
        this.addPeopleYouMayKnow();
        this.addSponsoredPosts();
        this.addStoryHighlights();
        this.addNotificationBadges();
        this.addMessengerHints();
        this.addMutualFriends();
        this.addLocationCheckins();
    }

    enhancePostReactions() {
        const posts = document.querySelectorAll('.post');
        posts.forEach(post => {
            const actionsBar = post.querySelector('.post-actions');
            if (actionsBar) {
                // Replace simple Like button with reaction system
                const likeButton = actionsBar.querySelector('.post-action');
                if (likeButton && likeButton.textContent.includes('Like')) {
                    likeButton.innerHTML = `
                        <div class="reaction-container">
                            <div class="reaction-button" data-reaction="like">
                                <span class="reaction-icon">👍</span>
                                <span class="reaction-text">Like</span>
                            </div>
                            <div class="reaction-picker" style="display: none;">
                                ${this.reactionEmojis.map((emoji, index) =>
                                    `<div class="reaction-option" data-reaction="${this.reactionNames[index].toLowerCase()}" title="${this.reactionNames[index]}">
                                        ${emoji}
                                    </div>`
                                ).join('')}
                            </div>
                        </div>
                    `;

                    // Add reaction picker functionality
                    const reactionContainer = likeButton.querySelector('.reaction-container');
                    const reactionButton = reactionContainer.querySelector('.reaction-button');
                    const reactionPicker = reactionContainer.querySelector('.reaction-picker');

                    let hoverTimeout;

                    reactionButton.addEventListener('mouseenter', () => {
                        clearTimeout(hoverTimeout);
                        reactionPicker.style.display = 'flex';
                    });

                    reactionContainer.addEventListener('mouseleave', () => {
                        hoverTimeout = setTimeout(() => {
                            reactionPicker.style.display = 'none';
                        }, 300);
                    });

                    // Handle reaction selection
                    reactionPicker.querySelectorAll('.reaction-option').forEach(option => {
                        option.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const reaction = option.getAttribute('data-reaction');
                            const emoji = option.textContent;
                            reactionButton.innerHTML = `
                                <span class="reaction-icon">${emoji}</span>
                                <span class="reaction-text">${reaction.charAt(0).toUpperCase() + reaction.slice(1)}</span>
                            `;
                            reactionButton.classList.add('reacted');
                            reactionPicker.style.display = 'none';
                        });
                    });
                }
            }
        });
    }

    addCommentSections() {
        const posts = document.querySelectorAll('.post');
        posts.forEach((post, index) => {
            const actionsBar = post.querySelector('.post-actions');
            if (actionsBar) {
                const commentSection = document.createElement('div');
                commentSection.className = 'comment-section';
                commentSection.innerHTML = `
                    <div class="comment-composer">
                        <div class="comment-avatar"></div>
                        <input type="text" placeholder="Write a comment..." class="comment-input">
                        <button class="comment-submit">Post</button>
                    </div>
                    <div class="comments-list">
                        ${this.generateSampleComments(index)}
                    </div>
                `;
                post.appendChild(commentSection);

                // Add comment functionality
                const commentInput = commentSection.querySelector('.comment-input');
                const submitButton = commentSection.querySelector('.comment-submit');

                commentInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && commentInput.value.trim()) {
                        this.addComment(commentSection, commentInput.value);
                        commentInput.value = '';
                    }
                });

                submitButton.addEventListener('click', () => {
                    if (commentInput.value.trim()) {
                        this.addComment(commentSection, commentInput.value);
                        commentInput.value = '';
                    }
                });
            }
        });
    }

    generateSampleComments(postIndex) {
        const sampleComments = [
            { author: 'Kyle Broflovski', text: 'Dude, that\'s so messed up!', time: '2h', avatar: 'KB' },
            { author: 'Kenny McCormick', text: 'Mmmph mmph mmph!', time: '1h', avatar: 'KM' },
            { author: 'Eric Cartman', text: 'Whatever, this is totally lame compared to my business ventures.', time: '45m', avatar: 'EC' }
        ];

        if (postIndex === 0) return ''; // First post has no comments initially

        return sampleComments.slice(0, Math.floor(Math.random() * 3) + 1).map(comment => `
            <div class="comment">
                <div class="comment-avatar">${comment.avatar}</div>
                <div class="comment-content">
                    <div class="comment-bubble">
                        <strong>${comment.author}</strong>
                        <p>${comment.text}</p>
                    </div>
                    <div class="comment-actions">
                        <span class="comment-time">${comment.time}</span>
                        <span class="comment-action">Like</span>
                        <span class="comment-action">Reply</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    addComment(commentSection, text) {
        const commentsList = commentSection.querySelector('.comments-list');
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = `
            <div class="comment-avatar">You</div>
            <div class="comment-content">
                <div class="comment-bubble">
                    <strong>You</strong>
                    <p>${text}</p>
                </div>
                <div class="comment-actions">
                    <span class="comment-time">Just now</span>
                    <span class="comment-action">Like</span>
                    <span class="comment-action">Reply</span>
                </div>
            </div>
        `;
        commentsList.appendChild(newComment);
    }

    implementSeeMore() {
        const posts = document.querySelectorAll('.post-content');
        posts.forEach(content => {
            const text = content.textContent;
            if (text.length > 200) {
                const shortText = text.substring(0, 200);
                const fullText = text;

                content.innerHTML = `
                    <span class="post-text-short">${shortText}...</span>
                    <span class="post-text-full" style="display: none;">${fullText}</span>
                    <button class="see-more-btn">See more</button>
                `;

                const seeMoreBtn = content.querySelector('.see-more-btn');
                const shortTextSpan = content.querySelector('.post-text-short');
                const fullTextSpan = content.querySelector('.post-text-full');

                seeMoreBtn.addEventListener('click', () => {
                    if (fullTextSpan.style.display === 'none') {
                        shortTextSpan.style.display = 'none';
                        fullTextSpan.style.display = 'block';
                        seeMoreBtn.textContent = 'See less';
                    } else {
                        shortTextSpan.style.display = 'block';
                        fullTextSpan.style.display = 'none';
                        seeMoreBtn.textContent = 'See more';
                    }
                });
            }
        });
    }

    addPeopleYouMayKnow() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            const pymkSection = document.createElement('div');
            pymkSection.className = 'info-section people-you-may-know';
            pymkSection.innerHTML = `
                <h3>People You May Know</h3>
                <div class="pymk-list">
                    <div class="pymk-suggestion">
                        <div class="pymk-avatar">TW</div>
                        <div class="pymk-info">
                            <div class="pymk-name">Tweek Tweak</div>
                            <div class="pymk-mutual">3 mutual friends</div>
                            <button class="pymk-add-btn">Add Friend</button>
                        </div>
                    </div>
                    <div class="pymk-suggestion">
                        <div class="pymk-avatar">CT</div>
                        <div class="pymk-info">
                            <div class="pymk-name">Craig Tucker</div>
                            <div class="pymk-mutual">2 mutual friends</div>
                            <button class="pymk-add-btn">Add Friend</button>
                        </div>
                    </div>
                </div>
            `;
            sidebar.appendChild(pymkSection);
        }
    }

    addSponsoredPosts() {
        const mainContent = document.querySelector('.main-content');
        if (mainContent && document.title.includes('Cartman')) {
            const sponsoredPost = document.createElement('div');
            sponsoredPost.className = 'post sponsored-post';
            sponsoredPost.innerHTML = `
                <div class="sponsored-label">Sponsored</div>
                <div class="post-header">
                    <div class="post-avatar" style="background-image: url('../../../Assets/images/eric_cartman.png'); background-size: cover;"></div>
                    <div class="post-info">
                        <h4>Cartman Enterprises</h4>
                        <div class="post-time">Promoted • 💰 Business</div>
                    </div>
                </div>
                <div class="post-content">
                    🚀 CARTMAN'S PREMIUM AIR™ is NOW AVAILABLE! 🚀

                    Don't breathe that nasty free air anymore! Get premium, artisanal air bottled fresh from my backyard for only $5/bottle!

                    ✨ Benefits include:
                    • 21% Oxygen (that's science!)
                    • Cartman-approved quality
                    • Helps you think better (probably)
                    • Makes you more awesome like me

                    Limited time offer! Buy 10 bottles, get 1 FREE!*
                    *Free bottle may contain regular air
                </div>
                <div class="sponsored-cta">
                    <button class="cta-button">Buy Now - $5</button>
                    <button class="cta-button secondary">Learn More</button>
                </div>
            `;

            // Insert after the post composer
            const postComposer = mainContent.querySelector('.post-composer');
            if (postComposer) {
                postComposer.insertAdjacentElement('afterend', sponsoredPost);
            }
        }
    }

    addStoryHighlights() {
        const profileHeader = document.querySelector('.profile-header');
        if (profileHeader) {
            const storiesSection = document.createElement('div');
            storiesSection.className = 'stories-section';
            storiesSection.innerHTML = `
                <div class="stories-container">
                    <div class="story-highlight" data-story="adventures">
                        <div class="story-ring">
                            <div class="story-avatar"></div>
                        </div>
                        <span class="story-label">Adventures</span>
                    </div>
                    <div class="story-highlight" data-story="school">
                        <div class="story-ring">
                            <div class="story-avatar">🏫</div>
                        </div>
                        <span class="story-label">School</span>
                    </div>
                    <div class="story-highlight" data-story="friends">
                        <div class="story-ring">
                            <div class="story-avatar">👥</div>
                        </div>
                        <span class="story-label">Friends</span>
                    </div>
                </div>
            `;

            const profileNavBar = profileHeader.querySelector('.profile-nav-bar');
            profileNavBar.insertAdjacentElement('beforebegin', storiesSection);
        }
    }

    addNotificationBadges() {
        const navIcons = document.querySelectorAll('.nav-icon');
        navIcons.forEach((icon, index) => {
            if (index === 5) { // Notifications icon
                const badge = document.createElement('div');
                badge.className = 'notification-badge';
                badge.textContent = Math.floor(Math.random() * 9) + 1;
                icon.style.position = 'relative';
                icon.appendChild(badge);
            } else if (index === 6) { // Messages icon
                const badge = document.createElement('div');
                badge.className = 'message-badge';
                badge.textContent = Math.floor(Math.random() * 3) + 1;
                icon.style.position = 'relative';
                icon.appendChild(badge);
            }
        });
    }

    addMessengerHints() {
        // Add messenger chat heads floating
        const messengerFloat = document.createElement('div');
        messengerFloat.className = 'messenger-float';
        messengerFloat.innerHTML = `
            <div class="chat-head" title="Kyle Broflovski">
                <div class="chat-avatar">KB</div>
                <div class="online-indicator"></div>
            </div>
        `;
        document.body.appendChild(messengerFloat);
    }

    addMutualFriends() {
        const friendCards = document.querySelectorAll('.friend-card');
        friendCards.forEach(card => {
            const mutualInfo = document.createElement('div');
            mutualInfo.className = 'mutual-friends-info';
            mutualInfo.textContent = `${Math.floor(Math.random() * 5) + 1} mutual friends`;
            card.appendChild(mutualInfo);
        });
    }

    addLocationCheckins() {
        const posts = document.querySelectorAll('.post');
        const locations = [
            'South Park Elementary',
            'Stark\'s Pond',
            'City Wok',
            'Tom\'s Rhinoplasty',
            'The Community Center'
        ];

        posts.forEach((post, index) => {
            if (Math.random() > 0.5) { // 50% chance of location
                const postInfo = post.querySelector('.post-info');
                const timeElement = postInfo.querySelector('.post-time');
                const location = locations[Math.floor(Math.random() * locations.length)];

                timeElement.innerHTML += ` • 📍 <span class="location-checkin">${location}</span>`;
            }
        });
    }

    addHoverEffects() {
        // Add smooth hover effects to all interactive elements
        const interactiveElements = document.querySelectorAll('.post-action, .btn, .nav-icon, .friend-card');
        interactiveElements.forEach(element => {
            element.style.transition = 'all 0.2s ease';

            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-1px)';
                element.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
                element.style.boxShadow = 'none';
            });
        });
    }

    addDropdownMenus() {
        const posts = document.querySelectorAll('.post');
        posts.forEach(post => {
            const postHeader = post.querySelector('.post-header');
            if (postHeader) {
                const dropdownButton = document.createElement('div');
                dropdownButton.className = 'post-dropdown-btn';
                dropdownButton.innerHTML = '⋯';
                dropdownButton.style.marginLeft = 'auto';
                dropdownButton.style.cursor = 'pointer';
                dropdownButton.style.padding = '8px';
                dropdownButton.style.borderRadius = '50%';
                dropdownButton.style.transition = 'background 0.2s';

                const dropdown = document.createElement('div');
                dropdown.className = 'post-dropdown';
                dropdown.style.display = 'none';
                dropdown.innerHTML = `
                    <div class="dropdown-item">✏️ Edit post</div>
                    <div class="dropdown-item">💾 Save post</div>
                    <div class="dropdown-item">🔗 Copy link</div>
                    <div class="dropdown-item">🚫 Hide post</div>
                    <div class="dropdown-item">⚠️ Report post</div>
                `;

                postHeader.appendChild(dropdownButton);
                postHeader.appendChild(dropdown);

                dropdownButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
                });

                document.addEventListener('click', () => {
                    dropdown.style.display = 'none';
                });
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FacebookAuthenticFeatures();
});
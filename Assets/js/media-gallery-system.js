/**
 * South Park Facebook Profiles - Media Gallery System
 * Photo galleries, video collections, and media management for character profiles
 */

class MediaGallerySystem {
    constructor() {
        this.galleries = new Map();
        this.mediaItems = new Map();
        this.albumTypes = new Map();
        this.currentViewers = new Map();
        this.mediaId = 0;
        this.initializeAlbumTypes();
        this.initializeCharacterGalleries();
        this.initializeMediaItems();
    }

    initializeAlbumTypes() {
        this.albumTypes.set('memories', {
            name: 'Memories',
            icon: '💭',
            description: 'Special moments and throwback photos',
            style: 'nostalgic'
        });

        this.albumTypes.set('schemes', {
            name: 'Business Ventures',
            icon: '💼',
            description: 'Photos of various business schemes and plans',
            style: 'business'
        });

        this.albumTypes.set('adventures', {
            name: 'Adventures',
            icon: '🎮',
            description: 'Epic South Park adventures and quests',
            style: 'adventure'
        });

        this.albumTypes.set('school', {
            name: 'School Life',
            icon: '🏫',
            description: 'Photos from South Park Elementary',
            style: 'academic'
        });

        this.albumTypes.set('family', {
            name: 'Family',
            icon: '👨‍👩‍👧‍👦',
            description: 'Family photos and gatherings',
            style: 'family'
        });

        this.albumTypes.set('friends', {
            name: 'Friends',
            icon: '👫',
            description: 'Hanging out with the gang',
            style: 'friendship'
        });

        this.albumTypes.set('hobbies', {
            name: 'Hobbies & Interests',
            icon: '🎨',
            description: 'Personal interests and activities',
            style: 'personal'
        });

        this.albumTypes.set('fails', {
            name: 'Epic Fails',
            icon: '💥',
            description: 'Things that didn\'t go as planned',
            style: 'comedy'
        });
    }

    initializeCharacterGalleries() {
        // Cartman's Gallery
        this.galleries.set('cartman', {
            character: 'cartman',
            totalPhotos: 47,
            totalVideos: 12,
            albums: [
                {
                    type: 'schemes',
                    title: 'Cartman Enterprises™ Portfolio',
                    itemCount: 15,
                    coverPhoto: 'cartman_ceo.jpg',
                    description: 'Professional documentation of my various successful business ventures'
                },
                {
                    type: 'memories',
                    title: 'Moments of Greatness',
                    itemCount: 12,
                    coverPhoto: 'cartman_victory.jpg',
                    description: 'Capturing my most triumphant moments'
                },
                {
                    type: 'fails',
                    title: 'Temporary Setbacks',
                    itemCount: 8,
                    coverPhoto: 'cartman_fail.jpg',
                    description: 'Learning experiences that made me stronger (not my fault!)'
                },
                {
                    type: 'friends',
                    title: 'My Loyal Subjects',
                    itemCount: 12,
                    coverPhoto: 'cartman_friends.jpg',
                    description: 'The people who recognize my natural leadership'
                }
            ]
        });

        // Kyle's Gallery
        this.galleries.set('kyle', {
            character: 'kyle',
            totalPhotos: 34,
            totalVideos: 8,
            albums: [
                {
                    type: 'school',
                    title: 'Academic Achievements',
                    itemCount: 18,
                    coverPhoto: 'kyle_studying.jpg',
                    description: 'Education is the foundation of a better society'
                },
                {
                    type: 'family',
                    title: 'Broflovski Family',
                    itemCount: 10,
                    coverPhoto: 'kyle_family.jpg',
                    description: 'Family values and traditions'
                },
                {
                    type: 'adventures',
                    title: 'Standing Up for What\'s Right',
                    itemCount: 6,
                    coverPhoto: 'kyle_protest.jpg',
                    description: 'Fighting for justice and moral causes'
                }
            ]
        });

        // Stan's Gallery  
        this.galleries.set('stan', {
            character: 'stan',
            totalPhotos: 29,
            totalVideos: 6,
            albums: [
                {
                    type: 'friends',
                    title: 'The Gang',
                    itemCount: 15,
                    coverPhoto: 'main_four.jpg',
                    description: 'Just hanging out with the guys'
                },
                {
                    type: 'hobbies',
                    title: 'Guitar & Music',
                    itemCount: 8,
                    coverPhoto: 'stan_guitar.jpg',
                    description: 'My band Moop and other musical adventures'
                },
                {
                    type: 'family',
                    title: 'Marsh Family Chaos',
                    itemCount: 6,
                    coverPhoto: 'marsh_family.jpg',
                    description: 'Living with Dad\'s latest obsession'
                }
            ]
        });

        // Kenny's Gallery
        this.galleries.set('kenny', {
            character: 'kenny',
            totalPhotos: 23,
            totalVideos: 15,
            albums: [
                {
                    type: 'memories',
                    title: 'Lives Well Lived',
                    itemCount: 12,
                    coverPhoto: 'kenny_lives.jpg',
                    description: 'Mmmph mph mmmph! (Every life is an adventure!)'
                },
                {
                    type: 'adventures',
                    title: 'Mysterion Chronicles',
                    itemCount: 8,
                    coverPhoto: 'mysterion.jpg',
                    description: 'Mmmph mmmph mph! (Fighting for justice in the darkness!)'
                },
                {
                    type: 'fails',
                    title: 'Occupational Hazards',
                    itemCount: 3,
                    coverPhoto: 'kenny_death.jpg',
                    description: 'Mph mmmph! (Death is just part of life!)'
                }
            ]
        });

        // Butters' Gallery
        this.galleries.set('butters', {
            character: 'butters',
            totalPhotos: 31,
            totalVideos: 4,
            albums: [
                {
                    type: 'memories',
                    title: 'Happy Moments',
                    itemCount: 20,
                    coverPhoto: 'butters_happy.jpg',
                    description: 'Oh hamburgers! Life is so wonderful!'
                },
                {
                    type: 'family',
                    title: 'Stotch Family Time',
                    itemCount: 7,
                    coverPhoto: 'butters_family.jpg',
                    description: 'Time with Mom and Dad (when I\'m not grounded)'
                },
                {
                    type: 'fails',
                    title: 'Learning Experiences',
                    itemCount: 4,
                    coverPhoto: 'butters_grounded.jpg',
                    description: 'Aw jeez, sometimes things don\'t go as planned'
                }
            ]
        });

        // Randy's Gallery
        this.galleries.set('randy', {
            character: 'randy',
            totalPhotos: 52,
            totalVideos: 18,
            albums: [
                {
                    type: 'schemes',
                    title: 'Tegridy Farms Portfolio',
                    itemCount: 25,
                    coverPhoto: 'tegridy_farms.jpg',
                    description: 'This is what real tegridy looks like!'
                },
                {
                    type: 'hobbies',
                    title: 'Current Obsessions',
                    itemCount: 15,
                    coverPhoto: 'randy_obsession.jpg',
                    description: 'Whatever I\'m passionate about this month'
                },
                {
                    type: 'family',
                    title: 'Marsh Family Adventures',
                    itemCount: 12,
                    coverPhoto: 'randy_family.jpg',
                    description: 'Family time and life lessons'
                }
            ]
        });

        // Add more characters...
        this.galleries.set('tweek', {
            character: 'tweek',
            totalPhotos: 18,
            totalVideos: 3,
            albums: [
                {
                    type: 'hobbies',
                    title: 'Coffee & Anxiety',
                    itemCount: 10,
                    coverPhoto: 'tweek_coffee.jpg',
                    description: 'AAHHH! Too much pressure!'
                },
                {
                    type: 'friends',
                    title: 'Craig & Me',
                    itemCount: 8,
                    coverPhoto: 'craig_tweek.jpg',
                    description: 'He helps me stay calm... sort of'
                }
            ]
        });

        this.galleries.set('craig', {
            character: 'craig',
            totalPhotos: 14,
            totalVideos: 2,
            albums: [
                {
                    type: 'hobbies',
                    title: 'Guinea Pig Care',
                    itemCount: 8,
                    coverPhoto: 'craig_guinea_pig.jpg',
                    description: 'Whatever, I guess they\'re pretty cool'
                },
                {
                    type: 'friends',
                    title: 'Tweek & Others',
                    itemCount: 6,
                    coverPhoto: 'craig_friends.jpg',
                    description: 'I don\'t care, but they\'re okay I guess'
                }
            ]
        });
    }

    initializeMediaItems() {
        // Sample media items for demonstrations
        this.addMediaItem('cartman', {
            type: 'photo',
            filename: 'cartman_ceo.jpg',
            title: 'CEO of Cartman Enterprises',
            description: 'Professional headshot for my business empire',
            album: 'schemes',
            tags: ['business', 'professional', 'ceo', 'success'],
            likes: 15,
            comments: [
                { author: 'kyle', text: 'This is so fake, Cartman!' },
                { author: 'stan', text: 'When did you take this?' },
                { author: 'butters', text: 'Wow Eric, you look so professional!' }
            ],
            uploadDate: '2024-01-10',
            location: 'Cartman Enterprises HQ (my room)'
        });

        this.addMediaItem('cartman', {
            type: 'video',
            filename: 'cartman_scheme.mp4',
            title: 'Revolutionary Business Plan Presentation',
            description: 'Explaining my latest get-rich-quick scheme to potential investors',
            album: 'schemes',
            duration: '3:47',
            tags: ['business', 'presentation', 'investment', 'genius'],
            likes: 23,
            views: 127,
            comments: [
                { author: 'kyle', text: 'This will never work!' },
                { author: 'token', text: 'The math doesn\'t add up, Cartman' }
            ],
            uploadDate: '2024-01-15'
        });

        this.addMediaItem('kyle', {
            type: 'photo',
            filename: 'kyle_studying.jpg',
            title: 'Late Night Study Session',
            description: 'Preparing for tomorrow\'s history test on civil rights',
            album: 'school',
            tags: ['education', 'studying', 'academic', 'dedication'],
            likes: 12,
            comments: [
                { author: 'stan', text: 'Dude, it\'s like 2 AM' },
                { author: 'wendy', text: 'Education is so important!' }
            ],
            uploadDate: '2024-01-08'
        });

        this.addMediaItem('stan', {
            type: 'photo',
            filename: 'main_four.jpg',
            title: 'The Gang All Together',
            description: 'Just hanging out at the bus stop like always',
            album: 'friends',
            tags: ['friendship', 'bus stop', 'daily life', 'south park'],
            likes: 28,
            comments: [
                { author: 'cartman', text: 'I look awesome in this pic!' },
                { author: 'kyle', text: 'Good times with the best friends' },
                { author: 'kenny', text: 'Mmmph mph mmmph!' }
            ],
            uploadDate: '2024-01-12'
        });

        this.addMediaItem('randy', {
            type: 'video',
            filename: 'tegridy_harvest.mp4',
            title: 'Premium Tegridy Harvest 2024',
            description: 'This year\'s crop has the highest tegridy content yet!',
            album: 'schemes',
            duration: '5:23',
            tags: ['tegridy', 'farming', 'harvest', 'business'],
            likes: 34,
            views: 203,
            comments: [
                { author: 'stan', text: 'Dad, please stop' },
                { author: 'sharon', text: 'Randy, we talked about this...' }
            ],
            uploadDate: '2024-01-20'
        });

        this.addMediaItem('butters', {
            type: 'photo',
            filename: 'butters_happy.jpg',
            title: 'Beautiful Day in South Park!',
            description: 'Oh hamburgers! The sun is shining and I\'m not grounded!',
            album: 'memories',
            tags: ['happiness', 'sunshine', 'freedom', 'joy'],
            likes: 42,
            comments: [
                { author: 'cartman', text: 'Butters, you\'re too innocent for this world' },
                { author: 'kyle', text: 'Your positivity is inspiring, Butters!' }
            ],
            uploadDate: '2024-01-14'
        });
    }

    // Core gallery methods
    addMediaItem(character, mediaData) {
        const mediaId = ++this.mediaId;
        const fullMediaData = {
            id: mediaId,
            character,
            ...mediaData,
            uploadDate: mediaData.uploadDate || new Date().toISOString().split('T')[0],
            likes: mediaData.likes || 0,
            comments: mediaData.comments || [],
            tags: mediaData.tags || []
        };

        this.mediaItems.set(mediaId, fullMediaData);
        
        // Update gallery counts
        const gallery = this.galleries.get(character);
        if (gallery) {
            if (mediaData.type === 'photo') {
                gallery.totalPhotos++;
            } else if (mediaData.type === 'video') {
                gallery.totalVideos++;
            }
        }

        return mediaId;
    }

    getGallery(character) {
        return this.galleries.get(character);
    }

    getMediaItem(mediaId) {
        return this.mediaItems.get(mediaId);
    }

    getCharacterMedia(character, albumType = null) {
        const items = Array.from(this.mediaItems.values())
            .filter(item => item.character === character);
        
        if (albumType) {
            return items.filter(item => item.album === albumType);
        }
        
        return items;
    }

    // Gallery UI rendering
    renderGalleryOverview(character) {
        const gallery = this.galleries.get(character);
        if (!gallery) return '<div class="no-gallery">No gallery available</div>';

        const albumsHTML = gallery.albums.map(album => {
            const albumType = this.albumTypes.get(album.type);
            return `
                <div class="album-card ${albumType.style}" onclick="openAlbum('${character}', '${album.type}')">
                    <div class="album-cover">
                        <div class="album-icon">${albumType.icon}</div>
                        <div class="album-photo" style="background-image: url('Assets/images/characters/${character}/${album.coverPhoto}')">
                            <div class="album-overlay">
                                <span class="item-count">${album.itemCount} items</span>
                            </div>
                        </div>
                    </div>
                    <div class="album-info">
                        <h3 class="album-title">${album.title}</h3>
                        <p class="album-description">${album.description}</p>
                        <div class="album-stats">
                            <span class="stat">${albumType.icon} ${album.itemCount}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="gallery-overview">
                <div class="gallery-header">
                    <h2 class="gallery-title">📷 ${gallery.character.charAt(0).toUpperCase() + gallery.character.slice(1)}'s Gallery</h2>
                    <div class="gallery-stats">
                        <span class="stat-item">📸 ${gallery.totalPhotos} Photos</span>
                        <span class="stat-item">🎬 ${gallery.totalVideos} Videos</span>
                        <span class="stat-item">📁 ${gallery.albums.length} Albums</span>
                    </div>
                </div>
                <div class="albums-grid">
                    ${albumsHTML}
                </div>
            </div>
        `;
    }

    renderAlbum(character, albumType) {
        const gallery = this.galleries.get(character);
        const album = gallery?.albums.find(a => a.type === albumType);
        const albumTypeData = this.albumTypes.get(albumType);
        
        if (!album || !albumTypeData) return '<div class="no-album">Album not found</div>';

        const mediaItems = this.getCharacterMedia(character, albumType);
        
        const mediaHTML = mediaItems.map(item => {
            return this.renderMediaThumbnail(item);
        }).join('');

        return `
            <div class="album-view">
                <div class="album-header">
                    <button class="back-btn" onclick="closeAlbum('${character}')">← Back to Gallery</button>
                    <div class="album-info">
                        <div class="album-icon-large">${albumTypeData.icon}</div>
                        <div class="album-details">
                            <h2 class="album-title">${album.title}</h2>
                            <p class="album-description">${album.description}</p>
                            <div class="album-meta">
                                <span>${mediaItems.length} items</span>
                                <span>•</span>
                                <span>Updated ${this.getLastUpdateDate(mediaItems)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="media-grid">
                    ${mediaHTML}
                </div>
            </div>
        `;
    }

    renderMediaThumbnail(mediaItem) {
        const isVideo = mediaItem.type === 'video';
        const thumbnailClass = isVideo ? 'video-thumbnail' : 'photo-thumbnail';
        
        return `
            <div class="media-thumbnail ${thumbnailClass}" onclick="openMediaViewer(${mediaItem.id})">
                <div class="thumbnail-container">
                    ${isVideo ? '<div class="video-overlay">▶️</div>' : ''}
                    <div class="thumbnail-image" style="background-image: url('Assets/images/characters/${mediaItem.character}/${mediaItem.filename}')"></div>
                    <div class="thumbnail-overlay">
                        <div class="media-title">${mediaItem.title}</div>
                        <div class="media-stats">
                            <span>❤️ ${mediaItem.likes}</span>
                            ${isVideo ? `<span>👁️ ${mediaItem.views}</span>` : ''}
                            <span>💬 ${mediaItem.comments.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderMediaViewer(mediaId) {
        const mediaItem = this.mediaItems.get(mediaId);
        if (!mediaItem) return '<div class="no-media">Media not found</div>';

        const isVideo = mediaItem.type === 'video';
        const characterData = window.relationshipMapper?.characters.get(mediaItem.character);
        const characterName = characterData?.name || mediaItem.character;

        const tagsHTML = mediaItem.tags.map(tag => 
            `<span class="media-tag">#${tag}</span>`
        ).join('');

        const commentsHTML = mediaItem.comments.map(comment => `
            <div class="comment-item">
                <div class="comment-avatar">
                    ${window.avatarSystem ? window.avatarSystem.generateAvatar(comment.author, 'small') : comment.author.charAt(0).toUpperCase()}
                </div>
                <div class="comment-content">
                    <strong>${comment.author.charAt(0).toUpperCase() + comment.author.slice(1)}</strong>
                    <span>${comment.text}</span>
                </div>
            </div>
        `).join('');

        return `
            <div class="media-viewer">
                <div class="media-viewer-header">
                    <button class="close-viewer" onclick="closeMediaViewer()">✕</button>
                    <div class="media-info-header">
                        <div class="uploader-avatar">
                            ${window.avatarSystem ? window.avatarSystem.generateAvatar(mediaItem.character, 'medium') : mediaItem.character.charAt(0).toUpperCase()}
                        </div>
                        <div class="uploader-info">
                            <strong>${characterName}</strong>
                            <span class="upload-date">${this.formatDate(mediaItem.uploadDate)}</span>
                            ${mediaItem.location ? `<span class="location">📍 ${mediaItem.location}</span>` : ''}
                        </div>
                    </div>
                </div>

                <div class="media-content">
                    <div class="media-display">
                        ${isVideo ? `
                            <video controls class="media-video">
                                <source src="Assets/videos/characters/${mediaItem.character}/${mediaItem.filename}" type="video/mp4">
                                Your browser doesn't support video playback.
                            </video>
                            <div class="video-info">
                                <span class="duration">⏱️ ${mediaItem.duration}</span>
                                <span class="views">👁️ ${mediaItem.views || 0} views</span>
                            </div>
                        ` : `
                            <img src="Assets/images/characters/${mediaItem.character}/${mediaItem.filename}" 
                                 alt="${mediaItem.title}" class="media-image">
                        `}
                    </div>

                    <div class="media-details">
                        <h3 class="media-title">${mediaItem.title}</h3>
                        <p class="media-description">${mediaItem.description}</p>
                        
                        <div class="media-tags">
                            ${tagsHTML}
                        </div>

                        <div class="media-actions">
                            <button class="action-btn like-btn ${mediaItem.userLiked ? 'liked' : ''}" 
                                    onclick="toggleMediaLike(${mediaItem.id})">
                                ❤️ ${mediaItem.likes}
                            </button>
                            <button class="action-btn share-btn" onclick="shareMedia(${mediaItem.id})">
                                🔗 Share
                            </button>
                            <button class="action-btn download-btn" onclick="downloadMedia(${mediaItem.id})">
                                ⬇️ Download
                            </button>
                        </div>

                        <div class="media-comments">
                            <h4>Comments (${mediaItem.comments.length})</h4>
                            <div class="comments-list">
                                ${commentsHTML}
                            </div>
                            <div class="add-comment">
                                <input type="text" placeholder="Add a comment..." 
                                       onkeypress="handleCommentSubmit(event, ${mediaItem.id})">
                                <button onclick="addComment(${mediaItem.id})">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Utility methods
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
        
        return date.toLocaleDateString();
    }

    getLastUpdateDate(mediaItems) {
        if (mediaItems.length === 0) return 'Never';
        
        const latestDate = mediaItems.reduce((latest, item) => {
            const itemDate = new Date(item.uploadDate);
            return itemDate > latest ? itemDate : latest;
        }, new Date(0));
        
        return this.formatDate(latestDate.toISOString().split('T')[0]);
    }

    // Interactive methods
    likeMedia(mediaId, userId = 'user') {
        const mediaItem = this.mediaItems.get(mediaId);
        if (!mediaItem) return false;

        mediaItem.likes++;
        mediaItem.userLiked = true;

        // Generate notification if available
        if (window.notificationSystem) {
            const character = mediaItem.character;
            window.notificationSystem.createNotification(
                'achievement',
                character,
                'Media Liked',
                `Someone liked your ${mediaItem.type}: "${mediaItem.title}"`,
                {
                    mediaId,
                    mediaTitle: mediaItem.title
                }
            );
        }

        return true;
    }

    addComment(mediaId, commentText, author = 'user') {
        const mediaItem = this.mediaItems.get(mediaId);
        if (!mediaItem || !commentText.trim()) return false;

        const newComment = {
            author,
            text: commentText.trim(),
            timestamp: new Date().toISOString(),
            id: Date.now()
        };

        mediaItem.comments.push(newComment);

        // Generate notification
        if (window.notificationSystem && author !== mediaItem.character) {
            window.notificationSystem.createNotification(
                'character_interaction',
                mediaItem.character,
                'New Comment',
                `${author} commented on your ${mediaItem.type}: "${commentText}"`,
                {
                    mediaId,
                    commentId: newComment.id
                }
            );
        }

        return newComment;
    }

    searchMedia(query, character = null) {
        const searchTerm = query.toLowerCase();
        let items = Array.from(this.mediaItems.values());
        
        if (character) {
            items = items.filter(item => item.character === character);
        }
        
        return items.filter(item =>
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    getPopularMedia(limit = 10) {
        return Array.from(this.mediaItems.values())
            .sort((a, b) => (b.likes + b.comments.length) - (a.likes + a.comments.length))
            .slice(0, limit);
    }

    exportGalleryData() {
        return {
            galleries: Object.fromEntries(this.galleries),
            mediaItems: Object.fromEntries(this.mediaItems),
            albumTypes: Object.fromEntries(this.albumTypes),
            timestamp: new Date().toISOString()
        };
    }
}

// Global helper functions
function openGallery(character) {
    const galleryHTML = window.mediaGallery.renderGalleryOverview(character);
    showModal('Character Gallery', galleryHTML);
}

function openAlbum(character, albumType) {
    const albumHTML = window.mediaGallery.renderAlbum(character, albumType);
    updateModal(albumHTML);
}

function closeAlbum(character) {
    const galleryHTML = window.mediaGallery.renderGalleryOverview(character);
    updateModal(galleryHTML);
}

function openMediaViewer(mediaId) {
    const viewerHTML = window.mediaGallery.renderMediaViewer(mediaId);
    showModal('Media Viewer', viewerHTML, 'large');
}

function closeMediaViewer() {
    closeModal();
}

function toggleMediaLike(mediaId) {
    const success = window.mediaGallery.likeMedia(mediaId);
    if (success) {
        // Update the like button
        const likeBtn = document.querySelector(`.like-btn`);
        if (likeBtn) {
            const mediaItem = window.mediaGallery.getMediaItem(mediaId);
            likeBtn.innerHTML = `❤️ ${mediaItem.likes}`;
            likeBtn.classList.add('liked');
        }
    }
}

function addComment(mediaId) {
    const input = document.querySelector('.add-comment input');
    const commentText = input.value.trim();
    
    if (commentText) {
        const comment = window.mediaGallery.addComment(mediaId, commentText, 'user');
        if (comment) {
            input.value = '';
            // Refresh the comments section
            const mediaViewer = window.mediaGallery.renderMediaViewer(mediaId);
            updateModal(mediaViewer);
        }
    }
}

function handleCommentSubmit(event, mediaId) {
    if (event.key === 'Enter') {
        addComment(mediaId);
    }
}

function shareMedia(mediaId) {
    const mediaItem = window.mediaGallery.getMediaItem(mediaId);
    if (mediaItem) {
        const shareText = `Check out this ${mediaItem.type} from ${mediaItem.character}: "${mediaItem.title}"`;
        if (navigator.share) {
            navigator.share({
                title: mediaItem.title,
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback to copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Share link copied to clipboard!');
            });
        }
    }
}

function downloadMedia(mediaId) {
    const mediaItem = window.mediaGallery.getMediaItem(mediaId);
    if (mediaItem) {
        alert(`Download started for: ${mediaItem.title}\n(This is a demo - no actual download will occur)`);
    }
}

// Modal utility functions
function showModal(title, content, size = 'medium') {
    const modal = document.createElement('div');
    modal.className = `modal-overlay ${size}`;
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" onclick="closeModal()">✕</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function updateModal(content) {
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) {
        modalBody.innerHTML = content;
    }
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// CSS for media gallery
const galleryStyles = document.createElement('style');
galleryStyles.textContent = `
    .gallery-overview {
        padding: 20px;
    }

    .gallery-header {
        margin-bottom: 30px;
        text-align: center;
    }

    .gallery-title {
        font-size: 28px;
        margin-bottom: 15px;
        color: #1877f2;
    }

    .gallery-stats {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
    }

    .stat-item {
        background: #f0f2f5;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
    }

    .albums-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }

    .album-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .album-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }

    .album-cover {
        position: relative;
        height: 200px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .album-icon {
        font-size: 48px;
        position: absolute;
        z-index: 2;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .album-photo {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center;
        opacity: 0.3;
    }

    .album-overlay {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
    }

    .album-info {
        padding: 20px;
    }

    .album-title {
        font-size: 20px;
        margin-bottom: 10px;
        color: #333;
    }

    .album-description {
        color: #666;
        margin-bottom: 15px;
        line-height: 1.4;
    }

    .media-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
        padding: 20px;
    }

    .media-thumbnail {
        aspect-ratio: 1;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
    }

    .media-thumbnail:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .thumbnail-container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .thumbnail-image {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-color: #f0f2f5;
    }

    .video-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 32px;
        color: white;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
        z-index: 3;
    }

    .thumbnail-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0,0,0,0.8));
        color: white;
        padding: 15px 10px 10px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .media-thumbnail:hover .thumbnail-overlay {
        opacity: 1;
    }

    .media-title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .media-stats {
        display: flex;
        gap: 10px;
        font-size: 12px;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 20px;
    }

    .modal-overlay.show {
        opacity: 1;
    }

    .modal-content {
        background: white;
        border-radius: 12px;
        max-width: 90vw;
        max-height: 90vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }

    .modal-overlay.show .modal-content {
        transform: scale(1);
    }

    .modal-overlay.medium .modal-content {
        width: 800px;
        height: 600px;
    }

    .modal-overlay.large .modal-content {
        width: 1000px;
        height: 700px;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #e0e0e0;
        background: #f8f9fa;
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s;
    }

    .modal-close:hover {
        background: rgba(0,0,0,0.1);
    }

    .modal-body {
        flex: 1;
        overflow-y: auto;
    }

    .media-viewer {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .media-content {
        display: flex;
        flex: 1;
        overflow: hidden;
    }

    .media-display {
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000;
        position: relative;
    }

    .media-image, .media-video {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .media-details {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        background: #f8f9fa;
    }

    .media-tags {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        margin: 15px 0;
    }

    .media-tag {
        background: #e3f2fd;
        color: #1565c0;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }

    .media-actions {
        display: flex;
        gap: 10px;
        margin: 20px 0;
    }

    .action-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 6px;
        background: #e0e0e0;
        cursor: pointer;
        transition: background 0.2s;
        font-size: 14px;
    }

    .action-btn:hover {
        background: #d0d0d0;
    }

    .like-btn.liked {
        background: #ff6b6b;
        color: white;
    }

    .media-comments {
        margin-top: 20px;
        border-top: 1px solid #e0e0e0;
        padding-top: 15px;
    }

    .comments-list {
        margin: 15px 0;
    }

    .comment-item {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    }

    .comment-avatar {
        width: 32px;
        height: 32px;
        background: #e0e0e0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        flex-shrink: 0;
    }

    .comment-content {
        flex: 1;
        background: #f0f0f0;
        padding: 8px 12px;
        border-radius: 12px;
        font-size: 14px;
    }

    .add-comment {
        display: flex;
        gap: 10px;
    }

    .add-comment input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #e0e0e0;
        border-radius: 20px;
        outline: none;
    }

    .add-comment button {
        padding: 8px 16px;
        background: #1877f2;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .albums-grid {
            grid-template-columns: 1fr;
        }
        
        .media-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }
        
        .modal-overlay.medium .modal-content,
        .modal-overlay.large .modal-content {
            width: 95vw;
            height: 90vh;
        }
        
        .media-content {
            flex-direction: column;
        }
        
        .media-display {
            flex: 1;
            min-height: 300px;
        }
        
        .media-details {
            flex: none;
            max-height: 300px;
        }
    }
`;
document.head.appendChild(galleryStyles);

// Create global instance
window.mediaGallery = new MediaGallerySystem();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MediaGallerySystem;
}
class SouthParkCommunityHub {
    constructor() {
        this.bulletinBoard = new Map();
        this.townEvents = [];
        this.citizenReports = [];
        this.mayoralAnnouncements = [];
        this.businessListings = new Map();
        this.lostAndFound = [];
        this.communityProjects = [];
        this.widget = null;
        this.isVisible = false;

        this.initializeCommunityData();
        this.createWidget();
        this.startCommunityUpdates();
    }

    initializeCommunityData() {
        // Initial bulletin board posts
        this.bulletinBoard.set('town-meeting', {
            id: 'town-meeting',
            title: 'Town Hall Meeting - THIS WEDNESDAY',
            author: 'Mayor McDaniels',
            content: 'Mandatory town meeting to discuss the recent underpants gnome situation. Coffee and donuts will be provided.',
            category: 'official',
            timestamp: Date.now() - 3600000,
            priority: 'high',
            responses: 12
        });

        this.bulletinBoard.set('snow-day', {
            id: 'snow-day',
            title: 'School Closure Due to Manbearpig Sighting',
            author: 'South Park Elementary',
            content: 'School is closed today due to an alleged Manbearpig sighting near the playground. Al Gore has been contacted.',
            category: 'school',
            timestamp: Date.now() - 7200000,
            priority: 'medium',
            responses: 34
        });

        this.bulletinBoard.set('chef-special', {
            id: 'chef-special',
            title: 'Chef\'s New Lunch Menu',
            author: 'Chef',
            content: 'Hello there, children! This week\'s special is my world-famous Salisbury steak. It\'ll make you want to make sweet love down by the fire!',
            category: 'food',
            timestamp: Date.now() - 10800000,
            priority: 'low',
            responses: 8
        });

        // Business listings
        this.businessListings.set('city-wok', {
            name: 'City Wok',
            owner: 'Tuong Lu Kim',
            description: 'Best Mongolian beef in South Park! We also have Chinese food, but Mongolians keep trying to break down our wall!',
            hours: '11:00 AM - 10:00 PM',
            phone: '(719) 555-WOK1',
            specialOffers: ['Free egg roll with purchase over $20', 'Sweet and sour pork special on Wednesdays']
        });

        this.businessListings.set('tweek-coffee', {
            name: 'Tweek Bros. Coffee',
            owner: 'Richard Tweek',
            description: 'Premium coffee that will make you as energetic as our son Tweek! Warning: May cause extreme jitters.',
            hours: '5:00 AM - 11:00 PM',
            phone: '(719) 555-JAVA',
            specialOffers: ['Double shot Monday special', 'Free coffee with proof of insomnia']
        });

        // Community projects
        this.communityProjects.push({
            title: 'Save the Startling Meadows',
            organizer: 'Randy Marsh',
            description: 'We must protect our local ecosystem from corporate development! Join us in preserving South Park\'s natural beauty!',
            goal: 'Prevent Wal-Mart from building on sacred ground',
            participants: 15,
            status: 'active'
        });
    }

    createWidget() {
        this.widget = document.createElement('div');
        this.widget.id = 'community-hub-widget';
        this.widget.innerHTML = `
            <div class="community-hub-header" onclick="window.communityHub.toggleWidget()">
                <span class="hub-icon">🏛️</span>
                <span class="hub-title">South Park Community Hub</span>
                <span class="notification-badge">${this.bulletinBoard.size}</span>
                <span class="toggle-arrow">▼</span>
            </div>
            <div class="community-hub-content" style="display: none;">
                <div class="hub-tabs">
                    <button class="hub-tab active" onclick="window.communityHub.showTab('bulletin')">Bulletin Board</button>
                    <button class="hub-tab" onclick="window.communityHub.showTab('businesses')">Local Business</button>
                    <button class="hub-tab" onclick="window.communityHub.showTab('events')">Town Events</button>
                    <button class="hub-tab" onclick="window.communityHub.showTab('projects')">Community Projects</button>
                </div>
                <div class="hub-content-area">
                    <div id="bulletin-tab" class="tab-content active">
                        <div class="bulletin-posts"></div>
                        <button class="add-post-btn" onclick="window.communityHub.showPostForm()">📝 Post to Bulletin Board</button>
                    </div>
                    <div id="businesses-tab" class="tab-content">
                        <div class="business-listings"></div>
                    </div>
                    <div id="events-tab" class="tab-content">
                        <div class="town-events"></div>
                    </div>
                    <div id="projects-tab" class="tab-content">
                        <div class="community-projects"></div>
                    </div>
                </div>
            </div>
            <div class="post-form-modal" style="display: none;">
                <div class="modal-content">
                    <span class="close-modal" onclick="window.communityHub.hidePostForm()">&times;</span>
                    <h3>Post to Community Bulletin Board</h3>
                    <form onsubmit="window.communityHub.submitPost(event)">
                        <input type="text" id="post-title" placeholder="Post Title" required>
                        <select id="post-category" required>
                            <option value="">Select Category</option>
                            <option value="official">Official Announcement</option>
                            <option value="school">School Related</option>
                            <option value="business">Business</option>
                            <option value="community">Community</option>
                            <option value="food">Food & Dining</option>
                            <option value="lost-found">Lost & Found</option>
                            <option value="other">Other</option>
                        </select>
                        <textarea id="post-content" placeholder="What would you like to share with the community?" required></textarea>
                        <select id="post-priority">
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                        <button type="submit">Post to Community</button>
                    </form>
                </div>
            </div>
        `;

        // Add styles
        const styles = `
            <style>
            #community-hub-widget {
                position: fixed;
                top: 120px;
                right: 20px;
                width: 350px;
                background: linear-gradient(135deg, #2c5aa0 0%, #1e4080 100%);
                border: 2px solid #fff;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                font-family: 'Arial', sans-serif;
                z-index: 1000;
                max-height: 80vh;
                overflow: hidden;
            }

            .community-hub-header {
                background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
                color: white;
                padding: 12px 15px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: bold;
                user-select: none;
            }

            .hub-icon {
                font-size: 18px;
            }

            .hub-title {
                flex: 1;
                font-size: 14px;
            }

            .notification-badge {
                background: #ff0000;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                font-weight: bold;
            }

            .toggle-arrow {
                font-size: 12px;
                transition: transform 0.3s;
            }

            .community-hub-content.visible .toggle-arrow {
                transform: rotate(180deg);
            }

            .community-hub-content {
                background: white;
                max-height: 500px;
                overflow-y: auto;
            }

            .hub-tabs {
                display: flex;
                background: #f0f0f0;
                border-bottom: 2px solid #ddd;
            }

            .hub-tab {
                flex: 1;
                padding: 10px 5px;
                border: none;
                background: none;
                cursor: pointer;
                font-size: 11px;
                font-weight: bold;
                color: #666;
                transition: all 0.3s;
            }

            .hub-tab.active {
                background: white;
                color: #2c5aa0;
                border-bottom: 2px solid #2c5aa0;
            }

            .hub-tab:hover {
                background: #e0e0e0;
            }

            .tab-content {
                display: none;
                padding: 15px;
            }

            .tab-content.active {
                display: block;
            }

            .bulletin-post {
                background: #f9f9f9;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 10px;
                position: relative;
            }

            .bulletin-post.high-priority {
                border-left: 4px solid #ff0000;
                background: #fff5f5;
            }

            .bulletin-post.medium-priority {
                border-left: 4px solid #ff9500;
                background: #fff8f0;
            }

            .post-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }

            .post-title {
                font-weight: bold;
                font-size: 13px;
                color: #2c5aa0;
            }

            .post-category {
                background: #2c5aa0;
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 10px;
                text-transform: uppercase;
            }

            .post-author {
                font-size: 11px;
                color: #666;
                margin-bottom: 5px;
            }

            .post-content {
                font-size: 12px;
                line-height: 1.4;
                margin-bottom: 8px;
            }

            .post-footer {
                display: flex;
                justify-content: space-between;
                font-size: 10px;
                color: #888;
            }

            .business-card {
                background: #f9f9f9;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 10px;
            }

            .business-name {
                font-weight: bold;
                font-size: 14px;
                color: #2c5aa0;
                margin-bottom: 5px;
            }

            .business-owner {
                font-size: 11px;
                color: #666;
                margin-bottom: 8px;
            }

            .business-description {
                font-size: 12px;
                margin-bottom: 8px;
                line-height: 1.4;
            }

            .business-hours {
                font-size: 11px;
                color: #555;
                margin-bottom: 5px;
            }

            .special-offers {
                background: #e8f5e8;
                border-radius: 4px;
                padding: 5px;
                font-size: 10px;
                color: #2d5a2d;
            }

            .add-post-btn {
                width: 100%;
                background: linear-gradient(90deg, #ff6b35 0%, #f7931e 100%);
                color: white;
                border: none;
                padding: 10px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: bold;
                font-size: 12px;
                margin-top: 10px;
            }

            .post-form-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .modal-content {
                background: white;
                padding: 20px;
                border-radius: 10px;
                width: 400px;
                max-width: 90%;
                position: relative;
            }

            .close-modal {
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 20px;
                cursor: pointer;
                color: #999;
            }

            .modal-content h3 {
                margin-top: 0;
                color: #2c5aa0;
            }

            .modal-content input,
            .modal-content select,
            .modal-content textarea {
                width: 100%;
                padding: 8px;
                margin: 5px 0;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 12px;
            }

            .modal-content textarea {
                height: 80px;
                resize: vertical;
            }

            .modal-content button {
                width: 100%;
                background: #2c5aa0;
                color: white;
                border: none;
                padding: 10px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
            }

            .project-card {
                background: linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%);
                border: 1px solid #c3e6cb;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 10px;
            }

            .project-title {
                font-weight: bold;
                font-size: 13px;
                color: #155724;
                margin-bottom: 5px;
            }

            .project-organizer {
                font-size: 11px;
                color: #666;
                margin-bottom: 8px;
            }

            @media (max-width: 768px) {
                #community-hub-widget {
                    width: calc(100% - 40px);
                    right: 20px;
                    left: 20px;
                }
            }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.appendChild(this.widget);

        this.updateContent();
        window.communityHub = this;
    }

    toggleWidget() {
        const content = this.widget.querySelector('.community-hub-content');
        const arrow = this.widget.querySelector('.toggle-arrow');

        if (this.isVisible) {
            content.style.display = 'none';
            arrow.textContent = '▼';
            this.isVisible = false;
        } else {
            content.style.display = 'block';
            arrow.textContent = '▲';
            this.isVisible = true;
        }
    }

    showTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.hub-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Show selected tab
        document.querySelector(`[onclick="window.communityHub.showTab('${tabName}')"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.updateContent();
    }

    updateContent() {
        this.updateBulletinBoard();
        this.updateBusinessListings();
        this.updateTownEvents();
        this.updateCommunityProjects();
    }

    updateBulletinBoard() {
        const container = this.widget.querySelector('.bulletin-posts');
        if (!container) return;

        const posts = Array.from(this.bulletinBoard.values())
            .sort((a, b) => b.timestamp - a.timestamp);

        container.innerHTML = posts.map(post => `
            <div class="bulletin-post ${post.priority}-priority">
                <div class="post-header">
                    <span class="post-title">${post.title}</span>
                    <span class="post-category">${post.category}</span>
                </div>
                <div class="post-author">Posted by: ${post.author}</div>
                <div class="post-content">${post.content}</div>
                <div class="post-footer">
                    <span>${this.getTimeAgo(post.timestamp)}</span>
                    <span>💬 ${post.responses} responses</span>
                </div>
            </div>
        `).join('');
    }

    updateBusinessListings() {
        const container = this.widget.querySelector('.business-listings');
        if (!container) return;

        const businesses = Array.from(this.businessListings.values());

        container.innerHTML = businesses.map(business => `
            <div class="business-card">
                <div class="business-name">${business.name}</div>
                <div class="business-owner">Owner: ${business.owner}</div>
                <div class="business-description">${business.description}</div>
                <div class="business-hours">⏰ ${business.hours}</div>
                <div class="business-hours">📞 ${business.phone}</div>
                <div class="special-offers">
                    <strong>Special Offers:</strong>
                    <ul style="margin: 5px 0 0 15px; padding: 0;">
                        ${business.specialOffers.map(offer => `<li>${offer}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    updateTownEvents() {
        const container = this.widget.querySelector('.town-events');
        if (!container) return;

        // Generate some dynamic events
        const events = [
            {
                title: 'South Park Elementary Talent Show',
                date: 'Next Friday 7:00 PM',
                location: 'School Auditorium',
                description: 'Come see our kids perform! Warning: May contain inappropriate content.'
            },
            {
                title: 'City Council Meeting',
                date: 'This Thursday 6:00 PM',
                location: 'Town Hall',
                description: 'Discussing new ordinances about underpants gnomes and ManBearPig preparedness.'
            },
            {
                title: 'Tweek Bros. Coffee Tasting',
                date: 'Saturday 2:00 PM',
                location: 'Tweek Bros. Coffee',
                description: 'Sample our most caffeinated blends! Medical staff will be on standby.'
            }
        ];

        container.innerHTML = events.map(event => `
            <div class="bulletin-post">
                <div class="post-header">
                    <span class="post-title">📅 ${event.title}</span>
                </div>
                <div class="post-content">
                    <strong>📍 ${event.location}</strong><br>
                    <strong>🕒 ${event.date}</strong><br><br>
                    ${event.description}
                </div>
            </div>
        `).join('');
    }

    updateCommunityProjects() {
        const container = this.widget.querySelector('.community-projects');
        if (!container) return;

        container.innerHTML = this.communityProjects.map(project => `
            <div class="project-card">
                <div class="project-title">${project.title}</div>
                <div class="project-organizer">Organized by: ${project.organizer}</div>
                <div class="post-content">${project.description}</div>
                <div class="post-footer">
                    <span>🎯 Goal: ${project.goal}</span>
                    <span>👥 ${project.participants} participants</span>
                </div>
            </div>
        `).join('');
    }

    showPostForm() {
        this.widget.querySelector('.post-form-modal').style.display = 'flex';
    }

    hidePostForm() {
        this.widget.querySelector('.post-form-modal').style.display = 'none';
        // Reset form
        this.widget.querySelector('form').reset();
    }

    submitPost(event) {
        event.preventDefault();

        const title = document.getElementById('post-title').value;
        const category = document.getElementById('post-category').value;
        const content = document.getElementById('post-content').value;
        const priority = document.getElementById('post-priority').value;

        const newPost = {
            id: `user-post-${Date.now()}`,
            title: title,
            author: 'Anonymous Citizen',
            content: content,
            category: category,
            timestamp: Date.now(),
            priority: priority,
            responses: 0
        };

        this.bulletinBoard.set(newPost.id, newPost);
        this.updateBulletinBoard();
        this.hidePostForm();

        // Update notification badge
        this.widget.querySelector('.notification-badge').textContent = this.bulletinBoard.size;
    }

    getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const hours = Math.floor(diff / (1000 * 60 * 60));

        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours} hours ago`;
        return `${Math.floor(hours / 24)} days ago`;
    }

    startCommunityUpdates() {
        // Add random community activity
        setInterval(() => {
            this.simulateCommunityActivity();
        }, 120000); // Every 2 minutes
    }

    simulateCommunityActivity() {
        const activities = [
            () => {
                // Random response to existing posts
                const posts = Array.from(this.bulletinBoard.values());
                if (posts.length > 0) {
                    const randomPost = posts[Math.floor(Math.random() * posts.length)];
                    randomPost.responses += Math.floor(Math.random() * 3) + 1;
                    this.updateBulletinBoard();
                }
            },
            () => {
                // New community announcement
                const announcements = [
                    {
                        title: 'Road Construction on Main Street',
                        author: 'Public Works Department',
                        content: 'Main Street will be under construction for the next week due to mysterious sinkhole. Please use alternate routes.',
                        category: 'official'
                    },
                    {
                        title: 'Lost Cat - Mr. Kitty',
                        author: 'Cartman Family',
                        content: 'Our cat Mr. Kitty is missing. Last seen near KFC. Reward: One KFC bucket (partially eaten).',
                        category: 'lost-found'
                    }
                ];

                if (Math.random() < 0.3) {
                    const announcement = announcements[Math.floor(Math.random() * announcements.length)];
                    const newPost = {
                        id: `auto-post-${Date.now()}`,
                        ...announcement,
                        timestamp: Date.now(),
                        priority: 'medium',
                        responses: 0
                    };
                    this.bulletinBoard.set(newPost.id, newPost);
                    this.updateBulletinBoard();
                    this.widget.querySelector('.notification-badge').textContent = this.bulletinBoard.size;
                }
            }
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        randomActivity();
    }
}

// Initialize Community Hub
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (!window.communityHub) {
            new SouthParkCommunityHub();
        }
    }, 1000);
});
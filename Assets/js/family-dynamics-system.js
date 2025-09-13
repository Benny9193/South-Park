class FamilyDynamicsSystem {
    constructor() {
        this.families = new Map();
        this.familyTrees = new Map();
        this.familyEvents = [];
        this.relationships = new Map();
        this.familyTraditions = new Map();
        this.widget = null;
        this.isVisible = false;
        this.currentFamily = null;

        this.initializeFamilyData();
        this.createWidget();
        this.startFamilyUpdates();
    }

    initializeFamilyData() {
        // Marsh Family
        this.families.set('marsh', {
            surname: 'Marsh',
            members: {
                'randy': {
                    name: 'Randy Marsh',
                    role: 'Father',
                    age: 42,
                    occupation: 'Geologist/Part-time musician',
                    personality: 'Impulsive, dramatic, obsessive',
                    currentMood: 'Excited about latest discovery',
                    relationships: {
                        'sharon': 'Married (somewhat strained)',
                        'stan': 'Father-son (complicated)',
                        'shelley': 'Father-daughter (distant)'
                    }
                },
                'sharon': {
                    name: 'Sharon Marsh',
                    role: 'Mother',
                    age: 40,
                    occupation: 'Secretary at Tom\'s Rhinoplasty',
                    personality: 'Practical, often exasperated, caring',
                    currentMood: 'Trying to keep family together',
                    relationships: {
                        'randy': 'Married (patience wearing thin)',
                        'stan': 'Mother-son (protective)',
                        'shelley': 'Mother-daughter (understanding)'
                    }
                },
                'stan': {
                    name: 'Stan Marsh',
                    role: 'Son',
                    age: 10,
                    occupation: 'Student',
                    personality: 'Sensible, often voice of reason, cynical',
                    currentMood: 'Dealing with latest family drama',
                    relationships: {
                        'randy': 'Father-son (embarrassed by dad)',
                        'sharon': 'Mother-son (close)',
                        'shelley': 'Brother-sister (typical sibling rivalry)'
                    }
                },
                'shelley': {
                    name: 'Shelley Marsh',
                    role: 'Daughter',
                    age: 13,
                    occupation: 'Student',
                    personality: 'Aggressive, protective of Stan (secretly), typical teenager',
                    currentMood: 'Annoyed with everything',
                    relationships: {
                        'randy': 'Father-daughter (indifferent)',
                        'sharon': 'Mother-daughter (occasional bonding)',
                        'stan': 'Sister-brother (violent but caring)'
                    }
                }
            },
            familyStatus: 'Dysfunctional but loving',
            currentDrama: 'Randy\'s latest obsession affecting family life',
            traditions: ['Disastrous camping trips', 'Randy\'s birthday disasters', 'Holiday arguments'],
            secrets: ['Randy\'s secret music career dreams', 'Sharon\'s escape fantasies'],
            financialStatus: 'Middle class (Randy\'s jobs are unpredictable)'
        });

        // Broflovski Family
        this.families.set('broflovski', {
            surname: 'Broflovski',
            members: {
                'gerald': {
                    name: 'Gerald Broflovski',
                    role: 'Father',
                    age: 44,
                    occupation: 'Lawyer',
                    personality: 'Self-righteous, intelligent, secretly immature',
                    currentMood: 'Working on latest social justice case',
                    relationships: {
                        'sheila': 'Married (power couple)',
                        'kyle': 'Father-son (proud but pressuring)',
                        'ike': 'Father-son (adoptive, caring)'
                    }
                },
                'sheila': {
                    name: 'Sheila Broflovski',
                    role: 'Mother',
                    age: 42,
                    occupation: 'Activist/Stay-at-home mom',
                    personality: 'Overprotective, passionate about causes, dramatic',
                    currentMood: 'Organizing protest against something',
                    relationships: {
                        'gerald': 'Married (supportive partnership)',
                        'kyle': 'Mother-son (extremely protective)',
                        'ike': 'Mother-son (adoptive, loving)'
                    }
                },
                'kyle': {
                    name: 'Kyle Broflovski',
                    role: 'Son',
                    age: 10,
                    occupation: 'Student',
                    personality: 'Moral, intelligent, passionate about justice',
                    currentMood: 'Fighting some injustice',
                    relationships: {
                        'gerald': 'Father-son (respectful)',
                        'sheila': 'Mother-son (sometimes embarrassed)',
                        'ike': 'Brother-brother (protective big brother)'
                    }
                },
                'ike': {
                    name: 'Ike Broflovski',
                    role: 'Son (Adopted)',
                    age: 4,
                    occupation: 'Preschooler',
                    personality: 'Intelligent for his age, Canadian, sweet',
                    currentMood: 'Happy and curious',
                    relationships: {
                        'gerald': 'Father-son (loved)',
                        'sheila': 'Mother-son (cherished)',
                        'kyle': 'Brother-brother (adores Kyle)'
                    }
                }
            },
            familyStatus: 'Close-knit, high-achieving',
            currentDrama: 'Balancing activism with family time',
            traditions: ['Jewish holidays', 'Family debates', 'Educational trips'],
            secrets: ['Ike\'s adoption details', 'Gerald\'s internet trolling'],
            financialStatus: 'Upper-middle class'
        });

        // Cartman Family
        this.families.set('cartman', {
            surname: 'Cartman',
            members: {
                'liane': {
                    name: 'Liane Cartman',
                    role: 'Mother',
                    age: 38,
                    occupation: 'Various (often questionable)',
                    personality: 'Permissive, naive, loving but enabling',
                    currentMood: 'Trying to please Eric',
                    relationships: {
                        'eric': 'Mother-son (completely enabling)'
                    }
                },
                'eric': {
                    name: 'Eric Cartman',
                    role: 'Son',
                    age: 10,
                    occupation: 'Student/Schemer',
                    personality: 'Manipulative, selfish, racist, surprisingly cunning',
                    currentMood: 'Plotting something diabolical',
                    relationships: {
                        'liane': 'Mother-son (manipulative but loving)'
                    }
                }
            },
            familyStatus: 'Single parent household, codependent',
            currentDrama: 'Eric manipulating his mother again',
            traditions: ['KFC dinners', 'Eric getting whatever he wants'],
            secrets: ['Eric\'s father\'s identity', 'Liane\'s past'],
            financialStatus: 'Lower-middle class (inconsistent income)'
        });

        // McCormick Family
        this.families.set('mccormick', {
            surname: 'McCormick',
            members: {
                'stuart': {
                    name: 'Stuart McCormick',
                    role: 'Father',
                    age: 40,
                    occupation: 'Unemployed/odd jobs',
                    personality: 'Alcoholic, negligent, well-meaning when sober',
                    currentMood: 'Looking for work (or a drink)',
                    relationships: {
                        'carol': 'Married (volatile)',
                        'kenny': 'Father-son (distant)',
                        'karen': 'Father-daughter (trying to do better)'
                    }
                },
                'carol': {
                    name: 'Carol McCormick',
                    role: 'Mother',
                    age: 38,
                    occupation: 'Part-time jobs',
                    personality: 'Overwhelmed, struggling, loves her children',
                    currentMood: 'Stressed about bills',
                    relationships: {
                        'stuart': 'Married (complicated)',
                        'kenny': 'Mother-son (worried)',
                        'karen': 'Mother-daughter (protective)'
                    }
                },
                'kenny': {
                    name: 'Kenny McCormick',
                    role: 'Son',
                    age: 10,
                    occupation: 'Student',
                    personality: 'Resilient, poor, dies frequently, good-hearted',
                    currentMood: 'Making the best of things',
                    relationships: {
                        'stuart': 'Father-son (disappointed)',
                        'carol': 'Mother-son (understanding)',
                        'karen': 'Brother-sister (very protective)'
                    }
                },
                'karen': {
                    name: 'Karen McCormick',
                    role: 'Daughter',
                    age: 6,
                    occupation: 'Student',
                    personality: 'Sweet, innocent, wise beyond her years',
                    currentMood: 'Hopeful despite circumstances',
                    relationships: {
                        'stuart': 'Father-daughter (wishes he was better)',
                        'carol': 'Mother-daughter (close)',
                        'kenny': 'Sister-brother (adores Kenny)'
                    }
                }
            },
            familyStatus: 'Struggling financially, strong bonds despite hardship',
            currentDrama: 'Financial stress and Stuart\'s drinking',
            traditions: ['Sharing whatever little they have', 'Kenny protecting Karen'],
            secrets: ['Kenny\'s deaths and resurrections', 'Family\'s cult involvement'],
            financialStatus: 'Below poverty line'
        });

        // Family Events
        this.familyEvents = [
            {
                family: 'marsh',
                event: 'Randy\'s Latest Obsession Intervention',
                description: 'Sharon organizing family meeting about Randy\'s newest fixation',
                impact: 'High stress, potential for disaster',
                participants: ['Randy', 'Sharon', 'Stan', 'Shelley'],
                outcome: 'Pending'
            },
            {
                family: 'broflovski',
                event: 'Kyle\'s Bar Mitzvah Planning',
                description: 'Sheila going overboard with Bar Mitzvah preparations',
                impact: 'Medium stress, family bonding opportunity',
                participants: ['Gerald', 'Sheila', 'Kyle', 'Ike'],
                outcome: 'In Progress'
            },
            {
                family: 'cartman',
                event: 'Mother\'s Day Manipulation',
                description: 'Eric planning elaborate scheme to get expensive gift from Liane',
                impact: 'Liane\'s bank account in danger',
                participants: ['Liane', 'Eric'],
                outcome: 'Eric will probably succeed'
            },
            {
                family: 'mccormick',
                event: 'Utility Shut-off Crisis',
                description: 'Family dealing with electricity being turned off',
                impact: 'High stress, community support needed',
                participants: ['Stuart', 'Carol', 'Kenny', 'Karen'],
                outcome: 'Ongoing struggle'
            }
        ];

        // Family Traditions
        this.familyTraditions.set('holidays', {
            christmas: {
                marsh: 'Randy tries to be Santa, chaos ensues',
                broflovski: 'Hannukah vs Christmas cultural battles',
                cartman: 'Eric manipulates Santa mythology for gifts',
                mccormick: 'Grateful for any celebration they can afford'
            },
            thanksgiving: {
                marsh: 'Camping trip disasters',
                broflovski: 'Historical accuracy debates',
                cartman: 'Eric eats everything',
                mccormick: 'Community dinner at church'
            }
        });
    }

    createWidget() {
        this.widget = document.createElement('div');
        this.widget.id = 'family-dynamics-widget';
        this.widget.innerHTML = `
            <div class="family-header" onclick="window.familySystem.toggleWidget()">
                <span class="family-icon">👨‍👩‍👧‍👦</span>
                <span class="family-title">Family Dynamics</span>
                <span class="active-families">${this.families.size} families</span>
                <span class="toggle-arrow">▼</span>
            </div>
            <div class="family-content" style="display: none;">
                <div class="family-selector">
                    <select onchange="window.familySystem.selectFamily(this.value)">
                        <option value="">Select a family...</option>
                    </select>
                </div>
                <div class="family-tabs">
                    <button class="family-tab active" onclick="window.familySystem.showTab('overview')">👪 Overview</button>
                    <button class="family-tab" onclick="window.familySystem.showTab('relationships')">💕 Relations</button>
                    <button class="family-tab" onclick="window.familySystem.showTab('events')">📅 Events</button>
                    <button class="family-tab" onclick="window.familySystem.showTab('traditions')">🎭 Traditions</button>
                </div>
                <div class="family-content-area">
                    <div id="overview-tab" class="family-tab-content active">
                        <div class="family-overview"></div>
                    </div>
                    <div id="relationships-tab" class="family-tab-content">
                        <div class="relationship-map"></div>
                    </div>
                    <div id="events-tab" class="family-tab-content">
                        <div class="family-events"></div>
                    </div>
                    <div id="traditions-tab" class="family-tab-content">
                        <div class="family-traditions"></div>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const styles = `
            <style>
            #family-dynamics-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 360px;
                background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
                border: 2px solid #fbbf24;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                font-family: 'Arial', sans-serif;
                z-index: 1000;
                max-height: 80vh;
                overflow: hidden;
            }

            .family-header {
                background: linear-gradient(90deg, #ec4899 0%, #be185d 100%);
                color: white;
                padding: 12px 15px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: bold;
                user-select: none;
            }

            .family-icon {
                font-size: 18px;
            }

            .family-title {
                flex: 1;
                font-size: 14px;
            }

            .active-families {
                background: rgba(255,255,255,0.2);
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 10px;
            }

            .toggle-arrow {
                font-size: 12px;
                transition: transform 0.3s;
            }

            .family-content.visible .toggle-arrow {
                transform: rotate(180deg);
            }

            .family-content {
                background: white;
                max-height: 500px;
                overflow-y: auto;
            }

            .family-selector {
                padding: 15px;
                background: #f8fafc;
                border-bottom: 1px solid #e2e8f0;
            }

            .family-selector select {
                width: 100%;
                padding: 8px;
                border: 1px solid #cbd5e0;
                border-radius: 6px;
                font-size: 12px;
                background: white;
            }

            .family-tabs {
                display: flex;
                background: #f1f5f9;
                border-bottom: 2px solid #e2e8f0;
            }

            .family-tab {
                flex: 1;
                padding: 10px 8px;
                border: none;
                background: none;
                cursor: pointer;
                font-size: 10px;
                font-weight: bold;
                color: #64748b;
                transition: all 0.3s;
            }

            .family-tab.active {
                background: white;
                color: #7c3aed;
                border-bottom: 2px solid #7c3aed;
            }

            .family-tab:hover {
                background: #e2e8f0;
            }

            .family-tab-content {
                display: none;
                padding: 15px;
            }

            .family-tab-content.active {
                display: block;
            }

            .family-card {
                background: linear-gradient(135deg, #fef7ff 0%, #fdf4ff 100%);
                border: 1px solid #c084fc;
                border-radius: 10px;
                padding: 15px;
                margin-bottom: 15px;
            }

            .family-name {
                font-size: 18px;
                font-weight: bold;
                color: #581c87;
                margin-bottom: 10px;
                text-align: center;
            }

            .family-status {
                background: #ddd6fe;
                border-radius: 20px;
                padding: 5px 12px;
                text-align: center;
                font-size: 11px;
                color: #5b21b6;
                margin-bottom: 15px;
            }

            .family-members {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                margin-bottom: 15px;
            }

            .member-card {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 10px;
                text-align: center;
            }

            .member-name {
                font-weight: bold;
                font-size: 12px;
                color: #374151;
                margin-bottom: 3px;
            }

            .member-role {
                font-size: 10px;
                color: #6b7280;
                margin-bottom: 5px;
            }

            .member-mood {
                font-size: 9px;
                background: #fef3c7;
                border-radius: 10px;
                padding: 2px 6px;
                color: #92400e;
            }

            .current-drama {
                background: #fee2e2;
                border: 1px solid #fca5a5;
                border-radius: 6px;
                padding: 10px;
                margin-top: 10px;
            }

            .drama-title {
                font-weight: bold;
                font-size: 11px;
                color: #dc2626;
                margin-bottom: 5px;
            }

            .drama-content {
                font-size: 10px;
                color: #7f1d1d;
                line-height: 1.3;
            }

            .relationship-network {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 10px;
            }

            .relationship-pair {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px solid #e5e7eb;
                font-size: 11px;
            }

            .relationship-pair:last-child {
                border-bottom: none;
            }

            .relationship-members {
                font-weight: bold;
                color: #374151;
            }

            .relationship-status {
                color: #059669;
                font-size: 10px;
                background: #d1fae5;
                padding: 2px 6px;
                border-radius: 8px;
            }

            .relationship-status.strained {
                color: #dc2626;
                background: #fee2e2;
            }

            .relationship-status.complicated {
                color: #d97706;
                background: #fef3c7;
            }

            .event-card {
                background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
                border: 1px solid #3b82f6;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 10px;
            }

            .event-title {
                font-weight: bold;
                font-size: 13px;
                color: #1d4ed8;
                margin-bottom: 5px;
            }

            .event-description {
                font-size: 11px;
                color: #374151;
                line-height: 1.4;
                margin-bottom: 8px;
            }

            .event-details {
                display: flex;
                justify-content: space-between;
                font-size: 10px;
            }

            .event-impact {
                color: #dc2626;
                font-weight: bold;
            }

            .event-participants {
                color: #6b7280;
            }

            .tradition-category {
                background: #f0fdf4;
                border: 1px solid #86efac;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 10px;
            }

            .tradition-title {
                font-weight: bold;
                font-size: 13px;
                color: #166534;
                margin-bottom: 8px;
                text-transform: capitalize;
            }

            .tradition-family {
                background: white;
                border-radius: 4px;
                padding: 6px;
                margin-bottom: 5px;
                font-size: 11px;
            }

            .tradition-family-name {
                font-weight: bold;
                color: #059669;
            }

            .family-secret {
                background: #fef7ff;
                border: 1px solid #d8b4fe;
                border-radius: 6px;
                padding: 8px;
                margin-top: 10px;
                font-size: 10px;
                color: #7c2d92;
            }

            .secret-title {
                font-weight: bold;
                margin-bottom: 3px;
            }

            @media (max-width: 768px) {
                #family-dynamics-widget {
                    width: calc(100% - 40px);
                    right: 20px;
                    left: 20px;
                }

                .family-members {
                    grid-template-columns: 1fr;
                }
            }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.appendChild(this.widget);

        this.updateFamilySelector();
        window.familySystem = this;
    }

    toggleWidget() {
        const content = this.widget.querySelector('.family-content');
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
        document.querySelectorAll('.family-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.family-tab-content').forEach(content => content.classList.remove('active'));

        // Show selected tab
        document.querySelector(`[onclick="window.familySystem.showTab('${tabName}')"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');

        if (this.currentFamily) {
            this.updateContent();
        }
    }

    updateFamilySelector() {
        const selector = this.widget.querySelector('.family-selector select');
        if (!selector) return;

        const families = Array.from(this.families.values());
        selector.innerHTML = '<option value="">Select a family...</option>' +
            families.map(family => `<option value="${family.surname.toLowerCase()}">${family.surname} Family</option>`).join('');
    }

    selectFamily(familyKey) {
        this.currentFamily = familyKey;
        if (familyKey) {
            this.updateContent();
        } else {
            this.clearContent();
        }
    }

    updateContent() {
        if (!this.currentFamily) return;

        this.updateOverview();
        this.updateRelationships();
        this.updateEvents();
        this.updateTraditions();
    }

    updateOverview() {
        const container = this.widget.querySelector('.family-overview');
        if (!container) return;

        const family = this.families.get(this.currentFamily);
        if (!family) return;

        const members = Object.values(family.members);

        container.innerHTML = `
            <div class="family-card">
                <div class="family-name">The ${family.surname} Family</div>
                <div class="family-status">${family.familyStatus}</div>

                <div class="family-members">
                    ${members.map(member => `
                        <div class="member-card">
                            <div class="member-name">${member.name}</div>
                            <div class="member-role">${member.role} (${member.age})</div>
                            <div class="member-mood">${member.currentMood}</div>
                        </div>
                    `).join('')}
                </div>

                <div style="font-size: 11px; color: #6b7280; margin-bottom: 8px;">
                    <strong>Financial Status:</strong> ${family.financialStatus}
                </div>

                <div class="current-drama">
                    <div class="drama-title">🎭 Current Family Drama</div>
                    <div class="drama-content">${family.currentDrama}</div>
                </div>

                <div class="family-secret">
                    <div class="secret-title">🤫 Family Secrets</div>
                    ${family.secrets.map(secret => `<div>• ${secret}</div>`).join('')}
                </div>
            </div>
        `;
    }

    updateRelationships() {
        const container = this.widget.querySelector('.relationship-map');
        if (!container) return;

        const family = this.families.get(this.currentFamily);
        if (!family) return;

        const relationships = [];
        const members = Object.values(family.members);

        // Generate all relationship pairs
        for (let i = 0; i < members.length; i++) {
            for (let j = i + 1; j < members.length; j++) {
                const member1 = members[i];
                const member2 = members[j];
                const member2Key = member2.name.toLowerCase().split(' ')[0];

                if (member1.relationships && member1.relationships[member2Key]) {
                    relationships.push({
                        member1: member1.name,
                        member2: member2.name,
                        status: member1.relationships[member2Key]
                    });
                }
            }
        }

        container.innerHTML = `
            <div class="relationship-network">
                <h4 style="margin: 0 0 10px 0; color: #7c3aed; font-size: 14px;">Family Relationship Map</h4>
                ${relationships.map(rel => {
                    let statusClass = '';
                    if (rel.status.includes('strained') || rel.status.includes('volatile')) statusClass = 'strained';
                    else if (rel.status.includes('complicated') || rel.status.includes('embarrassed')) statusClass = 'complicated';

                    return `
                        <div class="relationship-pair">
                            <span class="relationship-members">${rel.member1} ↔ ${rel.member2}</span>
                            <span class="relationship-status ${statusClass}">${rel.status}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    updateEvents() {
        const container = this.widget.querySelector('.family-events');
        if (!container) return;

        const familyEvents = this.familyEvents.filter(event => event.family === this.currentFamily);

        container.innerHTML = familyEvents.map(event => `
            <div class="event-card">
                <div class="event-title">${event.event}</div>
                <div class="event-description">${event.description}</div>
                <div class="event-details">
                    <span class="event-impact">Impact: ${event.impact}</span>
                    <span class="event-participants">${event.participants.length} involved</span>
                </div>
                <div style="font-size: 10px; color: #6b7280; margin-top: 5px;">
                    <strong>Predicted Outcome:</strong> ${event.outcome}
                </div>
            </div>
        `).join('') || '<div style="text-align: center; color: #6b7280; font-size: 12px; padding: 20px;">No current family events</div>';
    }

    updateTraditions() {
        const container = this.widget.querySelector('.family-traditions');
        if (!container) return;

        const holidays = this.familyTraditions.get('holidays');

        container.innerHTML = Object.entries(holidays).map(([holiday, familyTraditions]) => `
            <div class="tradition-category">
                <div class="tradition-title">${holiday}</div>
                <div class="tradition-family">
                    <span class="tradition-family-name">${this.currentFamily.charAt(0).toUpperCase() + this.currentFamily.slice(1)} Family:</span>
                    ${familyTraditions[this.currentFamily] || 'No specific traditions recorded'}
                </div>
            </div>
        `).join('');
    }

    clearContent() {
        const containers = [
            '.family-overview',
            '.relationship-map',
            '.family-events',
            '.family-traditions'
        ];

        containers.forEach(selector => {
            const container = this.widget.querySelector(selector);
            if (container) {
                container.innerHTML = '<div style="text-align: center; color: #6b7280; font-size: 12px; padding: 20px;">Select a family to view details</div>';
            }
        });
    }

    startFamilyUpdates() {
        // Simulate family dynamics changes
        setInterval(() => {
            this.simulateFamilyDynamics();
        }, 240000); // Every 4 minutes
    }

    simulateFamilyDynamics() {
        const activities = [
            () => {
                // Update family member moods
                const families = Array.from(this.families.values());
                const randomFamily = families[Math.floor(Math.random() * families.length)];
                const members = Object.values(randomFamily.members);
                const randomMember = members[Math.floor(Math.random() * members.length)];

                const moods = [
                    'Content with family life',
                    'Stressed about work',
                    'Excited about weekend plans',
                    'Worried about family issues',
                    'Happy and relaxed',
                    'Dealing with personal drama'
                ];

                randomMember.currentMood = moods[Math.floor(Math.random() * moods.length)];
            },
            () => {
                // Update family drama
                const dramas = [
                    'Planning a family vacation that will probably go wrong',
                    'Dealing with financial pressures',
                    'Navigating teenager rebellion phase',
                    'Coping with work-life balance issues',
                    'Managing extended family relationships'
                ];

                const families = Array.from(this.families.values());
                const randomFamily = families[Math.floor(Math.random() * families.length)];

                if (Math.random() < 0.3) {
                    randomFamily.currentDrama = dramas[Math.floor(Math.random() * dramas.length)];
                }
            },
            () => {
                // Add random family event
                const eventTypes = [
                    'Family Game Night Disaster',
                    'Unexpected Visitor Arrival',
                    'Household Appliance Breakdown',
                    'Pet-Related Emergency',
                    'School Conference Drama'
                ];

                if (Math.random() < 0.2) {
                    const families = Array.from(this.families.keys());
                    const randomFamily = families[Math.floor(Math.random() * families.length)];
                    const newEvent = {
                        family: randomFamily,
                        event: eventTypes[Math.floor(Math.random() * eventTypes.length)],
                        description: 'A new family situation has developed that requires attention.',
                        impact: 'Medium stress, typical family chaos',
                        participants: ['Various family members'],
                        outcome: 'Will probably work out somehow'
                    };

                    this.familyEvents.unshift(newEvent);
                    if (this.familyEvents.length > 10) {
                        this.familyEvents.pop();
                    }
                }
            }
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        randomActivity();

        // Update display if currently viewing affected family
        if (this.currentFamily && this.isVisible) {
            this.updateContent();
        }
    }
}

// Initialize Family Dynamics System
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (!window.familySystem) {
            new FamilyDynamicsSystem();
        }
    }, 2000);
});
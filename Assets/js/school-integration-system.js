class SouthParkElementaryIntegration {
    constructor() {
        this.studentProfiles = new Map();
        this.classSchedules = new Map();
        this.schoolEvents = [];
        this.academicRecords = new Map();
        this.teacherProfiles = new Map();
        this.cafeteriaMenu = [];
        this.schoolAnnouncements = [];
        this.widget = null;
        this.isVisible = false;

        this.initializeSchoolData();
        this.createWidget();
        this.startSchoolUpdates();
    }

    initializeSchoolData() {
        // Initialize student data
        this.studentProfiles.set('stan-marsh', {
            name: 'Stan Marsh',
            grade: '4th Grade',
            class: 'Mr. Garrison\'s Class',
            gpa: 3.2,
            subjects: {
                'Math': 'B',
                'English': 'B+',
                'Science': 'A-',
                'Social Studies': 'B',
                'Art': 'C+',
                'PE': 'A'
            },
            behavior: 'Generally well-behaved, occasional leadership issues',
            extracurriculars: ['Football Team', 'School Newspaper'],
            parentContact: 'Randy & Sharon Marsh'
        });

        this.studentProfiles.set('kyle-broflovski', {
            name: 'Kyle Broflovski',
            grade: '4th Grade',
            class: 'Mr. Garrison\'s Class',
            gpa: 3.9,
            subjects: {
                'Math': 'A',
                'English': 'A',
                'Science': 'A',
                'Social Studies': 'A',
                'Art': 'B+',
                'PE': 'B'
            },
            behavior: 'Excellent student, very vocal about social issues',
            extracurriculars: ['Debate Team', 'Student Council'],
            parentContact: 'Gerald & Sheila Broflovski'
        });

        this.studentProfiles.set('eric-cartman', {
            name: 'Eric Cartman',
            grade: '4th Grade',
            class: 'Mr. Garrison\'s Class',
            gpa: 2.1,
            subjects: {
                'Math': 'D+',
                'English': 'C-',
                'Science': 'F',
                'Social Studies': 'D',
                'Art': 'B',
                'PE': 'F'
            },
            behavior: 'Frequent disciplinary issues, requires constant supervision',
            extracurriculars: ['None (Banned from most activities)'],
            parentContact: 'Liane Cartman',
            specialNotes: 'Multiple restraining orders on file'
        });

        this.studentProfiles.set('kenny-mccormick', {
            name: 'Kenny McCormick',
            grade: '4th Grade',
            class: 'Mr. Garrison\'s Class',
            gpa: 2.8,
            subjects: {
                'Math': 'C',
                'English': 'C+',
                'Science': 'B-',
                'Social Studies': 'C',
                'Art': 'B+',
                'PE': 'C'
            },
            behavior: 'Quiet student, frequent absences due to "family emergencies"',
            extracurriculars: ['None'],
            parentContact: 'Stuart & Carol McCormick',
            specialNotes: 'Eligible for free lunch program'
        });

        // Teacher profiles
        this.teacherProfiles.set('mr-garrison', {
            name: 'Mr. Herbert Garrison',
            subject: '4th Grade - All Subjects',
            yearsExperience: 15,
            education: 'University of Colorado - Education',
            teachingStyle: 'Traditional with occasional controversial tangents',
            classroomRules: [
                'No talking without raising hand',
                'Homework due every Friday',
                'No discussions about current events unless I bring them up',
                'Mkay is not an acceptable response'
            ],
            specialNotes: 'Has undergone several identity changes over the years'
        });

        this.teacherProfiles.set('mr-mackey', {
            name: 'Mr. Mackey',
            subject: 'School Counselor',
            yearsExperience: 12,
            education: 'Colorado State - Psychology',
            specialization: 'Student counseling and drug prevention',
            catchphrase: 'Drugs are bad, mkay?',
            officeHours: 'Monday-Friday, 9:00 AM - 3:00 PM'
        });

        this.teacherProfiles.set('chef', {
            name: 'Chef',
            subject: 'Cafeteria Manager & Life Counselor',
            yearsExperience: 8,
            specialization: 'Cooking and giving inappropriate life advice to children',
            favoriteRecipes: ['Salisbury Steak', 'Chocolate Salty Balls', 'Sweet & Sour Pork'],
            musicCareer: 'Part-time soul singer'
        });

        // Class schedule
        this.classSchedules.set('4th-grade', {
            monday: [
                { time: '8:00-8:45', subject: 'Math', teacher: 'Mr. Garrison' },
                { time: '8:45-9:30', subject: 'English', teacher: 'Mr. Garrison' },
                { time: '9:30-9:45', subject: 'Recess', teacher: 'Playground Duty' },
                { time: '9:45-10:30', subject: 'Science', teacher: 'Mr. Garrison' },
                { time: '10:30-11:15', subject: 'Social Studies', teacher: 'Mr. Garrison' },
                { time: '11:15-12:00', subject: 'Lunch', teacher: 'Chef' },
                { time: '12:00-12:45', subject: 'Art', teacher: 'Ms. Choksondik' },
                { time: '12:45-1:30', subject: 'PE', teacher: 'Coach' },
                { time: '1:30-2:15', subject: 'Study Hall', teacher: 'Mr. Garrison' },
                { time: '2:15-3:00', subject: 'Free Time', teacher: 'Mr. Garrison' }
            ]
        });

        // Cafeteria menu
        this.cafeteriaMenu = [
            {
                day: 'Monday',
                lunch: 'Chef\'s Famous Salisbury Steak',
                sides: ['Mashed Potatoes', 'Green Beans', 'Dinner Roll'],
                dessert: 'Chocolate Pudding',
                beverage: 'Milk or Juice',
                chefNote: 'Hello there, children! This will make you want to sing!'
            },
            {
                day: 'Tuesday',
                lunch: 'Sloppy Joes',
                sides: ['French Fries', 'Coleslaw', 'Pickle'],
                dessert: 'Apple Slices',
                beverage: 'Milk or Water',
                chefNote: 'A South Park classic, just like Chef!'
            },
            {
                day: 'Wednesday',
                lunch: 'Pizza Day',
                sides: ['Corn', 'Salad Bar', 'Breadsticks'],
                dessert: 'Ice Cream Sandwich',
                beverage: 'Milk or Juice',
                chefNote: 'Children, this pizza will make you feel good!'
            }
        ];

        // School announcements
        this.schoolAnnouncements = [
            {
                title: 'Mandatory Drug Awareness Assembly',
                content: 'Mr. Mackey will be hosting a special assembly about the dangers of drugs. Attendance is mandatory. Mkay?',
                date: 'This Friday',
                priority: 'high',
                author: 'Mr. Mackey'
            },
            {
                title: 'Picture Day Postponed',
                content: 'School picture day has been postponed due to the photographer having a nervous breakdown after yesterday\'s incident with Cartman.',
                date: 'TBD',
                priority: 'medium',
                author: 'Principal Victoria'
            },
            {
                title: 'New Cafeteria Safety Rules',
                content: 'Due to recent events, students are no longer allowed to bring their own hot sauce to the cafeteria. Chef\'s cooking is spicy enough!',
                date: 'Effective Immediately',
                priority: 'low',
                author: 'Chef'
            }
        ];

        // School events
        this.schoolEvents = [
            {
                title: 'Parent-Teacher Conferences',
                date: 'Next Wednesday',
                time: '6:00 PM - 9:00 PM',
                location: 'Individual Classrooms',
                description: 'Meet with teachers to discuss your child\'s progress. Please bring appropriate restraints if your child is Eric Cartman.'
            },
            {
                title: 'Science Fair',
                date: 'Next Friday',
                time: '7:00 PM',
                location: 'School Gymnasium',
                description: 'Students will present their science projects. Warning: Some projects may involve dangerous experiments.'
            },
            {
                title: 'Thanksgiving Play',
                date: 'November 25th',
                time: '2:00 PM',
                location: 'School Auditorium',
                description: 'The traditional Thanksgiving play. This year\'s theme: "Why Thanksgiving is Problematic" - A Kyle Broflovski Production'
            }
        ];
    }

    createWidget() {
        this.widget = document.createElement('div');
        this.widget.id = 'school-integration-widget';
        this.widget.innerHTML = `
            <div class="school-header" onclick="window.schoolSystem.toggleWidget()">
                <span class="school-icon">🏫</span>
                <span class="school-title">South Park Elementary</span>
                <span class="grade-indicator">Grade 4</span>
                <span class="toggle-arrow">▼</span>
            </div>
            <div class="school-content" style="display: none;">
                <div class="school-tabs">
                    <button class="school-tab active" onclick="window.schoolSystem.showTab('grades')">📊 Grades</button>
                    <button class="school-tab" onclick="window.schoolSystem.showTab('schedule')">📅 Schedule</button>
                    <button class="school-tab" onclick="window.schoolSystem.showTab('cafeteria')">🍽️ Cafeteria</button>
                    <button class="school-tab" onclick="window.schoolSystem.showTab('announcements')">📢 News</button>
                    <button class="school-tab" onclick="window.schoolSystem.showTab('events')">🎭 Events</button>
                </div>
                <div class="school-content-area">
                    <div id="grades-tab" class="school-tab-content active">
                        <div class="student-selector">
                            <select onchange="window.schoolSystem.selectStudent(this.value)">
                                <option value="">Select a student...</option>
                            </select>
                        </div>
                        <div class="student-info"></div>
                    </div>
                    <div id="schedule-tab" class="school-tab-content">
                        <div class="class-schedule"></div>
                    </div>
                    <div id="cafeteria-tab" class="school-tab-content">
                        <div class="cafeteria-info"></div>
                    </div>
                    <div id="announcements-tab" class="school-tab-content">
                        <div class="school-announcements"></div>
                    </div>
                    <div id="events-tab" class="school-tab-content">
                        <div class="school-events"></div>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const styles = `
            <style>
            #school-integration-widget {
                position: fixed;
                top: 200px;
                left: 20px;
                width: 340px;
                background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
                border: 2px solid #fbbf24;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                font-family: 'Arial', sans-serif;
                z-index: 1000;
                max-height: 80vh;
                overflow: hidden;
            }

            .school-header {
                background: linear-gradient(90deg, #dc2626 0%, #b91c1c 100%);
                color: white;
                padding: 12px 15px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: bold;
                user-select: none;
            }

            .school-icon {
                font-size: 18px;
            }

            .school-title {
                flex: 1;
                font-size: 14px;
            }

            .grade-indicator {
                background: rgba(255,255,255,0.2);
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 10px;
            }

            .toggle-arrow {
                font-size: 12px;
                transition: transform 0.3s;
            }

            .school-content.visible .toggle-arrow {
                transform: rotate(180deg);
            }

            .school-content {
                background: white;
                max-height: 500px;
                overflow-y: auto;
            }

            .school-tabs {
                display: flex;
                background: #f3f4f6;
                border-bottom: 2px solid #e5e7eb;
                flex-wrap: wrap;
            }

            .school-tab {
                flex: 1;
                min-width: 60px;
                padding: 8px 4px;
                border: none;
                background: none;
                cursor: pointer;
                font-size: 10px;
                font-weight: bold;
                color: #666;
                transition: all 0.3s;
            }

            .school-tab.active {
                background: white;
                color: #1e40af;
                border-bottom: 2px solid #1e40af;
            }

            .school-tab:hover {
                background: #e5e7eb;
            }

            .school-tab-content {
                display: none;
                padding: 15px;
            }

            .school-tab-content.active {
                display: block;
            }

            .student-selector select {
                width: 100%;
                padding: 8px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 12px;
                margin-bottom: 15px;
            }

            .student-card {
                background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                border: 1px solid #0ea5e9;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 10px;
            }

            .student-name {
                font-weight: bold;
                font-size: 16px;
                color: #0c4a6e;
                margin-bottom: 5px;
            }

            .student-details {
                font-size: 12px;
                line-height: 1.4;
            }

            .grade-display {
                font-size: 24px;
                font-weight: bold;
                color: #059669;
                text-align: center;
                margin: 10px 0;
            }

            .subjects-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
                margin: 10px 0;
            }

            .subject-grade {
                background: white;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                padding: 6px;
                text-align: center;
                font-size: 11px;
            }

            .subject-grade.grade-a {
                background: #dcfce7;
                border-color: #16a34a;
                color: #15803d;
            }

            .subject-grade.grade-b {
                background: #dbeafe;
                border-color: #2563eb;
                color: #1d4ed8;
            }

            .subject-grade.grade-c {
                background: #fef3c7;
                border-color: #d97706;
                color: #92400e;
            }

            .subject-grade.grade-d {
                background: #fed7d7;
                border-color: #dc2626;
                color: #b91c1c;
            }

            .subject-grade.grade-f {
                background: #fecaca;
                border-color: #dc2626;
                color: #991b1b;
                font-weight: bold;
            }

            .schedule-day {
                background: #f9fafb;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 10px;
            }

            .schedule-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5px 0;
                border-bottom: 1px solid #e5e7eb;
                font-size: 11px;
            }

            .schedule-item:last-child {
                border-bottom: none;
            }

            .schedule-time {
                font-weight: bold;
                color: #374151;
            }

            .schedule-subject {
                color: #1e40af;
                font-weight: 600;
            }

            .menu-card {
                background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
                border: 1px solid #ea580c;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 10px;
            }

            .menu-day {
                font-weight: bold;
                font-size: 14px;
                color: #9a3412;
                margin-bottom: 8px;
            }

            .menu-main {
                font-size: 13px;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 5px;
            }

            .menu-sides {
                font-size: 11px;
                color: #6b7280;
                margin-bottom: 5px;
            }

            .chef-note {
                background: #fef2f2;
                border-left: 3px solid #dc2626;
                padding: 6px;
                font-size: 10px;
                font-style: italic;
                color: #7f1d1d;
                margin-top: 8px;
            }

            .announcement-card {
                background: #fffbeb;
                border: 1px solid #f59e0b;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 10px;
            }

            .announcement-card.high-priority {
                border-color: #dc2626;
                background: #fef2f2;
            }

            .announcement-title {
                font-weight: bold;
                font-size: 13px;
                color: #92400e;
                margin-bottom: 5px;
            }

            .announcement-content {
                font-size: 12px;
                line-height: 1.4;
                margin-bottom: 8px;
            }

            .announcement-footer {
                display: flex;
                justify-content: space-between;
                font-size: 10px;
                color: #6b7280;
            }

            .event-card {
                background: linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%);
                border: 1px solid #2563eb;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 10px;
            }

            .event-title {
                font-weight: bold;
                font-size: 13px;
                color: #1e40af;
                margin-bottom: 5px;
            }

            .event-details {
                font-size: 11px;
                color: #374151;
                margin-bottom: 3px;
            }

            .event-description {
                font-size: 12px;
                line-height: 1.4;
                color: #4b5563;
                margin-top: 8px;
            }

            @media (max-width: 768px) {
                #school-integration-widget {
                    width: calc(100% - 40px);
                    left: 20px;
                }
            }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.appendChild(this.widget);

        this.updateContent();
        window.schoolSystem = this;
    }

    toggleWidget() {
        const content = this.widget.querySelector('.school-content');
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
        document.querySelectorAll('.school-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.school-tab-content').forEach(content => content.classList.remove('active'));

        // Show selected tab
        document.querySelector(`[onclick="window.schoolSystem.showTab('${tabName}')"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.updateContent();
    }

    updateContent() {
        this.updateStudentSelector();
        this.updateScheduleDisplay();
        this.updateCafeteriaDisplay();
        this.updateAnnouncementsDisplay();
        this.updateEventsDisplay();
    }

    updateStudentSelector() {
        const selector = this.widget.querySelector('.student-selector select');
        if (!selector) return;

        const students = Array.from(this.studentProfiles.values());
        selector.innerHTML = '<option value="">Select a student...</option>' +
            students.map(student => `<option value="${student.name.toLowerCase().replace(' ', '-')}">${student.name}</option>`).join('');
    }

    selectStudent(studentKey) {
        const studentInfo = this.widget.querySelector('.student-info');
        if (!studentInfo || !studentKey) {
            studentInfo.innerHTML = '';
            return;
        }

        const student = this.studentProfiles.get(studentKey);
        if (!student) return;

        const gpaColor = student.gpa >= 3.5 ? '#059669' : student.gpa >= 2.5 ? '#d97706' : '#dc2626';

        studentInfo.innerHTML = `
            <div class="student-card">
                <div class="student-name">${student.name}</div>
                <div class="student-details">
                    <strong>Class:</strong> ${student.class}<br>
                    <strong>Parent Contact:</strong> ${student.parentContact}
                </div>
                <div class="grade-display" style="color: ${gpaColor}">
                    GPA: ${student.gpa}
                </div>
                <div class="subjects-grid">
                    ${Object.entries(student.subjects).map(([subject, grade]) => {
                        const gradeClass = `grade-${grade.charAt(0).toLowerCase()}`;
                        return `<div class="subject-grade ${gradeClass}">
                            <strong>${subject}</strong><br>${grade}
                        </div>`;
                    }).join('')}
                </div>
                <div class="student-details">
                    <strong>Behavior:</strong> ${student.behavior}<br>
                    <strong>Activities:</strong> ${student.extracurriculars.join(', ')}
                    ${student.specialNotes ? `<br><strong>Notes:</strong> ${student.specialNotes}` : ''}
                </div>
            </div>
        `;
    }

    updateScheduleDisplay() {
        const container = this.widget.querySelector('.class-schedule');
        if (!container) return;

        const schedule = this.classSchedules.get('4th-grade');
        if (!schedule) return;

        container.innerHTML = `
            <div class="schedule-day">
                <h4 style="margin: 0 0 10px 0; color: #1e40af;">Monday Schedule - 4th Grade</h4>
                ${schedule.monday.map(item => `
                    <div class="schedule-item">
                        <span class="schedule-time">${item.time}</span>
                        <span class="schedule-subject">${item.subject}</span>
                        <span style="font-size: 10px; color: #6b7280;">${item.teacher}</span>
                    </div>
                `).join('')}
            </div>
            <div style="text-align: center; margin-top: 10px; font-size: 11px; color: #6b7280;">
                Schedule repeats Tuesday-Friday with minor variations
            </div>
        `;
    }

    updateCafeteriaDisplay() {
        const container = this.widget.querySelector('.cafeteria-info');
        if (!container) return;

        container.innerHTML = this.cafeteriaMenu.map(menu => `
            <div class="menu-card">
                <div class="menu-day">${menu.day}</div>
                <div class="menu-main">🍽️ ${menu.lunch}</div>
                <div class="menu-sides">Sides: ${menu.sides.join(', ')}</div>
                <div class="menu-sides">Dessert: ${menu.dessert} | Beverage: ${menu.beverage}</div>
                <div class="chef-note">
                    🎵 Chef says: "${menu.chefNote}"
                </div>
            </div>
        `).join('');
    }

    updateAnnouncementsDisplay() {
        const container = this.widget.querySelector('.school-announcements');
        if (!container) return;

        container.innerHTML = this.schoolAnnouncements.map(announcement => `
            <div class="announcement-card ${announcement.priority}-priority">
                <div class="announcement-title">${announcement.title}</div>
                <div class="announcement-content">${announcement.content}</div>
                <div class="announcement-footer">
                    <span>📅 ${announcement.date}</span>
                    <span>👨‍🏫 ${announcement.author}</span>
                </div>
            </div>
        `).join('');
    }

    updateEventsDisplay() {
        const container = this.widget.querySelector('.school-events');
        if (!container) return;

        container.innerHTML = this.schoolEvents.map(event => `
            <div class="event-card">
                <div class="event-title">${event.title}</div>
                <div class="event-details">📅 ${event.date}</div>
                <div class="event-details">🕒 ${event.time}</div>
                <div class="event-details">📍 ${event.location}</div>
                <div class="event-description">${event.description}</div>
            </div>
        `).join('');
    }

    startSchoolUpdates() {
        // Simulate school day activities
        setInterval(() => {
            this.simulateSchoolActivity();
        }, 180000); // Every 3 minutes
    }

    simulateSchoolActivity() {
        const activities = [
            () => {
                // Random grade updates
                const students = Array.from(this.studentProfiles.values());
                const randomStudent = students[Math.floor(Math.random() * students.length)];
                const subjects = Object.keys(randomStudent.subjects);
                const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

                // Slight grade fluctuation
                const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];
                const currentGradeIndex = grades.indexOf(randomStudent.subjects[randomSubject]);
                const newGradeIndex = Math.max(0, Math.min(grades.length - 1,
                    currentGradeIndex + (Math.random() > 0.5 ? 1 : -1)));

                randomStudent.subjects[randomSubject] = grades[newGradeIndex];

                // Recalculate GPA
                this.calculateGPA(randomStudent);
            },
            () => {
                // New school announcement
                const announcements = [
                    {
                        title: 'Fire Drill Scheduled',
                        content: 'Fire drill will be conducted today at 2:00 PM. Please exit in an orderly fashion and do not panic like last time.',
                        date: 'Today',
                        priority: 'medium',
                        author: 'Principal Victoria'
                    },
                    {
                        title: 'Lost and Found Overflow',
                        content: 'The lost and found is overflowing again. Unclaimed items will be donated to Kenny\'s family.',
                        date: 'This Week',
                        priority: 'low',
                        author: 'Janitor'
                    }
                ];

                if (Math.random() < 0.4) {
                    const newAnnouncement = announcements[Math.floor(Math.random() * announcements.length)];
                    this.schoolAnnouncements.unshift(newAnnouncement);
                    if (this.schoolAnnouncements.length > 5) {
                        this.schoolAnnouncements.pop();
                    }
                    this.updateAnnouncementsDisplay();
                }
            }
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        randomActivity();
    }

    calculateGPA(student) {
        const gradePoints = {
            'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0
        };

        const grades = Object.values(student.subjects);
        const totalPoints = grades.reduce((sum, grade) => sum + (gradePoints[grade] || 0), 0);
        student.gpa = Math.round((totalPoints / grades.length) * 100) / 100;
    }
}

// Initialize School Integration System
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (!window.schoolSystem) {
            new SouthParkElementaryIntegration();
        }
    }, 1500);
});
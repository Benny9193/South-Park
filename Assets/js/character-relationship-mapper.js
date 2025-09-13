/**
 * South Park Facebook Profiles - Character Relationship Mapper
 * Interactive visualization of character relationships and social networks
 */

class CharacterRelationshipMapper {
    constructor() {
        this.characters = new Map();
        this.relationships = new Map();
        this.relationshipHistory = new Map();
        this.canvas = null;
        this.ctx = null;
        this.nodes = [];
        this.edges = [];
        this.selectedNode = null;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.scale = 1;
        this.panOffset = { x: 0, y: 0 };
        this.animationFrame = null;
        this.initializeCharacters();
        this.initializeRelationships();
    }

    initializeCharacters() {
        // Main Characters
        this.addCharacter('cartman', {
            name: 'Eric Cartman',
            color: '#FF4444',
            position: { x: 0, y: 0 },
            traits: ['manipulative', 'scheming', 'self-centered', 'entrepreneurial'],
            group: 'main_four'
        });

        this.addCharacter('kyle', {
            name: 'Kyle Broflovski',
            color: '#44AA44',
            position: { x: 100, y: 0 },
            traits: ['moral', 'intelligent', 'passionate', 'argumentative'],
            group: 'main_four'
        });

        this.addCharacter('stan', {
            name: 'Stan Marsh',
            color: '#4444FF',
            position: { x: 50, y: 100 },
            traits: ['normal', 'voice_of_reason', 'loyal', 'confused'],
            group: 'main_four'
        });

        this.addCharacter('kenny', {
            name: 'Kenny McCormick',
            color: '#FF8800',
            position: { x: 150, y: 100 },
            traits: ['poor', 'mysterious', 'heroic', 'immortal'],
            group: 'main_four'
        });

        // Supporting Students
        this.addCharacter('butters', {
            name: 'Butters Stotch',
            color: '#FFDD44',
            position: { x: -50, y: 150 },
            traits: ['innocent', 'naive', 'optimistic', 'exploitable'],
            group: 'students'
        });

        this.addCharacter('wendy', {
            name: 'Wendy Testaburger',
            color: '#FF69B4',
            position: { x: 200, y: 50 },
            traits: ['activist', 'intelligent', 'leadership', 'passionate'],
            group: 'students'
        });

        this.addCharacter('craig', {
            name: 'Craig Tucker',
            color: '#666666',
            position: { x: 300, y: 100 },
            traits: ['apathetic', 'sarcastic', 'loyal', 'unemotional'],
            group: 'students'
        });

        this.addCharacter('tweek', {
            name: 'Tweek Tweak',
            color: '#FFAA00',
            position: { x: 350, y: 150 },
            traits: ['anxious', 'paranoid', 'caffeinated', 'sensitive'],
            group: 'students'
        });

        this.addCharacter('jimmy', {
            name: 'Jimmy Valmer',
            color: '#FF6B35',
            position: { x: 100, y: 200 },
            traits: ['comedic', 'confident', 'competitive', 'talented'],
            group: 'students'
        });

        this.addCharacter('timmy', {
            name: 'Timmy Burch',
            color: '#2196F3',
            position: { x: 150, y: 250 },
            traits: ['enthusiastic', 'loyal', 'competitive', 'positive'],
            group: 'students'
        });

        // Adults
        this.addCharacter('randy', {
            name: 'Randy Marsh',
            color: '#9C27B0',
            position: { x: 50, y: -100 },
            traits: ['obsessive', 'dramatic', 'irresponsible', 'trendy'],
            group: 'adults'
        });

        this.addCharacter('sharon', {
            name: 'Sharon Marsh',
            color: '#9370DB',
            position: { x: 100, y: -100 },
            traits: ['realistic', 'patient', 'professional', 'wine_lover'],
            group: 'adults'
        });

        this.addCharacter('gerald', {
            name: 'Gerald Broflovski',
            color: '#8B4513',
            position: { x: 150, y: -50 },
            traits: ['lawyer', 'secretive', 'proud', 'internet_troll'],
            group: 'adults'
        });

        this.addCharacter('sheila', {
            name: 'Sheila Broflovski',
            color: '#FF1493',
            position: { x: 200, y: -50 },
            traits: ['protective', 'activist', 'outraged', 'helicopter_parent'],
            group: 'adults'
        });

        this.addCharacter('liane', {
            name: 'Liane Cartman',
            color: '#FFB6C1',
            position: { x: -50, y: -50 },
            traits: ['enabler', 'promiscuous', 'naive', 'loving'],
            group: 'adults'
        });
    }

    initializeRelationships() {
        // Main Four Dynamics
        this.addRelationship('stan', 'kyle', {
            type: 'best_friends',
            strength: 10,
            history: ['Super Best Friends', 'Loyal through everything'],
            color: '#00AA00'
        });

        this.addRelationship('cartman', 'kyle', {
            type: 'enemies',
            strength: -10,
            history: ['Constant arguments', 'Business rivalry', 'Fundamental disagreements'],
            color: '#FF0000'
        });

        this.addRelationship('stan', 'cartman', {
            type: 'frenemies',
            strength: 3,
            history: ['Sometimes allies', 'Often disapproves of Cartman'],
            color: '#FFAA00'
        });

        this.addRelationship('kenny', 'cartman', {
            type: 'friends',
            strength: 6,
            history: ['Partners in schemes', 'Kenny often exploited'],
            color: '#FF6600'
        });

        // Romantic Relationships
        this.addRelationship('stan', 'wendy', {
            type: 'romantic',
            strength: 7,
            history: ['On/off relationship', 'Frequent breakups and makeups'],
            color: '#FF69B4'
        });

        this.addRelationship('craig', 'tweek', {
            type: 'romantic',
            strength: 9,
            history: ['Forced together', 'Grew into real relationship'],
            color: '#FF69B4'
        });

        // Best Friend Pairs
        this.addRelationship('jimmy', 'timmy', {
            type: 'best_friends',
            strength: 10,
            history: ['Comedy partnership', 'Mutual support', 'Competition turned friendship'],
            color: '#00AA00'
        });

        // Exploitation Relationships
        this.addRelationship('cartman', 'butters', {
            type: 'exploitation',
            strength: -3,
            history: ['Cartman uses Butters', 'Butters remains loyal'],
            color: '#FF8800'
        });

        // Family Relationships
        this.addRelationship('stan', 'randy', {
            type: 'family',
            strength: 5,
            history: ['Father-son embarrassment', 'Love despite Randy\'s antics'],
            color: '#9C27B0'
        });

        this.addRelationship('kyle', 'gerald', {
            type: 'family',
            strength: 8,
            history: ['Father-son respect', 'Kyle doesn\'t know about trolling'],
            color: '#8B4513'
        });

        this.addRelationship('kyle', 'sheila', {
            type: 'family',
            strength: 7,
            history: ['Mother-son tension', 'Sheila\'s overprotectiveness'],
            color: '#FF1493'
        });

        this.addRelationship('cartman', 'liane', {
            type: 'family',
            strength: 9,
            history: ['Enabling relationship', 'Unconditional love'],
            color: '#FFB6C1'
        });

        // Student Relationships
        this.addRelationship('wendy', 'kyle', {
            type: 'allies',
            strength: 6,
            history: ['Shared activism', 'Academic collaboration'],
            color: '#4CAF50'
        });

        // Adult Relationships
        this.addRelationship('randy', 'sharon', {
            type: 'marriage',
            strength: 6,
            history: ['Married couple', 'Sharon\'s patience tested'],
            color: '#9370DB'
        });

        this.addRelationship('gerald', 'sheila', {
            type: 'marriage',
            strength: 8,
            history: ['Happy marriage', 'Shared Jewish identity'],
            color: '#FF1493'
        });
    }

    addCharacter(id, data) {
        this.characters.set(id, {
            id,
            ...data,
            connections: new Set()
        });
    }

    addRelationship(char1, char2, data) {
        const relationshipId = `${char1}-${char2}`;
        this.relationships.set(relationshipId, {
            id: relationshipId,
            from: char1,
            to: char2,
            ...data,
            created: new Date().toISOString()
        });

        // Update character connections
        if (this.characters.has(char1)) {
            this.characters.get(char1).connections.add(char2);
        }
        if (this.characters.has(char2)) {
            this.characters.get(char2).connections.add(char1);
        }
    }

    initializeCanvas(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error('Canvas element not found:', canvasId);
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.setupCanvasEvents();
        this.createNodes();
        this.createEdges();
        this.startAnimation();
    }

    setupCanvasEvents() {
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('wheel', (e) => this.handleWheel(e));
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
    }

    createNodes() {
        this.nodes = [];
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        for (const [id, character] of this.characters) {
            this.nodes.push({
                id,
                x: centerX + character.position.x,
                y: centerY + character.position.y,
                radius: Math.max(20, character.connections.size * 3 + 15),
                character,
                velocity: { x: 0, y: 0 }
            });
        }
    }

    createEdges() {
        this.edges = [];
        for (const [id, relationship] of this.relationships) {
            const fromNode = this.nodes.find(n => n.id === relationship.from);
            const toNode = this.nodes.find(n => n.id === relationship.to);
            
            if (fromNode && toNode) {
                this.edges.push({
                    from: fromNode,
                    to: toNode,
                    relationship
                });
            }
        }
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const clickedNode = this.nodes.find(node => {
            const dx = x - node.x;
            const dy = y - node.y;
            return Math.sqrt(dx * dx + dy * dy) <= node.radius;
        });

        if (clickedNode) {
            this.selectedNode = clickedNode;
            this.isDragging = true;
            this.dragOffset = {
                x: x - clickedNode.x,
                y: y - clickedNode.y
            };
        }
    }

    handleMouseMove(e) {
        if (this.isDragging && this.selectedNode) {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.selectedNode.x = x - this.dragOffset.x;
            this.selectedNode.y = y - this.dragOffset.y;
        }
    }

    handleMouseUp(e) {
        this.isDragging = false;
        this.selectedNode = null;
    }

    handleWheel(e) {
        e.preventDefault();
        const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
        this.scale *= scaleFactor;
        this.scale = Math.max(0.1, Math.min(3, this.scale));
    }

    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const clickedNode = this.nodes.find(node => {
            const dx = x - node.x;
            const dy = y - node.y;
            return Math.sqrt(dx * dx + dy * dy) <= node.radius;
        });

        if (clickedNode) {
            this.showCharacterDetails(clickedNode);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();

        // Apply transformations
        this.ctx.scale(this.scale, this.scale);
        this.ctx.translate(this.panOffset.x, this.panOffset.y);

        // Draw edges first
        this.drawEdges();
        
        // Draw nodes
        this.drawNodes();
        
        // Draw labels
        this.drawLabels();

        this.ctx.restore();

        // Draw UI elements
        this.drawLegend();
        this.drawControls();
    }

    drawEdges() {
        for (const edge of this.edges) {
            const { from, to, relationship } = edge;
            
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            
            // Style based on relationship type
            this.ctx.strokeStyle = relationship.color;
            this.ctx.lineWidth = Math.max(1, Math.abs(relationship.strength) / 2);
            
            if (relationship.strength < 0) {
                this.ctx.setLineDash([5, 5]); // Dashed for negative relationships
            } else {
                this.ctx.setLineDash([]);
            }
            
            this.ctx.stroke();

            // Draw relationship strength indicator
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            
            this.ctx.fillStyle = relationship.color;
            this.ctx.font = '10px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(relationship.type, midX, midY);
        }
    }

    drawNodes() {
        for (const node of this.nodes) {
            // Draw connection strength ring
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius + 3, 0, 2 * Math.PI);
            this.ctx.strokeStyle = node.character.color;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Draw main node
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
            this.ctx.fillStyle = node.character.color;
            this.ctx.fill();
            
            // Highlight selected node
            if (this.selectedNode === node) {
                this.ctx.strokeStyle = '#FFD700';
                this.ctx.lineWidth = 3;
                this.ctx.stroke();
            }

            // Draw character initial
            this.ctx.fillStyle = 'white';
            this.ctx.font = `${node.radius / 2}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                node.character.name.split(' ').map(n => n[0]).join(''),
                node.x,
                node.y + 5
            );
        }
    }

    drawLabels() {
        for (const node of this.nodes) {
            this.ctx.fillStyle = '#333';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                node.character.name,
                node.x,
                node.y - node.radius - 10
            );
        }
    }

    drawLegend() {
        const legendX = 10;
        let legendY = 10;
        
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.fillRect(legendX, legendY, 200, 150);
        
        this.ctx.strokeStyle = '#ccc';
        this.ctx.strokeRect(legendX, legendY, 200, 150);
        
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Relationship Types:', legendX + 10, legendY + 20);
        
        const types = [
            { type: 'Best Friends', color: '#00AA00' },
            { type: 'Enemies', color: '#FF0000' },
            { type: 'Romantic', color: '#FF69B4' },
            { type: 'Family', color: '#9C27B0' },
            { type: 'Frenemies', color: '#FFAA00' }
        ];
        
        types.forEach((item, index) => {
            const y = legendY + 40 + index * 20;
            
            this.ctx.fillStyle = item.color;
            this.ctx.fillRect(legendX + 10, y - 5, 10, 10);
            
            this.ctx.fillStyle = '#333';
            this.ctx.font = '12px Arial';
            this.ctx.fillText(item.type, legendX + 30, y + 3);
        });
    }

    drawControls() {
        const controlsX = this.canvas.width - 150;
        const controlsY = 10;
        
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.fillRect(controlsX, controlsY, 140, 100);
        
        this.ctx.strokeStyle = '#ccc';
        this.ctx.strokeRect(controlsX, controlsY, 140, 100);
        
        this.ctx.fillStyle = '#333';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Controls:', controlsX + 10, controlsY + 20);
        this.ctx.fillText('• Click: Select character', controlsX + 10, controlsY + 40);
        this.ctx.fillText('• Drag: Move character', controlsX + 10, controlsY + 55);
        this.ctx.fillText('• Scroll: Zoom in/out', controlsX + 10, controlsY + 70);
        this.ctx.fillText('• Node size = connections', controlsX + 10, controlsY + 85);
    }

    showCharacterDetails(node) {
        const character = node.character;
        const connections = Array.from(character.connections);
        const relationships = this.getCharacterRelationships(character.id);

        const detailsHTML = `
            <div class="character-details">
                <h3>${character.name}</h3>
                <p><strong>Traits:</strong> ${character.traits.join(', ')}</p>
                <p><strong>Connections:</strong> ${connections.length}</p>
                <div class="relationships">
                    <h4>Relationships:</h4>
                    ${relationships.map(rel => `
                        <div class="relationship-item">
                            <span style="color: ${rel.color}">${rel.type}</span> 
                            with ${this.characters.get(rel.from === character.id ? rel.to : rel.from)?.name}
                            (Strength: ${rel.strength})
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Create or update details panel
        let detailsPanel = document.getElementById('character-details-panel');
        if (!detailsPanel) {
            detailsPanel = document.createElement('div');
            detailsPanel.id = 'character-details-panel';
            detailsPanel.style.cssText = `
                position: absolute;
                top: 10px;
                left: 250px;
                width: 300px;
                background: white;
                border: 1px solid #ccc;
                border-radius: 8px;
                padding: 15px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                z-index: 1000;
            `;
            this.canvas.parentNode.appendChild(detailsPanel);
        }
        
        detailsPanel.innerHTML = detailsHTML;
    }

    getCharacterRelationships(characterId) {
        const relationships = [];
        for (const [id, relationship] of this.relationships) {
            if (relationship.from === characterId || relationship.to === characterId) {
                relationships.push(relationship);
            }
        }
        return relationships;
    }

    startAnimation() {
        const animate = () => {
            this.draw();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    stopAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    // Public API methods
    focusOnCharacter(characterId) {
        const node = this.nodes.find(n => n.id === characterId);
        if (node) {
            this.showCharacterDetails(node);
            // Center the view on this character
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            this.panOffset.x = centerX - node.x;
            this.panOffset.y = centerY - node.y;
        }
    }

    filterByRelationshipType(type) {
        this.edges = this.edges.filter(edge => edge.relationship.type === type);
    }

    resetView() {
        this.scale = 1;
        this.panOffset = { x: 0, y: 0 };
        this.createEdges(); // Reset filtered edges
    }

    exportRelationshipData() {
        return {
            characters: Object.fromEntries(this.characters),
            relationships: Object.fromEntries(this.relationships)
        };
    }
}

// Create global instance
window.relationshipMapper = new CharacterRelationshipMapper();

// Global helper functions
function initializeRelationshipMapper(canvasId) {
    window.relationshipMapper.initializeCanvas(canvasId);
}

function focusCharacter(characterId) {
    window.relationshipMapper.focusOnCharacter(characterId);
}

function filterRelationships(type) {
    if (type === 'all') {
        window.relationshipMapper.resetView();
    } else {
        window.relationshipMapper.filterByRelationshipType(type);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CharacterRelationshipMapper;
}
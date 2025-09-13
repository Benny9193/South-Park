/**
 * South Park Facebook Profiles - Advanced Particle Effects System
 * Creates dynamic particle effects for character interactions and background ambiance
 */

class ParticleEffectsSystem {
    constructor() {
        this.particles = [];
        this.particlePool = [];
        this.maxParticles = 100;
        this.isActive = true;
        this.performanceMode = false;
        
        this.canvas = null;
        this.ctx = null;
        
        this.initializeSystem();
        this.startAnimationLoop();
    }

    initializeSystem() {
        // Create canvas for particle rendering
        this.createParticleCanvas();
        
        // Initialize particle pool for performance
        this.initializeParticlePool();
        
        // Setup performance monitoring
        this.setupPerformanceMonitoring();
        
        console.log('Particle Effects System initialized');
    }

    createParticleCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            mix-blend-mode: multiply;
        `;
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        document.body.appendChild(this.canvas);
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initializeParticlePool() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particlePool.push(this.createParticleObject());
        }
    }

    createParticleObject() {
        return {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            size: 1,
            life: 1,
            maxLife: 1,
            color: '#ffffff',
            type: 'default',
            rotation: 0,
            rotationSpeed: 0,
            gravity: 0,
            bounce: 0,
            trail: [],
            active: false,
            character: null,
            emoji: null
        };
    }

    getParticleFromPool() {
        for (let particle of this.particlePool) {
            if (!particle.active) {
                return particle;
            }
        }
        return null; // Pool exhausted
    }

    createCharacterParticle(x, y, characterKey, particleType = 'hover') {
        if (!this.isActive || this.performanceMode) return;

        const particle = this.getParticleFromPool();
        if (!particle) return;

        // Character-specific particle configurations
        const configs = this.getCharacterParticleConfig(characterKey, particleType);
        
        // Apply configuration
        Object.assign(particle, configs.base, {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * configs.velocityRange,
            vy: -Math.random() * configs.upwardForce - 1,
            life: 1,
            maxLife: configs.lifetime,
            active: true,
            character: characterKey,
            trail: []
        });

        this.particles.push(particle);
    }

    getCharacterParticleConfig(characterKey, particleType) {
        const baseConfig = {
            velocityRange: 4,
            upwardForce: 3,
            lifetime: 180, // frames at 60fps = 3 seconds
            gravity: 0.05,
            bounce: 0.3
        };

        const characterConfigs = {
            'cartman': {
                base: {
                    emoji: ['💰', '🍔', '😈', '👑', '💎'][Math.floor(Math.random() * 5)],
                    color: '#FF4444',
                    size: Math.random() * 8 + 12,
                    rotationSpeed: (Math.random() - 0.5) * 0.2,
                    gravity: 0.03
                },
                business: {
                    emoji: '💰',
                    size: Math.random() * 6 + 14,
                    velocityRange: 6,
                    upwardForce: 5
                }
            },
            
            'kyle': {
                base: {
                    emoji: ['📚', '✊', '🎓', '⚖️', '🌟'][Math.floor(Math.random() * 5)],
                    color: '#44AA44',
                    size: Math.random() * 6 + 10,
                    rotationSpeed: (Math.random() - 0.5) * 0.15,
                    gravity: 0.04
                },
                justice: {
                    emoji: '✊',
                    color: '#FFD700',
                    size: Math.random() * 8 + 16,
                    upwardForce: 6
                }
            },
            
            'stan': {
                base: {
                    emoji: ['🎸', '😐', '🎵', '👥', '💙'][Math.floor(Math.random() * 5)],
                    color: '#4444FF',
                    size: Math.random() * 5 + 8,
                    rotationSpeed: (Math.random() - 0.5) * 0.1,
                    gravity: 0.06
                }
            },
            
            'kenny': {
                base: {
                    emoji: ['👻', '💀', '🧡', '🔥', '💫'][Math.floor(Math.random() * 5)],
                    color: '#FF8800',
                    size: Math.random() * 10 + 8,
                    rotationSpeed: (Math.random() - 0.5) * 0.3,
                    gravity: 0.02
                },
                death: {
                    emoji: '💀',
                    color: '#8B0000',
                    size: Math.random() * 12 + 20,
                    lifetime: 300,
                    velocityRange: 8
                },
                mysterion: {
                    emoji: '🦸‍♂️',
                    color: '#4B0082',
                    size: Math.random() * 8 + 16,
                    gravity: -0.02 // Float upward
                }
            },
            
            'tweek': {
                base: {
                    emoji: ['☕', '😰', '⚡', '💫', '🌀'][Math.floor(Math.random() * 5)],
                    color: '#FFAA00',
                    size: Math.random() * 12 + 6,
                    rotationSpeed: (Math.random() - 0.5) * 0.5,
                    gravity: 0.08,
                    velocityRange: 8 // More erratic movement
                },
                panic: {
                    emoji: '😰',
                    velocityRange: 12,
                    upwardForce: 8,
                    lifetime: 120,
                    gravity: 0.1
                }
            },
            
            'craig': {
                base: {
                    emoji: ['🖕', '😑', '💙', '🐹', '🤷'][Math.floor(Math.random() * 5)],
                    color: '#666666',
                    size: Math.random() * 4 + 6,
                    rotationSpeed: (Math.random() - 0.5) * 0.05,
                    gravity: 0.08,
                    velocityRange: 2 // Minimal movement
                }
            },
            
            'randy': {
                base: {
                    emoji: ['🍷', '🌿', '🎭', '📈', '🎪'][Math.floor(Math.random() * 5)],
                    color: '#9C27B0',
                    size: Math.random() * 10 + 12,
                    rotationSpeed: (Math.random() - 0.5) * 0.4,
                    gravity: 0.04,
                    velocityRange: 6
                },
                dramatic: {
                    emoji: '🎭',
                    size: Math.random() * 15 + 20,
                    velocityRange: 10,
                    upwardForce: 8,
                    lifetime: 240
                }
            },
            
            'butters': {
                base: {
                    emoji: ['🌈', '😊', '⭐', '🌸', '💖'][Math.floor(Math.random() * 5)],
                    color: '#FFDD44',
                    size: Math.random() * 8 + 8,
                    rotationSpeed: (Math.random() - 0.5) * 0.1,
                    gravity: 0.03,
                    bounce: 0.5 // More bouncy
                }
            }
        };

        const config = characterConfigs[characterKey] || characterConfigs['stan'];
        const typeConfig = config[particleType] || {};
        
        return {
            base: { ...config.base, ...typeConfig },
            ...baseConfig,
            ...typeConfig
        };
    }

    createBackgroundAmbiance() {
        if (!this.isActive || this.particles.length > 50) return;

        // Create subtle background particles
        const particle = this.getParticleFromPool();
        if (!particle) return;

        Object.assign(particle, {
            x: Math.random() * this.canvas.width,
            y: this.canvas.height + 10,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -Math.random() * 0.5 - 0.2,
            size: Math.random() * 3 + 1,
            life: 1,
            maxLife: 600, // 10 seconds
            color: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
            type: 'ambient',
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            gravity: -0.001, // Slight upward drift
            active: true
        });

        this.particles.push(particle);
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Apply gravity
            if (particle.gravity) {
                particle.vy += particle.gravity;
            }
            
            // Update rotation
            if (particle.rotationSpeed) {
                particle.rotation += particle.rotationSpeed;
            }
            
            // Handle bouncing
            if (particle.bounce && particle.y > this.canvas.height - particle.size) {
                particle.y = this.canvas.height - particle.size;
                particle.vy *= -particle.bounce;
                particle.vx *= 0.8; // Friction
            }
            
            // Update life
            particle.life--;
            
            // Trail effect for certain particles
            if (particle.type === 'kenny' || particle.character === 'kenny') {
                particle.trail.push({ x: particle.x, y: particle.y, alpha: particle.life / particle.maxLife });
                if (particle.trail.length > 5) {
                    particle.trail.shift();
                }
            }
            
            // Remove dead particles
            if (particle.life <= 0 || particle.y > this.canvas.height + 100 || 
                particle.x < -100 || particle.x > this.canvas.width + 100) {
                particle.active = false;
                this.particles.splice(i, 1);
            }
        }
    }

    renderParticles() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let particle of this.particles) {
            const alpha = particle.life / particle.maxLife;
            
            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            this.ctx.translate(particle.x, particle.y);
            
            if (particle.rotation) {
                this.ctx.rotate(particle.rotation);
            }
            
            // Render based on particle type
            if (particle.emoji) {
                this.ctx.font = `${particle.size}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(particle.emoji, 0, 0);
            } else {
                // Render as colored circle
                this.ctx.fillStyle = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            // Render trail
            if (particle.trail && particle.trail.length > 0) {
                this.ctx.globalAlpha = alpha * 0.5;
                for (let i = 0; i < particle.trail.length; i++) {
                    const trailPoint = particle.trail[i];
                    const trailAlpha = (i / particle.trail.length) * trailPoint.alpha;
                    
                    this.ctx.globalAlpha = trailAlpha;
                    this.ctx.fillStyle = particle.color;
                    this.ctx.beginPath();
                    this.ctx.arc(trailPoint.x - particle.x, trailPoint.y - particle.y, 
                               particle.size * (i / particle.trail.length), 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
            
            this.ctx.restore();
        }
    }

    startAnimationLoop() {
        const animate = () => {
            if (this.isActive) {
                this.updateParticles();
                this.renderParticles();
                
                // Create ambient particles occasionally
                if (Math.random() < 0.02 && !this.performanceMode) {
                    this.createBackgroundAmbiance();
                }
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    setupPerformanceMonitoring() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const monitor = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                // Auto-adjust performance based on FPS
                if (fps < 30 && !this.performanceMode) {
                    this.enablePerformanceMode();
                } else if (fps > 50 && this.performanceMode) {
                    this.disablePerformanceMode();
                }
            }
            
            setTimeout(monitor, 16); // ~60fps monitoring
        };
        
        monitor();
    }

    enablePerformanceMode() {
        this.performanceMode = true;
        this.maxParticles = 30;
        
        // Remove excess particles
        while (this.particles.length > this.maxParticles) {
            const particle = this.particles.pop();
            particle.active = false;
        }
        
        console.log('Particle system: Performance mode enabled');
    }

    disablePerformanceMode() {
        this.performanceMode = false;
        this.maxParticles = 100;
        console.log('Particle system: Performance mode disabled');
    }

    // Public API methods
    createExplosion(x, y, characterKey, intensity = 1) {
        const particleCount = Math.floor(intensity * 8) + 3;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createCharacterParticle(
                    x + (Math.random() - 0.5) * 50,
                    y + (Math.random() - 0.5) * 50,
                    characterKey,
                    'explosion'
                );
            }, i * 50);
        }
    }

    createTrail(startX, startY, endX, endY, characterKey, duration = 1000) {
        const steps = 20;
        const stepX = (endX - startX) / steps;
        const stepY = (endY - startY) / steps;
        const stepDelay = duration / steps;
        
        for (let i = 0; i < steps; i++) {
            setTimeout(() => {
                this.createCharacterParticle(
                    startX + stepX * i,
                    startY + stepY * i,
                    characterKey,
                    'trail'
                );
            }, i * stepDelay);
        }
    }

    triggerSpecialEffect(characterKey, effectType) {
        const effects = {
            'cartman-business': () => {
                // Money explosion from multiple points
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        this.createExplosion(
                            Math.random() * this.canvas.width,
                            Math.random() * this.canvas.height * 0.5,
                            'cartman',
                            1.5
                        );
                    }, i * 200);
                }
            },
            
            'kenny-death': () => {
                // Soul ascending effect
                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2;
                
                this.createTrail(centerX, centerY + 100, centerX, 0, 'kenny', 2000);
            },
            
            'tweek-panic': () => {
                // Rapid scattered particles
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => {
                        this.createCharacterParticle(
                            Math.random() * this.canvas.width,
                            Math.random() * this.canvas.height,
                            'tweek',
                            'panic'
                        );
                    }, i * 30);
                }
            }
        };

        const effect = effects[`${characterKey}-${effectType}`] || effects[effectType];
        if (effect) {
            effect();
        }
    }

    setActive(active) {
        this.isActive = active;
        if (!active) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    cleanup() {
        this.particles = [];
        this.isActive = false;
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.ParticleEffectsSystem = ParticleEffectsSystem;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ParticleEffectsSystem;
}
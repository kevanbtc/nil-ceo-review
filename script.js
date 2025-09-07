// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlight
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentNav = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                if (currentNav) {
                    currentNav.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
    });

    sections.forEach(section => observer.observe(section));

    // Counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat h3');
        counters.forEach(counter => {
            const target = counter.textContent;
            if (target.includes('$')) {
                const value = parseFloat(target.replace(/[^0-9.]/g, ''));
                const suffix = target.includes('B') ? 'B' : target.includes('M') ? 'M' : '';
                const prefix = target.includes('$') ? '$' : '';
                const isPercent = target.includes('%');
                
                let current = 0;
                const increment = value / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= value) {
                        current = value;
                        clearInterval(timer);
                    }
                    counter.textContent = prefix + current.toFixed(isPercent ? 0 : 2) + suffix + (isPercent ? '%' : '');
                }, 30);
            }
        });
    };

    // Intersection Observer for animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('key-stats')) {
                    animateCounters();
                }
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.overview-card, .tech-card, .phase, .key-stats');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        animateOnScroll.observe(el);
    });

    // Interactive hover effects
    const cards = document.querySelectorAll('.overview-card, .tech-card, .revenue-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Progress bar for roadmap phases
    const phases = document.querySelectorAll('.phase');
    phases.forEach((phase, index) => {
        const status = phase.querySelector('.phase-status').textContent.toLowerCase();
        if (status.includes('ready')) {
            phase.style.borderLeft = '5px solid #28a745';
        } else if (status.includes('planned')) {
            phase.style.borderLeft = '5px solid #17a2b8';
        } else {
            phase.style.borderLeft = '5px solid #dc3545';
        }
    });

    // Dynamic background particles (subtle)
    createParticles();
});

// Schedule demo function
function scheduleDemo() {
    // Create modal for demo scheduling
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    `;

    modalContent.innerHTML = `
        <h2 style="color: #667eea; margin-bottom: 1rem;">
            <i class="fas fa-calendar-plus"></i> Schedule Strategic Meeting
        </h2>
        <p style="margin-bottom: 2rem; color: #666;">
            Ready to discuss the NIL Transparency Network implementation?
        </p>
        <div style="margin-bottom: 2rem;">
            <p><strong>Next Steps:</strong></p>
            <ul style="text-align: left; margin: 1rem 0; color: #666;">
                <li>✅ Technical review of complete system</li>
                <li>✅ Financial modeling validation</li>
                <li>✅ Partnership structure finalization</li>
                <li>✅ Pilot university selection</li>
            </ul>
        </div>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="mailto:ceo@silocloud.com?subject=NIL Transparency Network - Strategic Meeting Request&body=I've reviewed the complete NIL Transparency Network proposal and would like to schedule a strategic meeting to discuss implementation.%0A%0AAvailable times:%0A- [Please provide your availability]%0A%0AKey discussion points:%0A- Partnership structure%0A- Technical implementation timeline%0A- Pilot university selection%0A- Financial projections validation%0A%0AThis system is ready for immediate deployment." 
               class="btn primary" style="text-decoration: none;">
                <i class="fas fa-envelope"></i> Email CEO
            </a>
            <button onclick="closeModal()" class="btn secondary">
                <i class="fas fa-times"></i> Close
            </button>
        </div>
        <p style="margin-top: 1.5rem; font-size: 0.9rem; color: #999;">
            All technical components are built and ready for deployment
        </p>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal function
    window.closeModal = function() {
        document.body.removeChild(modal);
        delete window.closeModal;
    };

    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Create subtle background particles
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        heroSection.appendChild(particle);
    }

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Real-time clock for "Ready for Deployment" status
function updateDeploymentStatus() {
    const now = new Date();
    const status = document.querySelector('.footer-content p');
    if (status && status.textContent.includes('operational')) {
        status.textContent = `All systems operational and ready for immediate implementation. Last updated: ${now.toLocaleTimeString()}`;
    }
}

// Update every minute
setInterval(updateDeploymentStatus, 60000);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'G' to go to GitHub
    if (e.key.toLowerCase() === 'g' && !e.ctrlKey && !e.metaKey) {
        window.open('https://github.com/kevanbtc/nil-transparency-network', '_blank');
    }
    
    // Press 'D' for demo
    if (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.metaKey) {
        scheduleDemo();
    }
    
    // Press 'Escape' to close modals
    if (e.key === 'Escape') {
        if (window.closeModal) {
            closeModal();
        }
    }
});

// Add keyboard shortcuts indicator
const keyboardHelp = document.createElement('div');
keyboardHelp.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-size: 0.8rem;
    z-index: 999;
    opacity: 0.7;
    transition: opacity 0.3s ease;
`;
keyboardHelp.innerHTML = 'Press <kbd>G</kbd> for GitHub, <kbd>D</kbd> for Demo';
document.body.appendChild(keyboardHelp);

keyboardHelp.addEventListener('mouseenter', () => {
    keyboardHelp.style.opacity = '1';
});

keyboardHelp.addEventListener('mouseleave', () => {
    keyboardHelp.style.opacity = '0.7';
});

// Performance tracking
const performance = {
    startTime: Date.now(),
    
    track: function(event) {
        console.log(`NIL CEO Site - ${event}: ${Date.now() - this.startTime}ms`);
    }
};

window.addEventListener('load', () => {
    performance.track('Full Load Complete');
});

// Analytics simulation (would integrate with real analytics)
function trackEngagement(action) {
    console.log(`Engagement: ${action} at ${new Date().toISOString()}`);
    // In production, this would send to analytics platform
}

// Track key interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        trackEngagement(`Button Click: ${e.target.textContent.trim()}`);
    }
    if (e.target.matches('.nav-link')) {
        trackEngagement(`Navigation: ${e.target.textContent.trim()}`);
    }
});

// Social sharing functionality
function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('NIL Transparency Network - Revolutionary Infrastructure for College Athletics');
    const summary = encodeURIComponent('Universal infrastructure for Name, Image, Likeness monetization. Built by SiloCloud × Niotavonne × Unykorn partnership.');
    
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank');
}

function shareOnTwitter() {
    const text = encodeURIComponent('Excited to share the NIL Transparency Network - universal infrastructure for college athletics monetization. Built by @SiloCloud × Niotavonne × @UnykornHQ');
    const url = encodeURIComponent(window.location.href);
    
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

// Add share buttons to footer if social sharing is desired
const shareButtons = document.createElement('div');
shareButtons.style.cssText = 'margin-top: 1rem;';
shareButtons.innerHTML = `
    <button onclick="shareOnLinkedIn()" style="background: #0077b5; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; margin-right: 0.5rem; cursor: pointer;">
        <i class="fab fa-linkedin"></i> Share on LinkedIn
    </button>
    <button onclick="shareOnTwitter()" style="background: #1da1f2; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">
        <i class="fab fa-twitter"></i> Share on Twitter
    </button>
`;

// Uncomment to add social sharing
// document.querySelector('.footer-content').appendChild(shareButtons);

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scheduleDemo,
        shareOnLinkedIn,
        shareOnTwitter,
        trackEngagement
    };
}
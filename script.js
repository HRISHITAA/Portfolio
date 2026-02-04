/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const stickyNav = document.getElementById('stickyNav');

    // Only run this if the sticky nav exists (i.e., not on the home page)
    if (stickyNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                stickyNav.classList.add('scrolled');
            } else {
                stickyNav.classList.remove('scrolled');
            }
        });
    }
});
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('canvas-bg');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connectionDistance = 150; // Max distance to draw a line
        this.resize();

        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.initParticles();
    }

    initParticles() {
        this.particles = [];
        // Keep density slightly lower for performance with lines
        const density = Math.floor((this.width * this.height) / 18000);

        for (let i = 0; i < density; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5
            });
        }
    }

    drawLines() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    // Lines get fainter as particles move apart
                    const opacity = 1 - (distance / this.connectionDistance);
                    this.ctx.strokeStyle = `rgba(200, 200, 200, ${opacity * 0.2})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.width, this.height);

        const particleColor = 'rgba(200, 200, 200, 0.3)'; 

        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap edges
            if (particle.x < 0) particle.x = this.width;
            if (particle.x > this.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.height;
            if (particle.y > this.height) particle.y = 0;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particleColor;
            this.ctx.fill();
        });

        this.drawLines(); // This draws the connecting lines
        requestAnimationFrame(() => this.animate());
    }
}

new ParticleBackground();

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.info-card');

    cards.forEach(card => {
        const header = card.querySelector('.card-header');
        const icon = header.querySelector('span');
        const content = card.querySelector('.card-content');

        // Initial state: If header has a '+', hide the content
        if (icon && icon.innerText === '+') {
            content.style.display = 'none';
        }

        header.addEventListener('click', () => {
            const isHidden = content.style.display === 'none';
            
            // Toggle visibility
            content.style.display = isHidden ? 'block' : 'none';
            
            // Toggle icon
            if (icon) {
                icon.innerText = isHidden ? '−' : '+';
            }
        });
    });
});
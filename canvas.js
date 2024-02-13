class FireAnimator {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    this.particleCount = 500;
    this.power = 12;
    this.radians = (Math.PI * 2) / this.particleCount;

    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;

    this.animate();
    this.setupEventListeners();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.clearCanvas();
    this.updateParticles();
  }

  setupEventListeners() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.canvas.addEventListener('click', this.handleClick.bind(this));
  }

  handleResize() {
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
  }

  handleClick(event) {
    if (!this.canvas.classList.contains('hidden')) {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
      this.launchParticles();
    }
  }

  createParticle(i) {
    const velocity = {
      x: Math.cos(this.radians * i) * (Math.random() * this.power),
      y: Math.sin(this.radians * i) * (Math.random() * this.power),
    };
    this.particles.push(
      new Particle(this.ctx, this.mouse.x, this.mouse.y, velocity),
    );
  }

  updateParticles() {
    this.particles.forEach((particle, i) => {
      if (particle.opacity > 0) {
        particle.update();
      } else {
        this.particles.splice(i, 1);
      }
    });
  }

  clearCanvas() {
    this.ctx.fillStyle = 'rgba(0,0,0,0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  launchParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.createParticle(i);
    }
  }

  startFireWork() {
    this.launchParticlesFromTopLeft();

    this.launchParticlesFromBottomRight();
    setTimeout(() => {
      this.launchParticlesFromTopRight();
      this.launchParticlesFromBottomLeft();
      this.launchParticlesFromTopLeft();
      this.launchParticlesFromBottomRight();
    }, 2000);
  }

  restartFireWork() {
    this.launchParticlesFromTopRight();
    this.launchParticlesFromTopLeft();

    setTimeout(() => {
      this.launchParticlesFromBottomLeft();
      this.launchParticlesFromBottomRight();
    }, 3000);
    setTimeout(() => {
      this.launchParticlesFromTopRight();
      this.launchParticlesFromTopLeft();
    }, 4000);
  }

  launchParticlesFromTopLeft() {
    this.mouse.x = 150;
    this.mouse.y = 150;
    this.launchParticles();
  }

  launchParticlesFromTopRight() {
    this.mouse.x = window.innerWidth - 150;
    this.mouse.y = 150;
    this.launchParticles();
  }

  launchParticlesFromBottomRight() {
    this.mouse.x = window.innerWidth - 150;
    this.mouse.y = window.innerHeight - 150;
    this.launchParticles();
  }

  launchParticlesFromBottomLeft() {
    this.mouse.x = 150;
    this.mouse.y = window.innerHeight - 150;
    this.launchParticles();
  }
}

class Particle {
  constructor(ctx, x, y, velocity) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    this.opacity = 1;
    this.gravity = 0.03;
    this.friction = 0.99;
    this.radius = 3;
    this.velocity = velocity;
  }

  draw() {
    this.ctx.save();
    this.ctx.globalAlpha = this.opacity;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  update() {
    this.draw();
    this.applyFriction();
    this.applyGravity();
    this.move();
    this.updateOpacity();
  }

  applyFriction() {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
  }

  applyGravity() {
    this.velocity.y += this.gravity;
  }

  move() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  updateOpacity() {
    this.opacity -= 0.003;
  }
}

const fireAnimator = new FireAnimator();

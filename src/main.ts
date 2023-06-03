import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>(
  "#canvas1"
) as HTMLCanvasElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "white");
gradient.addColorStop(0.5, "magenta");
gradient.addColorStop(1, "blue");
ctx.fillStyle = gradient;

class Particle {
  effect: Effect;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  constructor(effect: Effect) {
    this.radius = Math.random() * 5 + 2;
    this.effect = effect;
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2);
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.x += this.vx;
    if (this.x > this.effect.width - this.radius || this.x < this.radius) {
      this.vx *= -1;
    }
    this.y += this.vy;
    if (this.y > this.effect.height - this.radius || this.y < this.radius) {
      this.vy *= -1;
    }
  }
}

class Effect {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  particles: Particle[];
  numberofParticles: number;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberofParticles = 200;
    this.createParticles();
  }
  createParticles() {
    for (let i = 0; i < this.numberofParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  handleParticle(ctx: CanvasRenderingContext2D) {
    this.connectParticles(ctx);
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.draw(ctx);
      particle.update();
    }
  }
  connectParticles(ctx: CanvasRenderingContext2D) {
    const maxDistance = 100;
    for (let a = 0; a < this.particles.length; a++) {
      const particleA = this.particles[a];
      for (let b = a; b < this.particles.length; b++) {
        const particleB = this.particles[b];
        const dx = particleA.x - particleB.x;
        const dy = particleA.y - particleB.y;
        const distance = Math.hypot(dx, dy);
        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = "white";
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.moveTo(particleA.x, particleA.y);
          ctx.lineTo(particleB.x, particleB.y);
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
        }
      }
    }
  }
}

const effect = new Effect(canvas);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  effect.handleParticle(ctx);
  window.requestAnimationFrame(animate);
}

animate();

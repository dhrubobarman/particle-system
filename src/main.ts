import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>(
  "#canvas1"
) as HTMLCanvasElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "red";

class Particle {
  effect: Effect;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  constructor(effect: Effect) {
    this.radius = 15;
    this.effect = effect;
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2);
    this.vx = Math.random() * 4 - 2;
    this.vy = Math.random() * 4 - 2;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `hsl(${this.x * 0.5}, 100%, 50%)`;
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
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.draw(ctx);
      particle.update();
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

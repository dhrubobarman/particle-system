import "./style.css";
import { Effect } from "./Effect";

const canvas = document.querySelector<HTMLCanvasElement>(
  "#canvas1"
) as HTMLCanvasElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const effect = new Effect(canvas, ctx);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticle(ctx);
  window.requestAnimationFrame(animate);
}

animate();

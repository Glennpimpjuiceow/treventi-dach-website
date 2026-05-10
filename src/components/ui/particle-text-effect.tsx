"use client";

import { useEffect, useRef } from "react";

interface Vector2D {
  x: number;
  y: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

const CREAM: RGB = { r: 245, g: 241, b: 234 };

class WoodChip {
  pos: Vector2D = { x: 0, y: 0 };
  vel: Vector2D = { x: 0, y: 0 };
  acc: Vector2D = { x: 0, y: 0 };
  target: Vector2D = { x: 0, y: 0 };

  closeEnoughTarget = 70;
  maxSpeed: number;
  maxForce: number;
  width: number;
  height: number;
  rotation: number;

  alpha = 0;
  alphaTarget = 1;
  alphaRate = 0.06;

  color: RGB;
  isKilled = false;

  constructor(color: RGB) {
    this.maxSpeed = 4.5 + Math.random() * 3.0;
    this.maxForce = 0.45 + Math.random() * 0.2;
    const baseW = 1.8 + Math.random() * 2.4;
    this.width = baseW;
    this.height = baseW * (0.5 + Math.random() * 0.5);
    this.rotation = (Math.random() - 0.5) * Math.PI * 0.5;
    this.color = color;
  }

  move() {
    const dx = this.target.x - this.pos.x;
    const dy = this.target.y - this.pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let proximityMult = 1;
    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget;
    }

    let towardsX = 0;
    let towardsY = 0;
    if (distance > 0) {
      towardsX = (dx / distance) * this.maxSpeed * proximityMult;
      towardsY = (dy / distance) * this.maxSpeed * proximityMult;
    }

    let steerX = towardsX - this.vel.x;
    let steerY = towardsY - this.vel.y;
    const steerMag = Math.sqrt(steerX * steerX + steerY * steerY);
    if (steerMag > this.maxForce) {
      steerX = (steerX / steerMag) * this.maxForce;
      steerY = (steerY / steerMag) * this.maxForce;
    }

    this.acc.x += steerX;
    this.acc.y += steerY;

    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;

    if (this.alpha < this.alphaTarget) {
      this.alpha = Math.min(this.alpha + this.alphaRate, this.alphaTarget);
    } else if (this.alpha > this.alphaTarget) {
      this.alpha = Math.max(this.alpha - this.alphaRate, this.alphaTarget);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.alpha <= 0.01) return;
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }

  kill(width: number, height: number) {
    if (this.isKilled) return;
    const cx = width / 2;
    const cy = height / 2;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.max(width, height) * (0.7 + Math.random() * 0.5);
    this.target.x = cx + Math.cos(angle) * distance;
    this.target.y = cy + Math.sin(angle) * distance;
    this.maxSpeed = 5 + Math.random() * 3;
    this.maxForce = 0.5;
    this.closeEnoughTarget = 0;
    this.alphaTarget = 0;
    this.alphaRate = 0.02;
    this.isKilled = true;
  }
}

interface ParticleTextEffectProps {
  imageSrc: string;
  /** Native logo aspect ratio (width / height). Defaults to Treventi 193:38. */
  imageAspect?: number;
  /** Particle color override. Default cream. */
  color?: RGB;
  formMs?: number;
  holdMs?: number;
  disperseMs?: number;
  onComplete?: () => void;
}

export default function ParticleTextEffect({
  imageSrc,
  imageAspect = 193 / 38,
  color = CREAM,
  formMs = 1500,
  holdMs = 1000,
  disperseMs = 1000,
  onComplete,
}: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let particles: WoodChip[] = [];
    let dispersing = false;
    let disperseStartedAt = 0;
    let cancelled = false;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function buildTargets(img: HTMLImageElement) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const offCtx = off.getContext("2d");
      if (!offCtx) return [] as Vector2D[];

      const targetW = Math.min(w * 0.72, 980);
      const aspect =
        img.naturalWidth && img.naturalHeight
          ? img.naturalWidth / img.naturalHeight
          : imageAspect;
      const targetH = targetW / aspect;
      const drawX = (w - targetW) / 2;
      const drawY = (h - targetH) / 2;

      offCtx.drawImage(img, drawX, drawY, targetW, targetH);

      const data = offCtx.getImageData(0, 0, w, h).data;
      const stride = w < 640 ? 3 : 2;
      const targets: Vector2D[] = [];
      for (let y = 0; y < h; y += stride) {
        for (let x = 0; x < w; x += stride) {
          const idx = (y * w + x) * 4;
          if (data[idx + 3] > 60) {
            targets.push({ x, y });
          }
        }
      }
      return targets;
    }

    function spawnParticles(targets: Vector2D[]) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;
      const farRadius = Math.max(w, h) * 0.55;

      particles = targets.map((target) => {
        const p = new WoodChip(color);
        const angle = Math.random() * Math.PI * 2;
        const dist = farRadius * (0.5 + Math.random() * 0.7);
        p.pos = {
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
        };
        p.target = target;
        p.alpha = 0;
        p.alphaTarget = 1;
        p.alphaRate = 0.03 + Math.random() * 0.03;
        return p;
      });
    }

    function tick(now: number) {
      if (cancelled || !canvas || !ctx) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      if (dispersing) {
        const elapsed = now - disperseStartedAt;
        if (elapsed > disperseMs + 200 && !completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
      }

      for (const p of particles) {
        p.move();
        p.draw(ctx);
      }

      rafId = requestAnimationFrame(tick);
    }

    function kickoff(img: HTMLImageElement) {
      if (cancelled) return;
      const targets = buildTargets(img);
      if (!targets.length) {
        onComplete?.();
        return;
      }
      spawnParticles(targets);

      rafId = requestAnimationFrame(tick);

      const disperseDelay = formMs + holdMs;
      window.setTimeout(() => {
        if (cancelled) return;
        dispersing = true;
        disperseStartedAt = performance.now();
        for (const p of particles) p.kill(window.innerWidth, window.innerHeight);
      }, disperseDelay);
    }

    const img = new window.Image();
    img.onload = () => kickoff(img);
    img.onerror = () => onComplete?.();
    img.src = imageSrc;

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [imageSrc, imageAspect, color, formMs, holdMs, disperseMs, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="block h-full w-full"
    />
  );
}

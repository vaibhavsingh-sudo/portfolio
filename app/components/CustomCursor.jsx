"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let currentX = width / 2;
    let currentY = height / 2;

    let stickyX = width / 2;
    let stickyY = height / 2;
    let isStuck = false;
    let wasStuck = false;
    let isMouseDown = false;

    const droplets = [];
    let lastSpawnTime = 0;

    const numPoints = 16;
    const pointSeeds = Array.from({ length: numPoints }, () => ({
      p1: Math.random() * Math.PI * 2,
      p2: Math.random() * Math.PI * 2,
      p3: Math.random() * Math.PI * 2,
      s1: Math.random() * 0.5 + 0.6,
      s2: Math.random() * 0.7 + 0.8,
      s3: Math.random() * 0.9 + 1.1,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseDown = () => (isMouseDown = true);
    const handleMouseUp = () => (isMouseDown = false);

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const interactiveElements = document.querySelectorAll(
        "button, a, .cursor-pointer, [data-cursor='sticky']"
      );

      let closestEl = null;
      let minDistance = 75;

      interactiveElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 200 || rect.height > 200) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(mouseX - centerX, mouseY - centerY);

        if (dist < minDistance) {
          minDistance = dist;
          closestEl = { centerX, centerY, dist };
        }
      });

      if (closestEl) {
        if (closestEl.dist > 170) {
          isStuck = false;
        } else {
          isStuck = true;
          stickyX = closestEl.centerX;
          stickyY = closestEl.centerY;
        }
      } else {
        isStuck = false;
      }

      if (wasStuck && !isStuck) {
        for (let i = 0; i < 8; i++) {
          const angle =
            Math.atan2(mouseY - stickyY, mouseX - stickyX) +
            (Math.random() - 0.5) * 1.4;
          const speed = Math.random() * 5.5 + 2.8;
          droplets.push({
            x: stickyX,
            y: stickyY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed + 1.6,
            maxRadius: Math.random() * 14 + 10,
            life: 1,
            decay: Math.random() * 0.018 + 0.012,
            seed: Math.random() * Math.PI * 2,
          });
        }
      }
      wasStuck = isStuck;

      const now = performance.now();
      if (now - lastSpawnTime > 60) {
        lastSpawnTime = now;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.8 + 0.3;
        droplets.push({
          x: currentX + (Math.random() - 0.5) * 20,
          y: currentY + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed * 0.4,
          vy: Math.sin(angle) * speed * 0.4 + 0.6,
          maxRadius: Math.random() * 14 + 10,
          life: 1,
          decay: Math.random() * 0.008 + 0.007,
          seed: Math.random() * Math.PI * 2,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const lerpSpeed = isStuck ? 0.05 : 0.08;
      const destX = isStuck ? stickyX + (mouseX - stickyX) * 0.15 : mouseX;
      const destY = isStuck ? stickyY + (mouseY - stickyY) * 0.15 : mouseY;

      currentX += (destX - currentX) * lerpSpeed;
      currentY += (destY - currentY) * lerpSpeed;

      ctx.fillStyle = "#ffffff";

      if (isStuck) {
        const d = Math.hypot(mouseX - stickyX, mouseY - stickyY);
        const stretchRatio = Math.min(1, d / 170);
        const neckWidth = Math.max(10, 36 * (1 - stretchRatio * 0.6));

        const angle = Math.atan2(mouseY - stickyY, mouseX - stickyX);
        const perp = angle + Math.PI / 2;

        const p1x = stickyX + Math.cos(perp) * neckWidth;
        const p1y = stickyY + Math.sin(perp) * neckWidth;
        const p2x = stickyX - Math.cos(perp) * neckWidth;
        const p2y = stickyY - Math.sin(perp) * neckWidth;

        const p3x = currentX - Math.cos(perp) * (neckWidth * 0.75);
        const p3y = currentY - Math.sin(perp) * (neckWidth * 0.75);
        const p4x = currentX + Math.cos(perp) * (neckWidth * 0.75);
        const p4y = currentY + Math.sin(perp) * (neckWidth * 0.75);

        const midX = (stickyX + currentX) / 2;
        const midY = (stickyY + currentY) / 2;

        ctx.beginPath();
        ctx.arc(stickyX, stickyY, 42, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.quadraticCurveTo(midX, midY, p4x, p4y);
        ctx.lineTo(p3x, p3y);
        ctx.quadraticCurveTo(midX, midY, p2x, p2y);
        ctx.closePath();
        ctx.fill();
      }

      const baseRadius = isMouseDown ? 54 : isStuck ? 48 : 44;
      const points = [];

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const seed = pointSeeds[i];

        const distortion =
          Math.sin(time * seed.s1 + seed.p1) * 10 +
          Math.cos(time * seed.s2 + seed.p2) * 7 +
          Math.sin(time * seed.s3 + seed.p3) * 5;

        const r = Math.max(15, baseRadius + distortion);
        points.push({
          x: currentX + Math.cos(angle) * r,
          y: currentY + Math.sin(angle) * r,
        });
      }

      ctx.beginPath();
      ctx.moveTo(
        (points[0].x + points[numPoints - 1].x) / 2,
        (points[0].y + points[numPoints - 1].y) / 2
      );

      for (let i = 0; i < numPoints; i++) {
        const nextIndex = (i + 1) % numPoints;
        const midX = (points[i].x + points[nextIndex].x) / 2;
        const midY = (points[i].y + points[nextIndex].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
      }
      ctx.closePath();
      ctx.fill();

      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];
        d.x += d.vx;
        d.y += d.vy;
        d.life -= d.decay;

        const currentRadius = d.maxRadius * Math.max(0, d.life);

        if (d.life <= 0 || currentRadius <= 1) {
          droplets.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        const dropPoints = 6;
        for (let j = 0; j < dropPoints; j++) {
          const a = (j / dropPoints) * Math.PI * 2;
          const dropDist = Math.sin(time * 1.5 + j + d.seed) * 2.5;
          const dr = Math.max(2, currentRadius + dropDist);
          const px = d.x + Math.cos(a) * dr;
          const py = d.y + Math.sin(a) * dr;

          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <svg className="hidden">
        <defs>
          <filter id="liquidGoo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -12"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <canvas
        ref={canvasRef}
        style={{ filter: "url(#liquidGoo)", zIndex: 999999 }}
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[999999] mix-blend-difference"
      />
    </>
  );
}

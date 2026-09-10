"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const createMicroParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");

      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.25, "rgba(125, 211, 252, 0.85)");
      grad.addColorStop(0.6, "rgba(14, 165, 233, 0.3)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();

      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createMicroParticleTexture();

    const particleCount = 60000;
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const tParam = new Float32Array(particleCount);
    const uParam = new Float32Array(particleCount);
    const sParam = new Float32Array(particleCount);
    const phase = new Float32Array(particleCount);
    const particleKind = new Uint8Array(particleCount);

    const colorWhite = new THREE.Color(0xffffff);
    const colorCyan = new THREE.Color(0x7dd3fc);
    const colorElectricBlue = new THREE.Color(0x0ea5e9);
    const colorDeepBlue = new THREE.Color(0x1d4ed8);
    const colorIndigo = new THREE.Color(0x4338ca);

    for (let i = 0; i < particleCount; i++) {
      const t = Math.random() * Math.PI * 2;
      phase[i] = Math.random() * Math.PI * 2;

      const roll = Math.random();
      let u, kind, colorBase;

      if (roll < 0.08) {
        u = 0.85 + Math.random() * 0.15;
        kind = 1;
        colorBase = colorWhite.clone().lerp(colorCyan, 0.35 + Math.random() * 0.3);
      } else if (roll < 0.16) {
        u = -(0.85 + Math.random() * 0.15);
        kind = 2;
        colorBase = colorWhite.clone().lerp(colorCyan, 0.45 + Math.random() * 0.3);
      } else {
        u = (Math.random() * 2 - 1) * 0.95;
        kind = 0;
        const depth = Math.abs(u);
        colorBase =
          depth < 0.3
            ? colorCyan.clone().lerp(colorElectricBlue, depth / 0.3)
            : colorElectricBlue.clone().lerp(colorDeepBlue, (depth - 0.3) / 0.7);
        if (Math.random() < 0.1) colorBase.lerp(colorIndigo, 0.4);
      }

      tParam[i] = t;
      uParam[i] = u;
      sParam[i] = (Math.random() * 2 - 1) * (kind === 0 ? 1 : 0.4);
      particleKind[i] = kind;

      colors[i * 3] = colorBase.r;
      colors[i * 3 + 1] = colorBase.g;
      colors[i * 3 + 2] = colorBase.b;

      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.06,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.97,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(geometry, material);
    particleSystem.rotation.x = 0.55;
    particleSystem.rotation.z = -0.12;
    scene.add(particleSystem);

    let mouseWorldX = -100;
    let mouseWorldY = -100;
    let targetCamX = 0;
    let targetCamY = 0;
    let currentCamX = 0;
    let currentCamY = 0;

    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseVec = new THREE.Vector2(-100, -100);

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseVec.x = (x / rect.width) * 2 - 1;
      mouseVec.y = -(y / rect.height) * 2 + 1;

      targetCamX = mouseVec.x * 1.4;
      targetCamY = mouseVec.y * 1.1;

      raycaster.setFromCamera(mouseVec, camera);
      const targetPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, targetPoint);
      if (targetPoint) {
        mouseWorldX = targetPoint.x;
        mouseWorldY = targetPoint.y;
      }
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    let time = 0;
    let reqId;

    const BASE_RX = 3.3;
    const BASE_RY = 1.5;
    const BASE_WIDTH = 0.9;
    const BASE_THICKNESS = 0.16;
    const BASE_TWIST = 1.7;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      time += 0.011;

      currentCamX += (targetCamX - currentCamX) * 0.04;
      currentCamY += (targetCamY - currentCamY) * 0.04;

      camera.position.x = currentCamX;
      camera.position.y = currentCamY;
      camera.lookAt(0, 0, 0);

      const k = BASE_TWIST + Math.sin(time * 0.28) * 0.45;
      const Rx = BASE_RX * (1 + Math.sin(time * 0.35) * 0.05);
      const Ry = BASE_RY * (1 + Math.cos(time * 0.4) * 0.08);
      const ribbonWidth = BASE_WIDTH * (1 + Math.sin(time * 0.5) * 0.12);
      const thickness = BASE_THICKNESS * (1 + Math.cos(time * 0.55) * 0.4);

      const pulsePos = (time * 0.4) % (Math.PI * 2);

      const posAttr = geometry.attributes.position;
      const posArr = posAttr.array;
      const colorAttr = geometry.attributes.color;
      const colorArr = colorAttr.array;

      const mouseRadius = 3.2;
      const mouseForce = 0.15;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        const t = tParam[i];
        const u = uParam[i];
        const s = sParam[i];
        const ph = phase[i];
        const kind = particleKind[i];

        const twistAngle = k * t;
        const w = u * ribbonWidth * Math.cos(twistAngle);

        let x = (Rx + w) * Math.cos(t);
        let y = (Ry + w) * Math.sin(t);
        let z = u * ribbonWidth * Math.sin(twistAngle) * 0.95 + s * thickness;

        x += Math.sin(time * 1.2 + ph) * 0.015;
        y += Math.cos(time * 1.4 + ph) * 0.015;
        z += Math.sin(time * 1.7 + ph) * 0.02;

        const dx = x - mouseWorldX;
        const dy = y - mouseWorldY;
        const distSq = dx * dx + dy * dy;
        if (distSq < mouseRadius * mouseRadius && distSq > 0.001) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / mouseRadius) * mouseForce;
          x += (dx / dist) * force * 1.6;
          y += (dy / dist) * force * 1.6;
          z += force * 1.8;
        }

        posArr[i3] += (x - posArr[i3]) * 0.1;
        posArr[i3 + 1] += (y - posArr[i3 + 1]) * 0.1;
        posArr[i3 + 2] += (z - posArr[i3 + 2]) * 0.1;

        if (kind !== 0) {
          let diff = Math.abs(t - pulsePos);
          if (diff > Math.PI) diff = Math.PI * 2 - diff;
          const boost = Math.max(0, 1 - diff / 0.9) * 0.6;
          colorArr[i3] = Math.min(1, colorArr[i3] + boost * 0.15);
          colorArr[i3 + 1] = Math.min(1, colorArr[i3 + 1] + boost * 0.15);
          colorArr[i3 + 2] = Math.min(1, colorArr[i3 + 2] + boost * 0.1);
        }
      }

      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;

      particleSystem.rotation.y = time * 0.09;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(reqId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-95"
    />
  );
}
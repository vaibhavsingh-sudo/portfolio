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
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.scale.set(0.65, 0.65, 0.65);
    scene.add(group);

    const particleCount = 24000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x38bdf8);
    const color2 = new THREE.Color(0x7dd3fc);
    const color3 = new THREE.Color(0x0284c7);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.random() - 0.5) * Math.PI;
      const radius = 1.4 + (Math.random() - 0.5) * 0.6;

      const x = radius * Math.cos(v) * Math.cos(u);
      const y = radius * Math.cos(v) * Math.sin(u);
      const z = radius * Math.sin(v);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const mixRatio = Math.random();
      const mixedColor =
        mixRatio < 0.6
          ? color1.clone().lerp(color2, Math.random())
          : color3;

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.022,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    group.add(particleSystem);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let mouse3DX = 0;
    let mouse3DY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      targetX = (x / rect.width) * 0.6;
      targetY = (y / rect.height) * 0.6;

      mouse3DX = (x / (width / 2)) * 3.5;
      mouse3DY = -(y / (height / 2)) * 2.5;
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

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      time += 0.010; // Medium fluid speed

      const flowX = Math.sin(time * 0.3) * 1.5 + Math.cos(time * 0.15) * 0.8;
      const flowY = Math.cos(time * 0.35) * 0.9 + Math.sin(time * 0.22) * 0.5;

      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      group.position.x = flowX + mouseX * 0.3;
      group.position.y = flowY - mouseY * 0.3;
      group.rotation.z = Math.sin(time * 0.18) * 0.25;

      const posAttr = particleGeo.attributes.position;
      const posArray = posAttr.array;

      const localMouseX = mouse3DX - group.position.x;
      const localMouseY = mouse3DY - group.position.y;
      const repelRadius = 1.8;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        const distortion1 = Math.sin(time * 1.0 + ox * 2.2 + oy * 1.5) * 0.35;
        const distortion2 = Math.cos(time * 0.8 + oz * 2.5 + ox * 1.8) * 0.28;
        const distortion3 = Math.sin(time * 1.3 + oy * 3.0 + oz * 1.2) * 0.2;

        let targetPx = ox + Math.sin(time * 0.65 + oy) * distortion1;
        let targetPy = oy + Math.cos(time * 0.9 + oz) * distortion2;
        let targetPz = oz + Math.sin(time * 0.55 + ox) * distortion3;

        const dx = targetPx - localMouseX;
        const dy = targetPy - localMouseY;
        const dist = Math.hypot(dx, dy);

        if (dist < repelRadius && dist > 0.01) {
          const force = (1 - dist / repelRadius) * 0.8;
          velocities[i3] += (dx / dist) * force * 0.08;
          velocities[i3 + 1] += (dy / dist) * force * 0.08;
          velocities[i3 + 2] += force * 0.09;
        }

        velocities[i3] *= 0.90;
        velocities[i3 + 1] *= 0.90;
        velocities[i3 + 2] *= 0.90;

        posArray[i3] = targetPx + velocities[i3];
        posArray[i3 + 1] = targetPy + velocities[i3 + 1];
        posArray[i3 + 2] = targetPz + velocities[i3 + 2];
      }
      posAttr.needsUpdate = true;

      particleSystem.rotation.y += 0.003;

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
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-85"
    />
  );
}

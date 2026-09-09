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

    const particleCount = 25000;
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);

    const colorWhite = new THREE.Color(0xffffff);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorElectricBlue = new THREE.Color(0x0284c7);
    const colorDeepBlue = new THREE.Color(0x1d4ed8);
    const colorIndigo = new THREE.Color(0x6366f1);

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.pow(Math.random(), 1.6) * 3.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() - 0.5) * 2);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi) * 0.7;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;

      phases[i] = Math.random() * Math.PI * 2;

      const normDist = radius / 3.8;
      const color =
        normDist < 0.2
          ? colorWhite.clone().lerp(colorCyan, normDist / 0.2)
          : normDist < 0.55
            ? colorCyan.clone().lerp(colorElectricBlue, (normDist - 0.2) / 0.35)
            : colorElectricBlue.clone().lerp(colorDeepBlue, (normDist - 0.55) / 0.45);

      if (Math.random() < 0.12) {
        color.lerp(colorIndigo, 0.5);
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.042,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(geometry, material);
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

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      time += 0.008;

      currentCamX += (targetCamX - currentCamX) * 0.04;
      currentCamY += (targetCamY - currentCamY) * 0.04;

      camera.position.x = currentCamX;
      camera.position.y = currentCamY;
      camera.lookAt(0, 0, 0);

      const posAttr = geometry.attributes.position;
      const posArr = posAttr.array;

      const mouseRadius = 3.6;
      const mouseForce = 0.16;

      const morph1 = Math.sin(time * 0.35);
      const morph2 = Math.cos(time * 0.45);
      const morph3 = Math.sin(time * 0.25);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        let bx = basePositions[i3];
        let by = basePositions[i3 + 1];
        let bz = basePositions[i3 + 2];

        const ph = phases[i];

        const waveA = Math.sin(bx * 0.6 + time * 1.2 + ph) * (1.1 + morph1 * 0.5);
        const waveB = Math.cos(by * 0.7 + time * 0.9 + ph) * (1.0 + morph2 * 0.4);
        const waveC = Math.sin((bx + by) * 0.4 + time * 0.7 + ph) * (0.8 + morph3 * 0.6);

        let targetX = bx + (waveA + waveC) * 0.45 + Math.sin(time * 0.5 + by) * 0.25;
        let targetY = by + (waveB + waveA) * 0.4 + Math.cos(time * 0.4 + bx) * 0.2;
        let targetZ = bz + (waveC * waveB) * 0.35 + Math.sin(time * 0.6 + ph) * 0.15;

        const stretch = 1.0 + Math.sin(time * 0.3 + bx * 0.3) * 0.35;
        targetX *= stretch;
        targetY /= stretch * 0.9;

        const dx = targetX - mouseWorldX;
        const dy = targetY - mouseWorldY;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouseRadius * mouseRadius && distSq > 0.001) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / mouseRadius) * mouseForce;
          targetX += (dx / dist) * force * 1.8;
          targetY += (dy / dist) * force * 1.8;
          targetZ += force * 2.2;
        }

        posArr[i3] += (targetX - posArr[i3]) * 0.06;
        posArr[i3 + 1] += (targetY - posArr[i3 + 1]) * 0.06;
        posArr[i3 + 2] += (targetZ - posArr[i3 + 2]) * 0.06;
      }

      posAttr.needsUpdate = true;

      particleSystem.rotation.z = Math.sin(time * 0.08) * 0.08;
      particleSystem.rotation.y = time * 0.04;

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




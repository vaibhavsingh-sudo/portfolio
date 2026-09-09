"use client";

import { useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Hero3D from "./components/Hero3D";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <div className="p-1 bg-[#121212] h-screen w-screen overflow-hidden cursor-none">
        <div className="bg-[#121212] p-3 h-full w-full rounded-xl flex flex-col justify-between text-white relative">
          {/* Background 3D Torus Element */}
          <Hero3D />

          {/* Header Navigation */}
          <div className="flex justify-between items-center z-40 relative">
            <div className="ml-4 mt-4">
              <span className="font-general text-xs ml-2 cursor-pointer" data-cursor="sticky">PORTFOLIO</span>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              data-cursor="sticky"
              className="w-auto inline-flex flex-col items-end justify-center gap-y-1.5 mr-4 mt-4 cursor-pointer z-50 p-2.5 group focus:outline-none"
            >
              <div
                className={`h-0.5 w-7 bg-white transition-all duration-300 ease-in-out transform origin-center ${
                  isOpen ? "translate-y-[8px] rotate-45" : ""
                }`}
              />
              <div
                className={`h-0.5 w-7 bg-white transition-all duration-300 ease-in-out transform ${
                  isOpen ? "opacity-0 scale-x-0" : "opacity-100"
                }`}
              />
              <div
                className={`h-0.5 w-7 bg-white transition-all duration-300 ease-in-out transform origin-center ${
                  isOpen ? "-translate-y-[8px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>

          {/* Main Title & Description (Floating cleanly over 3D Canvas) */}
          <div className="my-auto flex flex-col gap-4 ml-24 z-10 relative">
            <div className="font-helvetica font-semibold uppercase tracking-tight text-[13vw] leading-[0.85] text-white">
              <div>VAIBHAV</div>
              <div>SINGH</div>
            </div>

            <p className="font-general text-xs text-neutral-300 max-w-lg uppercase leading-normal">
              I’M A CREATIVE DEVELOPER PASSIONATE ABOUT TURNING IDEAS INTO MODERN, INTERACTIVE DIGITAL EXPERIENCES. I BLEND WEB DEVELOPMENT, UI DESIGN, AND PERFORMANCE TO CREATE ELEGANT, RESPONSIVE, AND ENGAGING PROJECTS. I BRING IDEAS TO LIFE THROUGH CLEAN CODE, CREATIVE DESIGN, AND A CONSTANT DRIVE TO BUILD SOMETHING BETTER.
            </p>
          </div>

          {/* Bottom Right Scroll Down Widget */}
          <div className="absolute bottom-8 right-10 flex items-center justify-center w-28 h-28 cursor-pointer group select-none z-40">
            <svg className="w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
              <path
                id="scrollCirclePath"
                d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
              <text className="font-general text-[7.5px] uppercase tracking-[0.16em] fill-neutral-400 group-hover:fill-white font-medium transition-colors duration-300">
                <textPath href="#scrollCirclePath" startOffset="0%">
                  SCROLL DOWN • SCROLL DOWN • SCROLL DOWN •
                </textPath>
              </text>
            </svg>

            <div className="absolute inset-0 m-auto w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:border-white/50 group-hover:bg-white/10 transition-colors duration-300">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l-6-6m6 6l6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

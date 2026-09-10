"use client";

import { useState, useEffect } from "react";
import CustomCursor from "./components/CustomCursor";
import Hero3D from "./components/Hero3D";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { label: "HOME", href: "#" },
    { label: "SKILLS", href: "#skills" },
    { label: "ABOUT", href: "#about" },
    { label: "WORK", href: "#work" },
    { label: "CONTACT", href: "#contact" },
  ];

  const socialLinks = [
    { label: "INSTAGRAM", href: "https://instagram.com" },
    { label: "X", href: "https://youtube.com" },
    { label: "LINKEDIN", href: "https://linkedin.com" },
    { label: "GITHUB", href: "https://github.com" },
  ];

  return (
    <>
      <CustomCursor />

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-md transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`bg-white text-[#121212] w-full sm:w-[580px] md:w-[52vw] lg:w-[48vw] min-w-[320px] h-screen fixed top-0 right-0 z-50 px-6 sm:px-8 md:px-10 py-8 sm:py-10 shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
          isOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-end items-center">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Menu"
            data-cursor="sticky"
            className="absolute top-7 right-7 sm:top-8 sm:right-8 w-12 h-12 flex items-center justify-center text-[#121212] hover:text-neutral-500 transition-colors duration-300 focus:outline-none group cursor-pointer z-50"
          >
            <svg
              className="w-9 h-9 sm:w-10 sm:h-10 transform group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="my-auto flex flex-col gap-2 sm:gap-3 py-6">
          {navLinks.map((link, idx) => (
            <div key={link.label} className="overflow-hidden">
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                data-cursor="sticky"
                className={`block text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#121212]/85 hover:text-black transition-all duration-500 ease-out transform group ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${isOpen ? idx * 70 + 120 : 0}ms` }}
              >
                <span className="inline-block group-hover:translate-x-3 transition-transform duration-300">
                  {link.label}
                </span>
              </a>
            </div>
          ))}
        </nav>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-8 border-t border-neutral-200 transition-all duration-700 ease-out delay-500 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
              E-MAIL
            </span>
            <a
              href="mailto:vaibhav05dec@gmail.com"
              className="text-sm font-sans text-[#121212] hover:text-neutral-600 transition-colors font-medium"
            >
              vaibhav05dec@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
              SOCIAL MEDIA
            </span>
            <div className="text-[10px] sm:text-xs font-mono text-[#121212] flex flex-nowrap items-center gap-1.5 sm:gap-2 font-medium whitespace-nowrap overflow-hidden">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="sticky"
                  className="hover:text-neutral-500 transition-colors shrink-0"
                >
                  &#123; {social.label} &#125;
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-1 bg-[#121212] h-screen w-screen overflow-hidden">
        <div className="bg-[#121212] p-3 h-full w-full rounded-xl flex flex-col justify-between text-white relative">
          <Hero3D />

          <div
            className={`absolute inset-0 pointer-events-none z-10 bg-[#121212]/25 backdrop-blur-[3px] rounded-xl border border-white/[0.03] transition-all duration-1000 ease-out ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
            }`}
          />

          <div className="flex justify-between items-center z-30 relative">
            <div
              className={`ml-4 mt-4 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            />

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              data-cursor="sticky"
              className={`inline-flex flex-col bg-white rounded-full h-12 w-12 items-center justify-center gap-y-1.5 mr-4 mt-4 cursor-pointer z-30 p-2.5 group focus:outline-none transition-all duration-700 ease-out delay-150 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              <div
                className={`h-0.5 w-6 bg-black transition-all duration-300 ease-in-out transform origin-center ${
                  isOpen ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <div
                className={`h-0.5 w-6 bg-black transition-all duration-300 ease-in-out transform origin-center ${
                  isOpen ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>

          <div className="my-auto flex flex-col gap-4 ml-24 z-20 relative">
            <div className="font-helvetica font-semibold uppercase tracking-tight text-[13vw] leading-[0.85] text-white">
              <div className="overflow-hidden">
                <div
                  className={`transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 ${
                    isLoaded ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  VAIBHAV
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className={`transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-500 ${
                    isLoaded ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  SINGH
                </div>
              </div>
            </div>

            <p
              className={`font-general text-xs text-neutral-300 max-w-lg uppercase leading-normal transition-all duration-1000 ease-out delay-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              I’M A CREATIVE DEVELOPER PASSIONATE ABOUT TURNING IDEAS INTO MODERN, INTERACTIVE DIGITAL EXPERIENCES. I BLEND WEB DEVELOPMENT, UI DESIGN, AND PERFORMANCE TO CREATE ELEGANT, RESPONSIVE, AND ENGAGING PROJECTS. I BRING IDEAS TO LIFE THROUGH CLEAN CODE, CREATIVE DESIGN, AND A CONSTANT DRIVE TO BUILD SOMETHING BETTER.
            </p>
          </div>

          <div
            className={`absolute bottom-8 right-10 flex items-center justify-center w-28 h-28 cursor-pointer group select-none z-30 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-900 ${
              isLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-6"
            }`}
          >
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

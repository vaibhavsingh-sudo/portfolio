"use client";

import { useState, useEffect, useRef } from "react";
import CustomCursor from "./components/CustomCursor";
import Hero3D from "./components/Hero3D";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const contactRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const mindRef = useRef(null);
  const emailRef = useRef(null);
  const socialRef = useRef(null);
  const wordmarkRef = useRef(null);

  const sideNavRef = useRef(null);
  const backdropRef = useRef(null);
  const menuTimeline = useRef(null);
  const navItemRefs = useRef([]);
  navItemRefs.current = [];
  const navFooterRef = useRef(null);

  const addToNavRefs = (el) => {
    if (el && !navItemRefs.current.includes(el)) {
      navItemRefs.current.push(el);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(backdropRef.current, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.4,
      ease: "power2.out",
    })
      .fromTo(
        sideNavRef.current,
        { xPercent: 100, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.75,
          ease: "expo.out",
        },
        "-=0.3"
      )
      .fromTo(
        navItemRefs.current,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power4.out",
        },
        "-=0.4"
      )
      .fromTo(
        navFooterRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

    menuTimeline.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      menuTimeline.current?.play();
    } else {
      menuTimeline.current?.reverse();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        tagRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          titleRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out" },
          "-=0.6"
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.2, ease: "power3.inOut" },
          "-=0.7"
        )
        .fromTo(
          mindRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          [emailRef.current, socialRef.current],
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          wordmarkRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
          "-=0.5"
        );
    }, contactRef);

    return () => ctx.revert();
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

      {/* Backdrop Overlay */}
      <div
        ref={backdropRef}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md opacity-0 pointer-events-none"
      />

      {/* Side Navigation Drawer */}
      <div
        ref={sideNavRef}
        className="bg-[#E4E5E0] text-[#121212] w-full sm:w-[580px] md:w-[52vw] lg:w-[48vw] min-w-[320px] h-screen fixed top-0 right-0 z-50 px-6 sm:px-8 md:px-10 py-8 sm:py-10 shadow-2xl flex flex-col justify-between overflow-hidden opacity-0 pointer-events-none"
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
          {navLinks.map((link) => (
            <div key={link.label} className="overflow-hidden">
              <a
                ref={addToNavRefs}
                href={link.href}
                onClick={() => setIsOpen(false)}
                data-cursor="sticky"
                className="block text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#121212]/85 hover:text-black transition-colors duration-300 group"
              >
                <span className="inline-block group-hover:translate-x-3 transition-transform duration-300">
                  {link.label}
                </span>
              </a>
            </div>
          ))}
        </nav>

        <div
          ref={navFooterRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-8 border-t border-neutral-200"
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

      <div className="p-1 bg-[#121212] h-screen w-full overflow-hidden">
        <div className="bg-[#121212] p-3 h-full w-full rounded-xl flex flex-col justify-between text-white relative">
          <Hero3D />

          <div
            className={`absolute inset-0 pointer-events-none z-10 bg-[#121212]/25 backdrop-blur-[3px] rounded-xl border border-white/[0.03] transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
              }`}
          />

          <div className="flex justify-between items-center z-30 relative">
            <div
              className={`ml-4 mt-4 transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
            />

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              data-cursor="sticky"
              className={`fixed top-7 right-7 sm:top-8 sm:right-8 inline-flex flex-col bg-white rounded-full h-12 w-12 items-center justify-center gap-y-1.5 cursor-pointer z-40 p-2.5 group focus:outline-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${!isLoaded
                ? "opacity-0 scale-0"
                : scrolled && !isOpen
                  ? "scale-0 opacity-0 pointer-events-none"
                  : "scale-100 opacity-100 pointer-events-auto"
                }`}
            >
              <div
                className={`h-0.5 w-6 bg-black transition-all duration-300 ease-in-out transform origin-center ${isOpen ? "translate-y-[4px] rotate-45" : ""
                  }`}
              />
              <div
                className={`h-0.5 w-6 bg-black transition-all duration-300 ease-in-out transform origin-center ${isOpen ? "-translate-y-[4px] -rotate-45" : ""
                  }`}
              />
            </button>
          </div>

          <div className="my-auto flex flex-col gap-4 ml-24 z-20 relative">
            <div className="font-helvetica font-semibold uppercase tracking-tight text-[13vw] leading-[0.85] text-white">
              <div className="overflow-hidden">
                <div
                  className={`transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 ${isLoaded ? "translate-y-0" : "translate-y-full"
                    }`}
                >
                  VAIBHAV
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className={`transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-500 ${isLoaded ? "translate-y-0" : "translate-y-full"
                    }`}
                >
                  SINGH
                </div>
              </div>
            </div>

            <p
              className={`font-general text-xs text-neutral-300 max-w-lg uppercase leading-normal transition-all duration-1000 ease-out delay-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
              I’M A CREATIVE DEVELOPER PASSIONATE ABOUT TURNING IDEAS INTO MODERN, INTERACTIVE DIGITAL EXPERIENCES. I BLEND WEB DEVELOPMENT, UI DESIGN, AND PERFORMANCE TO CREATE ELEGANT, RESPONSIVE, AND ENGAGING PROJECTS. I BRING IDEAS TO LIFE THROUGH CLEAN CODE, CREATIVE DESIGN, AND A CONSTANT DRIVE TO BUILD SOMETHING BETTER.
            </p>
          </div>

          <div
            className={`absolute bottom-8 right-10 flex items-center justify-center w-28 h-28 cursor-pointer group select-none z-30 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-900 ${isLoaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-6"
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
      <div className="bg-[#E4E5E0] text-[#121212] py-4 sm:py-5 overflow-hidden select-none border-t border-neutral-300">
        <div className="animate-marquee flex items-center whitespace-nowrap font-helvetica text-sm sm:text-base md:text-lg uppercase tracking-[0.22em] font-medium">
          <div className="flex items-center gap-8 sm:gap-12 px-4 sm:px-6">
            <span>YOU IMAGINE</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
            <span>I CODE</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
            <span>CRAFTING DIGITAL EXPERIENCES</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
          </div>

          <div className="flex items-center gap-8 sm:gap-12 px-4 sm:px-6">
            <span>YOU IMAGINE</span>
            <span className="text-xl sm:text-xl opacity-70">✦</span>
            <span>I CODE</span>
            <span className="text-xl sm:text-xl opacity-70">✦</span>
            <span>CRAFTING DIGITAL EXPERIENCES</span>
            <span className="text-xl sm:text-xl opacity-70">✦</span>
          </div>

          <div className="flex items-center gap-8 sm:gap-12 px-4 sm:px-6">
            <span>YOU IMAGINE</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
            <span>I CODE</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
            <span>CRAFTING DIGITAL EXPERIENCES</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
          </div>

          <div className="flex items-center gap-8 sm:gap-12 px-4 sm:px-6">
            <span>YOU IMAGINE</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
            <span>I CODE</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
            <span>CRAFTING DIGITAL EXPERIENCES</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
          </div>
        </div>
      </div>
      {/* CONTACT SECTION WITH GSAP SCROLLTRIGGER */}
      <div
        id="contact"
        ref={contactRef}
        className="bg-[#121212] h-screen w-screen relative overflow-hidden flex flex-col justify-between"
      >
        <div>
          <div className="p-8 pt-10">
            <div className="overflow-hidden">
              <span
                ref={tagRef}
                className="font-amiamie uppercase text-xs text-white block"
              >
                Building experiences, not just websites.
              </span>
            </div>
            <div className="overflow-hidden">
              <h1
                ref={titleRef}
                className="text-8xl font-semibold text-white inline-block"
              >
                CONTACT
              </h1>
            </div>
          </div>

          <div
            ref={lineRef}
            className="h-[1.5px] w-screen bg-[#E4E5E0] -mt-10 origin-left"
          />

          <div className="relative">
            <div
              ref={mindRef}
              className="absolute top-10 right-10 font-helvetica text-lg text-white"
            >
              <span className="justify-end flex text-neutral-400 font-medium">SOMETHING IN MIND?</span>
              <p className="font-semibold mt-0.5">LET’S CREATE SOMETHING WORTH REMEMBERING.</p>
            </div>
          </div>

          <div className="px-8 pt-36 flex flex-col gap-1 text-white max-w-2xl">
            <div ref={emailRef}>
              <span className="text-sm uppercase tracking-widest text-neutral-400 block font-sans font-medium">
                E-MAIL
              </span>
              <div className="border-t border-neutral-800 mb-6">
                <a
                  href="mailto:vaibhav05dec@gmail.com"
                  className="text-xl sm:text-2xl font-sans mt-1.5 text-white font-normal hover:text-neutral-300 transition-colors inline-block"
                  data-cursor="sticky"
                >
                  vaibhav05dec@gmail.com
                </a>
              </div>
            </div>

            <div ref={socialRef}>
              <span className="text-sm uppercase tracking-widest text-neutral-400 block font-sans font-medium">
                SOCIAL MEDIA
              </span>
              <div className="border-t border-neutral-800">
                <div className="text-sm sm:text-base font-mono text-white flex flex-wrap gap-3 mt-2 font-medium">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="sticky"
                      className="hover:text-neutral-400 transition-colors"
                    >
                      &#123;{social.label}&#125;
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Giant Full-Width Footer Wordmark with GSAP ScrollTrigger */}
        <div className="w-full overflow-hidden select-none -mb-3 sm:-mb-5 relative">
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white/15 to-transparent blur-3xl pointer-events-none" />
          <h1
            ref={wordmarkRef}
            className="font-helvetica font-black text-[19vw] leading-[0.72] tracking-tighter uppercase text-center whitespace-nowrap bg-gradient-to-b from-white via-neutral-100 to-neutral-500/35 bg-clip-text text-transparent drop-shadow-lg"
          >
            VAIBHAV
          </h1>
        </div>
      </div>
    </>
  );
}

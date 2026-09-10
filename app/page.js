"use client";

import { useState, useEffect, useRef } from "react";
import CustomCursor from "./components/CustomCursor";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [hoveredProject, setHoveredProject] = useState(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });

  const contactRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const mindRef = useRef(null);
  const emailRef = useRef(null);
  const socialRef = useRef(null);
  const wordmarkRef = useRef(null);

  const skillsSectionRef = useRef(null);
  const skillsTagRef = useRef(null);
  const skillsTitleRef = useRef(null);
  const skillsDescRef = useRef(null);
  const skillsCardsRef = useRef([]);
  skillsCardsRef.current = [];

  const workSectionRef = useRef(null);
  const workTagRef = useRef(null);
  const workTitleRef = useRef(null);
  const workDescRef = useRef(null);
  const workCardsRef = useRef([]);
  workCardsRef.current = [];

  const addToSkillsCardsRef = (el) => {
    if (el && !skillsCardsRef.current.includes(el)) {
      skillsCardsRef.current.push(el);
    }
  };

  const addToWorkCardsRef = (el) => {
    if (el && !workCardsRef.current.includes(el)) {
      workCardsRef.current.push(el);
    }
  };

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
    const handleMouseMoveWindow = (e) => {
      setPreviewPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMoveWindow);
    return () => window.removeEventListener("mousemove", handleMouseMoveWindow);
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

      const skillsHeaderTl = gsap.timeline({
        scrollTrigger: {
          trigger: skillsSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      skillsHeaderTl
        .fromTo(
          skillsTagRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(
          skillsTitleRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out" },
          "-=0.6"
        )
        .fromTo(
          skillsDescRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );

      skillsCardsRef.current.forEach((card) => {
        if (!card) return;

        const cardTitle = card.querySelector(".card-title");
        const cardNumber = card.querySelector(".card-number");
        const cardDesc = card.querySelector(".card-desc");
        const subSkills = card.querySelectorAll(".sub-skill-item");

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        cardTl
          .fromTo(
            [cardTitle, cardNumber],
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1 }
          )
          .fromTo(
            cardDesc,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(
            subSkills,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
            "-=0.5"
          );
      });

      const workHeaderTl = gsap.timeline({
        scrollTrigger: {
          trigger: workSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      workHeaderTl
        .fromTo(
          workTagRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(
          workTitleRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out" },
          "-=0.6"
        )
        .fromTo(
          workDescRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
    });

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      id: "01",
      title: "FullStack Development",
      description:
        "Your business deserves a fast, secure, and future-proof digital foundation. I develop custom web apps with clean architecture, optimized databases, and seamless integrations—ensuring reliability at every layer.",
      subSkills: [
        { num: "01", name: "Backend Engineering" },
        { num: "02", name: "Frontend Excellence" },
        { num: "03", name: "Database Design" },
      ],
    },
    {
      id: "02",
      title: "DevOps & Cloud Solutions",
      description:
        "Deploying software shouldn't be a gamble. I automate infrastructure, enforce security, and leverage cloud platforms (AWS/Vercel) to keep your app running smoothly—24/7, at any scale.",
      subSkills: [
        { num: "01", name: "CI/CD Pipelines" },
        { num: "02", name: "Server Management" },
        { num: "03", name: "Performance Tuning" },
      ],
    },
    {
      id: "03",
      title: "Security & Optimization",
      description:
        "Slow or hacked apps destroy trust. I harden security (XSS/SQLi protection, OAuth) and optimize bottlenecks so your app stays fast, safe, and scalable as you grow.",
      subSkills: [
        { num: "01", name: "Code Audits" },
        { num: "02", name: "Pen Testing" },
        { num: "03", name: "SEO Tech Stack" },
      ],
    },
    {
      id: "04",
      title: "Web & Mobile Apps",
      description:
        "A clunky interface can sink even the best ideas. I craft responsive, pixel perfect web and mobile apps (React Native/Flutter) that users love—bridging design and functionality seamlessly.",
      subSkills: [
        { num: "01", name: "Cross-Platform Apps" },
        { num: "02", name: "PWAs" },
        { num: "03", name: "E-Commerce" },
      ],
    },
  ];

  const workProjects = [
    {
      id: "01",
      title: "Plant Shop E-commerce",
      tags: ["REACT", "NEXT.JS", "STRIPE API", "TAILWIND CSS"],
      image: "/previews/velox.png",
      href: "#contact",
    },
    {
      id: "02",
      title: "Nexus AI Workspace",
      tags: ["REACT", "NEXT.JS 14", "PINECONE", "TAILWIND CSS"],
      image: "/previews/nexus.png",
      href: "#contact",
    },
    {
      id: "03",
      title: "Aether Telemetry Dashboard",
      tags: ["REACT", "NODE.JS", "DOCKER", "TIMESCALEDB"],
      image: "/previews/aether.png",
      href: "#contact",
    },
    {
      id: "04",
      title: "Krypton Event Pipeline",
      tags: ["TYPESCRIPT", "GO", "KAFKA", "CLICKHOUSE"],
      image: "/previews/krypton.png",
      href: "#contact",
    },
    {
      id: "05",
      title: "Velox Digital Storefront",
      tags: ["REACT", "NEXT.JS", "GRAPHQL", "TAILWIND CSS"],
      image: "/previews/velox.png",
      href: "#contact",
    },
    {
      id: "06",
      title: "Pulse Realtime Analytics",
      tags: ["NEXT.JS", "WEBSOCKETS", "REDIS", "TAILWIND CSS"],
      image: "/previews/aether.png",
      href: "#contact",
    },
  ];

  const navLinks = [
    { label: "HOME", href: "#" },
    { label: "SKILLS", href: "#skills" },
    { label: "WORKS", href: "#work" },
    { label: "CONTACT", href: "#contact" },
  ];

  const socialLinks = [
    { label: "INSTAGRAM", href: "https://www.instagram.com/the.vaibhavvsingh" },
    { label: "X", href: "https://x.com/Vaibhav05943" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/vaibhav-singh-877a45389/" },
    { label: "GITHUB", href: "https://github.com/vaibhavsingh-sudo" },
  ];

  return (
    <>
      <CustomCursor />

      {/* Small Hover Preview Modal - Only Visible When Hovered */}
      <div
        className={`fixed pointer-events-none z-[100] transition-all duration-300 ease-out hidden md:block ${hoveredProject ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        style={{
          left: `${Math.min(previewPos.x + 20, window.innerWidth - 440)}px`,
          top: `${Math.min(Math.max(previewPos.y - 140, 20), window.innerHeight - 300)}px`,
        }}
      >
        {hoveredProject && (
          <div className="w-[380px] sm:w-[440px] h-[230px] sm:h-[270px] bg-[#121212] border-4 border-[#121212] rounded-lg overflow-hidden shadow-2xl relative">
            <img
              src={hoveredProject.image}
              alt={hoveredProject.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}
      </div>

      <div
        ref={backdropRef}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md opacity-0 pointer-events-none"
      />

      <div
        ref={sideNavRef}
        className="bg-[#E4E5E0] text-[#121212] w-full sm:w-[580px] md:w-[52vw] lg:w-[48vw] min-w-[320px] h-screen fixed top-0 right-0 z-50 px-6 sm:px-8 md:px-10 py-8 sm:py-10 flex flex-col justify-between overflow-hidden opacity-0 pointer-events-none"
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

      <section className="relative min-h-screen w-full bg-[#121212] overflow-hidden flex flex-col justify-between border-b border-[#1a1a1a] select-none text-[#f4f3ef]">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:120px_100%]" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          data-cursor="sticky"
          className={`fixed top-7 right-7 sm:top-8 sm:right-8 inline-flex flex-col bg-white rounded-full h-12 w-12 items-center justify-center gap-y-1.5 cursor-pointer z-50 p-2.5 group focus:outline-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${!isLoaded
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

        <div className="relative z-20 w-full px-6 sm:px-12 md:px-16 pt-16 sm:pt-48">
          <div
            className={`text-xs sm:text-sm font-mono tracking-[0.4rem] uppercase text-neutral-400 mb-4 transition-all duration-1000 ease-out delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            ✦ Full-stack developer
          </div>

          <h1
            className={`font-instrument font-normal text-[4.5rem] sm:text-[6.5rem] md:text-[9vw] leading-[0.75] text-[#f4f3ef] tracking-tight uppercase whitespace-nowrap transition-all duration-1000 ease-out delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            VAIBHAV SINGH
          </h1>
        </div>

        <div className="relative z-20 w-full md:-mt-[2.2vw]">
          <div className="w-full h-[1.5px] bg-[#f4f3ef]/80" />
        </div>

        <div className="relative z-20 w-full px-6 sm:px-12 md:px-16 pb-12 sm:pb-16 flex justify-end">
          <div
            className={`text-end max-w-2xl font-mono text-sm sm:text-base md:text-lg uppercase text-[#a8a8a3] leading-relaxed tracking-wide flex flex-col gap-2 transition-all duration-1000 ease-out delay-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <p>I BUILD FAST, SECURE WEB PRODUCTS END TO END —</p>
            <p>FROM BACKEND ARCHITECTURE TO INTERFACES</p>
            <p>PEOPLE ACTUALLY ENJOY USING.</p>

            <div className="mt-6 flex justify-end">
              <a
                href="/resume.pdf"
                download
                data-cursor="sticky"
                className="inline-flex w-fit text-sm font-sans text-[#f4f3ef] border-b border-[#f4f3ef]/50 pb-1 hover:border-[#f4f3ef] transition-colors"
              >
                Download resume ↗
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-20 w-full px-6 sm:px-12 md:px-16 pb-6 flex justify-between items-center text-[12px] text-[#6b6b67] font-mono">
          <span>(01) — Portfolio</span>
          <a
            href="#skills"
            data-cursor="sticky"
            className="hover:text-white transition-colors duration-300"
          >
            Scroll ↓
          </a>
        </div>
      </section>

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
          </div>
        </div>
      </div>

      <section
        id="skills"
        ref={skillsSectionRef}
        className="bg-[#E4E5E0] text-[#121212] w-full relative pt-20 sm:pt-28 border-t border-[#121212]/15"
      >
        <div className="w-full px-6 sm:px-12 md:px-16 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="overflow-hidden mb-3">
              <span
                ref={skillsTagRef}
                className="font-amiamie uppercase text-xs sm:text-sm text-[#121212]/60 font-semibold tracking-widest block"
              >
                ✦ Technical Stack & Services
              </span>
            </div>
            <div className="overflow-hidden">
              <h2
                ref={skillsTitleRef}
                className="text-7xl sm:text-8xl md:text-[10vw] leading-[0.85] font-normal font-instrument text-[#121212] uppercase tracking-tight inline-block"
              >
                SKILLS
              </h2>
            </div>
          </div>

          <p
            ref={skillsDescRef}
            className="font-helvetica text-sm sm:text-base text-[#121212]/70 max-w-sm font-medium leading-relaxed"
          >
            Scroll down to explore core engineering domains, infrastructure capabilities, and specialized services.
          </p>
        </div>

        <div className="w-full relative flex flex-col">
          {skillCategories.map((cat, idx) => {
            const topOffset = idx * 64;

            return (
              <div
                key={cat.title}
                ref={addToSkillsCardsRef}
                style={{
                  top: `${topOffset}px`,
                  zIndex: (idx + 1) * 10,
                }}
                className="sticky w-full bg-[#121212] text-white border-t border-neutral-800/90"
              >
                <div className="h-[64px] w-full px-6 sm:px-12 md:px-16 flex items-center justify-between border-b border-neutral-800/80 bg-[#121212]/95 backdrop-blur-md">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-helvetica font-normal tracking-tight text-white card-title">
                    {cat.title}
                  </h3>
                  <span className="text-xs font-mono text-neutral-500 font-medium tracking-widest card-number">
                    (0{idx + 1})
                  </span>
                </div>

                <div className="w-full px-6 sm:px-12 md:px-16 pt-8 pb-16 sm:pb-24 bg-[#121212]">
                  <p className="text-base sm:text-lg md:text-xl font-sans text-neutral-400 max-w-5xl leading-relaxed mb-10 font-normal card-desc">
                    {cat.description}
                  </p>

                  <div className="flex flex-col border-t border-neutral-800/80 w-full">
                    {cat.subSkills.map((sub) => (
                      <div
                        key={sub.name}
                        className="sub-skill-item py-5 sm:py-6 border-b border-neutral-800/80 flex items-baseline justify-between hover:bg-white/[0.03] px-3 sm:px-6 transition-all duration-300 rounded-lg group cursor-default"
                      >
                        <div className="flex items-baseline gap-6 sm:gap-10">
                          <span className="text-xs sm:text-sm font-mono text-neutral-500 font-medium">
                            {sub.num}
                          </span>
                          <span className="text-lg sm:text-xl md:text-2xl font-sans text-white font-medium tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                            {sub.name}
                          </span>
                        </div>

                        <span className="text-sm font-mono text-neutral-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                          ↗
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WORKS SECTION - MATCHING SKILLS SECTION HEADER & STYLING */}
      <section
        id="work"
        ref={workSectionRef}
        className="bg-[#E4E5E0] text-[#121212] w-full relative pt-20 sm:pt-28 pb-0 border-t border-[#121212]/15 select-none"
      >
        <div className="w-full px-6 sm:px-12 md:px-16 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="overflow-hidden mb-3">
              <span
                ref={workTagRef}
                className="font-amiamie uppercase text-xs sm:text-sm text-[#121212]/60 font-semibold tracking-widest block"
              >
                ✦ Selected Works
              </span>
            </div>
            <div className="overflow-hidden">
              <h2
                ref={workTitleRef}
                className="text-7xl sm:text-8xl md:text-[10vw] leading-[0.85] font-normal font-instrument text-[#121212] uppercase tracking-tight inline-block"
              >
                WORKS
              </h2>
            </div>
          </div>

          <p
            ref={workDescRef}
            className="font-helvetica text-sm sm:text-base text-[#121212]/70 max-w-sm font-medium leading-relaxed"
          >
            METICULOUSLY CRAFTED DIGITAL PRODUCTS & HIGH-PERFORMANCE WEB SYSTEMS BUILT TO DRIVE REAL IMPACT.
          </p>
        </div>

        <div className="w-full border-t border-[#121212]/20 flex flex-col">
          {workProjects.map((project) => {
            const isHovered = hoveredProject?.title === project.title;

            return (
              <a
                key={project.title}
                href={project.href}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                data-cursor="sticky"
                className={`w-full px-6 sm:px-12 md:px-16 py-6 sm:py-7 border-b border-neutral-800/90 transition-all duration-300 flex items-center justify-between group ${isHovered
                  ? "bg-[#E4E5E0] text-[#121212] pl-8 sm:pl-16 md:pl-20"
                  : "bg-[#121212] text-[#f4f3ef]"
                  }`}
              >
                <div className="flex flex-col gap-1.5">
                  <h3
                    className={`text-2xl sm:text-3xl md:text-4xl font-sans font-normal tracking-tight uppercase transition-colors duration-300 ${isHovered ? "text-[#121212]" : "text-[#f4f3ef]"
                      }`}
                  >
                    {project.title}
                  </h3>
                  <div
                    className={`flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-colors duration-300 ${isHovered ? "text-[#121212]/75" : "text-neutral-400"
                      }`}
                  >
                    {project.tags.join("   ")}
                  </div>
                </div>

                <div className="flex items-center">
                  <span
                    className={`text-xl sm:text-2xl font-mono transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${isHovered ? "text-[#121212]" : "text-[#f4f3ef]"
                      }`}
                  >
                    ↗
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <div className="bg-[#E4E5E0] text-[#121212] py-4 sm:py-5 overflow-hidden select-none border-t border-b border-neutral-300 relative z-30">
        <div className="animate-marquee flex items-center whitespace-nowrap font-helvetica text-sm sm:text-base md:text-lg uppercase tracking-[0.22em] font-medium">
          <div className="flex items-center gap-8 sm:gap-12 px-4 sm:px-6">
            <span>BUILDING EXPERIENCES, NOT JUST WEBSITES</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
            <span>LET’S CREATE SOMETHING WORTH REMEMBERING</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
            <span>GET IN TOUCH</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
          </div>

          <div className="flex items-center gap-8 sm:gap-12 px-4 sm:px-6">
            <span>BUILDING EXPERIENCES, NOT JUST WEBSITES</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
            <span>LET’S CREATE SOMETHING WORTH REMEMBERING</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
            <span>GET IN TOUCH</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
          </div>

          <div className="flex items-center gap-8 sm:gap-12 px-4 sm:px-6">
            <span>BUILDING EXPERIENCES, NOT JUST WEBSITES</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
            <span>LET’S CREATE SOMETHING WORTH REMEMBERING</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
            <span>GET IN TOUCH</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
          </div>

          <div className="flex items-center gap-8 sm:gap-12 px-4 sm:px-6">
            <span>BUILDING EXPERIENCES, NOT JUST WEBSITES</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
            <span>LET’S CREATE SOMETHING WORTH REMEMBERING</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
            <span>GET IN TOUCH</span>
            <span className="text-xs sm:text-sm opacity-70">✦</span>
          </div>
        </div>
      </div>

      <div
        id="contact"
        ref={contactRef}
        className="bg-[#121212] min-h-screen w-full relative overflow-hidden flex flex-col justify-between pt-10 pb-4"
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
                className="text-8xl font-normal font-instrument text-white inline-block"
              >
                CONTACT
              </h1>
            </div>
          </div>

          <div
            ref={lineRef}
            className="h-[1.5px] w-full bg-[#E4E5E0] -mt-10 origin-left"
          />

          <div className="relative">
            <div
              ref={mindRef}
              className="absolute top-10 right-10 font-jakarta text-lg text-white"
            >
              <span className="justify-end flex text-neutral-400 font-medium">SOMETHING IN MIND?</span>
              <p className="font-semibold mt-0.5">LET’S CREATE SOMETHING WORTH REMEMBERING.</p>
            </div>
          </div>

          <div className="px-8 pt-36 flex flex-col gap-1 text-white max-w-2xl">
            <div ref={emailRef}>
              <span className="text-sm uppercase tracking-widest text-neutral-400 block font-space-mono font-medium">
                E-MAIL
              </span>
              <div className="border-t border-neutral-800 mb-6">
                <a
                  href="mailto:vaibhav05dec@gmail.com"
                  className="text-xl sm:text-2xl font-jakarta mt-1.5 text-white font-normal hover:text-neutral-300 transition-colors inline-block"
                  data-cursor="sticky"
                >
                  vaibhav05dec@gmail.com
                </a>
              </div>
            </div>

            <div ref={socialRef}>
              <span className="text-sm uppercase tracking-widest text-neutral-400 block font-space-mono font-medium">
                SOCIAL MEDIA
              </span>
              <div className="border-t border-neutral-800">
                <div className="text-sm sm:text-base font-space-mono text-[#121212] flex flex-wrap gap-3 mt-2 font-medium">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="sticky"
                      className="hover:text-neutral-400 transition-colors text-white"
                    >
                      &#123;{social.label}&#125;
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

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

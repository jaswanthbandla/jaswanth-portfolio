"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from "framer-motion";
import {
  ArrowRight,
  Download,
  ExternalLink,
  CheckCircle2,
  Mail,
  MapPin,
  GraduationCap,
} from "lucide-react";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<string>("home");

  // ==========================================
  // 1. MOUSE 3D PARALLAX & AMBIENT DEPTH
  // ==========================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring to prevent quick jerky movement
  const springConfig = { damping: 35, stiffness: 90 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Subtle background camera shift that preserves the full artwork framing
  const bgMouseX = useTransform(smoothMouseX, [-0.5, 0.5], ["0.8%", "-0.8%"]);
  const bgMouseY = useTransform(smoothMouseY, [-0.5, 0.5], ["0.8%", "-0.8%"]);

  // Natural 3D perspective tilt on hero typography
  const heroRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [3, -3]);
  const heroRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-3.5, 3.5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // ==========================================
  // 2. ULTRA-SMOOTH, SLOW-MOTION SCROLL DEPTH
  // ==========================================
  const { scrollYProgress } = useScroll();
  
  // Heavily dampened spring for a cinematic, slow-paced background response
  const slowScroll = useSpring(scrollYProgress, {
    damping: 55,
    stiffness: 45,
    mass: 1.1,
  });

  // Extremely subtle scale and translation range so background never rushes or crops out
  const scrollBgScale = useTransform(slowScroll, [0, 1], [1, 1.035]);
  const scrollBgY = useTransform(slowScroll, [0, 1], ["0%", "-2%"]);

  // ==========================================
  // 3. FAIL-SAFE SCROLL & REAL-TIME SCROLLSPY
  // ==========================================
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navOffset = 85;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - navOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    setActiveSection(id);
  };

  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "projects",
      "skills",
      "journey",
      "certifications",
      "contact",
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Journey", id: "journey" },
    { label: "Certifications", id: "certifications" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#07090e] text-white selection:bg-amber-500 selection:text-black">
      {/* 3D VIBRANT HERO.JPG BACKGROUND SCENE (NO HEAVY BLACK FOG OR CROPPING) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="w-full h-full bg-cover bg-center md:bg-[center_top]"
          style={{
            backgroundImage: `url('/hero1.jpg')`,
            x: bgMouseX,
            y: bgMouseY,
            scale: scrollBgScale,
            translateY: scrollBgY,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
          }}
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* DELICATE FLOATING AMBIENT PARTICLES */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-400/40 blur-[0.5px]"
            style={{
              width: `${(i % 2) + 2}px`,
              height: `${(i % 2) + 2}px`,
              top: `${(i * 6) % 95}%`,
              left: `${(i * 12.5) % 95}%`,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.1, 0.7, 0.1],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* ========================================== */}
      {/* FIXED TOP NAVBAR                           */}
      {/* ========================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between gap-3 px-4 md:px-14 py-3 md:py-4 bg-black/60 backdrop-blur-md border-b border-white/10">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-3 cursor-pointer group bg-transparent border-0 p-0 text-left"
        >
          <span className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/20 bg-black/60 group-hover:border-amber-400 font-extrabold text-amber-400 transition-colors text-sm">
            JB
          </span>
          <span className="text-xs md:text-sm font-semibold tracking-widest text-zinc-100 group-hover:text-amber-300 transition-colors">
            JASWANTH BANDLA
          </span>
        </button>

        <nav className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1 scrollbar-none order-3 lg:order-2">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 md:px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer border-0 ${
                  isActive
                    ? "text-black bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)] font-bold scale-105"
                    : "text-zinc-200 bg-transparent hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => scrollTo("contact")}
          className="flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-white/20 bg-black/60 backdrop-blur-md hover:border-amber-400 hover:bg-white/10 text-xs font-semibold text-white transition-all shadow-lg cursor-pointer order-2 lg:order-3"
        >
          Let's Talk <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        </button>
      </header>

      {/* ========================================== */}
      {/* SCROLLABLE FULL-WIDTH CONTENT BODY         */}
      {/* ========================================== */}
      <main className="relative z-10 pt-28 md:pt-20">
        {/* ================= 1. HOME SECTION (ZERO FROSTED CARD, CLEAN FLOATING TEXT) ================= */}
        <section
          id="home"
          className="min-h-screen flex items-center px-6 md:px-16 py-16 scroll-mt-24"
        >
          <motion.div
            style={{
              rotateX: heroRotateX,
              rotateY: heroRotateY,
              perspective: 1200,
            }}
            className="max-w-3xl"
          >
            {/* Direct floating content with zero container box, zero border, zero glossy overlay */}
            <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-amber-400 mb-3 flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              PRODUCT MANAGER | AI PRODUCT MANAGER
            </p>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
              JASWANTH <br />
              <span className="text-amber-400 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                BANDLA
              </span>
            </h1>

            <h2 className="text-xl md:text-3xl font-bold tracking-wide text-zinc-100 mt-5 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              IDEAS BUILD PEOPLE IMPACT
            </h2>

            <p className="mt-4 text-base md:text-lg text-zinc-200 max-w-xl font-normal leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
              I turn complex problems into simple, beautiful and useful products.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => scrollTo("projects")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-400 text-black font-bold text-sm hover:bg-amber-300 transition-all shadow-[0_0_20px_rgba(245,158,11,0.5)] cursor-pointer border-0"
              >
                Explore My Work <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/resume.pdf"
                download="Jaswanth_Bandla_Resume.pdf"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/30 bg-black/60 backdrop-blur-md hover:bg-white/10 hover:border-amber-400 text-white font-medium text-sm transition-colors cursor-pointer shadow-lg"
              >
                Download Resume <Download className="w-4 h-4 text-amber-400" />
              </a>
            </div>

            <div className="flex items-center gap-8 mt-10">
              <div>
                <div className="text-3xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  3+
                </div>
                <div className="text-xs text-zinc-300 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  Projects
                </div>
              </div>
              <div className="h-8 w-[1px] bg-white/25" />
              <div>
                <div className="text-3xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  2+
                </div>
                <div className="text-xs text-zinc-300 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  Core Certifications
                </div>
              </div>
              <div className="h-8 w-[1px] bg-white/25" />
              <div>
                <div className="text-3xl font-bold text-amber-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  ∞
                </div>
                <div className="text-xs text-zinc-300 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  Learning
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm italic text-amber-300 font-serif drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
              "Good Products Create a Better Tomorrow."
            </p>
          </motion.div>
        </section>

        {/* FULL-WIDTH CONTAINER ACROSS SCREEN FOR CONTENT SECTIONS */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 lg:px-20 space-y-36 pb-24">
          {/* ================= 2. ABOUT ME ================= */}
          <section id="about" className="space-y-8 pt-10 scroll-mt-24">
            <div className="p-8 md:p-12 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md shadow-2xl">
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
                PERSONAL BIOGRAPHY & VISION
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
                About Jaswanth Bandla
              </h2>
              <p className="text-base md:text-lg text-zinc-300 mt-4 leading-relaxed">
                I am a Computer Science Engineering graduate focused on Product
                Management and AI Product Management. My interest comes from
                combining technology, genuine user problems, business thinking,
                and product strategy to build products that are useful in
                real-world situations.
              </p>
              <p className="text-sm md:text-base text-zinc-300 mt-3 leading-relaxed">
                I have developed hands-on experience through projects covering
                fintech, AI-powered wellness, and AI/product experiences. My work
                involves understanding user problems, defining product
                opportunities, structuring MVPs, creating product strategies,
                designing user journeys, developing requirements, thinking
                through metrics and experiments, and translating product ideas
                into working prototypes.
              </p>
            </div>

            <div className="p-8 md:p-10 rounded-3xl border border-amber-500/30 bg-black/80 backdrop-blur-md shadow-2xl">
              <span className="text-xs uppercase tracking-wider font-mono text-amber-400 block mb-2 font-semibold">
                Product Philosophy
              </span>
              <p className="text-xl md:text-2xl font-serif italic text-amber-100 leading-snug">
                "Build products around real problems, not around features.
                Understand why a user needs something, determine what should
                actually be built, and use technology—including AI—when it
                creates meaningful user or business value."
              </p>
            </div>

            <div className="p-8 md:p-12 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md shadow-2xl space-y-6">
              <h3 className="text-2xl font-bold text-white">
                Product Management Approach
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    step: "01",
                    title: "Understand",
                    desc: "Start with the user problem rather than jumping directly to a feature.",
                  },
                  {
                    step: "02",
                    title: "Define",
                    desc: "Turn observations and user needs into a clearly defined product problem.",
                  },
                  {
                    step: "03",
                    title: "Strategize",
                    desc: "Determine target users, value proposition, priorities, and MVP scoping.",
                  },
                  {
                    step: "04",
                    title: "Design",
                    desc: "Translate strategy into intuitive user journeys and technical requirements.",
                  },
                  {
                    step: "05",
                    title: "Build",
                    desc: "Collaborate across design, engineering, data analytics, and stakeholders.",
                  },
                  {
                    step: "06",
                    title: "Measure",
                    desc: "Define telemetry, key product metrics, and experiments to evaluate impact.",
                  },
                  {
                    step: "07",
                    title: "Improve",
                    desc: "Use telemetry data and qualitative customer feedback for continuous loops.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-5 rounded-2xl bg-black/50 border border-white/10 flex flex-col justify-between hover:border-amber-400/40 transition-colors"
                  >
                    <div>
                      <span className="text-amber-400 font-mono text-sm font-bold block mb-1">
                        {item.step}
                      </span>
                      <h4 className="text-base font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">
                  Target Career Roles
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Product Manager",
                    "Associate Product Manager",
                    "AI Product Manager",
                    "AI Product Management roles",
                    "Product roles involving AI, analytics, fintech, and digital products",
                  ].map((role) => (
                    <span
                      key={role}
                      className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">
                  Product Interests
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "AI Products",
                    "Fintech",
                    "Product Analytics",
                    "Consumer Applications",
                    "Personalization",
                    "Digital Financial Services",
                    "User-centric product development",
                  ].map((interest) => (
                    <span
                      key={interest}
                      className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-zinc-300 text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Location & Education Info (Strictly zero CGPA) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md flex items-center gap-5 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 uppercase font-mono">
                    Location
                  </div>
                  <div className="text-lg font-bold text-white">
                    Andhra Pradesh, India
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md flex items-center gap-5 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 uppercase font-mono">
                    Education
                  </div>
                  <div className="text-lg font-bold text-white">
                    B.Tech — Computer Science Engineering
                  </div>
                  <div className="text-xs text-zinc-300 mt-0.5">
                    Chirala Engineering College (2021 – 2025)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= 3. PROJECTS (01 AERIS -> 02 NOURA -> 03 VISION PAY) ================= */}
          <section id="projects" className="space-y-8 pt-10 scroll-mt-24">
            <div className="p-8 md:p-12 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md shadow-2xl">
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
                CASE STUDIES & LIVE PLATFORMS
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
                Featured Product Portfolio
              </h2>
              <p className="text-zinc-300 mt-3 text-base md:text-lg leading-relaxed">
                The three projects aren't just visual mockups. They demonstrate
                distinct product challenges: <br />
                <span className="text-amber-400 font-semibold">AERIS:</span>{" "}
                Product + AI thinking &nbsp;·&nbsp;
                <span className="text-amber-400 font-semibold">NOURA:</span> AI
                + personalization + recommendation &nbsp;·&nbsp;
                <span className="text-amber-400 font-semibold">VISION PAY:</span>{" "}
                Fintech + repayment + UX + security.
              </p>
            </div>

            <div className="space-y-8">
              {/* 01 AERIS */}
              <div className="p-8 md:p-12 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md space-y-6 hover:border-amber-500/40 transition shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                      01 — AI / Product Portfolio Project
                    </span>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
                      AERIS
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="https://aeris-platform.onrender.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition shadow-lg"
                    >
                      Live App <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://github.com/jaswanthbandla/aeris-platform"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition"
                    >
                      GitHub Repo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://github.com/jaswanthbandla/product-management-portfolio/blob/main/AERIS-Product-Management-Case-Study.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition"
                    >
                      Case Study <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/5">
                  <p className="text-amber-300 font-medium text-sm md:text-base">
                    Strategic Focus: Technology connected to clearly defined user
                    needs, not added simply because it is available.
                  </p>
                </div>

                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                  AERIS is one of my core product portfolio projects,
                  demonstrating my approach to taking a product concept through
                  problem definition, product strategy, user experience,
                  AI/product thinking, MVP planning, and implementation. It
                  validates how technical architecture connects back to core
                  problem metrics.
                </p>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-xs uppercase font-mono text-zinc-400 block mb-1">
                    Product Thinking & Lifecycle
                  </span>
                  <p className="text-xs md:text-sm text-zinc-300 font-mono">
                    Problem → Users → Research → Strategy → MVP → UX →
                    Requirements → Metrics → Experiments → Roadmap → Prototype
                  </p>
                </div>
              </div>

              {/* 02 NOURA */}
              <div className="p-8 md:p-12 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md space-y-6 hover:border-amber-500/40 transition shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                      02 — AI-Powered Personalized Wellness & Healthy Food Platform
                    </span>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
                      NOURA
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="https://noura-wellness-ai.onrender.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition shadow-lg"
                    >
                      Live App <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://github.com/jaswanthbandla/noura-wellness-ai.git"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition"
                    >
                      GitHub Repo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://github.com/jaswanthbandla/product-management-portfolio/blob/main/NOURA-Product-Management-Case-Study.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition"
                    >
                      Case Study <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-1">
                  <p className="text-xs text-zinc-400 uppercase font-mono">
                    Tagline & Core Idea
                  </p>
                  <p className="text-amber-300 font-semibold text-sm md:text-base">
                    "Your Personalized Wellness Journey" — From “I want to be
                    healthier” to “Here’s what I can do today.”
                  </p>
                </div>

                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                  NOURA combines AI-powered personalization, wellness planning,
                  recommendations, and healthy food discovery into one unified
                  experience. It directly addresses the friction between
                  high-level fitness intentions and concrete daily actions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                    <h4 className="text-amber-400 font-bold text-base mb-1">
                      NOURA AI
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      AI-powered personalization and dynamic recommendations.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                    <h4 className="text-amber-400 font-bold text-base mb-1">
                      NOURA Wellness
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Personalized goals, action plans, habit tracking, and
                      progress.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                    <h4 className="text-amber-400 font-bold text-base mb-1">
                      NOURA Shop
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Healthy food and product discovery connected to
                      recommendations.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-xs uppercase font-mono text-zinc-400 block mb-1">
                      Product Journey
                    </span>
                    <p className="text-xs md:text-sm text-zinc-300 font-mono">
                      Understand → Personalize → Recommend → Explain → Act → Shop
                      → Track → Improve
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-xs uppercase font-mono text-zinc-400 block mb-1">
                      AI Behavior Loop
                    </span>
                    <p className="text-xs md:text-sm text-amber-300 font-mono">
                      Understand → Personalize → Reason → Respond → Recommend →
                      Explain → Act → Adapt → Protect
                    </p>
                  </div>
                </div>
              </div>

              {/* 03 VISION PAY */}
              <div className="p-8 md:p-12 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md space-y-6 hover:border-amber-500/40 transition shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                      03 — Unified Loan & Repayment Management
                    </span>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
                      VISION PAY
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="https://jaswanthbandla.github.io/vision-pay/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition shadow-lg"
                    >
                      Live Demo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://github.com/jaswanthbandla/vision-pay"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition"
                    >
                      GitHub Repo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://github.com/jaswanthbandla/product-management-portfolio/blob/main/VISION-PAY-Product-Management-Case-Study.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition"
                    >
                      Case Study <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-1">
                  <p className="text-xs text-zinc-400 uppercase font-mono">
                    Core Value Proposition
                  </p>
                  <p className="text-amber-300 font-semibold text-sm md:text-base">
                    "Know what you owe. Know when it is due. Pay it. Track it."
                  </p>
                </div>

                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                  VISION PAY addresses the challenge of borrowers having
                  difficulty keeping track of multiple loans, repayment
                  commitments, loan account information, and payment statuses. The
                  concept originated from observing customers repeatedly visiting
                  an NBFC branch because they were unsure how to track or make
                  repayments, locate loan information, or understand what
                  happened after an EMI bounced.
                </p>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-xs uppercase font-mono text-zinc-400 block mb-1">
                    Product Journey
                  </span>
                  <p className="text-xs md:text-sm text-zinc-300 font-mono">
                    Verify → Discover → Understand → Pay → Track
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                  <span className="text-xs uppercase font-mono text-amber-400 block mb-2 font-bold">
                    Product Thinking Pillars
                  </span>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                    User problem discovery · Fintech product strategy · MVP
                    definition · User journey mapping · KYC considerations ·
                    Payment experience · Credit information architecture ·
                    Security and privacy · Product metrics & PRD
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= 4. SKILLS ================= */}
          <section id="skills" className="space-y-8 pt-10 scroll-mt-24">
            <div className="p-8 md:p-12 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md shadow-2xl">
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
                TOOLING & CAPABILITIES
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
                Skills & Competencies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-black/80 border border-white/15 backdrop-blur-md shadow-2xl space-y-4">
                <h3 className="text-lg font-bold text-amber-400">
                  Product Strategy
                </h3>
                <ul className="text-xs md:text-sm text-zinc-300 space-y-2 list-disc list-inside">
                  <li>Product Vision & Strategy</li>
                  <li>MVP Definition & Product Roadmaps</li>
                  <li>Prioritization (RICE / MoSCoW)</li>
                  <li>Market Analysis (TAM / SAM / SOM)</li>
                  <li>SWOT, Porter's Five Forces, Ansoff Matrix</li>
                  <li>Kotler Five Levels & Value Proposition</li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-black/80 border border-white/15 backdrop-blur-md shadow-2xl space-y-4">
                <h3 className="text-lg font-bold text-amber-400">
                  Product Discovery & Execution
                </h3>
                <ul className="text-xs md:text-sm text-zinc-300 space-y-2 list-disc list-inside">
                  <li>User Problems & User Research</li>
                  <li>Personas & Jobs-to-be-Done (JTBD)</li>
                  <li>PRDs, User Stories, Acceptance Criteria</li>
                  <li>Backlog Management & Sprint Planning</li>
                  <li>Cross-Functional Alignment</li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-black/80 border border-white/15 backdrop-blur-md shadow-2xl space-y-4">
                <h3 className="text-lg font-bold text-amber-400">
                  AI Product Management
                </h3>
                <ul className="text-xs md:text-sm text-zinc-300 space-y-2 list-disc list-inside">
                  <li>AI Product Strategy & AI-powered Experiences</li>
                  <li>Personalization & Recommendation Systems</li>
                  <li>Explainability & Responsible AI</li>
                  <li>AI Product Requirements & Agent Concepts</li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-black/80 border border-white/15 backdrop-blur-md shadow-2xl space-y-4">
                <h3 className="text-lg font-bold text-amber-400">
                  Product Analytics & Metrics
                </h3>
                <ul className="text-xs md:text-sm text-zinc-300 space-y-2 list-disc list-inside">
                  <li>Product Metrics, Funnels & Retention</li>
                  <li>Cohorts & Segmentation</li>
                  <li>Experiments & A/B Testing</li>
                  <li>SQL & Quantitative Analytics</li>
                </ul>
              </div>
            </div>

            <div className="p-8 md:p-10 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md shadow-2xl space-y-5">
              <h3 className="text-xl font-bold text-white">Tool Stack</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm">
                <div className="p-4 bg-black/50 rounded-2xl border border-white/10">
                  <span className="text-amber-400 font-bold block mb-1">
                    Product & Delivery
                  </span>
                  <p className="text-zinc-300">
                    Jira, Confluence, Linear, Productboard, Aha!
                  </p>
                </div>
                <div className="p-4 bg-black/50 rounded-2xl border border-white/10">
                  <span className="text-amber-400 font-bold block mb-1">
                    Design & Research
                  </span>
                  <p className="text-zinc-300">
                    Figma, FigJam, Google Forms, Typeform
                  </p>
                </div>
                <div className="p-4 bg-black/50 rounded-2xl border border-white/10">
                  <span className="text-amber-400 font-bold block mb-1">
                    Analytics
                  </span>
                  <p className="text-zinc-300">Mixpanel, Amplitude, GA4, SQL</p>
                </div>
                <div className="p-4 bg-black/50 rounded-2xl border border-white/10">
                  <span className="text-amber-400 font-bold block mb-1">
                    Workspace & AI
                  </span>
                  <p className="text-zinc-300">
                    Notion, Slack, ChatGPT, AI PM tools
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= 5. JOURNEY (ZERO CGPA MENTIONS) ================= */}
          <section id="journey" className="space-y-8 pt-10 scroll-mt-24">
            <div className="p-8 md:p-12 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md shadow-2xl">
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
                CAREER TIMELINE & EDUCATION
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
                Experience & Journey
              </h2>
            </div>

            <div className="p-8 md:p-12 rounded-3xl border border-white/15 bg-black/75 backdrop-blur-md shadow-2xl">
              <div className="relative border-l border-zinc-600 ml-4 space-y-10">
                <div className="pl-8 relative">
                  <div className="absolute -left-2.5 top-1.5 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
                    July 2026 – Present
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    SRG HOUSING FINANCE Pvt. Ltd.
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium">
                    Relationship Manager — HL & LAP
                  </p>
                  <p className="text-xs md:text-sm text-zinc-300 mt-2 leading-relaxed">
                    Generate and manage Home Loan & LAP leads through sales,
                    referrals, customer relationships, documentation audit, and
                    cross-functional coordination with credit, legal, and
                    technical teams.
                  </p>
                </div>

                <div className="pl-8 relative">
                  <div className="absolute -left-2.5 top-1.5 w-4 h-4 rounded-full bg-zinc-600" />
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
                    April 2026 – July 2026
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    SASVITHA HOME FINANCE Pvt. Ltd.
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium">
                    Sales Officer — HL & LAP
                  </p>
                  <p className="text-xs md:text-sm text-zinc-300 mt-2 leading-relaxed">
                    Managed customer pipeline, loan eligibility, document
                    processing, and smooth loan disbursal coordination.
                  </p>
                </div>

                <div className="pl-8 relative">
                  <div className="absolute -left-2.5 top-1.5 w-4 h-4 rounded-full bg-zinc-600" />
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
                    July 2025 – March 2026
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    TYGER HOME FINANCE Pvt. Ltd.
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium">
                    Relationship Manager — HL & LAP
                  </p>
                  <p className="text-xs md:text-sm text-zinc-300 mt-2 leading-relaxed">
                    Generated HL & LAP business, verified KYC, income, and
                    property records, and collaborated with credit and operations
                    teams.
                  </p>
                </div>

                <div className="pl-8 relative">
                  <div className="absolute -left-2.5 top-1.5 w-4 h-4 rounded-full bg-zinc-600" />
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    2021 – 2025
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    B.Tech — Computer Science Engineering
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Chirala Engineering College
                  </p>
                </div>

                <div className="pl-8 relative">
                  <div className="absolute -left-2.5 top-1.5 w-4 h-4 rounded-full bg-zinc-600" />
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    2019 – 2021
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Intermediate
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Sri Chaitanya Junior College — 83%
                  </p>
                </div>

                <div className="pl-8 relative">
                  <div className="absolute -left-2.5 top-1.5 w-4 h-4 rounded-full bg-zinc-600" />
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    2018 – 2019
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">SSC</h3>
                  <p className="text-xs text-zinc-400">Z.P.H School — 73%</p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= 6. CERTIFICATIONS ================= */}
          <section id="certifications" className="space-y-8 pt-10 scroll-mt-24">
            <div className="p-8 md:p-12 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md shadow-2xl">
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
                VERIFIED ACCREDITATIONS
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
                Certifications & Credentials
              </h2>
              <p className="text-zinc-400 text-xs md:text-sm mt-1">
                Click on either certificate to open the official document
                directly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 01 IBM PM */}
              <a
                href="https://github.com/jaswanthbandla/product-management-portfolio/blob/main/IBM-AI-Product-Manager-Certificate.pdf.pdf"
                target="_blank"
                rel="noreferrer"
                className="p-8 rounded-3xl bg-black/80 border border-white/15 hover:border-amber-400 backdrop-blur-md space-y-4 group transition-all duration-300 hover:scale-[1.01] shadow-2xl block cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-mono text-amber-400 uppercase">
                      IBM · 2026
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold group-hover:bg-amber-400 group-hover:text-black transition">
                    <span>Open Document</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition">
                  IBM Product Management Professional Certificate
                </h3>
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                  Extensive curriculum covering product fundamentals, stakeholder
                  collaboration, product strategy, and product planning.
                </p>
              </a>

              {/* 02 Google Project Management */}
              <a
                href="https://github.com/jaswanthbandla/product-management-portfolio/blob/main/Foundations%20of%20Project%20Management.pdf"
                target="_blank"
                rel="noreferrer"
                className="p-8 rounded-3xl bg-black/80 border border-white/15 hover:border-amber-400 backdrop-blur-md space-y-4 group transition-all duration-300 hover:scale-[1.01] shadow-2xl block cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-mono text-amber-400 uppercase">
                      Google · 2025
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold group-hover:bg-amber-400 group-hover:text-black transition">
                    <span>Open Document</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition">
                  Google Foundations of Project Management
                </h3>
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                  Project initiation, planning mechanics, risk management, sprint
                  cycles, and stakeholder communication frameworks.
                </p>
              </a>
            </div>
          </section>

          {/* ================= 7. CONTACT ================= */}
          <section id="contact" className="space-y-8 pt-10 scroll-mt-24">
            <div className="p-8 md:p-12 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-md shadow-2xl">
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
                Let's Talk
              </h2>
              <p className="text-zinc-300 mt-2 text-sm md:text-base">
                Open to Product Manager, Associate PM, and AI Product Management
                opportunities.
              </p>
            </div>

            <a
              href="mailto:jaswanthbandla06@gmail.com?subject=Product%20Management%20Opportunity&body=Hi%20Jaswanth,"
              className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-amber-500/20 via-black/80 to-black/80 border border-amber-500/40 hover:border-amber-400 backdrop-blur-md transition-all duration-300 flex items-center justify-between group shadow-2xl block cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-amber-400 tracking-wider font-semibold">
                    Direct Mail
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-amber-300 transition">
                    Send an Email
                  </h3>
                  <p className="text-sm md:text-base text-zinc-300 mt-1">
                    jaswanthbandla06@gmail.com
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-wider group-hover:bg-amber-400 transition">
                <span>Compose</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="https://www.linkedin.com/in/jaswanth-bandla-pm"
                target="_blank"
                rel="noreferrer"
                className="p-8 rounded-3xl bg-black/80 border border-white/15 hover:border-amber-400 backdrop-blur-md transition flex items-center justify-between group shadow-2xl cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center font-bold text-blue-400 text-lg border border-blue-500/20">
                    in
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">LinkedIn Profile</div>
                    <div className="text-base font-bold text-white group-hover:text-amber-300 transition">
                      Jaswanth Bandla
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-zinc-500 group-hover:text-amber-400 transition" />
              </a>

              <a
                href="https://github.com/jaswanthbandla"
                target="_blank"
                rel="noreferrer"
                className="p-8 rounded-3xl bg-black/80 border border-white/15 hover:border-amber-400 backdrop-blur-md transition flex items-center justify-between group shadow-2xl cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-zinc-300 text-sm border border-white/20">
                    git
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">
                      GitHub Repositories
                    </div>
                    <div className="text-base font-bold text-white group-hover:text-amber-300 transition">
                      jaswanthbandla
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-zinc-500 group-hover:text-amber-400 transition" />
              </a>
            </div>
          </section>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="w-full max-w-7xl mx-auto px-6 md:px-14 lg:px-20 py-8 border-t border-white/10 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-amber-400 tracking-wide text-sm">
              Jaswanth Bandla
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-cyan-400 font-medium tracking-wide">
              Product Manager
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-amber-300/90 font-medium tracking-wide">
              AI Product Manager
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/jaswanth-bandla-pm"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-blue-400 hover:text-amber-400 transition"
            >
              in
            </a>
            <a
              href="https://github.com/jaswanthbandla"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-zinc-400 hover:text-amber-400 transition"
            >
              git
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="text-amber-400 hover:text-amber-300 transition cursor-pointer bg-transparent border-0 p-0"
            >
              <Mail className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono text-amber-400/80 uppercase tracking-widest pl-2">
              Keep Exploring!
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
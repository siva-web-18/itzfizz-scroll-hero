
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navigation from "./components/Navigation";
import MetricCard from "./components/MetricCard";
import CarScene from "./components/CarScene";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 2.4, suffix: "×", label: "Illustrative growth metric" },
  { value: 85, suffix: "+", label: "Example projects delivered" },
];

const headline = ["WELCOME", "ITZFIZZ"];

function AnimatedWord({ word, outlined = false }) {
  return (
    <span
      className={`headline-word ${outlined ? "outlined-word" : ""}`}
      aria-label={word}
    >
      {Array.from(word).map((letter, index) => (
        <span
          className="letter"
          aria-hidden="true"
          key={`${letter}-${index}`}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

export default function App() {
  const root = useRef(null);
  const scene = useRef(null);

  useEffect(() => {
    const media = gsap.matchMedia();

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) return;

      // 1. Intro timeline
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .from(".navigation", {
          y: -24,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".eyebrow",
          { y: 18, opacity: 0, duration: 0.6 },
          "-=0.3"
        )
        .from(
          ".letter",
          {
            yPercent: 115,
            rotateX: -45,
            opacity: 0,
            stagger: {
              each: 0.035,
              from: "start",
            },
            duration: 0.85,
          },
          "-=0.15"
        )
        .from(
          ".hero-description",
          { y: 20, opacity: 0, duration: 0.65 },
          "-=0.4"
        )
        .from(
          ".metric-card",
          {
            y: 25,
            opacity: 0,
            stagger: 0.12,
            duration: 0.6,
          },
          "-=0.25"
        )
        .from(
          ".car-motion",
          {
            y: 65,
            opacity: 0,
            scale: 0.9,
            duration: 1,
          },
          "-=0.35"
        );

      // 2. Counter animation
      gsap.utils.toArray(".counter").forEach((element) => {
        const target = Number(element.dataset.value);
        const suffix = element.dataset.suffix || "";
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 1.7,
          ease: "power2.out",
          delay: 0.7,
          onUpdate: () => {
            const formatted = Number.isInteger(target)
              ? Math.round(counter.value)
              : counter.value.toFixed(1);

            element.textContent = `${formatted}${suffix}`;
          },
        });
      });

      // 3. Scroll-driven hero choreography
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-scene",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: ".hero-pin",
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTimeline
        .to(
          ".car-motion",
          {
            x: () => window.innerWidth * 0.12,
            y: -65,
            scale: 0.78,
            rotate: -5,
            ease: "none",
          },
          0
        )
        .to(
          ".hero-copy-block",
          {
            x: -45,
            opacity: 0.18,
            ease: "none",
          },
          0
        )
        .to(
          ".orbit-a",
          {
            rotation: 150,
            scale: 1.15,
            ease: "none",
          },
          0
        )
        .to(
          ".orbit-b",
          {
            rotation: -110,
            scale: 0.88,
            ease: "none",
          },
          0
        )
        .to(
          ".scene-grid",
          {
            yPercent: 25,
            ease: "none",
          },
          0
        )
        .to(
          ".scene-glow",
          {
            opacity: 0.8,
            scale: 1.3,
            ease: "none",
          },
          0
        )
        .to(
          ".hero-title",
          {
            letterSpacing: "-0.09em",
            ease: "none",
          },
          0
        );

      // 4. Scroll progress indicator
      ScrollTrigger.create({
        trigger: ".scroll-scene",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const percentage = Math.round(self.progress * 100);
          const label = root.current?.querySelector(".scroll-percent");

          if (label) {
            label.textContent = `${String(percentage).padStart(2, "0")}%`;
          }

          const bar = root.current?.querySelector(".progress-fill");

          if (bar) {
            gsap.set(bar, { scaleX: self.progress });
          }
        },
      });

      // 5. Reveal the next section
      gsap.from(".next-content > *", {
        y: 32,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".next-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 6. Wheel rotation based on scroll progress
      gsap.to(".car-wheel", {
        rotation: 160,
        transformOrigin: "center center",
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-scene",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, root);

    // 7. Pointer-based parallax on devices with a fine pointer
    media.add("(hover: hover) and (pointer: fine)", () => {
      const moveX = gsap.quickTo(".parallax-target", "x", {
        duration: 0.7,
        ease: "power3.out",
      });

      const moveY = gsap.quickTo(".parallax-target", "y", {
        duration: 0.7,
        ease: "power3.out",
      });

      const handlePointerMove = (event) => {
        if (!scene.current) return;

        const bounds = scene.current.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        moveX(x * 14);
        moveY(y * 10);
      };

      const handlePointerLeave = () => {
        moveX(0);
        moveY(0);
      };

      scene.current?.addEventListener("pointermove", handlePointerMove);
      scene.current?.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        scene.current?.removeEventListener("pointermove", handlePointerMove);
        scene.current?.removeEventListener("pointerleave", handlePointerLeave);
      };
    });

    return () => {
      context.revert();
      media.revert();
    };
  }, []);

  return (
    <main ref={root}>
      <section className="scroll-scene">
        <div className="hero-pin">
          <Navigation />

          <div className="hero-copy-block">
            <div className="eyebrow">
              <span className="live-dot" />
              DIGITAL EXPERIENCES / BUILT TO MOVE
            </div>

            <h1 className="hero-title">
              {headline.map((word, index) => (
                <AnimatedWord
                  key={word}
                  word={word}
                  outlined={index === 1}
                />
              ))}
              <span className="headline-period">.</span>
            </h1>

            <p className="hero-description">
              We transform ambitious ideas into remarkable digital
              experiences through strategy, design and technology.
            </p>

            <div className="metrics-grid">
              {metrics.map((metric, index) => (
                <MetricCard
                  key={metric.label}
                  {...metric}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div ref={scene} className="visual-wrapper">
            <div className="parallax-target">
              <CarScene />
            </div>
          </div>

          <div className="hero-bottom">
            <span>INDEPENDENT THINKING. DIGITAL EXCELLENCE.</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>

          <div className="progress-track" aria-hidden="true">
            <div className="progress-fill" />
          </div>
        </div>
      </section>

      <section className="next-section">
        <div className="next-content">
          <div className="eyebrow dark-eyebrow">
            02 / THE EXPERIENCE
          </div>

          <h2>
            Digital should feel
            <span> different.</span>
          </h2>

          <p>
            From the first interaction to the final detail, we create
            experiences that help ambitious brands move forward.
          </p>

          <a href="mailto:hello@itzfizz.com" className="next-link">
            LET'S CREATE SOMETHING <span>↗</span>
          </a>
        </div>
        <span className="next-index">ITZFIZZ / CREATIVE TECHNOLOGY</span>
      </section>

      <footer className="site-footer">
        <a href="#home" className="brand">itzfizz<span>.</span></a>
        <span>REACT · GSAP · SCROLLTRIGGER</span>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}

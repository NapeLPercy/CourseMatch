import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { WHY_CHOOSE_US } from "../Utils/textData/whyChooseUs";
import "../styles/WhyChooseUs.css";

function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const COLOR_MAP = {
  blue: {
    bg: "#dbeafe",
    icon: "#1e3a8a",
    glow: "rgba(37,99,235,0.18)",
    ring: "#bfdbfe",
  },
};

const ITEM_COLORS = ["blue"];

function WhyCard({ item, color }) {
  const Icon = item.icon;
  const c = COLOR_MAP[color] || COLOR_MAP.blue;

  return (
    <div className="wc__card">
      {/* Icon hero */}
      <div className="wc__icon-wrap">
        {/* Decorative rings */}
        <span
          className="wc__ring wc__ring--outer"
          style={{ borderColor: c.ring }}
        />
        <span
          className="wc__ring wc__ring--inner"
          style={{ borderColor: c.ring }}
        />
        {/* Glow */}
        <span className="wc__glow" style={{ background: c.glow }} />
        {/* Circle */}
        <span className="wc__circle" style={{ background: c.bg }}>
          <Icon size={26} strokeWidth={1.8} style={{ color: c.icon }} />
        </span>
        {/* Decorative dots */}
        <span className="wc__dot wc__dot--tl" style={{ background: c.ring }} />
        <span className="wc__dot wc__dot--br" style={{ background: c.ring }} />
        <span className="wc__dot wc__dot--tr" style={{ background: c.ring }} />
      </div>

      {/* Content */}
      <div className="wc__body">
        <h3 className="wc__title">{item.title}</h3>
        <p className="wc__desc">{item.description}</p>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const [headerRef, headerIn] = useInView(0.2);

  return (
    <section className="hiw" id="why-section">
      {/* Header — reuses hiw classes */}
      <div
        ref={headerRef}
        className={`hiw__header ${headerIn ? "hiw__header--visible" : ""}`}
      >
        <span className="hiw__eyebrow">
          <span className="hiw__eyebrow-line" />
          Why CourseMatch
          <span className="hiw__eyebrow-line" />
        </span>

        <h2 className="hiw__title">
          Everything you need to make the right study decision.
        </h2>

        <p className="hiw__subtitle">
          From personalised AI recommendations to university requirements and
          career insights, CourseMatch brings everything together in one
          place—helping you make informed decisions with confidence.
        </p>

        <ChevronDown className="hiw__scroll-cue" size={22} strokeWidth={1.5} />
      </div>

      {/* Cards */}
      <div className="wc__grid">
        {WHY_CHOOSE_US.map((item, i) => (
          <WhyCard
            key={item.id}
            item={item}
            color={ITEM_COLORS[i % ITEM_COLORS.length]}
          />
        ))}
      </div>
    </section>
  );
}

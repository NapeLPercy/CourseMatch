import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, MessageCircle } from "lucide-react";
import "../../styles/FAQ.css";
import { FAQS } from "../../Utils/textData/faqs";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`faq__item ${isOpen ? "faq__item--open" : ""}`}>
      <button
        className="faq__question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq__question-text">{faq.question}</span>
        <ChevronDown size={20} strokeWidth={2} className="faq__icon" />
      </button>
      <div className="faq__answer-wrap">
        <div className="faq__answer">
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faq">
      <div className="faq__container">
        {/* Header */}
        <div className="faq__header">
          <span className="hiw__eyebrow">
            <span className="hiw__eyebrow-line" />
            Frequently asked questions
            <span className="hiw__eyebrow-line" />
          </span>

          <h2 className="faq__title">Your questions, answered</h2>
          <p className="faq__subtitle">
            Find quick answers to common questions about CourseMatch. Can't find
            what you're looking for? We're here to help.
          </p>
          <ChevronDown
            className="hiw__scroll-cue"
            size={22}
            strokeWidth={1.5}
          />
        </div>

        {/* FAQ List */}
        <div className="faq__list">
          {FAQS.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="faq__cta">
          <div className="faq__cta-content">
            <MessageCircle
              size={32}
              strokeWidth={1.6}
              className="faq__cta-icon"
            />
            <h3 className="faq__cta-title">Still have questions?</h3>
            <p className="faq__cta-text">
              Our team is ready to help. Reach out and we'll get back to you as
              soon as possible.
            </p>
            <button
              className="faq__cta-btn"
              onClick={() => {
                navigate("/contact-us");
                // window.scrollTo(0, 0);
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

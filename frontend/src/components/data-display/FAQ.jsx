import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import "../../styles/FAQ.css";

const FAQS = [
 {
  id: 1,
  question: "How does CourseMatch calculate my APS?",
  answer:
    "CourseMatch calculates your Admission Point Score (APS) by converting your matric subject marks into points using the standard systems applied by South African universities. Because APS rules can vary slightly between institutions, CourseMatch considers these differences when evaluating your eligibility. For example, some universities include Life Orientation in APS calculations, while others exclude it."
},
  {
    id: 2,
    question: "Is CourseMatch free to use?",
    answer:
      "Yes! CourseMatch is completely free for students. We believe every student deserves access to quality course matching and career guidance, regardless of their financial situation.",
  },
  {
    id: 3,
    question: "Which universities does CourseMatch cover?",
    answer:
      "CourseMatch currently covers TUT only. We're constantly expanding our database to include additional institutions and their qualification requirements.",
  },
  {
    id: 4,
    question: "How accurate are the AI recommendations?",
    answer:
      "Our AI recommendations are based on your academic profile, personal strengths, goals, and interests. While we provide highly personalized suggestions, we encourage you to research each recommendation and consult with academic advisors to make the best decision for your future.",
  },
  {
    id: 5,
    question: "Can I save my results and come back later?",
    answer:
      "Yes! When you create an account, all your subjects, marks, profile information, and matched courses are saved. You can log in anytime to review your results, update your information, or explore new recommendations.",
  },
  {
    id: 6,
    question: "What if I don't meet the requirements for any courses?",
    answer:
      "CourseMatch will show you which requirements you're missing and suggest alternative pathways. You might consider foundation programs, gap year opportunities to improve specific subjects, or courses with lower entry requirements that still align with your goals.",
  },
  {
    id: 7,
    question: "How often is the course information updated?",
    answer:
      "We regularly update our course database to reflect the latest admission requirements, qualification changes, and new programs. Universities typically update their requirements annually, and we sync our data accordingly.",
  },
  {
    id: 8,
    question: "Can I use CourseMatch if I'm not in Grade 12 yet?",
    answer:
      "Absolutely! CourseMatch is helpful for students in Grade 10, 11, or 12. If you're still working on your subjects, you can enter projected marks to see what you might qualify for, helping you plan and set academic goals early.",
  },
];

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
          <div className="faq__header-icon">
            <HelpCircle size={28} strokeWidth={1.6} />
          </div>
          <h2 className="faq__title">Frequently Asked Questions</h2>
          <p className="faq__subtitle">
            Find quick answers to common questions about CourseMatch. Can't find
            what you're looking for? We're here to help.
          </p>
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
                window.scrollTo(0, 0);
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

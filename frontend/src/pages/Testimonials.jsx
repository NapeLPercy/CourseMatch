import "../styles/Testimonials.css";
import { ChevronDown } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Amara Dlamini",
    role: "Grade 12",
    rating: 5,
    message:
      "CourseMatch helped me figure out exactly which courses I qualify for. I was so lost before — now I have a clear plan for next year.",
  },
  {
    id: 2,
    name: "Thabo Nkosi",
    role: "Grade 11",
    rating: 4.5,
    message:
      "I didn't know my APS score even mattered until I used this. The blog posts are also really helpful for understanding university requirements.",
  },
  {
    id: 3,
    name: "Lerato Mokoena",
    role: "Grade 12",
    rating: 5,
    message:
      "Super easy to use. I typed in my subjects and marks and it showed me everything I could study. Wish I found this earlier!",
  },
  {
    id: 4,
    name: "Sipho Khumalo",
    role: "Grade 11",
    rating: 4,
    message:
      "The career guidance articles are genuinely useful. Not just generic advice — it actually relates to the South African system.",
  },
  {
    id: 5,
    name: "Nomvula Sithole",
    role: "Grade 12",
    rating: 5,
    message:
      "I recommended CourseMatch to my whole class. It takes the guesswork out of applying to university. Absolutely love it.",
  },
  {
    id: 6,
    name: "Kagiso Motsepe",
    role: "Grade 10",
    rating: 4.5,
    message:
      "Even as a Grade 10 learner this gave me a head start. I now know which subjects I need to keep to get into the course I want.",
  },
  {
    id: 7,
    name: "Zanele Mahlangu",
    role: "Grade 12",
    rating: 5,
    message:
      "The interface is clean and fast. I got my results in seconds and it even explained what each course involves. Great tool.",
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Stars({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // full star
      stars.push(
        <svg
          key={i}
          className="ts__star ts__star--full"
          viewBox="0 0 24 24"
          width="15"
          height="15"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>,
      );
    } else if (rating >= i - 0.5) {
      // half star
      stars.push(
        <svg
          key={i}
          className="ts__star ts__star--half"
          viewBox="0 0 24 24"
          width="15"
          height="15"
        >
          <defs>
            <linearGradient id={`half-${i}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={`url(#half-${i})`}
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>,
      );
    } else {
      // empty star
      stars.push(
        <svg
          key={i}
          className="ts__star ts__star--empty"
          viewBox="0 0 24 24"
          width="15"
          height="15"
        >
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>,
      );
    }
  }

  return <div className="ts__stars">{stars}</div>;
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="ts__card">
      <div className="ts__card-top">
        <div className="ts__avatar">{getInitials(testimonial.name)}</div>
        <div className="ts__identity">
          <span className="ts__name">{testimonial.name}</span>
          <span className="ts__role">{testimonial.role}</span>
        </div>
      </div>
      <Stars rating={testimonial.rating} />
      <p className="ts__message">"{testimonial.message}"</p>
    </div>
  );
}

export default function Testimonials() {
  // duplicate list so the scroll loop is seamless
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="ts">
      <div className="ts__header">
        <span className="hiw__eyebrow">
          <span className="hiw__eyebrow-line" />
          Testimonials
          <span className="hiw__eyebrow-line" />
        </span>

        <h2 className="hiw__title">Words from other users</h2>
        <p className="ts__subtitle">
          Real feedback from matric students who used CourseMatch to plan their
          future.
        </p>
        <ChevronDown className="hiw__scroll-cue" size={22} strokeWidth={1.5} />
      </div>

      {/* outer clip */}
      <div className="ts__track-wrap">
        {/* fade edges */}
        <div className="ts__fade ts__fade--left" />
        <div className="ts__fade ts__fade--right" />

        {/* scrolling track */}
        <div className="ts__track">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { Check } from "lucide-react";
/* ── Multi-select chip grid ─────────────── */
export function MultiSelect({ question, value, onChange }) {
  const selected = Array.isArray(value) ? value : [];

  const toggle = (opt) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      if (selected.length < question.maxAnswers) {
        onChange([...selected, opt]);
      }
    }
  };

  return (
    <div className="amp__chips">
      {question.options.map((opt) => {
        const isSelected = selected.includes(opt);
        const isDisabled =
          !isSelected && selected.length >= question.maxAnswers;
        return (
          <button
            key={opt}
            type="button"
            className={`amp__chip ${isSelected ? "amp__chip--active" : ""} ${isDisabled ? "amp__chip--disabled" : ""}`}
            onClick={() => toggle(opt)}
            disabled={isDisabled}
          >
            {isSelected && <Check size={12} strokeWidth={2.5} />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

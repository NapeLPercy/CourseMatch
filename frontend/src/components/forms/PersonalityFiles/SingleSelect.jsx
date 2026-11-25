import {
  Check
} from "lucide-react";
/* ── Single select card grid ────────────── */
export function SingleSelect({ question, value, onChange }) {
  return (
    <div className="amp__singles">
      {question.options.map((opt) => {
        const val = typeof opt === "object" ? opt.value : opt;
        const label = typeof opt === "object" ? opt.label : opt;
        const isSelected = value === val;
        return (
          <button
            key={val}
            type="button"
            className={`amp__single ${isSelected ? "amp__single--active" : ""}`}
            onClick={() => onChange(val)}
          >
            {isSelected && (
              <span className="amp__single-check">
                <Check size={11} strokeWidth={2.5} />
              </span>
            )}
            {label}
          </button>
        );
      })}
    </div>
  );
}
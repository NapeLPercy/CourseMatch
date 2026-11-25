import { SubjectSelect } from "./SubjectSelect";
/* ── Paired subjects step ───────────────── */
export function PairedSubjects({ questions, answers, onChange }) {
  const [enjoyed, disliked] = questions;
  return (
    <div className="amp__paired">
      <div className="amp__paired-col">
        <p className="amp__paired-label">{enjoyed.label}</p>
        <p className="amp__paired-helper">{enjoyed.helperText}</p>
        <SubjectSelect
          question={enjoyed}
          value={answers[enjoyed.name]}
          onChange={(val) => onChange(enjoyed.name, val)}
        />
      </div>
      <div className="amp__paired-col">
        <p className="amp__paired-label">{disliked.label}</p>
        <p className="amp__paired-helper">{disliked.helperText}</p>
        <SubjectSelect
          question={disliked}
          value={answers[disliked.name]}
          onChange={(val) => onChange(disliked.name, val)}
        />
      </div>
    </div>
  );
}
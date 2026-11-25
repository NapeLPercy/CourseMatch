import { useSubjects } from "../../../context/SubjectContext";
/* ── Subject select list ────────────────── */
export function SubjectSelect({ question, value, onChange }) {
  const { getSubjects } = useSubjects();

  // value is now a string, not an array
  const selected = Array.isArray(value) ? value : [];

  const handleChange = (e) => {
    const chosen = e.target.value;
    // keep it as array so the rest of the logic stays the same
    onChange(chosen ? [chosen] : []);
  };

  return (
    <div className="amp__subject-wrap">
      <select
        className="amp__subject-select"
        value={selected[0] || ""}
        onChange={handleChange}
        size={7}
      >
        <option value="" disabled hidden />
        {getSubjects()?.length > 0
          ? getSubjects().map((subject) => (
              <option key={subject.id} value={subject.name}>
                {subject.name + ": " + subject.mark + "%"}
              </option>
            ))
          : question.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
      </select>
      <span className="amp__subject-count">{selected.length} selected</span>
    </div>
  );
}

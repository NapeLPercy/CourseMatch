//validate subjects entered by students and guests
export function validate(subjects) {
  const errors = [];
  const names = subjects.map((s) => s.name).filter(Boolean);

  // 1. Minimum 7
  if (subjects.length < 7) {
    errors.push("You must add at least 7 subjects.");
  }

  // 2. Every chosen subject must have a mark 0-100
  subjects.forEach((s, i) => {
    if (s.name && (s.mark === "" || s.mark === undefined)) {
      errors.push(`"${s.name}" is missing a mark.`);
    } else if (s.name && (Number(s.mark) < 0 || Number(s.mark) > 100)) {
      errors.push(`"${s.name}" mark must be between 0 and 100.`);
    }
  });

  // 3. Every row must have a subject chosen
  subjects.forEach((s, i) => {
    if (!s.name) {
      errors.push(`Row ${i + 1} has no subject selected.`);
    }
  });

  // 4. No duplicate subjects
  const seen = new Set();
  subjects.forEach((s) => {
    if (s.name) {
      if (seen.has(s.name)) {
        errors.push(`"${s.name}" is selected more than once.`);
      }
      seen.add(s.name);
    }
  });

  // 5. Mathematics OR Mathematical Literacy required
  const hasMath =
    names.includes("Mathematics") ||
    names.includes("Technical Mathematics") ||
    names.includes("Mathematical Literacy");
  if (!hasMath) {
    errors.push("You must include Mathematics, Technical Mathematics or Mathematical Literacy.");
  }

  // 6. Life Orientation required
  if (!names.includes("Life Orientation")) {
    errors.push("You must include Life Orientation.");
  }

  // 7. At least one FAL subject
  const hasFAL = names.some((n) => n.endsWith("FAL"));
  if (!hasFAL) {
    errors.push(
      "You must include at least one FAL subject (e.g. English FAL).",
    );
  }

  // 8. At least one HL subject
  const hasHL = names.some((n) => n.endsWith("HL"));
  if (!hasHL) {
    errors.push("You must include at least one HL subject (e.g. English HL).");
  }

  return errors;
}

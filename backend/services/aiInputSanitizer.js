function cleanSubjects(subjects) {
  if (!Array.isArray(subjects)) return {};

  return subjects.reduce((acc, subject) => {
    if (!subject?.name || subject?.mark == null) return acc;

    acc[subject.name] = Number(subject.mark);
    return acc;
  }, {});
}

function cleanProfile(profile) {
  if (!profile || typeof profile !== "object") return {};

  const { id, user_id, ...rest } = profile;

  // remove empty values
  const cleaned = {};

  for (const key in rest) {
    const value = rest[key];

    if (value === null || value === undefined || value === "") continue;

    cleaned[key] = value;
  }

  return cleaned;
}

function cleanQualification(qualification) {
  if (!qualification || typeof qualification !== "object") return {};

  const { id, course_code, abbreaviation, ...rest } = qualification;

  return {
    university: rest.university_name,
    faculty: rest.faculty_name,
    qualification: rest.qualification_name,
    fit_score: Number(rest.fit_score),
    reason: rest.reason,
    minimum_aps: Number(rest.minimum_aps),
    nqf_level: Number(rest.nqf),
  };
}

module.exports = { cleanProfile, cleanSubjects, cleanQualification };

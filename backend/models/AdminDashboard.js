const db = require("../config/db");

const q = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

module.exports = {
  getDashboardData: async () => {
    // Run in parallel for speed
    const [
      studentsRows,
      universitiesRows,
      facultiesRows,
      qualificationsRows,
      prereqsRows,
      subjectRecordsRows,
      aiUsageRows,

      qualsMissingPrereqsRows,
      facultiesMissingQualsRows,
      unisMissingFacultiesRows,
      studentsWithoutProfilesRows,
      studentsWithoutSubjectsRows,

      recentQualificationsRows,
      recentAiUsageRows,

    ] = await Promise.all([
      q(`SELECT COUNT(*) AS count FROM student`),
      q(`SELECT COUNT(*) AS count FROM university`),
      q(`SELECT COUNT(*) AS count FROM faculty`),
      q(`SELECT COUNT(*) AS count FROM qualification`),
      q(`SELECT COUNT(*) AS count FROM prerequisite_subject`),
      q(`SELECT COUNT(*) AS count FROM subject`),
      q(`SELECT COALESCE(SUM(explanations_generated), 0) AS total FROM ai_usage`),

      // Health checks
      //qualsMissingPrereqsRows
      q(`
        SELECT COUNT(*) AS count
        FROM qualification q
        LEFT JOIN prerequisite_subject ps ON ps.qualification_code = q.code
        WHERE ps.qualification_code IS NULL
      `),

       //facultiesMissingQualsRows
      q(`
        SELECT COUNT(*) AS count
        FROM faculty f
        LEFT JOIN qualification q ON q.faculty_id = f.faculty_id
        WHERE q.code IS NULL
      `),

      // unisMissingFacultiesRows
      q(`
        SELECT COUNT(*) AS count
        FROM university u
        LEFT JOIN faculty f ON f.University_Abbreviation = u.abbreaviation
        WHERE f.faculty_id IS NULL
      `),

      //  studentsWithoutProfilesRows
      q(`
        SELECT COUNT(*) AS count
        FROM student st
        LEFT JOIN student_profile sp ON sp.user_id = st.user_id
        WHERE sp.user_id IS NULL
      `),

      //studentsWithoutSubjectsRows
      q(`
        SELECT COUNT(*) AS count
        FROM student st
        LEFT JOIN subject s ON s.student_id = st.student_id
        WHERE s.subject_id IS NULL
      `),

      // Recent activity (requires created_at columns; if missing, these will error)
      // If you haven't added created_at yet, comment these two blocks out.
      q(`
        SELECT code, name, created_at
        FROM qualification
        ORDER BY created_at DESC
        LIMIT 4
      `).catch(() => []),

      q(`
        SELECT id, user_id, university_abbrev, explanations_generated, courses_scored, created_at
        FROM ai_usage
        ORDER BY created_at DESC
        LIMIT 4
      `).catch(() => []),
    ]);

    return {
      counts: {
        students: studentsRows[0]?.count ?? 0,
        universities: universitiesRows[0]?.count ?? 0,
        faculties: facultiesRows[0]?.count ?? 0,
        qualifications: qualificationsRows[0]?.count ?? 0,
        prereq_rows: prereqsRows[0]?.count ?? 0,
        subject_records: subjectRecordsRows[0]?.count ?? 0,
        ai_explanations_generated: aiUsageRows[0]?.total ?? 0,
      },

      health: {
        qualifications_missing_prereqs: qualsMissingPrereqsRows[0]?.count ?? 0,
        faculties_missing_qualifications: facultiesMissingQualsRows[0]?.count ?? 0,
        universities_missing_faculties: unisMissingFacultiesRows[0]?.count ?? 0,
        students_without_profiles: studentsWithoutProfilesRows[0]?.count ?? 0,
        students_without_subjects: studentsWithoutSubjectsRows[0]?.count ?? 0,
      },

      recent: {
        qualifications: recentQualificationsRows,
        ai_usage: recentAiUsageRows,
      },
    };
  },
};

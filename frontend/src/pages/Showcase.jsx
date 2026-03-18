import { useMemo, useState } from "react";
import ".././styles/Showcase.css";


function appendSubjects(subjects){
  return subjects.map(subject=>{return subject.name}).join(", ");
}
const student = {
  fullName: "Sipho Mokoena",
  aps: 36,
  subjects: [
    { name: "Mathematics", mark: 78 },
    { name: "English HL", mark: 72 },
    { name: "Physical Sciences", mark: 69 },
    { name: "Life Sciences", mark: 74 },
    { name: "Geography", mark: 70 },
  ],
  profile: {
    strengths: "Problem-solving, logical thinking, creativity",
    goals: "Build useful digital solutions and grow in the tech industry",
    preferredEnvironment: "Structured but innovative",
    hobbies: "Coding, exploring technology, solving puzzles",
    enjoyedSubjects: "Mathematics, Physical Sciences",
    dislikedSubjects: "Accounting",
    problemSolvingApproach: "Analytical and step-by-step",
    workStyle: "Independent but collaborative when needed",
  },
};

const qualifications = [
  {
    id: "software-engineering",
    name: "Software Engineering",
    code: "BSE26",
    duration: "3 Years",
    minAps: 34,
    fitScore: 95,
    badge: "Best Match",
    reason:
      "Software Engineering is the strongest match because the student performs well in Mathematics, enjoys analytical subjects, and has goals aligned with building digital solutions. Their problem-solving approach and interest in technology suggest strong potential for programming, systems design, and software development.",
    prerequisites: [
      { label: "Mathematics 60%+", subjectName: "Mathematics", minMark: 60 },
      { label: "English 50%+", subjectName: "English HL", minMark: 50 },
      {
        label: "Physical Sciences recommended",
        subjectName: "Physical Sciences",
        minMark: 50,
        recommended: true,
      },
    ],
  },
  {
    id: "informatics",
    name: "Informatics",
    code: "BIN18",
    duration: "3 Years",
    minAps: 32,
    fitScore: 82,
    badge: "Strong Match",
    reason:
      "Informatics is a strong match because the student has a solid academic profile, enjoys structured problem-solving, and shows clear interest in technology. It ranks below Software Engineering because the student’s goals lean more toward creating software solutions than business-oriented information systems.",
    prerequisites: [
      { label: "Mathematics 50%+", subjectName: "Mathematics", minMark: 50 },
      { label: "English 50%+", subjectName: "English HL", minMark: 50 },
      {
        label: "Analytical and structured thinking preferred",
        profileMatch: true,
      },
    ],
  },
  {
    id: "accounting",
    name: "Accounting",
    code: "BACC01",
    duration: "3 Years",
    minAps: 30,
    fitScore: 58,
    badge: "Lower Match",
    reason:
      "Accounting is a weaker match for this student. While the academic entry requirements are largely met, the student’s interests, strengths, and goals point more strongly toward technology and digital problem-solving than toward finance or accounting practice. It is therefore not the most natural-fit path for this profile.",
    prerequisites: [
      { label: "Mathematics 60%+", subjectName: "Mathematics", minMark: 60 },
      { label: "English 50%+", subjectName: "English HL", minMark: 50 },
      {
        label: "Interest in finance or accounting preferred",
        weakProfileMatch: true,
      },
    ],
  },
];

function getSubjectMark(subjectName) {
  return student.subjects.find((subject) => subject.name === subjectName)?.mark;
}

function getPrerequisiteStatus(prerequisite) {
  if (prerequisite.subjectName) {
    const studentMark = getSubjectMark(prerequisite.subjectName);

    if (typeof studentMark !== "number") {
      return {
        status: "missing",
        text: `${prerequisite.label} — subject not taken`,
      };
    }

    if (studentMark >= prerequisite.minMark) {
      return {
        status: "met",
        text: `${prerequisite.label} — student has ${studentMark}%`,
      };
    }

    return {
      status: "not-met",
      text: `${prerequisite.label} — student has ${studentMark}%`,
    };
  }

  if (prerequisite.profileMatch) {
    return {
      status: "met",
      text: `${prerequisite.label} — matches student profile`,
    };
  }

  if (prerequisite.weakProfileMatch) {
    return {
      status: "warn",
      text: `${prerequisite.label} — profile alignment is limited`,
    };
  }

  return {
    status: "warn",
    text: prerequisite.label,
  };
}

export default function CourseMatchAction() {
  const [activeQualificationId, setActiveQualificationId] = useState(
    qualifications[0].id
  );

  const activeQualification = useMemo(() => {
    return (
      qualifications.find(
        (qualification) => qualification.id === activeQualificationId
      ) || qualifications[0]
    );
  }, [activeQualificationId]);

  const apsStatus =
    student.aps >= activeQualification.minAps ? "Qualified" : "APS Below Minimum";

  return (
    <section className="cmaction">
      <div className="cmaction__container">
        <div className="cmaction__intro">
          <span className="cmaction__eyebrow">COURSEMATCH IN ACTION</span>
          <h2>See how one student profile can lead to different outcomes</h2>
          <p>
            CourseMatch compares a student’s subjects, marks, APS, and personal
            profile to rank qualifications by how well they truly fit.
          </p>
        </div>

        <div className="cmaction__layout">
          <aside className="cmaction__student-card">
            <div className="cmaction__student-header">
              <div>
                <span className="cmaction__label">Student Snapshot</span>
                <h3>{student.fullName}</h3>
              </div>
              <div className="cmaction__aps-badge">
                <strong>{student.aps}</strong>
                <span>APS</span>
              </div>
            </div>

            <div className="cmaction__student-section">
              <h4>Subjects</h4>
              <div className="cmaction__subject-list">
                
                <div key={1} className="cmaction__subject-item">
                    <span>{appendSubjects(student.subjects)}</span>
                  </div>

                {/*student.subjects.map((subject) => (
                  <div key={subject.name} className="cmaction__subject-item">
                    <span>{subject.name}</span>
                    <strong>{subject.mark}%</strong>
                  </div>
                ))*/}
              </div>
            </div>

            <div className="cmaction__student-section" style={{paddingBottom: "0",}}>
              <h4>Profile</h4>
              <div className="cmaction__profile-pills" >
               {/* <span>{student.profile.problemSolvingApproach}</span>
                <span>{student.profile.workStyle}</span>*/}
                <span>{student.profile.preferredEnvironment}</span>
                <span>Enjoys {student.profile.enjoyedSubjects}</span>
                <span>Hobbies: {student.profile.hobbies}</span>
              </div>
            </div>

            <div className="cmaction__student-section">
              <h4>Goals & strengths</h4>
              <p>
                <strong>Strengths:</strong> {student.profile.strengths}
              </p>
              <p>
                <strong>Goals:</strong> {student.profile.goals}
              </p>
            </div>
          </aside>

          <div className="cmaction__results">
            <div className="cmaction__tabs" role="tablist" aria-label="Qualification tabs">
              {qualifications.map((qualification) => (
                <button
                  key={qualification.id}
                  className={`cmaction__tab ${
                    activeQualification.id === qualification.id
                      ? "cmaction__tab--active"
                      : ""
                  }`}
                  onClick={() => setActiveQualificationId(qualification.id)}
                  role="tab"
                  aria-selected={activeQualification.id === qualification.id}
                >
                  <span className="cmaction__tab-name">{qualification.name}</span>
                  <span className="cmaction__tab-score">
                    {qualification.fitScore}% Fit
                  </span>
                </button>
              ))}
            </div>

            <article className="cmaction__qualification-card">
              <div className="cmaction__qualification-top">
                <div>
                  <span className="cmaction__badge">
                    {activeQualification.badge}
                  </span>
                  <h3>{activeQualification.name}</h3>
                </div>

                <div className="cmaction__fit-box">
                  <strong>{activeQualification.fitScore}%</strong>
                  <span>Fit Score</span>
                </div>
              </div>

              <div className="cmaction__qualification-meta">
                <div className="cmaction__meta-item">
                  <span>Code</span>
                  <strong>{activeQualification.code}</strong>
                </div>
                <div className="cmaction__meta-item">
                  <span>Minimum APS</span>
                  <strong>{activeQualification.minAps}</strong>
                </div>
                <div className="cmaction__meta-item">
                  <span>Duration</span>
                  <strong>{activeQualification.duration}</strong>
                </div>
                <div className="cmaction__meta-item">
                  <span>APS Status</span>
                  <strong>{apsStatus}</strong>
                </div>
              </div>

              <div className="cmaction__progress">
                <div
                  className="cmaction__progress-fill"
                  style={{ width: `${activeQualification.fitScore}%` }}
                />
              </div>

              <div className="cmaction__qualification-grid">
                <div className="cmaction__detail-block">
                  <h4>Prerequisites</h4>
                  <ul className="cmaction__req-list">
                    {activeQualification.prerequisites.map((prerequisite) => {
                      const result = getPrerequisiteStatus(prerequisite);

                      return (
                        <li
                          key={prerequisite.label}
                          className={`cmaction__req-item cmaction__req-item--${result.status}`}
                        >
                          <span className="cmaction__req-icon">
                            {result.status === "met"
                              ? "✓"
                              : result.status === "warn"
                              ? "!"
                              : result.status === "not-met"
                              ? "✕"
                              : "–"}
                          </span>
                          <span>{result.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="cmaction__detail-block">
                  <h4>Why this fit score?</h4>
                  <p>{activeQualification.reason}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
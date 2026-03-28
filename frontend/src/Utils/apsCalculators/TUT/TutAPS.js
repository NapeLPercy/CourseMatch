import getSubjectLevel from "../subjectLevel";
/* 1 get a subject mark's level(1-7)
2 calculate aps using TUT's aps rules*/

export default function computeTutAPS(subjects) {
  let totalAPS = 0;

  subjects.forEach((sub) => {
    const level = getSubjectLevel(sub.Mark);
    
    if (sub.Name.toLowerCase() === "life orientation") return;

    if (level === 1) return;

    totalAPS += level;
  });

  return totalAPS;
}

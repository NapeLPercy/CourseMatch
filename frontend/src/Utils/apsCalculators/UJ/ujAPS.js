import getSubjectLevel from "../subjectLevel";
/* 1 get a subject mark's level(1-7)
2 calculate aps using UJ's aps rules*/

export default function computeUjAPS(subjects) {
  let totalAPS = 0;

  subjects.forEach((sub) => {
    const level = getSubjectLevel(sub.mark);

    if (sub.name.toLowerCase() === "life orientation") return;

    totalAPS += level;
  });

  return totalAPS;
}

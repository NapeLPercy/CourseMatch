/* Get the level of a subject
e.g 30%=level 1, 80%=level 7*/
export default function getSubjectLevel(mark) {
  if (mark >= 80) return 7;
  if (mark >= 70) return 6;
  if (mark >= 60) return 5;
  if (mark >= 50) return 4;
  if (mark >= 40) return 3;
  if (mark >= 30) return 2;
  return 1; // below 30
}

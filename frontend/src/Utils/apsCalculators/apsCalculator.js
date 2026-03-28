import computeTutAPS from "./TUT/TutAPS";

//calculate each university's aps using its own rules
function calculateApsForUniversity(subjects, universitySlug) {
  let aps = null;
  switch (universitySlug) {
    case "TUT":
      aps = computeTutAPS(subjects);
      break;
    case "UL":
      aps = 0;
      break;
    default:
      alert("This university does not exist");
      break;
  }

  return aps;
}

export default function computeAPS(subjects, universitySlug) {
  return calculateApsForUniversity(subjects, universitySlug);
}

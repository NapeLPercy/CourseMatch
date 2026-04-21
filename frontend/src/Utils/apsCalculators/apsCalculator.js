import computeTutAPS from "./TUT/TutAPS";
import computeUjAPS from "./UJ/ujAPS";
//calculate each university's aps using its own rules
function calculateApsForUniversity(subjects, universitySlug) {
  let aps = null;
  switch (universitySlug) {
    case "TUT":
      aps = computeTutAPS(subjects);
      break;
    case "UJ":
      aps = computeUjAPS(subjects);
      break;
    default:
     // alert("This university does not exist");
      break;
  }

  return aps;
}

export default function computeAPS(subjects, universitySlug) {
  return calculateApsForUniversity(subjects, universitySlug);
}

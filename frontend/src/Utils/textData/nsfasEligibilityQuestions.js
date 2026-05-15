// nsfasQuestions.js
// Static question definitions for the NSFAS Eligibility Checker.
// Each question can decide whether it should be shown using `shouldShow(answers)`.

export const NSFAS_QUESTIONS = [
  {
    id: "isSouthAfrican",
    label: "Are you a South African citizen?",
    type: "radio",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ],
    required: true
  },

  {
    id: "hasDisability",
    label: "Do you live with a disability?",
    type: "radio",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ],
    required: true,
    shouldShow: (answers) => answers.isSouthAfrican === true
  },

  {
    id: "annualHouseholdIncome",
    label: "What is your combined annual household income (before tax)?",
    type: "currency",
    prefix: "R",
    placeholder: "e.g. 180000",
    required: true,
    shouldShow: (answers) =>
      answers.isSouthAfrican === true &&
      answers.hasDisability !== null &&
      answers.hasDisability !== undefined
  },

  {
    id: "hasReceivedNsfasBefore",
    label: "Have you received NSFAS funding before?",
    type: "radio",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ],
    required: true,
    shouldShow: (answers) =>
      answers.isSouthAfrican === true &&
      answers.annualHouseholdIncome !== null &&
      answers.annualHouseholdIncome !== undefined
  },

  // Only shown if user has previously received NSFAS funding
  {
    id: "previousFunding.yearsFunded",
    label: "How many years were you funded by NSFAS?",
    type: "number",
    min: 0,
    max: 20,
    required: true,
    shouldShow: (answers) => answers.hasReceivedNsfasBefore === true
  },

  {
    id: "previousFunding.qualificationDuration",
    label: "What is the standard duration of the qualification you were funded for?",
    type: "number",
    min: 1,
    max: 10,
    suffix: "years",
    required: true,
    shouldShow: (answers) => answers.hasReceivedNsfasBefore === true
  },

  {
    id: "previousFunding.exceededNPlusOne",
    label: "Have you already exceeded the N+1 funding rule?",
    type: "radio",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ],
    required: true,
    shouldShow: (answers) => answers.hasReceivedNsfasBefore === true
  },

  // Institution type is ALWAYS asked after previous funding questions
  // if the user previously received NSFAS, OR immediately if they never did.
  {
    id: "institutionType",
    label: "Where do you want to study?",
    type: "radio",
    options: [
      { label: "Public University", value: "PUBLIC_UNIVERSITY" },
      { label: "Private University", value: "PRIVATE_UNIVERSITY" },
      { label: "Public TVET College", value: "PUBLIC_TVET_COLLEGE" },
      { label: "Private TVET College", value: "PRIVATE_TVET_COLLEGE" }
    ],
    required: true,
    shouldShow: (answers) => {
      // If never funded before, ask immediately.
      if (answers.hasReceivedNsfasBefore === false) {
        return true;
      }

      // If funded before, wait until all previous funding questions are answered.
      if (answers.hasReceivedNsfasBefore === true) {
        const previousFunding = answers.previousFunding || {};

        return (
          previousFunding.yearsFunded !== null &&
          previousFunding.yearsFunded !== undefined &&
          previousFunding.qualificationDuration !== null &&
          previousFunding.qualificationDuration !== undefined &&
          previousFunding.exceededNPlusOne !== null &&
          previousFunding.exceededNPlusOne !== undefined
        );
      }

      return false;
    }
  }
];
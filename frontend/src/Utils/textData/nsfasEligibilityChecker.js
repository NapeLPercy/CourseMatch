export function checkNsfasEligibility(answers) {
  const reasons = [];
  const warnings = ["Final eligibility is subject to official NSFAS verification."];

  if (answers.isSouthAfrican === false) {
    reasons.push("You must be a South African citizen to qualify for NSFAS.");
  }

  const incomeLimit = answers.hasDisability === true ? 600000 : 350000;
  if (answers.annualHouseholdIncome > incomeLimit) {
    reasons.push(
      `Annual household income exceeds the NSFAS threshold of R${incomeLimit.toLocaleString()}.`
    );
  }

  if (
    answers.hasReceivedNsfasBefore === true &&
    answers.previousFunding?.exceededNPlusOne === true
  ) {
    reasons.push("You have exceeded the N+1 NSFAS funding rule.");
  }

  if (
    answers.institutionType !== "PUBLIC_UNIVERSITY" &&
    answers.institutionType !== "PUBLIC_TVET_COLLEGE"
  ) {
    reasons.push("You must be studying at a public university or TVET college.");
  }

  return {
    eligible: reasons.length === 0,
    reasons,
    warnings: reasons.length === 0 ? warnings : [],
  };
}
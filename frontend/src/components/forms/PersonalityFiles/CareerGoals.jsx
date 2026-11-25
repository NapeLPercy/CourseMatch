import { STEPS } from "../../../Utils/textData/careerGoalsQuestions";
import { careerGoalsQuestions } from "../../../Utils/textData/careerGoalsQuestions";
import PersonalityProfileWizard from "../StudentPersonalizationWizard";
import { useAddCareerGoals } from "../../../hooks/useCareerGoals";

import { TrophyIcon } from "lucide-react";
export function CareerGoals() {
  const addCareerGoalsMutation = useAddCareerGoals();

  return (
    <PersonalityProfileWizard
      steps={STEPS}
      questions={careerGoalsQuestions}
      icon={TrophyIcon}
      title="My career goals"
      subtitle="Your career goals insights help our AI recommend courses that truly fit who you are."
      mutation={addCareerGoalsMutation}
    />
  );
}

import { STEPS } from "../../../Utils/textData/personalityQuestions";
import { personalityQuestions } from "../../../Utils/textData/personalityQuestions";
import PersonalityProfileWizard from "../StudentPersonalizationWizard";
import { useAddPersonalityProfile } from "../../../hooks/usePersonalityProfile";
import { UserRoundCheck } from "lucide-react";
export function PersonalityProfile() {
  const addPersonalityMutation = useAddPersonalityProfile();

  return (
    <PersonalityProfileWizard
      steps={STEPS}
      questions={personalityQuestions}
      icon={UserRoundCheck}
      title="My personality profile"
      subtitle="Your personal insights help our AI recommend courses that truly fit who you are."
      mutation={addPersonalityMutation}
    />
  );
}

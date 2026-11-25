import { useGetCareerGoals } from "../../hooks/useCareerGoals";
import {
  Target,
  Briefcase,
  Flag,
  Sparkles,
  Building2,
  User,
} from "lucide-react";
import ErrorState from "../ui/ErrorState";
import EmptyState from "../ui/EmptyState";
import PageHeader from "../ui/PageHeader";
import {
  InfoCard,
  ValueText,
  ChoiceValue,
  formatChoice
} from "./ProfileParts";
import ProfileSkeleton from "./ProfileParts";
import "../../styles/ViewMyPersonalisation.css";

const FIELDS = [
  "dreamJob",
  "goals",
  "aspiration",
  "preferredEnvironment",
  "workStyle",
];

export default function CareerGoals() {
  const { data: goals, isLoading, isError, refetch } = useGetCareerGoals();

  const isEmpty = !goals || !FIELDS.some((key) => goals[key]);

  let content;
  if (isLoading) {
    content = <ProfileSkeleton count={5} />;
  } else if (isError) {
    content = (
      <ErrorState
        message="We couldn't load your career goals. Please try again."
        onRetry={refetch}
      />
    );
  } else if (isEmpty) {
    content = (
      <EmptyState message="You haven't added your career goals yet. Add them so our AI can recommend courses that lead where you want to go." />
    );
  } else {
    content = (
      <div className="pd__grid">
        <InfoCard icon={Briefcase} label="Dream job" tone="blue" index={0} wide>
          <ValueText size="lg">{goals.dreamJob}</ValueText>
        </InfoCard>

        <InfoCard icon={Flag} label="Long-term goal" tone="green" index={1}>
          <ValueText>{goals.goals}</ValueText>
        </InfoCard>

        <InfoCard icon={Sparkles} label="Aspiration" tone="purple" index={2}>
          <ValueText>{goals.aspiration}</ValueText>
        </InfoCard>

        <InfoCard
          icon={Building2}
          label="Preferred environment"
          tone="teal"
          index={3}
        >
          <ChoiceValue>{formatChoice(goals.preferredEnvironment)}</ChoiceValue>
        </InfoCard>

        <InfoCard icon={User} label="Work style" tone="orange" index={4}>
          <ChoiceValue>{formatChoice(goals.workStyle)}</ChoiceValue>
        </InfoCard>
      </div>
    );
  }

  return (
    <div className="pd">
      <PageHeader
        icon={Target}
        title="My career goals"
        subtitle="Where you want to go helps our AI recommend courses that lead there."
        pillOne={goals?.dreamJob}
      />
      {content}
    </div>
  );
}

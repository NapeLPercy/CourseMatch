import { useGetPersonalityProfile } from "../../hooks/usePersonalityProfile";
import {
  BrainCog,
  Zap,
  TrendingUp,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
} from "lucide-react";
import ErrorState from "../ui/ErrorState";
import EmptyState from "../ui/EmptyState";
import PageHeader from "../ui/PageHeader";
import {
  InfoCard,
  ChipList,
  ChoiceValue,
  splitMulti,
  formatChoice
} from "./ProfileParts";
import "../../styles/ViewMyPersonalisation.css";
import ProfileSkeleton from "./ProfileParts";
const FIELDS = [
  "strengths",
  "weaknesses",
  "hobbies",
  "enjoyedSubjects",
  "dislikedSubjects",
  "problemSolvingApproach",
];

export default function PersonalityProfile() {
  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useGetPersonalityProfile();

  const isEmpty = !profile || !FIELDS.some((key) => profile[key]);
  const approach = formatChoice(profile?.problemSolvingApproach);

  let content;
  if (isLoading) {
    content = <ProfileSkeleton count={6} />;
  } else if (isError) {
    content = (
      <ErrorState
        message="We couldn't load your personality profile. Please try again."
        onRetry={refetch}
      />
    );
  } else if (isEmpty) {
    content = (
      <EmptyState message="You haven't completed your personality profile yet. Add it so our AI can recommend courses that fit who you are." />
    );
  } else {
    content = (
      <div className="pd__grid">
        <InfoCard icon={Zap} label="Strengths" tone="green" index={0}>
          <ChipList items={splitMulti(profile.strengths)} />
        </InfoCard>

        <InfoCard
          icon={TrendingUp}
          label="Areas to improve"
          tone="orange"
          index={1}
        >
          <ChipList items={splitMulti(profile.weaknesses)} />
        </InfoCard>

        <InfoCard icon={Heart} label="Hobbies" tone="purple" index={2}>
          <ChipList items={splitMulti(profile.hobbies)} />
        </InfoCard>

        <InfoCard
          icon={ThumbsUp}
          label="Enjoyed subjects"
          tone="blue"
          index={3}
        >
          <ChipList items={splitMulti(profile.enjoyedSubjects)} />
        </InfoCard>

        <InfoCard
          icon={ThumbsDown}
          label="Disliked subjects"
          tone="red"
          index={4}
        >
          <ChipList items={splitMulti(profile.dislikedSubjects)} />
        </InfoCard>

        <InfoCard
          icon={Lightbulb}
          label="Problem-solving approach"
          tone="teal"
          index={5}
        >
          <ChoiceValue>{approach}</ChoiceValue>
        </InfoCard>
      </div>
    );
  }

  return (
    <div className="pd">
      <PageHeader
        icon={BrainCog}
        title="My personality profile"
        subtitle="Your personal insights help our AI recommend courses that truly fit who you are."
        pillOne={approach ? `${approach} problem solver` : undefined}
      />
      {content}
    </div>
  );
}

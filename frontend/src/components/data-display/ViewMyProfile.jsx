import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Edit3,
  User,
  Calendar,
  Briefcase,
  Target,
  Heart,
  BookOpen,
  ThumbsDown,
  Award,
  Users,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import "../../styles/ViewMyProfile.css";
import { getCompleteStudentInfo } from "../../services/studentService";
import ErrorState from "../ui/ErrorState";
import EmptyState from "../ui/EmptyState";
import Skeleton from "../ui/Skeleton";
/* Main component */
export default function ViewMyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchStudentProfile();
  }, []);

  //fetch student complete profile
  const fetchStudentProfile = async () => {
    setError(null);
    try {
      const { data } = await getCompleteStudentInfo();
      if (!data.success) {
        setError("Failed to fetch personal profile");
        return;
      }
      setProfile(data.profile);
    } catch (error) {
      setError("Failed to fetch personal profile");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleEdit = () => {
    console.log("EDIT PROFILE:", profile);
    alert("Edit clicked. Check console for full profile data.");
  };

  if (loading) {
    return <Skeleton />;
  }

  if ((!profile && !error) || !profile?.aspiration) {
    return (
      <EmptyState message="No profile found. Please create one in the 'Add Profile' tab." />
    );
  }

  if (error)
    return <ErrorState message={error} onRetry={fetchStudentProfile} />;

  return (
    <div className="vp">
      {/* Header with Edit button */}
      <div className="vp__header">
        <div className="vp__header-left">
          <div className="vp__avatar">
            <User size={32} strokeWidth={1.6} />
          </div>
          <div className="vp__header-text">
            <h2 className="vp__name">{profile.full_name}</h2>
            <div className="vp__age">
              <Calendar size={14} strokeWidth={2} />
              <span>{profile.age} years old</span>
            </div>
          </div>
        </div>

        <button type="button" className="vp__edit-btn" onClick={handleEdit}>
          <Edit3 size={16} strokeWidth={2} />
          Edit Profile
        </button>
      </div>

      {/* Profile sections */}
      <div className="vp__sections">
        {/* Section: Career & Aspirations */}
        <div className="vp__section">
          <h3 className="vp__section-title">
            <Sparkles size={16} strokeWidth={2} />
            Career & Aspirations
          </h3>

          {profile.dreamJob && (
            <div className="vp__field">
              <div className="vp__field-label">
                <Briefcase size={13} strokeWidth={2} />
                Dream Job
              </div>
              <div className="vp__field-value">{profile.dreamJob}</div>
            </div>
          )}

          <div className="vp__field">
            <div className="vp__field-label">
              <Target size={13} strokeWidth={2} />
              Goals
            </div>
            <div className="vp__field-value">{profile.goals}</div>
          </div>

          {profile.aspiration && (
            <div className="vp__field">
              <div className="vp__field-label">
                <Heart size={13} strokeWidth={2} />
                Aspirations
              </div>
              <div className="vp__field-value">{profile.aspiration}</div>
            </div>
          )}
        </div>

        {/* Section: Strengths & Development */}
        <div className="vp__section">
          <h3 className="vp__section-title">
            <Award size={16} strokeWidth={2} />
            Strengths & Development
          </h3>

          <div className="vp__field">
            <div className="vp__field-label">
              <Award size={13} strokeWidth={2} />
              Strengths
            </div>
            <div className="vp__field-value">{profile.strengths}</div>
          </div>

          <div className="vp__field">
            <div className="vp__field-label">
              <Target size={13} strokeWidth={2} />
              Areas to Improve
            </div>
            <div className="vp__field-value">{profile.weaknesses}</div>
          </div>
        </div>

        {/* Section: Learning Preferences */}
        <div className="vp__section">
          <h3 className="vp__section-title">
            <BookOpen size={16} strokeWidth={2} />
            Learning Preferences
          </h3>

          <div className="vp__field">
            <div className="vp__field-label">
              <BookOpen size={13} strokeWidth={2} />
              Preferred Environment
            </div>
            <div className="vp__field-value">
              <span className="vp__badge">{profile.preferred_environment}</span>
            </div>
          </div>

          <div className="vp__field">
            <div className="vp__field-label">
              <BookOpen size={13} strokeWidth={2} />
              Subjects I Enjoy
            </div>
            <div className="vp__field-value">{profile.enjoyed_subjects}</div>
          </div>

          <div className="vp__field">
            <div className="vp__field-label">
              <ThumbsDown size={13} strokeWidth={2} />
              Subjects I Dislike
            </div>
            <div className="vp__field-value">{profile.disliked_subjects}</div>
          </div>

          <div className="vp__field">
            <div className="vp__field-label">
              <Heart size={13} strokeWidth={2} />
              Hobbies & Interests
            </div>
            <div className="vp__field-value">{profile.hobbies}</div>
          </div>
        </div>

        {/* Section: Work & Problem-Solving Style */}
        <div className="vp__section">
          <h3 className="vp__section-title">
            <Lightbulb size={16} strokeWidth={2} />
            Work & Problem-Solving Style
          </h3>

          <div className="vp__row">
            <div className="vp__field">
              <div className="vp__field-label">
                <Users size={13} strokeWidth={2} />
                Work Style
              </div>
              <div className="vp__field-value">
                <span className="vp__badge">{profile.work_style}</span>
              </div>
            </div>

            <div className="vp__field">
              <div className="vp__field-label">
                <Lightbulb size={13} strokeWidth={2} />
                Problem-Solving
              </div>
              <div className="vp__field-value">
                <span className="vp__badge">
                  {profile.problem_solving_approach}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

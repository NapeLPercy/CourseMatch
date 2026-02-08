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
  Clock,
  DollarSign,
  MapPin,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import "../../styles/ViewMyProfile.css";
/* ─── Main component ────────────────────────────────────────── */
export default function ViewMyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current student's profile
  useEffect(() => {
    // Simulate fetch
    fetchStudentProfile();
  }, []);

  const fetchStudentProfile = async () => {
    try {
      const API_BASE = process.env.REACT_APP_API_BASE;
      const token = JSON.parse(sessionStorage.getItem("token"));

      if (!token) {
        console.warn("No auth token found when fetching student profile");
        return null;
      }

      const response = await axios.get(`${API_BASE}/api/student/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      if (data.success) {
         sessionStorage.setItem(
          "student-profile",
          JSON.stringify(data.profile),
        );

        setTimeout(() => {
          setProfile(data.profile);
          setLoading(false);
        }, 300);
      }
    } catch (error) {
      console.error(
        "Failed to fetch student profile:",
        error.response?.data || error.message,
      );
      setLoading(false);
    }
  };

  const handleEdit = () => {
    console.log("EDIT PROFILE:", profile);
    alert("Edit clicked. Check console for full profile data.");
  };

  if (loading) {
    return (
      <div className="vp">
        <div className="vp__loading">Loading your profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="vp">
        <div className="vp__empty">
          <p>No profile found. Please create one in the "Add Profile" tab.</p>
        </div>
      </div>
    );
  }

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

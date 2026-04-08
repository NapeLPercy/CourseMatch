import { CheckCircle } from "lucide-react";
import "../../styles/SubmitOutput.css";
export default function SubmitSuccess({ success }) {
  if (!success) return null;

  return (
    <div className="welcome__alert welcome__alert--success">
      <CheckCircle size={18} />
      <span className="welcome__alert-text">{success}</span>
    </div>
  );
}
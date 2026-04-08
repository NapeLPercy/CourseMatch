import { AlertCircle } from "lucide-react";
import "../../styles/SubmitOutput.css";

export default function SubmitError({ error }) {
  if (!error) return null;

  return (
    <div className="welcome__alert welcome__alert--error">
      <AlertCircle size={18} />
      <span className="welcome__alert-text">{error}</span>
    </div>
  );
}
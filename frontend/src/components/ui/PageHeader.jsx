import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import "../../styles/PageHeader.css";

export default function PageHeader({
  icon: Icon,
  title,
  subtitle,
  pillOne,
  pillTwo,
  backPath,
  onBack,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else if (backPath) navigate(backPath);
    else navigate(-1);
  };

  return (
    <div className="ph">
      <button className="ph__back" onClick={handleBack}>
        <ChevronLeft size={16} strokeWidth={2.5} />
        Back
      </button>

      <div className="ph__hero">
        <div className="ph__icon">
          <Icon size={26} strokeWidth={1.8} />
        </div>
        <div className="ph__text">
          <h1 className="ph__title">{title}</h1>
          {subtitle && <p className="ph__subtitle">{subtitle}</p>}
          {(pillOne || pillTwo) && (
            <div className="ph__pills">
              {pillOne && (
                <span className="ph__pill ph__pill--blue">{pillOne}</span>
              )}
              {pillTwo && (
                <span className="ph__pill ph__pill--green">{pillTwo}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import "../../styles/ErrorState.css";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <div className="error-state__content">
        <div className="error-state__icon">
          <AlertCircle size={48} strokeWidth={1.5} />
        </div>
        
        <h3 className="error-state__title">Something went wrong</h3>
        
        <p className="error-state__message">
          {message || "An unexpected error occurred. Please try again."}
        </p>
        
        {onRetry && (
          <button className="error-state__btn" onClick={onRetry}>
            <RefreshCw size={16} strokeWidth={2.2} />
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
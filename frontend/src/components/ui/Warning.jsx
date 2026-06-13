import React, { useEffect, useState } from "react";
import { Info, X, LogIn, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/Warning.css";

export default function Warning({ show, message, onClose }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, [show]);

  useEffect(() => {
    if (visible) document.body.style.overflow = "hidden";
  }, [visible]);

  const handleClose = () => {
    document.body.style.overflow = "";
    onClose();
  };

  const handleLogin = () => {
    document.body.style.overflow = "";
    onClose();
    navigate("/login");
  };

  if (!show || !visible) return null;

  return (
    <>
      <div className="warn__overlay" onClick={handleClose} />
      <div className="warn__modal">

        <button className="warn__modal-close" onClick={handleClose}>
          <X size={14} strokeWidth={2.5} />
        </button>

        <div className="warn__modal-icon">
          <Info size={28} strokeWidth={1.8} />
        </div>

        <div className="warn__modal-body">
          <h3 className="warn__modal-title">Good to know</h3>
          <p
            className="warn__modal-text"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>

        <div className="warn__modal-footer">
          <button className="warn__modal-btn warn__modal-btn--ghost" onClick={handleClose}>
            <Check size={15} strokeWidth={2.5} />
            Got it
          </button>
          <button className="warn__modal-btn warn__modal-btn--primary" onClick={handleLogin}>
            <LogIn size={15} strokeWidth={2.5} />
            Sign in
          </button>
        </div>

      </div>
    </>
  );
}
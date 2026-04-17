import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileX } from "lucide-react";
import "../../styles/BlogNotFound.css";

export default function BlogNotFound() {
  const navigate = useNavigate();

  return (
    <div className="bnf">
      <div className="bnf__card">
        {/* Icon */}
        <div className="bnf__icon-wrap">
          <FileX size={32} strokeWidth={1.8} color="#fff" />
        </div>

        {/* Text */}
        <h1 className="bnf__title">Post not found</h1>
        <p className="bnf__message">
          This article doesn't exist or may have been removed. Double-check the
          URL or head back and find something great to read.
        </p>

        {/* Back button */}
        <button className="bnf__back" onClick={() => navigate(-2)}>
          <ArrowLeft size={15} strokeWidth={2.5} />
          Go back
        </button>
      </div>
    </div>
  );
}
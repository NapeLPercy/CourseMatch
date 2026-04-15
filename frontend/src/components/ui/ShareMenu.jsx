import { useState } from "react";
import { Share2, Check, Twitter, Link2 } from "lucide-react";
export default function ShareMenu({ title }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1800);
    });
  }

  function handleTwitter() {
    const tweet = `${title} — ${url}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`,
      "_blank",
    );
    setOpen(false);
  }

  return (
    <div className="bp__share-wrap">
      <button
        className="bp__share-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Share post"
      >
        <Share2 size={15} strokeWidth={2} />
        Share
      </button>

      {open && (
        <div className="bp__share-menu">
          <button className="bp__share-option" onClick={handleTwitter}>
            <Twitter size={14} strokeWidth={2} />
            Share on X
          </button>
          <button className="bp__share-option" onClick={handleCopy}>
            {copied ? (
              <Check size={14} strokeWidth={2.5} color="#16a34a" />
            ) : (
              <Link2 size={14} strokeWidth={2} />
            )}
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      )}
    </div>
  );
}

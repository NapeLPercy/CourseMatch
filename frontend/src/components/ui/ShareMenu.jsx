import { useState } from "react";
import {
  Share2,
  Check,
  Twitter,
  Link2,
  Facebook,
  MessageCircle,
} from "lucide-react";

export default function ShareMenu({ post }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/post/${post?.id}`
      : "";

  const image = post?.coverImageUrl || "";

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
    const text = `${post.title}\n${url}\n${image}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank",
    );
    setOpen(false);
  }

  function handleFacebook() {
    const shareText = `${post.title}\n${url}`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url,
      )}&quote=${encodeURIComponent(shareText)}`,
      "_blank",
    );
    setOpen(false);
  }

  function handleWhatsApp() {
    const message = `${post.title}\n${url}\n${image}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
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
          <button className="bp__share-option" onClick={handleFacebook}>
            <Facebook size={14} strokeWidth={2} />
            Facebook
          </button>

          <button className="bp__share-option" onClick={handleWhatsApp}>
            <MessageCircle size={14} strokeWidth={2} />
            WhatsApp
          </button>
          <button className="bp__share-option" onClick={handleTwitter}>
            <Twitter size={14} strokeWidth={2} />X
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

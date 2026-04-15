import { useState } from "react";
import {
  Plus,
  Trash2,
  Loader2,
  ImageIcon,
  AlignLeft,
  Heading,
} from "lucide-react";
import "../../styles/AddBlogPost.css";
import { createBlog } from "../../services/blogService";
import SubmitError from "../ui/SubmitError";
import SubmitSuccess from "../ui/SubmitSuccess";
import { blogPostTopics } from "../../Utils/textData/blogTopics";


const EMPTY_FORM = {
  title: "",
  excerpt: "",
  topic: "",
  coverImage: "",
};

const EMPTY_BLOCK = { type: "paragraph", content: "" };

export default function AddBlogPost({ onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [blocks, setBlocks] = useState([{ ...EMPTY_BLOCK }]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  /* ── Field change ── */
  function handleField(e) {
    const { name, value, files } = e.target;

    setForm((f) => ({
      ...f,
      [name]: files ? files[0] : value, // file support
    }));

    if (errors[name]) {
      setErrors((e) => ({ ...e, [name]: null }));
    }
  }

  /* ── Block change ── */
  function handleBlockChange(index, key, value) {
    setBlocks((prev) =>
      prev.map((b, i) => (i === index ? { ...b, [key]: value } : b)),
    );
    if (errors[`block_${index}`])
      setErrors((e) => ({ ...e, [`block_${index}`]: null }));
  }

  /* ── Add block ── */
  function addBlock() {
    setBlocks((prev) => [...prev, { ...EMPTY_BLOCK }]);
  }

  /* ── Remove block ── */
  function removeBlock(index) {
    if (blocks.length === 1) return;
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  }

  /* ── Validate ── */
  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.excerpt.trim()) e.excerpt = "Excerpt is required";
    if (!form.topic) e.topic = "Pick a topic";
    blocks.forEach((b, i) => {
      if (!b.content.trim()) e[`block_${i}`] = "Block content is required";
    });
    return e;
  }

  /* ── Submit ── */
  async function handleSubmit(e) {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    // Build FormData instead of JSON
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("excerpt", form.excerpt);
    formData.append("topic", form.topic);

    // image (multer will read this)
    if (form.coverImage) {
      formData.append("coverImage", form.coverImage);
    }

    // blocks → must stringify
    const formattedBlocks = blocks.map((b, i) => ({
      type: b.type,
      content: b.content.trim(),
      position: i + 1,
    }));

    formData.append("blocks", JSON.stringify(formattedBlocks));

    setLoading(true);

    try {
      const { data } = await createBlog(formData);
      if (!data.success) {
        setSubmitError("Failed to submit data, try again!");
        return;
      }
      setSubmitSuccess("Blog submitted successfully");
      setForm(EMPTY_FORM);
      setBlocks([{ ...EMPTY_BLOCK }]);
      setErrors({});
    } catch {
      setSubmitError("Failed to submit data, try again!");
      /* parent handles errors */
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSubmitError(null);
        setSubmitSuccess(null);
      }, 6000);
    }
  }

  return (
    <form className="abp" onSubmit={handleSubmit} noValidate>
      {/* ── Post details card ── */}
      <div className="abp__card">
        <p className="abp__card-label">Post Details</p>

        {/* Title */}
        <div className="abp__field">
          <label className="abp__label" htmlFor="title">
            Title
          </label>
          <input
            className={`abp__input ${errors.title ? "abp__input--error" : ""}`}
            id="title"
            name="title"
            type="text"
            placeholder="e.g. How to Choose the Right Course"
            value={form.title}
            onChange={handleField}
          />
          {errors.title && <span className="abp__error">{errors.title}</span>}
        </div>

        {/* Excerpt */}
        <div className="abp__field">
          <label className="abp__label" htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            className={`abp__textarea abp__textarea--short ${errors.excerpt ? "abp__input--error" : ""}`}
            id="excerpt"
            name="excerpt"
            placeholder="A short summary shown on the blog listing page…"
            value={form.excerpt}
            onChange={handleField}
            rows={2}
          />
          {errors.excerpt && (
            <span className="abp__error">{errors.excerpt}</span>
          )}
        </div>

        {/* Topic + Cover row */}
        <div className="abp__row">
          <div className="abp__field">
            <label className="abp__label" htmlFor="topic">
              Topic
            </label>
            <select
              className={`abp__select ${errors.topic ? "abp__input--error" : ""}`}
              id="topic"
              name="topic"
              value={form.topic}
              onChange={handleField}
            >
              <option value="">Select a category</option>
              {blogPostTopics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.topic && <span className="abp__error">{errors.topic}</span>}
          </div>

          <div className="abp__field">
            <label className="abp__label" htmlFor="coverImage">
              <ImageIcon size={12} strokeWidth={2} />
              Cover Image
            </label>

            <input
              className="abp__input"
              id="coverImage"
              name="coverImage"
              type="file"
              accept="image/*"
              onChange={handleField}
            />
          </div>
        </div>
      </div>

      {/* ── Blocks card ── */}
      <div className="abp__card">
        <p className="abp__card-label">Content Blocks</p>

        <div className="abp__blocks">
          {blocks.map((block, i) => (
            <div key={i} className="abp__block">
              {/* Block header */}
              <div className="abp__block-header">
                <span className="abp__block-pos">{i + 1}</span>

                <select
                  className="abp__block-type"
                  value={block.type}
                  onChange={(e) => handleBlockChange(i, "type", e.target.value)}
                >
                  <option value="heading">Heading</option>
                  <option value="paragraph">Paragraph</option>
                </select>

                <span className="abp__block-type-icon">
                  {block.type === "heading" ? (
                    <Heading size={13} strokeWidth={2.5} />
                  ) : (
                    <AlignLeft size={13} strokeWidth={2} />
                  )}
                </span>

                <button
                  type="button"
                  className="abp__block-remove"
                  onClick={() => removeBlock(i)}
                  disabled={blocks.length === 1}
                  aria-label="Remove block"
                >
                  <Trash2 size={13} strokeWidth={2} />
                </button>
              </div>

              {/* Block content */}
              <textarea
                className={`abp__textarea ${
                  block.type === "heading" ? "abp__textarea--heading" : ""
                } ${errors[`block_${i}`] ? "abp__input--error" : ""}`}
                placeholder={
                  block.type === "heading"
                    ? "Enter heading…"
                    : "Write your paragraph here…"
                }
                value={block.content}
                onChange={(e) =>
                  handleBlockChange(i, "content", e.target.value)
                }
                rows={block.type === "heading" ? 1 : 4}
              />
              {errors[`block_${i}`] && (
                <span className="abp__error">{errors[`block_${i}`]}</span>
              )}
            </div>
          ))}
        </div>

        {/* Add block btn */}
        <button type="button" className="abp__add-block" onClick={addBlock}>
          <Plus size={14} strokeWidth={2.5} />
          Add block
        </button>
      </div>

      {/* ── ERROR/SUCCESS ── */}
      {submitError && <SubmitError error={submitError} />}

      {submitSuccess && <SubmitSuccess success={submitSuccess} />}

      {/* ── Submit ── */}
      <button
        className="abp__submit"
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? (
          <>
            <Loader2 size={16} strokeWidth={2} className="abp__spinner" />
            Publishing…
          </>
        ) : (
          "Publish Post"
        )}
      </button>
    </form>
  );
}

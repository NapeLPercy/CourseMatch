import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

/**
 * Props
 *  onSearch(query)  Called on submit (Enter).
 *  onChange(query)  Called on every keystroke (optional).
 *  placeholder      Input placeholder.
 *
 * Ctrl/Cmd + K focuses the field. No backend assumptions are made here.
 */
export default function SearchBar({
  onSearch,
  onChange,
  placeholder = "Search…",
}) {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch?.(value.trim());
  }

  function handleChange(e) {
    setValue(e.target.value);
    onChange?.(e.target.value);
  }

  function handleClear() {
    setValue("");
    onChange?.("");
    inputRef.current?.focus();
  }

  return (
    <form className="ws-search" role="search" onSubmit={handleSubmit}>
      <Search
        className="ws-search__icon"
        size={15}
        strokeWidth={2}
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="search"
        className="ws-search__input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        aria-label="Search"
        autoComplete="off"
      />
      {value ? (
        <button
          type="button"
          className="ws-search__clear"
          aria-label="Clear search"
          onClick={handleClear}
        >
          <X size={14} strokeWidth={2.2} />
        </button>
      ) : (
        <kbd className="ws-search__kbd" aria-hidden="true">
          Ctrl K
        </kbd>
      )}
    </form>
  );
}
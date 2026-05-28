

import { Search, CheckCircle2, XCircle } from "lucide-react";

export default function StatusPill({ value, label }) {
  return (
    <span className={`aul__pill ${value ? "aul__pill--yes" : "aul__pill--no"}`}>
      {value ? (
        <CheckCircle2 size={11} strokeWidth={2.5} />
      ) : (
        <XCircle size={11} strokeWidth={2.5} />
      )}
      {label}
    </span>
  );
}
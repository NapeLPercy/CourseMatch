import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * @param {Array} recommendations - [{ qualification_code, qualification_name, fit_score, reason }]
 * @param {Object} options - optional metadata
 */
export function generateRecommendationsPdf(
  recommendations,
  options = {}
) {
  const {
    title = "CourseMatch AI Recommendations",
    subtitle = "",
    filename = "coursematch-recommendations.pdf",
  } = options;

  const doc = new jsPDF();

  // Header
  doc.setFontSize(16);
  doc.text(title, 14, 18);

  doc.setFontSize(11);
  const dateStr = new Date().toLocaleString();
  doc.text(`Generated: ${dateStr}`, 14, 26);

  if (subtitle) {
    doc.text(subtitle, 14, 32);
  }

  // Table rows
  const rows = (recommendations || []).map((r, idx) => [
    idx + 1,
    r.qualification_code ?? "",
    r.qualification_name ?? "",
    String(r.fit_score ?? ""),
    r.reason ?? "",
  ]);

  autoTable(doc, {
    startY: subtitle ? 38 : 32,
    head: [["#", "Code", "Qualification", "Fit Score", "Reason"]],
    body: rows,
    styles: {
      fontSize: 9,
      cellPadding: 2,
      overflow: "linebreak",
      valign: "top",
    },
    headStyles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 8 },
      1: { cellWidth: 22 },
      2: { cellWidth: 55 },
      3: { cellWidth: 16 },
      4: { cellWidth: 85 },
    },
  });

  doc.save(filename);
}

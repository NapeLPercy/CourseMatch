export function parseComparison(comparisonRow) {
  if (!comparisonRow) return null;

  try {
    const data =
      typeof comparisonRow.comparison_data === "string"
        ? JSON.parse(comparisonRow.comparison_data)
        : comparisonRow.comparison_data;

    return {
      id: comparisonRow.id,
      created_at: comparisonRow.created_at,
      courseComparisons: data.courseComparisons || [],
      finalRecommendation: data.finalRecommendation || data.winner || null,
    };
  } catch (err) {
    console.error("Failed to parse comparison:", err);
    return null;
  }
}
const DASHBOARD_CACHE_KEY = "student_dashboard";
const CACHE_TIME = 10 * 60 * 1000; // 10 minutes

export function getCachedDashboard() {
  const cached = sessionStorage.getItem(DASHBOARD_CACHE_KEY);
  if (!cached) return null;

  try {
    return JSON.parse(cached);
  } catch {
    return null;
  }
}

export function setCachedDashboard(data) {
  sessionStorage.setItem(
    DASHBOARD_CACHE_KEY,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    })
  );
}

export function isCacheValid(timestamp) {
  return Date.now() - timestamp < CACHE_TIME;
}
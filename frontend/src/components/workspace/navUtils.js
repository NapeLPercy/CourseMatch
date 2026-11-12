/* Pure helpers. Nothing here knows about roles or specific routes. */

export function isPathActive(pathname, path) {
  if (!path) return false;
  if (pathname === path) return true;
  const base = path.endsWith("/") ? path : `${path}/`;
  return pathname.startsWith(base);
}

export function isGroup(item) {
  return Array.isArray(item?.dropdown) && item.dropdown.length > 0;
}

export function isGroupActive(item, pathname) {
  return (
    isGroup(item) &&
    item.dropdown.some((child) => isPathActive(pathname, child.path))
  );
}

/**
 * Every array-valued key on the navigation config is a section, rendered in
 * declaration order. `main` is just one of them, so new sections can be added
 * to a config without touching the workspace. An optional
 * `navigation.sectionLabels = { key: "Heading" }` adds a heading to a section.
 */
export function getSections(navigation) {
  if (!navigation) return [];
  return Object.entries(navigation)
    .filter(([, value]) => Array.isArray(value))
    .map(([key, items]) => ({
      key,
      label: navigation.sectionLabels?.[key] ?? null,
      items,
    }));
}

/** ["Subjects", "View Subjects"] or ["Dashboard"] for the current route. */
export function getActiveTrail(navigation, pathname) {
  for (const { items } of getSections(navigation)) {
    for (const item of items) {
      if (isGroup(item)) {
        const child = item.dropdown.find((c) => isPathActive(pathname, c.path));
        if (child) return [item.label, child.label];
      } else if (isPathActive(pathname, item.path)) {
        return [item.label];
      }
    }
  }
  return [];
}

export function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}
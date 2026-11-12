import { isValidElement, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NavigationGroup from "./NavigationGroup";
import { getSections, isGroup, isGroupActive, isPathActive } from "./navUtils";

/* Icon comes from the config (optional). Falls back to the label's initial. */
export function NavIcon({ item }) {
  const Icon = item.icon;
  if (isValidElement(Icon)) return Icon;
  if (Icon) return <Icon size={18} strokeWidth={1.9} aria-hidden="true" />;
  return (
    <span className="ws-nav__glyph" aria-hidden="true">
      {item.label?.[0]?.toUpperCase()}
    </span>
  );
}

function NavLinkItem({ item, active, iconOnly, onNavigate }) {
  return (
    <Link
      to={item.path}
      className={`ws-nav__item${active ? " ws-nav__item--active" : ""}`}
      aria-current={active ? "page" : undefined}
      aria-label={iconOnly ? item.label : undefined}
      title={iconOnly ? item.label : undefined}
      onClick={onNavigate}
    >
      <NavIcon item={item} />
      {!iconOnly && <span className="ws-nav__label">{item.label}</span>}
    </Link>
  );
}

export default function SidebarNavigation({
  navigation,
  iconOnly,
  onNavigate,
  onExpand,
}) {
  const { pathname } = useLocation();
  const sections = getSections(navigation);

  // label of the one group that is open (null = all closed)
  const activeGroupLabel =
    sections
      .flatMap((s) => s.items)
      .find((item) => isGroupActive(item, pathname))?.label ?? null;

  const [openKey, setOpenKey] = useState(activeGroupLabel);

  // when the route moves into a different group, switch to that group
  useEffect(() => {
    if (activeGroupLabel) setOpenKey(activeGroupLabel);
  }, [activeGroupLabel]);

  return (
    <>
      {sections.map((section) => (
        <div className="ws-nav__section" key={section.key}>
          {section.label && !iconOnly && (
            <p className="ws-nav__heading">{section.label}</p>
          )}

          <ul className="ws-nav__list">
            {section.items.map((item) => {
              if (isGroup(item)) {
                return (
                  <li key={item.label}>
                    <NavigationGroup
                      item={item}
                      pathname={pathname}
                      iconOnly={iconOnly}
                      open={openKey === item.label}
                      onToggle={() =>
                        setOpenKey((prev) =>
                          prev === item.label ? null : item.label,
                        )
                      }
                      onOpen={() => setOpenKey(item.label)}
                      onNavigate={onNavigate}
                      onExpand={onExpand}
                    />
                  </li>
                );
              }

              // Items with neither a path nor a dropdown are skipped.
              if (!item.path) return null;

              return (
                <li key={item.path}>
                  <NavLinkItem
                    item={item}
                    active={isPathActive(pathname, item.path)}
                    iconOnly={iconOnly}
                    onNavigate={onNavigate}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}

import { useId } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { NavIcon } from "./SidebarNavigation";
import { isGroupActive, isPathActive } from "./navUtils";

export default function NavigationGroup({
  item,
  pathname,
  iconOnly,
  open, // new
  onToggle, // new
  onOpen, // new
  onNavigate,
  onExpand,
}) {
  const panelId = useId();
  const childActive = isGroupActive(item, pathname);

  // removed: const [open, setOpen] = useState(childActive);
  // removed: the useEffect that called setOpen(true)

  const expanded = open && !iconOnly;

  function handleToggle() {
    if (iconOnly) {
      onExpand?.();
      onOpen();
      return;
    }
    onToggle();
  }

  // ...the JSX below stays exactly as it is

  return (
    <div className="ws-group">
      <button
        type="button"
        className={`ws-nav__item${childActive ? " ws-nav__item--parent-active" : ""}`}
        aria-expanded={expanded}
        aria-controls={panelId}
        aria-label={iconOnly ? item.label : undefined}
        title={iconOnly ? item.label : undefined}
        onClick={handleToggle}
      >
        <NavIcon item={item} />
        {!iconOnly && (
          <>
            <span className="ws-nav__label">{item.label}</span>
            <ChevronDown
              size={15}
              strokeWidth={2.2}
              className={`ws-nav__chevron${expanded ? " ws-nav__chevron--open" : ""}`}
              aria-hidden="true"
            />
          </>
        )}
      </button>

      <div
        id={panelId}
        className={`ws-nav__panel${expanded ? " ws-nav__panel--open" : ""}`}
      >
        <ul className="ws-nav__panel-inner">
          {item.dropdown.map((child) => {
            const active = isPathActive(pathname, child.path);
            return (
              <li key={child.path}>
                <Link
                  to={child.path}
                  className={`ws-nav__sub${active ? " ws-nav__sub--active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={onNavigate}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

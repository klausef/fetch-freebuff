import { roleTabs, type BottomTab } from "@/lib/bottomTabs";
import { useT } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";

/**
 * The bottom navigation.
 *
 * Three places, for both sides of the platform: where you start, the trips you
 * have, and the conversations about them. The list is data (`lib/bottomTabs`)
 * so the rider's extra tabs and the role defaults cannot drift from the routes
 * they point at.
 *
 * `activeKey` overrides the path match for screens that are not themselves a
 * tab — the booking form, for instance, keeps Home lit while it is open.
 */
export function BottomTabs({
  tabs,
  role = "",
  hasActiveRide = false,
  activeKey,
}: {
  /** A screen's own tab list, when it overrides the role default. */
  tabs?: BottomTab[];
  /** The signed-in role, used when no list is passed. */
  role?: string;
  /** Whether the rider is carrying a ride; only riders gain that tab. */
  hasActiveRide?: boolean;
  /** Marks a tab active when the current path does not match its target. */
  activeKey?: string;
}) {
  const t = useT();
  const list = tabs ?? roleTabs(role, hasActiveRide);

  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 px-3">
      <div className="soft-sheen mx-auto mb-2 flex h-14 w-full max-w-lg items-stretch justify-around rounded-full border border-border/55 bg-card/92 p-1 shadow-soft-lg backdrop-blur-xl dark:border-white/[0.08] dark:bg-card/80">
        {list.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.key}
              to={tab.to}
              end
              className={({ isActive }) =>
                cn(
                  // A full-height cell, so the whole tab is tappable and not
                  // just the glyph. The active state is a raised icon chip: at
                  // a glance it reads as the one control standing proud of the
                  // sunken dock.
                  "flex min-w-16 flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full px-2 text-[11px] font-medium tracking-tight transition-colors",
                  isActive || tab.key === activeKey
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {({ isActive }) => {
                const active = isActive || tab.key === activeKey;
                return (
                  <>
                    <span
                      className={cn(
                        "flex size-7 items-center justify-center rounded-full transition-all duration-200",
                        active
                          ? "bg-primary text-primary-foreground shadow-soft-sm"
                          : "text-muted-foreground",
                      )}
                    >
                      <Icon className="size-[18px]" aria-hidden="true" />
                    </span>
                    <span
                      className={cn(
                        "transition-colors",
                        active ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {t("nav", tab.labelKey)}
                    </span>
                  </>
                );
              }}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

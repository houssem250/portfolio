"use client";

import * as React from "react";

/**
 * Tracks which section is currently in the viewport.
 *
 * Uses IntersectionObserver with a top-biased rootMargin so the active
 * section flips as the section heading crosses the upper third of the
 * viewport (below the sticky navbar). Falls back gracefully on SSR.
 *
 * @param ids Section ids to observe (without the leading "#").
 * @returns The id of the active section, or an empty string while none is.
 */
export function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Top-biased viewport: the active section is the one whose heading
    // sits in the upper third. The -40% bottom margin stops the next
    // section from activating before the previous one has left the view.
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest visible area.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when the section is in the middle 40% band of the
        // viewport, well below the sticky header.
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Renders nothing — just re-triggers the pageFadeIn animation on
 * the #app-layout element whenever the route changes.
 * No wrapper div, no layout impact.
 */
export default function RouteAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    const el = document.getElementById("app-layout");
    if (!el) return;
    el.classList.remove("page-enter");
    void el.offsetWidth; // force reflow so removing + re-adding restarts the animation
    el.classList.add("page-enter");
  }, [pathname]);

  return null;
}

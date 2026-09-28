import { $$, byId } from "../utils/dom.js";

/** Muestra una sección y marca su botón en el menú. */
export function goTo(sectionId) {
  $$(".section").forEach((s) => s.classList.toggle("active", s.id === sectionId));
  $$(".nav-links button").forEach((b) => b.classList.toggle("active", b.dataset.nav === sectionId));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function initNavigation() {
  // Delegación: cualquier elemento con data-nav navega a su sección.
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-nav]");
    if (!trigger || !byId(trigger.dataset.nav)) return;
    e.preventDefault();
    goTo(trigger.dataset.nav);
  });
}

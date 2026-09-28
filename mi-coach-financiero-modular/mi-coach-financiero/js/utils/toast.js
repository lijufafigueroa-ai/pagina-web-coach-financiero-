import { byId } from "./dom.js";

let timer;

/** Muestra una notificación breve en pantalla. */
export function toast(message) {
  const el = byId("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove("show"), 2200);
}

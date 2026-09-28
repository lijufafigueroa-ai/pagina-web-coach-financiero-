/**
 * Utilidades de formato y seguridad.
 */
export const formatMoney = (n) =>
  "$" + Number(n).toLocaleString("es-CO", { maximumFractionDigits: 0 });

/** Escapa texto del usuario antes de insertarlo como HTML (evita XSS). */
export function escapeHtml(text = "") {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

import { byId, clearFields, valueOf } from "../utils/dom.js";
import { escapeHtml } from "../utils/format.js";
import { load, save } from "../utils/storage.js";
import { toast } from "../utils/toast.js";

const MAX_VISIBLES = 8;
let entradas = load("bitacora", []);

function render() {
  const el = byId("listaBitacora");
  if (!entradas.length) {
    el.innerHTML = "";
    return;
  }
  const filas = entradas
    .map((b, i) => ({ ...b, i }))
    .slice(-MAX_VISIBLES)
    .reverse()
    .map((b) => `
      <tr>
        <td>${b.fecha}</td><td>${escapeHtml(b.emocion)}</td><td>${b.intensidad}</td>
        <td>${escapeHtml(b.nota) || "—"}</td>
        <td><button class="del" data-index="${b.i}" title="Eliminar">✕</button></td>
      </tr>`)
    .join("");
  el.innerHTML = `<table><tr><th>Fecha</th><th>Emoción</th><th>Int.</th><th>Nota</th><th></th></tr>${filas}</table>`;
}

function persist() {
  save("bitacora", entradas);
  render();
}

export function initBitacora() {
  byId("btnBitacora").addEventListener("click", () => {
    entradas.push({
      fecha: new Date().toLocaleDateString("es-CO"),
      emocion: valueOf("bEmocion"),
      intensidad: valueOf("bIntensidad"),
      nota: valueOf("bNota"),
    });
    persist();
    clearFields("bNota");
    toast("Entrada guardada 💚");
  });

  byId("listaBitacora").addEventListener("click", (e) => {
    const btn = e.target.closest(".del");
    if (!btn) return;
    entradas.splice(Number(btn.dataset.index), 1);
    persist();
  });

  render();
}

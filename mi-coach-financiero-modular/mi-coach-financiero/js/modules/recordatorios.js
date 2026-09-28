import { byId, clearFields, valueOf } from "../utils/dom.js";
import { escapeHtml } from "../utils/format.js";
import { load, save } from "../utils/storage.js";
import { toast } from "../utils/toast.js";

let recordatorios = load("recordatorios", []);

function render() {
  byId("listaRecordatorios").innerHTML = recordatorios.length
    ? recordatorios
        .map((r, i) => `
          <div class="reminder">
            <span>🔔 <strong>${r.dia}:</strong> ${escapeHtml(r.texto)}</span>
            <button class="del" data-index="${i}" title="Eliminar">✕</button>
          </div>`)
        .join("")
    : '<p class="sub" style="margin-top:12px">Sin recordatorios todavía.</p>';
}

function persist() {
  save("recordatorios", recordatorios);
  render();
}

export function initRecordatorios() {
  byId("btnRecordatorio").addEventListener("click", () => {
    const texto = valueOf("rTexto");
    if (!texto) return toast("Escribe el texto del recordatorio");
    recordatorios.push({ texto, dia: valueOf("rDia") });
    persist();
    clearFields("rTexto");
    toast("Recordatorio añadido 🔔");
  });

  byId("listaRecordatorios").addEventListener("click", (e) => {
    const btn = e.target.closest(".del");
    if (!btn) return;
    recordatorios.splice(Number(btn.dataset.index), 1);
    persist();
  });

  render();
}

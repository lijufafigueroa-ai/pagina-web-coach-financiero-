import { byId, clearFields, numberOf, valueOf } from "../utils/dom.js";
import { escapeHtml, formatMoney } from "../utils/format.js";
import { load, save } from "../utils/storage.js";
import { toast } from "../utils/toast.js";
import { FRASES } from "../data/frases.js";

let metas = load("metas", []);

const persist = () => {
  save("metas", metas);
  render();
};

function goalTemplate(meta, index) {
  const pct = Math.min(100, Math.round((meta.ahorrado / meta.monto) * 100));
  return `
    <div class="goal-item">
      <div class="top"><h4>${escapeHtml(meta.nombre)}</h4><span class="tag">${meta.fecha}</span></div>
      <p class="sub" style="margin:6px 0">${escapeHtml(meta.porque)}</p>
      <p style="font-size:.85rem">Microacción: <strong>${escapeHtml(meta.micro) || "—"}</strong></p>
      <div class="bar"><i style="width:${pct}%"></i></div>
      <div class="top" style="margin-top:8px">
        <span style="font-size:.85rem;color:var(--muted)">${formatMoney(meta.ahorrado)} de ${formatMoney(meta.monto)} · ${pct}%</span>
        <span>
          <button class="btn btn-green" style="padding:6px 14px;font-size:.8rem" data-action="avanzar" data-index="${index}">+ Avance</button>
          <button class="del" data-action="borrar" data-index="${index}" title="Eliminar">✕</button>
        </span>
      </div>
    </div>`;
}

/** Pinta la lista (Paso 2) y el panel (Paso 3). */
function render() {
  const lista = byId("listaMetas");
  const panel = byId("panelMetas");
  if (!metas.length) {
    lista.innerHTML = '<p class="sub">Aún no tienes metas. Crea la primera a la izquierda.</p>';
    panel.innerHTML = '<p class="sub">Crea una meta en el Paso 2 para verla aquí.</p>';
    return;
  }
  const html = metas.map(goalTemplate).join("");
  lista.innerHTML = html;
  panel.innerHTML = html;
}

function avanzar(i) {
  const monto = Number(prompt(`¿Cuánto quieres abonar a "${metas[i].nombre}"?`, "25"));
  if (monto > 0) {
    metas[i].ahorrado += monto;
    persist();
    toast("¡Avance registrado! 🎉");
  }
}

function borrar(i) {
  if (confirm("¿Eliminar esta meta?")) {
    metas.splice(i, 1);
    persist();
  }
}

function crear() {
  const nombre = valueOf("gNombre");
  const monto = numberOf("gMonto");
  const fecha = valueOf("gFecha");
  if (!nombre || !monto || !fecha) return toast("Completa nombre, monto y fecha");

  metas.push({ nombre, monto, fecha, porque: valueOf("gPorque"), micro: valueOf("gMicro"), ahorrado: 0 });
  persist();
  clearFields("gNombre", "gMonto", "gFecha", "gPorque", "gMicro");
  toast("Meta creada ✅");
}

function handleActions(e) {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const i = Number(btn.dataset.index);
  if (btn.dataset.action === "avanzar") avanzar(i);
  if (btn.dataset.action === "borrar") borrar(i);
}

export function initMetas() {
  byId("frase").textContent = "💬 " + FRASES[new Date().getDay() % FRASES.length];
  byId("btnCrearMeta").addEventListener("click", crear);
  byId("listaMetas").addEventListener("click", handleActions);
  byId("panelMetas").addEventListener("click", handleActions);
  render();
}

import { $$, byId, numberOf, valueOf } from "../utils/dom.js";
import { escapeHtml } from "../utils/format.js";
import { save } from "../utils/storage.js";
import { toast } from "../utils/toast.js";
import { PERFILES } from "../data/frases.js";

const PREGUNTAS = ["qImpulso", "qRegistro", "qAhorro", "qCredito"];

/** Calcula el % de salud financiera (mayor = más saludable). */
function calcularSalud() {
  const score = PREGUNTAS.reduce((acc, id) => acc + numberOf(id), 0); // 4..16
  return Math.round(((16 - score) / 12) * 100);
}

function render({ pct, perfil, emociones, reflexion }) {
  const r = byId("resultadoDiag");
  r.innerHTML = `
    <h3>Tu resultado: ${perfil.nombre}</h3>
    <p class="sub" style="margin:8px 0 4px">Salud de hábitos financieros: <strong>${pct}%</strong></p>
    <div class="bar"><i style="width:${pct}%"></i></div>
    <p style="margin-top:14px">${perfil.consejo}</p>
    ${emociones.length ? `<p style="margin-top:10px"><strong>Detonantes identificados:</strong> ${emociones.map(escapeHtml).join(", ")}</p>` : ""}
    ${reflexion ? `<div class="quote">"${escapeHtml(reflexion)}"</div>` : ""}
    <p style="margin-top:14px;color:var(--muted)">Siguiente paso: convierte este diagnóstico en una meta concreta en el <a href="#" data-nav="plan">Paso 2</a>.</p>`;
  r.classList.add("show");
}

export function initDiagnostico() {
  $$("#chipsEmociones .chip").forEach((chip) =>
    chip.addEventListener("click", () => chip.classList.toggle("on"))
  );

  byId("btnDiagnosticar").addEventListener("click", () => {
    const pct = calcularSalud();
    const perfil = PERFILES.find((p) => pct >= p.min);
    const emociones = $$("#chipsEmociones .chip.on").map((c) => c.textContent);
    const reflexion = valueOf("txtReflexion");

    render({ pct, perfil, emociones, reflexion });
    save("diagnostico", { pct, perfil: perfil.nombre, emociones, reflexion, fecha: new Date().toISOString() });
    toast("Diagnóstico guardado");
  });
}

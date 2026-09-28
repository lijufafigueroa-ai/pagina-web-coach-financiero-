import { byId, numberOf } from "../utils/dom.js";
import { formatMoney } from "../utils/format.js";

/** Interés compuesto mensual con aportes al inicio de cada mes. */
export function simularAhorro(mensual, meses, interesAnual) {
  const tasa = interesAnual / 100 / 12;
  let total = 0;
  for (let i = 0; i < meses; i++) total = (total + mensual) * (1 + tasa);
  const aportado = mensual * meses;
  return { total, aportado, intereses: total - aportado };
}

export function initSimulador() {
  byId("btnSimular").addEventListener("click", () => {
    const meses = numberOf("sMeses") || 1;
    const { total, aportado, intereses } = simularAhorro(numberOf("sMensual"), meses, numberOf("sInteres"));
    const r = byId("resultadoSim");
    r.innerHTML = `
      <p class="sub" style="margin-bottom:4px">En ${meses} meses tendrás:</p>
      <div class="big-num">${formatMoney(total)}</div>
      <p style="margin-top:8px;font-size:.9rem;color:var(--muted)">Aportaste ${formatMoney(aportado)} · Intereses ganados: <strong style="color:var(--gold)">${formatMoney(intereses)}</strong></p>`;
    r.classList.add("show");
  });
}

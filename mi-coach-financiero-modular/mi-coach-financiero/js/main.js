/**
 * Mi Coach Financiero Virtual — punto de entrada.
 * Cada módulo se encarga de una sola sección de la app.
 */
import { initNavigation } from "./modules/navigation.js";
import { initDiagnostico } from "./modules/diagnostico.js";
import { initMetas } from "./modules/metas.js";
import { initSimulador } from "./modules/simulador.js";
import { initBitacora } from "./modules/bitacora.js";
import { initRecordatorios } from "./modules/recordatorios.js";

initNavigation();
initDiagnostico();
initMetas();
initSimulador();
initBitacora();
initRecordatorios();

/**
 * Atajos para trabajar con el DOM.
 */
export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
export const byId = (id) => document.getElementById(id);

/** Lee el valor de un campo por id (texto recortado). */
export const valueOf = (id) => byId(id).value.trim();

/** Lee el valor numérico de un campo por id. */
export const numberOf = (id) => Number(byId(id).value) || 0;

/** Limpia una lista de campos. */
export const clearFields = (...ids) => ids.forEach((id) => (byId(id).value = ""));

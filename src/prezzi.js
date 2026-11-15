// Calcoli sui prezzi di un carrello: il codice che la CI deve proteggere.

/**
 * Somma le righe di un carrello e applica l'IVA.
 * @param {{ prezzo: number, quantita: number }[]} righe
 * @param {number} aliquotaIva percentuale, per esempio 22
 * @returns {number} totale arrotondato al centesimo
 */
function totale(righe, aliquotaIva) {
  if (!Array.isArray(righe)) {
    throw new TypeError("righe deve essere un array");
  }
  if (typeof aliquotaIva !== "number" || aliquotaIva < 0) {
    throw new RangeError("aliquotaIva deve essere un numero maggiore o uguale a zero");
  }
  const imponibile = righe.reduce((somma, riga) => somma + riga.prezzo * riga.quantita, 0);
  return Math.round(imponibile * (1 + aliquotaIva / 100) * 100) / 100;
}

module.exports = { totale };

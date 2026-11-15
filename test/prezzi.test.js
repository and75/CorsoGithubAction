const test = require("node:test");
const assert = require("node:assert/strict");
const { totale } = require("../src/prezzi");

test("somma le righe e applica l'IVA", () => {
  const righe = [
    { prezzo: 10, quantita: 2 },
    { prezzo: 5.5, quantita: 1 },
  ];
  assert.equal(totale(righe, 22), 31.11);
});

test("un carrello vuoto vale zero", () => {
  assert.equal(totale([], 22), 0);
});

test("rifiuta un'aliquota negativa", () => {
  assert.throws(() => totale([], -1), RangeError);
});

test("rifiuta righe che non sono un array", () => {
  assert.throws(() => totale("niente", 22), TypeError);
});

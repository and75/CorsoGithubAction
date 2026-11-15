# Soluzione del capstone

## Il workflow

`pr-gate.yml` va copiato in `.github/workflows/pr-gate.yml`.

Sulla pull request compaiono due controlli, uno per sistema operativo: `check (ubuntu-latest)` e `check (windows-latest)`. Sono questi i nomi da richiedere nella regola su `main`.

## Che cosa succede

- Su Ubuntu il controllo passa.
- Su Windows fallisce con questo messaggio:

```
Path mismatch: 'data\reports\summary.txt' is not 'data/reports/summary.txt'
```

Il percorso atteso è scritto a mano con la barra `/`. `path.join` usa invece il separatore del sistema operativo, che su Windows è `\`.

## Il fix di una riga

In `capstone/check.js` sostituisci

```js
const REPORT = "data/reports/summary.txt";
```

con

```js
const REPORT = path.join("data", "reports", "summary.txt");
```

Dopo il fix entrambi i controlli sono verdi e il merge si sblocca.

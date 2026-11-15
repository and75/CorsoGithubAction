# Corso GitHub Actions · repository dei lab

Repository degli esercizi del corso GitHub Actions (MiDevo).

## Come si usa

1. Clicca **Use this template**, poi **Create a new repository**. Un repository per squadra, pubblico.
2. Apri `LAB-GUIDE.md` e segui i passi del lab indicato dal docente.
3. Lavora sempre su un branch e apri una pull request, anche per una modifica di una riga.

## Che cosa contiene

| Percorso                  | A che cosa serve                                           |
| ------------------------- | ---------------------------------------------------------- |
| `LAB-GUIDE.md`            | I passi di Lab 1, Lab 2 e capstone                         |
| `src/`, `test/`           | Il piccolo progetto Node che la CI deve proteggere (Lab 2) |
| `scripts/scan-secrets.js` | Lo scanner dei segreti usato dal job `scan` (Lab 2)        |
| `capstone/check.js`       | Il controllo del capstone, con un bug da scoprire          |
| `soluzioni/`              | I workflow finiti: da aprire solo dopo aver provato        |

## Provare in locale

Serve Node 22 o successivo.

```
npm ci
npm run format:check
npm run lint
npm test
npm run scan
node capstone/check.js
```

In questo repository non c'è nessun workflow attivo: la cartella `.github/workflows` la crei tu durante i lab.

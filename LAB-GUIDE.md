# Guida ai lab del corso GitHub Actions

Tre esercizi da svolgere in questo repository. Per ognuno trovi l'obiettivo, i passi, come capire che hai finito e dove sta la soluzione.

Regola valida per tutti: **ogni modifica passa da un branch e da una pull request**, anche se è di una riga.

Prima di aprire una soluzione, datevi dieci minuti di tentativi. Le soluzioni sono nella cartella `soluzioni/`: sono file di esempio e GitHub non li esegue, perché non stanno in `.github/workflows`.

---

## Lab 1 · I tuoi primi workflow (30 minuti)

**Obiettivo.** Eseguire il workflow ufficiale del quickstart, poi scrivere un workflow che avvii a mano.

**Fatto quando.** Entrambi i workflow hanno una run verde, e sai dire ad alta voce che cosa ha stampato ogni contesto, e perché.

### Passi

1. Crea un branch, per esempio `lab-1`.
2. Su quel branch crea il file `.github/workflows/github-actions-demo.yml` con il workflow del quickstart visto nelle slide. Fai il commit e apri una pull request verso `main`.
3. Apri la scheda **Actions**, apri la run e leggi il log di ogni singolo step. Per ogni riga con `${{ ... }}` chiediti: quale valore è stato stampato, e da dove viene?
4. Sullo stesso branch crea `.github/workflows/01-hello.yml` con il trigger `workflow_dispatch` e due input: `name` (testo) e `shout` (booleano). Il workflow deve stampare un saluto con il nome, in maiuscolo se `shout` è attivo.
5. Fai il merge della pull request. Il pulsante **Run workflow** compare solo quando il file è sul branch di default.
6. Scheda **Actions**, workflow **01 Hello**, **Run workflow**: scrivi un nome, spunta `shout`, avvia e leggi l'output.
7. In `github-actions-demo.yml` sostituisci il riferimento a `actions/checkout` con lo SHA completo del commit, lasciando la versione in un commento. Riesegui e conferma che funziona ancora.

### Suggerimenti

- Gli input si leggono con `${{ inputs.name }}` e `${{ inputs.shout }}`.
- Passa gli input allo script con `env:` e leggili come variabili della shell (`$NAME`), invece di incollarli nel comando.
- Lo SHA di una versione si trova nella pagina delle release dell'action, oppure con `git ls-remote --tags https://github.com/actions/checkout.git`.

### Soluzione

`soluzioni/lab-1/github-actions-demo.yml` e `soluzioni/lab-1/01-hello.yml`.

---

## Lab 2 · Controlli su ogni pull request (45 minuti)

**Obiettivo.** Nessuno può fare il merge di codice formattato male, rotto o con un segreto scritto dentro.

**Fatto quando.** Una pull request non si può unire finché entrambi i job non sono verdi, e hai visto che ti ferma.

### Il progetto

Un piccolo progetto Node, con questi comandi:

| Comando                | Che cosa controlla                            |
| ---------------------- | --------------------------------------------- |
| `npm run format:check` | La formattazione, con Prettier                |
| `npm run lint`         | Gli errori comuni, con ESLint                 |
| `npm test`             | I test in `test/`, con il test runner di Node |
| `npm run scan`         | I segreti scritti nel codice di `src/`        |

### Passi

1. Crea un branch, per esempio `lab-2`.
2. Crea `.github/workflows/node-ci.yml`, che parte sulle pull request verso `main` e ha due job:
   - `check`: scarica il codice, installa Node 24, esegue `npm ci`, poi formattazione, lint e test;
   - `scan`: scarica il codice, installa Node 24, esegue `npm run scan`.
3. Apri una pull request e guarda i due job girare fianco a fianco.
4. Rompi apposta la formattazione di `src/prezzi.js` (per esempio togli l'indentazione di una riga). Fai il commit, leggi il fallimento nel log, poi correggilo con `npm run format`.
5. Apri `src/config.js` e leggi le due righe `// scan:skip`. Il vostro responsabile della sicurezza accetterebbe quei motivi? Provate a togliere un motivo e guardate che cosa succede al job `scan`.
6. Proteggi `main`: **Settings**, **Rules**, **Rulesets**, **New branch ruleset**. Stato **Active**, destinazione il branch di default, **Require a pull request before merging** e **Require status checks to pass** con i controlli `check` e `scan`.
7. Torna alla pull request e fai il merge solo quando è tutto verde.

### Suggerimenti

- Due job senza `needs` partono in parallelo.
- Metti `timeout-minutes` su ogni job.
- In cima al file, `permissions: contents: read` basta per entrambi i job.
- I revisori obbligatori e alcune regole dipendono dal piano GitHub: su un piano gratuito usate un repository pubblico.

### Soluzione

`soluzioni/lab-2/node-ci.yml`.

---

## Capstone · Il gate che l'avrebbe fermato (30 minuti)

**Lo scenario.** Venerdì scorso qualcuno ha fatto il merge di una modifica che funzionava sul suo laptop e sul server di build, e lunedì era rotta per metà del team. Nessuno se n'è accorto, perché i controlli giravano in un posto solo. `capstone/check.js` è già nel repository, bug compreso. Costruisci il gate, lascia che trovi il bug, poi correggilo.

### In tre tempi

1. **Disegnalo (7 minuti).** Prima di aprire un editor: che cosa lo avvia, che cosa gira più di una volta, che cosa ferma davvero il merge.
2. **Costruiscilo (18 minuti).** Un solo file, `.github/workflows/pr-gate.yml`.
3. **Dimostralo (5 minuti).** Apri una pull request: un sistema operativo diventa verde, l'altro rosso. Fai lo screenshot del pulsante di merge che non puoi premere.

### I cinque requisiti

1. Gira su una pull request verso `main`, e si può avviare anche a mano.
2. Esegue `node capstone/check.js` sia su Ubuntu sia su Windows, con una matrix.
3. La matrix non si ferma al primo fallimento: vuoi entrambe le risposte.
4. Ogni `uses:` è fissato a uno SHA di commit completo, con la versione in un commento.
5. Una regola su `main` fa sì che una run rossa blocchi il merge.

**Fatto quando** qualcuno di un'altra squadra apre la tua pull request e sa dire che cosa si è rotto, e su quale sistema operativo, senza aprire un solo log.

### Poi correggi il bug

Il messaggio di errore dice quali due percorsi non coincidono. Il fix è di una riga in `capstone/check.js`: costruisci il percorso atteso nello stesso modo in cui lo costruisce il codice.

### Soluzione

`soluzioni/capstone/pr-gate.yml`. Il fix di `check.js` è descritto in fondo a `soluzioni/capstone/README.md`.

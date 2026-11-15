// Scanner minimale: cerca in src/ valori che sembrano segreti scritti nel codice.
// Una riga preceduta da un commento "// scan:skip <motivo>" viene ignorata, ma elencata con il suo motivo.
// Un "scan:skip" senza motivo è un errore.
const fs = require("node:fs");
const path = require("node:path");

const CARTELLA = path.join(__dirname, "..", "src");
const REGOLE = [
  { nome: "password nel codice", re: /pass(word)?\w*\s*[:=]\s*["'][^"']+["']/i },
  { nome: "chiave API nel codice", re: /api[_-]?key\w*\s*[:=]\s*["'][^"']+["']/i },
  { nome: "token nel codice", re: /(token|secret)\w*\s*[:=]\s*["'][^"']+["']/i },
  { nome: "chiave privata", re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
];

function elencaFile(cartella) {
  return fs.readdirSync(cartella, { withFileTypes: true }).flatMap((voce) => {
    const percorso = path.join(cartella, voce.name);
    return voce.isDirectory() ? elencaFile(percorso) : [percorso];
  });
}

let problemi = 0;
const saltate = [];

for (const file of elencaFile(CARTELLA)) {
  const righe = fs.readFileSync(file, "utf8").split(/\r?\n/);
  const nomeFile = path.relative(path.join(__dirname, ".."), file).split(path.sep).join("/");
  righe.forEach((riga, indice) => {
    const regola = REGOLE.find((r) => r.re.test(riga));
    if (!regola) return;
    const precedente = indice > 0 ? righe[indice - 1] : "";
    const skip = precedente.match(/\/\/\s*scan:skip(.*)$/);
    if (skip) {
      const motivo = skip[1].trim();
      if (motivo === "") {
        console.error(`ERRORE ${nomeFile}:${indice + 1} scan:skip senza motivo`);
        problemi += 1;
      } else {
        saltate.push(`${nomeFile}:${indice + 1} (${regola.nome}) motivo: ${motivo}`);
      }
      return;
    }
    console.error(`ERRORE ${nomeFile}:${indice + 1} ${regola.nome}`);
    problemi += 1;
  });
}

for (const voce of saltate) {
  console.log(`SALTATA ${voce}`);
}
if (problemi > 0) {
  console.error(`Scansione fallita: ${problemi} problema/i.`);
  process.exit(1);
}
console.log(
  `Scansione superata: nessun segreto non giustificato (${saltate.length} righe saltate).`,
);

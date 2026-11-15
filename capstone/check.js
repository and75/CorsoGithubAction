// capstone/check.js — versione Node del controllo del capstone (con il bug)
const path = require("node:path");

const REPORT = path.join("data", "reports", "summary.txt");
const actual = path.join("data", "reports", "summary.txt");

if (actual !== REPORT) {
  console.error(`Path mismatch: '${actual}' is not '${REPORT}'`);
  process.exit(1);
}
console.log("OK: " + actual);

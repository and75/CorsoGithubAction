// Configurazione dell'applicazione di esempio.
// Le righe con "scan:skip" dicono allo scanner di ignorare la riga seguente, e perché.

const config = {
  apiUrl: "https://api.example.com",
  // scan:skip chiave pubblica di esempio presa dalla documentazione, non dà accesso a niente
  demoApiKey: "pk_test_1234567890",
  // scan:skip lo sistemiamo dopo
  adminPassword: "changeme",
};

module.exports = { config };

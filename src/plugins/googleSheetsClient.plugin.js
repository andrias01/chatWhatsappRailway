const { google } = require("googleapis");

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

// 🔥 Importante: arreglar saltos de línea del private_key
credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const googleSheetsClient = google.sheets({
  version: "v4",
  auth,
});

module.exports = { googleSheetsClient };
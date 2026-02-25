const { google } = require("googleapis");
const path = require("path");

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "..", "..", process.env.GOOGLE_KEY_JSON_PATH),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const googleSheetsClient = google.sheets({
  version: "v4",
  auth,
});

module.exports = { googleSheetsClient };
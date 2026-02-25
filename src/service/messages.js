const googleSheets = require("../plugins/googleSheets.plugin");

let mensajes = {};       // memoria global
let contextoGlobal = ""; // 👈 AGREGAR ESTA VARIABLE

async function testGoogleSheets() {
    const spreadsheetId = process.env.SPREAD_SHEET_ID;

    try {
        const resultRead = await googleSheets.read(
            spreadsheetId,
            "mensajes!A1:B100"
        );

        const resultReadContexto = await googleSheets.read(
            spreadsheetId,
            "contexto!A1"
        );

        contextoGlobal = resultReadContexto[0][0]; // 👈 GUARDARLO GLOBAL

        const rows = resultRead;

        mensajes = {};

        rows.forEach(row => {
            const key = row[0];
            const value = row[1];

            if (key && value) {
                mensajes[key.trim()] = value.replace(/\\n/g, "\n");
            }
        });
        // console.log("CONTEXTO:", contextoGlobal); // 👈 USAR EL GLOBAL

        // console.log("OBJETO MENSAJES:", mensajes);

        // WRITE // try { // const resultWrite = await googleSheets.write( // spreadsheetId, // "Hoja 1!B1", // [ // ["Email"], // ["1@localhost"], // ["2@localhost"] // ], // "RAW" // ); // console.log("WRITE:", resultWrite.data); // } catch (error) { // console.error("Error escribiendo:", error); // }

    } catch (err) {
        console.error("Error leyendo:", err);
    }
}

const getMensaje = (key) => {
    return mensajes[key];
};

const getContexto = () => {
    return contextoGlobal; // 👈 DEVOLVER EL GLOBAL
}

module.exports = {
    testGoogleSheets,
    getMensaje,
    getContexto
};
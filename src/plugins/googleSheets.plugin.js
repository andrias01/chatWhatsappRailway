const { googleSheetsClient } = require("./googleSheetsClient.plugin");

const googleSheets = {
    /**
     * Get cell values
     */
    read: async (spreadsheetId, range) => {
        try {
            const result = await googleSheetsClient.spreadsheets.values.get({
                spreadsheetId,
                range,
            });

            return result.data.values ? result.data.values : [];
        } catch (err) {
            throw err;
        }
    },

    /**
     * Write data to cells
     */
    write: async (spreadsheetId, range, values, valueInputOption) => {
        const resource = { values };

        try {
            const result = await googleSheetsClient.spreadsheets.values.update({
                spreadsheetId,
                range,
                valueInputOption,
                resource,
            });

            return result;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = googleSheets;
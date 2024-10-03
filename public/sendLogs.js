const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, 'logs.json');

// Function to write data to the logs.json file
async function sendEventToServer(data) {
    try {
        let logs = [];

        // Check if the file exists
        if (fs.existsSync(logPath)) {
            const fileData = fs.readFileSync(logPath, 'utf-8');

            // If the file contains data, try parsing it
            if (fileData.trim()) {
                try {
                    logs = JSON.parse(fileData);
                } catch (parseErr) {
                    console.error("Error parsing JSON data:", parseErr);
                    logs = [];  // If parsing fails, reset logs to an empty array
                }
            }
        }

        // Add the new event data to the logs array
        logs.push(data);
        

        // Write the updated logs back to the file
        fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
        console.log("File written successfully");
    } catch (err) {
        console.error("Error handling file:", err);
    }
}

module.exports = { sendEventToServer };

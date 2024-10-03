const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, 'logs.json');

// Function to count and send logs, and then delete them
async function processLogs() {
    try {
        let logs = [];

        // Check if logs.json file exists
        if (fs.existsSync(logPath)) {
            const fileData = fs.readFileSync(logPath, 'utf-8');

            // Parse the logs if the file is not empty
            if (fileData.trim()) {
                try {
                    logs = JSON.parse(fileData);
                } catch (parseErr) {
                    console.error("Error parsing JSON data:", parseErr);
                    return;
                }
            }
        }

        // If no logs are present, return early
        if (logs.length === 0) {
            console.log("No logs to process.");
            return;
        }

        // Count the number of events
        const eventsCount = logs.length;
        const eventsLogged = logs.map(log => log.event);

        // Prepare the data to be sent or logged
        const logsSummary = {
            count: eventsCount,
            events: eventsLogged
        };

        // Log the count and event names
        console.log("Logs summary:", logsSummary);

        fs.writeFileSync(logPath, JSON.stringify([], null, 2));
        console.log("Logs have been cleared.");
    } catch (err) {
        console.error("Error processing logs:", err);
    }
}



module.exports = { processLogs };
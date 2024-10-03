const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sendLogs = require("./public/sendLogs.js");
const logsCount = require("./public/logsCount.js");

const app = express();
const port = 3000;

// Serve the index.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

//parse JSON request bodies
app.use(bodyParser.json());

eventBatch = []

// batched event logging
app.post("/log-event-batch", (req, res) => {
    const events = req.body; 
    eventBatch = eventBatch.concat(events);
    res.json({ success: true, message: "Batch logged successfully" });
});


// Log each event in the batch every 2 minutes
setInterval(() => {
    if(!eventBatch){
        return;
    }else{
        eventBatch.forEach(eventData => {
            sendLogs.sendEventToServer(eventData);
        });
        eventBatch = [];
    }
}, 2 * 60 * 1000);


// print logs for user every 2 minutes
setInterval(() => {
    logsCount.processLogs(); 
}, 2 * 60 * 1000);


// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Start the server
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

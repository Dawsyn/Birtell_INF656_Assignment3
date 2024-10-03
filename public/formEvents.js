const textBox = document.getElementById('text');
const checkBox = document.getElementById('checkBox');
const submit = document.getElementById('submit');
const radioButton = document.getElementById('radio');

// Array to store events
let eventBatch = [];
let timeoutId = null;

// Function to send the batch of events to the server
function sendBatchToServer() {
    if (eventBatch.length === 0) return;  // If no events, exit

    console.log('Sending batch to server:', eventBatch);

    // Send the batch of events to the server
    fetch('/log-event-batch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventBatch),  // Send the batch of event data
    })
    .then(response => response.json())
    .then(result => console.log('Batch logged:', result))
    .catch(error => console.error('Error:', error));

    // Clear the event batch after sending
    eventBatch = [];
}

// Function to add events to the batch and start the timer
function logEvent(data) {
    eventBatch.push(data);
}

// Event listener for the radio button
radioButton.addEventListener('click', function() {
    const timeStamp = new Date().toISOString();
    const message = "Radio button clicked!";
    const data = {
        event: message,
        time: timeStamp
    };
    console.log(message);
    logEvent(data);  // Add to batch
});

// Event listener for the checkbox
checkBox.addEventListener('click', function() {
    const timeStamp = new Date().toISOString();
    const message = "Check box clicked!";
    const data = {
        event: message,
        time: timeStamp
    };
    console.log(message);
    logEvent(data);  // Add to batch
});

// Event listener for the submit button
submit.addEventListener('click', function(event) {
    event.preventDefault();
    let isPopulated = textBox.value.trim() !== "";  // Check if text box has data

    if (!isPopulated) {
        console.log('Text box is empty, event not logged.');
        return;
    }

    const timeStamp = new Date().toISOString();
    const message = "Submit button clicked with data!";
    const data = {
        event: message,
        time: timeStamp,
        textPopulated: isPopulated
    };

    logEvent(data);  // Add to batch
});

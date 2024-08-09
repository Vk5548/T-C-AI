

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed and running in the background: Bcakground.js");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action == "analyzeTerms") {
        fetch('http://127.0.0.1:8080/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ terms: message.terms })
        })
            .then(response => response.json())
            .then(data => {
                sendResponse({ result: data });
            })
            .catch(error => {
                console.error('Error:', error);
                sendResponse({ result: "Error in analysis" });
            });

        // Return true to indicate you wish to send a response asynchronously
        return true;
    }
});
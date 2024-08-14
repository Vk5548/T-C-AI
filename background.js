chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed and running in the background: Bcakground.js");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action == "analyzeTerms") {
        fetch('http://127.0.0.1:5001/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                terms: message.terms,
                prompt: "Analyze these data(terms and conditions) such that you generate a summary of good points and the skeptical points. Please summarize the following privacy policy document into a clear and concise format, divided into the following sections:" +

                    "User Rights: Summarize the rights users have regarding their data, including how they can access, modify, or delete their information." +
                    "How to Exercise Rights: Provide instructions on how users can exercise their rights, including contact information and any specific steps they need to take." +
                    "Legal Basis: Explain the legal basis for data processing, mentioning relevant regulations or laws (e.g., GDPR)." +
                    "Cookie Policy: Summarize the website's cookie policy, including how users can manage their cookie preferences." +
                    "Ensure that each section is clearly labeled and the content is presented in a user-friendly and easily understandable manner.."
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response from AI:', data); // checking what is the data being received
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
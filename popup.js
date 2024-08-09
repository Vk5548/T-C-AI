alert("popup.js is executing");

async function run() {
    console.log("popup.js is executing");

    await init(); // Initializing the webAssembly module

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "analyzeTerms" }, function (response) {
            if (response && response.result) {
                const analysis = response.result;
                console.log('Received analysis:', analysis);
                document.getElementById("output").textContent =
                    `Summary: ${analysis.summary}\n\nGood Points:\n${analysis.good}\n\nBad Points:\n${analysis.bad}\n\nSkeptical Points:\n${analysis.skeptical}`;
            } else {
                document.getElementById("output").textContent = "No analysis available.";
            }
        });
    });
}

run();

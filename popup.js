async function run() {
    console.log("popup.js is executing");

    document.getElementById('analyzeButton').addEventListener('click', () => {

        const outputDiv = document.getElementById("output");
        const loadingDiv = document.getElementById("loading");

        // Clear previous output and show the loading indicator
        outputDiv.textContent = "";
        loadingDiv.style.display = "block";

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "extractTerms" }, function (response) {
                if (response && response.terms) {
                    // Send the extracted terms to the background script for analysis
                    chrome.runtime.sendMessage(
                        {
                            action: "analyzeTerms",
                            terms: response.terms
                        },
                        (result) => {

                            // Hide the loading indicator
                            loadingDiv.style.display = "none";

                            if (result && result.result) {
                                displayResponse(result.result);
                            } else {
                                document.getElementById("output").textContent = "No analysis available.";
                            }
                        }
                    );
                } else {
                    document.getElementById("output").textContent = "No terms found.";
                }
            });
        });
    });
}

function displayResponse(result) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = ""; // Clear previous content

    // Process the response and structure it
    const sections = {
        "User Rights": result.user_rights,
        "How to Exercise These Rights": result.how_to_exercise_rights,
        "Cookies Policy": result.cookies_policy,
        "Legal Basis": result.legal_basis,
    };

    for (let [sectionTitle, sectionContent] of Object.entries(sections)) {
        const sectionHeader = document.createElement("h2");
        sectionHeader.textContent = sectionTitle;
        outputDiv.appendChild(sectionHeader);

        const sectionContentElement = document.createElement("p");
        sectionContentElement.textContent = sectionContent || "No information available.";
        outputDiv.appendChild(sectionContentElement);
    }
}


run();

console.log("Content Script running");

function extractTermsAndConditions() {
    //look for elemnets that may have terms and conditions
    const possibleKeywords = /terms|conditions|privacy|agreement|policy/i;
    let termsText = "";

    // Search for headings that may indicate the start of the terms section
    // Search for headings that may indicate the start of the terms section
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    headings.forEach(heading => {
        if (possibleKeywords.test(heading.textContent)) {
            // If a relevant heading is found, extract the content that follows
            let sibling = heading.nextElementSibling;
            while (sibling && !sibling.tagName.match(/^H[1-6]$/)) {
                termsText += sibling.textContent + "\n";
                sibling = sibling.nextElementSibling;
            }
        }
    });

    // If no relevant headings are found, extract text from paragraphs that might contain the keywords
    if (!termsText) {
        const paragraphs = Array.from(document.querySelectorAll('p'));
        paragraphs.forEach(paragraph => {
            if (possibleKeywords.test(paragraph.textContent)) {
                termsText += paragraph.textContent + "\n";
            }
        });
    }
    console.log("if i got somethibg: ", termsText);
    return termsText || "Terms and Conditions section not found.";
}
//send a message to the background script
chrome.runtime.sendMessage(
    {
        action: "analyzeTerms",
        terms: extractTermsAndConditions() // For now, it will give the content of the whole page,
    },
    (response) => {
        console.log("Analysis result:", response.result);
    }
);
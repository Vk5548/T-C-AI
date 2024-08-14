console.log("Content Script running");

//send a message to the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractTerms") {
        const termsText = extractTermsAndConditions();
        console.log("Extracted terms:", termsText);
        sendResponse({ terms: termsText });
    }
});


function extractTermsAndConditions() {
    //look for elemnets that may have terms and conditions
    const possibleKeywords = /terms|conditions|privacy|agreement|policy/i;
    let termsText = "";


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
    return termsText || "Terms and Conditions section not found.";
}

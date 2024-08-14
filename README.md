# Terms and Conditions Parser Chrome Extension

## Overview

This Chrome extension reads the terms and conditions of a webpage, summarizes them, and highlights key points using an AI model. The project is a work-in-progress, integrating a local LLaMA 3.1 model using Ollama and a Flask server to process the extracted text.

## Current Status

- **Model:** Using LLaMA 3.1 with Ollama.
- **Backend:** Flask server running on localhost.
- **Frontend:** Chrome extension interface with popup and content scripts.
- **Functionality:** Extracts terms and conditions from a webpage, sends the text to the Flask server for AI processing, and displays a summary and key points in the extension popup.

## Setup

### Prerequisites

1. **Python:** Ensure you have Python installed (preferably Python 3.7+).
2. **Ollama:** Download and install Ollama to run LLaMA models.
3. **Flask:** Install Flask using pip.
   ```bash
   pip install flask flask-cors requests
4. **Chrome Browser:** Install Chrome for testing the extension.

### Installation

1. **Clone the repository**
git clone [repository-url]
cd [repository-name]

2. **Ollama Setup:** Run the LLaMA 3.1 model using Ollama:
ollama run llama3.1

3. **Flask Server**
  Navigate to the server directory.
  Run the Flask server:

  python3 llama_server.py

The server should be running on http://127.0.0.1:5001.

4. **Load Chrome Extension:**
Go to chrome://extensions/ in your Chrome browser.
Enable Developer mode.
Click Load unpacked and select the extension's directory.

## How to Use
Navigate to any webpage with terms and conditions.
Click on the extension icon.
Click the "Analyze Terms" button.
Wait for the AI to process the text.
View the summarized results and key points in the popup.


## Known Issues & Improvements Needed

**Response Time:** The AI processing currently takes longer than expected. Consider optimizing the Flask server or exploring lighter models.
**UI/UX:** Improve the design and readability of the results in the popup.
**Error Handling:** Enhance error messages and handling for a better user experience.

## Future Enhancements

**Multiple Language Support:** Extend support to analyze terms in different languages.
**Improved Summarization:** Implement a more advanced summarization technique for better accuracy.
**Cloud Deployment:** Move the Flask server and AI model to the cloud for better accessibility and performance.



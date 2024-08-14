from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

OLLAMA_API_URL = "http://localhost:11434/api/generate"  # Update with your actual port

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    terms = data['terms']
    prompt = data.get('prompt', '')

    # Send the terms to the Ollama server for inference
    try:
        with requests.post(OLLAMA_API_URL, json={"prompt": prompt + "\n" + terms, "model": "llama3.1"}, stream=True) as response:
            response.raise_for_status()

            full_response = ""
            for chunk in response.iter_lines():
                if chunk:
                    chunk_data = chunk.decode('utf-8')
                    
                    chunk_json = json.loads(chunk_data)
                    full_response += chunk_json.get('response', '')

                    if chunk_json.get('done', False):
                        break

            flags = ["Example Flag 1", "Example Flag 2"]  # Placeholder for additional processing
            print("Full AI response:", full_response)
            return jsonify({"summary": full_response, "flags": flags})

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Failed to connect to AI service", "details": str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)

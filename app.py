from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from google import genai

# Load environment variables
load_dotenv()

# Flask app
app = Flask(__name__)
CORS(app)

# Initialize Gemini client (NEW SDK)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Simulated bus data (context for AI)
BUS_DATA = """
Bus 21 – RS Puram: On Time, ETA 6 mins
Bus 32 – Ukkadam: Slight Delay, ETA 10 mins
Bus 55 – Mettupalayam: On Time, ETA 8 mins
Bus 73 – KGiSL: Slow due to traffic, ETA 14 mins
Bus 88 – Singanallur: On Time, ETA 7 mins
"""

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_msg = data.get("message", "")

        if not user_msg:
            return jsonify({"reply": "Please ask a question about buses."})

        prompt = f"""
You are an AI public transport assistant.

Use ONLY the following bus data to answer:
{BUS_DATA}

User question:
{user_msg}
"""

        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt
        )

        return jsonify({"reply": response.text})

    except Exception as e:
        print("🔥 GEMINI ERROR:", e)
        return jsonify({"reply": "AI service unavailable"}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)

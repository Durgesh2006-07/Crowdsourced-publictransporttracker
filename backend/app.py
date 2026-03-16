from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# DATABASE CONNECTION
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Kgkite@123",
    database="transport_tracker"
)

cursor = db.cursor()

# LOGIN API
@app.route('/login', methods=['POST'])
def login():

    data = request.json
    email = data['email']
    password = data['password']

    query = "SELECT role FROM users WHERE email=%s AND password=%s"
    cursor.execute(query,(email,password))

    result = cursor.fetchone()

    if result:
        return jsonify({"success":True,"role":result[0]})
    else:
        return jsonify({"success":False})


# GENAI CHAT (Simple Demo)
@app.route('/chat', methods=['POST'])
def chat():

    msg = request.json['message']

    if "delay" in msg.lower():
        reply = "Bus 21 is slightly delayed due to traffic."
    elif "eta" in msg.lower():
        reply = "Bus 32 ETA is around 5 minutes."
    else:
        reply = "Please ask about bus status or ETA."

    return jsonify({"reply":reply})


# START SERVER
if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, render_template, request, jsonify, redirect
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# ---------------- DATABASE CONNECTION ---------------- #

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Kgkite@123",
    database="transport_tracker"
)

cursor = db.cursor(dictionary=True)

# ---------------- PAGE ROUTES ---------------- #

@app.route("/")
def login_page():
    return render_template("login.html")

@app.route("/index")
def index_page():
    return render_template("index.html")

@app.route("/signup-page")
def signup_page():
    return render_template("signup.html")

@app.route("/admin")
def admin_page():
    return render_template("admin.html")

@app.route("/admin-reports")
def admin_reports():
    return render_template("admin-reports.html")

# ⭐ ADMIN ROUTES PAGE — FETCH DATA FROM DB
@app.route("/admin-routes")
def admin_routes():

    query = "SELECT * FROM routes"
    cursor.execute(query)

    routes = cursor.fetchall()

    return render_template("admin-routes.html", routes=routes)


# ---------------- ADMIN ADD ROUTE ---------------- #

@app.route("/admin/add-route", methods=["POST"])
def add_route():

    source = request.form["source"]
    destination = request.form["destination"]
    timing = request.form["timing"]
    status = request.form["status"]

    query = """
    INSERT INTO routes (source, destination, timing, status)
    VALUES (%s,%s,%s,%s)
    """

    cursor.execute(query, (source, destination, timing, status))
    db.commit()

    return redirect("/admin-routes")


# ---------------- USER SIGNUP ---------------- #

@app.route("/signup", methods=["POST"])
def signup():

    data = request.json

    email = data["email"]
    password = data["password"]

    query = """
    INSERT INTO users (email, password, role)
    VALUES (%s, %s, 'consumer')
    """

    cursor.execute(query, (email, password))
    db.commit()

    return jsonify({
        "success": True,
        "message": "User created successfully"
    })


# ---------------- USER LOGIN ---------------- #

@app.route("/login", methods=["POST"])
def login():

    data = request.json
    email = data["email"]
    password = data["password"]

    query = "SELECT role FROM users WHERE email=%s AND password=%s"
    cursor.execute(query, (email, password))

    user = cursor.fetchone()

    if user:
        return jsonify({
            "success": True,
            "role": user["role"]
        })
    else:
        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        })


# ---------------- AI BUS CHAT ---------------- #

@app.route("/chat", methods=["POST"])
def chat():

    msg = request.json["message"].lower()

    if "delay" in msg:
        reply = "Bus 21 is slightly delayed due to traffic."

    elif "eta" in msg:
        reply = "Bus 32 will arrive in 5 minutes."

    elif "route" in msg:
        reply = "Bus 55 goes from Gandhipuram to Mettupalayam."

    else:
        reply = "Ask about bus delay, ETA or routes."

    return jsonify({"reply": reply})


# ---------------- START SERVER ---------------- #

if __name__ == "__main__":
    app.run(debug=True)
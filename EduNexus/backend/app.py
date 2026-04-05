from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        password TEXT,
        role TEXT
    )""")
    conn.commit()
    conn.close()

init_db()

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute("INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
              (data["email"], data["password"], data["role"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "User registered"})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE email=? AND password=?",
              (data["email"], data["password"]))
    user = c.fetchone()
    conn.close()

    if user:
        return jsonify({"message": "Login success", "role": user[3]})
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/")
def home():
    return "EduNexus Backend Running"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

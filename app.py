from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# in-memory storage (simple list)
events = []

# GET all events
@app.route("/events", methods=["GET"])
def get_events():
    return jsonify(events)

# POST add event
@app.route("/events", methods=["POST"])
def add_event():
    data = request.get_json()

    if not data or "event" not in data:
        return jsonify({"error": "Event is required"}), 400

    events.append(data["event"])
    return jsonify({"message": "Event added successfully", "events": events})

# DELETE event by index
@app.route("/events/<int:index>", methods=["DELETE"])
def delete_event(index):
    if index < 0 or index >= len(events):
        return jsonify({"error": "Invalid index"}), 400

    removed = events.pop(index)
    return jsonify({"message": "Deleted", "removed": removed})

if __name__ == "__main__":
    app.run(debug=True)
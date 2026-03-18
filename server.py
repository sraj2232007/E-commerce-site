try:
       Flaskfrom flask import Flask, jsonify, request, send_from_directory  # type: ignore
except ImportError:
    import sys
    print("Flask is not installed. Install with: python -m pip install -r requirements.txt")
    sys.exit(1)

import os

app = Flask(__name__, static_folder='.', static_url_path='')

SAMPLE_PRODUCTS = [
    {"id": 1, "name": "Product A", "price": 9.99, "description": "Sample product A"},
    {"id": 2, "name": "Product B", "price": 19.99, "description": "Sample product B"}
]

_user_carts = {}


@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(SAMPLE_PRODUCTS)


@app.route('/api/cart', methods=['GET'])
def get_cart():
    user = request.args.get('user', 'guest')
    return jsonify({"items": _user_carts.get(user, [])})


@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json() or {}
    user = data.get('user', 'guest')
    item = data.get('item')
    if not item:
        return jsonify({"error": "missing item"}), 400
    _user_carts.setdefault(user, []).append(item)
    return jsonify({"success": True, "items": _user_carts[user]})


@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')
    if username and password:
        return jsonify({"token": f"mock-token-for-{username}", "username": username})
    return jsonify({"error": "invalid credentials"}), 401


@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json() or {}
    # This is a mock signup endpoint — extend with real persistence as needed.
    return jsonify({"success": True, "message": "user created (mock)"})


@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def serve(path):
    # Serve files from the project root so existing HTML/CSS/JS continue to work.
    if os.path.isfile(path):
        return send_from_directory('.', path)
    return send_from_directory('.', 'index.html')


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)

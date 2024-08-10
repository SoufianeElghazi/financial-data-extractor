from flask import Flask, request, jsonify ,send_from_directory
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import psycopg2
import os
from apscheduler.schedulers.background import BackgroundScheduler
import time
import jwt
import datetime
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import nest_asyncio
from extract import pdf_to_image, find_table_in_image_and_create_image,find_table_in_image, crop_to_table, extract_text_from_image, extract_financials, patterns


def cleanup_old_files():
    now = time.time()
    folder = 'uploads'
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        if os.stat(file_path).st_mtime < now - 3600:  # 1 hour old files
            os.remove(file_path)
            print(f"Deleted {file_path}")

load_dotenv()
secret_key = os.getenv('SECRET_KEY')
app = Flask(__name__)
scheduler = BackgroundScheduler()
scheduler.add_job(func=cleanup_old_files, trigger="interval", seconds=3600)  # Run every hour
scheduler.start()
CORS(app)
bcrypt = Bcrypt(app)
app.config['UPLOAD_FOLDER'] = 'uploads'
nest_asyncio.apply()

conn = psycopg2.connect(
    dbname=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASS'),
    host=os.getenv('DB_HOST'),
    port=os.getenv('DB_PORT')
)
cursor = conn.cursor()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data['email']
    password = data['password']
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    cursor.execute('INSERT INTO users (email, password) VALUES (%s, %s) RETURNING *', (email, hashed_password))
    user = cursor.fetchone()
    conn.commit()
    return jsonify(user)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']
    cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
    user = cursor.fetchone()
    if user and bcrypt.check_password_hash(user[2], password):
        token = jwt.encode({
            'user_id': user[0],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, secret_key, algorithm='HS256')
        return jsonify({'token': token})
    else:
        return 'Invalid Credentials', 401

@app.route('/extract', methods=['POST'])
def extract():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    file.save(file_path)
    try:
        image = pdf_to_image(file_path)
        output_image_path  = find_table_in_image_and_create_image(image, file_path)    
        image_url = '/uploads/' + os.path.basename(output_image_path)
        table_bounds = find_table_in_image(image)
        cropped_image = crop_to_table(image, table_bounds)
        extracted_text = extract_text_from_image(cropped_image)
        extracted_data = extract_financials(extracted_text, patterns)
        data = {
            'data': extracted_data,
            'marked_image_path': request.url_root.rstrip('/') + image_url
        }
        print(data)
    except Exception as e:
        app.logger.error(f'Error processing file: {e}')
        return jsonify({'error': 'Failed to process file'}), 500
    finally:
        os.remove(file_path)
    return  jsonify(data)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/search', methods=['POST'])
def search():
    company = request.json['company']
    year = request.json['year']
    cursor.execute(f'''
        SELECT year, bilan_actif, bilan_passif, cpc
        FROM {company}
        WHERE year = %s
    ''', (year,))
    report = cursor.fetchone()
    if report:
        return jsonify({
            "year": report[0],
            "bilan_actif": report[1] ,
            "bilan_passif": report[2] ,
            "cpc": report[3] 
        })
    else:
        return 'Report not found', 404


@app.route('/api/companies', methods=['GET'])
def get_companies():
    try:
        conn.rollback()
        cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' and table_name ilike 'afriquia_gaz';")
        tables = cursor.fetchall()
        company_names = [table[0] for table in tables]
        return jsonify(company_names)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(port=5000, debug=True, use_reloader=False)

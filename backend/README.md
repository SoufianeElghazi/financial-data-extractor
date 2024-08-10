```bash
conda create -n financial-extractor-env python=3.12.2
conda activate financial-extractor-env
pip install flask flask-cors flask-bcrypt psycopg2-binary
pip install python-dotenv

flask run
```
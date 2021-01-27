## Usage

Create a project directory and install a python virtual environment inside it

```bash
mkdir project && cd project
python3 -m venv venv
source venv/bin/activate
```

Create a source dir and clone the repository

```bash
mkdir src && cd src
git clone https://github.com/gabrielacham/proyecto2-python.git .
```

Install the dependencies

```bash
pip install -r requirements/local.txt
```

Run the migrations and start the server!

```bash
python manage.py migrate
python manage.py runserver
```

Yay! App running in `http://127.0.0.1:8000` :)

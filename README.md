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
To start backend
Go to backend folder, run the migrations and start the server!

```bash
cd backend
python manage.py migrate
python manage.py runserver
```

Yay! App running in `http://127.0.0.1:8000` :)

To start frontend
Go to frontend folder, install dependencies and run project! (yarn installed)

```bash
cd frontend
npm install
yarn start
```

Yay! App running in `http://localhost:3000` :)

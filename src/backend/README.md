# Pour installer le backend (première fois)
Commandes faites à partir d'une fresh install Ubuntu 18.04.1

#### Mettre à jour le système
    sudo apt update
    sudo apt upgrade
    
#### Cloner le projet
    sudo apt install git
    git clone https://github.com/boisvertdany/log515.git
    cd log515/
    git checkout backend
    
#### Setup de l'environnement
    cd src/backend/
    sudo apt install virtualenv
    virtualenv -p python3 .
    source bin/activate
    
#### Démarrer Django
    python manage.py runserver

# Pour run le backend (après installation)
    cd src/backend/
    source bin/activate
    python manage.py runserver

# Compte superuser
Username : admin

Password : Password321

# URLs
Dashboard : http://127.0.0.1:8000/admin/

Login : http://127.0.0.1:8000/api/v1/auth/login/

Logout : http://127.0.0.1:8000/api/v1/auth/logout/

Register : http://127.0.0.1:8000/api/v1/auth/register/

User : http://127.0.0.1:8000/api/v1/user/

Album : http://127.0.0.1:8000/api/v1/album/

Photo : http://127.0.0.1:8000/api/v1/photo/

# Exemple avec cURL
$ curl -X POST http://localhost:8000/api/v1/auth/login/ -d "username=user1&password=Password321"

{"key":"9418e432dc345f85fcb8d9b186becb88ef744ff0"}

$ curl -H "Authorization: Token 9418e432dc345f85fcb8d9b186becb88ef744ff0" http://localhost:8000/api/v1/auth/user/

{"pk":2,"username":"user1","email":"","first_name":"","last_name":""}


## Pour run le backend
1. $ cd src/backend/
2. $ source bin/activate
3. $ python manage.py runserver

## Compte superuser
Username : admin

Password : Password321

## URLs
Dashboard : http://127.0.0.1:8000/admin/

Login : http://127.0.0.1:8000/api/v1/rest-auth/login/

Logout : http://127.0.0.1:8000/api/v1/rest-auth/logout/

Registration : http://127.0.0.1:8000/api/v1/rest-auth/registration/

## Exemple avec cURL
$ curl -X POST http://localhost:8000/api/v1/rest-auth/login/ -d "username=user1&password=Password321"

{"key":"9418e432dc345f85fcb8d9b186becb88ef744ff0"}

$ curl -H "Authorization: Token 9418e432dc345f85fcb8d9b186becb88ef744ff0" http://localhost:8000/api/v1/rest-auth/user/

{"pk":2,"username":"user1","email":"","first_name":"","last_name":""}

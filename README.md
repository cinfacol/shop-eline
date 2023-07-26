# shop-eline
Adaptacion de la tienda online para docker
del video "Django, React, Redux, Docker, Celery, Redis, and NGINX - simple Real Estate app"

## Aplicación Inmobiliaria

1. Django Rest Framework
  * Custom User Model
  * Token Based Authentication
  * UUID's
  * Pytest - Factories and Fixtures
  * Python Discovery
  * Django Filtering
  * Django Signals
  * Django Admin Customization
  * Django Security
  * Loggin in Django
2. React Redux and Hooks
3. Docker
  * Docker and Contanezation
  * Scripts in Docker
  * Working in Postgres with Docker Container
  * Virtualizing files with Docker
4. Celery and Redis
  * Asyncronus Task with Celery and Redis
  * Asyncronus Task with Flower
5. Nginx
  * Setting up Nginx as web server and proxy
  * Saving Static and Media files with Nginx

# Project Setup

En la carpeta de trabajo creamos un directorio con el nombre del proyecto y dentro creamos otra carpeta

```bash
$ mkdir django-real-estate && cd django-real-estate
$ mkdir estate-src && cd estate-src
```

Creamos el entorno virtual
```bash
django-real-estate/state-src $ pipenv shell
```
Una vez creadas las carpetas correspondientes creamos un repositorio con el nombre del proyecto y el .gitignore de python o lo podemos copiar de "https://www.toptal.com/developers/gitignore/api/python"

Inicializamos el git y finalmente abrimos el proyecto en vs code.

```bash
$ git init
$ git remote add origin https://github.com/<nombre-proyecto>.git
$ git remote -v
$ code .
```
En la raiz del proyecto creamos el archivo "requirements.txt" y listamos las dependencias que vamos a necesitar.
* Django
* djangorestframework
* django-environ
* django-filter
* django-autoslug
* django-countries
* Pillow
* django-phonenumber-field
* phonenumbers
* psycopg2-binary
* flake8
* black
* isort

en la terminal, instalamos los paquetes listados en el archivo requirements.txt

```bash
$ pip install -r requirements.txt
```
para actualizar pip

```bash
$ pip install --upgrade pip
```
(minuto 08:18 del primer video)

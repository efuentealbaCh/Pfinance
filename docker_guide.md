# 🐳 Guía Docker — Pfinance

> Guía completa de administración Docker para el proyecto Pfinance y referencia general de comandos.

---

## 🚀 Administración del Proyecto Pfinance con Docker

### Levantar el proyecto completo

```bash
# Desde la raíz del proyecto (donde está docker-compose.yml)
docker-compose up -d
```
> `-d` = modo *detached* (segundo plano). Los 3 servicios subirán: `pfinance_db`, `pfinance_backend`, `pfinance_frontend`.

### URLs de acceso
| Servicio | URL |
|---|---|
| Frontend (React) | http://localhost:5173 |
| Backend (Laravel API) | http://localhost:8000 |
| PostgreSQL | localhost:5432 |

### Flujo de trabajo diario

```bash
# Arrancar todo
docker-compose up -d

# Ver si todo está corriendo bien
docker-compose ps

# Ver logs en tiempo real (todos los servicios)
docker-compose logs -f

# Ver logs solo del backend
docker-compose logs -f backend

# Ver logs solo del frontend
docker-compose logs -f frontend

# Apagar todo (sin borrar datos)
docker-compose down
```

### Comandos Laravel dentro del contenedor

```bash
# Ejecutar migraciones
docker-compose exec backend php artisan migrate

# Rollback de migraciones
docker-compose exec backend php artisan migrate:rollback

# Seeders / datos de prueba
docker-compose exec backend php artisan db:seed

# Limpiar caché
docker-compose exec backend php artisan cache:clear
docker-compose exec backend php artisan config:clear
docker-compose exec backend php artisan route:clear

# Abrir consola interactiva de Laravel (Tinker)
docker-compose exec backend php artisan tinker

# Ver todas las rutas registradas
docker-compose exec backend php artisan route:list

# Instalar una nueva dependencia PHP (Composer)
docker-compose exec backend composer require nombre/paquete
```

### Comandos Node/npm dentro del contenedor

```bash
# Instalar una nueva dependencia npm
docker-compose exec frontend npm install nombre-paquete

# Ejecutar lint
docker-compose exec frontend npm run lint
```

### Acceder a la base de datos PostgreSQL

```bash
# Entrar a la consola psql dentro del contenedor
docker-compose exec db psql -U pfinance_user -d pfinance

# Comandos útiles dentro de psql:
# \dt          → listar tablas
# \d users     → describir tabla users
# \q           → salir
```

### Reconstruir contenedores (tras cambios en Dockerfile o dependencias)

```bash
# Reconstruir todos
docker-compose up -d --build

# Reconstruir solo uno
docker-compose up -d --build backend
docker-compose up -d --build frontend
```

### Reiniciar un servicio específico

```bash
docker-compose restart backend
docker-compose restart frontend
docker-compose restart db
```

### Reset total (⚠️ borra todos los datos de la BD)

```bash
docker-compose down -v   # -v elimina los volúmenes (base de datos)
docker-compose up -d --build
docker-compose exec backend php artisan migrate --seed
```

---

## 📚 Comandos Docker — De Principiante a Avanzado

---

### 🟢 Nivel 1 — Principiante

#### Verificar instalación
```bash
docker --version
docker-compose --version
```

#### Imágenes
```bash
# Descargar una imagen
docker pull nginx

# Listar imágenes descargadas
docker images

# Eliminar una imagen
docker rmi nginx
```

#### Contenedores básicos
```bash
# Correr un contenedor (y eliminarlo al salir)
docker run --rm hello-world

# Correr nginx en segundo plano, puerto 80
docker run -d -p 80:80 --name mi-nginx nginx

# Listar contenedores corriendo
docker ps

# Listar TODOS (incluidos detenidos)
docker ps -a

# Detener un contenedor
docker stop mi-nginx

# Iniciar un contenedor detenido
docker start mi-nginx

# Eliminar un contenedor
docker rm mi-nginx
```

#### Logs básicos
```bash
# Ver logs de un contenedor
docker logs mi-nginx

# Seguir logs en tiempo real
docker logs -f mi-nginx
```

---

### 🟡 Nivel 2 — Intermedio

#### Interactuar con contenedores
```bash
# Abrir una shell bash dentro de un contenedor
docker exec -it mi-nginx bash

# Ejecutar un comando puntual
docker exec mi-nginx nginx -t

# Copiar archivos hacia/desde un contenedor
docker cp archivo.txt mi-nginx:/usr/share/nginx/html/
docker cp mi-nginx:/etc/nginx/nginx.conf ./nginx.conf
```

#### Volúmenes (persistencia de datos)
```bash
# Crear un volumen
docker volume create mis-datos

# Listar volúmenes
docker volume ls

# Usar un volumen al correr un contenedor
docker run -d -v mis-datos:/data --name db postgres:16

# Eliminar un volumen
docker volume rm mis-datos

# Eliminar volúmenes no usados
docker volume prune
```

#### Redes
```bash
# Listar redes
docker network ls

# Crear una red personalizada
docker network create mi-red

# Conectar un contenedor a una red
docker network connect mi-red mi-nginx

# Inspeccionar una red
docker network inspect mi-red
```

#### Docker Compose — Nivel Intermedio
```bash
# Subir servicios en segundo plano
docker-compose up -d

# Ver estado de servicios
docker-compose ps

# Parar servicios (sin borrar)
docker-compose stop

# Bajar servicios (sin borrar volúmenes)
docker-compose down

# Bajar y borrar volúmenes
docker-compose down -v

# Ver logs de todos los servicios
docker-compose logs -f

# Escalar un servicio (ej: 3 instancias de backend)
docker-compose up -d --scale backend=3
```

#### Inspección y diagnóstico
```bash
# Ver detalles completos de un contenedor (JSON)
docker inspect mi-nginx

# Ver uso de recursos en tiempo real
docker stats

# Ver uso de recursos de un contenedor
docker stats mi-nginx

# Ver procesos corriendo dentro del contenedor
docker top mi-nginx
```

---

### 🔴 Nivel 3 — Avanzado

#### Construcción de imágenes

```bash
# Construir una imagen desde un Dockerfile
docker build -t mi-app:1.0 .

# Construir con argumento de build
docker build --build-arg PHP_VERSION=8.3 -t mi-app .

# Construir sin usar caché (rebuild completo)
docker build --no-cache -t mi-app .

# Ver capas de una imagen
docker history mi-app:1.0

# Ver tamaño de capas detallado
docker image inspect mi-app:1.0
```

#### Multi-stage builds (Dockerfiles eficientes)
```dockerfile
# Ejemplo: imagen de producción más liviana
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

#### Registry (Docker Hub / registros privados)
```bash
# Login a Docker Hub
docker login

# Etiquetar imagen para subir
docker tag mi-app:1.0 miusuario/mi-app:1.0

# Subir imagen
docker push miusuario/mi-app:1.0

# Bajar imagen específica
docker pull miusuario/mi-app:1.0
```

#### Limpieza del sistema
```bash
# Eliminar contenedores detenidos
docker container prune

# Eliminar imágenes sin usar (dangling)
docker image prune

# Eliminar imágenes sin usar (todas)
docker image prune -a

# Limpieza total (contenedores, imágenes, redes, caché de build)
docker system prune -a

# Ver cuánto espacio usa Docker
docker system df
```

#### Variables de entorno y secretos
```bash
# Pasar variables al correr un contenedor
docker run -e DB_HOST=localhost -e DB_PORT=5432 mi-app

# Usar un archivo .env
docker run --env-file .env mi-app
```

#### Health checks
```bash
# Ver el estado de salud de los contenedores
docker ps  # Columna STATUS muestra "healthy" / "unhealthy"

# Inspeccionar detalles del healthcheck
docker inspect --format='{{json .State.Health}}' pfinance_db
```

#### Comandos de red avanzados
```bash
# Ver IP de un contenedor
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' pfinance_backend

# Ejecutar prueba de conectividad entre contenedores
docker exec pfinance_backend ping db
```

#### Docker Compose avanzado
```bash
# Usar un archivo compose alternativo
docker-compose -f docker-compose.prod.yml up -d

# Validar sintaxis del docker-compose.yml
docker-compose config

# Ver variables de entorno de un servicio
docker-compose exec backend env

# Forzar recreación de contenedores
docker-compose up -d --force-recreate

# Ver el plan de dependencias
docker-compose config --services
```

---

## 📌 Referencia Rápida — Pfinance

| Acción | Comando |
|---|---|
| Levantar todo | `docker-compose up -d` |
| Ver estado | `docker-compose ps` |
| Logs backend | `docker-compose logs -f backend` |
| Migrar BD | `docker-compose exec backend php artisan migrate` |
| Consola Laravel | `docker-compose exec backend php artisan tinker` |
| Consola PostgreSQL | `docker-compose exec db psql -U pfinance_user -d pfinance` |
| Reconstruir | `docker-compose up -d --build` |
| Apagar todo | `docker-compose down` |
| Reset + borrar BD | `docker-compose down -v` |
| Limpiar Docker | `docker system prune -a` |

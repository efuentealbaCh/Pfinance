# Pfinance - Gestor de Finanzas Personales 💰

Pfinance es una aplicación web moderna y robusta diseñada para ayudarte a tomar el control total de tus finanzas personales y grupales. Construida con una arquitectura Full-Stack utilizando las tecnologías más recientes, ofrece una experiencia fluida, segura e instalable (PWA) en cualquier dispositivo.

## ✨ Funcionalidades Principales

### 🔐 Autenticación y Seguridad
- Registro e inicio de sesión seguro con JWT (JSON Web Tokens).
- Gestión de perfil (actualización de datos personales).
- Cambio de contraseña encriptada (bcrypt).
- Protección de rutas tanto en el Frontend como en el Backend.

### 📊 Panel de Control (Dashboard)
- Resumen visual de tu estado financiero (Balance total, Ingresos, Gastos).
- Gráficos interactivos generados con Recharts para analizar tus movimientos a lo largo del tiempo.
- Filtros rápidos por periodo de tiempo.

### 💸 Gestión de Transacciones
- Registro detallado de **Ingresos**, **Gastos** y **Transferencias** entre cuentas.
- Categorización de movimientos con iconos personalizados.
- Asignación de transacciones a cuentas bancarias específicas.
- Historial completo con filtros avanzados (por fecha, tipo, categoría, cuenta y monto).

### 🏦 Cuentas y Categorías
- Gestión de múltiples cuentas bancarias (corrientes, ahorro, efectivo, etc.).
- Categorías personalizables para organizar detalladamente en qué gastas tu dinero.

### 🎯 Metas de Ahorro
- Definición de objetivos financieros (ej: "Viaje a Japón", "Fondo de Emergencia").
- Seguimiento visual del progreso (porcentaje completado) mediante barras de progreso.

### 📉 Presupuestos
- Creación de límites de gasto por categoría (mensual, semanal, anual).
- Alertas visuales de consumo (colores dinámicos que cambian al acercarse al 100% del presupuesto).

### 🤝 Grupos y Deudas Compartidas
- Creación de grupos para gestionar gastos compartidos (ideal para compañeros de piso, viajes o parejas).
- Sistema de invitaciones (aceptar/rechazar).
- Registro de quién pagó qué y cálculo automático de saldos (quién le debe a quién).

### 📥 Exportación de Datos
- Exportación de transacciones a formato Excel (XLSX) filtrando por rangos de fechas, ideal para contabilidad externa.

### 📱 PWA (Progressive Web App)
- La aplicación puede instalarse nativamente en móviles y escritorios para una experiencia similar a una app nativa.

---

## 🛠️ Stack Tecnológico

**Frontend:**
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) (Rendimiento ultra rápido)
- [TypeScript](https://www.typescriptlang.org/) (Tipado estricto)
- [Mantine v7](https://mantine.dev/) (Sistema de componentes de interfaz y diseño moderno)
- [Recharts](https://recharts.org/) (Gráficos)
- [React Query](https://tanstack.com/query) (Gestión de estado y peticiones asíncronas)

**Backend:**
- [NestJS](https://nestjs.com/) (Framework Node.js estructurado y escalable)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/) (Interacción con base de datos)
- [PostgreSQL](https://www.postgresql.org/) (Base de datos alojada en Supabase)

---

## 🚀 Instalación y Despliegue Local (Sin Docker)

### Requisitos Previos
- Node.js (v18 o superior)
- PostgreSQL (Local o una base de datos en Supabase)

### 1. Configurar el Backend
```bash
cd backend-js
npm install
```
Crea un archivo `.env` en `backend-js/` basándote en un posible `.env.example`:
```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/pfinance"
JWT_SECRET="tu_super_secreto_aqui"
PORT=3000
```
Aplica las migraciones de Prisma e inicia el servidor:
```bash
npx prisma migrate dev
npm run start:dev
```

### 2. Configurar el Frontend
Abre otra terminal:
```bash
cd frontend
npm install
```
Crea un archivo `.env` en `frontend/`:
```env
VITE_API_URL="http://localhost:3000/api"
```
Inicia el entorno de desarrollo:
```bash
npm run dev
```

---

## 🐳 Despliegue con Docker (Recomendado)

Pfinance está preparado para ser desplegado fácilmente utilizando contenedores. A continuación, te mostramos cómo levantar toda la arquitectura con **Docker Compose**.

### 1. Requisitos
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/) instalados en tu máquina.

### 2. Archivo `docker-compose.yml`
En la raíz del proyecto, asegúrate de tener un archivo `docker-compose.yml` similar a este:

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: mysecretpassword
      POSTGRES_DB: pfinance
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  backend:
    build:
      context: ./backend-js
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:mysecretpassword@db:5432/pfinance
      - JWT_SECRET=tu_jwt_secret_super_seguro
      - PORT=3000
    depends_on:
      - db
    command: sh -c "npx prisma migrate deploy && npm run start:prod"

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        VITE_API_URL: http://localhost:3000/api
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  pgdata:
```
*(Nota: Para este setup, debes asegurarte de tener un `Dockerfile` en la carpeta `/frontend` usando Nginx y otro en `/backend-js` para construir NestJS).*

### 3. Levantar los contenedores
Simplemente ejecuta en la raíz del proyecto:

```bash
docker-compose up -d --build
```
¡Listo! 
- Tu **Frontend** estará corriendo en: `http://localhost`
- Tu **Backend** estará corriendo en: `http://localhost:3000`
- Tu **Base de datos** PostgreSQL estará aislada y configurada.

---

## 🌍 Despliegue en Producción (Cloud)

Actualmente, el proyecto está optimizado para entornos de producción modernos:
- **Backend:** Alojado en Render u otro servicio PAAS, exponiendo la API por HTTPS.
- **Frontend:** Desplegado en Vercel, consumiendo la variable de entorno `VITE_API_URL` que apunta al servidor backend.
- **Base de Datos:** PostgreSQL administrado por Supabase usando PGBouncer (Pooler) para optimizar conexiones simultáneas.

---

> Desarrollado con dedicación para ofrecer la mejor herramienta de gestión financiera. 📈
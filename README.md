# Pfinance - Gestor de Finanzas Personales 💰

Pfinance es una aplicación web moderna y robusta diseñada para ayudarte a tomar el control total de tus finanzas personales y grupales. Construida con una arquitectura Full-Stack utilizando las tecnologías más recientes, ofrece una experiencia fluida, segura e instalable (PWA) en cualquier dispositivo.

## ✨ Funcionalidades Principales

### 🔐 Autenticación y Seguridad

- Registro e inicio de sesión seguro con JWT (JSON Web Tokens).
- Gestión de perfil (actualización de datos personales y **RUT** como identificador único).
- **Seguridad de Datos Sensibles**: El RUT se almacena de forma encriptada (AES-256) en la base de datos para proteger la identidad del usuario.
- Cambio de contraseña encriptada (bcrypt).
- Protección de rutas tanto en el Frontend como en el Backend.

### 🏦 Cuentas, Tarjetas y Categorías
- **Nueva Arquitectura Financiera**: Separación real de Cuentas Bancarias y Tarjetas (Débito/Crédito) como medios de pago.
- Catálogo de Bancos oficiales chilenos integrados con logos dinámicos (Clearbit API).
- **Soporte Multi-Cuenta Robusto**: Relación detallada entre Bancos y Tipos de Cuentas (`bank_account_types`) lo que permite un control granular de qué cuentas ofrece cada banco (Vista, Corriente, Ahorro, etc).
- Creación guiada de cuentas (Wizard / Stepper) para vincular múltiples tarjetas a una misma cuenta bancaria.
- Opción rápida de "Copiar Datos" para transferencias con un clic.
- Categorías personalizables para organizar detalladamente en qué gastas tu dinero.

### 🏗️ Arquitectura de Base de Datos
- **Identificadores Universales (UUID)**: La aplicación utiliza UUID de forma nativa para todas las entidades clave. Esto mejora la seguridad, previene la enumeración de IDs, y facilita la sincronización distribuida en comparación con los IDs numéricos secuenciales tradicionales.

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

### 🔄 Sincronización Webhook (Local ↔ Remoto)
- Prisma Middleware incorporado para interceptar mutaciones locales (Crear, Actualizar, Eliminar).
- Disparo automático de webhooks seguros hacia el servidor de producción para mantener las bases de datos (Supabase) 100% espejadas en tiempo real.

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
- [PostgreSQL](https://www.postgresql.org/) (Base de datos alojada en Supabase o Local)

---

## 🐳 Proceso de Instalación: Despliegue con Docker (Recomendado)

Pfinance está preparado para ser desplegado fácilmente utilizando contenedores. A continuación, te mostramos cómo levantar toda la arquitectura basándose en los archivos actuales.

### 1. Requisitos

- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/) instalados en tu máquina.

### 2. Levantar los contenedores

En la raíz del proyecto, asegúrate de que el archivo `docker-compose.yml` esté presente. Simplemente ejecuta:

```bash
docker-compose up -d --build
```

Esto descargará las imágenes necesarias, construirá el Backend y el Frontend, y aprovisionará una base de datos local lista para ser utilizada.

### 3. Migraciones y Base de Datos (Opcional si es la primera vez)
Una vez que el backend esté arriba, si necesitas aplicar o resetear la base de datos (con datos de prueba, bancos y tipos de cuenta), ejecuta el siguiente comando:

```bash
docker exec pfinance_backend_js npm run prisma:reset
```

¡Listo!

- Tu **Frontend** estará corriendo en: `http://localhost:5173`
- Tu **Backend** estará corriendo en: `http://localhost:3000`
- Tu **Base de datos** PostgreSQL estará escuchando en el puerto `5432`.

---

## 🚀 Proceso de Instalación Local (Sin Docker)

Si prefieres ejecutar el proyecto directamente en tu entorno (ideal para desarrollo intensivo), sigue estos pasos.

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
ENCRYPTION_KEY="una_llave_de_32_caracteres_secur" # Llave AES-256 para RUT
```
Aplica las migraciones de Prisma y rellena la base de datos, luego inicia el servidor:
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

## 🌍 Despliegue en Producción (Cloud)

Actualmente, el proyecto está optimizado para entornos de producción modernos:

- **Backend:** Alojado en Render u otro servicio PAAS, exponiendo la API por HTTPS.
- **Frontend:** Desplegado en Vercel, consumiendo la variable de entorno `VITE_API_URL` que apunta al servidor backend.
- **Base de Datos:** PostgreSQL administrado por Supabase usando PGBouncer (Pooler) para optimizar conexiones simultáneas.

---

> Desarrollado con dedicación para ofrecer la mejor herramienta de gestión financiera. 📈

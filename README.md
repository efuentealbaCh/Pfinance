# Pfinance — Gestor de Finanzas Personales 💰

**Versión 1.0.0**

Pfinance es una aplicación web para tomar el control de tus finanzas personales y grupales.
Construida como PWA instalable, con soporte multimoneda, importación de cartolas bancarias
chilenas y automatización de gastos recurrentes.

---

## ✨ Funcionalidades

### 🔐 Autenticación y Seguridad

- Registro e inicio de sesión con JWT.
- **Verificación de correo** con enlace por email (vigencia de 24 horas).
- **Recuperación de contraseña** por enlace (vigencia de 30 minutos). La respuesta es siempre la
  misma exista o no el correo, para no filtrar qué direcciones están registradas.
- **Verificación en dos pasos (2FA)** con TOTP: código QR para Google Authenticator, Authy o
  similar, y desactivación protegida por contraseña.
- **Historial de seguridad**: inicios de sesión, cambios de contraseña y activación de 2FA, cada
  uno con dispositivo e IP. Si se detecta un inicio desde un contexto nuevo, llega un aviso por
  correo.
- **RUT encriptado** (AES-256) en la base de datos.
- Límites de intentos por IP (`@nestjs/throttler`) en registro, login y recuperación.

### 🏦 Cuentas, Tarjetas y Categorías

- Separación real entre cuentas bancarias y tarjetas (débito/crédito) como medios de pago.
- Catálogo de bancos chilenos con logos dinámicos (Clearbit).
- Relación entre bancos y tipos de cuenta (`bank_account_types`): cada banco ofrece solo los
  tipos que realmente tiene.
- Creación guiada de cuentas con vinculación de múltiples tarjetas.
- **Copiar datos de transferencia** con un clic: nombre, RUT, tipo de cuenta, número, banco y
  correo, en el formato que se usa en Chile.
- Categorías personalizables con ícono y color.

### 💱 Multimoneda (CLP / USD)

- Moneda por cuenta: una cuenta en pesos y otra en dólares conviven sin mezclarse.
- **Conversión con la cotización de la fecha de cada movimiento**, no la de hoy, para que
  recalcular un período viejo no cambie de resultado.
- Cotizaciones del dólar obtenidas de [mindicador.cl](https://mindicador.cl), con carga inicial
  de dos años y actualización automática en días hábiles.
- Los totales del panel, los presupuestos y los reportes se expresan en la moneda base del
  usuario.

### 📥 Importación de Cartolas Bancarias

- Carga de cartolas en **XLSX, XLS o CSV**.
- **Detección automática de columnas** por nombre y por contenido: funciona con formatos
  distintos sin configurar nada.
- Corrección manual del mapeo cuando el banco usa títulos poco comunes.
- **Previsualización antes de importar**: se ve exactamente qué movimientos entrarían, sin
  escribir nada en la base.
- **Deduplicación por huella digital**: reimportar la misma cartola no duplica movimientos.
- **Historial con opción de revertir** una importación completa, con ajuste del saldo.
- El mapeo de columnas se recuerda por banco y por usuario.

### 🔁 Transacciones Recurrentes

- Suscripciones (indefinidas) y créditos en cuotas (con total fijo).
- Frecuencia semanal, quincenal, mensual o anual.
- Las cuotas vencidas se derivan comparando contra la fecha actual, así que aparecen aunque el
  proceso automático no haya corrido.
- Confirmar una cuota crea el movimiento real con la fecha que le corresponde; omitirla avanza
  el estado sin registrar nada.
- Pausar y reanudar sin perder el progreso.

### 📊 Panel y Reportes

- Balance total, ingresos, gastos y evolución en gráficos.
- Gastos por categoría, progreso de presupuestos y de metas de ahorro.
- **Resumen mensual** con comparación contra el mes anterior y desglose por categoría, también
  enviado por correo el día 1 de cada mes.

### 📉 Presupuestos

- Límites de gasto por categoría (semanal, mensual o anual).
- El consumo se calcula **convirtiendo cada movimiento a la moneda base**, no sumando montos de
  distintas monedas.
- Alertas al 80% y al 100%, por pantalla, correo o notificación push.

### 🎯 Metas de Ahorro

- Objetivos con monto, fecha y seguimiento de progreso.
- Depósitos y retiros con historial de movimientos.

### 🤝 Grupos y Deudas Compartidas

- Grupos para gastos compartidos, con invitaciones (aceptar/rechazar).
- **Flujo de pago en dos pasos**: el deudor declara que pagó y el acreedor confirma que recibió,
  o rechaza indicando el motivo. Una parte declarada no se da por saldada hasta la confirmación.
- Saldos por miembro separando lo que se debe, lo declarado sin confirmar y lo ya saldado.

### 📤 Exportación

- Transacciones a **Excel (XLSX) o PDF**, filtrando por rango de fechas.

### 📱 PWA (Progressive Web App)

- Instalable en móvil y escritorio, con aviso guiado de instalación en iOS.
- **Notificaciones push** (Web Push / VAPID) para cuotas por vencer y movimientos en deudas
  compartidas, con control para activarlas y desactivarlas por dispositivo.
- **Aviso de versión nueva**: cuando hay una actualización publicada, la app lo informa y el
  usuario decide cuándo aplicarla, en vez de recargarse sola en medio de una tarea.

### 🔄 Sincronización Webhook (Local → Producción)

- Middleware de Prisma que intercepta las mutaciones locales y las replica al servidor de
  producción. Se activa solo con `SYNC_TO_REMOTE=true`, y nunca en producción.

---

## 🛠️ Stack Tecnológico

**Frontend**

- [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mantine 8](https://mantine.dev/) — componentes e interfaz
- [Recharts](https://recharts.org/) — gráficos
- [TanStack Query 5](https://tanstack.com/query) — estado del servidor
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) — service worker y manifiesto

**Backend**

- [NestJS 11](https://nestjs.com/) sobre Node.js
- [Prisma 5](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/)
- [Passport JWT](https://www.passportjs.org/), [bcrypt](https://www.npmjs.com/package/bcrypt),
  [otplib](https://www.npmjs.com/package/otplib) — autenticación y 2FA
- [Nodemailer](https://nodemailer.com/) — correo transaccional
- [web-push](https://www.npmjs.com/package/web-push) — notificaciones
- [SheetJS](https://sheetjs.com/) — lectura de cartolas

---

## 🐳 Instalación con Docker (recomendado)

### 1. Requisitos

- [Docker](https://www.docker.com/) y Docker Compose.

### 2. Variables de entorno

```bash
cp backend-js/.env.example backend-js/.env
```

Editá `backend-js/.env` con tus valores. El archivo documenta cada variable; las mínimas para
levantar son `DATABASE_URL`, `DIRECT_URL` y `JWT_SECRET`.

### 3. Levantar los contenedores

```bash
docker compose up -d --build
```

### 4. Base de datos

```bash
docker exec pfinance_backend_js npm run prisma:reset
```

Aplica las migraciones y siembra bancos, tipos de cuenta y categorías. El comando aborta si
`DATABASE_URL` no apunta a una base local, para que no borre producción por accidente.

Queda corriendo:

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:3000`
- **PostgreSQL**: puerto `5432`

> Para probar desde el teléfono en la misma red, usá la IP del equipo
> (`http://192.168.x.x:5173`). Tené en cuenta que sobre HTTP sin certificado el navegador no
> registra el service worker: las notificaciones push y la instalación de la PWA solo funcionan
> en `localhost` o con HTTPS.

---

## 💻 Instalación local (sin Docker)

### Requisitos

- Node.js 20 o superior.
- PostgreSQL local, o una base en Supabase.

### Backend

```bash
cd backend-js
npm install
cp .env.example .env     # completar valores
npx prisma migrate dev
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

En desarrollo no hace falta configurar `VITE_API_URL`: Vite redirige `/api` al backend. La
variable solo se usa en el build de producción.

---

## ⚙️ Variables de entorno

La referencia completa, con el porqué de cada una, está en:

- [`backend-js/.env.example`](backend-js/.env.example) — desarrollo
- [`backend-js/.env.production.example`](backend-js/.env.production.example) — producción, e
  incluye cuáles **no** deben configurarse allí

Dos advertencias que no son obvias:

- **`JWT_SECRET` también cifra el RUT.** La clave AES se deriva de este valor, así que rotarlo
  deja ilegibles los RUT ya guardados: hay que volver a cargarlos. No existe ninguna variable
  `ENCRYPTION_KEY` separada.
- **`DIRECT_URL` es obligatoria para migrar.** En Supabase, `DATABASE_URL` apunta al pooler de
  transacciones (puerto 6543), donde `prisma migrate` se cuelga porque pierde su advisory lock.
  `DIRECT_URL` apunta al session pooler (5432) y Prisma la elige sola al migrar. Sin ella,
  cualquier comando `migrate` falla con `P1012`; `prisma generate` no la necesita.

---

## 🌍 Despliegue en producción

- **Backend**: Render, exponiendo la API por HTTPS.
- **Frontend**: Vercel, con `VITE_API_URL` apuntando al backend.
- **Base de datos**: PostgreSQL en Supabase, con PgBouncer.

El plan gratuito de Render duerme el servicio tras un rato de inactividad. El diseño lo
contempla: los procesos programados (cotizaciones, avisos de cuotas, resumen mensual) tienen un
disparador bajo demanda que se ejecuta cuando el usuario entra, así que un servicio dormido no
deja huecos en los datos.

---

## 🧪 Tests

```bash
cd backend-js && npm test
```

---

> Desarrollado para llevar las cuentas claras. 📈

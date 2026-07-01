# 🗺️ Pfinance — Roadmap de Mejoras y Features

> Documento vivo con todas las mejoras identificadas para el proyecto.
> Actualizar el estado `[ ]` → `[x]` a medida que se implementen.

---

## 🔥 Alta Prioridad — Funcionalidad

### [x] 1. Presupuestos por categoría ✅

- ~~Crear tabla `budgets` (usuario, categoría, monto_límite, período: mensual/semanal/anual)~~
- ~~Endpoint `GET /budgets` y `POST /budgets`~~
- ~~Widget en Dashboard que muestre progreso vs límite (barra de progreso con Recharts)~~
- ~~Alerta visual cuando se supere el 80% del presupuesto~~

### [x] 2. Metas de ahorro ✅

- ~~Tabla `savings_goals` (nombre, monto_objetivo, monto_actual, fecha_límite)~~
- ~~CRUD completo en API y frontend~~
- ~~Visualización de progreso con animación (ej. Mantine Progress)~~
- ~~Posibilidad de asociar transacciones a una meta~~ (En este caso, se hizo con abonos directos para mayor flexibilidad)

### [x] 3. Exportar datos (CSV / PDF) ✅

- ~~Backend: endpoint `GET /transactions/export?format=csv&from=&to=`~~
- ~~Usar `league/csv` o respuesta `StreamedResponse` de Laravel~~ (Se usó `StreamedResponse` + `fputcsv` nativo)
- ~~Frontend: botón "Exportar" en `TransactionsPage` con selección de rango de fechas~~
- ~~PDF: usar `barryvdh/laravel-dompdf` para reportes mensuales~~

### [x] 4. Filtros avanzados en Transacciones ✅

- ~~Filtrar por: rango de fechas, categoría, cuenta, tipo (ingreso/egreso), monto mín/máx~~
- ~~Paginación server-side desde el backend~~
- ~~Params de query: `?from=&to=&category_id=&type=&min=&max=&page=`~~
- ~~UI: panel de filtros colapsable con Mantine~~

### [x] 5. Gráficos de tendencias históricas

- Recharts ya está instalado — aprovechar más
- Gráfico de área: evolución del saldo en el tiempo
- Gráfico de barras apiladas: ingresos vs egresos por mes
- Pie chart: distribución por categoría
- Selector de período: últimos 30 días / 3 meses / 6 meses / año

---

## ⚙️ Mejoras Técnicas — Backend

### [ ] 6. docker-compose.prod.yml (separar dev/prod)

- Producción: Nginx + PHP-FPM en vez de `php artisan serve`
- Frontend: build estático de Vite servido por Nginx
- Variables de entorno separadas por ambiente
- Estructura sugerida:
  ```
  docker-compose.yml         ← desarrollo
  docker-compose.prod.yml    ← producción
  ```

### [ ] 7. Nginx como proxy reverso

- Reemplazar `php artisan serve` (no apto para producción)
- Configurar `nginx.conf` con `fastcgi_pass` apuntando a PHP-FPM
- Añadir servicio `nginx` en docker-compose.prod.yml
- Soporte HTTPS con certificados Let's Encrypt (Certbot)

### [ ] 8. Seeders completos

- `BankSeeder`: listado de bancos comunes por defecto
- `AccountTypeSeeder`: Cuenta Corriente, Cuenta Vista, Tarjeta de Crédito, etc.
- `CategorySeeder`: categorías base (Alimentación, Transporte, Salud, Ocio, etc.)
- Ejecutar con `php artisan db:seed` en el setup inicial

### [ ] 9. API Resources (Laravel)

- Crear `app/Http/Resources/` para cada modelo
- Ejemplo: `TransactionResource`, `UserAccountResource`, `CategoryResource`
- Controlar exactamente qué campos se exponen en la API
- Evitar exponer campos sensibles (`password`, `remember_token`, etc.)

### [ ] 10. Rate Limiting en Auth

- Limitar intentos en `POST /login` y `POST /register`
- Usar `ThrottleRequests` middleware de Laravel
- Máximo 5 intentos de login por minuto por IP

### [ ] 11. Tests automatizados (PHPUnit)

- PHPUnit ya está configurado en `phpunit.xml`
- Tests prioritarios:
  - `AuthTest`: register, login, logout, token inválido
  - `TransactionTest`: CRUD completo con usuario autenticado
  - `BudgetTest`: lógica de presupuesto
- Usar `RefreshDatabase` + factory de usuarios

### [ ] 12. Logs estructurados y monitoreo

- Configurar Laravel Pail (ya incluido) para desarrollo
- Producción: integrar Sentry (`sentry/sentry-laravel`)
- Alertas por email en errores críticos (`LOG_LEVEL=error`)

---

## 🎨 Mejoras — Frontend

### [ ] 13. React Query (TanStack Query)

- Reemplazar fetch manual con queries declarativas
- Cache automático, revalidación, loading/error states consistentes
- Instalación: `npm install @tanstack/react-query`
- Reducir código boilerplate en todas las páginas

### [ ] 14. Internacionalización (i18n)

- Soporte Español / Inglés
- Usar `react-i18next`
- Selector de idioma en el perfil del usuario
- Formateo de fechas y moneda según locale (`Intl.NumberFormat`)

### [ ] 15. Dark Mode

- Mantine tiene soporte nativo (`ColorSchemeScript`, `MantineProvider`)
- Toggle en el header (sol/luna)
- Preferencia guardada en `localStorage`
- Respetar preferencia del sistema operativo (`prefers-color-scheme`)

### [ ] 16. PWA (Progressive Web App)

- Instalar como app en móvil/escritorio sin tienda de apps
- Plugin: `vite-plugin-pwa`
- Configurar `manifest.json` con íconos y colores del branding
- Service Worker para caché básico offline

### [ ] 17. Notificaciones / Alertas inteligentes

- Mantine Notifications ya está instalado
- Notificar cuando: presupuesto al 80%, meta de ahorro alcanzada, transacción grande registrada
- Opcional: notificaciones push con Web Push API

---

## 🏗️ Infraestructura — Docker y DevOps

### [ ] 18. PgAdmin en docker-compose

- Interfaz visual para explorar la base de datos sin instalar nada extra
- Añadir al `docker-compose.yml`:
  ```yaml
  pgadmin:
    image: dpage/pgadmin4
    ports:
      - "5050:80"
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@pfinance.local
      PGADMIN_DEFAULT_PASSWORD: admin
  ```
- Acceso: http://localhost:5050

### [ ] 19. Makefile

- Simplificar comandos del día a día con shortcuts
- Ejemplo de comandos: `make up`, `make migrate`, `make shell-backend`, `make logs`

### [ ] 20. GitHub Actions CI/CD

- Workflow que corra en cada Pull Request:
  1. Levantar servicios con Docker Compose
  2. Ejecutar `php artisan migrate --force`
  3. Correr `php artisan test`
  4. Correr `npm run lint` en frontend
- Archivo: `.github/workflows/ci.yml`

### [ ] 21. Healthchecks en todos los servicios

- El `docker-compose.yml` ya tiene healthcheck en `db` ✅
- Añadir healthchecks a `backend` y `frontend`
- Crear endpoint `GET /api/health` en Laravel que retorne `{"status": "ok"}`

### [ ] 22. Variables de entorno seguras

- No commitear `.env` con secretos reales (ya en `.gitignore` ✅)
- Usar gestor de secretos para producción (AWS Secrets Manager, Vault, etc.)
- Documentar en `README.md` todas las variables de entorno requeridas

---

## 📊 Resumen de Estado

| Categoría          | Total  | Completados | Pendientes |
| ------------------ | ------ | ----------- | ---------- |
| 🔥 Funcionalidad   | 5      | 3           | 2          |
| ⚙️ Backend         | 7      | 0           | 7          |
| 🎨 Frontend        | 5      | 0           | 5          |
| 🏗️ Infraestructura | 5      | 0           | 5          |
| **Total**          | **22** | **3**       | **19**     |

---

_Última actualización: Junio 2026_

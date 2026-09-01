# Roadmap de implementación — Pfinance

Plan de trabajo segmentado en tareas chicas y autocontenidas. Cada casilla `[ ]` está pensada para cerrarse con **un commit propio** (o a lo sumo un par de commits relacionados), en el orden en que aparecen — cada fase depende de que la anterior esté cerrada.

Cómo usar este documento: al terminar una tarea, marcá la casilla (`[x]`) y commiteá el cambio junto con la actualización de este archivo. Si el orden o el alcance de algo cambia sobre la marcha, editá esta sección en vez de abrir un doc aparte.

---

## Fase 0 — Fundaciones compartidas ✅ (cerrada)

Prerequisitos técnicos que varias features de las fases siguientes van a necesitar. Conviene cerrarlos primero para no repetir setup a mitad de otra tarea.

- [x] **Validación de entrada con DTOs (`class-validator`)**
      Instalado `class-validator` + `class-transformer`, `ValidationPipe` global en `main.ts`, DTOs para `register`, `login`, `updateProfile`, `updatePassword` en `src/auth/dto/`.

- [x] **Servicio de envío de correo**
      `MailService` genérico (`src/mail/mail.service.ts`) sobre `nodemailer`, configurado 100% por variables de entorno SMTP. Proveedor elegido: **Brevo** (free tier). Probado de punta a punta con un envío real — funciona.

- [x] **Plantillas base de correo**
      Layout reutilizable en `src/mail/templates/base.template.ts` (header, cuerpo, footer, identidad visual de Pfinance).

- [x] **Fix no planeado pero necesario**: la app no cargaba `.env` en runtime (faltaba `dotenv`/`@nestjs/config`) — `JWT_SECRET` real nunca se usaba, siempre caía al fallback hardcodeado. Agregado `dotenv` + `import 'dotenv/config'` en `main.ts`.

---

## Fase 1 — Seguridad: quick wins (el modelo de datos ya está listo)

- [ ] **Verificación de email al registrarse** (backend cerrado, falta frontend)
  - [x] Generar token de verificación al crear el usuario (random, hasheado SHA-256, expiración 24h) — tabla `email_verification_tokens`.
  - [x] Enviar correo de bienvenida con el link de verificación (usa Fase 0). El registro no falla si el envío de correo falla.
  - [x] Endpoint `GET /auth/verify-email?token=...` que setea `users.email_verified_at`.
  - [x] Endpoint `POST /auth/resend-verification` (protegido por JWT, cooldown de 60s anti-spam).
  - [x] Política de acceso decidida: **login libre + aviso** (no se bloquea el login; el frontend muestra un banner persistente hasta verificar).
  - [ ] Frontend: pantalla/estado de "revisá tu correo" tras registrarse, banner persistente si no está verificado, y página que reciba el link `/verify-email?token=...`.
  - Verificado end-to-end con Docker real (registro → token real en BD → `GET /auth/verify-email` → `email_verified_at` seteado → `login`/`me` reflejan `email_verified: true`).
  - [x] Resuelto el problema de `525 Unauthorized IP address`: desactivada la restricción de IP para claves SMTP en Brevo (Settings → Seguridad → IP autorizadas → "Desactivar para claves SMTP"). Ya no depende de autorizar IPs una por una — necesario para que funcione tanto en desarrollo (IP dinámica de casa) como en Render (IPs dinámicas de la plataforma).

- [ ] **Recuperación de contraseña** (backend cerrado, falta frontend)
  - [x] Endurecido el diseño de `password_reset_tokens`: `email` (PK), `token_hash` (SHA-256, nunca texto plano), `expires_at` (30 min), `created_at`.
  - [x] Endpoint `POST /auth/forgot-password` — responde el mismo mensaje genérico exista o no el email (no filtra qué correos están registrados). No falla si el envío de correo falla.
  - [x] Endpoint `POST /auth/reset-password` — valida token + expiración, actualiza password, invalida el token (transacción atómica).
  - [ ] Frontend: pantallas "olvidé mi contraseña" y "definir nueva contraseña".
  - Verificado end-to-end con Docker real (forgot-password con email inexistente/real, correo enviado de verdad por Brevo esta vez, reset con token real, login con password vieja rechazado / nueva aceptado, reuso de token rechazado).

- [x] **Rate limiting**
      `@nestjs/throttler@6.5.0` instalado. Global: 100 req/min/IP (`ThrottlerGuard` como `APP_GUARD`). Específicos: `login` 5/min, `register` 5/hora, `forgot-password` 3/hora, `resend-verification` 5/hora (además del cooldown de 60s por usuario que ya existía). Fix de paso necesario para que esto funcione en Render: `app.set('trust proxy', 1)` en `main.ts` (sin esto, detrás del proxy reverso de Render todos los requests comparten la misma IP interna y el límite por IP no serviría de nada). Verificado con Docker real: 5 intentos de login devuelven `401`, el 6to en adelante `429`; rutas fuera del límite siguen respondiendo normal.

---

## Fase 2 — Seguridad: avanzado

- [ ] **2FA (TOTP)**
  - [ ] Endpoint para activar 2FA: genera secret, devuelve QR (compatible Google Authenticator/Authy).
  - [ ] Endpoint para confirmar activación (valida el primer código antes de dejarlo activo).
  - [ ] Ajustar `login` para pedir el código TOTP cuando el usuario lo tenga activado.
  - [ ] Endpoint para desactivar 2FA (requiere contraseña actual).
  - [ ] Frontend: flujo de activación/desactivación en el perfil, y paso extra de login cuando corresponda.

- [ ] **Notificación de eventos sensibles por correo**
      Reutilizando el `MailService` de la Fase 0: avisar por correo cuando cambia la contraseña, se activa/desactiva 2FA, o se detecta un login desde un contexto nuevo.

- [ ] **Revocación real de sesiones**
      Evaluar dos caminos: (a) usar la tabla `sessions` existente para llevar sesiones activas server-side e invalidarlas en logout, o (b) migrar a refresh tokens de corta vida + rotación. Definir cuál antes de implementar — son diseños distintos.

- [ ] **Auditoría de acciones sensibles**
      Extender el patrón de `transaction_logs` a login, cambios de perfil, cambios de contraseña y eliminación de cuentas — útil para detectar accesos indebidos.

---

## Fase 3 — Funcional: sobre lo que ya existe

- [ ] **Alertas de presupuesto**
      Usando `push_subscriptions` (ya existe en el modelo, sin uso hoy): notificar cuando una categoría supera el 80% y el 100% del presupuesto mensual.

- [ ] **Transacciones recurrentes**
      Nuevo modelo para definir una transacción "plantilla" (monto, categoría, frecuencia) que genera automáticamente el registro real cada período (requiere un job programado — evaluar si usar un cron simple o algo más robusto).

- [ ] **Proyección en metas de ahorro**
      Sobre `savings_goals`: calcular "a este ritmo, la alcanzás en X meses" y sugerir cuánto aportar por mes para llegar a una fecha objetivo.

- [ ] **Resumen mensual por correo**
      Job programado (día 1 de cada mes) que arma un resumen (ingresos, gastos, balance, comparación con el mes anterior) reutilizando la lógica de export ya existente, y lo manda por correo.

- [ ] **Mejoras en deudas compartidas**
      Sobre `shared_debts` / `shared_debt_splits`: recordatorio de pago pendiente y confirmación de pago recibido entre las partes.

---

## Fase 4 — Funcional: mayor alcance

- [ ] **Multi-moneda**
      Evaluar si aplica al público real de la app antes de encarar esto — cambia `transactions` y `user_accounts`, es un cambio de esquema más invasivo.

- [ ] **Importar cartola bancaria**
      Import de CSV/Excel exportado por los bancos chilenos soportados, para cargar transacciones sin tipeo manual.

---

## Notas de secuenciación

- La Fase 0 bloquea casi todo lo demás — conviene cerrarla completa antes de arrancar la Fase 1.
- Dentro de la Fase 1, verificación de email y recuperación de contraseña son independientes entre sí (se pueden hacer en cualquier orden), pero ambas dependen del `MailService`.
- La Fase 2 depende de que la Fase 1 esté cerrada (2FA y notificaciones de seguridad no tienen mucho sentido si el email todavía no está verificado).
- Las Fases 3 y 4 no dependen de las de seguridad — se pueden intercalar si en algún punto preferís priorizar funcionalidad sobre seguridad, o alternar.

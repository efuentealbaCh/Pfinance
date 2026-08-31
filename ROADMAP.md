# Roadmap de implementación — Pfinance

Plan de trabajo segmentado en tareas chicas y autocontenidas. Cada casilla `[ ]` está pensada para cerrarse con **un commit propio** (o a lo sumo un par de commits relacionados), en el orden en que aparecen — cada fase depende de que la anterior esté cerrada.

Cómo usar este documento: al terminar una tarea, marcá la casilla (`[x]`) y commiteá el cambio junto con la actualización de este archivo. Si el orden o el alcance de algo cambia sobre la marcha, editá esta sección en vez de abrir un doc aparte.

---

## Fase 0 — Fundaciones compartidas

Prerequisitos técnicos que varias features de las fases siguientes van a necesitar. Conviene cerrarlos primero para no repetir setup a mitad de otra tarea.

- [ ] **Validación de entrada con DTOs (`class-validator`)**
  Instalar `class-validator` + `class-transformer`, activar `ValidationPipe` global en `main.ts`, y crear DTOs para `register`, `login`, `updateProfile`, `updatePassword` (hoy todos reciben `body: any`). Sin esto, cualquier endpoint nuevo de auth hereda el mismo problema.

- [ ] **Servicio de envío de correo**
  Elegir proveedor (Resend o Nodemailer + SMTP transaccional — Mailgun/SendGrid/Brevo tienen capa gratis razonable), agregar credenciales vía variables de entorno, y armar un `MailService` genérico (`sendMail(to, subject, template, data)`) reutilizable. Sin esto no se puede avanzar con verificación de email, reset de contraseña, alertas ni resumen mensual.

- [ ] **Plantillas base de correo**
  Un layout HTML simple y reutilizable (header con logo, cuerpo, footer) para que todos los correos transaccionales se vean consistentes, en vez de armar HTML suelto en cada feature.

---

## Fase 1 — Seguridad: quick wins (el modelo de datos ya está listo)

- [ ] **Verificación de email al registrarse**
  - [ ] Generar token de verificación al crear el usuario (random, con expiración).
  - [ ] Enviar correo de bienvenida con el link de verificación (usa Fase 0).
  - [ ] Endpoint `GET /auth/verify-email?token=...` que setea `users.email_verified_at`.
  - [ ] Endpoint `POST /auth/resend-verification` (con rate limit para evitar spam de reenvíos).
  - [ ] Decidir y aplicar la política de acceso: ¿se bloquea el login hasta verificar, o solo se restringen ciertas acciones (exportar, compartir deudas)?
  - [ ] Frontend: pantalla/estado de "revisá tu correo" tras registrarse, y aviso persistente si la cuenta no está verificada.

- [ ] **Recuperación de contraseña**
  - [ ] Endurecer el diseño de `password_reset_tokens`: token random largo, **hasheado** en la tabla (nunca texto plano, igual que la password), y expiración corta (15–30 min). Puede requerir un `ALTER TABLE` — confirmar conmigo antes de aplicarlo si toca la BD compartida.
  - [ ] Endpoint `POST /auth/forgot-password` (recibe email, genera token, manda correo — responde igual exista o no el email, para no filtrar qué correos están registrados).
  - [ ] Endpoint `POST /auth/reset-password` (valida token + expiración, actualiza password, invalida el token).
  - [ ] Frontend: pantallas "olvidé mi contraseña" y "definir nueva contraseña".

- [ ] **Rate limiting**
  Instalar `@nestjs/throttler`, aplicar límites estrictos a `/auth/login`, `/auth/register`, `/auth/forgot-password`, `/auth/resend-verification` (los puntos de entrada más expuestos a abuso), límites más laxos para el resto de la API.

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

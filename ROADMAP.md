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

- [ ] **2FA (TOTP)** (backend cerrado, falta frontend)
  - [x] `POST /auth/2fa/setup`: genera secret (encriptado con `EncryptionService`, igual que el RUT), devuelve QR (compatible Google Authenticator/Authy) + secret para entrada manual. Opcional, cada usuario lo activa desde su perfil.
  - [x] `POST /auth/2fa/confirm`: valida el primer código con `otplib` antes de dejarlo activo. Avisa por correo.
  - [x] `login` ajustado: si el usuario tiene 2FA activo y no manda código, devuelve `401` con `{ requires2fa: true }` (distinguible de credenciales inválidas, sin filtrar nada nuevo — la validación de email+password sigue siendo el primer paso, intacta).
  - [x] `POST /auth/2fa/disable`: requiere contraseña actual, limpia el secret. Avisa por correo.
  - [ ] Frontend: flujo de activación/desactivación en el perfil, y paso extra de login cuando corresponda.
  - Verificado end-to-end con Docker real: setup → generación de código TOTP real → confirm → login sin código (pide 2FA) → login con código correcto (token) / incorrecto (rechazado) → disable con password incorrecta (rechazado) / correcta (OK) → login vuelve a la normalidad sin pedir código. Confirmado el envío real de ambos correos de aviso (activación y desactivación) por Brevo.

- [x] **Notificación de eventos sensibles por correo**
  - [x] Aviso al activar/desactivar 2FA (llegó junto con la implementación de 2FA). Helper `sendSecurityNotice` + plantilla `security-notice.template.ts`.
  - [x] Aviso al cambiar la contraseña, tanto desde el perfil (`PUT /auth/profile/password`) como por el enlace de recuperación (`POST /auth/reset-password`). Verificado end-to-end con Docker: ambos correos salieron de verdad por Brevo.
  - [x] Aviso de login desde un contexto nuevo (IP/dispositivo desconocido). Se resolvió junto con la auditoría, usando `security_logs` como único registro de contextos conocidos: antes de guardar el login actual se busca un `login` previo con la misma IP + user agent, y si no hay ninguno sale el aviso. El primer login de la cuenta no avisa nunca (sería ruido justo en el onboarding).

- [ ] **Revocación real de sesiones**
      Evaluar dos caminos: (a) usar la tabla `sessions` existente para llevar sesiones activas server-side e invalidarlas en logout, o (b) migrar a refresh tokens de corta vida + rotación. Definir cuál antes de implementar — son diseños distintos.

- [x] **Auditoría de acciones sensibles**
      Tabla `security_logs` (`user_id`, `event`, `ip`, `user_agent`, `created_at`, FK con `ON DELETE CASCADE`) siguiendo el patrón de `transaction_logs`, más el helper `recordSecurityEvent` en `AuthService`. Registra `login`, `password_changed`, `password_reset`, `2fa_enabled`, `2fa_disabled` y `profile_updated`, con IP (`@Ip()`, que ya devuelve la IP real gracias a `trust proxy`) y user agent. El registro nunca tumba la operación principal: si el insert falla solo se loguea, mismo criterio que los envíos de correo.
      `GET /auth/security-log` devuelve los últimos 50 eventos del propio usuario (el id sale del JWT, nunca de la request).
      Verificado contra la BD local: el primer login no avisa, repetir IP + user agent tampoco, cambiar user agent o IP sí; un user agent de más de 500 caracteres se recorta en vez de romper el insert; un log fallido no interrumpe el login; y el historial no filtra eventos de otros usuarios.
      Pendiente: eliminación de cuentas todavía no tiene endpoint, así que ese evento queda para cuando exista.

- [x] **Fix no planeado pero necesario: excluir tablas locales del webhook de sincronización**
      `PrismaService` replicaba **toda** mutación al entorno remoto cuando `SYNC_TO_REMOTE=true`. Con `security_logs` eso no era solo ruido: los registros de desarrollo pasaban a contar como "contextos conocidos" en producción, con lo cual un acceso indebido desde esa misma IP **dejaría de disparar** el aviso de login nuevo — debilitando justo la protección que la tabla habilita. Se agregó `MODELS_EXCLUDED_FROM_SYNC` con `security_logs`, `email_verification_tokens`, `password_reset_tokens` y `push_subscriptions` (las tres últimas porque sus tokens/claves solo son válidos en el entorno que los generó).
      Verificado con Docker apuntando el webhook a un endpoint local muerto: un registro + login dispara **un solo** intento de sync (el de `users`), donde antes hubieran sido tres.

---

## Fase 3 — Funcional: sobre lo que ya existe

- [x] **3.0 — Portar la infraestructura de Web Push** (prerequisito, descubierto sobre la marcha)
      El PWA **ya intenta suscribirse a push en cada carga** (`AppLayout.tsx` llama a `GET /vapid-public-key` y `POST /push-subscribe`), pero **ninguno de esos endpoints existe en el backend NestJS** — vivían en el backend Laravel que se eliminó (`PushSubscriptionController.php`, `WebPushNotification.php`) y nunca se portaron. Hoy falla en silencio, tragado por un `catch` con `console.error`. Sin esto, las alertas de presupuesto no tienen por dónde salir.
  - [x] Generado par de VAPID keys nuevo (en `.env`, documentado en `.env.example` junto con `VAPID_SUBJECT`). Las viejas se perdieron con el backend borrado; había **0 suscripciones**, así que no se invalidó nada.
  - [x] `push_subscriptions` limpia: se reemplazó la forma polimórfica de Laravel por `user_id` con FK real a `users` (`onDelete: Cascade`). Migración `20260903152302_clean_push_subscriptions`.
  - [x] `GET /vapid-public-key` (público) → `{ key }`, y `POST /push-subscribe` (protegido JWT). Respetan el contrato exacto que el frontend ya usaba, sin tocar `queries.ts` ni `AppLayout.tsx`.
  - [x] `PushService` global (equivalente al `MailService`), con `sendToUser(userId, payload)`. Si faltan las claves VAPID loguea advertencia y deshabilita el envío sin crashear el boot. Borra automáticamente las suscripciones que el navegador reporta como muertas (`410 Gone` / `404`), y un fallo parcial (un dispositivo caído de varios) no tumba el envío completo.
  - Trampa evitada: el `ValidationPipe` global tiene `forbidNonWhitelisted: true`, así que el DTO declara también `expirationTime` — sin eso, toda suscripción legítima del navegador habría sido rechazada con `400`.
  - Verificado end-to-end con Docker real: `GET /vapid-public-key` devuelve la clave sin token; `POST /push-subscribe` rechaza sin JWT (`401`), acepta el payload exacto del navegador con `expirationTime: null` (`201`), no duplica al repetir la misma suscripción, y rechaza propiedades extra (`400`, lo que confirma que el whitelist está activo y el caso anterior no pasó por casualidad). La fila queda con `user_id` y `content_encoding = aes128gcm`.
  - **Limpieza de suscripciones muertas verificada contra un servicio de push real**: `sendToUser` envió de verdad a FCM (Google), que respondió que el endpoint no existía, y el servicio borró la suscripción solo (`{sent: 0, failed: 0, removed: 1}`, tabla en 0). Sin excepción, porque una suscripción revocada es un caso esperado, no un error de envío.
  - Pendiente menor: no se probó recibir una notificación en un navegador real (requiere suscribirse desde el PWA con permisos de notificación concedidos).

- [x] **Alertas de presupuesto**
      Umbrales de 80% y 100%, evaluados al crear y actualizar transacciones. Canal excluyente: push si el usuario tiene alguna suscripción activa, correo si no tiene ninguna (plantilla `budget-alert.template.ts`).
      Anti-repetición con la tabla `budget_alerts` (migración `20260907122354_add_budget_alerts`): un índice único sobre `budget_id + period_key + threshold` es la garantía real, porque corta incluso si dos transacciones cruzan el umbral a la vez — un `findFirst` previo tendría condición de carrera. Un salto directo de 0% a más de 100% avisa una sola vez, no genera el par 80+100.
      **Bug preexistente corregido**: `checkBudgetWarning` buscaba presupuestos con `period` igual al mes actual en formato `"2026-09"`, pero el esquema define `period` con default `"monthly"` — o sea que los presupuestos creados con el valor por defecto **nunca disparaban aviso**. La lógica de rangos se extrajo de `BudgetsService` a `src/common/budget-period.util.ts`, compartida ahora por ambos módulos, para que el porcentaje que ve el usuario en pantalla y el que dispara la alerta no puedan divergir.
      Verificado end-to-end por HTTP con Docker real, sobre un presupuesto `monthly` (el caso que estaba roto): 4 transacciones cruzando 50% → 85% → 88% → 113% produjeron **2 alertas**, una por umbral, con las 2 filas correspondientes en `budget_alerts`. Selección de canal verificada en ambas direcciones: sin suscripción llegó el correo, con suscripción salió por push y no se mandó correo. El texto de `warnings` cambió de redacción, pero el frontend solo lo muestra tal cual sin analizarlo (`queries.ts`), así que no rompe nada.

- [x] **Transacciones recurrentes**
      Modelo `recurring_transactions` (migración `20260907130921_add_recurring_transactions`) para suscripciones indefinidas y cuotas de crédito de consumo con seguimiento tipo "cuota 8 de 36". Módulo `src/recurring-transactions/` con CRUD, `PATCH /:id/toggle` para pausar/reanudar, `GET /pending`, `POST /:id/confirm` y `POST /:id/skip`.
      **Las cuotas no se registran solas**: quedan pendientes y no tocan el saldo hasta que el usuario confirma. Al confirmar, la transacción se crea por `TransactionsService.create` (el mismo camino que una carga manual), así que ajusta el saldo, deja el log en `transaction_logs` y dispara las alertas de presupuesto sin duplicar esa lógica — y lleva **la fecha de la cuota**, no la de hoy, para caer en el período de presupuesto correcto.
      **Las pendientes no se materializan como filas**: se derivan comparando `next_run_date` contra hoy, así que si pasaron 3 períodos sin confirmar aparecen 3 cuotas vencidas. Eso hace el sistema auto-reparable y evita una segunda tabla: aunque el cron no corra nunca (en Render gratuito el servicio se duerme), las pendientes aparecen apenas el usuario consulta `GET /pending`. El cron diario (`@nestjs/schedule`) es solo el aviso proactivo, con `next_run_date = hoy` como filtro — cada cuota se avisa una vez sin necesidad de tabla de deduplicación. Mismo criterio de canal que las alertas de presupuesto (push si hay suscripción, correo si no), plantilla `recurring-due.template.ts`.
      **Las fechas se calculan desde `start_date`, no sumando períodos a la fecha anterior.** Es lo que hace que el caso del día 31 funcione: sumar un mes al 28/02 recortado dejaría la cuota pegada en el 28 para siempre. Verificado por HTTP la serie real: `31/01 → 28/02 → 31/03 → 30/04 → 31/05 → 30/06 → 31/07`, recuperando el 31 después de cada mes corto.
      Verificado end-to-end por HTTP con Docker real, sobre un crédito de 3 cuotas de $150.000 con 2 períodos ya vencidos: `GET /pending` devolvió las 3 con su "Cuota N de 3"; las 3 confirmaciones crearon transacciones fechadas `2026-07-07`, `2026-08-07` y `2026-09-07` (cada una en su mes, no todas hoy); el saldo bajó de $1.000.000 a $550.000; al llegar a 3 de 3 la recurrencia quedó `active = false` y un cuarto intento devolvió `400`. `skip` avanzó el estado sin crear transacción ni mover el saldo.
      **Caso borde del 31 resuelto**: las fechas se calculan siempre desde `start_date` (`src/common/recurrence.util.ts`), nunca sumando un período a la fecha anterior. Sumar un mes al 28/02 recortado dejaría la recurrencia pegada en el 28 para siempre; anclando al día de inicio la serie da 31/01 → 28/02 → 31/03. Cubierto por `recurrence.util.spec.ts` (13 tests, incluye año bisiesto y el 29/02 anual).
      La confirmación reserva la cuota con un `updateMany` condicionado a `installments_generated` (concurrencia optimista): dos confirmaciones simultáneas de la misma cuota no pueden duplicar el movimiento, la segunda corta con 409. Si la creación de la transacción falla después de reservar, la reserva se revierte.
      Verificado end-to-end por HTTP contra la BD local con Docker: 71 verificaciones sobre el flujo completo (2 cuotas vencidas detectadas, confirmación con fecha/saldo/log correctos, cierre automático al llegar a la última cuota, `skip` sin mover saldo, la serie del 31 de enero ida y vuelta por la columna `DATE`, toggle, edición, aislamiento entre usuarios y rechazo de entradas inválidas), más el job del cron con push y correo simulados (agrupa las cuotas del día por usuario, ignora las de mañana y las pausadas, y un fallo de envío en un usuario no corta el procesamiento del resto).

- [x] **Proyección en metas de ahorro**
      **El bloqueante era que los abonos y retiros no dejaban rastro**: solo se actualizaba `current_amount`, así que no había forma de saber a qué ritmo ahorra el usuario. Se agregó `savings_goal_movements` (migración `20260907135125_add_savings_goal_movements`), que registra cada movimiento **dentro de la misma transacción** que actualiza el monto, para que no puedan desincronizarse. Beneficio extra: `GET /savings-goals/:id/movements` da el historial de aportes por meta.
      La proyección se calcula sobre el aporte neto mensual de los últimos 6 meses y viaja dentro de `formatGoal`, así que aparece en todos los endpoints de metas sin llamadas extra. El campo `rate_basis` distingue si el número sale de movimientos reales (`movements`), de la estimación de compatibilidad para metas viejas sin historial (`estimated`) o de que no hay con qué calcular (`none`) — para que el frontend pueda ser honesto sobre la precisión en vez de mostrar una fecha inventada con cara de certeza.
      Casos borde cubiertos: ritmo cero o negativo (`stalled`, sin dividir por cero ni proyectar infinito), plazo vencido, meta completada, meta de menos de un mes, y un tope de 1200 meses para no informar "la alcanzás en 59.994 meses".
      **Bug preexistente corregido**: `deposit`/`withdraw` recibían `@Body('amount')` sin validación, así que un monto ausente o no numérico entraba como `NaN` y **corrompía `current_amount`**. Ahora se rechaza con `400`.
      Verificado end-to-end por HTTP con Docker real: meta nueva sin aportes informa honestamente que no hay ritmo; con un abono de $300.000 proyecta 9 meses con fecha concreta y `rate_basis: movements`; con plazo a 6 meses detecta que al ritmo actual llega tarde y sugiere $183.333,33 mensuales; montos inválidos rechazados sin tocar el saldo; y **una meta cuyo único movimiento en ventana es un retiro queda en `stalled` con `rate_basis: movements`**, sin caer al fallback optimista — ese era el error sutil que el agente detectó y resolvió con una segunda consulta agregada.

- [x] **Resumen mensual por correo**
      Módulo `src/reports/`. Cron el día 1 que envía el resumen del mes cerrado **solo a usuarios con al menos una transacción en ese mes** (no tiene sentido mandar un resumen vacío), procesando de a uno con try/catch individual para que un fallo no corte el envío al resto. Plantilla `monthly-summary.template.ts`.
      Además de la lógica del roadmap se agregó **`GET /reports/monthly-summary`**, que devuelve el resumen del mes anterior o el de un mes puntual. La razón: en Render gratuito el servicio se duerme y el cron puede no ejecutarse; con el endpoint el resumen no se pierde, el usuario lo ve igual al entrar. Mismo criterio de auto-reparación que las cuotas recurrentes.
      Verificado end-to-end por HTTP con Docker real: totales correctos (ingresos $900.000, gastos $200.000, balance $700.000), desglose por categoría, y la comparación intermensual bien calculada (gastos $300.000 contra $200.000 del mes previo dio `+50%`, ingresos `-100%`). El caso borde de un mes anterior sin movimientos devuelve `percentage: null`, no infinito ni `NaN`.

- [x] **Mejoras en deudas compartidas**
      **Cambio de comportamiento**: antes el deudor se marcaba como pagado por su cuenta y la deuda quedaba saldada sin que el acreedor supiera nada. Ahora son dos pasos — `PUT /debts/:debtId/pay` **declara** el pago (misma ruta, significado nuevo) y solo `PUT /debts/:debtId/splits/:splitId/confirm` la salda. Migración `20260907142510_add_shared_debt_payment_confirmation`: `is_paid` se conserva como flag final y se suman `payment_declared_at` / `payment_confirmed_at`, así el estado se deriva sin romper lo que ya leía el booleano.
      Se agregó un endpoint de **rechazo** que no estaba en el roadmap pero hace falta: sin él, una declaración equivocada dejaba la deuda trabada sin salida. El rechazo la devuelve a pendiente y avisa al deudor, con un motivo opcional que viaja en la notificación.
      Recordatorio semanal por cron **solo a quien debe**, agrupando todas sus deudas pendientes en un único mensaje en vez de uno por deuda, y excluyendo las ya declaradas o saldadas.
      Verificado end-to-end por HTTP con Docker real, con dos usuarios en un grupo y una deuda al 50/50: declarar deja `is_paid = false`; **el deudor intentando confirmar su propio pago recibe `403`**; el acreedor confirma y recién ahí queda saldada; el rechazo la devuelve a pendiente. Los cuatro correos salieron a la parte correcta en cada paso.

---

## Fase 4 — Funcional: mayor alcance

- [x] **Multi-moneda (CLP y USD)**
      Migración `20260907181418_add_multi_currency`: `user_accounts.currency` (la moneda vive en la cuenta, y sus transacciones la heredan — es el caso real chileno de cuenta corriente en pesos más cuenta en dólares), `users.base_currency` (a qué moneda se convierten los totales agregados) y la tabla `exchange_rates`. Todo aditivo con default `CLP`, así que las cuentas existentes no cambian de significado.
      **El total del dashboard era el problema de fondo**: sumaba la columna `amount` en SQL, y con dos monedas eso mezcla pesos con dólares en un número que no representa nada. La agregación pasó a hacerse en memoria convirtiendo cada movimiento con la cotización de **su fecha**, no la de hoy: el resumen de agosto tiene que dar siempre lo mismo, no cambiar cada vez que se abre. Mismo arreglo en el PDF de exportación, que tenía el mismo defecto.
      Cotizaciones desde **mindicador.cl** (dólar observado del Banco Central, gratis y sin API key). Backfill de 2 años al arrancar si la tabla está vacía, cron de lunes a viernes, y **puesta al día bajo demanda** con cooldown de 1 hora — mismo criterio de auto-reparación que las cuotas recurrentes, porque en Render gratuito el servicio se duerme y el cron puede no correr nunca. Si la API falla se sigue con la última cotización guardada.
      **Las filas de `exchange_rates` son inmutables**: el cron usa `skipDuplicates` y nunca pisa una fecha ya cargada. De eso depende que revertir una transferencia entre monedas descuente exactamente lo mismo que acreditó; si la cotización de esa fecha cambiara, los saldos quedarían con una diferencia imposible de rastrear.
      Fines de semana y feriados no tienen cotización publicada: se usa la última anterior disponible, que es como opera un banco.
      **Cambiar la moneda de una cuenta con movimientos se bloquea con `409`**: reinterpretaría todo el historial en silencio, con los mismos números pasando de pesos a dólares sin que nadie los convierta.
      Verificado end-to-end por HTTP con Docker real, 27 verificaciones: 100 USD del 03-09 convertidos a $93.632 y los mismos 100 USD del 03-08 a $92.842 (cotización histórica, no la de hoy); un gasto del sábado 05-09 resuelto con la cotización del viernes; los saldos de cada cuenta quedando en **su** moneda; una transferencia de $93.632 CLP acreditando exactamente 100,00 USD y su reversión devolviendo ambos saldos al valor exacto anterior; y el camino inverso con moneda base USD ($1.000.000 CLP → US$1.068,01). Exportación Excel con columna Moneda y montos en la moneda original.
      **Fuera de alcance por ahora**: `budgets`, `savings_goals` y `shared_debts` siguen asumiendo la moneda base. Presupuestar o repartir una deuda en dólares requeriría su propia columna de moneda y su propia decisión de producto.

- [x] **Importar cartola bancaria**
      Migración `20260907190000_add_statement_import`: `statement_imports` (lote), `bank_statement_mappings` (mapeo confirmado por usuario y banco) y dos columnas en `transactions` — `statement_import_id` y `import_fingerprint`. Módulo `src/statement-import/`.
      **El problema central era que cada banco usa columnas distintas.** La solución fue no escribir un parser por banco: el destino es fijo y chico —fecha, descripción, monto y si es cargo o abono— y lo único que cambia es de qué columna sale cada cosa. Ese mapeo se adivina por sinónimos normalizados (`N° Operación`, `n operacion` y `N. OPERACION` caen en la misma entrada), se valida contra el contenido, se muestra para confirmar y se guarda por banco. Si un banco cambia el formato, el usuario lo corrige desde la previsualización en vez de esperar un deploy.
      **Importar es siempre en dos pasos**: `POST /statement-imports/preview` no escribe absolutamente nada, y `confirm` reenvía el mismo archivo. Sin estado en el servidor: la interpretación es determinista, así que el mismo archivo con el mismo mapeo da las mismas filas, y la huella impide duplicar si se confirma dos veces.
      **La deduplicación la hace la base**, con un índice único `(user_account_id, import_fingerprint)`: reimportar una cartola que se solapa con otra ya cargada no puede duplicar movimientos. La huella incluye un índice de repetición, así que dos compras idénticas del mismo día se importan las dos y al releer el archivo vuelven a dar las mismas dos huellas. Las transacciones cargadas a mano quedan con huella `null`, y Postgres considera distintos entre sí los `NULL` de un índice único.
      **La importación NO toca el saldo salvo que se pida.** Una cartola es el registro de lo que el banco ya aplicó; sumarle esos movimientos a un saldo que ya los refleja lo dejaría al doble. Con `set_balance_to_closing` el saldo queda igual al de cierre de la cartola, que es lo que uno realmente quiere. `DELETE /statement-imports/:id` deshace el lote completo y restaura el saldo solo si esa importación lo había cambiado.
      Formatos: CSV, XLSX y **XLS legacy**, con SheetJS 0.20.3 instalado desde el CDN oficial y no desde npm, donde el paquete quedó congelado en 0.18.5 (2022) con prototype pollution y ReDoS sin corregir. La contra a tener presente: es una dependencia por URL, así que un corte de `cdn.sheetjs.com` rompe el build en Render.
      **Verificado contra una cartola real de Banco Santander**, que destapó dos fallas imposibles de anticipar sin el archivo: las fechas del detalle vienen **sin año** (`03/08`, con el año solo en el `Desde`/`Hasta` de la cabecera), y el apéndice `Resumen de Comisiones` del final **repite un movimiento ya listado** — importarlo habría creado un cargo de $4.089 que la cuenta nunca tuvo. Ahora el año se deduce del período (resolviendo bien el caso de una cartola que cruza el fin de año) y la tabla se corta donde empieza el primer título de sección, avisando cuántas filas quedaron fuera y bajo qué título.
      La prueba fuerte: la cartola declara sus propios totales, y tras importar los 128 movimientos las sumas cuadran **exacto al peso** contra `Otros cargos` ($4.160.325), `Otros abonos` ($4.042.786) y el saldo final ($819.092). 35 verificaciones end-to-end por HTTP sobre el flujo completo (previsualización sin escrituras, importación, cuadratura, reimportación con 0 nuevos, rechazo de la confirmación repetida, deshacer con restauración de saldo, y reutilización del mapeo guardado), más 68 tests unitarios del parseo, la detección y las huellas.
      **Frontend**: `src/pages/StatementImportPage.tsx`, un asistente de tres pasos con `Stepper` y `Dropzone` de Mantine. El paso de revisión es la razón de ser de la pantalla: muestra cómo se interpretó cada columna con su título real (`Cargo → CHEQUES Y OTROS CARGOS`), la tabla de movimientos ya interpretados, los duplicados marcados y las advertencias. El corrector de mapeo va colapsado y solo se abre solo cuando hay advertencias: en el camino feliz el usuario no tiene por qué pensar en columnas. Enlazado desde la navegación y desde Transacciones.
      **Bug encontrado al probar el corrector**: un `@Transform` REEMPLAZA la conversión de `@Type` en class-transformer, así que el `mapping` llegaba como objeto plano sin metadata de validación y `forbidNonWhitelisted` rechazaba todas sus propiedades. El corrector estaba inutilizable hasta que se construyó la instancia a mano con `plainToInstance`.
      **Fuera de alcance a propósito**: las transacciones importadas quedan **sin categoría**. Adivinarla desde la glosa del banco produciría clasificaciones incorrectas con apariencia de certeza, y corregir una categoría mal puesta cuesta más que asignarla desde cero. Tampoco se sembraron mapeos por defecto para los otros 13 bancos: escribir los nombres de columna de cartolas que nunca vimos sería inventar datos: la detección automática ya cubre el caso general y Santander no necesitó preset.

---

## Notas de secuenciación

- La Fase 0 bloquea casi todo lo demás — conviene cerrarla completa antes de arrancar la Fase 1.
- Dentro de la Fase 1, verificación de email y recuperación de contraseña son independientes entre sí (se pueden hacer en cualquier orden), pero ambas dependen del `MailService`.
- La Fase 2 depende de que la Fase 1 esté cerrada (2FA y notificaciones de seguridad no tienen mucho sentido si el email todavía no está verificado).
- Las Fases 3 y 4 no dependen de las de seguridad — se pueden intercalar si en algún punto preferís priorizar funcionalidad sobre seguridad, o alternar.

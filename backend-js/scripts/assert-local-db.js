/**
 * Guarda de seguridad para comandos destructivos de Prisma.
 *
 * Aborta si `DATABASE_URL` no apunta a una base local. Existe porque el `.env` del proyecto
 * alterna entre la conexión local y la de producción comentando/descomentando líneas: sin esta
 * verificación, un `npm run prisma:reset` hecho por costumbre con la conexión de producción
 * activa borra la base entera sin pedir confirmación (el script usa `--force`).
 *
 * Se ejecuta antes del comando peligroso; si la base no es local, corta con código 1 y el
 * comando encadenado nunca llega a correr.
 */
require('dotenv/config');

/** Hosts considerados locales. `db` es el nombre del servicio Postgres en docker-compose. */
const LOCAL_HOSTS = ['localhost', '127.0.0.1', '::1', 'db'];

const rawUrl = process.env.DATABASE_URL;

if (!rawUrl) {
  console.error('\n  ABORTADO: DATABASE_URL no está definida. No se puede verificar si la base es local.\n');
  process.exit(1);
}

let host;
try {
  host = new URL(rawUrl).hostname;
} catch {
  console.error('\n  ABORTADO: DATABASE_URL no es una URL válida, no se puede verificar el destino.\n');
  process.exit(1);
}

if (!LOCAL_HOSTS.includes(host)) {
  console.error(`
  ABORTADO: este comando destruye la base de datos y DATABASE_URL no apunta a una base local.

    Host de destino: ${host}

  Si de verdad querés correrlo contra esa base, ejecutá el comando de Prisma directamente
  en vez de este script de npm. Esta guarda solo evita el borrado accidental por costumbre.
`);
  process.exit(1);
}

console.log(`Base local confirmada (${host}), continuando.`);

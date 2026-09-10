/**
 * Normaliza el valor de un selector de fecha al formato `YYYY-MM-DD` que espera la API.
 *
 * Acepta string o `Date` porque conviven las dos formas: desde Mantine 8 el `DateInput` entrega
 * un string `YYYY-MM-DD`, mientras que algunos formularios todavía guardan objetos `Date`.
 *
 * La conversión de un `Date` se hace con sus componentes locales y no con `toISOString()`, que
 * pasa por UTC: para alguien en Chile, una fecha elegida de noche se guardaba con el día anterior.
 *
 * @param value valor crudo del selector
 * @returns la fecha en `YYYY-MM-DD`, o `null` si no hay valor utilizable
 */
export function toDateParam(value: string | Date | null | undefined): string | null {
    if (!value) return null;

    if (typeof value === 'string') {
        return value.slice(0, 10) || null;
    }

    if (Number.isNaN(value.getTime())) return null;

    const mes = String(value.getMonth() + 1).padStart(2, '0');
    const dia = String(value.getDate()).padStart(2, '0');
    return `${value.getFullYear()}-${mes}-${dia}`;
}

/**
 * Formatea una fecha de la API como `DD-MM-YYYY` para mostrarla en pantalla.
 *
 * Se leen los componentes del texto en vez de construir un `Date`: la API entrega las fechas
 * puras como medianoche UTC (`2026-09-09T00:00:00.000Z`), y en Chile —UTC-3— eso cae la tarde
 * del día anterior, así que cada movimiento se veía fechado un día antes de lo que es.
 *
 * @param value fecha de la API, en ISO o `YYYY-MM-DD`
 * @returns la fecha en `DD-MM-YYYY`, o cadena vacía si no hay valor
 */
export function formatDateDisplay(value: string | null | undefined): string {
    if (!value) return '';

    const [anio, mes, dia] = value.slice(0, 10).split('-');
    if (!anio || !mes || !dia) return '';

    return `${dia}-${mes}-${anio}`;
}

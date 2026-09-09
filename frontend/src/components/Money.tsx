/**
 * Money.tsx — Componente React para mostrar montos formateados.
 *
 * Uso:
 *   <Money amount={85000} currency="CLP" />          → $85.000
 *   <Money amount={1068.01} currency="USD" />         → US$1.068,01
 *   <Money amount={85000} currency="CLP" compact />   → $85k
 *   <Money amount={-5000} currency="CLP" c="red" />   → -$5.000 (en rojo)
 */
import { Text, type TextProps } from '@mantine/core';
import { formatMoney, type SupportedCurrency } from '../utils/money';

interface MoneyProps extends Omit<TextProps, 'children'> {
  /** Monto numérico */
  amount: number;
  /** Código ISO 4217. Por defecto 'CLP'. */
  currency?: SupportedCurrency | string;
  /** Si es true, usa formato compacto (k, M). Útil para ejes de gráficos. */
  compact?: boolean;
}

/**
 * Muestra un monto formateado según las reglas de Pfinance.
 * Hereda todos los props de Mantine <Text> para color, peso, tamaño, etc.
 */
export default function Money({ amount, currency = 'CLP', compact = false, ...textProps }: MoneyProps) {
  return <Text {...textProps}>{formatMoney(amount, currency, { compact })}</Text>;
}

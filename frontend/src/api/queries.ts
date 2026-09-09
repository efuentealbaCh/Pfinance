import { createElement } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { IconAlertTriangle, IconCoin, IconTrophy } from '@tabler/icons-react';
import type { AxiosError } from 'axios';
import api from './axios';

// ─── TYPES ──────────────────────────────────────────────────
/** Consumo de un presupuesto en su período, tal como lo aplana el dashboard. */
export interface BudgetProgress {
  id: string;
  category_name: string;
  category_icon: string | null;
  amount: number;
  spent: number;
  percentage: number;
  period: 'weekly' | 'monthly' | 'yearly' | string;
  /** `true` cuando el consumo llegó al umbral de aviso (80%). Lo resuelve el backend. */
  alert: boolean;
}

/** Progreso de una meta de ahorro. */
export interface SavingsGoalProgress {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  current_amount: number;
  target_amount: number;
  percentage: number;
  is_completed: boolean;
}

export interface SummaryData {
  /**
   * `currency` es la moneda en la que están expresados TODOS los montos del panel: el backend
   * convierte cada cuenta a la moneda base del usuario antes de sumarlas, así que no es
   * necesariamente la moneda de las cuentas que los originaron.
   */
  summary: { totalIncome: number; totalExpense: number; balance: number; currency: string };
  expensesByCategory: Array<{ name: string; total: number; color: string }>;
  chartData: Array<{ date: string; income: number; expense: number }>;
  budgetProgress: BudgetProgress[];
  savingsGoals: SavingsGoalProgress[];
}

export interface PaginatedTransactions {
  data: any[];
  current_page: number;
  last_page: number;
  total: number;
}

// ─── WEB PUSH ────────────────────────────────────────────────
export const getVapidPublicKey = async () => {
  const response = await api.get('/vapid-public-key');
  return response.data.key;
};

export const usePushSubscribe = () => {
  return useMutation({
    mutationFn: async (subscriptionData: any) => {
      const response = await api.post('/push-subscribe', subscriptionData);
      return response.data;
    },
  });
};

/**
 * Da de baja la suscripción de este browser en el servidor.
 *
 * Es la mitad servidor de la baja: cancelarla solo en el navegador dejaría la fila viva en la
 * base, y el backend seguiría intentando enviar a un endpoint muerto.
 */
export const usePushUnsubscribe = () => {
  return useMutation<{ message: string }, ApiError, string>({
    mutationFn: async (endpoint) => {
      const response = await api.post('/push-unsubscribe', { endpoint });
      return response.data;
    },
  });
};

// ─── GROUPS AND SHARED DEBTS ──────────────────────────────────
export const useGroups = () => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const response = await api.get('/groups');
      return response.data;
    },
  });
};

export const useGroup = (id: string) => {
  return useQuery({
    queryKey: ['groups', id],
    queryFn: async () => {
      const response = await api.get(`/groups/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/groups', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};

export const useInviteUser = () => {
  return useMutation({
    mutationFn: async ({ groupId, email }: { groupId: string; email: string }) => {
      const response = await api.post(`/groups/${groupId}/invite`, { email });
      return response.data;
    },
  });
};

export const usePendingInvitations = () => {
  return useQuery({
    queryKey: ['groups', 'invitations', 'pending'],
    queryFn: async () => {
      const response = await api.get('/groups/invitations');
      return response.data;
    },
  });
};

export const useAcceptInvite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (groupId: string) => {
      const response = await api.post(`/groups/${groupId}/accept`);
      return response.data;
    },
    onSuccess: (_, groupId) => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      queryClient.invalidateQueries({ queryKey: ['groups', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groups', 'invitations', 'pending'] });
    },
  });
};

export const useRejectInvite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (groupId: string) => {
      const response = await api.post(`/groups/${groupId}/reject`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups', 'invitations', 'pending'] });
    },
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ groupId, userId }: { groupId: string; userId: string }) => {
      const response = await api.delete(`/groups/${groupId}/members/${userId}`);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['groups', variables.groupId] });
    },
  });
};

export const useCreateSharedDebt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ groupId, data }: { groupId: string; data: any }) => {
      const response = await api.post(`/groups/${groupId}/debts`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['groups', variables.groupId] });
    },
  });
};

/** Estado de una parte de deuda, derivado en el backend a partir de `is_paid` y las fechas del flujo. */
export type SplitStatus = 'pending' | 'awaiting_confirmation' | 'paid';

/**
 * Primer paso: el deudor declara que pagó su parte.
 *
 * No salda la deuda — queda esperando que el acreedor confirme. El nombre del hook dice
 * "declarar" y no "pagar" a propósito: la ruta `/pay` se mantuvo por compatibilidad, pero
 * su significado cambió y llamarlo "pagar" acá volvería a esconder el segundo paso.
 */
export const useDeclareDebtPayment = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError<{ message?: string }>, { debtId: string; groupId: string }>({
    mutationFn: async ({ debtId }) => {
      const response = await api.put(`/debts/${debtId}/pay`);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['groups', variables.groupId] });
    },
  });
};

/** Segundo paso: el acreedor confirma que recibió el pago y la parte queda saldada. */
export const useConfirmDebtPayment = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError<{ message?: string }>, { debtId: string; splitId: string; groupId: string }>({
    mutationFn: async ({ debtId, splitId }) => {
      const response = await api.put(`/debts/${debtId}/splits/${splitId}/confirm`);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['groups', variables.groupId] });
    },
  });
};

/** Salida del flujo: el acreedor rechaza la declaración y la parte vuelve a pendiente. */
export const useRejectDebtPayment = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<{ message?: string }>,
    { debtId: string; splitId: string; groupId: string; reason?: string }
  >({
    mutationFn: async ({ debtId, splitId, reason }) => {
      const response = await api.put(`/debts/${debtId}/splits/${splitId}/reject`, reason ? { reason } : {});
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['groups', variables.groupId] });
    },
  });
};

// ─── DASHBOARD ─────────────────────────────────────────────
export const useDashboardSummary = (filters?: Record<string, any>) => {
  return useQuery<SummaryData>({
    queryKey: ['dashboardSummary', filters],
    queryFn: async () => {
      const response = await api.get('/dashboard/summary', { params: filters });
      return response.data;
    },
  });
};

// ─── TRANSACTIONS ──────────────────────────────────────────
export const useTransactions = (filters?: Record<string, any>) => {
  return useQuery<PaginatedTransactions>({
    queryKey: ['transactions', filters],
    queryFn: async () => {
      const response = await api.get('/transactions', { params: filters });
      return response.data;
    },
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/transactions', data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardSummary'] });

      // Alertas Inteligentes
      if (data.warnings && data.warnings.length > 0) {
        data.warnings.forEach((warning: string) => {
          notifications.show({
            title: 'Presupuesto en riesgo',
            message: warning,
            color: 'orange',
            icon: createElement(IconAlertTriangle, { size: 20 }),
            autoClose: 8000,
          });
        });
      }

      if (data.transaction && data.transaction.type === 'expense' && parseFloat(data.transaction.amount) > 1000) {
        notifications.show({
          title: 'Transacción grande',
          message: `Has registrado un gasto inusualmente alto de $${data.transaction.amount}.`,
          color: 'red',
          icon: createElement(IconCoin, { size: 20 }),
        });
      }
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await api.put(`/transactions/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardSummary'] });

      // Alertas Inteligentes
      if (data.warnings && data.warnings.length > 0) {
        data.warnings.forEach((warning: string) => {
          notifications.show({
            title: 'Presupuesto en riesgo',
            message: warning,
            color: 'orange',
            icon: createElement(IconAlertTriangle, { size: 20 }),
            autoClose: 8000,
          });
        });
      }

      if (data.transaction && data.transaction.type === 'expense' && parseFloat(data.transaction.amount) > 1000) {
        notifications.show({
          title: 'Transacción grande',
          message: `Has registrado un gasto inusualmente alto de $${data.transaction.amount}.`,
          color: 'red',
          icon: createElement(IconCoin, { size: 20 }),
        });
      }
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/transactions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardSummary'] });
    },
  });
};

// ─── CATALOGS (Banks, Account Types, Categories, User Accounts) ──
export const useCatalogs = () => {
  return useQuery({
    queryKey: ['catalogs'],
    queryFn: async () => {
      const [banks, types, categories, userAccounts] = await Promise.all([
        api.get('/banks'),
        api.get('/account-types'),
        api.get('/categories'),
        api.get('/user-accounts'),
      ]);
      return {
        banks: banks.data,
        accountTypes: types.data,
        categories: categories.data,
        userAccounts: userAccounts.data.accounts || userAccounts.data,
      };
    },
    staleTime: 1000 * 60 * 60, // 1 hour for static data
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/categories', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catalogs'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await api.patch(`/categories/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catalogs'] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catalogs'] });
    },
  });
};

// ─── BUDGETS ───────────────────────────────────────────────
export const useBudgets = () => {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: async () => {
      const response = await api.get('/budgets');
      return response.data.budgets || response.data;
    },
  });
};

export const useCreateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/budgets', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await api.put(`/budgets/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/budgets/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};

// ─── SAVINGS GOALS ─────────────────────────────────────────
export const useSavingsGoals = () => {
  return useQuery({
    queryKey: ['savings-goals'],
    queryFn: async () => {
      const response = await api.get('/savings-goals');
      return response.data.goals || response.data.savings_goals || response.data;
    },
  });
};

export const useCreateSavingsGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/savings-goals', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savings-goals'] });
    },
  });
};

// ─── PROFILE ──────────────────────────────────────────────────
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.put('/auth/profile', data);
      return response.data;
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.put('/auth/profile/password', data);
      return response.data;
    },
  });
};

export const useUpdateSavingsGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await api.put(`/savings-goals/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savings-goals'] });
    },
  });
};

export const useDeleteSavingsGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/savings-goals/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savings-goals'] });
    },
  });
};

export const useTransactionSavingsGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, action, amount }: { id: string; action: string; amount: number }) => {
      const response = await api.post(`/savings-goals/${id}/${action}`, { amount });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['savings-goals'] });

      // Alertas Inteligentes
      if (
        data.savings_goal &&
        parseFloat(data.savings_goal.current_amount) >= parseFloat(data.savings_goal.target_amount)
      ) {
        notifications.show({
          title: '¡Meta de Ahorro Alcanzada!',
          message: `Felicidades, has completado tu meta "${data.savings_goal.name}".`,
          color: 'teal',
          icon: createElement(IconTrophy, { size: 20 }),
          autoClose: 10000,
        });
      }
    },
  });
};

// ─── STATEMENT IMPORT ────────────────────────────────────────
/** Papel que cumple una columna de la cartola. */
export type ColumnRole = 'date' | 'description' | 'amount' | 'debit' | 'credit' | 'balance' | 'reference';

/** Cómo expresa el archivo si un movimiento suma o resta. */
export type StatementShape = 'signed' | 'debit_credit';

/** Estructura que el backend detectó en el archivo. */
export interface StatementStructure {
  header_row: number | null;
  first_data_row: number;
  last_data_row: number;
  /** Filas con forma de movimiento que quedaron fuera de la tabla y no se importarán. */
  rows_after_table: number;
  shape: StatementShape;
  positive_means: 'income' | 'expense';
  detected_by: 'headers' | 'content';
  period: { from: string; to: string } | null;
  /** Columna asignada a cada papel, con el título real que trae el archivo. */
  columns: Partial<Record<ColumnRole, { index: number; label: string | null }>>;
  /** Todas las columnas del encabezado, para poder corregir el mapeo a mano. */
  available_columns: Array<{ index: number; label: string }>;
}

/** Una fila ya interpretada, tal como se importaría. */
export interface StatementPreviewRow {
  row_index: number;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  reference: string | null;
  already_imported: boolean;
}

/** Respuesta de la previsualización. Nada de esto se escribió todavía. */
export interface StatementPreview {
  account: { id: string; identifier: string | null; bank: string | null; currency: string; balance: number };
  structure: StatementStructure;
  totals: { detected: number; to_import: number; already_imported: number; skipped: number };
  closing_balance: number | null;
  warnings: string[];
  skipped: Array<{ rowIndex: number; reason: string; preview: string }>;
  rows: StatementPreviewRow[];
  rows_truncated: number;
}

/** Resultado de una importación confirmada. */
export interface StatementImportResult {
  import_id: string;
  imported: number;
  already_imported: number;
  skipped: number;
  balance: { before: number; after: number; changed: boolean };
  mapping_saved: boolean;
}

/** Correcciones de mapeo que el usuario hace desde la previsualización. */
export interface MappingOverride {
  columns?: Partial<Record<ColumnRole, number>>;
  shape?: StatementShape;
  positiveMeans?: 'income' | 'expense';
  firstDataRow?: number;
  lastDataRow?: number;
}

/**
 * Arma el cuerpo multipart. El mapeo viaja como JSON en un campo de texto porque el archivo
 * obliga a usar `multipart/form-data`, donde no hay objetos anidados.
 */
const buildStatementForm = (file: File, accountId: string, mapping?: MappingOverride) => {
  const form = new FormData();
  form.append('file', file);
  form.append('user_account_id', accountId);
  if (mapping && Object.keys(mapping).length > 0) form.append('mapping', JSON.stringify(mapping));
  return form;
};

/**
 * Interpreta la cartola sin escribir nada. Es el paso previo obligatorio: el usuario tiene que
 * ver qué entendió el sistema antes de que se cree ninguna transacción.
 */
export const usePreviewStatement = () => {
  return useMutation<StatementPreview, AxiosError<{ message?: string | string[] }>, { file: File; accountId: string; mapping?: MappingOverride }>({
    mutationFn: async ({ file, accountId, mapping }) => {
      const response = await api.post('/statement-imports/preview', buildStatementForm(file, accountId, mapping), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },
  });
};

/**
 * Importa los movimientos. Se reenvía el mismo archivo porque el backend no guarda la
 * previsualización: la interpretación es determinista y la deduplicación por huella evita que
 * una confirmación repetida duplique nada.
 */
export const useConfirmStatement = () => {
  const queryClient = useQueryClient();
  return useMutation<
    StatementImportResult,
    AxiosError<{ message?: string | string[] }>,
    { file: File; accountId: string; mapping?: MappingOverride; setBalanceToClosing: boolean; saveMapping: boolean }
  >({
    mutationFn: async ({ file, accountId, mapping, setBalanceToClosing, saveMapping }) => {
      const form = buildStatementForm(file, accountId, mapping);
      form.append('set_balance_to_closing', String(setBalanceToClosing));
      form.append('save_mapping', String(saveMapping));

      const response = await api.post('/statement-imports/confirm', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },
    onSuccess: () => {
      // Una importación cambia transacciones, saldos y todo lo que se calcule sobre ellos.
      // Las cuentas viven dentro de `catalogs`, que es de donde salen los saldos en pantalla.
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardSummary'] });
      queryClient.invalidateQueries({ queryKey: ['catalogs'] });
      queryClient.invalidateQueries({ queryKey: ['statement-imports'] });
    },
  });
};

/** Historial de importaciones, para poder revisar o deshacer una anterior. */
export const useStatementImports = () => {
  return useQuery({
    queryKey: ['statement-imports'],
    queryFn: async () => {
      const response = await api.get('/statement-imports');
      return response.data;
    },
  });
};

/** Deshace una importación completa con todas sus transacciones. */
export const useUndoStatementImport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (importId: string) => {
      const response = await api.delete(`/statement-imports/${importId}`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardSummary'] });
      queryClient.invalidateQueries({ queryKey: ['catalogs'] });
      queryClient.invalidateQueries({ queryKey: ['statement-imports'] });

      notifications.show({
        title: 'Importación revertida',
        message: data.message,
        color: 'teal',
      });
    },
  });
};

// ─── ERRORES DE API ──────────────────────────────────────────
/** Error de axios con el cuerpo que devuelve NestJS. */
export type ApiError = AxiosError<{ message?: string | string[] }>;

/**
 * Extrae el mensaje de un error de API para mostrarlo en pantalla.
 *
 * El `ValidationPipe` de NestJS devuelve `message` como arreglo cuando falla la validación del
 * DTO y como string en el resto de los casos; sin este normalizado, el arreglo se renderiza
 * como `"a,b,c"` y se lee pésimo.
 *
 * @param error error capturado en un `onError`
 * @param fallback texto a mostrar si la respuesta no traía mensaje
 */
export const apiErrorMessage = (error: unknown, fallback: string): string => {
  const message = (error as ApiError)?.response?.data?.message;
  if (Array.isArray(message)) return message[0] ?? fallback;
  return message || fallback;
};

// ─── AUTENTICACIÓN Y SEGURIDAD ───────────────────────────────
/** Eventos que registra el backend en `security_logs`. */
export type SecurityEventName =
  | 'login'
  | 'password_changed'
  | 'password_reset'
  | '2fa_enabled'
  | '2fa_disabled'
  | 'profile_updated';

export interface SecurityLogEvent {
  id: string;
  event: SecurityEventName;
  ip: string | null;
  user_agent: string | null;
  created_at: string;
}

/**
 * Verifica el correo con el token que viene en el enlace del email.
 *
 * Va como mutación y no como query aunque el endpoint sea un GET: consume el token (lo borra
 * de la base), así que no puede reintentarse ni refrescarse solo, que es justo lo que haría
 * `useQuery`.
 */
export const useVerifyEmail = () => {
  return useMutation<{ message: string }, ApiError, string>({
    mutationFn: async (token) => {
      const response = await api.get('/auth/verify-email', { params: { token } });
      return response.data;
    },
  });
};

/** Reenvía el correo de verificación. Requiere sesión iniciada; el backend impone 60s de espera. */
export const useResendVerification = () => {
  return useMutation<{ message: string }, ApiError, void>({
    mutationFn: async () => {
      const response = await api.post('/auth/resend-verification');
      return response.data;
    },
  });
};

/** Pide el enlace de recuperación. Responde siempre lo mismo, exista o no el correo. */
export const useForgotPassword = () => {
  return useMutation<{ message: string }, ApiError, string>({
    mutationFn: async (email) => {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    },
  });
};

/** Define la contraseña nueva con el token del enlace de recuperación. */
export const useResetPassword = () => {
  return useMutation<{ message: string }, ApiError, { token: string; password: string }>({
    mutationFn: async (data) => {
      const response = await api.post('/auth/reset-password', data);
      return response.data;
    },
  });
};

/**
 * Inicia la configuración de 2FA y devuelve el QR a escanear.
 *
 * Genera un secreto nuevo cada vez que se llama, así que solo debe dispararse cuando el
 * usuario decide activar 2FA — no al abrir la pantalla de perfil.
 */
export const useSetup2fa = () => {
  return useMutation<{ qrCode: string; secret: string }, ApiError, void>({
    mutationFn: async () => {
      const response = await api.post('/auth/2fa/setup');
      return response.data;
    },
  });
};

/** Confirma el primer código y activa 2FA. */
export const useConfirm2fa = () => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, ApiError, string>({
    mutationFn: async (code) => {
      const response = await api.post('/auth/2fa/confirm', { code });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-log'] });
    },
  });
};

/** Desactiva 2FA. Pide la contraseña actual como segunda barrera. */
export const useDisable2fa = () => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, ApiError, string>({
    mutationFn: async (password) => {
      const response = await api.post('/auth/2fa/disable', { password });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-log'] });
    },
  });
};

/** Historial de eventos sensibles de la propia cuenta (últimos 50). */
export const useSecurityLog = () => {
  return useQuery<{ events: SecurityLogEvent[] }>({
    queryKey: ['security-log'],
    queryFn: async () => {
      const response = await api.get('/auth/security-log');
      return response.data;
    },
  });
};

// ─── TRANSACCIONES RECURRENTES ───────────────────────────────
/** Frecuencias que acepta el backend. */
export type RecurrenceFrequency = 'weekly' | 'biweekly' | 'monthly' | 'yearly';

export interface RecurringTransaction {
  id: string;
  user_account_id: string;
  category_id: string | null;
  type: 'income' | 'expense';
  amount: number;
  description: string | null;
  frequency: RecurrenceFrequency;
  start_date: string;
  next_run_date: string;
  installments_total: number | null;
  installments_generated: number;
  active: boolean;
  /** `"8 de 36"` en un crédito; `null` en una suscripción indefinida. */
  installments_progress: string | null;
  installments_remaining: number | null;
  /** Cuotas vencidas sin confirmar al momento de la consulta. */
  pending_count: number;
  category: { id: string; name: string; color?: string | null } | null;
  user_account?: { id: string; identifier: string | null; currency?: string; bank?: { name: string } | null };
}

/** Una cuota vencida. No existe como fila: se deriva comparando `next_run_date` contra hoy. */
export interface PendingRecurrence {
  recurring_transaction_id: string;
  date: string;
  type: 'income' | 'expense';
  amount: number;
  description: string | null;
  frequency: RecurrenceFrequency;
  installment_number: number;
  installments_total: number | null;
  installments_progress: string | null;
  category: { id: string; name: string; color?: string | null } | null;
  user_account?: { id: string; identifier: string | null; currency?: string; bank?: { name: string } | null };
}

/**
 * Invalida todo lo que cambia al confirmar una cuota: la transacción real que se crea toca
 * saldos (que viven en `catalogs`), el dashboard y el listado de movimientos.
 */
const invalidateAfterRecurrenceRun = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: ['recurring-transactions'] });
  queryClient.invalidateQueries({ queryKey: ['transactions'] });
  queryClient.invalidateQueries({ queryKey: ['dashboardSummary'] });
  queryClient.invalidateQueries({ queryKey: ['catalogs'] });
};

export const useRecurringTransactions = () => {
  return useQuery<{ recurring_transactions: RecurringTransaction[] }>({
    queryKey: ['recurring-transactions'],
    queryFn: async () => {
      const response = await api.get('/recurring-transactions');
      return response.data;
    },
  });
};

export const usePendingRecurrences = () => {
  return useQuery<{ pending: PendingRecurrence[]; total: number }>({
    queryKey: ['recurring-transactions', 'pending'],
    queryFn: async () => {
      const response = await api.get('/recurring-transactions/pending');
      return response.data;
    },
  });
};

export const useCreateRecurringTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation<any, ApiError, Record<string, any>>({
    mutationFn: async (data) => {
      const response = await api.post('/recurring-transactions', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring-transactions'] });
    },
  });
};

export const useUpdateRecurringTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation<any, ApiError, { id: string; data: Record<string, any> }>({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/recurring-transactions/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring-transactions'] });
    },
  });
};

export const useDeleteRecurringTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation<any, ApiError, string>({
    mutationFn: async (id) => {
      const response = await api.delete(`/recurring-transactions/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring-transactions'] });
    },
  });
};

/** Pausa o reanuda una recurrencia. Una pausada no acumula cuotas vencidas. */
export const useToggleRecurringTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation<any, ApiError, string>({
    mutationFn: async (id) => {
      const response = await api.patch(`/recurring-transactions/${id}/toggle`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring-transactions'] });
    },
  });
};

/** Confirma la cuota vencida más antigua: crea la transacción real y avanza el estado. */
export const useConfirmRecurrence = () => {
  const queryClient = useQueryClient();
  return useMutation<any, ApiError, string>({
    mutationFn: async (id) => {
      const response = await api.post(`/recurring-transactions/${id}/confirm`);
      return response.data;
    },
    onSuccess: (data) => {
      invalidateAfterRecurrenceRun(queryClient);

      (data.warnings ?? []).forEach((warning: string) => {
        notifications.show({
          title: 'Presupuesto en riesgo',
          message: warning,
          color: 'orange',
          icon: createElement(IconAlertTriangle, { size: 20 }),
          autoClose: 8000,
        });
      });
    },
  });
};

/** Omite la cuota vencida más antigua sin crear ninguna transacción. */
export const useSkipRecurrence = () => {
  const queryClient = useQueryClient();
  return useMutation<any, ApiError, string>({
    mutationFn: async (id) => {
      const response = await api.post(`/recurring-transactions/${id}/skip`);
      return response.data;
    },
    onSuccess: () => {
      invalidateAfterRecurrenceRun(queryClient);
    },
  });
};

// ─── RESUMEN MENSUAL ─────────────────────────────────────────
/** Variación de un total contra el mes anterior. `percentage` es null si el mes previo fue 0. */
export interface MonthlyVariation {
  previous: number;
  difference: number;
  percentage: number | null;
  direction: 'up' | 'down' | 'flat';
}

export interface MonthlySummary {
  month: { key: string; from: string; to: string };
  previous_month: { key: string; from: string; to: string };
  /** Moneda en la que están expresados todos los montos del resumen. */
  currency: string;
  totals: { income: number; expense: number; balance: number; transactions_count: number };
  previous_totals: { income: number; expense: number; balance: number };
  comparison: { income: MonthlyVariation; expense: MonthlyVariation };
  expenses_by_category: Array<{ name: string; color: string; total: number; percentage: number }>;
  has_activity: boolean;
}

/**
 * Resumen mensual bajo demanda.
 *
 * @param month mes en `YYYY-MM`; si se omite, el backend usa el mes anterior al actual
 */
export const useMonthlySummary = (month?: string) => {
  return useQuery<MonthlySummary>({
    queryKey: ['monthly-summary', month],
    queryFn: async () => {
      const response = await api.get('/reports/monthly-summary', { params: month ? { month } : undefined });
      return response.data;
    },
  });
};

// ─── MONEDAS ─────────────────────────────────────────────────
export interface CurrencyOption {
  code: string;
  decimals: number;
}

/**
 * Monedas soportadas. Salen del backend en vez de estar hardcodeadas para que agregar una
 * moneda nueva no requiera tocar el frontend.
 */
export const useCurrencies = () => {
  return useQuery<{ currencies: CurrencyOption[] }>({
    queryKey: ['currencies'],
    queryFn: async () => {
      const response = await api.get('/currencies');
      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });
};

/** Última cotización conocida de un par, para mostrar con qué valor se convierten los totales. */
export const useLatestExchangeRate = (from = 'USD', to = 'CLP') => {
  return useQuery<{ from: string; to: string; rate: number | null; date: string | null }>({
    queryKey: ['exchange-rate', from, to],
    queryFn: async () => {
      const response = await api.get('/exchange-rates/latest', { params: { from, to } });
      return response.data;
    },
  });
};

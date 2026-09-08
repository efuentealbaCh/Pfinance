import { createElement } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { IconAlertTriangle, IconCoin, IconTrophy } from '@tabler/icons-react';
import type { AxiosError } from 'axios';
import api from './axios';

// ─── TYPES ──────────────────────────────────────────────────
export interface SummaryData {
  summary: { totalIncome: number; totalExpense: number; balance: number };
  expensesByCategory: Array<{ name: string; total: number; color: string }>;
  chartData: Array<{ date: string; income: number; expense: number }>;
  budgetProgress: Array<any>;
  savingsGoals: Array<any>;
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
      const response = await api.get('/groups/invitations/pending');
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

export const usePaySharedDebt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ debtId }: { debtId: string; groupId: string }) => {
      const response = await api.put(`/debts/${debtId}/pay`);
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
      const response = await api.put(`/categories/${id}`, data);
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

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
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
            icon: '⚠️',
            autoClose: 8000,
          });
        });
      }

      if (data.transaction && data.transaction.type === 'expense' && parseFloat(data.transaction.amount) > 1000) {
        notifications.show({
          title: 'Transacción grande',
          message: `Has registrado un gasto inusualmente alto de $${data.transaction.amount}.`,
          color: 'red',
          icon: '💸',
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
            icon: '⚠️',
            autoClose: 8000,
          });
        });
      }

      if (data.transaction && data.transaction.type === 'expense' && parseFloat(data.transaction.amount) > 1000) {
        notifications.show({
          title: 'Transacción grande',
          message: `Has registrado un gasto inusualmente alto de $${data.transaction.amount}.`,
          color: 'red',
          icon: '💸',
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
          title: '¡Meta de Ahorro Alcanzada! 🎉',
          message: `Felicidades, has completado tu meta "${data.savings_goal.name}".`,
          color: 'teal',
          icon: '🏆',
          autoClose: 10000,
        });
      }
    },
  });
};

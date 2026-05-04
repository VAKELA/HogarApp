import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { useAuth } from '@/providers/auth-provider';

export interface TaskDefinition {
  id: string;
  title: string;
  description?: string;
  category?: string;
  priority?: string;
  isRecurring: boolean;
  recurrencePattern?: string;
  dueDate?: string;
  assignees?: Array<{ id: string; name: string }>;
  createdAt: string;
}

export function useTasks(filters?: { category?: string; isRecurring?: boolean }) {
  const { user } = useAuth();
  const householdId = user?.user_metadata?.householdId as string | undefined;

  const params = new URLSearchParams();
  if (filters?.category) params.set('category', filters.category);
  if (filters?.isRecurring !== undefined) params.set('isRecurring', String(filters.isRecurring));
  const qs = params.toString() ? `?${params.toString()}` : '';

  return useQuery<TaskDefinition[]>({
    queryKey: ['tasks', householdId, filters],
    queryFn: () => api.get(`/households/${householdId}/tasks${qs}`),
    enabled: !!householdId,
  });
}

export function useCreateTask() {
  const { user } = useAuth();
  const householdId = user?.user_metadata?.householdId as string | undefined;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      api.post(`/households/${householdId}/tasks`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useUpdateTask() {
  const { user } = useAuth();
  const householdId = user?.user_metadata?.householdId as string | undefined;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Record<string, unknown> }) =>
      api.patch(`/households/${householdId}/tasks/${taskId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useDeleteTask() {
  const { user } = useAuth();
  const householdId = user?.user_metadata?.householdId as string | undefined;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) =>
      api.delete(`/households/${householdId}/tasks/${taskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useCompleteInstance() {
  const { user } = useAuth();
  const householdId = user?.user_metadata?.householdId as string | undefined;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (instanceId: string) =>
      api.patch(`/households/${householdId}/instances/${instanceId}/complete`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useSkipInstance() {
  const { user } = useAuth();
  const householdId = user?.user_metadata?.householdId as string | undefined;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (instanceId: string) =>
      api.patch(`/households/${householdId}/instances/${instanceId}/skip`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

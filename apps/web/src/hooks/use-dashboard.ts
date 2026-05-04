import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { useAuth } from '@/providers/auth-provider';

export interface TaskInstance {
  id: string;
  taskId: string;
  title: string;
  description?: string;
  category?: string;
  priority?: string;
  dueDate?: string;
  dueTime?: string;
  status: 'pending' | 'completed' | 'skipped';
  assignee?: {
    id: string;
    name: string;
  };
}

export interface Member {
  id: string;
  name: string;
  avatar?: string;
}

export interface DashboardData {
  date: string;
  tasks: TaskInstance[];
  progress: {
    total: number;
    completed: number;
    skipped: number;
    pending: number;
  };
  members: Member[];
}

export function useDashboard() {
  const { user } = useAuth();
  const householdId = user?.user_metadata?.householdId as string | undefined;

  return useQuery<DashboardData>({
    queryKey: ['dashboard', householdId],
    queryFn: () => api.get(`/households/${householdId}/dashboard`),
    enabled: !!householdId,
    refetchInterval: 30000,
  });
}

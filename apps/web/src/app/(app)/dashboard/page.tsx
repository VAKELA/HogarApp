'use client';

import { useAuth } from '@/providers/auth-provider';
import { useDashboard } from '@/hooks/use-dashboard';
import { useCompleteInstance, useSkipInstance } from '@/hooks/use-tasks';
import { TaskBadge } from '@/components/task-badge';
import { ProgressBar } from '@/components/progress-bar';
import {
  CheckCircle,
  Circle,
  SkipForward,
  Coffee,
  Sun,
  Moon,
  ClipboardList,
} from 'lucide-react';

function getGreeting(): { text: string; Icon: typeof Sun } {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Buenos días', Icon: Coffee as unknown as typeof Sun };
  if (hour < 20) return { text: 'Buenas tardes', Icon: Sun };
  return { text: 'Buenas noches', Icon: Moon as unknown as typeof Sun };
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Greeting skeleton */}
      <div className="h-8 w-64 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-48 rounded bg-gray-200 dark:bg-gray-700" />

      {/* Progress skeleton */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-3 h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Task list skeleton */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="mb-2 h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, error } = useDashboard();
  const completeMutation = useCompleteInstance();
  const skipMutation = useSkipInstance();

  const { text: greetingText, Icon: GreetingIcon } = getGreeting();
  const userName =
    (user?.user_metadata?.name as string) ||
    user?.email?.split('@')[0] ||
    'Usuario';

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ClipboardList className="mb-4 h-12 w-12 text-red-400" />
        <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
          No pudimos cargar tus tareas
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Intenta recargar la página más tarde.
        </p>
      </div>
    );
  }

  const progress = data?.progress ?? { total: 0, completed: 0, skipped: 0, pending: 0 };
  const tasks = data?.tasks ?? [];

  const pendingTasks = tasks.filter((t) => t.status === 'pending');
  const completedTasks = tasks.filter((t) => t.status === 'completed');
  const skippedTasks = tasks.filter((t) => t.status === 'skipped');

  const noTasks = tasks.length === 0;

  return (
    <div className="space-y-6 pb-8">
      {/* Greeting */}
      <div className="flex items-center gap-3">
        <GreetingIcon className="h-7 w-7 text-amber-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {greetingText}, {userName}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Progreso del día
        </h2>
        <ProgressBar
          completed={progress.completed}
          total={progress.total}
          skipped={progress.skipped}
        />
      </div>

      {/* Empty state */}
      {noTasks && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <ClipboardList className="mb-4 h-14 w-14 text-gray-300 dark:text-gray-600" />
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            ¡Día libre!
          </p>
          <p className="mt-1 text-sm text-gray-500">
            No tienes tareas para hoy.
          </p>
        </div>
      )}

      {/* Pending tasks */}
      {pendingTasks.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Pendientes ({pendingTasks.length})
          </h2>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={() => completeMutation.mutate(task.id)}
                onSkip={() => skipMutation.mutate(task.id)}
                isPending
              />
            ))}
          </div>
        </section>
      )}

      {/* Completed tasks */}
      {completedTasks.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Completadas ({completedTasks.length})
          </h2>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </section>
      )}

      {/* Skipped tasks */}
      {skippedTasks.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Omitidas ({skippedTasks.length})
          </h2>
          <div className="space-y-3">
            {skippedTasks.map((task) => (
              <TaskCard key={task.id} task={task} isSkipped />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function TaskCard({
  task,
  onComplete,
  onSkip,
  isPending,
  isSkipped,
}: {
  task: {
    id: string;
    title: string;
    category?: string;
    priority?: string;
    dueTime?: string;
    assignee?: { id: string; name: string };
  };
  onComplete?: () => void;
  onSkip?: () => void;
  isPending?: boolean;
  isSkipped?: boolean;
}) {
  const loading = false; // individual loading state could be added per mutation

  return (
    <div
      className={`rounded-xl border bg-white p-4 shadow-sm transition-all dark:bg-gray-900 ${
        isPending
          ? 'border-gray-200 dark:border-gray-700'
          : isSkipped
            ? 'border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-900/10'
            : 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {isPending ? (
              <Circle className="h-5 w-5 shrink-0 text-gray-400" />
            ) : isSkipped ? (
              <SkipForward className="h-5 w-5 shrink-0 text-yellow-500" />
            ) : (
              <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
            )}
            <h3
              className={`text-sm font-medium ${
                !isPending
                  ? 'text-gray-500 line-through dark:text-gray-400'
                  : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {task.title}
            </h3>
          </div>

          <div className="ml-7 mt-2 flex flex-wrap items-center gap-2">
            <TaskBadge category={task.category} />
            {task.dueTime && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {task.dueTime}
              </span>
            )}
            {task.priority && isPending && (
              <PriorityBadge priority={task.priority} />
            )}
            {task.assignee && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {task.assignee.name}
              </span>
            )}
          </div>
        </div>

        {/* Quick actions for pending tasks */}
        {isPending && (
          <div className="flex shrink-0 flex-col gap-1.5">
            {onComplete && (
              <button
                onClick={onComplete}
                disabled={loading}
                className="inline-flex items-center gap-1 rounded-md bg-green-600 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Completar</span>
              </button>
            )}
            {onSkip && (
              <button
                onClick={onSkip}
                disabled={loading}
                className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <SkipForward className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Omitir</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    Urgente: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Alta: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    Media: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Baja: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  };

  const className = styles[priority] ?? styles.Baja;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {priority}
    </span>
  );
}

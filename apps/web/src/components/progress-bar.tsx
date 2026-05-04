'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  completed: number;
  total: number;
  skipped?: number;
  className?: string;
}

export function ProgressBar({ completed, total, skipped = 0, className }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const skippedPct = total > 0 ? Math.round((skipped / total) * 100) : 0;
  const remainingPct = Math.max(0, 100 - pct - skippedPct);

  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {completed} de {total} tareas
        </span>
        <span className="text-gray-500 dark:text-gray-400">{pct}%</span>
      </div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
        {skipped > 0 && (
          <div
            className="bg-yellow-400 transition-all duration-500 ease-out"
            style={{ width: `${skippedPct}%` }}
          />
        )}
        {remainingPct > 0 && (
          <div
            className="bg-gray-300 dark:bg-gray-600"
            style={{ width: `${remainingPct}%` }}
          />
        )}
      </div>
      <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          Completadas
        </span>
        {skipped > 0 && (
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-yellow-400" />
            Omitidas
          </span>
        )}
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
          Pendientes
        </span>
      </div>
    </div>
  );
}

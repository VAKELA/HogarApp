import { cn } from '@/lib/utils';

const categoryStyles: Record<string, { label: string; className: string }> = {
  COCINA: {
    label: 'Cocina',
    className:
      'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800',
  },
  LIMPIEZA: {
    label: 'Limpieza',
    className:
      'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
  },
  COMPRAS: {
    label: 'Compras',
    className:
      'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
  },
  MANTENIMIENTO: {
    label: 'Mantenimiento',
    className:
      'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
  },
  ORGANIZACIÓN: {
    label: 'Organización',
    className:
      'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800',
  },
  OTRA: {
    label: 'Otra',
    className:
      'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700',
  },
};

interface TaskBadgeProps {
  category?: string | null;
  className?: string;
}

export function TaskBadge({ category, className }: TaskBadgeProps) {
  if (!category) return null;

  const config = (categoryStyles[category.toUpperCase()] ?? categoryStyles.OTRA)!;
  const displayLabel = config.label;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
        config.className,
        className,
      )}
    >
      {displayLabel}
    </span>
  );
}

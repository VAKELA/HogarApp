'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { useAuth } from '@/providers/auth-provider';
import { useDashboard } from '@/hooks/use-dashboard';
import { TaskBadge } from '@/components/task-badge';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  CalendarDays,
} from 'lucide-react';

const DAY_HEADERS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

interface CalendarDay {
  date: string;
  tasks: Array<{
    id: string;
    title: string;
    category?: string;
    time?: string;
  }>;
}

interface CalendarResponse {
  month: string;
  days: CalendarDay[];
}

function buildCalendarGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Convert JS getDay() (0=Sun) to Mon-indexed (0=Mon ... 6=Sun)
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = [];

  for (let i = 0; i < startOffset; i++) {
    week.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  return weeks;
}

export default function CalendarPage() {
  const { user } = useAuth();
  const householdId = user?.user_metadata?.householdId as string | undefined;

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [memberFilter, setMemberFilter] = useState<string>('all');

  // Get members from dashboard
  const { data: dashboardData } = useDashboard();
  const members = dashboardData?.members ?? [];

  const monthStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
  const memberParam = memberFilter !== 'all' ? memberFilter : undefined;

  const { data: calendarData, isLoading } = useQuery<CalendarResponse>({
    queryKey: ['calendar', householdId, monthStr, memberParam],
    queryFn: () => {
      const params = new URLSearchParams({ month: monthStr });
      if (memberParam) params.set('memberId', memberParam);
      return api.get(`/households/${householdId}/calendar?${params.toString()}`);
    },
    enabled: !!householdId,
  });

  const grid = useMemo(
    () => buildCalendarGrid(currentYear, currentMonth),
    [currentYear, currentMonth],
  );

  // Build lookup: dayNumber -> tasks for that day
  const tasksByDay = useMemo(() => {
    const map = new Map<number, CalendarDay['tasks']>();
    if (calendarData?.days) {
      for (const day of calendarData.days) {
        const dayNum = new Date(day.date).getDate();
        map.set(dayNum, day.tasks);
      }
    }
    return map;
  }, [calendarData]);

  const selectedDayTasks = selectedDay != null ? tasksByDay.get(selectedDay) ?? [] : [];

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDay(null);
  };

  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDay(null);
  };

  const isToday = (day: number) =>
    currentYear === today.getFullYear() &&
    currentMonth === today.getMonth() &&
    day === today.getDate();

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Calendario
        </h1>
        <button
          onClick={goToToday}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Hoy
        </button>
      </div>

      {/* Member filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Ver:
        </label>
        <select
          value={memberFilter}
          onChange={(e) => setMemberFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-gray-100 dark:focus:ring-gray-100"
        >
          <option value="all">Todos</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
          {user && (
            <option value={user.id}>Solo yo</option>
          )}
        </select>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPrevMonth}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={goToNextMonth}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      )}

      {/* Calendar grid */}
      {!isLoading && (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
            {DAY_HEADERS.map((day) => (
              <div
                key={day}
                className="py-2 text-center text-xs font-semibold uppercase text-gray-500 dark:text-gray-400"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {grid.map((week, weekIdx) => (
              <div key={weekIdx} className="grid grid-cols-7">
                {week.map((day, dayIdx) => {
                  if (day === null) {
                    return <div key={`empty-${weekIdx}-${dayIdx}`} className="min-h-[4rem] md:min-h-[5.5rem]" />;
                  }

                  const dayTasks = tasksByDay.get(day) ?? [];
                  const selected = selectedDay === day;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(selected ? null : day)}
                      className={`relative flex flex-col items-center p-1.5 text-sm transition-colors min-h-[4rem] md:min-h-[5.5rem] ${
                        selected
                          ? 'bg-gray-100 dark:bg-gray-800'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                          isToday(day)
                            ? 'bg-gray-900 font-bold text-white dark:bg-gray-100 dark:text-gray-900'
                            : selected
                              ? 'font-semibold text-gray-900 dark:text-gray-100'
                              : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {day}
                      </span>

                      {/* Task indicators */}
                      {dayTasks.length > 0 && (
                        <div className="mt-0.5 flex flex-wrap justify-center gap-0.5">
                          {getUniqueCategories(dayTasks).map((cat, i) => (
                            <span
                              key={i}
                              className={`inline-block h-1.5 w-1.5 rounded-full ${getCategoryDotColor(cat)}`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Task count on mobile */}
                      {dayTasks.length > 0 && (
                        <span className="mt-0.5 text-[10px] font-medium text-gray-400 md:hidden">
                          {dayTasks.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No calendar data */}
      {!isLoading && calendarData?.days?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <CalendarDays className="mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No hay tareas este mes
          </p>
        </div>
      )}

      {/* Day detail modal */}
      {selectedDay != null && (
        <DayDetailModal
          day={selectedDay}
          month={currentMonth}
          year={currentYear}
          tasks={selectedDayTasks}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
}

function getUniqueCategories(tasks: Array<{ category?: string }>): string[] {
  const cats = new Set<string>();
  for (const t of tasks) {
    if (t.category) cats.add(t.category);
  }
  return Array.from(cats);
}

function getCategoryDotColor(category: string): string {
  const colors: Record<string, string> = {
    COCINA: 'bg-orange-500',
    LIMPIEZA: 'bg-blue-500',
    COMPRAS: 'bg-green-500',
    MANTENIMIENTO: 'bg-yellow-500',
    ORGANIZACIÓN: 'bg-purple-500',
  };
  return colors[category] ?? 'bg-gray-400';
}

function DayDetailModal({
  day,
  month,
  year,
  tasks,
  onClose,
}: {
  day: number;
  month: number;
  year: number;
  tasks: Array<{
    id: string;
    title: string;
    category?: string;
    time?: string;
  }>;
  onClose: () => void;
}) {
  const date = new Date(year, month, day);
  const dateStr = date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="fixed inset-0 z-30 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold capitalize text-gray-900 dark:text-gray-100">
            {dateStr}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-center">
            <CalendarDays className="mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
            <p className="text-sm text-gray-500">Sin tareas este día</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {task.title}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <TaskBadge category={task.category} />
                    {task.time && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {task.time}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

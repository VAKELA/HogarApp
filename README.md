# HogarApp — Distribución de Tareas del Hogar

## Visión

Aplicación para gestionar la vida en común en un hogar: tareas, responsabilidades, economía interna, reglas, propuestas y comunicación entre miembros. Diseñada para evolucionar desde un gestor de tareas hasta un hub central del hogar conectado a dispositivos inteligentes.

---

## Fase 1 — MVP: Tareas y Calendario

### Usuarios y Perfiles

- Cada miembro del hogar tiene su propio usuario
- Perfil con nombre, avatar y preferencias
- Sistema de invitación para agregar nuevos miembros al hogar
- Roles básicos: administrador (creador del hogar) y miembro

### Tareas Específicas (One-off)

- Tareas de una sola vez (ej: "colgar una repisa", "comprar filtro de agua")
- Asignación a un miembro o sin asignar (disponible para quien tome la tarea)
- Estado: pendiente → en progreso → completada
- Fecha límite opcional
- Descripción, prioridad y categoría

### Tareas Recurrentes

- Tareas que se repiten con una frecuencia definida (ej: "cocinar el almuerzo los martes")
- Patrones de recurrencia: diaria, días específicos de la semana, mensual, personalizable
- Rotación automática entre miembros (ej: cada semana le toca a alguien distinto)
- Asignación fija o rotativa por miembro
- Marcar completada por instancia (no se completa la tarea entera, solo la de hoy)

### Dashboard

- Vista principal al entrar a la app
- **Mis tareas para hoy**: lista priorizada de tareas del día (recurrentes + específicas con fecha límite hoy)
- Indicador visual de progreso diario (ej: 3/5 tareas completadas)
- Acceso rápido a marcar tareas como completadas
- Notificaciones de tareas próximas a vencer

### Calendario

- Vista de calendario mensual/semanal/diaria
- Visualización de tareas asignadas por día
- Filtros: por miembro, por categoría, por tipo (específica/recurrente)
- Click en día para ver detalle de tareas de ese día
- Indicadores visuales de días con muchas/pocas tareas

---

## Fase 2 — Economía Interna: Trueque de Tareas

### Sistema de Trueque

- **No basado en dinero ni puntos** — basado en intercambio directo de tareas
- Un miembro puede proponer: "Hago los platos por ti si tú cocinas por mí"
- Un miembro puede ofrecer: "Me ofrezco a limpiar los platos a cambio de que alguien haga mi cama"
- Un miembro puede pedir: "¿Alguien puede cocinar por mí? Ofrezco limpiar los platos a cambio"

### Flujo de Intercambio

1. Miembro A publica una oferta de trueque
2. Miembro B puede aceptar, contraofertar o ignorar
3. Si B acepta → se crea un acuerdo de intercambio
4. Ambas tareas quedan registradas como intercambiadas
5. Al completar ambas partes → acuerdo cerrado
6. Si una parte no cumple → queda registro para reputación

### Historial y Reputación

- Historial de intercambios por miembro
- Indicador de confiabilidad: ¿cumple con los intercambios?
- Estadísticas: cuántas veces has ayudado vs cuántas te han ayudado

---

## Fase 3 — Reglas y Gobernanza del Hogar

### Reglas de la Casa

- Página dedicada con todas las reglas del hogar
- **Solo se pueden agregar reglas por votación de mayoría** (>50% de los miembros)
- Proceso: miembro propone regla → se abre votación → si alcanza mayoría → se agrega
- Las reglas existentes también pueden ser modificadas o eliminadas por votación de mayoría
- Categorías de reglas: convivencia, limpieza, horarios, visitas, etc.

### Tablón de Propuestas

- Espacio para proponer cambios, compras o decisiones del hogar
- Ejemplo: "Cambiar la lavadora", "Pintar la sala", "Comprar nuevo sofá"
- Cada propuesta puede incluir descripción, estimación de costo, prioridad
- Sistema de votación: a favor, en contra, abstención
- Comentarios y discusión en cada propuesta
- Estados: propuesta → en votación → aprobada/rechazada → en ejecución → completada

### Sistema de Votación

- Tipos de votación: mayoría simple (>50%), mayoría calificada (2/3), unanimidad
- Período de votación configurable (ej: 3 días para decidir)
- Notificaciones cuando se abre una votación
- Registro de quién votó qué (transparente para todos los miembros)

---

## Fase 4 — Distribución de Gastos

### Fondo Común

- Dinero de fondo común del hogar
- Aportes de cada miembro al fondo
- Registro de ingresos y egresos
- Saldos y balances automáticos

### Mesada del Menor

- Asignación de mesada para miembros menores de edad
- Monto configurable por el administrador
- Registro de uso de la mesada
- Límites y restricciones por edad

### Indicadores de Aporte

- **Aporte al hogar por miembro que genera ingresos**: cuánto aporta cada miembro trabajador
- **Indicador de quién paga los servicios**: luz, agua, internet, gas
- Cálculo automático de porcentaje de aporte por miembro
- Distribución proporcional de gastos según ingresos
- Visualización clara: gráficos de torta, barras comparativas

### Cálculos Automáticos

- División de gastos comunes entre miembros
- Prorrateo según proporción de ingresos
- Deudas y saldos entre miembros
- Alertas de pagos próximos
- Historial completo de transacciones

---

## Fase 5 — Secciones por Habitación

### Cocina

- **Recetas de la familia**: recetario compartido con platos familiares
- **Temporizador en tiempo real**: timer de lo que se está cocinando
- **Indicador de qué se está cocinando**: menú del día visible para todos
- **Quién es el responsable de cocinar**: basado en la tarea recurrente asignada
- **Quién limpia**: asignación de limpieza post-cocción
- Historial de comidas y quién cocinó

### Baños

- **Indicador de última limpieza**: cuándo se limpió por última vez
- **Quién realizó la última limpieza**: registro del responsable
- **Quién es el encargado de la próxima limpieza**: basado en rotación
- Nivel de urgencia: indicador visual si ya debería haberse limpiado
- Checklist de limpieza estándar para cada baño

### Otras Habitaciones (extensible)

- Sala: limpieza, organización, mantenimiento
- Dormitorios: limpieza personal, cambio de sábanas
- Lavandería: estado de la lavadora, ropa por lavar
- Estructura modular para agregar nuevas secciones

---

## Fase 6 — Asistente de Voz y Notificaciones

### Asistente de Voz

- Comandos de voz para interactuar con la app:
  - "Completé la tarea de cocinar" → marca tarea como completada
  - "Necesito ayuda con la limpieza" → publica solicitud de ayuda
  - "Estoy empezando a cocinar" → inicia modo cocina
  - "¿Qué me toca hacer hoy?" → lee las tareas del día
- Integración con asistentes existentes (Alexa, Google Assistant, Siri)
- Procesamiento de lenguaje natural para comandos flexibles

### Sistema de Notificaciones

- **Alguien empezó a cocinar**: notificación a todos los miembros
  - Qué se está cocinando
  - Quién está cocinando
  - Estimado de cuándo se desocupa la cocina
  - "No molesten en la cocina" → modo no interrumpir
- **Recordatorios de tareas**: notificación cuando una tarea recurrente está próxima
- **Propuestas nuevas**: alerta cuando alguien publica una propuesta
- **Votaciones**: aviso cuando hay una votación activa
- **Intercambios**: notificación cuando alguien ofrece un trueque

---

## Fase 7 — Hogar Inteligente (IoT)

### Integración con Dispositivos Inteligentes

- Conexión con múltiples dispositivos IoT del hogar
- Sensores en habitaciones (movimiento, temperatura, humedad)
- Asistentes de IA distribuidos por la casa
- La aplicación como fuente centralizada de información

### Comunicación con Asistentes de IA

- Los asistentes informan sobre lo que ocurre en el hogar
- Ejemplo: "Juan está cocinando, la cocina estará disponible en 30 minutos"
- Ejemplo: "El baño principal fue limpiado hace 2 horas por María"
- Ejemplo: "Hoy le toca cocinar a Carlos, el menú es pasta"

### La App como Hub de Información

- Sincronización bidireccional: app ↔ dispositivos
- Dashboard unificado con datos de sensores y tareas
- Automatizaciones: si se detecta movimiento en cocina → notificar
- Reportes automáticos de actividad del hogar
- Modo pasivo: la app recopila datos sin intervención manual

---

## Arquitectura Técnica

Ver detalles completos en [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 15 (App Router, PWA) |
| Backend | NestJS (Socket.io Gateway) |
| Base de datos | Supabase PostgreSQL + Prisma ORM |
| Auth | Supabase Auth (JWT) |
| Monorepo | Turborepo |
| UI | shadcn/ui + Tailwind CSS |
| Estado | React Query + Zustand |
| Validación | Zod (compartido frontend/backend) |
| Deploy | Vercel (frontend) + Railway (backend) |

### Principios de Diseño

- **Mobile-first**: la mayoría de interacciones serán desde el celular
- **Simplicidad**: la app debe ser usable por todos los miembros, incluidos menores
- **Transparencia**: toda la información del hogar es visible para todos los miembros
- **Privacidad**: datos del hogar solo accesibles por miembros autorizados
- **Escalabilidad**: diseñar para crecer en funcionalidades sin romper lo existente
- **Offline-first**: las tareas deben poder marcarse sin conexión y sincronizarse después

---

## Prompt Base (Requisito Original del Usuario)

> Estoy pensando en hacer una aplicación para distribución de tareas del hogar. Para esto quiero que me ayudes a realizar la investigación, anotando todos los requerimientos en un archivo markdown. La idea es que cada miembro de la casa tiene su propio usuario, con responsabilidades específicas y recurrentes. Responsabilidades específicas pueden ser cosas como colgar una repisa. Mientras que responsabilidades recurrentes pueden ser que los martes me toca cocinar el almuerzo.
> Me interesa que exista un dashboard que incluya mis tareas para hoy y un calendario que permita ver qué tareas tengo para otros días.
> Debe haber una economía interna no basada en dinero ni puntos sino que en trueque, es decir, se puede intercambiar tareas y si quiero que alguien haga por mí, puedo ofrecerme a limpiar los platos por él o hacer su cama.
> También me gustaría que haya una página con reglas de la casa, que solo se pueden agregar con votación por mayoría.
> También debe haber un tablón de propuestas, por ejemplo, cambiar la lavadora. Esto sirve para tomar decisiones y votar por ellas.
> En un futuro la aplicación también debería manejar distribución de gastos, donde haya dinero de fondo común, dinero asignado a la mesada del menor, indicador del aporte al hogar por miembro que genera, indicador de quién paga la luz, de forma que todo se calcule automáticamente y así permita saber qué tanto aporta cada uno dependiendo del caso.
> Luego, en otra iteración posterior debería haber separaciones por habitaciones. Por ejemplo, si se entra en la sección de cocina se podrán visualizar las recetas de la familia, temporizador de algo que se esté cocinando en tiempo real, indicador de que se está cocinando, quién es el responsable de cocinar y quién va a limpiar.
> En la sección de cada baño puede haber un indicador de la última limpieza, quién la realizó y quién es el encargado de la próxima limpieza.
> En futuras iteraciones, la aplicación deberá poder ser manejada a través de un asistente de forma que por voz uno indique que realizó una tarea, que necesita ayuda con algo o anunciar que está empezando a cocinar. Esto podría tener sistema de notificaciones para que uno se entere de que alguien empezó a cocinar, de forma que no molesten en la cocina y también tengan un estimado de cuándo se va a desocupar.
> En un futuro, a través de múltiples dispositivos inteligentes en la casa, se podría comunicar con asistentes de IA para que informen sobre todo lo que está ocurriendo y la aplicación simplemente sea una fuente de información.
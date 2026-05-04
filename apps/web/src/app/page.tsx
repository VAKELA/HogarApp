import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">HogarApp</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-md">
        Gestiona las tareas del hogar de forma justa y colaborativa.
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-md bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/register"
          className="rounded-md border border-input px-6 py-3 hover:bg-accent"
        >
          Crear cuenta
        </Link>
      </div>
    </main>
  );
}

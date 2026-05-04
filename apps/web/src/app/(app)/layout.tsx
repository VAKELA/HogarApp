export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* TODO: Add sidebar/nav */}
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}

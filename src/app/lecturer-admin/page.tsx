import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default function LecturerAdminPage() {
  const secret = process.env.LECTURER_SECRET;

  if (!secret) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <h1 className="text-3xl font-bold text-black mb-4">Access Denied</h1>
          <p className="text-gray-600">
            This dashboard is not publicly available. Please set the
            <code className="mx-1 px-2 py-0.5 bg-gray-100 rounded text-sm font-mono">LECTURER_SECRET</code>
            environment variable to enable access.
          </p>
        </div>
      </main>
    );
  }

  return <AdminDashboard />;
}

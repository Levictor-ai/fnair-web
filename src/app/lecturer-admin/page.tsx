import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function LecturerAdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}

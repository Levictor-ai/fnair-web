"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Download, AlertCircle, Database, Users, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface Application {
  id: string;
  fullName: string;
  age: string;
  department: string;
  level: string;
  email: string;
  phone: string;
  areasOfInterest: string;
  pastParticipation: string[];
  currentSkills: string[];
  whyJoin: string;
  whatResearchMeans: string;
  problemOfInterest: string;
  weeklyHours: string;
  consistentWillingness: string[];
  challenges: string;
  conceptExplanation: string;
  finalCommitment: string;
  createdAt?: string;
}

type Status = "loading" | "ready" | "error";

const COLUMNS: { key: keyof Application; label: string }[] = [
  { key: "fullName", label: "Full Name" },
  { key: "age", label: "Age" },
  { key: "department", label: "Department" },
  { key: "level", label: "Level" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "areasOfInterest", label: "Areas of Interest" },
  { key: "pastParticipation", label: "Past Participation" },
  { key: "currentSkills", label: "Current Skills" },
  { key: "whyJoin", label: "Why Join" },
  { key: "whatResearchMeans", label: "What Research Means" },
  { key: "problemOfInterest", label: "Problem of Interest" },
  { key: "weeklyHours", label: "Weekly Hours" },
  { key: "consistentWillingness", label: "Consistent Willingness" },
  { key: "challenges", label: "Challenges" },
  { key: "conceptExplanation", label: "Concept Explanation" },
  { key: "finalCommitment", label: "Final Commitment" },
];

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) {
    const flattened = value.join("; ");
    return `"${flattened.replace(/"/g, '""')}"`;
  }
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function downloadCsv(applications: Application[]) {
  const header = COLUMNS.map((c) => `"${c.label}"`).join(",");
  const rows = applications.map((app) =>
    COLUMNS.map((c) => csvCell(app[c.key])).join(",")
  );
  const bom = "\uFEFF";
  const csv = bom + header + "\n" + rows.join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fnair_applications_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.refresh();
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!supabase) {
          setStatus("error");
          setErrorMsg("Supabase is not initialized. Check your configuration.");
          return;
        }

        const { data: rows, error } = await supabase
          .from("applications")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const mapped: Application[] = (rows || []).map((r: any) => ({
          id: String(r.id),
          fullName: r.full_name ?? "",
          age: r.age ?? "",
          department: r.department ?? "",
          level: r.level ?? "",
          email: r.email ?? "",
          phone: r.phone ?? "",
          areasOfInterest: r.areas_of_interest ?? "",
          pastParticipation: r.past_participation ?? [],
          currentSkills: r.current_skills ?? [],
          whyJoin: r.why_join ?? "",
          whatResearchMeans: r.what_research_means ?? "",
          problemOfInterest: r.problem_of_interest ?? "",
          weeklyHours: r.weekly_hours ?? "",
          consistentWillingness: r.consistent_willingness ?? [],
          challenges: r.challenges ?? "",
          conceptExplanation: r.concept_explanation ?? "",
          finalCommitment: r.final_commitment ?? "",
          createdAt: r.created_at ?? undefined,
        }));

        setApplications(mapped);
        setStatus("ready");
      } catch (err) {
        console.error("Error fetching applications:", err);
        setStatus("error");
        setErrorMsg("Failed to load applications from database.");
      }
    };

    fetchData();
  }, []);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-gray-500">
          <Loader2 className="w-6 h-6 animate-spin text-blue-primary" />
          <span className="text-lg">Loading applications…</span>
        </div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-black mb-2">Error</h2>
          <p className="text-gray-600">{errorMsg}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 selection:bg-blue-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black">
              Lecturer <span className="text-blue-primary">Dashboard</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {applications.length} application{applications.length !== 1 ? "s" : ""} submitted
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => downloadCsv(applications)}
              disabled={applications.length === 0}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-primary text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export Master CSV</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition-colors shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center shadow-sm">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-black mb-2">No Applications Yet</h2>
            <p className="text-gray-500">
              Applications submitted through the form will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">#</th>
                    {COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, idx) => (
                    <tr
                      key={app.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs whitespace-nowrap">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 font-medium text-black whitespace-nowrap">
                        {app.fullName}
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{app.age}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {app.department}
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{app.level}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        <a
                          href={`mailto:${app.email}`}
                          className="text-blue-primary hover:underline"
                        >
                          {app.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {app.phone}
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                        {app.areasOfInterest}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <div className="flex flex-wrap gap-1">
                          {app.pastParticipation.map((item) => (
                            <span
                              key={item}
                              className="inline-block bg-blue-50 text-blue-primary border border-blue-100 rounded px-1.5 py-0.5 text-xs font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <div className="flex flex-wrap gap-1">
                          {app.currentSkills.map((item) => (
                            <span
                              key={item}
                              className="inline-block bg-green-50 text-green-700 border border-green-200 rounded px-1.5 py-0.5 text-xs font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                        {app.whyJoin}
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                        {app.whatResearchMeans}
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                        {app.problemOfInterest}
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {app.weeklyHours}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <div className="flex flex-wrap gap-1">
                          {app.consistentWillingness.map((item) => (
                            <span
                              key={item}
                              className="inline-block bg-purple-50 text-purple-700 border border-purple-200 rounded px-1.5 py-0.5 text-xs font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                        {app.challenges}
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                        {app.conceptExplanation}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                            app.finalCommitment === "Yes"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : app.finalCommitment === "No"
                                ? "bg-red-50 text-red-700 border border-red-200"
                                : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          }`}
                        >
                          {app.finalCommitment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
              <Database className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
              {applications.length} record{applications.length !== 1 ? "s" : ""} &middot; Sorted by newest first
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

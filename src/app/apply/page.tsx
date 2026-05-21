import ApplicationForm from "@/components/ApplicationForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ApplyPage() {
  return (
    <main className="bg-gray-50 min-h-screen text-black font-sans selection:bg-blue-primary/20 py-12 md:py-24 relative">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <Link href="/" className="inline-flex items-center space-x-2 text-gray-500 hover:text-blue-primary transition-colors mb-10 font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        
        <div className="text-center mb-12">
          <span className="text-blue-primary font-bold tracking-widest uppercase mb-4 text-sm block">Join The Nexus</span>
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">Founding Cohort <span className="text-blue-primary">Application</span></h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            We are seeking intellectually curious, highly disciplined students and emerging scholars for our founding cohort.
          </p>
        </div>
        
        <ApplicationForm />
      </div>
    </main>
  );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";

const TOTAL_STEPS = 5;

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "", age: "", department: "", level: "", email: "", phone: "",
    areasOfInterest: "", pastParticipation: [] as string[], currentSkills: [] as string[],
    whyJoin: "", whatResearchMeans: "", problemOfInterest: "",
    weeklyHours: "", consistentWillingness: [] as string[], challenges: "",
    conceptExplanation: "", finalCommitment: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: "pastParticipation" | "currentSkills" | "consistentWillingness", value: string) => {
    setFormData((prev) => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((item) => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (db && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        await addDoc(collection(db, "fnair_applications"), {
          ...formData,
          createdAt: serverTimestamp(),
        });
      } else {
        // Mock submission (skip real DB since we lack real credentials)
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Mock Submitted Data:", formData);
      }
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm"
      >
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-primary border border-blue-100">
          <Check className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-black mb-4">Application Submitted</h3>
        <p className="text-gray-600 mb-8 text-lg">
          Thank you for applying to Frontier Nexus for Academic and Interdisciplinary Research (FNAIR). Applications will be reviewed carefully, and selected applicants will be contacted for the next stage.
        </p>
        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-gray-100 text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
        >
          Return to Home
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 md:p-12 relative">
      <div className="flex items-center justify-between mb-10 relative">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-300 ${
              step === i ? "bg-blue-primary text-white shadow-md" : step > i ? "bg-blue-100 text-blue-primary" : "bg-gray-100 text-gray-400"
            }`}>
              {step > i ? <Check className="w-5 h-5" /> : i}
            </div>
          </div>
        ))}
        <div className="absolute top-5 left-8 right-8 h-1 bg-gray-100 z-0">
          <div 
            className="h-full bg-blue-primary transition-all duration-500 ease-out" 
            style={{ width: `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={step === TOTAL_STEPS ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && <Step1 data={formData} onChange={handleInputChange} />}
            {step === 2 && <Step2 data={formData} onChange={handleInputChange} onCheck={handleCheckboxChange} />}
            {step === 3 && <Step3 data={formData} onChange={handleInputChange} />}
            {step === 4 && <Step4 data={formData} onChange={handleInputChange} onCheck={handleCheckboxChange} />}
            {step === 5 && <Step5 data={formData} onChange={handleInputChange} />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-between items-center border-t border-gray-100 pt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
          
          {step < TOTAL_STEPS ? (
            <button
              type="submit"
              className="flex items-center space-x-2 px-8 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              <span>Next Step</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-10 py-3 bg-blue-primary text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70 shadow-md"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Submit Application</span>}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Step1({ data, onChange }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-black mb-1">Section A: Basic Information</h3>
        <p className="text-gray-500 text-sm mb-6">Please provide your foundational details.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Full Name <span className="text-blue-primary">*</span></label>
          <input required type="text" value={data.fullName} onChange={(e) => onChange('fullName', e.target.value)} className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Age <span className="text-blue-primary">*</span></label>
          <select required value={data.age} onChange={(e) => onChange('age', e.target.value)} className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all appearance-none">
            <option value="">Select Age</option>
            <option value="Below 18">Below 18</option>
            <option value="18-20">18-20</option>
            <option value="21-23">21-23</option>
            <option value="24-26">24-26</option>
            <option value="Above 26">Above 26</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Department / Discipline <span className="text-blue-primary">*</span></label>
          <input required type="text" value={data.department} onChange={(e) => onChange('department', e.target.value)} className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Level / Year of Study <span className="text-blue-primary">*</span></label>
          <select required value={data.level} onChange={(e) => onChange('level', e.target.value)} className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all appearance-none">
            <option value="">Select Level</option>
            <option value="100 Level">100 Level</option>
            <option value="200 Level">200 Level</option>
            <option value="300 Level">300 Level</option>
            <option value="400 Level">400 Level</option>
            <option value="500 Level">500 Level</option>
            <option value="600 Level">600 Level</option>
            <option value="Postgraduate">Postgraduate</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email Address <span className="text-blue-primary">*</span></label>
          <input required type="email" value={data.email} onChange={(e) => onChange('email', e.target.value)} className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone Number <span className="text-blue-primary">*</span></label>
          <input required type="tel" value={data.phone} onChange={(e) => onChange('phone', e.target.value)} className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all" />
        </div>
      </div>
    </div>
  );
}

function Step2({ data, onChange, onCheck }: any) {
  const participationOpts = ["Seminar presentation", "Literature review", "Research project", "Laboratory work", "Journal club", "Data analysis", "Scientific writing", "Academic presentations", "None yet"];
  const skillOpts = ["Academic writing", "Literature search", "PowerPoint design", "Public speaking", "Graphic design", "Referencing and citation", "Data Analysis/Statistics", "Team collaboration"];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold text-black mb-1">Section B: Academic Interests & Exposure</h3>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block mb-2">What areas of science, medicine, healthcare, or research interest you the most? <span className="text-blue-primary">*</span></label>
        <textarea required value={data.areasOfInterest} onChange={(e) => onChange('areasOfInterest', e.target.value)} rows={3} className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all resize-none"></textarea>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 block mb-3">Have you participated in any of the following before? <span className="text-blue-primary">*</span></label>
        <div className="grid md:grid-cols-2 gap-3">
          {participationOpts.map((opt) => (
            <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${data.pastParticipation.includes(opt) ? 'bg-blue-primary border-blue-primary' : 'border-gray-300 group-hover:border-blue-primary'}`}>
                {data.pastParticipation.includes(opt) && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className={`text-sm ${data.pastParticipation.includes(opt) ? 'text-black font-medium' : 'text-gray-600 group-hover:text-black'}`}>{opt}</span>
              <input type="checkbox" className="hidden" checked={data.pastParticipation.includes(opt)} onChange={() => onCheck('pastParticipation', opt)} />
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-100">
        <label className="text-sm font-medium text-gray-700 block mb-3">Which of these skills do you currently possess? <span className="text-blue-primary">*</span></label>
        <div className="grid md:grid-cols-2 gap-3">
          {skillOpts.map((opt) => (
            <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${data.currentSkills.includes(opt) ? 'bg-blue-primary border-blue-primary' : 'border-gray-300 group-hover:border-blue-primary'}`}>
                {data.currentSkills.includes(opt) && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className={`text-sm ${data.currentSkills.includes(opt) ? 'text-black font-medium' : 'text-gray-600 group-hover:text-black'}`}>{opt}</span>
              <input type="checkbox" className="hidden" checked={data.currentSkills.includes(opt)} onChange={() => onCheck('currentSkills', opt)} />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step3({ data, onChange }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-black mb-1">Section C: Motivation & Scientific Thinking</h3>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block mb-2">Why do you want to join Frontier Nexus for Academic and Interdisciplinary Research? <span className="text-blue-primary">*</span></label>
        <textarea required value={data.whyJoin} onChange={(e) => onChange('whyJoin', e.target.value)} rows={4} className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all resize-none"></textarea>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block mb-2">In your own understanding, what does research mean? <span className="text-blue-primary">*</span></label>
        <textarea required value={data.whatResearchMeans} onChange={(e) => onChange('whatResearchMeans', e.target.value)} rows={4} className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all resize-none"></textarea>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block mb-2">What scientific, medical, or healthcare-related problem interests you the most, and why? <span className="text-blue-primary">*</span></label>
        <textarea required value={data.problemOfInterest} onChange={(e) => onChange('problemOfInterest', e.target.value)} rows={4} className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all resize-none"></textarea>
      </div>
    </div>
  );
}

function Step4({ data, onChange, onCheck }: any) {
  const willingnessOpts = [
    "Read scientific papers weekly", "Attend discussions and meetings", "Present scientific topics occasionally",
    "Learn independently", "Collaborate with others", "Participate in writing exercises", "Engage in constructive academic discussions"
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold text-black mb-1">Section D: Commitment & Reliability</h3>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block mb-2">How many hours weekly can you realistically commit to academic discussions, reading, writing, and related activities? <span className="text-blue-primary">*</span></label>
        <select required value={data.weeklyHours} onChange={(e) => onChange('weeklyHours', e.target.value)} className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all appearance-none">
          <option value="">Select Weekly Commitment</option>
          <option value="1-2 hours">1–2 hours</option>
          <option value="3-5 hours">3–5 hours</option>
          <option value="6-8 hours">6–8 hours</option>
          <option value="More than 8 hours">More than 8 hours</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 block mb-3">Which of the following are you willing to do consistently? <span className="text-blue-primary">*</span></label>
        <div className="grid md:grid-cols-2 gap-3">
          {willingnessOpts.map((opt) => (
            <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${data.consistentWillingness.includes(opt) ? 'bg-blue-primary border-blue-primary' : 'border-gray-300 group-hover:border-blue-primary'}`}>
                {data.consistentWillingness.includes(opt) && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className={`text-sm ${data.consistentWillingness.includes(opt) ? 'text-black font-medium' : 'text-gray-600 group-hover:text-black'}`}>{opt}</span>
              <input type="checkbox" className="hidden" checked={data.consistentWillingness.includes(opt)} onChange={() => onCheck('consistentWillingness', opt)} />
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-100">
        <label className="text-sm font-medium text-gray-700 block mb-2">What challenges may affect your consistency or participation? (Optional)</label>
        <input type="text" value={data.challenges} onChange={(e) => onChange('challenges', e.target.value)} className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all" />
      </div>
    </div>
  );
}

function Step5({ data, onChange }: any) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold text-black mb-1">Section E: Mini Intellectual Task & Final Commitment</h3>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block mb-2">Explain a scientific or medical concept you find interesting in very simple terms. <span className="text-blue-primary">*</span></label>
        <textarea required value={data.conceptExplanation} onChange={(e) => onChange('conceptExplanation', e.target.value)} rows={5} className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all resize-none"></textarea>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-100">
        <label className="text-sm font-medium text-gray-700 block mb-3 text-lg">Final Commitment Question</label>
        <p className="text-black mb-4">
          FNAIR emphasizes intellectual curiosity, scientific thinking, consistency, collaboration, and long-term development rather than certificates or titles. Do you believe you can genuinely commit to this kind of environment? <span className="text-blue-primary">*</span>
        </p>
        <div className="space-y-3">
          {["Yes", "No", "I am unsure"].map((opt) => (
            <label key={opt} className="flex items-center space-x-3 cursor-pointer group w-fit">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${data.finalCommitment === opt ? 'border-blue-primary' : 'border-gray-300 group-hover:border-blue-primary'}`}>
                {data.finalCommitment === opt && <div className="w-2.5 h-2.5 rounded-full bg-blue-primary" />}
              </div>
              <span className={`text-base ${data.finalCommitment === opt ? 'text-blue-primary font-medium' : 'text-gray-600 group-hover:text-black'}`}>{opt}</span>
              <input required type="radio" name="finalCommitment" className="hidden" checked={data.finalCommitment === opt} onChange={() => onChange('finalCommitment', opt)} />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

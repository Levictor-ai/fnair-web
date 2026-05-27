"use client";

import { useState, useEffect } from "react";
import { Loader2, ShieldCheck, Mail, AlertCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);
  const router = useRouter();

  // Timer for OTP expiration
  useEffect(() => {
    if (step === "verify" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const handleRequestOtp = async () => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/auth/send-otp", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send code");
      
      setStep("verify");
      setTimeLeft(180); // 3 minutes
      setStatus("idle");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
      setStatus("error");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setErrorMsg("Please enter a 6-digit code.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Invalid code");
      
      // Successfully logged in
      router.refresh(); // Refresh to let server check cookie
    } catch (err: any) {
      setErrorMsg(err.message || "Verification failed.");
      setStatus("error");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 selection:bg-blue-primary/20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-black px-8 py-6 text-center">
          <ShieldCheck className="w-12 h-12 text-blue-400 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-white">Admin Access</h2>
          <p className="text-gray-400 text-sm mt-1">Authorized personnel only</p>
        </div>

        <div className="p-8">
          {errorMsg && (
            <div className="mb-6 flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === "request" ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8" />
                </div>
                <p className="text-gray-600">
                  Access requires a one-time password (OTP). We will send it to the registered admin email.
                </p>
              </div>

              <button
                onClick={handleRequestOtp}
                disabled={status === "loading"}
                className="w-full flex items-center justify-center space-x-2 bg-blue-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 shadow-md"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>Send Login Code</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">
                  We've sent a 6-digit code to your email. Enter it below to access the dashboard.
                </p>
                <div className="text-sm font-medium text-gray-400">
                  Code expires in: <span className={timeLeft < 30 ? "text-red-500" : "text-blue-primary"}>{formatTime(timeLeft)}</span>
                </div>
              </div>

              <div>
                <label className="sr-only">One-Time Password</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="w-full text-center text-3xl tracking-widest font-mono bg-gray-50 border border-gray-300 rounded-lg px-4 py-4 text-black focus:outline-none focus:border-blue-primary focus:ring-2 focus:ring-blue-primary/20 transition-all"
                  disabled={status === "loading" || timeLeft === 0}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading" || otp.length !== 6 || timeLeft === 0}
                className="w-full flex items-center justify-center space-x-2 bg-black text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-70 shadow-md"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Verify & Login</span>
                )}
              </button>
              
              {timeLeft === 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setStep("request");
                    setOtp("");
                    setErrorMsg("");
                  }}
                  className="w-full text-sm text-blue-primary hover:underline mt-4"
                >
                  Request a new code
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

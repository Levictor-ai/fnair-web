"use client";

import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send message. Please try again.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-black focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-colors placeholder:text-gray-400";

  return (
    <footer id="contact" className="bg-gray-50 pt-20 pb-10 border-t border-gray-200 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">
              Connect with <span className="text-blue-primary">FNAIR</span>
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Have questions about the Founding Cohort or our initiative? Reach out to our coordination team.
            </p>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-primary">@</span>
                <span className="font-medium">levictor086@gmail.com</span>
              </p>
              <p className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-primary">📍</span>
                <span className="font-medium">Interdisciplinary Virtual Network</span>
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-black mb-6">Send an Inquiry</h3>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3 text-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <p className="text-black font-semibold text-lg">Message Sent!</p>
                <p className="text-gray-500 text-sm">
                  We've received your inquiry and will be in touch shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm text-blue-primary font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    disabled={status === "loading"}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    disabled={status === "loading"}
                  />
                </div>
                <textarea
                  required
                  placeholder="Your message..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClass} resize-none`}
                  disabled={status === "loading"}
                />

                {status === "error" && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-blue-primary text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Frontier Nexus for Academic and Interdisciplinary Research.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

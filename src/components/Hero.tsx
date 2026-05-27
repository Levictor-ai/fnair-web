"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white py-20 md:py-24">
      {/* Background Nodes/Network Effect - Subtle Gray for Light Mode */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Network Grid overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-6 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50/80 backdrop-blur-sm">
            <span className="text-gray-600 text-sm font-semibold tracking-widest uppercase">Cohort</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight tracking-tight">
            Building a Culture of <br className="hidden md:block" />
            <span className="text-blue-primary">
              Scientific Inquiry
            </span> & Intellectual Excellence.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Frontier Nexus for Academic and Interdisciplinary Research (FNAIR) empowers students and emerging scholars through interdisciplinary collaboration, critical thinking, research culture, and long-term scholarly development.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/apply" 
              className="px-8 py-4 rounded-md bg-blue-primary text-white font-semibold hover:bg-blue-700 transition-all duration-300 w-full sm:w-auto shadow-md"
            >
              Apply for Cohort
            </Link>
            <a 
              href="#mission" 
              className="px-8 py-4 rounded-md border border-gray-300 text-gray-700 hover:text-black hover:border-black transition-all duration-300 w-full sm:w-auto bg-white/5"
            >
              Explore Mission
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

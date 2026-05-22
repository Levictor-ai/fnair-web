"use client";
import { motion } from "framer-motion";

export default function MissionVision() {
  return (
    <section id="mission" className="py-20 md:py-24 relative overflow-hidden bg-white border-y border-gray-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center bg-blue-primary p-10 md:p-14 rounded-2xl shadow-xl h-full"
          >
            <span className="text-blue-100 font-bold tracking-widest uppercase mb-4 text-sm">Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Empowering emerging scholars through research culture & critical thinking.
            </h2>
            <div className="w-16 h-1 bg-white/30 mb-8"></div>
            <p className="text-blue-50 text-lg leading-relaxed">
              We are dedicated to building a foundation of interdisciplinary engagement and collaborative scientific learning that bridges theoretical knowledge with real-world innovation.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center bg-blue-primary p-10 md:p-14 rounded-2xl shadow-xl h-full"
          >
            <span className="text-blue-100 font-bold tracking-widest uppercase mb-4 text-sm">Our Vision</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              To cultivate a sustainable community of future academic leaders.
            </h2>
            <div className="w-16 h-1 bg-white/30 mb-8"></div>
            <p className="text-blue-50 text-lg leading-relaxed">
              We envision a resilient network of intellectually disciplined researchers who drive progress and innovation across the scientific and medical disciplines globally.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

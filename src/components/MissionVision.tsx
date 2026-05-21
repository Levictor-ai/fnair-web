"use client";
import { motion } from "framer-motion";

export default function MissionVision() {
  return (
    <section id="mission" className="py-0 relative overflow-hidden bg-gray-50 border-y border-gray-100">
      <div className="grid md:grid-cols-2">
        {/* Mission */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-16 md:p-24 lg:p-32 relative flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-200 bg-white"
        >
          <span className="text-blue-primary font-bold tracking-widest uppercase mb-4 text-sm">Our Mission</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8 leading-tight">
            Empowering emerging scholars through research culture & critical thinking.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-md">
            We are dedicated to building a foundation of interdisciplinary engagement and collaborative scientific learning that bridges theoretical knowledge with real-world innovation.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-16 md:p-24 lg:p-32 relative flex flex-col justify-center bg-gray-50"
        >
          <span className="text-blue-primary font-bold tracking-widest uppercase mb-4 text-sm">Our Vision</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8 leading-tight">
            To cultivate a sustainable community of future academic leaders.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-md">
            We envision a resilient network of intellectually disciplined researchers who drive progress and innovation across the scientific and medical disciplines globally.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

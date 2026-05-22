"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-24 bg-gray-50 relative overflow-hidden border-y border-gray-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              About <span className="text-blue-primary">FNAIR</span>
            </h2>
            <div className="w-16 h-1 bg-blue-primary mb-8"></div>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              A collaborative academic and research initiative dedicated to fostering scientific inquiry, interdisciplinary engagement, intellectual discipline, and research-oriented thinking among students and early-career researchers.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              We seek to create an environment where curiosity, critical thinking, and collaborative learning thrive across disciplines, bridging the gap between theoretical knowledge and scientific innovation.
            </p>
          </motion.div>
          
          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              "Intellectual Curiosity",
              "Scientific Rigor",
              "Academic Integrity",
              "Long-term Development",
              "Collaborative Learning"
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 p-6 rounded-lg flex items-center space-x-4 group shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-blue-primary"></div>
                <span className="text-black font-medium">{item}</span>
              </div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { BookOpen, Brain, Network, Scale, Target, Zap } from "lucide-react";

const values = [
  {
    title: "Intellectual Curiosity",
    description: "A relentless drive to ask questions, explore the unknown, and push the boundaries of scientific understanding.",
    icon: <Brain className="w-6 h-6 text-blue-primary" />
  },
  {
    title: "Scientific Rigor",
    description: "Commitment to methodical investigation, evidence-based reasoning, and precision in all academic pursuits.",
    icon: <Target className="w-6 h-6 text-blue-primary" />
  },
  {
    title: "Interdisciplinary Collaboration",
    description: "Bridging diverse medical and scientific fields to foster innovative solutions and holistic perspectives.",
    icon: <Network className="w-6 h-6 text-blue-primary" />
  },
  {
    title: "Critical Thinking",
    description: "Evaluating information objectively, challenging assumptions, and developing logical, well-reasoned arguments.",
    icon: <Zap className="w-6 h-6 text-blue-primary" />
  },
  {
    title: "Academic Integrity",
    description: "Upholding the highest ethical standards, honesty, and transparency in research and scholarly communication.",
    icon: <Scale className="w-6 h-6 text-blue-primary" />
  },
  {
    title: "Consistency & Discipline",
    description: "Demonstrating steadfast commitment to long-term academic goals and rigorous scholarly habits.",
    icon: <BookOpen className="w-6 h-6 text-blue-primary" />
  }
];

export default function CoreValues() {
  return (
    <section id="values" className="py-20 md:py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Core <span className="text-blue-primary">Values</span></h2>
          <div className="w-24 h-1 bg-blue-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-blue-primary transition-colors">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { FileText, MessageSquare, PenTool, Presentation, Users, Video, BookMarked } from "lucide-react";

const activities = [
  { name: "Journal Discussions", icon: <BookMarked className="w-5 h-5 text-blue-primary" /> },
  { name: "Scientific Paper Reviews", icon: <FileText className="w-5 h-5 text-blue-primary" /> },
  { name: "Academic Writing Exercises", icon: <PenTool className="w-5 h-5 text-blue-primary" /> },
  { name: "Research Discussions", icon: <MessageSquare className="w-5 h-5 text-blue-primary" /> },
  { name: "Seminar Participation", icon: <Video className="w-5 h-5 text-blue-primary" /> },
  { name: "Collaborative Learning", icon: <Users className="w-5 h-5 text-blue-primary" /> },
  { name: "Conference Recommendations", icon: <Presentation className="w-5 h-5 text-blue-primary" /> },
];

export default function Activities() {
  return (
    <section id="activities" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Core <span className="text-blue-primary">Activities</span></h2>
          <div className="w-24 h-1 bg-blue-primary mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Our members actively participate in continuous intellectual development through structured academic engagements designed to cultivate research proficiency.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white border border-gray-200 shadow-sm px-6 py-4 rounded-full flex items-center space-x-3 group cursor-default hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {activity.icon}
              </div>
              <span className="text-black font-medium text-sm md:text-base">{activity.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

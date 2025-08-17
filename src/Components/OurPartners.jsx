import React from "react";
import { motion } from "framer-motion";

// Example partner logos (replace with real images or icons)
const partners = [
  {
    name: "Partner 1",
    logo: "https://via.placeholder.com/150x80?text=Partner+1",
  },
  {
    name: "Partner 2",
    logo: "https://via.placeholder.com/150x80?text=Partner+2",
  },
  {
    name: "Partner 3",
    logo: "https://via.placeholder.com/150x80?text=Partner+3",
  },
  {
    name: "Partner 4",
    logo: "https://via.placeholder.com/150x80?text=Partner+4",
  },
  {
    name: "Partner 5",
    logo: "https://via.placeholder.com/150x80?text=Partner+5",
  },
  {
    name: "Partner 6",
    logo: "https://via.placeholder.com/150x80?text=Partner+6",
  },
];

export default function OurPartners() {
  return (
    <section className="w-full py-20 bg-gray-50">
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🏆 Our Partners & Certifications
      </motion.h2>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition-transform hover:scale-105 flex items-center justify-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-16 object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

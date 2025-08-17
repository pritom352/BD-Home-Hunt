import React from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Home,
  Handshake,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    title: "Create Account",
    icon: <UserPlus size={50} className="text-blue-600" />,
  },
  {
    title: "Choose Property",
    icon: <Home size={50} className="text-green-600" />,
  },
  {
    title: "Make an Offer",
    icon: <Handshake size={50} className="text-yellow-500" />,
  },
  {
    title: "Pay Securely",
    icon: <CreditCard size={50} className="text-purple-600" />,
  },
];

export default function HowItWorks() {
  return (
    <section
      className="w-full relative py-16 md:py-20 lg:py-24 bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-12 md:mb-16 text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🛠️ How It Works
        </motion.h2>

        {/* Steps */}
        <div
          className="
            flex flex-col 
            sm:grid sm:grid-cols-2 sm:gap-10 
            lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-8
          "
        >
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              {/* Step Card */}
              <motion.div
                className="flex flex-col items-center text-center 
                  bg-white/10 backdrop-blur-lg border border-white/20 
                  p-5 sm:p-6 md:p-8 rounded-2xl lg:rounded-3xl shadow-lg 
                  hover:shadow-2xl transition-transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="p-4 sm:p-6 rounded-full bg-white/20 mb-4 shadow-inner">
                  {step.icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white drop-shadow-md">
                  {step.title}
                </h3>
              </motion.div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex lg:items-center">
                  <ArrowRight
                    size={50}
                    className="text-white/70 animate-pulse"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

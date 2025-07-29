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
    icon: <UserPlus size={70} className="text-blue-600" />,
  },
  {
    title: "Choose Property",
    icon: <Home size={70} className="text-green-600" />,
  },
  {
    title: "Make an Offer",
    icon: <Handshake size={70} className="text-yellow-600" />,
  },
  {
    title: "Pay Securely",
    icon: <CreditCard size={70} className="text-purple-600" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full  mt-25">
      <motion.h2
        className=" text-2xl md:text-3xl lg:text-4xl text-center font-bold  mb-15"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🛠️ How It Works
      </motion.h2>
      <div className="max-w-7xl bg-secondary py-24 px-6 md:px-10 mx-auto text-center rounded-2xl">
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12">
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <motion.div
                className="flex flex-col items-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.25 }}
              >
                <div className="bg-gray-100 p-8 rounded-full shadow-xl hover:scale-110 transition">
                  {step.icon}
                </div>
                <p className="text-xl font-semibold text-gray-800">
                  {step.title}
                </p>
              </motion.div>

              {index < steps.length - 1 && (
                <ArrowRight
                  size={40}
                  className="text-gray-400 hidden sm:block"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

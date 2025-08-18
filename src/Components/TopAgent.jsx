import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../Pages/Loader/Loader";

export default function TopAgent() {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ userEmail: "", message: "" });

  useEffect(() => {
    axios
      .get("https://assignment12-server-lyart.vercel.app/top-agent")
      .then((res) => setAgent(res.data))
      .catch(() => setError("Failed to load top agent"))
      .finally(() => setLoading(false));
  }, []);

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    if (!formData.userEmail || !formData.message) {
      toast.error("Please fill out all fields");
      return;
    }
    toast.success("Message sent successfully!");
    setShowModal(false);
    setFormData({ userEmail: "", message: "" });
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="mt-25mb-25 ">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-15 font-bold">
        Top Agent of the Month
      </h1>

      <div className="flex justify-center ">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-14/15 md:max-w-10/11 lg:max-w-9/10 mx-auto bg-secondary rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
        >
          {/* Left - Agent Image */}
          <div className="relative h-[400px] md:h-auto">
            <img
              src={agent.image}
              alt={agent.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 ">
              <h2 className="text-2xl font-bold">{agent.name}</h2>
              <p className="text-sm">{agent.email}</p>
            </div>
          </div>

          {/* Right - Agent Info */}
          <div className="flex flex-col justify-center p-8 space-y-6">
            <div>
              <h3 className="text-2xl font-bold ">Meet {agent.name}</h3>
              <p className=" mt-2 text-base leading-relaxed text-gray-500">
                Discover the top-rated agent of the month. This agent has earned
                the trust of many clients through dedication, quick responses,
                and excellent service.
              </p>
            </div>

            <ul className="space-y-2 text-gray-500 text-base">
              <li>
                <strong>📧 Email:</strong> {agent.email}
              </li>
              <li>
                <strong>📝 Listings:</strong> {agent.totalProperties}
              </li>
              <li>
                <strong>🌟 Rating:</strong> 4.9/5 (Based on client reviews)
              </li>
              <li>
                <strong>📍 Location:</strong> Dhaka, Bangladesh
              </li>
            </ul>

            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded-lg bg-primary  font-medium hover:bg-blue-700 transition w-fit shadow"
            >
              Contact Agent
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              Contact {agent.name}
            </h2>
            <form onSubmit={handleFakeSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.userEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, userEmail: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-3 mt-1 resize-none h-28 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <Toaster />
    </div>
  );
}

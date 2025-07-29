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

  if (loading) return <Loader></Loader>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="mt-25">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold  mb-15 ">
        Top Agent
      </h1>
      <div className="w-full   flex items-center justify-center ">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-6xl bg-secondary rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10 p-10"
          >
            {/* Left Side - Image */}
            <motion.div
              whileHover="hover"
              className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-md"
            >
              <motion.img
                src={agent.image}
                alt={agent.name}
                className="w-full h-full object-cover transition-all duration-300 rounded-xl"
              />
              <motion.div
                variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }}
                initial="initial"
                className="absolute inset-0 bg-black bg-opacity-50 text-white flex flex-col items-center justify-center text-center px-4 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold">{agent.name}</h2>
                <p>{agent.email}</p>
                <p>Total Properties: {agent.totalProperties}</p>
              </motion.div>
            </motion.div>

            {/* Right Side - Info */}
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-800">Agent</h1>
              <p className="text-gray-700 text-lg">
                Discover the top-rated agent of the month. This agent has earned
                the trust of many clients through dedication, quick responses,
                and excellent service.
              </p>
              <ul className="text-gray-700 space-y-1 text-base">
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
                <li>
                  <strong>🏢 Member Since:</strong>{" "}
                  {new Date(agent.created_at).toLocaleDateString()}
                </li>
              </ul>
              <button
                onClick={() => setShowModal(true)}
                className="mt-6 px-6 py-3 rounded-lg bg-primary text-white hover:bg-blue-700 transition w-fit"
              >
                Contact Agent
              </button>
            </div>
          </motion.div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold mb-3">
                Contact {agent.name}
              </h2>
              <form onSubmit={handleFakeSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.userEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, userEmail: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-3"
                  required
                />
                <textarea
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-3 resize-none h-28"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

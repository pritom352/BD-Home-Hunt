import React, { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router"; // ✅ Corrected import

const PropertyCard = ({ property }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <div className="bg-secondary rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div ref={ref} className="overflow-hidden relative group">
        <motion.img
          src={property.images[0]}
          alt={property.title}
          className="object-cover w-full h-48 transform transition-transform duration-500 group-hover:scale-110"
          initial={{ filter: "blur(8px)" }}
          animate={controls}
          variants={{
            visible: {
              filter: "blur(0px)",
              transition: { delay: 0.6, duration: 0.8 },
            },
          }}
        />

        {/* Sliding overlay */}
        <motion.div
          className="absolute top-0 left-0 h-full w-full bg-white/30"
          initial={{ x: "-100%" }}
          animate={inView ? { x: "100%" } : {}}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        ></motion.div>

        {/* Verification badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${
              property.verificationStatus === "verified"
                ? "bg-green-100 text-green-700"
                : property.verificationStatus === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {property.verificationStatus || "Pending"}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-1 flex-1">
        {/* Price Range */}
        <motion.p
          className="text-xl font-bold text-green-600"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {property.priceRange}
        </motion.p>

        {/* Title */}
        <motion.h2
          className="text-xl font-semibold text-gray-800"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
        >
          {property.title}
        </motion.h2>

        {/* Location */}
        <motion.p
          className="text-sm text-gray-500 flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.15 }}
        >
          <FaMapMarkerAlt className="text-red-500 text-base" />
          {property.location}
        </motion.p>
      </div>

      {/* View Details Button */}
      <div className="px-4 pb-4 mt-auto">
        <Link to={`/property/${property._id}`}>
          <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;

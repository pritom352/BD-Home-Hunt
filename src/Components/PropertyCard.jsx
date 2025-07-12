import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";

const PropertyCard = ({ property }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  if (inView) {
    controls.start("visible");
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div ref={ref} className="overflow-hidden relative group">
        {/* Image */}
        <motion.img
          src={property.image}
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

        {/* Sliding bar */}
        <motion.div
          className="absolute top-0 left-0 h-full w-full bg-white/30"
          initial={{ x: "-100%" }}
          animate={inView ? { x: "100%" } : {}}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        ></motion.div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        <p className="text-2xl font-bold text-green-600">${property.price}</p>
        <h2 className="text-3xl font-semibold text-gray-800">
          {property.title}
        </h2>

        {/* Location */}
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
          <FaMapMarkerAlt className="text-red-500" />
          {property.location}
        </p>

        <div className="border-t my-4"></div>

        <Link to={`property/${property._id}`}>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;

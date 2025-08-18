import CountUp from "react-countup";
import { FaHome, FaUsers, FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { BsArrowDown } from "react-icons/bs";
import { Link } from "react-router";

const stats = [
  {
    icon: <FaHome className="text-blue-400 w-6 h-6 mx-auto mb-2" />,
    label: "Properties Listed",
    value: 500,
  },
  {
    icon: <FaUsers className="text-blue-400 w-6 h-6 mx-auto mb-2" />,
    label: "Happy Clients",
    value: 300,
  },
  {
    icon: <FaMapMarkedAlt className="text-blue-400 w-6 h-6 mx-auto mb-2" />,
    label: "Locations Covered",
    value: 50,
  },
];

const Banner = () => {
  return (
    <section className="relative w-full overflow-hidden flex flex-col justify-between">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80"
          alt="Dream Home"
          className="w-full h-full object-cover brightness-75"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-20 lg:py-28 flex flex-col md:flex-row items-center gap-10 md:gap-12 flex-1">
        {/* Left Content */}
        <motion.div
          className="w-full md:w-1/2 text-white text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            Find Your Dream Home <br /> in the Best Locations
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8">
            Explore verified properties, connect with top agents, and make your
            home buying experience seamless and enjoyable.
          </p>

          {/* Call-to-Action Button */}
          <Link to={"/allPropertie"}>
            <button className="inline-block bg-primary hover:bg-blue-600 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-lg transition">
              Browse Properties
            </button>
          </Link>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-xl text-center shadow-lg hover:scale-105 transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                {stat.icon}
                <h2 className="text-2xl sm:text-3xl text-white font-bold">
                  <CountUp end={stat.value} />+
                </h2>
                <p className="text-gray-200 mt-1 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Hero Image */}
        <motion.div
          className="w-full md:w-1/2 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80"
            alt="Dream Home"
            className="w-full h-[250px] sm:h-[350px] md:h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <BsArrowDown className="w-6 h-6 animate-bounce" />
        <p className="text-xs sm:text-sm mt-1 text-gray-200">Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default Banner;

// src/Pages/About/About.jsx
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Alice Thompson",
    role: "Founder & CEO",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Robert Williams",
    role: "Chief Technology Officer",
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    name: "Sophia Lee",
    role: "Head of Property Listings",
    image: "https://i.pravatar.cc/150?img=7",
  },
  {
    name: "David Brown",
    role: "Marketing & Customer Relations",
    image: "https://i.pravatar.cc/150?img=8",
  },
];

const coreValues = [
  {
    title: "Customer Focus",
    desc: "We put property buyers and sellers at the center of everything we do.",
  },
  {
    title: "Transparency",
    desc: "Honest and clear property listings with real-time updates.",
  },
  {
    title: "Innovation",
    desc: "Leveraging technology to simplify property buying and selling.",
  },
  {
    title: "Reliability",
    desc: "Trusted platform for secure property transactions.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen  ">
      {/* Hero Section */}
      <section
        className="relative bg-cover border-2 border-red-600 bg-center"
        style={{
          backgroundImage:
            "url('https://images.stockcake.com/public/6/f/2/6f2b4d42-b3c9-4d85-919d-2f61b9b97f56_large/team-meeting-discussion-stockcake.jpg')",
        }}
      >
        <div className=" border border-blue-600 bg-opacity-50 py-32 text-center text-white">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Our Real Estate Platform
          </motion.h1>
          <motion.p
            className="text-lg text-gray-500 md:text-2xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Connecting buyers and sellers with trusted property listings and
            seamless transactions.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-semibold mb-6">Our Story</h2>
        <p className="max-w-3xl mx-auto text-lg  text-gray-500">
          Founded in 2022, we started as a small property listing platform.
          Today, we empower thousands of users to buy, sell, and rent properties
          efficiently. Our journey has always focused on simplifying the
          property market experience while maintaining transparency and trust.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 md:px-20  text-center">
        <h2 className="text-4xl font-semibold mb-12">Mission & Vision</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className=" text-lg text-gray-500">
              To provide a reliable and user-friendly platform for property
              transactions that connects buyers, sellers, and agents seamlessly.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className=" text-lg text-gray-500">
              To be the leading property marketplace in the region, enabling
              safe, transparent, and efficient real estate experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6 md:px-20  text-center">
        <h2 className="text-4xl font-semibold mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {coreValues.map((v, idx) => (
            <motion.div
              key={idx}
              className=" p-6 rounded-xl shadow  bg-secondary hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-gray-500">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16  px-6 md:px-20 text-center">
        <h2 className="text-4xl font-semibold mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              className=" rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover shadow-md"
              />
              <h3 className="mt-4 text-xl font-medium">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

// src/Pages/Home/FAQ.jsx
import { motion } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I add my property to the platform?",
      answer:
        "Agents can log in and navigate to the 'Add Property' page in their dashboard. Fill in all required fields, upload images, and submit for admin verification.",
    },
    {
      question: "How can I buy a property?",
      answer:
        "Users can browse verified properties, click on 'Add to Wishlist', then make an offer. Once the agent accepts, you can pay and complete the purchase through the payment page.",
    },
    {
      question: "Can I edit my property after submission?",
      answer:
        "Yes, agents can edit properties that are pending or rejected by admin. Once verified, properties cannot be edited.",
    },
    {
      question: "How do I leave a review for a property?",
      answer:
        "On the Property Details page, logged-in users can click 'Add a Review' to submit their feedback. All reviews are visible under the property.",
    },
    {
      question: "How can admins manage users and properties?",
      answer:
        "Admins have a dashboard to manage all users, properties, and reviews. They can verify/reject properties, assign roles, mark fraud, and delete content as needed.",
    },
  ];

  return (
    <section className="mt-20 ">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="max-w-4xl mx-auto  space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            className="collapse bg-secondary border border-base-300 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
          >
            <input
              type="radio"
              name="faq-accordion"
              defaultChecked={idx === 0}
            />
            <div className="collapse-title font-semibold text-gray-500 text-base sm:text-lg md:text-xl">
              {faq.question}
            </div>
            <div className="collapse-content text-gray-500 text-sm sm:text-base md:text-lg">
              {faq.answer}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

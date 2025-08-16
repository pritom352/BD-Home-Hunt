import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full mt-20">
      {/* Banner */}
      <div
        className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url('https://i.ibb.co/3yBrJRh/contact-banner.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
            Get in Touch
          </h1>
          <p className="mt-2 sm:mt-3 md:mt-4 text-base sm:text-lg md:text-xl">
            We’d love to hear from you. Reach out for any property-related
            query.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8  mt-20">
        {/* Left: Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="border rounded-lg p-3 w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border rounded-lg p-3 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg p-3 w-full"
            />
            <textarea
              placeholder="Message"
              rows="4"
              className="border rounded-lg p-3 w-full"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md w-full"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right: Info Card */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://www.shutterstock.com/image-photo/young-friendly-operator-woman-agent-600nw-712414813.jpg"
            alt="Contact Background"
            className="absolute  w-full h-full object-cover opacity-40"
          />
          <div className="relative p-8 space-y-4">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <p className="text-gray-700">We’re here to help you 24/7</p>

            <div className="flex items-center gap-3">
              <MapPin className="text-black" />
              <span>Banani, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-black" />
              <span>+880 1234-567890</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-black" />
              <span>pritomproshad@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-black" />
              <span>Sat - Thu, 10:00 AM - 7:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-64 sm:h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg my-20">
        <iframe
          src="https://maps.google.com/maps?q=24.792221602473735,88.94310960862755&z=15&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

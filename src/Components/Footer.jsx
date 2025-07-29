import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Logo & Tagline */}
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            BDHomeHunt
          </h2>
          <p className="mt-2 text-sm">
            Find your dream home in the best locations with verified agents and
            great deals.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex-1 text-center">
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-sm">123 Main Street, Dhaka, Bangladesh</p>
          <p className="text-sm">Email: info@dreamhome.com</p>
          <p className="text-sm">Phone: +880 1234-567890</p>
        </div>

        {/* Social Links */}
        <div className="flex-1 text-right">
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex justify-end space-x-4 text-xl">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} DreamHome. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

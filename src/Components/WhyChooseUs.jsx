import { Home, Users, CreditCard, Headphones } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <div className="relative mt-20">
      {/* Banner */}
      <div
        className="w-full h-[270px] md:h-[320px] lg:h-[370px] bg-cover bg-center flex flex-col justify-center items-center text-white px-4 text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG91c2UlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D')",
        }}
      >
        <h2 className="text-2xl md:text-4xl font-bold">Why Choose Us</h2>
        <p className="text-base md:text-lg mt-2">
          We make your property journey easy and trusted
        </p>
      </div>

      {/* Card Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-secondary shadow-lg rounded-2xl -mt-16 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* Part 1 */}
          <div className="flex flex-col items-center justify-center p-6 min-h-[220px]">
            <Home className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-lg md:text-xl font-semibold">Find Your Home</h3>
            <p className="text-gray-500 mt-2 text-sm md:text-base text-center">
              Browse thousands of verified properties.
            </p>
          </div>

          {/* Part 2 */}
          <div className="flex flex-col items-center justify-center p-6 min-h-[220px]">
            <Users className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-lg md:text-xl font-semibold">
              Trusted by Thousands
            </h3>
            <p className="text-gray-500 mt-2 text-sm md:text-base text-center">
              Our clients trust us for reliability.
            </p>
          </div>

          {/* Part 3 */}
          <div className="flex flex-col items-center justify-center p-6 min-h-[220px]">
            <CreditCard className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-lg md:text-xl font-semibold">
              Financing Made Easy
            </h3>
            <p className="text-gray-500 mt-2 text-sm md:text-base text-center">
              Flexible and easy payment solutions.
            </p>
          </div>

          {/* Part 4 */}
          <div className="flex flex-col items-center justify-center p-6 min-h-[220px]">
            <Headphones className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-lg md:text-xl font-semibold">24/7 Support</h3>
            <p className="text-gray-500 mt-2 text-sm md:text-base text-center">
              We’re here anytime you need help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

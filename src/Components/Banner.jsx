import CountUp from "react-countup";

const Banner = () => {
  return (
    <section className="bg-white relative overflow-hidden w-full">
      <div className="flex flex-col md:flex-row w-full min-h-[400px]">
        {/* Left Part */}
        <div className="md:w-3/5 ml-20 bg-white p-8 md:p-12  flex md:-skew-x-6 z-10 flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Find your dream home <br />
            in the best location
          </h1>

          <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm">
            <div className="bg-gray-100 p-4 rounded shadow text-center">
              <h2 className="text-2xl font-bold text-blue-600">
                <CountUp end={500} />+
              </h2>
              <p className="text-gray-500 text-sm">Properties Listed</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow text-center">
              <h2 className="text-2xl font-bold text-blue-600">
                <CountUp end={300} />+
              </h2>
              <p className="text-gray-500 text-sm">Happy Clients</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow text-center col-span-2">
              <h2 className="text-2xl font-bold text-blue-600">
                <CountUp end={50} />+
              </h2>
              <p className="text-gray-500 text-sm">Locations Covered</p>
            </div>
          </div>
        </div>

        {/* Right Part */}
        <div className="md:w-3/5 ">
          <div className="h-full w-full   origin-left overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80"
              alt="Dream Home"
              className="w-full h-full object-cover "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

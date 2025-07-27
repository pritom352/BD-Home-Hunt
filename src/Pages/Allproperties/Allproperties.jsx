import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import Loader from "../Loader/Loader";

const AllProperties = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const navigate = useNavigate();

  const {
    data: properties,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:3000/property?verifiedOnly=true"
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error.message || "Something went wrong"}
      </div>
    );
  }

  const filteredProperties = properties.filter((property) =>
    property.location?.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <section className=" mx-auto my-25 ">
      <h2 className="text-3xl font-bold mb-15 text-center text-gray-800">
        All Listed Properties
      </h2>

      {/* Search Input */}
      <div className="mb-15 flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="w-full sm:w-[400px] px-5 py-3 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {filteredProperties.length === 0 ? (
        <p className="text-center text-gray-500">
          No verified properties found for this location.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <div
              key={property._id}
              className="bg-secondary shadow rounded overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img
                src={
                  property.image ||
                  property.images?.[0] ||
                  "https://via.placeholder.com/400x250?text=No+Image"
                }
                alt={property.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold">
                  Title: {property.title}
                </h3>
                <p className="text-gray-600">
                  <span className=" font-bold">Location: </span>
                  {property.location}
                </p>

                <div className="flex items-center gap-2">
                  <img
                    src={
                      property.agentImage ||
                      `https://i.pravatar.cc/40?u=${property.agentName}`
                    }
                    alt={property.agentName}
                    className="w-8 h-8 rounded-full border"
                  />
                  <span className="text-sm text-gray-700">
                    {property.agentName}
                  </span>
                </div>

                <div className="flex justify-start">
                  <span className="px-2 border py-1 text-xs rounded-full bg-green-100 text-green-700">
                    Verified
                  </span>
                </div>

                <p className="text-gray-700 font-medium">
                  Price: {property.priceRange}
                </p>

                <button
                  onClick={() => navigate(`/property/${property._id}`)}
                  className="mt-auto bg-primary text-white px-3 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProperties;

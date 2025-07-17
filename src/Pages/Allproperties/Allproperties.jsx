import { useEffect, useState } from "react";
import { Link } from "react-router";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:3000/property");
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.error("Failed to fetch properties", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading properties...</div>;
  }

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        All Listed Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500">No properties found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-lg shadow hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex flex-col overflow-hidden relative"
            >
              {/* Property Image */}
              <div className="relative">
                <img
                  src={
                    property.image ||
                    property.images?.[0] ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />

                {/* Verified Badge */}
                <span
                  className={`absolute top-2 left-2 px-2 py-1 text-xs rounded ${
                    property.isVerified
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {property.isVerified ? "Verified" : "Not Verified"}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {property.title}
                </h3>
                <p className="text-gray-500 text-sm">{property.location}</p>

                {/* Agent */}
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={
                      property.agentImage ||
                      `https://i.pravatar.cc/40?u=${property.agentName}`
                    }
                    alt={property.agentName}
                    className="w-8 h-8 rounded-full border"
                  />
                  <span className="text-sm text-gray-600">
                    {property.agentName}
                  </span>
                </div>

                {/* Price Range */}
                <p className="text-blue-600 font-semibold">
                  Price: {property.priceRange}
                </p>

                <div className="mt-auto">
                  <Link
                    to={`/property/${property._id}`}
                    className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300 text-center w-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProperties;

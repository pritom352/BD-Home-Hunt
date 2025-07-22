import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ Initialize

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3000/property?verifiedOnly=true"
      );
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
        <p className="text-center text-gray-500">
          No verified properties found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition flex flex-col"
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
                  {" "}
                  <span className="px-2 border  py-1 text-xs rounded-full bg-green-100 text-green-700">
                    Verified
                  </span>
                </div>

                <p className="text-gray-700 font-medium">
                  Price: {property.priceRange}
                </p>

                <button
                  onClick={() => navigate(`/property/${property._id}`)}
                  className="mt-auto bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
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

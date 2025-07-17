import { useEffect, useState } from "react";
import axios from "axios";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/property");
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/property/${id}/status`, {
        verificationStatus: status,
      });
      setProperties((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, verificationStatus: status } : p
        )
      );
      alert(`Property ${status} successfully`);
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Properties</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Agent</th>
            <th className="p-2 border">Agent Email</th>
            <th className="p-2 border">Price Range</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id}>
              <td className="p-2 border">{property.title}</td>
              <td className="p-2 border">{property.location}</td>
              <td className="p-2 border">{property.agentName}</td>
              <td className="p-2 border">{property.agentEmail}</td>
              <td className="p-2 border">{property.priceRange}</td>
              <td className="p-2 border space-x-2">
                {property.verificationStatus === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(property._id, "verified")}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => updateStatus(property._id, "rejected")}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </>
                )}

                {property.verificationStatus === "verified" && (
                  <span className="text-green-700 font-semibold">
                    ✅ Verified
                  </span>
                )}

                {property.verificationStatus === "rejected" && (
                  <span className="text-red-700 font-semibold">
                    ❌ Rejected
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ManageProperties;

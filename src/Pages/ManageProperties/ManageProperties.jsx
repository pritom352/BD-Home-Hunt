import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ManageProperties = () => {
  const queryClient = useQueryClient();

  const {
    data: properties = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/propertys");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      await axios.patch(`http://localhost:3000/property/${id}/status`, {
        verificationStatus: status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      alert("Property status updated successfully");
    },
    onError: () => {
      alert("Failed to update status");
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  if (isError)
    return (
      <div className="text-center py-10 text-red-600">
        Error: {error.message}
      </div>
    );

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
                      onClick={() =>
                        mutation.mutate({
                          id: property._id,
                          status: "verified",
                        })
                      }
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      disabled={mutation.isLoading}
                    >
                      Verify
                    </button>
                    <button
                      onClick={() =>
                        mutation.mutate({
                          id: property._id,
                          status: "rejected",
                        })
                      }
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      disabled={mutation.isLoading}
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

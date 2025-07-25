import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const MyAddedProperties = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: properties = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myProperties", user?.email],
    queryFn: async ({ queryKey }) => {
      const email = queryKey[1];
      const res = await axios.get(
        `http://localhost:3000/myProperty?agentEmail=${email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:3000/property/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myProperties", user?.email],
      });
    },
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete?")) {
      mutation.mutate(id);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10">Failed to fetch.</div>;

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Added Properties
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white shadow rounded p-4 flex flex-col"
          >
            <img
              src={
                property.image ||
                property.images?.[0] ||
                "https://via.placeholder.com/400x250"
              }
              alt={property.title}
              className="w-full h-40 object-cover rounded"
            />

            <h3 className="text-lg font-semibold mt-2 line-clamp-2 min-h-[3em]">
              {property.title}
            </h3>

            <div className="flex-1 flex flex-col justify-center gap-1 text-sm text-gray-700">
              <p>{property.location}</p>

              <div className="flex items-center gap-2">
                <img
                  src={
                    property.agentImage ||
                    `https://i.pravatar.cc/40?u=${property.agentName}`
                  }
                  alt={property.agentName}
                  className="w-8 h-8 rounded-full"
                />
                <span>{property.agentName}</span>
              </div>

              <span
                className={`px-2 py-1 rounded text-xs self-start ${
                  property.verificationStatus === "verified"
                    ? "bg-green-100 text-green-700"
                    : property.verificationStatus === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {property.verificationStatus || "pending"}
              </span>

              <p>Price Range: {property.priceRange}</p>
              <p>Min Price: {property.minPrice}</p>
              <p>Max Price: {property.maxPrice}</p>
            </div>

            <div className="flex gap-2 mt-2">
              {property.verificationStatus !== "rejected" && (
                <Link
                  to={`/dashboard/update-property/${property._id}`}
                  className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-center hover:bg-blue-700"
                >
                  Update
                </Link>
              )}
              <button
                onClick={() => handleDelete(property._id)}
                className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyAddedProperties;

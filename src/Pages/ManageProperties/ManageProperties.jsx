import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

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
      const res = await axios.get(
        "https://assignment12-server-lyart.vercel.app/propertys"
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      await axios.patch(
        `https://assignment12-server-lyart.vercel.app/property/${id}/status`,
        {
          verificationStatus: status,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success("Property status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  if (isLoading) return <Loader></Loader>;

  if (isError)
    return (
      <div className="text-center py-10 text-red-600">
        Error: {error.message}
      </div>
    );

  return (
    <section className="max-w-6xl mx-auto  my-25">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-15">
        Manage Properties
      </h2>
      <table className="w-full  ">
        <thead>
          <tr className="bg-secondary">
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
            <tr className=" bg-secondary" key={property._id}>
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
                      className="bg-primary text-white px-2 py-1 rounded hover:bg-blue-700"
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

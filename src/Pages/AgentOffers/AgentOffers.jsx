import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AgentOffers = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: offers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["agentOffers", user?.email],
    enabled: !!user?.email,
    queryFn: async ({ queryKey }) => {
      const email = queryKey[1];
      const res = await axios.get(
        `http://localhost:3000/agent-offers?agentEmail=${email}`
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, propertyId, status }) => {
      await axios.patch(`http://localhost:3000/offers/${id}/status`, {
        propertyId,
        status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agentOffers", user?.email] });
    },
  });

  const handleStatusUpdate = (id, propertyId, status) => {
    mutation.mutate({ id, propertyId, status });
  };

  if (isLoading) return <p className="text-center py-6">Loading...</p>;
  if (isError) return <p className="text-center py-6">Error loading offers.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📋 My Property Offers</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Property Title</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Buyer Email</th>
              <th className="px-4 py-2">Buyer Name</th>
              <th className="px-4 py-2">Offered Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id} className="border-t">
                <td className="px-4 py-2">
                  {offer.propertyTitle.length > 15
                    ? offer.propertyTitle.slice(0, 15) + "..."
                    : offer.propertyTitle}
                </td>
                <td className="px-4 py-2">{offer.propertyLocation}</td>
                <td className="px-4 py-2">{offer.buyerEmail}</td>
                <td className="px-4 py-2">{offer.buyerName}</td>
                <td className="px-4 py-2">${offer.offerAmount}</td>
                <td className="px-4 py-2">{offer.status}</td>
                <td className="px-4 py-2">
                  {offer.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            offer._id,
                            offer.propertyId,
                            "accepted"
                          )
                        }
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            offer._id,
                            offer.propertyId,
                            "rejected"
                          )
                        }
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentOffers;

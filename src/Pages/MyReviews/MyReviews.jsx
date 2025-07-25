import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/reviews?userEmail=${user.email}`
      );
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:3000/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", user?.email] });
    },
  });

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p className="text-center mt-8">Loading…</p>;
  if (isError)
    return (
      <p className="text-center mt-8 text-red-600">Error: {error.message}</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold text-center">📝 My Reviews</h1>

      {reviews.length === 0 && (
        <p className="text-center text-gray-500">No reviews found.</p>
      )}

      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white shadow rounded p-4 flex flex-col gap-2"
        >
          <h2 className="text-xl font-semibold text-blue-800">
            {review.propertyTitle || "Property Title Not Available"}
          </h2>
          <p className="text-gray-700"> Agent: {review.agentName || "N/A"}</p>
          <p className="text-sm text-gray-500">
            🕒 {new Date(review.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-800 break-words">{review.comment}</p>
          <button
            onClick={() => handleDelete(review._id)}
            className="self-end mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            ❌ Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;

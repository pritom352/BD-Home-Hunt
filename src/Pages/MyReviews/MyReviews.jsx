import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/reviews?userEmail=${user?.email}`)
      .then((res) => setReviews(res.data))
      .catch(() => setError("Failed to load reviews"))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:3000/reviews/${id}`);
      setReviews(reviews.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete review.");
    }
  };

  if (loading) return <p className="text-center mt-8">Loading…</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;

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
          <p className="text-gray-800  break-words">{review.comment}</p>
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

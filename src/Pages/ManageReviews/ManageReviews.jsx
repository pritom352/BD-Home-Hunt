import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchReviews = async () => {
  const { data } = await axios.get("http://localhost:3000/reviews/all");
  return data;
};

const ManageReviews = () => {
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`http://localhost:3000/adminReviews/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["reviews"]),
  });

  if (isLoading)
    return <div className="text-center py-10">Loading reviews...</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Reviews</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={r.userImage}
                alt={r.userName}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-lg font-semibold">{r.userName}</h4>
                <p className="text-sm text-gray-500">{r.userEmail}</p>
              </div>
            </div>

            <p className="text-gray-700 mt-2 flex-1">{r.comment}</p>

            <button
              onClick={() => deleteMutation.mutate(r._id)}
              className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded shadow self-end"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;

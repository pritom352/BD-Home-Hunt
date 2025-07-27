import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Loader/Loader";

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

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="max-w-6xl mx-auto my-25   ">
      <h2 className="text-4xl sm:text-3xl font-bold mb-15 text-center">
        Manage Reviews
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-secondary shadow rounded-xl p-4 flex flex-col gap-4 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={r.userImage}
                alt={r.userName}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-base sm:text-lg font-semibold">
                  {r.userName}
                </h4>
                <p className="text-sm text-gray-500">{r.userEmail}</p>
              </div>
            </div>

            <p className="text-gray-700 text-sm sm:text-base line-clamp-4 overflow-scroll">
              {r.comment}
            </p>

            <button
              onClick={() => deleteMutation.mutate(r._id)}
              className="mt-auto w-full sm:w-auto px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition"
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

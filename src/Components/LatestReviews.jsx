import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const LatestReviews = () => {
  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/reviews/latest");
      return res.data;
    },
  });

  if (isLoading)
    return <div className="text-center py-10">Loading reviews...</div>;

  if (isError)
    return (
      <div className="text-center py-10 text-red-600">
        Error: {error.message || "Failed to load reviews."}
      </div>
    );

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
        🌟 Latest User Reviews
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="relative bg-white rounded-xl shadow-md hover:shadow-xl border-t-4 border-blue-500 hover:border-blue-600 transition duration-300 flex flex-col"
          >
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={
                    review.userImage ||
                    `https://i.pravatar.cc/100?u=${review.userEmail}`
                  }
                  alt={review.userName}
                  className="w-14 h-14 rounded-full border-2 border-blue-500 shadow"
                />
                <div>
                  <p className="font-semibold text-lg">{review.userName}</p>
                  <p className="text-xs text-gray-400">{review.userEmail}</p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {review.propertyTitle || "Untitled Property"}
                </span>
              </p>

              {/* Review Description */}
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-600 italic text-center overflow-auto break-words">
                  “{review.comment}”
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 text-right rounded-b-xl">
              <span className="text-xs text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestReviews;

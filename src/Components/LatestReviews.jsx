import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Pages/Loader/Loader";
import { Quote } from "lucide-react"; // for quotation icon

const LatestReviews = () => {
  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: async () => {
      const res = await axios.get(
        "https://assignment12-server-lyart.vercel.app/reviews/latest"
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center py-10 text-red-600">
        Error: {error.message || "Failed to load reviews."}
      </div>
    );

  return (
    <section className="max-w-14/15 md:max-w-10/11 lg:max-w-9/10 mx-auto">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-10 text-center">
        🌟 Latest User Reviews
      </h2>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="relative bg-secondary rounded-xl shadow-md hover:shadow-xl border-t-4 border-blue-500 hover:border-blue-600 transition duration-300 flex flex-col justify-between"
          >
            {/* Comment */}
            <div className="p-6">
              <p className="text-gray-500 italic text-center text-base sm:text-lg">
                “{review.comment}”
              </p>
            </div>

            {/* User info + Quote */}
            <div className="flex items-center justify-between px-6 py-4 bg-secondary rounded-b-xl">
              <div className="flex items-center gap-3">
                <img
                  src={
                    review.userImage ||
                    `https://i.pravatar.cc/100?u=${review.userEmail}`
                  }
                  alt={review.userName}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-500 shadow"
                />
                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    {review.userName}
                  </p>
                  <p className="text-xs text-gray-400">{review.userEmail}</p>
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium block mt-1">
                    {review.propertyTitle || "Untitled Property"}
                  </span>
                </div>
              </div>
              <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 opacity-70" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestReviews;

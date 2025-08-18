import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

const PropertyDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [wishlistMsg, setWishlistMsg] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");

  // Fetch Property Data
  const {
    data: property,
    isLoading: propertyLoading,
    error: propertyError,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://assignment12-server-lyart.vercel.app/property/${id}`
      );
      setSelectedImage(data.image || data.images?.[0]);
      return data;
    },
  });

  // Fetch Reviews
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://assignment12-server-lyart.vercel.app/reviews`
      );
      return data.filter((review) => review.propertyId === id);
    },
  });

  // Handle Wishlist
  const handleAddToWishlist = async () => {
    try {
      const res = await axios.post(
        "https://assignment12-server-lyart.vercel.app/wishlist",
        {
          propertyId: id,
          userEmail: user?.email,
        }
      );
      if (res.status === 201) {
        toast.success("✅ Added to Wishlist!");
      } else {
        toast.error("❌ Failed to add to Wishlist.");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setWishlistMsg("⚠️ Already in Wishlist.");
      } else {
        setWishlistMsg("⚠️ Something went wrong.");
      }
    }
  };

  // Submit Review
  const handleSubmitReview = async () => {
    if (!reviewText.trim()) return;

    const review = {
      propertyId: id,
      propertyTitle: property?.title,
      userEmail: user?.email,
      userName: user?.displayName,
      userImage: user?.photoURL,
      comment: reviewText,
      agentName: property.agentName,
    };

    try {
      const res = await axios.post(
        `https://assignment12-server-lyart.vercel.app/reviews`,
        review
      );
      if (res.status === 201 || res.status === 200) {
        refetchReviews();
        setReviewText("");
        setShowModal(false);
      } else {
        console.error("Failed to submit review");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (propertyLoading) return <Loader></Loader>;
  if (propertyError)
    return <p className="text-center mt-8">Error loading property</p>;
  if (!property) return <p className="text-center mt-8">Property not found</p>;

  return (
    <div className="max-w-6xl mx-auto  my-25">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-15">
        Property Details
      </h1>

      {/* Property Display */}
      <div className="bg-secondary rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 overflow-hidden">
          <img
            src={selectedImage}
            alt={property.title}
            className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500 rounded"
          />
          <div className="flex gap-2 mt-4 flex-wrap">
            {property.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover cursor-pointer rounded border ${
                  selectedImage === img ? "ring-4 ring-blue-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/3 p-6 flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              {property.title}
            </h2>
            <p className="text-gray-600 mt-2 text-justify">
              {property.description}
            </p>
            <p className="text-gray-500 mt-2">
              📍 <span className="font-medium">{property.location}</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-lg font-semibold">
                💲 {property.priceRange}
              </span>
            </div>
          </div>

          <div>
            <button
              onClick={handleAddToWishlist}
              className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-3 rounded-lg shadow hover:scale-105 transition-transform"
            >
              ❤️ Add to Wishlist
            </button>
            {wishlistMsg && (
              <p className="mt-2 text-sm text-green-700">{wishlistMsg}</p>
            )}
          </div>
        </div>
      </div>

      {/* Agent Info */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-15 font-semibold  mt-25">
        👨‍💼 Agent Information
      </h2>
      <div className="bg-secondary rounded-xl shadow-lg overflow-hidden p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={property.agentImage || "https://i.pravatar.cc/100"}
            alt={property.agentName}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {property.agentName}
            </h3>
            <p className="text-gray-600">
              {property.agentEmail || "Not provided"}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-yellow-500 text-xl">⭐ 4.8/5</p>
          <p className="text-sm text-gray-500">12 years experience</p>
          <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
            📧 Contact Agent
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-secondary rounded-xl shadow-lg overflow-hidden p-6 mt-6 space-y-4">
        <h3 className="text-2xl font-semibold">📋 Reviews</h3>
        {reviewsLoading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div key={idx} className="border-b py-2">
              <p className="font-medium">{review.userName}:</p>
              <p className="text-gray-600 break-words">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        <button
          onClick={() => setShowModal(true)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add a Review
        </button>
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add Your Review</h3>
            <textarea
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              placeholder="Write your review here..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;

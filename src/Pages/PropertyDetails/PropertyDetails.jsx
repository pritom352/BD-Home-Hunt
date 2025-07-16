import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const PropertyDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlistMsg, setWishlistMsg] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/property/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setSelectedImage(data?.images?.[0] || data?.image);
        // setReviews(data?.reviews || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);
  console.log("okkkkkkkkkkkkkkkkk", user);

  const handleAddToWishlist = async () => {
    try {
      const res = await axios.post("http://localhost:3000/wishlist", {
        propertyId: id,
        userEmail: user?.email,
      });
      if (res.status === 201) {
        setWishlistMsg("✅ Added to Wishlist!");
      } else {
        setWishlistMsg("❌ Failed to add to Wishlist.");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setWishlistMsg("⚠️ Already in Wishlist.");
      } else {
        setWishlistMsg("⚠️ Something went wrong.");
      }
    }
  };
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
      const res = await fetch(`http://localhost:3000/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      if (res.ok) {
        setReviews([
          ...reviews,
          {
            userName: review.userName,
            comment: review.comment,
          },
        ]);
        setReviewText("");
        setShowModal(false);
      } else {
        console.error("Failed to submit review");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!property) return <p className="text-center mt-8">Property not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        🏡 Property Details
      </h1>

      {/* Main Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-6">
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

      <h2 className="text-2xl font-semibold text-gray-700 mt-10">
        👨‍💼 Agent Information
      </h2>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 flex flex-col md:flex-row items-center justify-between gap-4">
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

      {/* Reviews */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mt-6 space-y-4">
        <h3 className="text-2xl font-semibold">📋 Reviews</h3>

        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div key={idx} className="border-b py-2">
              <p className="font-medium">{review.userName}:</p>
              <p className="text-gray-600">{review.comment}</p>
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

      {/* Modal */}
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

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlistMsg, setWishlistMsg] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/property/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setSelectedImage(data?.images?.[0] || data?.image); // default main image
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToWishlist = () => {};

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!property) return <p className="text-center mt-8">Property not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        🏡 Property Details
      </h1>

      {/* Main Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-6">
        {/* Big Image + Thumbnails */}
        <div className="md:w-2/3 overflow-hidden">
          <img
            src={selectedImage}
            alt={property.title}
            className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500 rounded"
          />

          {/* Thumbnails */}
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

        {/* Property Info */}
        <div className="md:w-1/3 p-6 flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              {property.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 mt-2 text-justify">
              {property.description}
            </p>

            {/* Location */}
            <p className="text-gray-500 mt-2">
              📍 <span className="font-medium">{property.location}</span>
            </p>

            {/* Price Range */}
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

      {/* Agent Info Section Title */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-10">
        👨‍💼 Agent Information
      </h2>

      {/* Agent Info */}
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
    </div>
  );
};

export default PropertyDetails;

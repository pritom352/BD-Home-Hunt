import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";

const WishlistPage = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return; // safeguard

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/wishlist?userEmail=${user.email}`
        );
        setWishlist(res.data);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user?.email]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/wishlist/${id}`);
      setWishlist((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to remove wishlist item:", error);
    }
  };

  //   const handleMakeOffer = (property) => {
  //     alert(`You can now make an offer on: ${property.propertyTitle}`);
  //   };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  if (wishlist.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">No items in wishlist.</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">❤️ My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <img
              src={item.propertyImage}
              alt={item.propertyTitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{item.propertyTitle}</h2>
              <p className="text-gray-600">📍 {item.propertyLocation}</p>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={item.agentImage || "https://i.pravatar.cc/40"}
                  alt={item.agentName}
                  className="w-8 h-8 rounded-full"
                />
                <span>{item.agentName}</span>
              </div>
              <p className="text-sm">
                🔷 Status:{" "}
                {item.isVerified ? (
                  <span className="text-green-600 font-semibold">Verified</span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Not Verified
                  </span>
                )}
              </p>
              <p className="text-lg font-bold text-green-700">
                💲 {item.priceRange}
              </p>

              <div className="flex justify-between mt-4">
                <Link to={`/dashboard/makeOffer/${item.propertyId}`}>
                  <button
                    // onClick={() => handleMakeOffer(item)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    📝 Make an Offer
                  </button>
                </Link>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;

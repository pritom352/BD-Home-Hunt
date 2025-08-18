import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router"; // corrected import
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import useRole from "../../hooks/useRole";

const fetchWishlist = async (email) => {
  const res = await axios.get(
    `https://assignment12-server-lyart.vercel.app/wishlist?userEmail=${email}`
  );
  return res.data;
};

const deleteWishlistItem = async (id) => {
  await axios.delete(
    `https://assignment12-server-lyart.vercel.app/wishlist/${id}`
  );
};

const WishlistPage = () => {
  const { user } = useContext(AuthContext);

  const [role, isRoleLoading] = useRole();

  const queryClient = useQueryClient();

  const {
    data: wishlist = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: () => fetchWishlist(user.email),
    enabled: !!user?.email,
  });

  // Mutation to delete wishlist item using object syntax
  const mutation = useMutation({
    mutationFn: deleteWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", user?.email] });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleRemove = (id) => {
    mutation.mutate(id);
  };

  if (isLoading) return <Loader></Loader>;
  if (isError)
    return (
      toast.error("Error. try again"),
      (<p className="text-center mt-8 text-red-600">Error loading wishlist.</p>)
    );
  if (wishlist.length === 0)
    return (
      <p className="text-center text-gray-500 mt-8">No items in wishlist.</p>
    );
  if (isRoleLoading) return <Loader />;
  return (
    <div className="max-w-6xl mx-auto  my-25">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-15">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="bg-secondary shadow rounded-lg overflow-hidden"
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
                {role === "customer" ? (
                  <Link to={`/dashboard/makeOffer/${item.propertyId}`}>
                    <button className="px-3 py-1 bg-primary text-white rounded hover:bg-blue-700">
                      📝 Make an Offer
                    </button>
                  </Link>
                ) : (
                  <p className=" text-red-500">
                    Only customer can buy property
                  </p>
                )}
                <button
                  onClick={() => handleRemove(item._id)}
                  disabled={mutation.isLoading}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
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

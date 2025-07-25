import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import useRole from "../../hooks/useRole";
import Loader from "../Loader/Loader";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole();

  const [stats, setStats] = useState({
    wishlist: 0,
    offers: 0,
    reviews: 0,
    properties: 0,
    receivedOffers: 0,
  });

  useEffect(() => {
    if (!user?.email) return;

    const fetchStats = async () => {
      try {
        const base = "http://localhost:3000";
        const [wishlist, offers, reviews, properties, received] =
          await Promise.all([
            // axios.get(`${base}/wishlist/count?email=${user.email}`),
            // axios.get(`${base}/offers/count?email=${user.email}`),
            // axios.get(`${base}/reviews/count?email=${user.email}`),
            axios.get(`${base}/myProperty?agentEmail=${user.email}`),
            // axios.get(`${base}/offers/received/count?email=${user.email}`),
            // `http://localhost:3000/myProperty?agentEmail=${user.email}`
          ]);
        console.log(properties);

        //     setStats({
        //       wishlist: wishlist.data.count || 0,
        //       offers: offers.data.count || 0,
        //       reviews: reviews.data.count || 0,
        //       properties: properties.data.count || 0,
        //       receivedOffers: received.data.count || 0,
        //     });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      {/* Banner */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1200&q=80"
          alt="Banner"
          className="w-full h-48 md:h-64 object-cover rounded-xl shadow"
        />
        {/* User Card */}
        <div className="absolute inset-x-0 -bottom-20 flex justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
            <img
              src={user?.photoURL || "https://i.pravatar.cc/100"}
              alt={user?.displayName}
              className="w-24 h-24 rounded-full border-4 border-white -mt-17 object-cover"
            />
            <h2 className="text-xl font-semibold mt-2">{user?.displayName}</h2>
            {user?.email && <p className="text-gray-600">{user.email}</p>}
            {user?.role && (
              <p className="text-blue-600 font-medium capitalize mt-1">
                Role: {role}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-32 text-center text-gray-500">
        <p>Welcome to your profile page!</p>
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {role === "customer" && (
          <>
            <StatCard title="Wishlist Properties" count={stats.wishlist} />
            <StatCard title="Offers Made" count={stats.offers} />
            <StatCard title="Reviews Posted" count={stats.reviews} />
          </>
        )}

        {role === "agent" && (
          <>
            <StatCard title="Properties Added" count={stats.properties} />
            <StatCard title="Offers Received" count={stats.receivedOffers} />
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, count }) => (
  <div className="bg-white shadow rounded-lg p-6 text-center">
    <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
    <p className="text-3xl font-bold text-blue-600 mt-2">{count}</p>
  </div>
);

export default MyProfile;

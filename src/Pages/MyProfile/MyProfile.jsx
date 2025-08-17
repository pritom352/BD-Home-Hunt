import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useRole from "../../hooks/useRole";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [role] = useRole();

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4">
      {/* Banner */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1600&q=80"
          alt="Banner"
          className="w-full h-40 sm:h-56 md:h-72 object-cover rounded-2xl shadow-lg"
        />

        {/* Profile Image */}
        <div className="absolute inset-x-0 -bottom-16 sm:-bottom-20 flex justify-center">
          <img
            src={user?.photoURL || "https://i.pravatar.cc/150"}
            alt={user?.displayName || "User Avatar"}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Profile Details */}
      <div className="mt-20 sm:mt-24 text-center px-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {user?.displayName || "Unknown User"}
        </h1>
        {user?.email && (
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            {user.email}
          </p>
        )}
        <span className="mt-2 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow">
          Role: {role || "Not Assigned"}
        </span>
      </div>

      {/* Extra Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 text-center">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Account Status
          </h3>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Active</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Role
          </h3>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            {role || "Not Assigned"}
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Joined On
          </h3>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            {user?.metadata?.creationTime
              ? new Date(user.metadata.creationTime).toDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

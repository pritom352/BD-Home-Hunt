import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useRole from "../../hooks/useRole";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [role] = useRole();

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
              alt={user?.displayName || "User Avatar"}
              className="w-24 h-24 rounded-full border-4 border-white -mt-17 object-cover"
            />
            <h2 className="text-xl font-semibold mt-2">
              {user?.displayName || "Unknown User"}
            </h2>
            {user?.email && <p className="text-gray-600">{user.email}</p>}
            <p className="text-blue-600 font-medium capitalize mt-1">
              Role: {role || "Not Assigned"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-32 text-center text-gray-500">
        <p>Welcome to your profile page!</p>
      </div>
    </div>
  );
};

export default MyProfile;

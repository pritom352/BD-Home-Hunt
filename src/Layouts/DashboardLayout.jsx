import { Link, Outlet, useLocation } from "react-router";
import {
  FaHome,
  FaBox,
  FaUser,
  FaChartBar,
  FaSignOutAlt,
  FaUsers,
  FaBars,
} from "react-icons/fa";
import { useContext, useState } from "react";
import useRole from "../hooks/useRole";
import Loader from "../Pages/Loader/Loader";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const DashboardLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, isRoleLoading] = useRole();
  // const { loader } = useContext(AuthContext);
  // if (!loader) {
  //   return <Loader></Loader>;
  // }

  if (isRoleLoading) return <Loader />;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const linkClasses = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
      location.pathname === path
        ? "bg-blue-500 text-white"
        : "hover:bg-gray-200 text-gray-700"
    }`;

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex h-screen bg-accent overflow-hidden">
        {/* Mobile Backdrop: Close sidebar if clicked outside */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-opacity-30 z-20 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed z-30 inset-y-0 left-0 w-64 bg-secondary shadow-md transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:shadow-none transition-transform duration-300 ease-in-out`}
        >
          <div className="h-full flex flex-col justify-between p-4">
            <div>
              <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>
              <nav className="flex flex-col gap-2">
                <Link
                  to="/dashboard/myProfile"
                  className={linkClasses("/dashboard/myProfile")}
                >
                  <FaUser /> My Profile
                </Link>
                {/* admin roll */}
                {role === "admin" && (
                  <>
                    <Link
                      to="/dashboard/manage-properties"
                      className={linkClasses("/dashboard/manage-properties")}
                    >
                      🛠️ Manage Properties
                    </Link>
                    <Link
                      to="/dashboard/manageUsers"
                      className={linkClasses("/dashboard/manageUsers")}
                    >
                      <FaUsers /> Manage Users
                    </Link>
                    <Link
                      to="/dashboard/mahageReviews"
                      className={linkClasses("/dashboard/mahageReviews")}
                    >
                      📦 Manage Reviews
                    </Link>
                  </>
                )}

                {role === "agent" && (
                  <>
                    {" "}
                    <Link
                      to="/dashboard/addProperty"
                      className={linkClasses("/dashboard/addProperty")}
                    >
                      <FaBox /> Add Property
                    </Link>
                    <Link
                      to="/dashboard/my-properties"
                      className={linkClasses("/dashboard/my-properties")}
                    >
                      🏘️ My Properties
                    </Link>
                    <Link
                      to="/dashboard/agentOffers"
                      className={linkClasses("/dashboard/agentOffers")}
                    >
                      <FaBox /> Offered Properties
                    </Link>
                  </>
                )}

                {role === "customer" && (
                  <>
                    <Link
                      to="/dashboard/wishList"
                      className={linkClasses("/dashboard/wishList")}
                    >
                      💖 Wish List
                    </Link>

                    <Link
                      to="/dashboard/propertyBought"
                      className={linkClasses("/dashboard/propertyBought")}
                    >
                      <FaBox /> Property Bought
                    </Link>

                    <Link
                      to="/dashboard/myReviews"
                      className={linkClasses("/dashboard/myReviews")}
                    >
                      📝 My Reviews
                    </Link>
                  </>
                )}
              </nav>
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t mt-4">
              {/* <button className="flex items-center gap-2 p-2 rounded hover:bg-blue-100">
                <FaUser /> Profile
              </button> */}
              <button className="flex items-center gap-2 p-2 rounded hover:bg-red-100 text-red-600">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Topbar for Mobile */}
          <div className="md:hidden bg-white shadow p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <button onClick={toggleSidebar}>
              <FaBars className="text-xl" />
            </button>
          </div>

          {/* Main Outlet */}
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;

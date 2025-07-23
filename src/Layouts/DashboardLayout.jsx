import { Link, Outlet, useLocation } from "react-router";
import {
  FaHome,
  FaBox,
  FaUser,
  FaChartBar,
  FaSignOutAlt,
  FaUsers,
  FaPlus,
  FaClipboardList,
} from "react-icons/fa";
import useRole from "../hooks/useRole";
import Loader from "../Pages/Loader/Loader";

const DashboardLayout = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `flex items-center gap-2 p-2 rounded hover:bg-blue-100 ${
      location.pathname === path ? "bg-blue-200" : ""
    }`;
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>

          <nav className="flex flex-col gap-2">
            {role === "customer" && (
              <Link to={"/dashboard/agentOffers"}>AgentOffers</Link>
            )}
            <Link to={"/dashboard/propertyBought"}>propertyBought</Link>
            {role === "agent" && (
              <Link
                to={"/dashboard/addProperty"}
                className={linkClasses("/dashboard/add-product")}
              >
                <FaPlus /> Add Product
              </Link>
            )}
            {role === "customer" && (
              <Link
                to="become-agent"
                className={linkClasses("/dashboard/become-agent")}
              >
                <FaHome /> Become a agent
              </Link>
            )}

            {/* my Profile */}
            <Link
              to={"/dashboard/myProfile"}
              className={linkClasses("/dashboard/add-product")}
            >
              <FaUser /> My Profile
            </Link>
            {role === "customer" && (
              <Link
                to={"/dashboard/wishList"}
                className={linkClasses("/dashboard/add-product")}
              >
                Wish List
              </Link>
            )}
            {role === "customer" && (
              <Link to={"/dashboard/myReviews"}>My Reviews</Link>
            )}
            {role === "agent" && (
              <Link to={"/dashboard/my-properties"}>My Properties</Link>
            )}
            {role === "admin" && (
              <Link to={"/dashboard/manage-properties"}>manage-properties</Link>
            )}

            <Link
              to={"/dashboard/mahageReviews"}
              className={linkClasses("/dashboard/inventory")}
            >
              <FaBox /> mahageReviews
            </Link>

            <Link
              to="statistics"
              className={linkClasses("/dashboard/statistics")}
            >
              <FaChartBar /> Statistics
            </Link>
            <Link
              to={"/dashboard/manageUsers"}
              className={linkClasses("/dashboard/manage-users")}
            >
              <FaUsers /> Manage Users
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-2 p-2 rounded hover:bg-blue-100">
            <FaUser /> Profile
          </button>
          <button className="flex items-center gap-2 p-2 rounded hover:bg-blue-100 text-red-500">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Right Content */}
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

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

const DashboardLayout = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `flex items-center gap-2 p-2 rounded hover:bg-blue-100 ${
      location.pathname === path ? "bg-blue-200" : ""
    }`;

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>

          <nav className="flex flex-col gap-2">
            <Link to="orders" className={linkClasses("/dashboard/orders")}>
              <FaClipboardList /> My Orders
            </Link>
            <Link
              to="become-seller"
              className={linkClasses("/dashboard/become-seller")}
            >
              <FaHome /> Become a Seller
            </Link>
            <Link
              to={"/dashboard/addProperty"}
              className={linkClasses("/dashboard/add-product")}
            >
              <FaPlus /> Add Product
            </Link>
            {/* my Profile */}
            <Link
              to={"/dashboard/myProfile"}
              className={linkClasses("/dashboard/add-product")}
            >
              <FaUser /> My Profile
            </Link>
            <Link
              to={"/dashboard/wishList"}
              className={linkClasses("/dashboard/add-product")}
            >
              Wish List
            </Link>
            <Link to={"/dashboard/myReviews"}>My Reviews</Link>
            <Link
              to="inventory"
              className={linkClasses("/dashboard/inventory")}
            >
              <FaBox /> My Inventory
            </Link>
            <Link
              to="manage-orders"
              className={linkClasses("/dashboard/manage-orders")}
            >
              <FaClipboardList /> Manage Orders
            </Link>
            <Link
              to="statistics"
              className={linkClasses("/dashboard/statistics")}
            >
              <FaChartBar /> Statistics
            </Link>
            <Link
              to="manage-users"
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

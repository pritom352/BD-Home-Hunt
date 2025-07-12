import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AddProperty from "../Pages/AddProperty/AddProperty";
import DashboardLayout from "../Layouts/DashboardLayout";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("http://localhost:3000/property"),
      },
      //   {
      //     path: "all-properties",
      //     element: <AllProperties />,
      //   },
      {
        path: "property/:id",
        element: <PropertyDetails />,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "addProperty",
        element: <AddProperty></AddProperty>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    // errorElement: <NotFound />,
    children: [
      // USER ROUTES
      // { path: "user/profile", element: <MyProfile /> },
      // { path: "user/wishlist", element: <Wishlist /> },
      // { path: "user/bought", element: <PropertyBought /> },
      // { path: "user/reviews", element: <MyReviews /> },
      // AGENT ROUTES
      // { path: "agent/profile", element: <AgentProfile /> },
      // { path: "agent/add-property", element: <AddProperty /> },
      // { path: "agent/my-properties", element: <MyAddedProperties /> },
      // { path: "agent/sold-properties", element: <MySoldProperties /> },
      // { path: "agent/requests", element: <RequestedProperties /> },
      // ADMIN ROUTES
      // { path: "admin/profile", element: <AdminProfile /> },
      // { path: "admin/manage-properties", element: <ManageProperties /> },
      // { path: "admin/manage-users", element: <ManageUsers /> },
      // { path: "admin/manage-reviews", element: <ManageReviews /> },
      // { path: "admin/advertise", element: <AdvertiseProperty /> },
    ],
  },
]);

export default router;

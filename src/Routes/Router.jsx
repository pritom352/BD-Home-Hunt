import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
// import AddProperty from "../Pages/AddProperty/AddProperty";
import DashboardLayout from "../Layouts/DashboardLayout";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails";
import AddProperty from "../Pages/AddProperty/AddProperty";
import MyProfile from "../Pages/MyProfile/MyProfile";
import WishlistPage from "../Pages/WishlistPage/WishlistPage";
import MakeOfferPage from "../Pages/MakeOfferPage/MakeOfferPage";
import MyReviews from "../Pages/MyReviews/MyReviews";
import AllProperties from "../Pages/Allproperties/Allproperties";
import MyAddedProperties from "../Pages/MyAddedProperties/MyAddedProperties";
import ManageProperties from "../Pages/ManageProperties/ManageProperties";
import PrivateRoute from "./PrivateRoute";
import UpdateProperty from "../Pages/UpdateProperty/UpdateProperty";
import ManageUsers from "../Pages/ManageUsers/ManageUsers";
import ManageReviews from "../Pages/ManageReviews/ManageReviews";
import AgentOffers from "../Pages/AgentOffers/AgentOffers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("http://localhost:3000/property"),
      },
      {
        path: "allPropertie",
        element: <AllProperties />,
      },
      {
        path: "property/:id",
        element: <PropertyDetails />,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,

    children: [
      {
        path: "addProperty",
        element: <AddProperty></AddProperty>,
      },
      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "wishList",
        element: <WishlistPage></WishlistPage>,
      },
      {
        path: "/dashboard/makeOffer/:id",
        element: <MakeOfferPage></MakeOfferPage>,
      },
      {
        path: "myReviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "/dashboard/update-property/:id",
        element: <UpdateProperty></UpdateProperty>,
      },
      {
        path: "/dashboard/manageUsers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/agentOffers",
        element: <AgentOffers></AgentOffers>,
      },

      {
        path: "/dashboard/mahageReviews",
        element: <ManageReviews></ManageReviews>,
      },

      // {
      //   path: "/dashboard/update-property/:id",
      //   element: <UpdateProperty></UpdateProperty>,
      // },

      { path: "my-properties", element: <MyAddedProperties /> },

      { path: "manage-properties", element: <ManageProperties /> },
      // { path: "admin/manage-users", element: <ManageUsers /> },
      // { path: "admin/manage-reviews", element: <ManageReviews /> },
      // { path: "admin/advertise", element: <AdvertiseProperty /> },
    ],
  },
]);

export default router;

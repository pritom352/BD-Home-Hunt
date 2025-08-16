import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
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
import PropertyBought from "../Pages/PropertyBought/PropertyBought";
import Loader from "../Pages/Loader/Loader";
import MySoldProperties from "../Pages/MySoldProperties/MySoldProperties";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ContactPage from "../Pages/ContactPage/ContactPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    hydrateFallbackElement: <Loader></Loader>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () =>
          fetch("https://assignment12-server-lyart.vercel.app/property"),
        hydrateFallbackElement: <Loader></Loader>,
      },
      {
        path: "allPropertie",
        element: <AllProperties />,
      },
      {
        path: "property/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "contect",
        element: <ContactPage></ContactPage>,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "addProperty",
        element: (
          <PrivateRoute>
            <AddProperty></AddProperty>
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <WishlistPage></WishlistPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/propertyBought",
        element: (
          <PrivateRoute>
            <PropertyBought></PropertyBought>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/makeOffer/:id",
        element: (
          <PrivateRoute>
            <MakeOfferPage></MakeOfferPage>
          </PrivateRoute>
        ),
      },
      {
        path: "myReviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update-property/:id",
        element: (
          <PrivateRoute>
            <UpdateProperty></UpdateProperty>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manageUsers",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/agentOffers",
        element: (
          <PrivateRoute>
            <AgentOffers></AgentOffers>
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard/mahageReviews",
        element: (
          <PrivateRoute>
            <ManageReviews></ManageReviews>
          </PrivateRoute>
        ),
      },

      {
        path: "my-properties",
        element: (
          <PrivateRoute>
            <MyAddedProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "mySoldProperties",
        element: (
          <PrivateRoute>
            <MySoldProperties></MySoldProperties>
          </PrivateRoute>
        ),
      },

      {
        path: "manage-properties",
        element: (
          <PrivateRoute>
            <ManageProperties />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", element: <ErrorPage></ErrorPage> },
]);

export default router;

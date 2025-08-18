import { createBrowserRouter, Navigate } from "react-router";
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
import Overview from "../Pages/Overview/Overview";
import About from "../hooks/About/About";
import NotFound from "../Pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    hydrateFallbackElement: <Loader></Loader>,
    errorElement: <NotFound></NotFound>,
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
        errorElement: <NotFound></NotFound>,
        element: (
          <PrivateRoute>
            <AllProperties></AllProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "property/:id",
        errorElement: <NotFound></NotFound>,
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
      {
        path: "about",
        element: <About></About>,
      },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <NotFound></NotFound>,
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true, // default route
        element: <Navigate to="myProfile" replace />,
      },
      {
        path: "addProperty",
        errorElement: <NotFound></NotFound>,
        element: (
          <PrivateRoute>
            <AddProperty></AddProperty>
          </PrivateRoute>
        ),
      },
      {
        path: "overview",
        errorElement: <NotFound></NotFound>,
        element: (
          <PrivateRoute>
            <Overview></Overview>
          </PrivateRoute>
        ),
      },
      {
        path: "myProfile",
        errorElement: <NotFound></NotFound>,
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "wishList",
        errorElement: <NotFound></NotFound>,
        element: (
          <PrivateRoute>
            <WishlistPage></WishlistPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/propertyBought",
        errorElement: <NotFound></NotFound>,
        element: (
          <PrivateRoute>
            <PropertyBought></PropertyBought>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/makeOffer/:id",
        errorElement: <NotFound></NotFound>,
        element: (
          <PrivateRoute>
            <MakeOfferPage></MakeOfferPage>
          </PrivateRoute>
        ),
      },
      {
        path: "myReviews",
        errorElement: <NotFound></NotFound>,
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update-property/:id",
        errorElement: <NotFound></NotFound>,
        element: (
          <PrivateRoute>
            <UpdateProperty></UpdateProperty>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manageUsers",
        errorElement: <NotFound></NotFound>,
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/agentOffers",
        errorElement: <NotFound></NotFound>,
        element: (
          <PrivateRoute>
            <AgentOffers></AgentOffers>
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard/mahageReviews",
        errorElement: <NotFound></NotFound>,
        element: (
          <PrivateRoute>
            <ManageReviews></ManageReviews>
          </PrivateRoute>
        ),
      },

      {
        path: "my-properties",
        errorElement: <NotFound></NotFound>,
        element: (
          <PrivateRoute>
            <MyAddedProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "mySoldProperties",
        errorElement: <NotFound></NotFound>,
        element: (
          <PrivateRoute>
            <MySoldProperties></MySoldProperties>
          </PrivateRoute>
        ),
      },

      {
        path: "manage-properties",
        errorElement: <NotFound></NotFound>,
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

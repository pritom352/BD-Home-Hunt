import React from "react";
import { useNavigate, useRouteError } from "react-router";
import { AlertTriangle } from "lucide-react";

const NotFound = ({ message }) => {
  const navigate = useNavigate();
  const routeError = useRouteError();

  const errorMessage =
    message ||
    routeError?.message ||
    "We encountered an unexpected error. Please try again later.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  px-6">
      <div className="bg-secondary shadow-xl rounded-2xl max-w-lg w-full p-8 text-center animate-fadeIn">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertTriangle className="text-red-500 w-14 h-14" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Oops! Something went wrong
        </h1>

        {/* Error Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">{errorMessage}</p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:shadow-lg hover:bg-primary-dark transition-all duration-200"
          >
            Retry
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 hover:shadow transition-all duration-200"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

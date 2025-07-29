// PropertyBought.jsx
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../Components/CheckoutForm";
// import CheckoutForm from "./CheckoutForm"; // Stripe form

const stripePromise = loadStripe(
  "pk_test_51RhpKrP8SnUGvvC99063wZbBmuYFBeeJ1Se4dFCNDtiHX1vMIBKL5hnLZncRKltEbyQiXEKKsChGnmoT0lXWvsph00VxqmZD6x"
);

const fetchOffers = async (email) => {
  const { data } = await axios.get(
    `https://assignment12-server-lyart.vercel.app/buyer-offers?buyerEmail=${email}`
  );
  return data;
};

const PropertyBought = () => {
  const { user } = useContext(AuthContext);
  const [transactionIds, setTransactionIds] = useState({});
  const [selectedOffer, setSelectedOffer] = useState(null);

  const {
    data: offers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["buyerOffers", user?.email],
    queryFn: () => fetchOffers(user.email),
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center mt-8 text-red-600">Failed to load offers.</p>
    );

  if (offers.length === 0)
    return <p className="text-center mt-8 text-gray-500">No offers found.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-25">
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-15">
        🏠 Properties You Offered For
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer._id}
            className="bg-secondary shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={offer.images}
              alt={offer.propertyTitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{offer.propertyTitle}</h3>
              <p className="text-gray-600">📍 {offer.propertyLocation}</p>
              <p>
                👨‍💼 Agent: <span className="font-medium">{offer.agentName}</span>
              </p>
              <p>
                💰 Offered Amount:{" "}
                <span className="font-medium">${offer.offerAmount}</span>
              </p>
              <p>
                📝 Status:{" "}
                <span
                  className={`font-medium ${
                    offer.status === "accepted"
                      ? "text-green-600"
                      : offer.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {offer.status || "pending"}
                </span>
              </p>

              {transactionIds[offer._id] ? (
                <p className="text-green-600 font-medium">
                  Transaction ID: {transactionIds[offer._id]}
                </p>
              ) : offer.status === "accepted" ? (
                <button
                  className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => setSelectedOffer(offer)}
                >
                  💳 Pay
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Stripe Form Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-xl font-bold text-gray-700"
              onClick={() => setSelectedOffer(null)}
            >
              ×
            </button>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                offer={selectedOffer}
                onSuccess={(txnId, offerId) => {
                  setTransactionIds((prev) => ({ ...prev, [offerId]: txnId }));
                  setSelectedOffer(null); // modal close
                }}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyBought;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const PropertyBought = () => {
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOffers = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/buyer-offers?buyerEmail=${user?.email}`
      );
      setOffers(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchOffers();
    }
  }, [user?.email]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🏠 Properties You Offered For</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={offer.propertyImage || "https://via.placeholder.com/300"}
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

              {offer.status === "accepted" && (
                <button className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  💳 Pay
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyBought;

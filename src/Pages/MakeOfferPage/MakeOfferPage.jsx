import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const MakeOfferPage = () => {
  const { id } = useParams(); // propertyId
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offerAmount, setOfferAmount] = useState("");
  const [buyingDate, setBuyingDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/property/${id}`)
      .then((res) => setProperty(res.data))
      .catch(() => setErrorMsg("Failed to load property."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!offerAmount || !buyingDate) {
      setErrorMsg("Please fill all the fields.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3000/offers`, {
        propertyId: id,
        offerAmount,
        buyerEmail: user?.email,
        buyerName: user?.displayName,
        buyingDate,
      });

      if (res.status === 201) {
        setSuccessMsg("✅ Offer submitted successfully!");
        setErrorMsg("");
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (err) {
      setSuccessMsg("");
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Something went wrong.");
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!property) return <p className="text-center mt-10">Property not found</p>;

  const [minPrice, maxPrice] =
    property.priceRange
      ?.replace(/\$/g, "")
      .split("-")
      .map((v) => +v.trim()) || [];

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow space-y-4">
      <h1 className="text-2xl font-bold text-center text-blue-800">
        📝 Make an Offer
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-medium">Property Title</label>
          <input
            type="text"
            readOnly
            value={property.title}
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="font-medium">Location</label>
          <input
            type="text"
            readOnly
            value={property.location}
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="font-medium">Agent Name</label>
          <input
            type="text"
            readOnly
            value={property.agentName}
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="font-medium">
            Offer Amount{" "}
            <span className="text-sm text-gray-500">
              (Between ${minPrice} - ${maxPrice})
            </span>
          </label>
          <input
            type="number"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="font-medium">Buyer Email</label>
          <input
            type="email"
            readOnly
            value={user?.email}
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="font-medium">Buyer Name</label>
          <input
            type="text"
            readOnly
            value={user?.displayName}
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="font-medium">Buying Date</label>
          <input
            type="date"
            value={buyingDate}
            onChange={(e) => setBuyingDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {errorMsg && <p className="text-red-600">{errorMsg}</p>}
        {successMsg && <p className="text-green-600">{successMsg}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOfferPage;

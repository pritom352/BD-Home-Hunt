import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

const MakeOfferPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [offerAmount, setOfferAmount] = useState("");
  const [buyingDate, setBuyingDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    data: property,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["property", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(
        `https://assignment12-server-lyart.vercel.app/property/${id}`
      );
      return res.data;
    },
  });

  //  Mutation to submit offer
  const offerMutation = useMutation({
    mutationFn: async (newOffer) => {
      const res = await axios.post(
        `https://assignment12-server-lyart.vercel.app/offers`,
        newOffer
      );
      return res.data;
    },
    onSuccess: () => {
      setSuccessMsg("✅ Offer submitted successfully!");
      setErrorMsg("");
      setTimeout(() => navigate("/dashboard"), 2000);
    },
    onError: (err) => {
      setSuccessMsg("");
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Something went wrong.");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!offerAmount || !buyingDate) {
      setErrorMsg("Please fill all the fields.");
      return;
    }

    offerMutation.mutate({
      propertyId: id,
      offerAmount,
      buyerEmail: user?.email,
      buyerName: user?.displayName,
      buyingDate,
      agentEmail: property?.agentEmail,
      images: property?.images,
    });
  };

  if (isLoading) return <Loader></Loader>;
  if (isError || !property)
    return (
      <p className="text-center mt-10 text-red-600">Property not found.</p>
    );

  const [minPrice, maxPrice] =
    property.priceRange
      ?.replace(/\$/g, "")
      .split("-")
      .map((v) => +v.trim()) || [];

  return (
    <div className="max-w-lg mx-auto mt-10 bg-secondary p-6 rounded shadow space-y-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center ">
        📝 Make an Offer
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-medium">Property Title</label>
          <input
            type="text"
            readOnly
            value={property.title}
            className="w-full border p-2 rounded bg-secondary"
          />
        </div>

        <div>
          <label className="font-medium">Location</label>
          <input
            type="text"
            readOnly
            value={property.location}
            className="w-full border p-2 rounded bg-secondary"
          />
        </div>

        <div>
          <label className="font-medium">Agent Name</label>
          <input
            type="text"
            readOnly
            value={property.agentName}
            className="w-full border p-2 rounded bg-secondary"
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
            className="w-full border p-2 rounded bg-secondary"
          />
        </div>

        <div>
          <label className="font-medium">Buyer Name</label>
          <input
            type="text"
            readOnly
            value={user?.displayName}
            className="w-full border p-2 rounded bg-secondary"
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
          className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOfferPage;

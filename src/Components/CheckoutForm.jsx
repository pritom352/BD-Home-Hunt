import React, { useContext, useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";

const CheckoutForm = ({ offer, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const [clientSecret, setClientSecret] = useState("");

  // STEP 1: Get clientSecret from backend
  useEffect(() => {
    if (offer?.offerAmount) {
      axios
        .post(
          "https://assignment12-server-lyart.vercel.app/create-payment-intent",
          {
            offerAmount: offer.offerAmount,
          }
        )
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => console.error("Error creating PaymentIntent:", err));
    }
  }, [offer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);

    // STEP 2: Create PaymentMethod
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(`[PaymentMethod Error] ${error.message}`);
      return;
    }

    // STEP 3: Confirm Card Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      toast.error(`[Confirm Error] ${confirmError.message}`);
    } else if (paymentIntent.status === "succeeded") {
      toast.success("✅ Payment Success!");

      // STEP 4: Save payment info to DB
      const paymentData = {
        propertyId: offer.propertyId,
        offerAmount: offer.offerAmount,
        buyerEmail: offer.buyerEmail,
        agentName: offer.agentName,
        transactionId: paymentIntent.id,
        agentEmail: offer.agentEmail,
        buyerName: user.displayName,
        propertyLocation: offer.propertyLocation,
      };

      const res = await axios.post(
        "https://assignment12-server-lyart.vercel.app/payments",
        paymentData
      );
      const savedTransactionId = res.data?.result?.insertedId
        ? paymentIntent.id
        : null;

      if (savedTransactionId && onSuccess) {
        // STEP 5: Notify parent about success
        onSuccess(savedTransactionId, offer._id); // ✅
      }

      // STEP 6: Invalidate related queries
      queryClient.invalidateQueries(["buyerOffers"]);
      queryClient.invalidateQueries(["allProperties"]);
      queryClient.invalidateQueries(["myOffers"]);

      // STEP 7: Close modal
      if (onClose) onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">
        Payment for: {offer?.propertyTitle}
      </h3>
      <CardElement className="p-3 border border-gray-300 rounded" />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Confirm Payment
      </button>
    </form>
  );
};

export default CheckoutForm;

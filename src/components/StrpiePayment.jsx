import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Result } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { doc, setDoc, collection } from "../config/firebase.config";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "styled-components";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import LockIcon from "@mui/icons-material/Lock";
import toast from "react-hot-toast";

const CardInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus-within {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

export const StripePaymentFormComp = ({
  formData,
  handleNext,
  handleBack,
  handleChange,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardNumberElement = elements.getElement("cardNumber");
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
      billing_details: {
        address: {
          city: formData.step2Field5,
          state: formData.step2Field6,
          postal_code: formData.step2Field7,
          country: formData.step2Field8,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success("Payment method created successfully!");
      handleNext();
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardInputWrapper>
        <IconWrapper>
          <CreditCardIcon />
        </IconWrapper>
        <input
          placeholder="Card number"
          type="text"
          id="cardNumber"
          className="form-control"
          required
          style={{ padding: "10px", width: "100%" }}
        />
      </CardInputWrapper>
      <CardInputWrapper>
        <IconWrapper>
          <EventIcon />
        </IconWrapper>
        <input
          placeholder="MM/YY"
          type="text"
          id="cardExpiry"
          className="form-control"
          required
          style={{ padding: "10px", width: "100%" }}
        />
      </CardInputWrapper>
      <CardInputWrapper>
        <IconWrapper>
          <LockIcon />
        </IconWrapper>
        <input
          placeholder="CVC"
          type="text"
          id="cardCvc"
          className="form-control"
          required
          style={{ padding: "10px", width: "100%" }}
        />
      </CardInputWrapper>
      <TextField
        label="City"
        type="text"
        variant="outlined"
        fullWidth
        value={formData.step2Field5}
        onChange={(e) => handleChange("step2", 5, e.target.value)}
        required
        sx={{ mt: 2 }}
      />
      <TextField
        label="Province"
        type="text"
        variant="outlined"
        fullWidth
        value={formData.step2Field6}
        onChange={(e) => handleChange("step2", 6, e.target.value)}
        required
        sx={{ mt: 2 }}
      />
      <TextField
        label="Postal Code"
        variant="outlined"
        type="number"
        fullWidth
        value={formData.step2Field7}
        onChange={(e) => handleChange("step2", 7, e.target.value)}
        required
        sx={{ mt: 2 }}
      />
      <TextField
        label="Country"
        variant="outlined"
        type="text"
        fullWidth
        value={formData.step2Field8}
        onChange={(e) => handleChange("step2", 8, e.target.value)}
        required
        sx={{ mt: 2 }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay"}
        </Button>
      </Box>
    </form>
  );
};

const cardElementStyles = {
  base: {
    fontSize: "16px",
    color: "#424770",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#9e2146",
  },
};

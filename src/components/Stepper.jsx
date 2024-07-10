import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import toast from "react-hot-toast";
import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripePaymentFormComp } from "./StrpiePayment";
import { doc, db, setDoc, collection } from "../config/firebase.config";
const stripePromise = loadStripe(
  "pk_test_51Paqr7Ru9jX6n0s7yCKqqnKyAx1RHAAGyPBqO8A0QhyFh64MRKFmVGUYT4673gLxTFPy2RXH4YWtOCBVDd7DLtrV008Kpo5zl2"
);

const steps = ["Order Details", "Payment Details", "Success"];

export default function StepperComp({
  totalPrice,
  trackingId,
  cartItems,
  receiverName,
}) {
  if (!totalPrice && !trackingId) {
    return <div className="loader"></div>;
  }

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    step1Field1: "",
    step1Field2: "",
    step1Field3: "",
    step1Field4: "",
    step2Field5: "",
    step2Field6: "",
    step2Field7: "",
    step2Field8: "",
  });

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      step1Field1: "",
      step1Field2: "",
      step1Field3: "",
      step1Field4: "",
      step2Field5: "",
      step2Field6: "",
      step2Field7: "",
      step2Field8: "",
    });
  };

  const handleChange = (step, field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${step}Field${field}`]: value,
    }));
  };

  const validateStep = (step) => {
    if (step === 0) {
      if (
        !formData.step1Field1 ||
        !formData.step1Field2 ||
        !formData.step1Field3 ||
        !formData.step1Field4
      ) {
        toast.error("Please fill in all the details to proceed.");
        return false;
      }
    } else if (step === 1) {
      if (
        !formData.step2Field5 ||
        !formData.step2Field6 ||
        !formData.step2Field7 ||
        !formData.step2Field8
      ) {
        toast.error("Please fill in all the details to proceed.");
        return false;
      }
    }
    return true;
  };

  let id = 85484;
  const handleFinish = async () => {
    const userOrdersRef = doc(db, "usersProducts", `${id}`);
    const newOrderRef = doc(collection(userOrdersRef, "orders"));
    await setDoc(newOrderRef, {
      receiverName: formData.step1Field1,
      receiverEmail: formData.step1Field2,
      receiverPhoneNumber: formData.step1Field3,
      receiverAddress: formData.step1Field4,
      totalAmount: totalPrice,
      trackingId: `#${Math.round(Math.random() * 10000 + 1)}`,
      cartItems: cartItems,
      orderDate: new Date().toLocaleString(),
    });
    toast.success(
      `Your Order placed successfully with this tracking Id #${id}.`
    );
    handleNext();
  };

  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Result
              icon={<SmileOutlined />}
              title="Great, we have done all the operations."
            />
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        ) : (
          <div>
            {activeStep === 0 && (
              <div className="mt-2">
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={formData.step1Field1}
                  onChange={(e) => handleChange("step1", 1, e.target.value)}
                  required
                  sx={{ mt: 2, mb: 2 }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={formData.step1Field2}
                  onChange={(e) => handleChange("step1", 2, e.target.value)}
                  required
                  sx={{ mt: 2, mb: 2 }}
                />
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={formData.step1Field3}
                  onChange={(e) => handleChange("step1", 3, e.target.value)}
                  required
                  type="number"
                  sx={{ mt: 2, mb: 2 }}
                  placeholder="+92 3XX XXXXXXX"
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  type="text"
                  fullWidth
                  value={formData.step1Field4}
                  onChange={(e) => handleChange("step1", 4, e.target.value)}
                  required
                  sx={{ mt: 2 }}
                />
              </div>
            )}
            {activeStep === 1 && (
              <Elements stripe={stripePromise}>
                <StripePaymentFormComp
                  formData={formData}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  handleChange={handleChange}
                />
              </Elements>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={
                  activeStep === steps.length - 1 ? handleFinish : handleNext
                }
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </div>
        )}
      </Box>
    </div>
  );
}

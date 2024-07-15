import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import toast from "react-hot-toast";
import { SmileOutlined } from "@ant-design/icons";
import { Result, Progress } from "antd";
import { db, doc, setDoc, collection } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/Store";
import { emailRegex } from "./Pages/Signup";
import { v4 as uuidv4 } from "uuid";
import "../index.scss";

const steps = ["Order Details", "Payment Details", "Success"];

export default function StepperComp({ totalPrice, cartItems }) {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const user = useUser();
  const phoneNumberEgex = /^(\+92|0)?3[0-9]{2}[0-9]{7}$/;

  // Initialize form data state
  const [formData, setFormData] = useState({
    step1Field1: "",
    step1Field2: "",
    step1Field3: "",
    step1Field4: "",
  });

  // Generating tracking ID
  const trackingId = uuidv4();

  if (!totalPrice || !user) {
    return (
      <div className="flex justify-center items-center ">
        <div className="loader"></div>;
      </div>
    );
  }

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const gotoDashboard = () => {
    navigate("/dashboard");
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      step1Field1: "",
      step1Field2: "",
      step1Field3: "",
      step1Field4: "",
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
        toast.error("Please fill all order details to proceed further.");
        return false;
      } else if (!emailRegex.test(formData.step1Field2)) {
        toast.error("Invalid email.");
        return false;
      } else if (!phoneNumberEgex.test(formData.step1Field3)) {
        toast.error("Invalid Phone number.");
        return false;
      }
    }
    return true;
  };

  const handleFinish = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const userDocRef = doc(db, "usersUids", user.userUid);
      await setDoc(userDocRef, {
        userUid: user.userUid,
      });
      const userOrdersRef = doc(db, "usersProducts", user.userUid);
      const newOrderRef = doc(collection(userOrdersRef, "orders"));
      await setDoc(newOrderRef, {
        receiverName: formData.step1Field1,
        receiverEmail: formData.step1Field2,
        receiverPhoneNumber: formData.step1Field3,
        receiverAddress: formData.step1Field4,
        totalAmount: totalPrice,
        trackingId: trackingId,
        cartItems: cartItems,
        orderStatus: "pending",
        orderDate: new Date().toLocaleString(),
      });
      setLoading(false);
      toast.success(
        `Your Order placed successfully with this tracking id #${trackingId}.`
      );
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {loading ? (
          <div className="flex justify-center items-center mt-3 mb-1">
            <div className="loader"></div>
          </div>
        ) : activeStep === steps.length ? (
          <>
            <Result status="success" title="We have done all operations." />
            <Box
              className="thirdStepsBtn"
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                pt: 2,
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <Button
                className="gotoResetBtn"
                variant="outlined"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                className="gotoDashboardBtn"
                variant="outlined"
                onClick={gotoDashboard}
              >
                Goto Dashboard
              </Button>
            </Box>
          </>
        ) : (
          <div>
            {activeStep === 0 && (
              <div className="mt-2">
                <TextField
                  label="Receiver Name"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={formData.step1Field1}
                  onChange={(e) => handleChange("step1", 1, e.target.value)}
                  required
                  sx={{ mt: 2, mb: 2 }}
                />
                <TextField
                  label="Receiver Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={formData.step1Field2}
                  onChange={(e) => handleChange("step1", 2, e.target.value)}
                  required
                  sx={{ mt: 2, mb: 2 }}
                />
                <TextField
                  label="Receiver Phone No."
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
                  label="Receiver Address"
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
              <Result icon={<SmileOutlined />} title="Coming Soon!" />
            )}
            {activeStep === steps.length - 1 ? (
              <div className="flex flex-col justify-center items-center gap-2 mt-3">
                <Progress type="dashboard" percent={75} />
                <h2 className="text-xl">
                  <b>Please!</b> click on the <b>Finish</b> to complete the
                  <b> order place process</b>.
                </h2>
              </div>
            ) : null}
            <Box
              className="firstSecondStepsBtns"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                pt: 2,
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                className="backBtns"
                variant="outlined"
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                variant="outlined"
                className="nextBtns"
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

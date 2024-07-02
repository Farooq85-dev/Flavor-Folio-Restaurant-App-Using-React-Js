import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import "../index.scss";
import { emailRegex, gotoBack, passwordRegex } from "./Register";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { MdOutlineAlternateEmail } from "react-icons/md";
import toast from "react-hot-toast";
import {
  onAuthStateChanged,
  auth,
  sendPasswordResetEmail,
} from "../config/firebase.config";

let userId;
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    userId = uid;
  } else {
    console.log("!user");
  }
});

function ForgotPasswordComp() {
  const [forgotEmail, setForgotEmail] = useState("");
  const forgotPasswordRequest = async () => {
    if (!userId) {
      toast.error("Please signup or login first.");
    }

    if (forgotEmail === "") {
      toast.error("Please enter email.");
    } else if (!emailRegex.test(forgotEmail)) {
      toast.error("Invalid eamil.");
    } else {
      await sendPasswordResetEmail(auth, forgotEmail)
        .then(() => {
          toast.success(
            "Password request sended successfully. Please, goto your email inbox."
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error("Please try again.");
        });
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen ml-10 mr-10">
        <div className="mainForgotPassword bg-white flex flex-col justify-center items-start gap-3 p-10 rounded-2xl">
          <div className="historyArrow cursor-pointer">
            <HiOutlineArrowLongLeft className="w-10 h-10" onClick={gotoBack} />
          </div>
          <div className="forgotPasswordCnt">
            <h3 className="font-semibold text-primary">Forgot Password</h3>
            <p>
              Recover you password if you have <br /> forgot the password!
            </p>
          </div>
          <div className="forgotPasswordInput">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlineAlternateEmail />
                  </InputAdornment>
                ),
              }}
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              id="userForgotEmail"
              label="Provide Email"
              variant="outlined"
              type="email"
              placeholder="Ex user@gmail.com"
            />
          </div>
          <div className="forgotPasswordBtn">
            <Button
              variant="outlined"
              onClick={forgotPasswordRequest}
              className="forgotPasswordBtn"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordComp;

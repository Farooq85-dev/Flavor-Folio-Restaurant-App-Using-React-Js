import { Button } from "@mui/material";
import "../index.scss";
import toast from "react-hot-toast";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { gotoBack } from "./Register";
import {
  sendEmailVerification,
  auth,
  onAuthStateChanged,
} from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function VerificationComp() {
  let [userId, setUserId] = useState(null);
  let [userStatus, setUserStatus] = useState(null);

  const navigate = useNavigate();
  const toHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserStatus(user.emailVerified);
        if (user.emailVerified) {
          console.log("You are verified.");
          toHome();
        } else {
          toast.error("Please verify yourself.");
        }
      } else {
        console.log("!user");
      }
    });

    return () => unsubscribe();
  }, []);

  const emailVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser).then(() => {
        toast.success("Please go to your email inbox and verify yourself.");
      });
    } catch (error) {
      toast.error("Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen ml-10 mr-10">
        <div className="mainVerification bg-white flex flex-col justify-center items-start gap-3 p-10 rounded-2xl">
          <div className="historyArrow cursor-pointer">
            <HiOutlineArrowLongLeft className="w-10 h-10" onClick={gotoBack} />
          </div>
          <div className="verificationCnt">
            <h3 className="text-primary font-semibold">Verification</h3>
            <p>
              We will send you an email verification <br /> request to your
              email account!
            </p>
          </div>
          <div className="verifcationBtn">
            <Button
              onClick={emailVerification}
              variant="outlined"
              className="verifyBtn"
            >
              Verify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationComp;

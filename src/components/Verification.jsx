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

let userId;
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("user--->", user);
    if (user.emailVerified === false) {
      console.error("Please verify yourself!");
    } else {
      console.log("You are verified.");
    }
    userId = uid;
  } else {
    console.log("!user");
  }
});

function VerificationComp() {
  const emailVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser).then(() => {
        toast.success("Please goto your email inbox and verify yourself.");
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
              We will sent you an email verification <br /> request to your
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

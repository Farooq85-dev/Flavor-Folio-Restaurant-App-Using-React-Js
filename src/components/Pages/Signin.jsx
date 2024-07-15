import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import InputAdornment from "@mui/material/InputAdornment";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import {
  auth,
  signInWithEmailAndPassword,
} from "../../config/firebase.config.js";
import "../../index.scss";

export let gotoBack = () => {
  history.back();
};

function SigninComp() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const navigate = useNavigate();

  const userSignin = () => {
    if (userEmail === "") {
      toast.error("Please enter email.");
    } else if (userPassword === "") {
      toast.error("Please enter password.");
    } else {
      signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Sginin successfully!");
          navigate("/visit-store");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error("Invlaid Password or email!");
        });
    }
  };
  const handleClickSignin = () => {
    userSignin();
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen ml-10 mr-10">
        <div className="mainSignin bg-white flex flex-col justify-center items-start gap-3 p-10 rounded-2xl">
          <div className="historyArrow cursor-pointer">
            <HiOutlineArrowLongLeft className="w-10 h-10" onClick={gotoBack} />
          </div>
          <div className="signinCnt">
            <h3 className="text-primary font-semibold ">Signin</h3>
            <p className="mb-5">
              Please <b>Login</b> to your <b>account!</b>
            </p>
          </div>
          <div className="registerInputs flex flex-col justify-start gap-5">
            <div className="userEmail">
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineAlternateEmail />
                    </InputAdornment>
                  ),
                }}
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                id="userEmail"
                label="Email"
                variant="outlined"
                type="email"
                placeholder="Ex user@gmail.com"
              />
            </div>
            <div className="userPassword">
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      onClick={handleShowPassword}
                      className="cursor-pointer"
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </InputAdornment>
                  ),
                }}
                value={userPassword}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                id="userPassword"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                placeholder=" ******* "
              />
            </div>
            <div className="signinBtns">
              <Button
                startIcon={<MdOutlineAlternateEmail />}
                variant="outlined"
                onClick={handleClickSignin}
                className="signinBtn"
              >
                Signin with Email
              </Button>
            </div>
            <div>
              <Link to="/signup">
                <p>
                  Not have account? <span className="text-red">Signup</span>
                </p>
              </Link>
              <Link to="/forgotpassword">
                <p className="text-red">Forgot Password?</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninComp;

import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import InputAdornment from "@mui/material/InputAdornment";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import ButtonComp from "../Button.jsx";
import {
  auth,
  createUserWithEmailAndPassword,
} from "../../config/firebase.config.js";
import { Helmet } from "react-helmet-async";
import "../../index.scss";

export let gotoBack = () => {
  history.back();
};

export let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export let passwordRegex = /^\d{6,10}$/;

function SignupComp() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const navigate = useNavigate();

  const userSignup = async () => {
    if (userName === "") {
      toast.error("Please enter name.");
    } else if (userEmail === "") {
      toast.error("Please enter email.");
    } else if (!emailRegex.test(userEmail)) {
      toast.error("Please enter valid email.");
    } else if (userPassword === "") {
      toast.error("Please enter password.");
    } else if (!passwordRegex.test(userPassword)) {
      toast.error("Password must be only numbers with upto 6 to 10 length.");
    } else {
      await createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Registered successfully!");
          navigate("/signin");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            toast.error("Email already registered. Please Login.");
            <Navigate to="/signin" />;
          }
          toast.error("Please try again!");
        });
    }
  };

  const handleClickSignup = () => {
    userSignup();
  };

  return (
    <div>
      <Helmet>
        <title>Signup</title>
        <meta name="Signup" content="Flavor folio register or signup." />
        <meta
          name="Register yourself, register your self"
          content="Please enter your details correctly."
        />
      </Helmet>
      <div className="flex justify-center items-center h-screen ml-10 mr-10">
        <div className="mainSignup bg-white flex flex-col justify-center items-start gap-3 p-10 rounded-2xl">
          <div className="historyArrow cursor-pointer">
            <HiOutlineArrowLongLeft className="w-10 h-10" onClick={gotoBack} />
          </div>
          <div className="signupCnt">
            <h3 className="text-primary font-semibold ">Signup</h3>
            <p className="mb-5">
              Create an <b>account</b> to access all <br /> the <b>features</b>{" "}
              of Flavor Folio!
            </p>
          </div>
          <div className="registerInputs flex flex-col justify-start gap-5">
            <div className="userName">
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaRegUser />
                    </InputAdornment>
                  ),
                }}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                id="userName"
                label="Username"
                variant="outlined"
                type="text"
                placeholder="Ex John Dev"
              />
            </div>
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

            <div className="signupBtns flex flex-col justify-between items-center gap-2">
              <Button
                startIcon={<MdOutlineAlternateEmail />}
                text="Signup"
                variant="outlined"
                onClick={handleClickSignup}
                className="signupBtn"
              >
                Signup with email
              </Button>
              <ButtonComp
                icon="google"
                classes="signupWithGoogleBtn"
                text="Signup with Google"
                redirect="google"
              />
            </div>
            <Link to="/signin">
              <p>
                Alread have an account? <span className="text-red">Signin</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupComp;

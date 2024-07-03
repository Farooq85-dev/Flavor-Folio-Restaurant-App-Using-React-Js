import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeComp from "../components/Welcome";
import RegisterComp from "../components/Register";
import { Toaster } from "react-hot-toast";
import VerificationComp from "../components/Verification";
import ForgotPasswordComp from "../components/ForgotPassword";
import NavbarComp from "../components/Navbar";
import HomeComp from "../components/Home";

function RoutesComp() {
  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<WelcomeComp />} />
          <Route path="register" element={<RegisterComp />} />
          <Route path="/verification" element={<VerificationComp />} />
          <Route path="/forgotpassword" element={<ForgotPasswordComp />} />
          <Route path="/home" element={<HomeComp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesComp;

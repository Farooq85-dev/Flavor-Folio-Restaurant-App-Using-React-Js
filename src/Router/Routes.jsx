import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeComp from "../components/Welcome";
import RegisterComp from "../components/Register";
import { Toaster } from "react-hot-toast";
import VerificationComp from "../components/Verification";
import ForgotPasswordComp from "../components/ForgotPassword";
import HomeComp from "../components/Home";
import ContactComp from "../components/Pages/Contact";
import AboutUsComp from "../components/Pages/Aboutus";
import VisiStoreComp from "../components/Pages/VisitStore";

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
          <Route path="/contact us" element={<ContactComp />} />
          <Route path="/about us" element={<AboutUsComp />} />
          <Route path="/visitstore" element={<VisiStoreComp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesComp;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import VerificationComp from "../components/Pages/Verification";
import ForgotPasswordComp from "../components/ForgotPassword";
import HomeComp from "../components/Home";
import ContactComp from "../components/Pages/Contact";
import AboutUsComp from "../components/Pages/Aboutus";
import VisitStoreComp from "../components/Pages/VisitStore";
import CheckoutComp from "../components/Pages/Checkout";
import DashboardComp from "../components/Pages/Dashboard";
import SignupComp from "../components/Pages/Signup";
import PageNotExsitComp from "../components/Pages/404";
import SigninComp from "../components/Pages/Signin";
import OrdersComp from "../components/Pages/Orders";
import { useUser } from "../context/Store";
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "../config/firebase.config.js";
import "../index.scss";

function RoutesComp() {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
        setIsVerified(user.emailVerified);
      } else {
        setIsUser(false);
        setIsVerified(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loaderDiv">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="signup" element={<SignupComp />} />
          <Route path="signin" element={<SigninComp />} />
          <Route
            path="/verification"
            element={isUser ? <VerificationComp /> : <Navigate to="/" />}
          />
          <Route
            path="/forgotpassword"
            element={
              isUser ? <ForgotPasswordComp /> : <Navigate to="/signup" />
            }
          />
          <Route path="/" element={<HomeComp />} /> {/* Default Route */}
          <Route path="/contact-us" element={<ContactComp />} />
          <Route path="/about-us" element={<AboutUsComp />} />
          <Route path="/visit-store" element={<VisitStoreComp />} />
          <Route path="/checkout" element={<CheckoutComp />} />
          <Route
            path="/dashboard/*"
            element={isUser ? <DashboardComp /> : <Navigate to="/signup" />}
          >
            <Route path="orders" element={<OrdersComp />} />
          </Route>
          <Route path="*" element={<PageNotExsitComp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesComp;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import VerificationComp from "./components/Pages/Verification.jsx";
import ForgotPasswordComp from "./components/ForgotPassword.jsx";
import HomeComp from "./components/Home.jsx";
import ContactComp from "./components/Pages/Contact.jsx";
import AboutUsComp from "./components/Pages/Aboutus.jsx";
import VisitStoreComp from "./components/Pages/VisitStore.jsx";
import CheckoutComp from "./components/Pages/Checkout.jsx";
import DashboardComp from "./components/Pages/Dashboard.jsx";
import SignupComp from "./components/Pages/Signup.jsx";
import PageNotExsitComp from "./components/Pages/404.jsx";
import SigninComp from "./components/Pages/Signin.jsx";
import OrdersComp from "./components/Pages/Orders.jsx";
import { useUser } from "./context/Store.jsx";
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "./config/firebase.config.js";
import AdminDashboardPage from "./components/Pages/AdminDashboard.jsx";
import "./index.scss";

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
      <div className="flex justify-center items-center h-screen">
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
          <Route path="/forgotpassword" element={<ForgotPasswordComp />} />
          <Route path="/" element={<HomeComp />} /> {/* Default Route */}
          <Route path="/contact-us" element={<ContactComp />} />
          <Route path="/about-us" element={<AboutUsComp />} />
          <Route path="/visit-store" element={<VisitStoreComp />} />
          <Route
            path="/checkout"
            element={isUser ? <CheckoutComp /> : <Navigate to="/signup" />}
          />
          <Route
            path="/dashboard"
            element={isUser ? <DashboardComp /> : <Navigate to="/signup" />}
          />
          <Route
            path="/orders"
            element={isUser ? <OrdersComp /> : <Navigate to="/signup" />}
          />
          <Route path="*" element={<PageNotExsitComp />} />
          <Route
            path="/admin"
            element={
              isUser ? <AdminDashboardPage /> : <Navigate to="/signup" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesComp;

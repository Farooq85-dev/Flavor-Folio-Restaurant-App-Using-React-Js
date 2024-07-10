import React from "react";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import NavbarComp from "../Navbar";
import { FooterComp } from "../Footer";
import "../../index.scss";

function PageNotExsitComp() {
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="header">
        <NavbarComp />
      </div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            className="pageNotFoundBtn"
            variant="contained"
            onClick={toHome}
          >
            Back to Home
          </Button>
        }
      />
      <div className="footer">
        <FooterComp />
      </div>
    </div>
  );
}
export default PageNotExsitComp;

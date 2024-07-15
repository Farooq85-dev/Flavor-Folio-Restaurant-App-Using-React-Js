import NavbarComp from "../Navbar";
import aboutUsImg from "../../../src/assets/aboutus-1.webp";
import { FooterComp } from "../Footer";
import { Helmet } from "react-helmet-async";
import "../../index.scss";

function AboutusComp() {
  return (
    <div>
      <Helmet>
        <title>About Us</title>
        <meta
          name="Falavor Folio About Us"
          content="Explore about us. Find your next favorite meal today!"
        />
        <meta name="History about us" content="backstrength, about us" />
      </Helmet>
      <div className="navbarComp">
        <NavbarComp />
      </div>
      <div className="mainAbout p-[10px]">
        <div className="aboutImg w-full">
          <img src={aboutUsImg} className="rounded-lg w-full  " alt="" />
        </div>
      </div>
      <div className="footerComp">
        <FooterComp />
      </div>
    </div>
  );
}

export default AboutusComp;

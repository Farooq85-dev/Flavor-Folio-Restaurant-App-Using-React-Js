import NavbarComp from "../Navbar";
import aboutUsImg from "../../../src/assets/aboutus-1.webp";
import { FooterComp } from "../Footer";
import "../../index.scss";

function AboutusComp() {
  return (
    <div>
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

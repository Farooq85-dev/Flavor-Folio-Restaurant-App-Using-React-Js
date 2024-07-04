import NavbarComp from "./Navbar";
import SliderComp from "./Slider";
import ServicesComp from "./Services";
import PlansComp from "./Plans";
import FromMenuComp from "./FromMenu";
import AccordianComp from "./Accordian";
import { FooterComp } from "./Footer";
import PartnersComp from "./Partners";
import BranchesComp from "./Branches";

function HomeComp() {
  return (
    <div>
      <NavbarComp />
      <SliderComp />
      <ServicesComp />
      <PlansComp />
      <FromMenuComp />
      <AccordianComp />
      <BranchesComp/>
      <PartnersComp />
      <FooterComp />
    </div>
  );
}

export default HomeComp;

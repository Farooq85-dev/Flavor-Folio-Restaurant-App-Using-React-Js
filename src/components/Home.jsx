import NavbarComp from "./Navbar";
import SliderComp from "./Slider";
import ServicesComp from "./Services";
import PlansComp from "./Plans";
import FromMenuComp from "./FromMenu";
import AccordianComp from "./Accordian";
import { FooterComp } from "./Footer";
import PartnersComp from "./Partners";
import BranchesComp from "./Branches";
import { Helmet } from "react-helmet-async";

function HomeComp() {
  return (
    <div>
      <Helmet>
        <title>Flavor Folio - Delicious Recipes and More</title>
        <meta
          name="A home page of Falavor Folio"
          content="Explore a wide variety of delicious recipes on Flavor Folio. Find your next favorite meal today!"
        />
        <meta
          name="falavor-folio branches FAQ's From Menu"
          content="recipes, cooking, food, Flavor Folio"
        />
      </Helmet>
      <NavbarComp />
      <SliderComp />
      <ServicesComp />
      <PlansComp />
      <FromMenuComp />
      <AccordianComp />
      <BranchesComp />
      <PartnersComp />
      <FooterComp />
    </div>
  );
}

export default HomeComp;

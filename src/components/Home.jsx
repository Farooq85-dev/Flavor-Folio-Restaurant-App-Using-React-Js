import NavbarComp from "./Navbar";
import SliderComp from "./Slider";
import ServicesComp from "./Services";
import PlansComp from "./Plans";
import FromMenuComp from "./FromMenu";

function HomeComp() {
  return (
    <div>
      <NavbarComp />
      <SliderComp />
      <ServicesComp />
      <PlansComp />
      <FromMenuComp />
    </div>
  );
}

export default HomeComp;

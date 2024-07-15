import sldier1 from "../assets/slider-1.webp";
import sldier2 from "../assets/slider-2.webp";
import sldier3 from "../assets/slider-3.webp";
import sldier4 from "../assets/slider-4.webp";
import { Carousel } from "antd";
import "../index.scss";

const SliderComp = () => (
  <div className="sliderContainer">
    <div className="slider">
      <Carousel
        autoplaySpeed={2000}
        arrows={false}
        dotPosition="right"
        autoplay={true}
        infinite={true}
      >
        <img src={sldier1} alt="" />
        <img src={sldier2} alt="" />
        <img src={sldier3} alt="" />
        <img src={sldier4} alt="" />
      </Carousel>
    </div>
  </div>
);

export default SliderComp;

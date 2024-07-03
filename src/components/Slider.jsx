import { Carousel } from "antd";
import sldier1 from "../assets/slider-1.png";
import sldier2 from "../assets/slider-2.png";
import sldier3 from "../assets/slider-3.png";
import sldier4 from "../assets/slider-4.png";
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

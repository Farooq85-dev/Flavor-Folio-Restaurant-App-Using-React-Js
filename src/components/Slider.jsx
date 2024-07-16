import slider1 from "../assets/slider-1.webp";
import slider2 from "../assets/slider-2.webp";
import slider3 from "../assets/slider-3.webp";
import slider4 from "../assets/slider-4.webp";
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
        <div>
          <img src={slider1} alt="Slider 1" />
        </div>
        <div>
          <img src={slider2} alt="Slider 2" />
        </div>
        <div>
          <img src={slider3} alt="Slider 3" />
        </div>
        <div>
          <img src={slider4} alt="Slider 4" />
        </div>
      </Carousel>
    </div>
  </div>
);

export default SliderComp;

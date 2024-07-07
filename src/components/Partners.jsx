import partner1 from "../assets/partner-1.png";
import partner2 from "../assets/partner-2.png";
import partner3 from "../assets/partner-3.png";
import partner4 from "../assets/partner-4.png";
import "../index.scss";

function PartnersComp() {
  return (
    <div>
      <h2 className="font-bold text-4xl text-center">Our Partners</h2>
      <div className="mainPartner p-[50px]">
        <div className="sliderPartners rounded-2xl">
          <div className="slide-track">
            <div className="slide">
              <img src={partner1} alt="" />
            </div>
            <div className="slide">
              <img src={partner2} alt="" />
            </div>
            <div className="slide">
              <img src={partner3} alt="" />
            </div>
            <div className="slide">
              <img src={partner4} />
            </div>
            <div className="slide">
              <img src={partner1} alt="" />
            </div>
            <div className="slide">
              <img src={partner2} alt="" />
            </div>
            <div className="slide">
              <img src={partner2} height={100} width={250} alt="" />
            </div>
            <div className="slide">
              <img src={partner4} height={100} width={250} alt="" />
            </div>
            <div className="slide">
              <img src={partner1} height={100} width={250} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnersComp;

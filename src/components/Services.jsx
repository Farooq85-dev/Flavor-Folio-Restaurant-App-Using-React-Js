import { LiaShippingFastSolid } from "react-icons/lia";
import { GiTakeMyMoney } from "react-icons/gi";
import { Ri24HoursLine } from "react-icons/ri";
import { CiDiscount1 } from "react-icons/ci";
import "../index.scss";

function ServicesComp() {
  return (
    <div>
      <div className="mainServices grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 p-[50px] gap-6">
        <div className="service1 flex justify-center items-center gap-2">
          <div className="servIcon ">
            <LiaShippingFastSolid className="w-16 h-16 " />
          </div>
          <div className="serCnt flex flex-col items-start">
            <div className="heading">
              <h3 className="font-bold">Free Shipping</h3>
            </div>
            <div className="cnt">
              <p>For regular customers</p>
            </div>
          </div>
        </div>
        <div className="service2 flex justify-center items-center gap-1">
          <div className="servIcon ">
            <Ri24HoursLine className="w-16 h-16 " />
          </div>
          <div className="serCnt flex flex-col items-start">
            <div className="heading">
              <h3 className="font-bold">24/7 Hour Support</h3>
            </div>
            <div className="cnt">
              <p>Full customers support</p>
            </div>
          </div>
        </div>
        <div className="service3 flex justify-center items-center gap-1">
          <div className="servIcon ">
            <GiTakeMyMoney className="w-16 h-16 " />
          </div>
          <div className="serCnt flex flex-col items-start">
            <div className="heading">
              <h3 className="font-bold">Money back gurrante</h3>
            </div>
            <div className="cnt">
              <p>We respect our customers</p>
            </div>
          </div>
        </div>
        <div className="service4 flex justify-center items-center gap-1">
          <div className="servIcon ">
            <CiDiscount1 className="w-16 h-16 " />
          </div>
          <div className="serCnt flex flex-col items-start">
            <div className="heading">
              <h3 className="font-bold">Special Discount</h3>
            </div>
            <div className="cnt">
              <p>On special events or days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesComp;

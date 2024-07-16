import { PiStudent } from "react-icons/pi";
import { SiTicktick, SiEventstore } from "react-icons/si";
import { GiFamilyTree } from "react-icons/gi";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import "../index.scss";

function PlansComp() {
  return (
    <div>
      <h2 className="font-bold text-4xl text-center">Special Plans</h2>
      <div className="mainPlans grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-[50px] gap-5 ">
        <div className="plan1 rounded-xl cursor-grabbing p-5">
          <div className="plan1Header flex flex-col justify-center items-center mb-2 gap-4">
            <div className="">
              <PiStudent className="w-16 h-16" />
            </div>
            <div className="planHeading">
              <h3 className="font-bold text-2xl">Student Plans</h3>
            </div>
          </div>
          <div className="planCnt flex flex-col justify-start items-center gap-4">
            <div className="planCnt1 flex justify-start items-center gap-4">
              <div className="plantCntIcon">
                <SiTicktick className="w-5 h-5" />
              </div>
              <div className="planCntDescription">
                <p>Student Saver Meal</p>
              </div>
            </div>
            <div className="planCnt2 flex justify-start items-center  gap-4">
              <div className="plantCntIcon">
                <SiTicktick className="w-5 h-5" />
              </div>
              <div className="planCntDescription">
                <p>Study Buddy Combo</p>
              </div>
            </div>
            <div className="planCnt3 flex justify-start items-center gap-4">
              <div className="plantCntIcon">
                <SiTicktick className="w-5 h-5" />
              </div>
              <div className="planCntDescription">
                <p>Study Buddy Combo</p>
              </div>
            </div>
            <div className="planCnt4 flex justify-start items-center gap-4">
              <div className="plantCntIcon">
                <SiTicktick className="w-5 h-5" />
              </div>
              <div className="planCntDescription">
                <p>Late-Night Study Pack</p>
              </div>
            </div>
            <div className="plan3Btn">
              <Button
                className="planBtn"
                endIcon={<IoIosArrowRoundForward />}
              >
                Visit Store
              </Button>
            </div>
          </div>
        </div>
        <div className="plan2 rounded-xl cursor-grabbing p-5">
          <div className="plan2Header flex flex-col justify-center items-center mb-2 gap-4">
            <div className="">
              <GiFamilyTree className="w-16 h-16" />
            </div>
            <div className="planHeading">
              <h3 className="font-bold text-2xl">Family Plans</h3>
            </div>
          </div>
          <div className="planCnt flex flex-col justify-start items-center gap-4">
            <div className="planCnt1 flex justify-start items-center gap-4">
              <div className="plantCntIcon">
                <SiTicktick className="w-5 h-5" />
              </div>
              <div className="planCntDescription">
                <p>Family Feast</p>
              </div>
            </div>
            <div className="planCnt2 flex justify-start items-center  gap-4">
              <div className="plantCntIcon">
                <SiTicktick className="w-5 h-5" />
              </div>
              <div className="planCntDescription">
                <p>Kids’ Delight</p>
              </div>
            </div>
            <div className="planCnt3 flex justify-start items-center gap-4">
              <div className="plantCntIcon">
                <SiTicktick className="w-5 h-5" />
              </div>
              <div className="planCntDescription">
                <p>Healthy Family Meal</p>
              </div>
            </div>
            <div className="planCnt4 flex justify-start items-center gap-4">
              <div className="plantCntIcon">
                <SiTicktick className="w-5 h-5" />
              </div>
              <div className="planCntDescription">
                <p>Pizza Night Pack</p>
              </div>
            </div>
            <div className="plan3Btn">
              <Button
                className="planBtn"
                endIcon={<IoIosArrowRoundForward />}
              >
                Visit Store
              </Button>
            </div>
          </div>
        </div>
        <div className="plan3 rounded-xl cursor-grabbing p-5">
          <div className="plan3Header flex flex-col justify-center items-center mb-2 gap-4">
            <div className="">
              <SiEventstore className="w-16 h-16" />
            </div>
            <div className="planHeading">
              <h3 className="font-bold text-2xl">Events Plans</h3>
            </div>
          </div>
          <div className="planCnt flex flex-col justify-start items-center gap-4">
            <div className="planCnt1 flex justify-start items-center gap-4">
              <div className="plantCntIcon">
                <SiTicktick className="w-5 h-5" />
              </div>
              <div className="planCntDescription">
                <p>Corporate Lunch Package</p>
              </div>
            </div>
            <div className="planCnt2 flex justify-start items-center  gap-4">
              <div className="plantCntIcon">
                <SiTicktick className="w-5 h-5" />
              </div>
              <div className="planCntDescription">
                <p>Birthday Bash Pack</p>
              </div>
            </div>
            <div className="planCnt3 flex justify-start items-center gap-4">
              <div className="plantCntIcon">
                <SiTicktick className="w-5 h-5" />
              </div>
              <div className="planCntDescription">
                <p>Wedding Reception Feast</p>
              </div>
            </div>
            <div className="planCnt4 flex justify-start items-center gap-4">
              <div className="plantCntIcon">
                <SiTicktick className="w-5 h-5" />
              </div>
              <div className="planCntDescription">
                <p>Holiday Party Special</p>
              </div>
            </div>
            <div className="plan3Btn">
              <Button
                className="planBtn"
                endIcon={<IoIosArrowRoundForward />}
              >
                Visit Store
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlansComp;

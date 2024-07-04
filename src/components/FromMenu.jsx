import { CardComp } from "./Card";
import "../index.scss";

function FromMenuComp() {
  return (
    <div>
      <h2 className="font-bold text-4xl text-center">From Menu</h2>
      <div className="mainFromMenu p-[50px]">
        <div className="grid xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="menu1">
            <CardComp img="menu1" text="Chips" />
          </div>
          <div className="menu2">
            <CardComp img="menu2" text="Salad" />
          </div>
          <div className="menu3">
            <CardComp img="menu3" text="Cake" />
          </div>
          <div className="menu4">
            <CardComp img="menu4" text="Meat" />
          </div>
          <div className="menu5">
            <CardComp img="menu5" text="Bread" />
          </div>
          <div className="menu6">
            <CardComp img="menu6" text="Pizza" />
          </div>
          <div className="menu7">
            <CardComp img="menu7" text="Baked Bread" />
          </div>
          <div className="menu8">
            <CardComp img="menu8" text="Burger & Chips" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FromMenuComp;

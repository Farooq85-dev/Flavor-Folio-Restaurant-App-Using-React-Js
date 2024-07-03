import menu1 from "../assets/menu-1.jpg";
import menu2 from "../assets/menu-2.jpg";
import menu3 from "../assets/menu-3.jpg";
import menu4 from "../assets/menu-4.jpg";
import "../index.scss";

function FromMenuComp() {
  return (
    <div>
      <div className="mainFromMenu">
        <h2 className="text-center font-bold text-4xl">From Our Menu</h2>
        <div className="outerdiv">
          <div className="innerdiv">
            {/* div1 */}
            <div className="div1 eachdiv cursor-grabbing rounded-2xl">
              <div className="review">
                <img src={menu1} alt="" />
              </div>
            </div>
            {/* div2*/}
            <div className="div2 eachdiv cursor-grabbing rounded-2xl">
              <div className="review ">
                <img src={menu2} />
              </div>
            </div>
            {/* div4 */}
            <div className="div3 eachdiv cursor-grabbing rounded-2xl">
              <div className="review ">
                <img src={menu4} />
              </div>
            </div>
            {/* div5 */}
            <div className="div4 eachdiv cursor-grabbing rounded-2xl">
              <div className="review">
                <img src={menu3} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FromMenuComp;

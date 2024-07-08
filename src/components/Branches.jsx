import { CardComp } from "./BranchesCard";
import "../index.scss";

function BranchesComp() {
  return (
    <div>
      <h2 className="font-bold text-4xl text-center">Our Branches</h2>
      <div className="mainBranches p-[50px]">
        <div className="grid xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="branch1">
            <CardComp img="branch1" text="Lahore" />
          </div>
          <div className="branch2">
            <CardComp img="branch2" text="Karachi" />
          </div>
          <div className="branch3">
            <CardComp img="branch3" text="Quetta" />
          </div>
          <div className="branch4">
            <CardComp img="branch4" text="Faislabad" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BranchesComp;

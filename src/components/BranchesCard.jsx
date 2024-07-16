import branch1 from "../assets/branch-1.webp";
import branch2 from "../assets/branch-2.webp";
import branch3 from "../assets/branch-3.webp";
import branch4 from "../assets/branch-4.webp";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import "../index.scss";

export function CardComp({ img, text }) {
  const getImages = (img) => {
    switch (img) {
      case "branch1":
        return branch1;
        break;
      case "branch2":
        return branch2;
        break;
      case "branch3":
        return branch3;
        break;
      case "branch4":
        return branch4;
        break;
      default:
        return null;
        break;
    }
  };

  return (
    <Card className="branchesCard rounded-xl card p-3">
      <CardHeader className="">
        <img src={getImages(img)} className="rounded-lg" />
      </CardHeader>
      <div>
        <Typography variant="h5" className="mb-2 mt-4">
          {text || "default"}
        </Typography>
      </div>
    </Card>
  );
}

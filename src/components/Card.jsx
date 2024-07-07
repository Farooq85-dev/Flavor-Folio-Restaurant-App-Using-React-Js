import branch1 from "../assets/branch-1.jpg";
import branch2 from "../assets/branch-2.jpg";
import branch3 from "../assets/branch-3.jpg";
import branch4 from "../assets/branch-4.jpg";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

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
    <Card className="rounded-2xl card p-3">
      <CardHeader className="">
        <img src={getImages(img)} className="rounded-lg" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" className="mb-2 mt-4">
          {text || "default"}
        </Typography>
      </CardBody>
    </Card>
  );
}

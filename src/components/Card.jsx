import branch1 from "../assets/branch-1.jpg";
import branch2 from "../assets/branch-2.jpg";
import branch3 from "../assets/branch-3.jpg";
import branch4 from "../assets/branch-4.jpg";
import menu1 from "../assets/menu-1.jpg";
import menu2 from "../assets/menu-2.jpg";
import menu3 from "../assets/menu-3.jpg";
import menu4 from "../assets/menu-4.jpg";
import menu5 from "../assets/menu-5.jpg";
import menu6 from "../assets/menu-6.jpg";
import menu7 from "../assets/menu-7.jpg";
import menu8 from "../assets/menu-8.jpg";

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
      case "menu1":
        return menu1;
        break;
      case "menu2":
        return menu2;
        break;
      case "menu3":
        return menu3;
        break;
      case "menu4":
        return menu4;
        break;
      case "menu5":
        return menu5;
        break;
      case "menu6":
        return menu6;
        break;
      case "menu7":
        return menu7;
        break;
      case "menu8":
        return menu8;
        break;
      default:
        return null;
        break;
    }
  };

  return (
    <Card className="rounded-2xl card p-3">
      <CardHeader className="">
        <img src={getImages(img)} alt="Loading...." className="rounded-lg" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" className="mb-2 mt-4">
          {text || "default"}
        </Typography>
      </CardBody>
    </Card>
  );
}

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Button from "@mui/material/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Avatar } from "@mui/material";
import "../index.scss";

export function ProductCardComp({
  image,
  title,
  description,
  addToCart,
  price,
}) {
  return (
    <Card className="productCards p-3 rounded-2xl flex flex-col h-full">
      <CardHeader className="relative flex justify-center">
        <Avatar
          sx={{
            borderRadius: 2,
            width: "100%",
            height: "100%",
          }}
        >
          <LazyLoadImage
            effect="blur"
            src={image ? image : ""}
            style={{
              width: "100%",
              height: "100%",
            }}
            width="100%"
            height="100%"
          />
        </Avatar>
      </CardHeader>
      <CardBody>
        <Typography variant="h5" className="mt-2">
          {title}
        </Typography>
        <Typography className="font-bold">PKR {price}</Typography>
        <Typography>{description}</Typography>
      </CardBody>
      <CardFooter className="pt-0 mt-auto">
        <Button
          onClick={addToCart}
          variant="contained"
          className="addToCartBtn absolute"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

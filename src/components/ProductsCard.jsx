import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Button from "@mui/material/Button";
import "../index.scss";

export function ProductCardComp({ img, title, description }) {
  return (
    <Card className="productCards p-3 rounded-2xl">
      <CardHeader className="relative">
        <img src={img} alt="card-image" className="rounded-lg" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" className="mb-2">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="contained" className="addToCartBtn">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

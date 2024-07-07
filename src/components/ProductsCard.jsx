import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Button from "@mui/material/Button";
import "../index.scss";

export function ProductCardComp({
  image,
  title,
  description,
  addToCart,
  price,
}) {
  return (
    <Card className="productCards p-3 rounded-2xl">
      <CardHeader className="relative">
        <img src={image} alt="card-image" className="rounded-lg" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" className="mt-2">
          {title}
        </Typography>
        <Typography className="font-bold">PKR {price}</Typography>
        <Typography>{description}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={addToCart}
          variant="contained"
          className="addToCartBtn bg-pertiary"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

import NavbarComp from "../Navbar";
import { FooterComp } from "../Footer";
import { CiShoppingCart } from "react-icons/ci";
import Button from "@mui/material/Button";
import { ProductCardComp } from "../ProductsCard";
import pizza1 from "../../assets/pizza-1.jpg";
import pizza2 from "../../assets/pizza-2.jpg";
import pizza3 from "../../assets/pizza-3.jpg";
import pizza4 from "../../assets/pizza-4.jpg";
import bottle1 from "../../assets/bottle-1.jpg";
import bottle2 from "../../assets/bottle-2.jpg";
import bottle3 from "../../assets/bottle-3.jpg";
import bottle4 from "../../assets/bottle-4.jpg";
import bread1 from "../../assets/bread-1.jpg";
import bread2 from "../../assets/bread-2.jpg";
import bread3 from "../../assets/bread-3.jpg";
import bread4 from "../../assets/bread-4.jpg";
import "../../index.scss";

let products = [
  ,
  {
    id: 9,
    title: "Cheesy Breadstick",
    description: "Yummy bread",
    image: bread1,
    category: "bread",
    quantity: 1,
  },
  {
    id: 10,
    title: "Cheesy Bread (Half)",
    description: "Tasty Soos",
    image: bread2,
    category: "bread",
    quantity: 1,
  },
  {
    id: 11,
    title: "Cheesy Bread",
    description: "Full Crunch",
    image: bread3,
    category: "bread",
    quantity: 1,
  },
  {
    id: 12,
    title: "Creamy Chicken Delight",
    description:
      "A Delightful Mix Of Chicken Fajita Chunks, Onions, Green Chillis And Tomatoes On Top With Our Homemade Creamy Garlic",
    image: bread4,
    category: "bread",
    quantity: 1,
  },
  {
    id: 5,
    title: "Water (500ml)",
    description: "Nestle Water",
    image: bottle1,
    category: "drinks",
    quantity: 1,
  },
  {
    id: 6,
    title: "Water (Large)",
    description: "Aquafina",
    image: bottle2,
    category: "drinks",
    quantity: 1,
  },
  {
    id: 7,
    title: "1ltr",
    description: "Mix brands",
    image: bottle3,
    category: "drinks",
    quantity: 1,
  },
  {
    id: 8,
    title: "1.5L",
    description: "Totally pure",
    image: bottle4,
    category: "drinks",
    quantity: 1,
  },
  {
    id: 1,
    title: "Slice Combo",
    description: "Original Slice Pizza + Sideline Half + Regular Drink",
    image: pizza1,
    category: "pizza",
    quantity: 1,
  },
  {
    id: 2,
    title: "Slice Combo",
    description: "15 Original Pizza + Chicken Wings + 1.5 Ltr Drink",
    image: pizza2,
    category: "pizza",
    quantity: 1,
  },
  {
    id: 3,
    title: "Big Hunt",
    description:
      "20 Original Full Pizza + 2 Sideline Full + Mini Lava Cakes 6 Pcs + 2.25 Ltr Drink",
    image: pizza3,
    category: "pizza",
    quantity: 1,
  },
  {
    id: 4,
    title: "Double Pepperoni",
    description:
      "A FootLong Pizza with a layer of extra Pepperoni and cheese. This one's for all the Pepperoni lovers out there.",
    image: pizza4,
    category: "pizza",
    quantity: 1,
  },
];

function VisitStoreComp() {
  return (
    <div>
      <div className="navbarComp">
        <NavbarComp />
      </div>
      <div className="cartSection m-[10px]">
        <div className="bgCart bg-tertiary rounded-lg flex justify-around items-center p-[10px]">
          <div className="logo">
            <h2 className="font-bold text-xl">Own Flavors</h2>
          </div>
          <div className="cartIcon relative">
            <CiShoppingCart color="black" className="w-10 h-10" />
            <div className="cartLengthDiv w-6 h-6 text-white   bg-secondary rounded-full absolute top-0 left-4 text-center pt-1">
              1
            </div>
          </div>
        </div>
      </div>
      <div className="filterBtns flex justify-center gap-4 p-[10px]">
        <div>
          <Button variant="outlined" className="categoriesBtn">
            All
          </Button>
        </div>
        <div>
          <Button variant="outlined" className="categoriesBtn">
            Pizza
          </Button>
        </div>
        <div>
          <Button variant="outlined" className="categoriesBtn">
            Drinks
          </Button>
        </div>
        <div>
          <Button variant="outlined" className="categoriesBtn">
            Bread Items
          </Button>
        </div>
      </div>
      <div className="mainStore">
        <div className="productsContainer m-[20px]">
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, inedx) => {
              let { image, title, description, id, category } = product;
              console.log(image);
              return (
                <ProductCardComp
                  img={image}
                  title={title}
                  description={description}
                  key={inedx}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="footerComp">
        <FooterComp />
      </div>
    </div>
  );
}

export default VisitStoreComp;

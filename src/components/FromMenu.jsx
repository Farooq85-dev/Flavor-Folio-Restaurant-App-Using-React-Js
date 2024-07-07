import pizza1 from "../assets/pizza-1.jpg";
import pizza2 from "../assets/pizza-2.jpg";
import pizza3 from "../assets/pizza-3.jpg";
import pizza4 from "../assets/pizza-4.jpg";
import bottle1 from "../assets/bottle-1.jpg";
import bottle2 from "../assets/bottle-2.jpg";
import bottle3 from "../assets/bottle-3.jpg";
import bottle4 from "../assets/bottle-4.jpg";

let products = [
  {
    id: 1,
    title: "Slice Combo",
    description: "Original Slice Pizza + Sideline Half + Regular Drink",
    image: pizza1,
    category: "pizza",
    quantity: 1,
    price: 234,
  },
  {
    id: 2,
    title: "Slice Combo",
    description: "15 Original Pizza + Chicken Wings + 1.5 Ltr Drink",
    image: pizza2,
    category: "pizza",
    quantity: 1,
    price: 564,
  },
  {
    id: 3,
    title: "Big Hunt",
    description: "20 Original Full Pizza + 2 Sideline Full + Mini Lava Cakes",
    image: pizza3,
    category: "pizza",
    quantity: 1,
    price: 999,
  },
  {
    id: 4,
    title: "Double Pepperoni",
    description:
      "A FootLong Pizza with a layer of extra Pepperoni and cheese. ",
    image: pizza4,
    category: "pizza",
    quantity: 1,
    price: 124,
  },
  {
    id: 5,
    title: "Water (500ml)",
    description: "Nestle Water",
    image: bottle1,
    category: "drinks",
    quantity: 1,
    price: 100,
  },
  {
    id: 6,
    title: "Water (Large)",
    description: "Aquafina",
    image: bottle2,
    category: "drinks",
    quantity: 1,
    price: 250,
  },
  {
    id: 7,
    title: "1ltr",
    description: "Mix brands",
    image: bottle3,
    category: "drinks",
    quantity: 1,
    price: 200,
  },
  {
    id: 8,
    title: "1.5L",
    description: "Totally pure",
    image: bottle4,
    category: "drinks",
    quantity: 1,
    price: 150,
  },
];

import { ProductCardComp } from "./ProductsCard";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "../index.scss";

function FromMenuComp() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [cartLength, setCartlength] = useState(0);
  useEffect(() => {
    setCartlength(cartItems.length);
  }, [cartItems]);

  const addToCart = (product) => {
    let productExists = cartItems.find(
      (storageProducts) => storageProducts.id === product.id
    );

    if (productExists) {
      toast.error("Product is already in cart.");
      return;
    }

    cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCartlength(cartItems.length);
  };
  return (
    <div>
      <h2 className="font-bold text-4xl text-center">From Menu</h2>
      <div className="mainFromMenu p-[50px]">
        <div className="grid xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            let { image, description, title, price, id } = product;
            return (
              <ProductCardComp
                key={product.id}
                image={image}
                title={title}
                price={price}
                description={description}
                addToCart={() => addToCart(product, id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FromMenuComp;

import { ProductCardComp } from "./ProductsCard";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useUser } from "../context/Store";
import "../index.scss";

function FromMenuComp() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartLength, setCartlength] = useState(0);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const user = useUser();
  useEffect(() => {
    if (user) {
      setProducts(user.adminProducts);
      setLoading(false);
    } else {
      null;
    }
  }, [user]);

  useEffect(() => {
    setCartlength(cartItems.length);
  }, [cartItems]);

  const addToCart = (product) => {
    let productExists = cartItems.find(
      (storageProducts) => storageProducts.productId === product.productId
    );

    if (productExists) {
      toast.error("Product is already in cart.");
      return;
    }

    cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    toast.success("Product added to cart successfully.");
    setCartlength(cartItems.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-4xl text-center">From Menu</h2>
      <div className="mainFromMenu p-[50px]">
        <div className="grid xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            let {
              productImage,
              productDescription,
              productTitle,
              productPrice,
              productId,
            } = product;
            return (
              <ProductCardComp
                key={product.productId}
                image={productImage}
                title={productTitle}
                price={productPrice}
                description={productDescription}
                addToCart={() => addToCart(product, productId)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FromMenuComp;

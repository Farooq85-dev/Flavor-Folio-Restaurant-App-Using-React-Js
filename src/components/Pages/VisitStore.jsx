import { useEffect, useState } from "react";
import NavbarComp from "../Navbar";
import { FooterComp } from "../Footer";
import { CiShoppingCart } from "react-icons/ci";
import Button from "@mui/material/Button";
import { ProductCardComp } from "../ProductsCard";
import toast from "react-hot-toast";
import DrawerComp from "../Drawer";
import { Helmet } from "react-helmet-async";
import { useUser } from "../../context/Store";
import "../../index.scss";

function VisitStoreComp() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [products, setProducts] = useState(null);
  const [cartLength, setCartlength] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [drawerState, setDrawerState] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    setCartlength(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      setProducts(user.adminProducts);
      setLoading(false);
    } else {
      setProducts(null);
    }
  }, [user]);

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
    toast.success("Product successfully added to your cart.");
    setCartlength(cartItems.length);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.productCategory === selectedCategory
        );

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState(open);
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
      <Helmet>
        <title>Our Store</title>
        <meta name="visit our store" content="Explore our decent meals." />
        <meta
          name="add to cart, delete and checkout"
          content="Plese explore our decent meals."
        />
      </Helmet>
      <div className="navbarComp">
        <NavbarComp />
      </div>
      <div className="drawer">
        <DrawerComp
          toggleDrawer={toggleDrawer}
          state={{ right: drawerState }}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      </div>
      <div className="cartSection m-[10px]">
        <div className="bgCart bg-tertiary rounded-lg flex justify-around items-center p-[10px]">
          <div className="logo">
            <h2 className="font-bold text-xl">Own Flavors</h2>
          </div>
          <div
            className="cartIcon relative cursor-pointer "
            onClick={toggleDrawer(true)}
          >
            <CiShoppingCart color="black" className="w-10 h-10" />
            <div className="cartLengthDiv w-6 h-6 text-white bg-secondary rounded-full absolute top-0 left-4 text-center pt-1">
              {cartLength}
            </div>
          </div>
        </div>
      </div>
      <div className="filterBtns flex justify-center gap-4 p-[10px]">
        <div>
          <Button
            onClick={() => setSelectedCategory("all")}
            variant="outlined"
            className="categoriesBtn"
          >
            All
          </Button>
        </div>
        <div>
          <Button
            onClick={() => setSelectedCategory("pizza")}
            variant="outlined"
            className="categoriesBtn"
          >
            Pizza
          </Button>
        </div>
        <div>
          <Button
            onClick={() => setSelectedCategory("drink")}
            variant="outlined"
            className="categoriesBtn"
          >
            Drinks
          </Button>
        </div>
        <div>
          <Button
            onClick={() => setSelectedCategory("bread")}
            variant="outlined"
            className="categoriesBtn"
          >
            Bread Items
          </Button>
        </div>
      </div>
      <div className="mainStore">
        <h2 className="text-center text-lg font-medium ">
          Note:- We have only three categories.
        </h2>
        <div className="productsContainer m-[20px]">
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => {
              let {
                productImage,
                productTitle,
                productDescription,
                productId,
                productPrice,
              } = product;
              return (
                <ProductCardComp
                  key={productId}
                  image={productImage}
                  price={productPrice}
                  title={productTitle}
                  description={productDescription}
                  product={product}
                  addToCart={() => addToCart(product, productId)}
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

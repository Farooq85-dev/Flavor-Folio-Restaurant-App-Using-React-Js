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
import { TextField } from "@mui/material";
import { addDoc, collection, db } from "../../config/firebase.config";
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
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerComment, setReviewerComment] = useState("");
  const [reviewerStatus, setReviewerStatus] = useState("");
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
  const handleAddReview = async () => {
    if (reviewerName === "") {
      toast.error("Please give name.");
    } else if (reviewerStatus === "") {
      toast.error("Please give comment.");
    } else if (reviewerComment === "") {
      toast.error("Please give comment.");
    } else {
      await addDoc(collection(db, "userReviews"), {
        reviewerName,
        reviewerComment,
        reviewerStatus,
      });
      toast.success("Your review added successfully.");
      setReviewerName("");
      setReviewerComment("");
      setReviewerStatus("");
    }
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
        <div className="bgCart rounded-lg flex justify-around items-center p-[10px]">
          <div className="logo">
            <h2 className="font-bold text-xl text-white">Explore Our Store</h2>
          </div>
          <div
            className="cartIcon relative cursor-pointer "
            onClick={toggleDrawer(true)}
          >
            <CiShoppingCart color="white" className="w-10 h-10" />
            <div className="cartLengthDiv w-6 h-6 text-white bg-secondary rounded-full absolute top-0 left-4 text-center pt-1">
              {cartLength}
            </div>
          </div>
        </div>
      </div>
      <div className="filterBtns flex justify-center gap-10 p-[10px]">
        <div>
          <Button
            onClick={() => setSelectedCategory("all")}
            className="categoriesBtn"
          >
            All
          </Button>
        </div>
        <div>
          <Button
            onClick={() => setSelectedCategory("pizza")}
            className="categoriesBtn"
          >
            Pizza
          </Button>
        </div>
        <div>
          <Button
            onClick={() => setSelectedCategory("drink")}
            className="categoriesBtn"
          >
            Drinks
          </Button>
        </div>
        <div>
          <Button
            onClick={() => setSelectedCategory("bread")}
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
      <div className="trackOrders flex flex-col justify-center items-center gap-2 w-full rounded-sm p-4">
        <div className="reviewerNameDiv w-[50%]">
          <TextField
            variant="outlined"
            label="Name"
            placeholder="Ex John Dev"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            type="text"
            fullWidth
          />
        </div>
        <div className="reviewerStatusDiv w-[50%]">
          <TextField
            variant="outlined"
            label="Profession"
            placeholder="Ex Developer, Crickter or House Wife"
            value={reviewerStatus}
            onChange={(e) => setReviewerStatus(e.target.value)}
            type="text"
            fullWidth
          />
        </div>
        <div className="reviewerCommentDiv w-[50%]">
          <TextField
            variant="outlined"
            label="Your feelings"
            placeholder="Such as Flavor Folio is giving real flavors..."
            value={reviewerComment}
            onChange={(e) => setReviewerComment(e.target.value)}
            type="text"
            fullWidth
          />
        </div>
        <div className="reviewBtnDiv">
          <Button fullWidth onClick={handleAddReview} className="reviewBtn">
            Give Reviews
          </Button>
        </div>
      </div>
      <div className="footerComp">
        <FooterComp />
      </div>
    </div>
  );
}

export default VisitStoreComp;

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import "../index.scss";

export default function DrawerComp({
  toggleDrawer,
  state,
  cartItems,
  setCartItems,
}) {
  let [delivery, setDelivery] = useState(0);
  let [totalPrice, setTotalPrice] = useState(0);
  const increaseQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === id
        ? { ...item, productQuantity: item.productQuantity + 1 }
        : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const decreaseQuantity = (id) => {
    const updatedCartItems = cartItems
      .map((item) =>
        item.productId === id && item.productQuantity > 1
          ? { ...item, productQuantity: item.productQuantity - 1 }
          : item
      )
      .filter((item) => item.productQuantity > 0);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const deleteCart = (id) => {
    const updatedCartItems = cartItems.filter(
      (storageProducts) => storageProducts.productId !== id
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    toast.success("Product deleted.");
  };

  useEffect(() => {
    let newDelivery = 0;
    if (cartItems.length < 4) {
      newDelivery = 100;
    }
    if (cartItems.length >= 4) {
      newDelivery = 200;
    }
    if (cartItems.length >= 8) {
      newDelivery = 250;
    }

    setDelivery(newDelivery);
    const total = cartItems.reduce(
      (sum, item) => sum + item.productPrice * item.productQuantity,
      0
    );
    setTotalPrice(total + newDelivery);
  }, [cartItems, cartItems.length]);

  const list = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {cartItems.length === 0 ? null : (
          <div className="drawerHeading">
            <h1 className="font-medium text-4xl text-center mt-2">Your Cart</h1>
          </div>
        )}
        {cartItems.map((storageProducts) => (
          <div
            key={storageProducts.id}
            className="flex justify-start items-center gap-3 m-4 p-2 border border-tertiary rounded-md"
          >
            <div>
              <Avatar sx={{ width: 70, height: 70 }}>
                <LazyLoadImage
                  effect="blur"
                  src={storageProducts ? storageProducts.productImage : ""}
                  style={{
                    borderRadius: "50%",
                    width: "100%",
                    height: "100%",
                  }}
                  width="100%"
                  height="100%"
                />
              </Avatar>
            </div>
            <div className="cartDescription">
              <div className="title">
                <h2 className="font-normal">{storageProducts.title}</h2>
                <h2 className="font-normal">
                  PKR/-
                  {storageProducts.productPrice *
                    storageProducts.productQuantity}
                </h2>
              </div>
              <div className="qtyBtns flex justify-center items-center gap-2 cursor-pointer">
                <div
                  className="dQty"
                  onClick={() => decreaseQuantity(storageProducts.productId)}
                >
                  <CiCircleMinus className="w-6 h-6 " />
                </div>
                <div className="quantity">
                  <h5 className="font-medium text-xl">
                    {storageProducts.productQuantity}
                  </h5>
                </div>
                <div
                  className="iQty"
                  onClick={() => increaseQuantity(storageProducts.productId)}
                >
                  <div className="iQtyBtn">
                    <CiCirclePlus className="w-6 h-6 " />
                  </div>
                </div>
                <div
                  className="dBtn"
                  onClick={() => deleteCart(storageProducts.productId)}
                >
                  <AiOutlineDelete className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer(false)}>
        {list}
        {cartItems.length === 0 ? (
          <div className="text-center text-4xl m-4">Your cart is empty.</div>
        ) : (
          <div className="prices flex flex-col justify-start items-start ml-4 mb-2 mr-2">
            <h2 className="text-xl font-medium">Delivery Price: {delivery}</h2>
            <h2 className="text-xl font-medium">Total Price: {totalPrice}</h2>
          </div>
        )}
        <div className="drawerBtns ml-2 mr-2 mb-2 flex justify-center items-center gap-12">
          {cartItems.length === 0 ? (
            <div>
              <Button
                open={state.right}
                anchor="right"
                onClick={toggleDrawer(false)}
                variant="contained"
                className="closeBtn"
              >
                Close
              </Button>
            </div>
          ) : (
            <div className="ml-2 mr-2 mb-2 flex justify-center items-center gap-12">
              <div>
                <Button
                  open={state.right}
                  anchor="right"
                  onClick={toggleDrawer(false)}
                  variant="contained"
                  className="closeBtn"
                >
                  Close
                </Button>
              </div>
              <div>
                <Link to="/checkout">
                  <Button variant="contained" className="closeBtn">
                    CheckOut
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}

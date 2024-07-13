import StepperComp from "../Stepper";
import { useState, useEffect } from "react";
import "../../index.scss";


function CheckoutComp() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [delivery, setDelivery] = useState(0);

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    let newDelivery = 0;
    if (cartItems.length < 4) {
      newDelivery = 100;
    } else if (cartItems.length >= 4 && cartItems.length < 8) {
      newDelivery = 200;
    } else if (cartItems.length >= 8) {
      newDelivery = 250;
    }
    setDelivery(newDelivery);
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total + newDelivery);
  }, [cartItems]);

  return (
    <div>
      <div className="mainStepper flex justify-center items-center h-[100vh] w-full">
        <div className="stepper rounded-2xl p-5 w-[50%]">
          <StepperComp
            totalPrice={totalPrice}
            delivery={delivery}
            cartItems={cartItems}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutComp;

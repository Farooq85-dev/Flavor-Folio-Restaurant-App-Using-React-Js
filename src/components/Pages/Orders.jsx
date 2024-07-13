import { useEffect, useState } from "react";
import { FooterComp } from "../Footer";
import NavbarComp from "../Navbar";
import { collection, db, getDocs } from "../../config/firebase.config.js";
import OrdersCardComp from "../OrdersCard.jsx";
import { useUser } from "../../context/Store.jsx";
;

function OrdersComp() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  

  useEffect(() => {
    const getOrders = async () => {
      if (!user) return;

      const userOrdersRef = collection(
        db,
        "usersProducts",
        user.userUid,
        "orders"
      );

      try {
        const ordersSnapshot = await getDocs(userOrdersRef);
        const fetchedOrders = [];
        ordersSnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() });
        });
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders: ", error);
        toastr.error("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>;
      </div>
    );
  }

  return (
    <div>
      
      <div className="header">
        <NavbarComp />
      </div>
      <div>
        <OrdersCardComp orders={orders} />
      </div>
      <div className="footer">
        <FooterComp />
      </div>
    </div>
  );
}

export default OrdersComp;

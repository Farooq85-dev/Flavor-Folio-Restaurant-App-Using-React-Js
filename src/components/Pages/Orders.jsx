import { useEffect, useState } from "react";
import { FooterComp } from "../Footer";
import NavbarComp from "../Navbar";
import { collection, db, getDocs } from "../../config/firebase.config.js";
import OrdersCardComp from "../OrdersCard.jsx";
import { useUser } from "../../context/Store.jsx";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import toast from "react-hot-toast";
import "../../index.scss";

function OrdersComp() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackOrderId, setTrackOrderId] = useState("");
  const [filterOrder, setFilterOrder] = useState(null);
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
        toast.error("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [user]);

  const trackOrderFn = () => {
    if (trackOrderId === "") {
      toast.error("Please provide tracking Id.");
      return;
    }

    const filterOrder = orders.filter(
      (order) => order.trackingId === trackOrderId
    );

    if (filterOrder.length === 0) {
      toast.error("No order found with the provided tracking Id.");
      setFilterOrder(null);
    } else {
      toast.success("Order founded successfully.");
      setFilterOrder(filterOrder);
      setTrackOrderId("");
    }
  };

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
      <Box sx={{ marginRight: "20px" }}>
        <div className="trackOrders flex flex-col justify-center items-center gap-4 mt-4 p-4 rounded-md m-[10px] w-full">
          <div className="w-[50%]">
            <TextField
              type="text"
              label="Enter Tracking Id"
              value={trackOrderId}
              onChange={(e) => setTrackOrderId(e.target.value)}
              fullWidth
            />
          </div>
          <div className="trackBtnDiv">
            <Button
              onClick={trackOrderFn}
              variant="contained"
              className="trackOrderBtn"
            >
              Track Order
            </Button>
          </div>
        </div>
        <div className="w-full m-[10px]">
          {filterOrder ? (
            <TableContainer className="rounded-md">
              <Table className="border border-collapse border-gray-200">
                <TableHead className="bg-tertiary">
                  <TableRow>
                    <TableCell className="border border-gray-200">
                      Sr. No.
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      Name
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      Phone Number
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      Address
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      Order Date
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      Tracking Id
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      Order Status
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      Total Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className="border border-gray-200">
                      {1}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {filterOrder[0].receiverName}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {filterOrder[0].receiverPhoneNumber}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {filterOrder[0].receiverAddress}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {filterOrder[0].orderDate}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {filterOrder[0].trackingId}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      <span className="text-red">
                        {filterOrder[0].orderStatus}
                      </span>
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      PKR/- {filterOrder[0].totalAmount}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </div>
      </Box>
      <div className="footer">
        <FooterComp />
      </div>
    </div>
  );
}

export default OrdersComp;

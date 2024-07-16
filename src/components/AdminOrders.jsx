import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TextField,
} from "@mui/material";
import { GrNotes } from "react-icons/gr";
import CircularProgressComp from "./CircularProgress";
import AdminOrderModalComp from "./AdminOrdersModal";
import toast from "react-hot-toast";
import "../index.scss";

const AdminOrdersComp = ({
  orders,
  allUsersCancelledOrders,
  allUsersDeliveredOrdered,
  allUsersPendingOrders,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [maxOrders, setMaxOrders] = useState(1000);
  const [trackOrderId, setTrackOrderId] = useState("");
  const [filterOrder, setFilterOrder] = useState(null);

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
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (docId, uid, order, status) => {
    setSelectedOrderId(docId);
    setSelectedOrder(order);
    setSelectedOrderStatus(status);
    setUserUid(uid);
    setOpen(true);
  };

  return (
    <>
      <h2 className="text-center font-medium">
        Note:- At that time we have maxmium 1000 orders Limit. All Circular
        progress is based on the maxmimum orders.
      </h2>
      <TableContainer component={Paper} className="rounded-xl">
        <Table className="border border-collapse border-gray-200">
          <TableHead className="bg-tertiary">
            <TableRow>
              <TableCell className="border border-gray-200">Sr. No.</TableCell>
              <TableCell className="border border-gray-200">
                Client Name
              </TableCell>
              <TableCell className="border border-gray-200">
                Client Address
              </TableCell>
              <TableCell className="border border-gray-200">
                Client Phone Number
              </TableCell>
              <TableCell className="border border-gray-200">
                Order Date
              </TableCell>
              <TableCell className="border border-gray-200">
                Client Tracking Id
              </TableCell>
              <TableCell className="border border-gray-200">
                Client Status
              </TableCell>
              <TableCell className="border border-gray-200">
                Client Total Amount
              </TableCell>
              <TableCell className="border border-gray-200">
                View Detail
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="border border-gray-200">
                    {index + 1}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {order.receiverName}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {order.receiverAddress}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {order.receiverPhoneNumber}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {order.orderDate}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {order.trackingId}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    <span className="text-red">{order.orderStatus}</span>
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    PKR/- {order.totalAmount}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleViewDetails(
                          order.orderId,
                          order.userUid,
                          order,
                          order.orderStatus
                        )
                      }
                      className="adminviewOrderDetailsBtn"
                      startIcon={<GrNotes />}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[8, 16, 24]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {selectedOrderId && (
          <AdminOrderModalComp
            selectedOrderId={selectedOrderId}
            open={open}
            selectedOrderStatus={selectedOrderStatus}
            selectedOrder={selectedOrder}
            userUid={userUid}
            setOpen={setOpen}
          />
        )}
      </TableContainer>
      <div className="allUsersAdminOrdersCircles flex justify-around items-center w-full rounded-sm p-3">
        <div className="circle flex flex-col justify-center items-center gap-1">
          <div>
            <CircularProgressComp
              totalOrders={orders.length}
              maxOrders={maxOrders}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">All Orders</h2>
          </div>
        </div>
        <div className="circle flex flex-col justify-center items-center gap-1">
          <div>
            <CircularProgressComp
              totalOrders={allUsersPendingOrders.length}
              maxOrders={maxOrders}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">All Pending Orders</h2>
          </div>
        </div>
        <div className="circle flex flex-col justify-center items-center gap-1">
          <div>
            <CircularProgressComp
              totalOrders={allUsersDeliveredOrdered.length}
              maxOrders={maxOrders}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">All Delivered Orders</h2>
          </div>
        </div>
        <div className="circle flex flex-col justify-center items-center gap-1">
          <div>
            <CircularProgressComp
              totalOrders={allUsersCancelledOrders.length}
              maxOrders={maxOrders}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">All Cancelled Orders</h2>
          </div>
        </div>
      </div>
      <div className="trackOrders flex flex-col justify-center items-center gap-2 w-[100%] rounded-sm p-4">
        <div className="trackOrdersDiv w-[50%]">
          <TextField
            variant="outlined"
            label="Enter Tracking Id"
            value={trackOrderId}
            onChange={(e) => setTrackOrderId(e.target.value)}
            type="text"
            fullWidth
          />
        </div>
        <div className="trackBtnDiv">
          <Button onClick={trackOrderFn} variant="contained">
            Track Order
          </Button>
        </div>
      </div>
      <div className="w-full">
        {filterOrder ? (
          <TableContainer>
            <Table className="border border-collapse border-gray-200">
              <TableHead className="bg-tertiary">
                <TableRow>
                  <TableCell className="border border-gray-200">
                    Sr. No.
                  </TableCell>
                  <TableCell className="border border-gray-200">Name</TableCell>
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
                  <TableCell className="border border-gray-200">{1}</TableCell>
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
    </>
  );
};

export default AdminOrdersComp;

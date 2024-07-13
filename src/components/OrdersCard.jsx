import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Result } from "antd";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../index.scss";

function OrdersCardComp({ orders }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const navigate = useNavigate();
  const toStore = () => {
    navigate("/visit-store");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="mainOrders flex flex-col justify-center items-center m-[10px]">
      {orders.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-3">
          <Result status="404" />
          <h2 className="text-xl font-medium">Sorry, No orders available.</h2>
          <Button className="gotoStoreBtn" variant="outlined" onClick={toStore}>
            Goto Store
          </Button>
        </div>
      ) : (
        <TableContainer component={Paper} className="rounded-xl">
          <Table className="border-collapse">
            <TableHead className="bg-tertiary">
              <TableRow>
                <TableCell>Sr. No.</TableCell>
                <TableCell>Receiver Name</TableCell>
                <TableCell>Receiver Address</TableCell>
                <TableCell>Receiver Email</TableCell>
                <TableCell>Receiver Phone Number</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Tracking Id</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.receiverName}</TableCell>
                  <TableCell>{order.receiverAddress}</TableCell>
                  <TableCell>{order.receiverEmail}</TableCell>
                  <TableCell>{order.receiverPhoneNumber}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.trackingId}</TableCell>
                  <TableCell>
                    <span className="text-red">{order.orderStatus}</span>
                  </TableCell>
                  <TableCell>PKR/- {order.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[1]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </div>
  );
}

export default OrdersCardComp;

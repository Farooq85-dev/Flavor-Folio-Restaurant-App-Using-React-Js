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
        <>
          <h2 className="text-center font-medium">
            Note:- At that time we have maxmium 30 orders Limit for you. All
            Circular progress is based on the maxmimum orders.
          </h2>
          <TableContainer component={Paper} className="rounded-md">
            <Table className="border-collapse border border-gray-200">
              <TableHead className="bg-tertiary">
                <TableRow>
                  <TableCell className="border border-gray-200">
                    Sr. No.
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    Receiver Name
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    Receiver Address
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    Receiver Email
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    Receiver Phone Number
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
                {paginatedOrders.map((order, index) => (
                  <TableRow key={order.id}>
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
                      {order.receiverEmail}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      +{order.receiverPhoneNumber}
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
        </>
      )}
    </div>
  );
}

export default OrdersCardComp;

import React, { useState } from "react";
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
} from "@mui/material";
import { GrNotes } from "react-icons/gr";
import AdminOrderModalComp from "./AdminOrdersModal";
import "../index.scss";

const AdminOrdersComp = ({ orders }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userUid, setUserUid] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (docId, uid, order) => {
    setSelectedOrderId(docId);
    setSelectedOrder(order);
    setUserUid(uid);
    setOpen(true);
  };

  return (
    <TableContainer component={Paper} className="rounded-xl">
      <Table className="border-collapse">
        <TableHead className="bg-tertiary">
          <TableRow>
            <TableCell>Sr. No.</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Client Address</TableCell>
            <TableCell>Client Phone Number</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Client Tracking Id</TableCell>
            <TableCell>Client Status</TableCell>
            <TableCell>Client Total Amount</TableCell>
            <TableCell>Client Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((order, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.receiverName}</TableCell>
                <TableCell>{order.receiverAddress}</TableCell>
                <TableCell>{order.receiverPhoneNumber}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.trackingId}</TableCell>
                <TableCell>
                  <span className="text-red">{order.orderStatus}</span>
                </TableCell>
                <TableCell>PKR/- {order.totalAmount}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleViewDetails(order.orderId, order.userUid, order)
                    }
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
          selectedOrder={selectedOrder}
          userUid={userUid}
          setOpen={setOpen}
        />
      )}
    </TableContainer>
  );
};

export default AdminOrdersComp;

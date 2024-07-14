import React, { useState } from "react";
import { Modal } from "antd";
import { Button, TableContainer } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { updateDoc, doc, db } from "../config/firebase.config";
import "../index.scss";
import toast from "react-hot-toast";

const AdminOrderModalComp = ({
  open,
  setOpen,
  selectedOrderId,
  userUid,
  selectedOrder,
}) => {
  const [loading, setLoading] = useState(false);
  const [changeOrderStatus, setChangeOrderStatus] = useState("");

  const handleChange = (event) => {
    setChangeOrderStatus(event.target.value);
  };

  const setOrderStatus = async () => {
    setLoading(true);
    try {
      const orderDocRef = doc(
        db,
        "usersProducts",
        userUid,
        "orders",
        selectedOrderId
      );
      await updateDoc(orderDocRef, {
        orderStatus: changeOrderStatus,
      });
      toast.success("Status updated successfully.");
      setLoading(false);
    } catch (error) {
      toast.error("Please try again.");
    }
    console.log(changeOrderStatus);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={
          <h2 className="text-center text-xl font-medium mt-2 mb-2">
            Change Client Order Status
          </h2>
        }
        open={open}
        onCancel={handleClose}
        footer={[
          <div key="footer" className="flex justify-end items-center gap-2">
            <Button
              className="AdminModalCancelBtn"
              key="cancel"
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              onClick={setOrderStatus}
              key="save"
              className="adminModalSaveBtn"
              variant="contained"
            >
              Save
            </Button>
          </div>,
        ]}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full gap-4">
            <TableContainer>
              <Table className="border-collapse">
                <TableHead className="bg-tertiary">
                  <TableRow>
                    <TableCell>Client Name</TableCell>
                    <TableCell>Client Address</TableCell>
                    <TableCell>Client Phone Number</TableCell>
                    <TableCell>Order Date</TableCell>
                    <TableCell>Client Tracking Id</TableCell>
                    <TableCell>Client Status</TableCell>
                    <TableCell>Client Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{selectedOrder.receiverName}</TableCell>
                    <TableCell>{selectedOrder.receiverAddress}</TableCell>
                    <TableCell>{selectedOrder.receiverPhoneNumber}</TableCell>
                    <TableCell>{selectedOrder.orderDate}</TableCell>
                    <TableCell>{selectedOrder.trackingId}</TableCell>
                    <TableCell>
                      <span className="text-red">
                        {selectedOrder.orderStatus}
                      </span>
                    </TableCell>
                    <TableCell>PKR/- {selectedOrder.totalAmount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div className="w-full">
              <Box>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={changeOrderStatus}
                    label="Select Status"
                    onChange={handleChange}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
export default AdminOrderModalComp;

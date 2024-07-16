import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Avatar,
  Button,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MdOutlineDeleteSweep, MdEditNote } from "react-icons/md";
import { useUser } from "../context/Store";
import { deleteDoc, doc, db } from "../config/firebase.config";
import toast from "react-hot-toast";
import AdminEditProdcutsComp from "./AdminEditProdcutsModal";
import "../index.scss";

function AdminProductsComp() {
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [selectedEditProductTitle, setSelectedEditProductTitle] = useState("");
  const [selectedEditProductDescription, setSelectedEditProductDescription] =
    useState("");
  const [selectedEditProductPrice, setSelectedEditProductPrice] = useState("");
  const [selectedEditProductImage, setSelectedEditProductImage] =
    useState(null);
  const [selectedEditProductId, setSelectedEditProductId] = useState(null);
  const [selectedEditProduct, setSelectedEditProduct] = useState(null);
  const [adminEditProductModalOpen, setAdminEditProductModalOpen] =
    useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const user = useUser();
  useEffect(() => {
    if (user) {
      setOrders(user.adminProducts);
      setLoading(false);
    } else {
      null;
    }
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAdminEditProduct = (
    id,
    title,
    description,
    price,
    image,
    order
  ) => {
    setSelectedEditProductId(id);
    setSelectedEditProductTitle(title);
    setSelectedEditProductDescription(description);
    setSelectedEditProductPrice(price);
    setSelectedEditProductImage(image);
    setSelectedEditProduct(order);
    setAdminEditProductModalOpen(true);
  };

  const adminDleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "adminProducts", productId));
      toast.success("Product deleted successfully.");
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== productId)
      );
    } catch (error) {
      toast.error("Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      {orders.length === 0 ? (
        "No orders found"
      ) : (
        <TableContainer component={Paper} className="rounded-xl">
          <Table className="border border-collapse border-gray-200">
            <TableHead className="bg-tertiary">
              <TableRow>
                <TableCell className="border border-gray-200">
                  Sr. No.
                </TableCell>
                <TableCell className="border border-gray-200">
                  Product Image
                </TableCell>
                <TableCell className="border border-gray-200">
                  Product Title
                </TableCell>
                <TableCell className="border border-gray-200">
                  Product Description
                </TableCell>
                <TableCell className="border border-gray-200">
                  Product Price
                </TableCell>
                <TableCell className="border border-gray-200">
                  Product Quantity
                </TableCell>
                <TableCell className="border border-gray-200">
                  Product Category
                </TableCell>
                <TableCell className="border border-gray-200">
                  Product ID
                </TableCell>
                <TableCell className="border border-gray-200">
                  Edit Product
                </TableCell>
                <TableCell className="border border-gray-200">
                  Delete Product
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
                      <Avatar alt="" sx={{ width: 100, height: 100 }}>
                        <LazyLoadImage
                          effect="blur"
                          src={order ? order.productImage : ""}
                          style={{
                            borderRadius: "50%",
                            width: "100%",
                            height: "100%",
                          }}
                          width="100%"
                          height="100%"
                        />
                      </Avatar>
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {order.productTitle}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {order.productDescription}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      PKR/- {order.productPrice}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {order.productQuantity}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {order.productCategory}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {order.productId}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      <Button
                        className="adminProductDeleteBtn"
                        onClick={() =>
                          handleAdminEditProduct(
                            order.id,
                            order.productTitle,
                            order.productDescription,
                            order.productPrice,
                            order.productImage,
                            order
                          )
                        }
                        startIcon={<MdEditNote />}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      <Button
                        className="adminProductEditBtn"
                        variant="contained"
                        onClick={() => adminDleteProduct(order.id)}
                        startIcon={<MdOutlineDeleteSweep />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <AdminEditProdcutsComp
            selectedEditProductTitle={selectedEditProductTitle}
            selectedEditProduct={selectedEditProduct}
            selectedEditProductImage={selectedEditProductImage}
            selectedEditProductDescription={selectedEditProductDescription}
            selectedEditProductPrice={selectedEditProductPrice}
            selectedEditProductId={selectedEditProductId}
            adminEditProductModalOpen={adminEditProductModalOpen}
            setOrders={setOrders}
            setAdminEditProductModalOpen={setAdminEditProductModalOpen}
          />
          <TablePagination
            rowsPerPageOptions={[8, 16, 24]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </>
  );
}

export default AdminProductsComp;

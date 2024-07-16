import { Modal } from "antd";
import { Avatar, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { doc, db, updateDoc } from "../config/firebase.config";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../index.scss";

function AdminEditProdcutsComp({
  adminEditProductModalOpen,
  setAdminEditProductModalOpen,
  setOrders,
  selectedEditProduct,
  selectedEditProductId,
  selectedEditProductPrice,
  selectedEditProductTitle,
  selectedEditProductDescription,
  selectedEditProductImage,
}) {
  const [changeProductTitle, setChangeProductTitle] = useState(
    selectedEditProductTitle
  );
  const [changeProductDescription, setChangeProductDescription] = useState(
    selectedEditProductDescription
  );
  const [changeProductPrcie, setChangeProductPrcie] = useState(
    selectedEditProductPrice
  );
  const [changeProductImage, setChangeProductImage] = useState(
    selectedEditProductImage
  );

  useEffect(
    () => {
      setChangeProductTitle(selectedEditProductTitle);
      setChangeProductDescription(selectedEditProductDescription);
      setChangeProductPrcie(selectedEditProductPrice);
    },
    [selectedEditProductTitle],
    [selectedEditProductDescription],
    [selectedEditProductPrice],
    [selectedEditProductImage]
  );

  const handleAdminUpdateProductDoc = async () => {
    console.log(
      changeProductDescription,
      changeProductPrcie,
      changeProductTitle,
      selectedEditProductId
    );
    try {
      const selectedProductDocRef = doc(
        db,
        "adminProducts",
        selectedEditProductId
      );
      await updateDoc(selectedProductDocRef, {
        productTitle: changeProductTitle,
        productDescription: changeProductDescription,
        productPrice: changeProductPrcie,
      });
      toast.success("Product updated successfully.");
      handleClose();
      setOrders((prevOrders) =>
        prevOrders.filter(
          (order) => selectedEditProduct.id !== selectedEditProductId
        )
      );
    } catch (error) {
      toast.error("Please try again.");
    }
  };

  const handleClose = () => {
    setAdminEditProductModalOpen(false);
  };

  return (
    <div>
      <Modal
        title={
          <h2 className="text-center text-xl font-medium mt-2 mb-2">
            Change all Fields Carefully.
          </h2>
        }
        open={adminEditProductModalOpen}
        onCancel={handleClose}
        footer={[
          <div key="footer" className="flex justify-end items-center gap-2 ">
            <Button
              className="adminEditProductDetailsModalCancelBtn"
              key="cancel"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              key="save"
              className="adminEditProductDetailsModalSaveBtn"
              onClick={handleAdminUpdateProductDoc}
            >
              Save
            </Button>
          </div>,
        ]}
      >
        <div className="flex flex-col justify-center items-center gap-4 ">
          <div>
            <Avatar alt="" sx={{ width: 200, height: 200 }}>
              <LazyLoadImage
                effect="blur"
                src={selectedEditProductImage ? selectedEditProductImage : ""}
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                }}
                width="100%"
                height="100%"
              />
            </Avatar>
            <h2 className="text-md font-medium text-center">
              You cannot change Image.
            </h2>
          </div>
          <div className="w-full">
            <TextField
              label="Enter Product Title"
              variant="outlined"
              type="text"
              value={changeProductTitle}
              onChange={(e) => setChangeProductTitle(e.target.value)}
              fullWidth
            />
          </div>
          <div className="w-full">
            <TextField
              label="Enter Product description"
              variant="outlined"
              type="text"
              value={changeProductDescription}
              onChange={(e) => setChangeProductDescription(e.target.value)}
              fullWidth
            />
          </div>
          <div className="w-full">
            <TextField
              label="Enter Product Price"
              variant="outlined"
              type="number"
              value={changeProductPrcie}
              onChange={(e) => setChangeProductPrcie(e.target.value)}
              fullWidth
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AdminEditProdcutsComp;

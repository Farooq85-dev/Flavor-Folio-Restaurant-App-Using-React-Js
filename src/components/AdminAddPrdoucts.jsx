import { Modal } from "antd";
import { Button, LinearProgress, TextField } from "@mui/material";
import { useState } from "react";
import UploaderComp from "./Uplaod";
import "../index.scss";

function AdminAddPrdouctsModalComp({
  adminAddProductsModalOpen,
  setAdminAddProductsModalOpen,
}) {
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productFile, setProductFile] = useState(null);
  const [progress, setProgress] = useState(0);

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  const handleAddAdminProducts = () => {
    console.log(
      productTitle,
      productCategory,
      productDescription,
      productPrice,
      productFile
    );
  };

  const handleClose = () => {
    setAdminAddProductsModalOpen(false);
  };

  return (
    <div>
      <Modal
        title={
          <h2 className="text-center text-xl font-medium mt-2 mb-2">
            Manage Peoducts
          </h2>
        }
        open={adminAddProductsModalOpen}
        onCancel={handleClose}
        footer={[
          <div key="footer" className="flex justify-end items-center gap-2">
            <Button
              className="adminAddProductsModalCancelBtn"
              key="cancel"
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              key="save"
              onClick={handleAddAdminProducts}
              className="adminAddProductsModalSaveBtn"
              variant="contained"
            >
              Save
            </Button>
          </div>,
        ]}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="uploaderAddProducts flex flex-col justify-center items-center gap-4">
            <div>
              <UploaderComp />
            </div>
            <div>
              {progress > 0 ? (
                <LinearProgressWithLabel value={progress} />
              ) : (
                <h2 className="text-medium text-lg">
                  You can also drag and drop.
                </h2>
              )}
            </div>
          </div>
          <div className="w-full">
            <TextField
              label="Product Title"
              variant="outlined"
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              fullWidth
            />
          </div>
          <div className="w-full">
            <TextField
              label="Product description"
              variant="outlined"
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              fullWidth
            />
          </div>
          <div className="w-full">
            <TextField
              label="Product description"
              variant="outlined"
              type="text"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              fullWidth
            />
          </div>
          <div className="w-full">
            <TextField
              label="Product quantity"
              variant="outlined"
              type="text"
              defaultValue={1}
              disabled
              fullWidth
            />
          </div>
          <div className="w-full">
            <TextField
              label="Product category"
              variant="outlined"
              type="text"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              fullWidth
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default AdminAddPrdouctsModalComp;

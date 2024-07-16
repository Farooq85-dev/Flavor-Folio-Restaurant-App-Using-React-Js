import { Modal } from "antd";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import UploaderComp from "./Uplaod";
import toast from "react-hot-toast";
import {
  ref,
  storage,
  getDownloadURL,
  db,
  uploadBytesResumable,
  addDoc,
  collection,
} from "../config/firebase.config";
import { v4 as uuidv4 } from "uuid";
import "../index.scss";

function AdminAddPrdouctsModalComp({
  adminAddProductsModalOpen,
  setAdminAddProductsModalOpen,
}) {
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
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

  //Generating Unique id for each product
  const productId = uuidv4();

  const handleChange = (event) => {
    setProductCategory(event.target.value);
  };

  const handleFileUpload = (productFile) => {
    setProductFile(productFile);
  };

  const handleAddAdminProducts = async (productFile) => {
    if (!productFile) {
      toast.error("No file uploaded.");
      return;
    }
    if (productFile.size > 262144) {
      toast.error("Product picture must be less than 350 Kb.");
      return;
    }
    const fileTypes = ["image/webp"];
    if (!fileTypes.includes(productFile.type)) {
      toast.error("Invalid Format. Please select webp format.");
      return;
    }

    if (productTitle === "") {
      toast.error("Please enter product title.");
      return;
    } else if (productTitle.length === 3) {
      toast.error("Product title characters should be greater than 3.");
      return;
    } else if (productDescription === "") {
      toast.error("Please enter product description.");
      return;
    } else if (productDescription.length < 6) {
      toast.error("Product description characters between 6 and 20.");
      return;
    } else if (productCategory === "") {
      toast.error("Please select product cartegory");
      return;
    } else if (productPrice === "") {
      toast.error("Please enter product price.");
      return;
    } else if (productPrice <= 0) {
      toast.error("Product price must be greater than 0.");
      return;
    }

    const storageRef = ref(storage, `adminProductsImages/${productTitle}`);
    const uploadTask = uploadBytesResumable(storageRef, productFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            toast.success("Please stay calmed!");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            toast.error("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            toast.error("User canceled the upload");
            break;
          case "storage/unknown":
            toast.error("Unknown error occurred. Please try again.");
            break;
        }
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const productImage = downloadURL;
          await addDoc(collection(db, "adminProducts"), {
            productTitle,
            productDescription,
            productCategory,
            productPrice,
            productQuantity,
            productImage,
            productId,
          });
          toast.success("Product data added to database successfully.");
          handleClose();
          setProductCategory("");
          setProductTitle("");
          setProductDescription("");
          setProductPrice("");
          setProgress(0);
        } catch (error) {
          toast.error(
            "An error occurred while getting the download URL. Please try again."
          );
        }
      }
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
            Add Products Carefully
          </h2>
        }
        open={adminAddProductsModalOpen}
        onCancel={handleClose}
        footer={[
          <div key="footer" className="flex justify-end items-center gap-2">
            <Button
              className="adminAddProductsModalCancelBtn"
              key="cancel"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              key="save"
              onClick={() => handleAddAdminProducts(productFile)}
              className="adminAddProductsModalSaveBtn"
            >
              Save
            </Button>
          </div>,
        ]}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="uploaderAddProducts flex flex-col justify-center items-center gap-4 w-full">
            <div className="">
              <UploaderComp onFileUpload={handleFileUpload} />
            </div>
            <div className="w-full">
              {progress > 0 ? (
                <div className="w-full">
                  <LinearProgressWithLabel value={progress} />
                </div>
              ) : (
                <h2 className="text-medium text-lg">
                  You can also drag and drop product picture here.
                </h2>
              )}
            </div>
          </div>
          <div className="w-full">
            <TextField
              label="Enter Product Title"
              variant="outlined"
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              fullWidth
            />
          </div>
          <div className="w-full">
            <TextField
              label="Enter Product description"
              variant="outlined"
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              fullWidth
            />
          </div>
          <div className="w-full">
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Product Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={productCategory}
                  label="Select Product Category"
                  onChange={handleChange}
                >
                  <MenuItem value="pizza">Pizza</MenuItem>
                  <MenuItem value="bread">Bread Items</MenuItem>
                  <MenuItem value="drink">Drinks</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="w-full">
            <TextField
              label="Product quantity"
              variant="outlined"
              type="number"
              value={productQuantity}
              disabled
              fullWidth
            />
          </div>
          <div className="w-full">
            <TextField
              label="Enter Product Price"
              variant="outlined"
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              fullWidth
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default AdminAddPrdouctsModalComp;

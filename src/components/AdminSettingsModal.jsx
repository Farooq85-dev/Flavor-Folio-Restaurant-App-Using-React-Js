import { useState } from "react";
import { Modal } from "antd";
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import {
  ref,
  getDownloadURL,
  storage,
  db,
  uploadBytesResumable,
  setDoc,
  doc,
} from "../config/firebase.config";
import UploaderComp from "./Uplaod";
import "../index.scss";

const AdminSettingsModalComp = ({ open, setOpen }) => {
  const [file, setFile] = useState(null);
  const [adminName, setAdminName] = useState("");
  const [progress, setProgress] = useState(0);

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileUpload = (file) => {
    setFile(file);
  };

  const uploadFile = async (file) => {
    const fileTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (!file) {
      toast.error("No file uploaded.");
      return;
    }
    if (adminName === "") {
      toast.error("Please provide name.");
      return;
    }
    if (file.size > 1048576) {
      toast.error("Picture must be less than 1MB.");
      return;
    }
    if (!fileTypes.includes(file.type)) {
      toast.error("Invalid Format. Please select JPG, JPEG, or PNG.");
      return;
    }

    await setDoc(doc(db, "adminData", "adminName"), {
      adminName,
    });

    const storageRef = ref(storage, `adminData/adminPic`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressValue =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressValue);
        toast.success("Stay patient!");
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            toast.success("Please stay patient! Picture is in progress.");
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
          const imageUrl = downloadURL;
          await setDoc(doc(db, "adminData", "adminPic"), {
            adminImageUrl: imageUrl,
          });
          toast.success("Your picture has been uploaded successfully.");
          handleClose();
          setAdminName("");
          setProgress(0);
        } catch (error) {
          toast.error(
            "An error occurred while getting the download URL. Please try again."
          );
        }
      }
    );
  };

  return (
    <>
      <Modal
        title={
          <h2 className="text-center text-xl font-medium mt-2 mb-2">
            Change Admin Settings
          </h2>
        }
        open={open}
        onCancel={handleClose}
        footer={[
          <div key="footer" className="flex justify-end items-center gap-2">
            <Button
              className="adminSettingsModalCancelBtn"
              key="cancel"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              key="save"
              className="adminSettingsModalSaveBtn"
              onClick={() => {
                uploadFile(file);
              }}
            >
              Save
            </Button>
          </div>,
        ]}
      >
        <div className="flex flex-col justify-center items-center gap-6 w-full">
          <div className="flex flex-col justify-center items-center w-full">
            <div>
              <UploaderComp onFileUpload={handleFileUpload} />
            </div>
            <div className="w-full">
              {progress > 0 ? (
                <LinearProgressWithLabel value={progress} />
              ) : (
                <h2 className="text-medium text-lg">
                  You can also drag and drop.
                </h2>
              )}
            </div>
          </div>
          <div className="adminName w-full">
            <TextField
              variant="outlined"
              label="Admin Name"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              type="text"
              fullWidth
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminSettingsModalComp;

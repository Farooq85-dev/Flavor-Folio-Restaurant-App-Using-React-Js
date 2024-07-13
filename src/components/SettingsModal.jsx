import { useState } from "react";
import { Modal } from "antd";
import { Box, Button, TextField, Typography } from "@mui/material";
import UploaderComp from "./Uplaod";
import { useUser } from "../context/Store";
import {
  updateEmail,
  auth,
  updatePassword,
  ref,
  getDownloadURL,
  storage,
  db,
  uploadBytesResumable,
  setDoc,
  doc,
} from "../config/firebase.config";
import toast from "react-hot-toast";
import { passwordRegex, emailRegex } from "./Pages/Signup";
import "../index.scss";

const SettingsModalComp = ({ open, setOpen }) => {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const user = useUser();
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
    if (file.size > 1048576) {
      toast.error("Picture must be less than 1MB.");
      return;
    }
    if (!fileTypes.includes(file.type)) {
      toast.error("Invalid Format. Please select JPG, JPEG, or PNG.");
      return;
    }
    console.log(file);

    const storageRef = ref(storage, `usersImages/${auth.currentUser.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            toast.success("Please stay patient!");
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
            toast.error("Unknown error occurred, inspect error.serverResponse");
            break;
        }
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const imageUrl = downloadURL;
          await setDoc(doc(db, "usersImages", auth.currentUser.uid), {
            userImageUrl: imageUrl,
          });
          toast.success("Your picture has been uploaded successfully.");
          handleClose();
        } catch (error) {
          toast.error(
            "An error occurred while getting the download URL. Please try again."
          );
        }
      }
    );
  };

  const userUpdateEmail = async () => {
    if (newEmail === "") {
      toast.error("Please provide a new email.");
      return;
    } else if (!emailRegex.test(newEmail)) {
      toast.error("Invalid Email.");
      return;
    }
    try {
      await updateEmail(auth.currentUser, newEmail);
      toast.success("Email updated successfully.");
      setNewEmail("");
      handleClose();
    } catch (error) {
      toast.error("Please try again or log in again.");
    }
  };

  const userUpdatePassword = async () => {
    if (newPassword === "") {
      toast.error("Please provide a new password.");
      return;
    } else if (!passwordRegex.test(newPassword)) {
      toast.error("Password must be only numbers with a length of 6 to 10.");
      return;
    }
    try {
      await updatePassword(auth.currentUser, newPassword);
      toast.success("Password updated successfully.");
      setNewPassword("");
      handleClose();
    } catch (error) {
      toast.error("Please try again or log in again.");
    }
  };

  return (
    <Modal
      title={
        <p className="text-xl text-center font-medium">Account Settings</p>
      }
      open={open}
      onCancel={handleClose}
      footer={[
        <div key="footer" className="flex justify-end items-center gap-2">
          <Button
            className="settingsModalCancelBtn"
            key="cancel"
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>,
      ]}
    >
      <div className="flex flex-col gap-5 p-6 rounded-xl w-full border border-gray-200">
        <div className="uploadComp flex justify-center items-center w-full">
          <UploaderComp onFileUpload={handleFileUpload} />
        </div>
        {progress ? (
          <LinearProgressWithLabel value={progress} />
        ) : (
          <h2 className="text-medium text-lg"> You can also drag and drop.</h2>
        )}
        <div className="uploadBtnDiv">
          <Button
            variant="outlined"
            className="uploadBtn"
            onClick={() => {
              uploadFile(file);
            }}
          >
            Upload Picture
          </Button>
        </div>
        <div className="currentEmailDiv w-full">
          <TextField
            variant="outlined"
            fullWidth
            label="Current Email"
            type="email"
            value={user ? user.userEmail : ""}
            disabled
          />
        </div>
        <div className="updatedEmailDiv w-full">
          <TextField
            variant="outlined"
            fullWidth
            label="Provide new Email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div className="updateEmailBtnDiv">
          <Button
            onClick={userUpdateEmail}
            className="updateEmailBtn"
            variant="outlined"
          >
            Update Email
          </Button>
        </div>
        <div className="updatedPasswordDiv w-full">
          <TextField
            variant="outlined"
            fullWidth
            label="Provide Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="updatePasswordBtnDiv">
          <Button
            className="updatePasswordBtn"
            onClick={userUpdatePassword}
            variant="outlined"
          >
            Update Password
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModalComp;

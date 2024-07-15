import { Modal } from "antd";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "../index.scss";

const AdminSigninModalComp = ({ adminOpen, setAdminOpen }) => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClose = () => {
    setAdminOpen(false);
  };
  const handleAdminSignin = () => {
    console.log(adminEmail, adminPassword);
  };

  return (
    <>
      <Modal
        title={<p className="text-xl text-center font-medium">Admin Account</p>}
        open={adminOpen}
        onCancel={handleClose}
        footer={[
          <div key="footer" className="flex justify-end items-center gap-2">
            <Button
              className="adminSigninModalCancelBtn"
              key="cancel"
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className="adminSigninModalSaveBtn"
              variant="contained"
              onClick={handleAdminSignin}
            >
              Signin
            </Button>
          </div>,
        ]}
      >
        <div className="flex flex-col justify-center items-center gap-6 w-full">
          <div className="w-full">
            <TextField
              label="Admin Email"
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              fullWidth
            />
          </div>
          <div className="adminPassworDiv w-full">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    onClick={handleShowPassword}
                    className="cursor-pointer"
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </InputAdornment>
                ),
              }}
              value={adminPassword}
              onChange={(e) => {
                setAdminPassword(e.target.value);
              }}
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              placeholder=" ******* "
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AdminSigninModalComp;

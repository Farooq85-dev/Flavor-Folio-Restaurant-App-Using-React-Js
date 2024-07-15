import { Modal } from "antd";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "../index.scss";

const AdminSigninModalComp = ({ adminOpen, setAdminOpen }) => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

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
              label="Email"
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              fullWidth
            />
          </div>
          <div className="w-full">
            <TextField
              label="Password"
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              fullWidth
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AdminSigninModalComp;

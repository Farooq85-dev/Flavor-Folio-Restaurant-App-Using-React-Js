import Avatar from "@mui/material/Avatar";
import { useUser } from "../context/Store";
import "../index.scss";

function DashboardNavbarComp() {
  const user = useUser();
  if (!user) {
    return;
  }
  return (
    <div className="w-full">
      <div className="mainDasboardNavbar rounded-lg w-full p-2 bg-tertiary">
        <div className="flex justify-between items-center">
          <div className="userName">
            <h2 className="text-2xl font-medium">Hy! {user.userName}</h2>
          </div>
          <div className="userPicDiv">
            <Avatar className="userPic" alt="loading..." src={user.userImage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbarComp;

import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import {
  signInWithPopup,
  GoogleAuthProvider,
  auth,
} from "../config/firebase.config";

const theme = createTheme({
  palette: {
    ochre: {
      main: "#1D4ED8",
    },
  },
});

function ButtonComp({ icon, text, classes, redirect }) {
  const navigate = useNavigate();

  const signupWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/verification");
      })
      .catch((error) => {
        toast.error("Please try again.");
      });
  };

  const getIcon = (icon) => {
    switch (icon) {
      case "google":
        return <FcGoogle className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getRedirecttion = (redirect) => {
    switch (redirect) {
      case "google":
        return signupWithGoogle;
      case "register":
        return navigate("/register");
      default:
        return null;
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          variant="outlined"
          startIcon={getIcon(icon)}
          className={`${classes} rounded-md`}
          onClick={getRedirecttion(redirect)}
        >
          {text}
        </Button>
      </ThemeProvider>
    </div>
  );
}

export default ButtonComp;

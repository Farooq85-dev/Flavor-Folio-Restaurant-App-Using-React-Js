import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoLogoGithub } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import {
  signInWithPopup,
  GoogleAuthProvider,
  auth,
  GithubAuthProvider,
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

  const toverfication = () => {
    navigate("/verification");
  };

  const signupWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        toverfication();
      })
      .catch((error) => {
        toast.error("Please try again.");
      });
  };

  const signupWithGithub = () => {
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        toast.success("Registered successfully.");
      })
      .catch((error) => {
        toast.error("Please try again.");
      });
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const getIcon = (icon) => {
    switch (icon) {
      case "google":
        return <FcGoogle className="w-6 h-6" />;
      case "email":
        return <MdOutlineAlternateEmail className="w-6 h-6" />;
      case "github":
        return <IoLogoGithub className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getRedirecttion = (redirect) => {
    switch (redirect) {
      case "google":
        return signupWithGoogle;
      case "github":
        return signupWithGithub;
      case "register":
        return navigateToRegister;
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

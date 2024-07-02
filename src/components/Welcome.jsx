import { Link } from "react-router-dom";
import "../index.scss";
import ButtonComp from "./Button";

function WelcomeComp() {
  return (
    <div className="flex justify-center items-center h-screen ml-10 mr-10">
      <div>
        <div className="mainWelcome bg-white flex justify-center items-center gap-2 p-10 rounded-2xl">
          <div className="welcomeCnt ">
            <div className="welcomeDescription">
              <p className="font-medium">Welcome to</p>
              <h3 className="text-primary font-semibold"> FlavorFolio</h3>
              <p className="font-medium">
                A place where you will taste <br /> your own flavors....
              </p>
            </div>
            <div className="getStarted flex flex-col justify-start items-start gap-3 mt-10">
              <p className="font-medium">Let’s Get Started...</p>
              <ButtonComp
                icon="email"
                classes="emailBtn"
                text="Continue with Email"
                redirect="register"
              />
              <ButtonComp
                icon="google"
                classes="googleBtn"
                text="Continue with Google"
                redirect="google"
              />
              <ButtonComp
                icon="github"
                classes="githubBtn"
                text="Continue with github"
                redirect="github"
              />
              <Link to="/register">
                <p>
                  Alread have an account?{" "}
                  <span className="text-red">Login</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeComp;

import { FooterComp } from "../Footer";
import NavbarComp from "../Navbar";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { emailRegex } from "./Signup";
import { RiMapPinLine } from "react-icons/ri";
import { MdOutlineAlternateEmail, MdPhoneInTalk } from "react-icons/md";
import "../../index.scss";

function ContactComp() {
  const [contacterName, setContracterName] = useState("");
  const [contracterEmail, setContracterEmail] = useState("");
  const [contracterMessage, setcontracterMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const contracterDetails = async (e) => {
    e.preventDefault();

    if (contacterName === "") {
      toast.error("Please enter name.");
    } else if (contracterEmail === "") {
      toast.error("Please enter email.");
    } else if (!emailRegex.test(contracterEmail)) {
      toast.error("Invlaid Email");
    } else if (contracterMessage === "") {
      toast.error("Please write message.");
    } else if (contracterMessage.length <= 5) {
      toast.error("Message must be greater than 5 characters");
      return;
    }

    try {
      const response = await axios.post(
        "https://formspree.io/f/xvoewqbe",
        {
          name: contacterName,
          email: contracterEmail,
          message: contracterMessage,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setContracterName("");
        setContracterEmail("");
        setcontracterMessage("");
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error("There was an error sending the message:", error);
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (success === true) {
      toast.success("Message sent successfully!");
    } else if (success === false) {
      toast.error("Failed to send message.");
    }
  }, [success]);

  return (
    <div>
      <div className="navbarComp">
        <NavbarComp />
      </div>
      <div className="mainContact p-[10px]">
        <div className="contact flex  justify-center items-center">
          <div className="contactInputs flex justify-start items-start p-10 gap-6 rounded-2xl w-[75%]">
            <div className="contactDetails flex flex-col justify-start items-start gap-6">
              <div className="contactHeading">
                <h2 className="text-xl font-normal">Contact Us</h2>
                <h2 className="text-2xl font-medium">Get In Touch with Us</h2>
              </div>
              <div className="detail1 flex justify-center items-center gap-2">
                <div className="icon bg-primary rounded-full p-2">
                  <RiMapPinLine color="white" className="w-6 h-6" />
                </div>
                <div className="detail1Description">
                  Punjab, Arifwala, Near to Kalma Chowk
                </div>
              </div>
              <div className="detail2 flex justify-center items-center gap-2">
                <div className="icon bg-primary rounded-full p-2">
                  <MdOutlineAlternateEmail color="white" className="w-6 h-6" />
                </div>
                <div className="detail2Description">falvorFolio@gmail.com</div>
              </div>
              <div className="detail2 flex justify-center items-center gap-2">
                <div className="icon bg-primary rounded-full p-2">
                  <MdPhoneInTalk color="white" className="w-6 h-6" />
                </div>
                <div className="detail2Description">+92-328-8302289</div>
              </div>
            </div>
            <form
              onSubmit={contracterDetails}
              className="flex flex-col justify-center items-start gap-6 rounded-2xl w-[100%]"
            >
              <div className="contracterName w-[100%]">
                <TextField
                  className="w-full"
                  id="contracterName"
                  label="Name"
                  value={contacterName}
                  onChange={(e) => setContracterName(e.target.value)}
                  variant="outlined"
                  type="text"
                  placeholder="Ex John"
                  required
                />
              </div>
              <div className="contracterEmail w-[100%]">
                <TextField
                  className="w-full"
                  id="contracterEmail"
                  label="Email"
                  value={contracterEmail}
                  onChange={(e) => setContracterEmail(e.target.value)}
                  variant="outlined"
                  type="email"
                  placeholder="Ex user@gmail.com"
                  required
                />
              </div>
              <div className="contracterMessage w-[100%]">
                <TextField
                  className="w-full"
                  id="contracterMessage"
                  label="Message"
                  value={contracterMessage}
                  onChange={(e) => setcontracterMessage(e.target.value)}
                  multiline
                  rows={4}
                  placeholder="Your Message"
                  required
                />
              </div>
              <div className="sendMessage">
                <Button
                  className="sendMessageBtn"
                  type="submit"
                  variant="contained"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="footerComp">
        <FooterComp />
      </div>
    </div>
  );
}

export default ContactComp;

import { FooterComp } from "../Footer";
import NavbarComp from "../Navbar";
import TextField from "@mui/material/TextField";
import contactusImg from "../../assets/contactus-1.png";
import { Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { emailRegex } from "../Register";
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
        <div className="contact flex justify-center items-center gap-[200px]">
          <div className="contactInputs flex flex-col justify-center items-start p-4 gap-6 rounded-2xl">
            <div className="headimgContact">
              <h3 className="font-bold">Contact Us</h3>
            </div>
            <form
              onSubmit={contracterDetails}
              className="flex flex-col justify-center items-start gap-6 rounded-2xl"
            >
              <div className="contracterName">
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
              <div className="contracterEmail">
                <TextField
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
              <div className="contracterMessage">
                <TextField
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
                  variant="outlined"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
          <div className="contactImg">
            <img src={contactusImg} alt="contactus" width={300} />
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

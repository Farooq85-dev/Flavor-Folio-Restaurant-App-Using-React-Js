import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GoPlus } from "react-icons/go";
import "../index.scss";

function AccordianComp() {
  return (
    <div>
      <h2 className="font-bold text-4xl text-center">General FAQ's</h2>
      <div className="mainAccordian p-[50px]">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            What are the restaurant's opening hours?
          </AccordionSummary>
          <AccordionDetails>
            Flavor Folio is open from 10:00 AM to 10:00 PM from Monday to
            Friday, and from 9:00 AM to 11:00 PM on weekends.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Do you offer vegetarian or vegan options?
          </AccordionSummary>
          <AccordionDetails>
            Yes, we have a variety of vegetarian and vegan dishes on our
            menu. You can find these options clearly marked in our menu section.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Do you offer catering services for events?
          </AccordionSummary>
          <AccordionDetails>
            Yes, Flavor Folio offers catering services for events of all sizes.
            Whether it's a family gathering, corporate event, or a special
            occasion, we have a range of catering packages to suit your needs.
            Contact us for more details.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Can I make a reservation online?
          </AccordionSummary>
          <AccordionDetails>
            Absolutely! You can make a reservation directly through our website.
            Simply go to the "Reservations" page, choose your preferred date and
            time, and fill out the required details.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Do you have options for people with food allergies?
          </AccordionSummary>
          <AccordionDetails>
            Yes, we take food allergies very seriously. Our menu includes
            detailed descriptions and ingredients for each dish. Please inform
            your server about any allergies, and we will ensure that your meal
            is prepared safely to accommodate your needs.
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default AccordianComp;

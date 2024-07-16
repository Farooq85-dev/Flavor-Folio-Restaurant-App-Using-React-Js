import { Typography } from "@material-tailwind/react";
import { FaGithub, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import "../index.scss";

const SITEMAP = [
  {
    title: "Explore",
    links: ["About Us", "Partners", "FAQ's", "Contact Us"],
  },
  {
    title: "Branches",
    links: ["Karachi", "Lahore", "Arifwala", "Quetta"],
  },
  {
    title: "Follow Me",
    links: ["GitHub", "Linkedin", "facebok"],
  },
  {
    title: "Install App",
    links: ["Play Store", "App Store"],
  },
];

const currentYear = new Date().getFullYear();

export function FooterComp() {
  return (
    <footer className="relative w-full footer">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {SITEMAP.map(({ title, links }, key) => (
            <div key={key} className="w-full">
              <Typography
                variant="small"
                className="text-white mb-4 font-bold uppercase"
              >
                {title}
              </Typography>
              <ul className="space-y-1 text-white">
                {links.map((link, key) => (
                  <Typography
                    key={key}
                    as="li"
                    color="blue-gray"
                    className="font-normal"
                  >
                    <a href="#" className="inline-block py-1 pr-2 ">
                      {link}
                    </a>
                  </Typography>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography variant="small" className="text-white text-center mb-2 md:mb-0">
            &copy; {currentYear} Flavor Folio. All rights reserved.
          </Typography>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <Typography
              as="a"
              href="https://github.com/Farooq85-dev"
              className="text-white"
            >
              <FaGithub />
            </Typography>
            <Typography
              as="a"
              href="https://www.linkedin.com/in/muhammad-farooq-b71886295/"
              className="text-white"
            >
              <FaLinkedin />
            </Typography>
            <Typography
              as="a"
              href="https://web.facebook.com/muhammadfarooqdev"
              className="text-white"
            >
              <FaFacebookSquare />
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}
